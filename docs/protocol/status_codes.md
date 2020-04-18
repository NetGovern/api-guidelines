## General

You MUST define all success responses in API specification.

You MUST define all error repospense in API specification if they convey application-specific funcational sematics or are used in non-standard way. Otherwise, combine them using the following pattern (OpenAPI 3):

```yaml
responses:
    ...
    default:
        description: Error occurred. See status code and problem object for more information.
        content:
            "application/problem+json":
                schema:
                    $ref: <ref to common Probem schema >
```

- APIs MUST NOT return a status code that is not defined in these tables.
- APIs MAY return only some of status codes defined in these tables.

## Success Codes

| Code | Description | Methods |
| ---- | ----------- | ------- |
| 200 OK | The standard success response. | \<all\> |
| 201 Created | Returned on successful entity creation. | POST |
| 202 Accepted | The request was successful and will be processed asynchronously. | POST, PUT, PATCH, DELETE |
| 204 No Content | There is no response body. | DELETE |
| 207 Multi-Status | The response body contains multiple status informations for different parts of a [bulk request](patterns/bulk.md). | POST |


## Client Side Error Codes

| Code | Description | Methods |
| ---- | ----------- | ------- |
| 400 Bad Request | Generic error. Should also be used in case of failing business logic validation. | \<all\> |
| 401 Unauthorized | Request failed because client is not authenticated. | \<all\> |
| 403 Forbidden | Request failed because client does not have authorization to access a specific resource. | \<all\> |
| 404 Not Found | The server has not found anything matching the request URI. This either means that the URI is incorrect or the resource is not available. | \<all\> |
| 405 Method Not Allowed | The server has not implemented the requested HTTP method. This is typically default behavior for API frameworks. | \<all\> |
| 406 Not Acceptable | The server MUST return this status code when it cannot return the payload of the response using the media type requested by the client. For example, if the client sends an `Accept: application/xml` header, and the API can only generate `application/json`. | \<all\> |
| 415 Unsupported Media Type | The server MUST return this status code when the media type of the request's payload cannot be processed or client sends request without content type. For example, if the client sends a `Content-Type: application/xml` header, but the API can only accept `application/json`. | POST, PUT, PATCH, DELETE |
| 429 Too Many Requests | The server must return this status code if the rate limit for the client has exceeded a predefined value. | \<all\> |


## Server Side Error Codes

| Code | Description | Methods |
| ---- | ----------- | ------- |
| 500 Internal Server Error | A generic error indicating an unexpected server execution problem. Client retry may be sensible. | \<all\> |
| 503 Service Unavailable | The server is temporarily unable to handle the request for a service. | \<all\> |
