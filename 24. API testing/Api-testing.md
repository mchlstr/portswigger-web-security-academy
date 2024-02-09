# API Recon

To begin, you should identify API endpoints. These are locations where an API receives requests about a specific resource on its server.

The API endpoint for this request is `/api/books`. This results in an interaction with the API to retrieve a list of books from a library. Another API endpoint might be, for example, `/api/books/mystery`.

You need to determine how to interact with them. For example, you should find out information about the following:

- The input data the API processes, including both compulsory and optional parameters.
- The types of requests the API accepts, including supported HTTP methods and media formats.
- Rate limits and authentication mechanisms.

## API documentation

BEST START OF RECON, try to find the API DOCUMENTATION.

Written in human readable and machine readable format

Often available if API is supposed to be used with external developers with documented examples.

Machine-readable is written in structures like JSON or XML, for automating tasks.

Generic info at: https://swagger.io/docs/specification/basic-structure/

## Discovering API documentation

Look for endpoints that may refer to API documentation, for example:

- `/api`
- `/swagger/index.html`
- `/openapi.json`

If you identify an endpoint for a resource, make sure to investigate the base path. For example, if you identify the resource endpoint /api/swagger/v1/users/123, then you should investigate the following paths:

- `/api/swagger/v1`
- `/api/swagger`
- `/api`


FUZZING for the common paths to diretory of documentation

API can be hosten on separate subdomain

E.g:
- `https://api.example,com/v1`
- `http://staging-api.example.com`
- `wss://api.example.com`

## Using machine-readable documentation
You can use a range of automated tools to analyze any machine-readable API documentation that you find.

