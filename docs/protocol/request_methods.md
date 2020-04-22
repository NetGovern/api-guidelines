## General

Usage of HTTP methods MUST be compliant with the standardized semantics.

Methods MUST follow their respective common properties:

* **Safe** methods only for retrival of reourse representations and not affecting server state.

* **Idempotent** methods produce the same result if executed once or multiple times (and not causing uninteded effects). This does not require that the operation returns the same response and/or status code.

* **Cacheable** methods allows to respond to a current client request with a stored response from a prior request.

| Method   | Safe               | Idemptotent        | Cacheable          |
| -------- | ------------------ | ------------------ | ------------------ |
| `GET`    | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| `POST`   | :x:                | :x:                | :x:                |
| `PUT`    | :x:                | :heavy_check_mark: | :x:                |
| `PATCH`  | :x:                | :heavy_check_mark: | :x:                |
| `DELETE` | :x:                | :heavy_check_mark: | :x:                |


## GET

`GET` requests are used to **read** either [a single](patterns/basic.md#Read-resource) or [a collection resource](patterns/basic.md#Read-collection).

Executing `GET` MUST NOT affect the system and/or change response on subsequent requests.


`GET` request MUST NOT have a request body payload.


## POST

`POST` is used for:

* [resource **creation**](patterns/basic.md#Create-resource) (usually single)

* activating [controller resource](patterns/controllers.md)

* [complex searches](patterns/basic.md#Read-with-large-inputs)


## PUT

`PUT` requests are used to **update entire** resources ([single](patterns/basic.md#Update-resource) or collection).

It is not recommended to allow `PUT` for updating the entire collection.

## PATCH

`PATCH` requests are used to [**update parts** of a single resource](patterns/basic.md#Partially-update-resource).

`PATCH` MUST NOT be used on collections.


## DELETE

`DELETE` requests are used to [**delete** resources](patterns/basic.md#Delete-resource).

