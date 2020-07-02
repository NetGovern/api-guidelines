## General

Async operations are also known as long running operations.

The same resource MAY implement both async and sync behaviour by expecting `Prefer: respond-async` header for async requests.

Request to perform async operation should return response with 202 status code and `_links.self` pointing to monitoring URL.

Monitoring of accepted operation SHOULD be done by `GET <monitoring URL>`. The response will depend on the nature of the operation.

Monitoring responses MAY contain `Retry-After` header.

## Async Operation on one Resource

Async operations SHOULD be resource based. For example, to stop job run:

```
DELETE /job-runs/{id}
...
HTTP/1.1 202 Accepted

{
  "_links": {
    "self": {
      "href": "/job-runs/{id}"
    }
  }
}
```

The job run is still running:

```
GET /job-runs/{id}
...
HTTP/1.1 200 OK
{
  "state": "PROCESSING"
  <other job run info>
}
```


The job run is successfully stopped:

```
GET /job-runs/{id}
...
HTTP/1.1 200 OK
{
  "state": "STOPPED"
  <other job run info>
}
```

If system wasn't able to stop the job after some timeout:

```
GET /job-runs/{id}
...
HTTP/1.1 200 OK
{
  "state": "ZOMBIE"
  <other job run info>
}
```

Same approach works if the inital request was done to the controller resource:

```
POST /clusters/{id}/reboot
...
HTTP/1.1 202 Accepted

{
  "_links": {
    "self": {
      "href": "/clusters/{id}"
    }
  }
}
```


## Async Bulk Operations

It is preferable for async bulk operations to follow resoure-based approach too.

The first case is when async bulk can be run only one at the time. For example, importing users:

```
POST /users/maps/import
...

HTTP/1.1 202 Accepted

{
  "_links": {
    "self": {
      "href": "/users/maps/import/{id}"
    }
  }
}
```


For monitoring the status:

```
GET /users/import/{id}
...

HTTP/1.1 200 Accepted
Retry-After: 30

{
  "state": "PROCESSING"
}
```

If the whole operation fails, monitoring response should be:

```
GET /users/import/{id}
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

And if operation succeeds, it SHOULD have typical bulk operation response schema with `state: "COMPLETED"` and code `207`.

You SHOULD consider whether async bulk operation can be modelled as `job` and `job-run` resources.
