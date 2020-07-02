## Response Message Format

All response messages MUST support an `application/hal+json` [(HAL) format](message/hal.md).


## Error Response Format

The `application/problem+json` [(Problem Detail)](message/errors.md) MUST be used to communicate details about an error.


## Request Message Format

Request messages with body SHOULD support a `application/json` (JSON) format.

Where applicable, request message MAY also support the `application/hal+json` format.

## Content Negotiation

In case the client did not provide accepted message format, server SHOULD respond with the default format (HAL).
