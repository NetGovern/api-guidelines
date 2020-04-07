# Patterns

## Controllers

Controller resources (actions) are like executable functions with parameters and return values. It's RECOMMENDED to design endpoint configurations that don't require controllers.

In case you still need to use controller, it MUST appear as the last segment in a URI path, with no child resources in the hierarchy.

HTTP method SHOULD be `POST`.

Example: `POST /jobs/archive/{jobId}/start`


## Bulk operations

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
    processed:
      type: array
      items:
        type: object
        properties:
          instance:
            type: string
            description: An absolute URI that identifies the specific occurrence of the processed item.
            format: uri
          <... typical success body for this item...>
    errors:
      type: array
      items:
        $ref: '#/definitions/Problem'
  required:
    - processed
    - errors
```

Array  of errors contains a list [of `problem+json`-style errors](code_and_errors.md#Errors),
where `instance` field is required.


## Async operations

TODO


## Rate limiting

TODO
