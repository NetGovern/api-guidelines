# Patterns

## Basic operations

### Read collection

A collection resource should return a list of represenations of all of the given resources including any related metadata. Not all metadata MAY be returned.

Response body SHOULD contain `totalCount` property unless there are performance limitations.

If collection is empty response code should be `200`.

If collection does not exist response code should be `404`.

#### Sorting

Clients MUST assume no inherent ordering of resuls unless default sort order is specified.

Collection MAY support sorting by indicating a `sort` query parameter.

`sort` value is a list of fields which defines the sort order. To indicate descending sorting direction fields are prefixed with `-`.

_Example:_

```
GET /keys?sort=-created_time,id
```


#### Pagination

All unbounded collections MUST support pagination by using query parameters:

* `offset` and `limit`
* `cursor` in case of cursor-based pagination

A colection resources SHOULD provide `first`, `last`, `next`, and `prev` links for navigation within the collection.

_Example:_

```
{
  "_links": {
    "self": { "href": "/keys?offset=100&limit=10" },
    "prev": { "href": "/keys?offset=90&limit=10" },
    "next": { "href": "/keys?offset=110&limit=10" },
    "first": { "href": "/keys?limit=10" },
    "last": { "href": "/keys?offset=900&limit=10" }
  },
  "totalCount": 910,
  "_embedded": {
    "keys": [
      { ... },
      ...
    ]
  }
}
```

#### Filtering

Collection MAY support filtering via query parameters which should be named as close as possible to resource properties.

In case some filters are mutually exclusive or require the presence of another parameter, the explanation MUST be part of the operation's description.

_Example:_

```
GET /keys?description=system
```


### Read resource
Use `GET` method.

A single resource is typicall derived from the parent collection and often is more detailed than an item in the representaion of a collection resource.

_Example:_

```
GET /keys/db602bbd-9ae6-4aad-8372-58605417bc45
```

Response if resource exists:

```
200 OK
{
  "id": "db602bbd-9ae6-4aad-8372-58605417bc45",
  "description": "System key",
  "created_time": "2014-10-10T16:10:55Z",
  "updated_time": "2014-10-10T16:10:55Z",
  "hash": "...",
  "_links": {
    "self": {
      "href": "/keys/db602bbd-9ae6-4aad-8372-58605417bc45"
    }
  }
}
```

If the resource doesn't exist, `GET` should respond with `404` code.

### Read with large inputs

While there are no specific limits on the length of a URI, some servers or clients might have difficulties handling ling URIs.

In that case you MUST use `POST` and expect query parameters as a request body.


### Create resource

Use `POST` method.

The request body MAY be different than in `GET` or `PUT` response/request (as the server generates some values).

In most cases the service SHOULD produce an identifier for the resourse.

Response MAY provide complete representation of the created resource.

Response MUST contain hypermedia control links to help the client retrieving the complete representation.

_Example_ (note that some values are server-generated):

```
POST /keys
{
  "description": "System key"
}
```

Full representation response:
```
201 Created
{
  "id": "db602bbd-9ae6-4aad-8372-58605417bc45",
  "description": "System key",
  "created_time": "2014-10-10T16:10:55Z",
  "updated_time": "2014-10-10T16:10:55Z",
  "hash": "...",
  "_links": {
    "self": {
      "href": "/keys/db602bbd-9ae6-4aad-8372-58605417bc45"
    }
  }
}
```

Links-only response:

```
201 Created
{
  "_links": {
    "self": {
      "href": "/keys/db602bbd-9ae6-4aad-8372-58605417bc45"
    }
  }
}
```

In case of any validation errors (including conflicts), `POST` should respond with `400` code.

### Update resource
Use `PUT` method.

Request body should correspod to the read response, except for `readOnly` fileds and system-calculated values. If supplied, they should be ignored.

_Example_:

```
PUT /keys/db602bbd-9ae6-4aad-8372-58605417bc45
{
  "id": "db602bbd-9ae6-4aad-8372-58605417bc45",
  "description": "New value",
  "created_time": "2014-01-01T16:10:55Z",
}
```

Successful response:

```
200 OK
{
  "_links": {
    "self": {
      "href": "/keys/db602bbd-9ae6-4aad-8372-58605417bc45"
    }
  }
}
```

We always use `200` code and hypermedia controls links in the body in order to support operations with valid id updates.

If the resource doesn't exist, `PUT` should respond with `404` code.

In case of any validation errors (including conflicts), `PUT` should respond with `400` code.


### Partially update resource
Use `PATCH` method.

You SHOULD consider limiting endpoint to only one updating pattern: complete or partitial.

You MUST expect only one type of partitial update per endpoint:

