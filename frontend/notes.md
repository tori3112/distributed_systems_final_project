## User Authentication

For user authentication, we use `Auth0` platform that abstracts much of the complexity by handling token acquisition, storage, validation and renewal automatically. In particular, a JWT token is used as ID token serving as means of user identification. On top of that, we also have access token that represents the authorization granted to the user. 

The authentication flow in the web application starts when a user clicks `Log In` button that redirects them to Auth0's Universal login page. When the user entered correct credentials, `Auth0` validates them and after successfull authenticaion, it redirects back to the web application. This redirect includes the authorization code in the URL. The `Auth0` SDK automatically exchanges the authorization code for the access token which occurs via  background API call. The `Auth0` SDK then stores the tokens securely in browser memory. The SDK manages the tokens lifecycle, including expiration and renewal. 

## REST Communication

The implementation for the REST communication with the web application involves three main layers:

- API client layer that configures and manages the HTTP requests
- service layer that defines specific API endpoints for each object
- hook layer that provides hooks for components to consume API data

Specifically, the API client (`apiClient.js`) provides configured axios instance which ensures a consistent base URL, headers and timeout settings. Aside from that, for each object (package, accommodation, ticket) there is a service file definying the corresponding service files and a hook file with React hooks for components.

```mermaid
sequenceDiagram
    participant Component
    participant objectHook
    participant useResource
    participant apiClient
    
    Component->>+objectHook: Call hook
    objectHook->>+useResource: Request data
    useResource->>+apiClient: Make API request
    
    alt Success Path
        apiClient-->>-useResource: Raw response
        Note over useResource: Transform response
        useResource-->>-objectHook: Transformed data
        objectHook-->>-Component: {data, loading: false}
        
        Note over Component: Render data
    else Error Path
        apiClient-->>useResource: Error response
        useResource-->>objectHook: Error state
        objectHook-->>Component: {error, loading: false}
        
        Note over Component: Render error state
    end
```