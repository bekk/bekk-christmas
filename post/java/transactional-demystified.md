---
calendar: java
post_year: 2019
post_day: 24
title: '@Transactional demystified'
links: []
authors:
  - Tia Firing
---
The Spring `@Transactional` annotation and transaction management in general is perhaps one of the most misunderstood concepts of Spring and Java programming. Do you add `@Transactional` on every service class or API you create without putting too much thought into why you are doing it? Keep reading. 

## What are transactions?
A transaction is a way to wrap a number of actions that should be executed as one unit. This means that if one of the operations within your transaction fails, then all the operations, even the successful ones, must be rolled back. The most common use case for transactions is when your application is accessing a database. Transactions are very useful to prevent that any technical error may cause inconsistent data. 

When adding `@Transactional` to a method, it does more or less the same as this piece of code: 

```
UserTransaction userTransaction = entityManager.getTransaction();
try {
  userTransaction.begin();
 
  // do some business logic: 
  addItemToShoppingCart(item);
 
  userTransaction.commit();
} catch(RuntimeException e) {
  userTransaction.rollback(); // roll back business logic if something goes wrong
  throw e;
}
```

However, `@Transactional` does not always work the way we think it does. First, the `@Transactional` annotation (along with all other Spring annotations) will only work on methods with `public` visibility. If you add `@Transactional` to a method that is package-private, the annotation will be ignored, silently. Many of us also think that the transaction will be rolled back in case of _any_ exception. This is not true: The default behavior is that only unchecked exceptions will cause rollback. 

You should also be aware that if you add `@Transactional` to a method that fetches an entity from the database using JPA (for instance Hibernate), and you change that entity, then the changes will be written to the database at the end of the transaction, even if you never told it to save the entity. 

## Distributed/global transactions
Distributed transactions means transactions that involves more than one transactional resource. The classic example is an application that reads a message from a message queue and stores it in a database. Then reading from the queue and saving the message in the database can be defined as one transaction - if writing the message to the database fails, then the message should not be considered read from the queue either. But, it's worth noting that transactions will only work with resources that are transaction-aware. Most JMS providers and datasources, and typical Java EE resources like EJBs, are transaction-aware. Changing data by using a remote REST API or a traditional webservice call, however, are not transaction-aware operations. It makes sense when we think about it: It is not possible to simply roll back a call to some remote API. Hence, adding `@Transactional` to a method that does webservice calls will not have any effect when it comes to rollback in case of an exception. 

## Recommendations
Here are a few more recommendations for using `@Transactional`: 
* `@Transactional` should be used on specific methods where it is actually needed, not on the entire class. This makes it easier to see which methods are meant to be executed as one transaction, and which ones are not. 
* You don't need `@Transactional` for database operations that only read from the database. If a read operation fails, there will be nothing to roll back anyway. 
* Avoid adding `@Transactional` to the top level service method or API controller method. It is better to add the `@Transactional` annotation to the method at the lowest possible level, usually this will be at the repository level. As the annotation will not have any effect on anything before interacting with a transaction-aware resource, it will be easier to see what is supposed to be the transaction when it is put closer to where it has an impact.  
* If you are using distributed transactions, pay attention to timeout values and other settings. Default values are not necessarily the right choice for your use case. 

Learn more about `@Transactional`: 
- https://codete.com/blog/5-common-spring-transactional-pitfalls/
- https://www.baeldung.com/jee-jta
- https://www.marcobehler.com/guides/spring-transaction-management-unconventional-guide
- https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/data-access.html#transaction
- https://www.baeldung.com/transaction-configuration-with-jpa-and-spring
