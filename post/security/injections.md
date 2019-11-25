---
calendar: security
post_year: 2018
post_day: 8
title: Injections
image: 'https://imgs.xkcd.com/comics/exploits_of_a_mom.png'
ingress: >-
  Did you know that an attacker could inject code into your application, which
  could retrieve data or do something else that you did not anticipate?
authors:
  - Stian Fredrikstad
---
Code can be injected in many different contexts. 
Almost everywhere you take input from a user, could be exploited. In SQL, NOSQL, XML, OS commands etc.
Of course this is bad, but luckily the situation is not as bad as it sounds. 
As long as you are aware of the dangers, these kind of vulnerabilities can be averted.

### SQL injection

SQL injections was a large attack surface for a long time, and is unfortunately still quite common. 
This is partly because it is easy to probe for, and a simple SQL injection gives a lot of power to the attacker.

An SQL injection is done by escaping out of the query string, and add new SQL to the string.
Let us say that you have form with username and password. When submitting this form with `bob` and `1234, the application does this SQL query

```sql
SELECT * FROM users WHERE username = 'bob' AND passowrd = '1234';
```

To check if this is vulnerable, we can input `bob'` instead of `bob`

```sql
SELECT * FROM users WHERE username = 'bob'' AND passowrd = '1234';
```

In this example, the code will throw an error back to us.
We now know that the code is potentially vulnerable, and we can try to inject some SQL.

```sql
SELECT * FROM users WHERE username = 'bob' AND 1 = 1;--' AND passowrd = '1234';
```

Now we wrote `bob' AND 1 = 1;` into the username field. 
In this example, it will not throw an error, because it is perfectly valid SQL.
It will find the user with username `bob`, because it will skip the password check due to the double hyphen, which is "start of comment" in many SQL languages.

By injecting this SQL, we can log in as bob without knowing his password.

#### When are you vulnerable?

When we concatenate SQL queries with user input, without escaping the input, it is possible to use special characters to break out of the context.
In this instance, the character `'` end the username string and let us add extra SQL, but this depends on the context.

This can be done secure by using parameterized queries, where we put placeholders in the SQL without joining SQL and user input directly. 
An example of the same query we just wrote can be done in Java like this:

```
String query = "SELECT * FROM users WHERE username = ? AND password = ?";  
PreparedStatement pstmt = connection.prepareStatement( query );
pstmt.setString( 1, "bob");
pstmt.setString( 2, "1234"); 
ResultSet result = pstmt.executeQuery( );
```

### Other injections
As mentioned, this problem is not exclusive to SQL. 
With OS commands, we can break out of the context with a `;`. 

Let us say the server has a service to ping an ip. Where the server is running the code `system("ping IP_FROM_USER")`, and is returning the output to the user.

If we insert `8.8.8.8; cat /etc/passwd`, the server will print the output of ping against 8.8.8.8, and the passwd from the server!
This is of course very bad, and it is why you should avoid letting the user dictate input to the command line. 
Instead you should use functions built into the language/framework.
If you really have to run commands directly, you need to be very specific in your validation of the input, and escape characters like `;` depending on the OS.


The lesson of this post is to always be aware that an attacker will try to write malicious input.
And you should always take care of special characters in your language, and never concatenate user input into places where it can run code.
In most cases, your language or framework will handle a lot of this for you, but you should always know the dangers in the code you write.

The illustration is from [XKCD](https://imgs.xkcd.com/comics/exploits_of_a_mom.png), and hopefully you can understand it after reading this.
