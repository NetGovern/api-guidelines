# HTTP Request Methods

Usage of HTTP methods MUST be compliant with the standardized semantics.

Methods MUST follow their respective common properties:

* **Safe** methods only for retrival of reourse representations and not affecting server state.

* **Idempotent** methods produce the same result if executed once or multiple times (and not causing uninteded effects). This does not require that the operation returns the same response and/or status code.

* **Cacheable** methods allows to respond to a current client request with a stored response from a prior request.

| Method | Safe | Idemptotent | Cacheable |
| ------ | ---- | ----------- | --------- |
| `GET` | + | + | + |
| `POST` | - | - | - |
| `PUT` | - | + | - |
| `PATCH` | - | + | - |
| `DELETE` | - | + | - |


## GET

`GET` requests are used to **read** either [a single](patterns.md#Read-resource) or [a collection resource](patterns.md#Read-collection).

Executing `GET` MUST NOT affect the system and/or change response on subsequent requests.


`GET` request MUST NOT have a request body payload.


## POST

`POST` is used for:

* [resource **creation**](patterns.md#Create-resource) (usually single)

* activating [controller resource](patterns.md#Controllers)

* [complex searches](patterns.md#Read-with-large-inputs)


## PUT

`PUT` requests are used to **update entire** resources ([single](patterns.md#Update-resource) or collection).

It is not recommended to allow `PUT` for updating the entire collection.

## PATCH

`PATCH` requests are used to [**update parts** of a single resource](patterns.md#Partially-update-resource).

`PATCH` MUST NOT be used on collections.


## DELETE

`DELETE` requests are used to [**delete** resources](patterns.md#Delete-resource).

