# Lab Description

# Lab Solution


### Edit the username and password wordlists in terminal

```
=0; while read -r line; do echo "carlos" | tee -a carlos-wiener-userlist.txt; x=$((x + 1)); if [ $x -eq 2 ]; then echo "wiener" | tee -a carlos-wiener-userlist.txt; x=0; fi; done < passwords.txt
```

Bash one liner, copying from the list passwords.txt and at every third try, inputting name `wiener` password, which we have valid credentials.

```
x=0; while read -r line; do echo "$line" | tee -a passwords-with-peter.txt; x=$((x + 1)); if [ $x -eq 2 ]; then echo "peter" | tee -a passwords-with-peter.txt; x=0; fi; done < passwords.txt
```

Just run the intruder, it will not log in with correct credentials every 3rd time, resetting the counter.

It has to be only one request at time, otherwise may happens that different threats hit the server out of order and it will just block the IP.

Inspiration:

https://www.youtube.com/watch?v=FzQcu9LYd_k

### With Macro

Macro will automatically send another request


TEST: If the requests still need to be just one at time

Inspiration from:
https://portswigger.net/burp/documentation/desktop/settings/sessions/macros
https://www.youtube.com/watch?v=J8Ykn4Pa2bc
