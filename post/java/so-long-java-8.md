---
calendar: java
post_year: 2019
post_day: 21
title: 'So long, Java 8'
ingress: Or –– how to upgrade your code base from JDK 8 to 11 and beyond.
authors:
  - Sindre Nordbø
---
We've previously covered what's new in [JDK 11](https://java.christmas/2019/11) and 12, 13 and 14 ([part I](https://java.christmas/2019/17), [part II](https://java.christmas/2019/19)) and we're hoping you've found some features you want to start using. However, it is not uncommon for huge, critical Java applications to still use JDK 8. It's definitely time to leave JDK 8 behind. I mean, it is over 5 years old, and you're missing out on a lot of good stuff.

While upgrading should be fairly straight forward, if you are using certain parts of the JDK in your code base you'll actually encounter some compile errors. This is because a [few packages were removed](https://openjdk.java.net/jeps/320) from Java SE in JDK 11 after being deprecated in JDK 9. Fear not, though, because most of the packages have released as Maven artifacts.

The removed packages are:

* JAF (`java.activation`)
* CORBA (`java.corba`)
* JTA (`java.transaction`)
* JAXB (`java.xml.bind`)
* JAX-WS (`java.xml.ws`)
* Common Annotations (`java.xml.ws.annotation`)

Replacement Maven artifacts:

**JAF (`java.activation`)**

```xml
<dependency>
    <groupId>com.sun.activation</groupId>
    <artifactId>javax.activation</artifactId>
    <version>1.2.0</version>
</dependency>
```

**CORBA (`java.corba`)**

In the [JEP](http://openjdk.java.net/jeps/320#CORBA-and-JTA-modules) it is stated that «There will not be a standalone version of CORBA unless third parties take over maintenance of the CORBA APIs, ORB implementation, CosNaming provider, etc.». However, you may have a look at [Glassfish CORBA ORB](https://github.com/eclipse-ee4j/orb). According to the website it «[…] complies with the CORBA 2.3.1 specification, and with the CORBA 3.0 specifications for the Interoperable Name Service and Portable Interceptors. It includes both IDL and RMI-IIOP support».

**JTA (`java.transaction`)**

```xml
<dependency>
    <groupId>javax.transaction</groupId>
    <artifactId>javax.transaction-api</artifactId>
    <version>1.3</version>
</dependency>
```

**JAXB (`java.xml.bind`)**

```xml
<dependency>
    <groupId>jakarta.xml.bind</groupId>
    <artifactId>jakarta.xml.bind-api</artifactId>
    <version>2.3.2</version>
</dependency>
<dependency>
    <groupId>org.glassfish.jaxb</groupId>
    <artifactId>jaxb-runtime</artifactId>
    <version>2.3.2</version>
</dependency>
```

**JAX-WS (`java.xml.ws`)**

```xml
<dependency>
    <groupId>jakarta.xml.ws</groupId>
    <artifactId>jakarta.xml.ws-api</artifactId>
    <version>2.3.2</version>
</dependency>
<dependency>
    <groupId>com.sun.xml.ws</groupId>
    <artifactId>jaxws-rt</artifactId>
    <version>2.3.2</version>
</dependency>
```

**Common Annotations (`java.xml.ws.annotation`)**

```xml
<dependency>
    <groupId>jakarta.annotation</groupId>
    <artifactId>jakarta.annotation-api</artifactId>
    <version>1.3.5</version>
</dependency>
```
