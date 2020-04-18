This pattern covers only synchronious bulk operations. [For async bulk refer there](patterns/async.md#Async-Bulk-Operations).

HTTP does not define how bulk requests should be handled, therefore, our approach is that any bulk request:

- SHOULD always respond with HTTP status code `207` unless a failure
applies to the whole request.

- MAY return `4xx/5xx` status codes if the failure isn't restricted to
individual items (e.g., generic service failures).

- Response with status code `207` MUST always be a multi-status response
containing item specific status and/or monitoring information for each
item in the request.

Typical response mode:

```yaml
BulkResponse:
  title: BulkResponse
  type: object
  properties:
    succeeded:
      type: array
      items:
        type: object
        properties:
          instance:
            type: string
            description: Identifier that specifies occurrence of the processed item in the request data.
          <... typical success body for this item...>
    failed:
      type: array
      items:
        $ref: '#/definitions/Problem'
  required:
    - succeeded
    - failed
```

Array  of errors contains a list [of `problem+json`-style errors](message/errors.md),
where `instance` field is required.


