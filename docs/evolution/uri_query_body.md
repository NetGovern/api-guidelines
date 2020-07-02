## URI

URI is meant to express an identity of a resource and it MUST NOT convey any other information.

The API design process MUST NOT start with the design of URIs. Contrary, the URI SHOULD be amongst the last few things added to the API design.

## Query Parameters

Query parameters represent metadata required to execute _queries:_ sorting, pagination, embedding, etc.

They MUST NOT be used for expressing resource state.

## Message Body

Properites defined in the message body represent resource state and occasionally additional metadata.
