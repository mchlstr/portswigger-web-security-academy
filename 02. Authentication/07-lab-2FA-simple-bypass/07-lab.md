# Lab: 2FA simple bypass

## Lab Description

This lab's two-factor authentication can be bypassed. You have already obtained a valid username and password, but do not have access to the user's 2FA verification code. To solve the lab, access Carlos's account page.

Your credentials: `wiener:peter`

Victim's credentials `carlos:montoya`

## Lab Solution

Log in to your own account. Your 2FA verification code will be sent to you by email. Click the Email client button to access your emails.
Go to your account page and make a note of the URL.

`https://0ac5002304ccd3e780583feb00370068.web-security-academy.net/my-account?id=wiener`

Important part `/my-account?id=wiener`

We can see that it use our username as an identified as id. At this point we can try directly putting `carlos` there to see if we have IDOR. It did not worked and we are redirected back to the login page, and it logged us out.

If you did not try this step, you can log yourself out. Just to have everything clean, I deleted all cookies, to not have any hanging authnticated session, just in case the session did not get terminated correctlu.

4. Log in using the victim's credentials.

We can try to log in with victim's credentials `carlos:montoya`

5. When prompted for the verification code, manually change the URL to navigate to /my-account. The lab is solved when the page loads.

This is example of **Direct browsing** or **Direct bypass** (https://book.hacktricks.xyz/pentesting-web/2fa-bypass)

Authentication happens already in moment when user enters valid `username:password` pair. There is no link between 2FA check and account authentication check, therefore, if attacker knows the next endpoint (in this case, we know it because we have our `wiener` account and we know the process), s/he can directly skip the 4 digit pin request and directly proceed to .  
