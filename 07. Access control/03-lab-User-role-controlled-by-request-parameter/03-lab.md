# Lab Description
This lab has an admin panel at `/admin`, which identifies administrators using a **forgeable** cookie.

Solve the lab by accessing the admin panel and using it to delete the user `carlos`.

You can log in to your own account using the following credentials: `wiener:peter`

# Lab Solution

For this lab to be solved is absolutely necessary to have an account on the application, because the forgeable cookie is assigned upon login.


1. Browse to /admin and observe that you can't access the admin panel.
2. Browse to the login page.
3. In Burp Proxy, turn interception on and enable response interception.
4. Complete and submit the login page, and forward the resulting request in Burp.
5. Observe that the response sets the cookie Admin=false. Change it to Admin=true.
6. Load the admin panel and delete `carlos`.
![Delete Carlos user](delete-carlos.png)
![Delete Carlos user](delete-carlos.png)
![Delete Carlos user](delete-carlos.png)
