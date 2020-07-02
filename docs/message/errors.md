The [`application/problem+json`](https://tools.ietf.org/html/rfc7807)(Problem Detail) MUST be used to communicate details about an error.

Problem Detail is intended for use with the HTTP status codes 4xx and 5xx.

The RFC encourages problem types to be URI references pointing to the human-readable documentation, but we decided to follow [Zalando approach](https://opensource.zalando.com/restful-api-guidelines/#176). Thus, our problem types are not meant to be resolved and a valid format is: `/problems/unknown-location`.


Bulk error handling [is discussed here](patterns/bulk.md).
