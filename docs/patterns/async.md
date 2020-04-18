## General

Async operations are also known as long running operations.

The same resource MAY implement both async and sync behaviour by expecting `Prefer: respond-async` header for async requests.

Request to perform async operation should return response as in the example:

```
HTTP/1.1 202 Accepted
Operation-Location: <monitoring URL>
```

Monitoring of accepted operation MUST be done by `GET <monitoring URL>`. The response will depend on the nature of the operation.

Monitoring responses MAY contain `Retry-After` header.

## Async Operation on one Resource

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


## Async Bulk Operations

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
