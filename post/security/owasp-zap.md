---
calendar: security
post_year: 2018
post_day: 10
title: OWASP ZAP
ingress: >-
  Do you want to try more hands on security testing, but you're not quite sure
  where to begin? Keep on reading! 
links:
  - title: OWASP Zed Attack Proxy Project
    url: 'https://www.owasp.org/index.php/OWASP_Zed_Attack_Proxy_Project'
  - title: Configuring Proxies
    url: 'https://github.com/zaproxy/zap-core-help/wiki/HelpStartProxies'
  - title: Option Dynamic SSL Certificates
    url: >-
      https://github.com/zaproxy/zap-core-help/wiki/HelpUiDialogsOptionsDynsslcert
  - title: OWASP Juice Shop Project
    url: 'https://www.owasp.org/index.php/OWASP_Juice_Shop_Project'
  - title: OWASP Norway Day - When exploits are blind - Chris Dale
    url: 'https://youtu.be/NQAOz0llpss'
authors:
  - Tia Firing
---
OWASP ZAP (Zed Attack Proxy) is a free security tool created and maintained by the OWASP foundation. It is available for both Windows, Linux and macOS. ZAP offers a variety of functionality: It has several scanners that can crawl your webpage and detect possible vulnerabilities, it has fuzzers that help you generate and send illegal requests, and a whole lot more. But the most beloved functionality is probably the man-in-the-middle proxy. A proxy is the most useful tool in any security tester's toolbox, as a proxy allows you to look at all traffic between the web server and your browser. You can even pause, resend or change requests! Let's have a closer look. 

### Getting started
First, you must [download](https://www.owasp.org/index.php/OWASP_Zed_Attack_Proxy_Project) and install ZAP. When you've got ZAP up and running, it is time to configure the proxy. One of the good things about ZAP is the user guide, and you can find thorough instructions for how to configure your favorite browser to use ZAP as a proxy [here](https://github.com/zaproxy/zap-core-help/wiki/HelpStartProxies). If you use macOS I recommend that you do not use Chrome for this, because Chrome on macOS can not override the system proxy settings. If you change the system proxy settings to use ZAP as a proxy it will work with Chrome, but then ZAP will record all traffic to and from your machine, not just from one particular browser. 

### HTTPS
If the website you want to explore uses HTTPS (as it should), you will have to add a certificate to ZAP, and to trust this certificate in your web browser according to this [guide](https://github.com/zaproxy/zap-core-help/wiki/HelpUiDialogsOptionsDynsslcert). By doing this the web server will have a secure connection over HTTPS that is terminated by the ZAP proxy, and then ZAP will set up a new HTTPS connection between its proxy and your browser. This way you will be able to see the HTTPS traffic in plain text in ZAP. 

### Using the proxy
If you have configured your browser to use ZAP as a proxy and set up the ZAP certificate correctly, you should start seeing requests and responses in ZAP when you access some webpage. At the bottom you will see a chronological view of all requests including response codes, HTTP method, response time and size, and possible vulnerabilities (like cookies without HttpOnly flag or missing headers). ZAP will also create a map of the website under "Site". You can gather a lot of information just by monitoring the traffic. If you right-click on a request, you can choose to resend it, and you can edit it first if you want to. 

### Fuzzing
Let's say you are looking at a login page and you have a list of userids, and you want to find out if any of them are valid. It is time consuming to try them all, and besides, you don't have the password. What you could try is to use a *fuzzer*. If you capture the login message with your proxy, you can right-click on it, choose "Attack" and "Fuzz". Now you can choose the username as the parameter that should be changed, add your list of potential userids, and start fuzzing! Pay attention to the response times. Does any of the messages have significantly longer response times than the rest? Chances are that this is a valid user id. This can happen if the server rejects the login request immediately if the user does not exist, and if the user id is valid, it may take some extra time checking if the password is correct. This depends on what kind of password storage is being used, but with for instance bcrypt this can be a problem. Check out [this presentation](https://youtu.be/NQAOz0llpss) from OWASP Norway Day 2018 by Chris Dale about blind exploits for a live demonstration (he uses BurpSuite as his proxy tool, but you can do this in ZAP as well). 

### Don't try this at home!
It is important to remember that security testing web applications without permission is illegal. If you want to try these techniques in a safe environment you should take a look at [OWASP JuiceShop](https://www.owasp.org/index.php/OWASP_Juice_Shop_Project). This is a simple web application with several vulnerabilities that you can run as a Docker container on your own machine. Some of the vulnerabilities are easy to find and exploit, others can be quite challenging. Happy hacking! 