You can use `Burp Scanner` (professional version) to crawl and audit OpenAPI documentation, or any other documentation in JSON or YAML format. You can also parse OpenAPI documentation using the `OpenAPI Parser BApp` (https://github.com/aress31/openapi-parser, works with community edition too).

You may also be able to use a specialized tool to test the documented endpoints, such as Postman (https://www.postman.com/) or SoapUI (https://www.soapui.org/).


## Identifying API Endpoints

You can use Burp Scanner to crawl (professinoal version) the application, or other crawler then manually investigate interesting attack surface using Burp's browser.

INSPECT ALL JAVASCRIPT FILES for hints of the API endpoints.

## Interacting with API endpoints

Once you've identified API endpoints, interact with them using Burp Repeater and Burp Intruder.

Observe the API's behavior and discover additional attack surface.

For example, you could investigate how the API responds to changing the HTTP method and media type.

As you interact with the API endpoints, **review error messages and other responses closely**. Sometimes these include information that you can use to construct a valid HTTP request.

## Identifying supported HTTP methods

API enpoints may support different HTTP methods:
- `GET`
- `POST`
- `PATCH`
- `DELETE`
- `OPTIONS`

It is necessary to discover what functionality **each** esnpoint has.

For example, the endpoint /api/tasks may support the following methods:

- `GET /api/tasks` - Retrieves a list of tasks.
- `POST /api/tasks` - Creates a new task.
- `DELETE /api/tasks/1` - Deletes a task.

Note
When testing different HTTP methods, target low-priority objects. This helps make sure that you avoid unintended consequences, for example altering critical items or creating excessive records.

## Identifying supported content types

**API endpoints often expect data in a specific format**. They may therefore behave differently depending on the content type of the data provided in a request. Changing the content type may enable you to:

- Trigger errors that disclose useful information.
- Bypass flawed defenses.
- Take advantage of differences in processing logic. For example, an API may be secure when handling JSON data but susceptible to injection attacks when dealing with XML.

To change the content type, modify the Content-Type header, then reformat the request body accordingly.

## Fuzzing to find hidden endpoints

After identification of some initial API endpoints, next recommended step is to fuzz for additional functionalities.

For example after discovering `PUT /api/user/update`, it is good practice to fuzz for `delete` or `add` functionalities, and other relevant endpoints based on common API naming conventions or naming convention discovered based on recon.

## Finding hidden parameters

When you're doing API recon, you may find undocumented parameters that the API supports. You can attempt to use these to change the application's behavior. Burp includes numerous tools that can help you identify hidden parameters:

- Burp Intruder enables you to fuzz for hidden parameters, using a **wordlist of common parameter names to replace existing parameters or add new parameters**. Make sure you also include names that are relevant to the application, based on your initial recon.
- The `Param miner BApp` enables you to **automatically guess up to 65,536 param names per request**. Param miner automatically guesses names that are relevant to the application, based on information taken from the scope.
- The Content discovery tool (professional version) enables you to discover content that isn't linked from visible content that you can browse to, including parameters.

## Mass assignment vulnerabilities
Mass assignment (also known as auto-binding) can inadvertently create hidden parameters. It occurs when software frameworks automatically bind request parameters to fields on an internal object. Mass assignment may therefore result in the application supporting parameters that were never intended to be processed by the developer.

## Identifying hidden parameters
Since mass assignment creates parameters from object fields, you can often identify these hidden parameters by manually examining objects returned by the API.

For example, consider a `PATCH /api/users/` request, which enables users to update their username and email, and includes the following `JSON`:
```
{
    "username": "wiener",
    "email": "wiener@example.com",
}
```
A concurrent `GET /api/users/123` request returns the following `JSON`:
```
{
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com",
    "isAdmin": "false"
}
```
This may indicate that the hidden `id` and `isAdmin` parameters are bound to the internal user object, alongside the updated username and email parameters.

## Testing mass assignment vulnerabilities
To test whether you can modify the enumerated isAdmin parameter value, add it to the PATCH request:
```
{
    "username": "wiener",
    "email": "wiener@example.com",
    "isAdmin": false,
}
```
In addition, send a PATCH request with an invalid isAdmin parameter value:
```
{
    "username": "wiener",
    "email": "wiener@example.com",
    "isAdmin": "foo",
}
```
If the application behaves differently, this may suggest that the invalid value impacts the query logic, but the valid value doesn't. This may indicate that the parameter can be successfully updated by the user.

You can then send a PATCH request with the isAdmin parameter value set to true, to try and exploit the vulnerability:
```
{
    "username": "wiener",
    "email": "wiener@example.com",
    "isAdmin": true,
}
```
If the isAdmin value in the request is bound to the user object without adequate validation and sanitization, the user wiener may be incorrectly granted admin privileges. To determine whether this is the case, browse the application as wiener to see whether you can access admin functionality.

## Preventing vulnerabilities in APIs

When designing APIs, make sure that security is a consideration from the beginning. In particular, make sure that you:

- Secure your documentation if you don't intend your API to be publicly accessible.
- Ensure your documentation is kept up to date so that legitimate testers have full visibility of the API's attack surface.
- Apply an allowlist of permitted HTTP methods.
- Validate that the content type is expected for each request or response.
- Use generic error messages to avoid giving away information that may be useful for an attacker.
- Use protective measures on all versions of your API, not just the current production version.

**To prevent mass assignment vulnerabilities, allowlist the properties that can be updated by the user, and blocklist sensitive properties that shouldn't be updated by the user.**

## Server-side parameter pollution
Some systems contain internal APIs that aren't directly accessible from the internet. Server-side parameter pollution occurs when a website embeds user input in a server-side request to an internal API without adequate encoding. This means that an attacker may be able to manipulate or inject parameters, which may enable them to, for example:

- Override existing parameters.
- Modify the application behavior.
- Access unauthorized data.

You can test any user input for any kind of parameter pollution. For example, query parameters, form fields, headers, and URL path parameters may all be vulnerable.

> Note

>This vulnerability is sometimes called HTTP parameter pollution. However, this term is also used to refer to a web application firewall (WAF) bypass technique. To avoid confusion, in this topic we'll only refer to server-side parameter pollution.

In addition, despite the similar name, this vulnerability class has very little in common with server-side prototype pollution.

## Testing for server-side parameter pollution in the query string

To test for `server-side parameter pollution` in the query string, place query syntax characters like `#`, `&`, and `=` in your input and observe how the application responds.

Consider a vulnerable application that enables you to search for other users based on their username. When you search for a user, your browser makes the following request:

`GET /userSearch?name=peter&back=/home`

To retrieve user information, the server queries an internal API with the following request:

`GET /users/search?name=peter&publicProfile=true`

##Truncating query strings
You can use a URL-encoded # character to attempt to truncate the server-side request. To help you interpret the response, you could also add a string after the `#` character.

For example, you could modify the query string to the following:

`GET /userSearch?name=peter%23foo&back=/home`
The front-end will try to access the following URL:

`GET /users/search?name=peter#foo&publicProfile=true`

> Note

>It's essential that you URL-encode the # character. Otherwise the front-end application will interpret it as a fragment identifier and it won't be passed to the internal API.

Review the response for clues about whether the query has been truncated. For example, if the response returns the user `peter`, the server-side query may have been truncated. If an `Invalid name` error message is returned, the application may have treated `foo` as part of the username. This suggests that the server-side request may not have been truncated.

If you're able to truncate the server-side request, this removes the requirement for the `publicProfile` field to be set to true. You may be able to exploit this to return non-public user profiles.

## Injecting invalid parameters
You can use an `URL-encoded &` character to attempt to add a second parameter to the server-side request.

For example, you could modify the query string to the following:

`GET /userSearch?name=peter%26foo=xyz&back=/home`

This results in the following server-side request to the internal API:

`GET /users/search?name=peter&foo=xyz&publicProfile=true`
Review the response for clues about how the additional parameter is parsed. For example, **if the response is unchanged this may indicate that the parameter was successfully injected but ignored by the application**.

To build up a more complete picture, you'll need to test further.

## Injecting valid parameters
If you're able to modify the query string, you can then attempt to add a second valid parameter to the server-side request.

>Related pages

>For information on how to identify parameters that you can inject into the query string, see the Finding hidden parameters section.

For example, if you've identified the email parameter, you could add it to the query string as follows:

`GET /userSearch?name=peter%26email=foo&back=/home`

This results in the following server-side request to the internal API:

`GET /users/search?name=peter&email=foo&publicProfile=true`

Review the response for clues about how the additional parameter is parsed.

## Overriding existing parameters
To confirm whether the application **is vulnerable to server-side parameter pollution**, you could try to **override the original parameter**. Do this by **injecting a second parameter with the same name**.

For example, you could modify the query string to the following:

`GET /userSearch?name=peter%26name=carlos&back=/home`

This results in the following server-side request to the internal API:

`GET /users/search?name=peter&name=carlos&publicProfile=true`

The internal API interprets two name parameters. The impact of this depends on how the application processes the second parameter. This varies across different web technologies. For example:

- `PHP` **parses the last parameter only**. This would result in a user search for `carlos`.
- `ASP.NET` **combines both parameters**. This would result in a user search for `peter,carlos`, which might result in an Invalid username error message.
- `Node.js / express` **parses the first parameter only**. This would result in a user search for `peter`, giving an unchanged result.

If you're able to override the original parameter, you may be able to conduct an exploit. For example, you could add name=administrator to the request. This may enable you to log in as the administrator user.
