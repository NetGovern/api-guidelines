# Patterns

## Controllers

Controller resources (actions) are like executable functions with parameters and return values. It's RECOMMENDED to design endpoint configurations that don't require controllers.

In case you still need to use controller, it MUST appear as the last segment in a URI path, with no child resources in the hierarchy.

HTTP method SHOULD be `POST`.

Example: `POST /jobs/archive/{jobId}/start`


## Batch/bulk operations

TODO


