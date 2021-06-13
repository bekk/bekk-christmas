---
calendar: java
post_year: 2019
post_day: 12
title: Persistent job scheduling without Quartz
ingress: >
  Have you ever had the need for scheduling background tasks but always wanted a
  more lightweight alternative to [Quartz
  Scheduler](https://www.quartz-scheduler.org/)?
description: >
  Have you ever had the need for scheduling background tasks but always wanted a
  more lightweight alternative to Quartz Scheduler?
links:
  - title: db-scheduler Spring Boot example
    url: >-
      https://github.com/kagkarlsson/db-scheduler/tree/master/examples/spring-boot-example
authors:
  - Even Holthe
---
## Introducing a lightweight alternative 
Running background tasks is an important part of backend software. In the Java ecosystem, one of the most used schedulers for running background tasks is the [Quartz Scheduler](https://www.quartz-scheduler.org/). It is simply a beast in terms of functionality and can be in form of complexity.

[Gustav Karlsson](https://github.com/kagkarlsson) (Bekk) longed for a more lightweight alternative himself, one which did not require 11 database tables to function. He wound up writing his own alternative scheduler – [db-scheduler](https://github.com/kagkarlsson/db-scheduler) – which just requires a single database table but stills support clustering and embedding. Even though the API is simple, it still provides some pretty powerful features. 

## Give me an example!
The library itself does not have any bindings to other libraries or frameworks but a [starter](https://github.com/kagkarlsson/db-scheduler#spring-boot-usage) is provided for Spring Boot projects. Let’s use that!

Assuming a blank Spring Boot projects, you’ll need a few dependencies in your pom.xml (for Maven):

```xml
<!-- Any database will do, see https://tinyurl.com/db-scheduler-schemas
 -->
<dependency>
  <groupId>org.hsqldb</groupId>
  <artifactId>hsqldb</artifactId>
  <scope>runtime</scope>
</dependency>

<!-- The scheduler itself, wrapped in a Spring Boot starter -->
<dependency>
  <groupId>com.github.kagkarlsson</groupId>
  <artifactId>db-scheduler-spring-boot-starter</artifactId>
  <version>6.2</version>
</dependency>
```

After that add the following in `src/main/resources/schema.sql`. For embedded databases, it will automatically get executed.

```sql
create table if not exists scheduled_tasks (
   task_name            varchar(100),
   task_instance        varchar(100),
   task_data            blob,
   execution_time       TIMESTAMP WITH TIME ZONE,
   picked               BIT,
   picked_by            varchar(50),
   last_success         TIMESTAMP WITH TIME ZONE,
   last_failure         TIMESTAMP WITH TIME ZONE,
   consecutive_failures INT,
   last_heartbeat       TIMESTAMP WITH TIME ZONE,
   version              BIGINT,
   PRIMARY KEY (task_name, task_instance)
);
```

Go on to tweak your `application.properties`:


```
# General props
spring.application.name=background-jobs

# db-scheduler (please accept the defaults or tweak before going into production :-)
db-scheduler.threads=3
db-scheduler.polling-interval=5s
```

Finally add a new Spring Configuration class that will provide the tasks that need to be executed. These are exposed as regular beans, so you can wire in whatever you need.

```java
@Configuration
class Jobs {
 private static final Logger log = LoggerFactory.getLogger(Jobs.class);

 @Bean
 Duration eagerInterval() {
   return Duration.ofMinutes(1);
 }

 @Bean
 Task<Void> dumbLogging(Duration eagerInterval) {
   return Tasks
       .recurring("dumb-logging", fixedDelay(eagerInterval))
       .execute((instance, ctx) -> log.info("Hi, I log this statement every {}", eagerInterval));
 }
}
```

Running the app should now produce log lines like:

```
2019-11-26 22:29:58.133  INFO 75774 --- [pool-1-thread-3] no.bekk.evenh.backgroundjobs.Jobs        : Hi, I log this statement every PT1M
```

## Summary
As the example shows, it is really easy to get some basic background jobs up and running. db-scheduler also supports more advanced features such as scheduling one-time tasks with arbitrary data for use at execution-time or recurring tasks keeping an internal state.
