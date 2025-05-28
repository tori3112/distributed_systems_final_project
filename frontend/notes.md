## User Authentication

For user authentication, we use `Auth0` platform that abstracts much of the complexity by handling token acquisition, storage, validation and renewal automatically. In particular, a JWT token is used as ID token serving as means of user identification. On top of that, we also have access token that represents the authorization granted to the user. 

The authentication flow in the web application starts when a user clicks `Log In` button that redirects them to Auth0's Universal login page. When the user entered correct credentials, `Auth0` validates them and after successfull authenticaion, it redirects back to the web application. This redirect includes the authorization code in the URL. The `Auth0` SDK automatically exchanges the authorization code for the access token which occurs via  background API call. The `Auth0` SDK then stores the tokens securely in browser memory. The SDK manages the tokens lifecycle, including expiration and renewal. 

## REST Communication