* either [JSON Merge Patch](https://tools.ietf.org/html/rfc7396) with media type `application/merge-patch+json`
* or [JSON Patch](https://tools.ietf.org/html/rfc6902) with media type `application/json-patch+json`

_Example_ for JSON Merge Patch:

```
PATCH /keys/db602bbd-9ae6-4aad-8372-58605417bc45
Content-Type: application/merge-patch+json
{
  "id": "db602bbd-1111-2222-8372-58605417bc45"
}
```

Successful response should return the entire resource representation:

```
200 OK
{
  "id": "db602bbd-1111-2222-8372-58605417bc45",
  "description": "System key",
  "created_time": "2014-10-10T16:10:55Z",
  "updated_time": "2014-12-10T16:10:55Z",
  "_links": {
    "self": {
      "href": "/keys/db602bbd-1111-2222-8372-58605417bc45"
    }
  }
}
```

If the resource doesn't exist, `PATCH` should respond with `404` code.

In case of any validation errors (including conflicts), `PATCH` should respond with `400` code.

### Delete resource
Use `DELETE` method.

_Example_:

```
DELETE /keys/db602bbd-9ae6-4aad-8372-58605417bc45
```

Response if the resource was deleted:

```
204 No Content
```

If the resource doesn't exist, `DELETE` should respond with `404` code.

Delete operation can be either recursive or not which should be indicated in the documentation.

## Controllers

Controller resources (actions) are like executable functions with parameters and return values. It's RECOMMENDED to design endpoint configurations that don't require controllers.

In case you still need to use controller, it MUST appear as the last segment in a URI path, with no child resources in the hierarchy.

HTTP method SHOULD be `POST`.

Example: `POST /jobs/start`


## Bulk operations

This pattern covers only synchronious bulk operations. [For async bulk refer there](patterns.md#Async-bulk-operations).

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

Array  of errors contains a list [of `problem+json`-style errors](code_and_errors.md#Errors),
where `instance` field is required.



## Async operations

Async operations are also known as long running operations.

The same resource MAY implement both async and sync behaviour by expecting `Prefer: respond-async` header for async requests.

Request to perform async operation should return response as in the example:

```
HTTP/1.1 202 Accepted
Operation-Location: <monitoring URL>
```

Monitoring of accepted operation MUST be done by `GET <monitoring URL>`. The response will depend on the nature of the operation.

Monitoring responses MAY contain `Retry-After` header.

### Async operation on one resource

Async operations SHOULD be resource based. For example, to stop job run:

```
DELETE /job-runs/{jobRunId}
...
HTTP/1.1 202 Accepted
Operation-Location: https://<host>/job-runs/{jobRunId}
```

The job run is stopping:

```
GET /job-runs/{jobRunId}
...
HTTP/1.1 200 OK
{
  "state": "stopping"
  <other job run info>
}
```


The job run is successfully stopped:

```
GET /job-runs/{jobRunId}
...
HTTP/1.1 200 OK
{
  "state": "stopped"
  <other job run info>
}
```

If system wasn't able to stop the job after some timeout:

```
GET /job-runs/{jobRunId}
...
HTTP/1.1 200 OK
{
  "state": "zombie"
  <other job run info>
}
```

Same approach works if the inital request was done to the controller resource:

```
POST /clusters/{clusterId}/reboot
...
HTTP/1.1 202 Accepted
Operation-Location: https://<host>/clusters/{clusterId}
```


### Async bulk operations

It is preferable for async bulk operations to follow resoure-based approch too.

The first case is when async bulk can be run only one at the time. For example, importing users:

```
POST /users/import
...

HTTP/1.1 202 Accepted
Operation-Location: https://<host>/users/import
```


For monitoring the status:

```
GET /users/import
...

HTTP/1.1 200 Accepted
Retry-After: 30
Content-Type: application/json

{
  "state": "processing"
}
```

If the whole operation fails, monitoring response should be:

```
GET /users/import
...

HTTP/1.1 500
Content-Type: application/problem+json

{
  "state": "failed"
  "type": "...",
  "status": 500,
  "title": "...",
  "detail", "..."
}
```

And if operation succeeds, it should have typical bulk operation response schema with `state: "completed"` and code `207`.


The second case is when there could be more then one similar async bulk operations running. Then, the same import flow has a different first steps:


```
POST /users/import
...

HTTP/1.1 202 Accepted
Operation-Location: https://<host>/users/import/{importId}
```


For monitoring the status:

```
GET /users/import/{importId}
...

HTTP/1.1 200 Accepted
Retry-After: 30
Content-Type: application/json

{
  "state": "processing"
}
```

The next steps are the same. But you SHOULD consider whether it can be modelled as `job` and `job-run` resources.
