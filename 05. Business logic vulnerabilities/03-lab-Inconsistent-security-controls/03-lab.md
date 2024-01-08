# Lab: Inconsistent security controls
## Lab Description

This lab's **flawed logic allows arbitrary users to access administrative functionality** that should only be available to company employees. To solve the lab, **access the admin panel and delete the user `carlos`**.

## Lab Solution

**Lessons Learned:** If there is a email verification before finishing registration, chceck if the application needs verification upon change. And how it will behave when having "internal" email address.


Lab shows us direction in the registration.

> If you work for DontWannaCry, please use your @dontwannacry.com email address

![](01-information-guidance.png)

![](02-try-to-register-as-employee.png)

![](03-hups-no-access-to-internal-email.png)

But we dont have access to that mailbox.

We will try new registration, with our own mail.

![](04-use-our-email.png)

![](05-new-user-attacker-email.png)

Now we got the verification and active acount.

![](06-verification-recieved.png)

![](07-account-successfully-registered.png)

Lets see what we can do as Francis.

![](08-francis.png)

Email change!
![](09-francis-change-email.png)

Once logged in, the server does not verify if we own the email address, and gives us access to employees privileges.
![](10-francis-access-admin-panel.png)

This way we can accomplish the mission.

![](11-delete-carlos.png)

![](12-bye-bye-carlos.png)
