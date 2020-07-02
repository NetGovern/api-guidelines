## Read Collection

A collection resource should return a list of represenations of all of the given resources including any related metadata. Not all metadata MAY be returned.

Response body SHOULD contain `totalCount` property unless there are performance limitations.

If collection is empty response code should be `200`.

If collection does not exist response code should be `404`.

### Sorting

Clients MUST assume no inherent ordering of results unless default sort order is specified.

Collection MAY support sorting by indicating a `sort` query parameter.

`sort` value is a list of fields which defines the sort order. To indicate descending sorting direction fields are prefixed with `-`.

_Example:_

```
GET /keys?sort=-created_time,id
```


### Pagination

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
    "items": [
      { ... },
      ...
    ]
  }
}
```

### Filtering

Collection MAY support filtering via query parameters which should be named as close as possible to resource properties.

In case some filters are mutually exclusive or require the presence of another parameter, the explanation MUST be part of the operation's description.

_Example:_

```
GET /keys?description=system
```


## Read Resource
Use `GET` method.

A single resource is typically derived from the parent collection and often is more detailed than an item in the representaion of a collection resource.

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

## Read With Large Inputs

While there are no specific limits on the length of a URI, some servers or clients might have difficulties handling ling URIs.

In that case you MUST use `POST` and expect query parameters as a request body.


## Create Resource

Use `POST` method.

The request body MAY be different than in `GET`, `PUT`, or `PATCH` response/request (as the server generates some values).

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
  "createdAt": "2014-10-10T16:10:55Z",
  "updatedAt": "2014-10-10T16:10:55Z",
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

In case of any validation errors, `POST` should respond with `400` code. `409` is reserved for `id`-level validation errors.

## Update Resource
Use `PUT` method.

Request body should correspod to the read response, except for `readOnly` fileds and system-calculated values. If supplied, they should be ignored.

_Example_:

```
PUT /keys/db602bbd-9ae6-4aad-8372-58605417bc45
{
  "id": "db602bbd-9ae6-4aad-8372-58605417bc45",
  "description": "New value",
  "createdAt": "2014-01-01T16:10:55Z",
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

We always use `200` code and hypermedia controls links in the body in order to support operations with valid `id` updates.

If the resource doesn't exist, `PUT` should respond with `404` code.

In case of any validation errors, `PUT` should respond with `400` or `409`codes.


## Partially Update Resource
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
  "createdAt": "2014-10-10T16:10:55Z",
  "updatedAt": "2014-12-10T16:10:55Z",
  "_links": {
    "self": {
      "href": "/keys/db602bbd-1111-2222-8372-58605417bc45"
    }
  }
}
```

If the resource doesn't exist, `PATCH` should respond with `404` code.

In case of any validation errors, `PATCH` should respond with `400` or `409`codes.

## Delete Resource
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
