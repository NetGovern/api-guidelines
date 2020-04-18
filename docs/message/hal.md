## General

The [`application/hal+json`](http://stateless.co/hal_specification.html) (HAL) MUST be used as the representation format of a resource.

This document provides intro to the HAL media type, [read specification](http://stateless.co/hal_specification.html) or [RFC](https://tools.ietf.org/html/draft-kelly-json-hal-08) for more details.

## Simple Document Example

Representation of _Key_ resource might look like:

```json
{
  "_links": {
    "self": {
      "href": "/keys/db602bbd-9ae6-4aad-8372-58605417bc45"
    }
  },
  "id": "db602bbd-9ae6-4aad-8372-58605417bc45"
}
```

The field `_links` in HAL denotes a list of link relations: a pair of a relation identifier and a link (URI). These link relations are used to express the relation of a resource with other resources.

Each resource representation SHOULD include `self` link relation.

The `href` MUST be relative path to the API root.


## Relation Example

A more complex document example could be an _Job_ resource that has related resources _SourceLocations_ and _TargetLocation_ It might look like:

```json
{
  "_links": {
    "self": {
      "href": "/jobs/Sample"
    },
    "sourceLocations": [{
      "href": "/locations/1",
      "href": "/locations/2",
    }],
    "targetLocation": {
      "href": "/locations/3"
    }
  },
  "id": "Name",
  "status": "disabled"
}
```

## Embedding Example

Sometimes in order to simplify user flow we can embed some linked resources into the respresentation:

```json
{
  "_links": {
    "self": {
      "href": "/jobs/Sample"
    },
    "sourceLocations": [{
      "href": "/locations/1",
      "href": "/locations/2",
    }],
    "targetLocation": {
      "href": "/locations/3"
    }
  },
  "id": "Name",
  "status": "disabled",
  "_embedded": {
    "targetLocation": {
        "_links": {
            "self": {
                "href": "/locations/3"
            }
        },
        "id": 3,
        "type": "WFS"
    }
  }
}
```

Embedded resource representation MAY be only partial and MAY also contain their own embedded resources.


## Collection Example

Bounded collection represenation might look like this:

```json
{
  "_links": {
    "self": { "href": "/jobs" },
  },
  "totalCount": 2,
  "_embedded": {
    "item": [
      {
        "_links": {
            "self": {
                "href": "/jobs/archive"
            },
            "id": "archive",
            "description": "Archiving jobs."
        }
      },
      {
        "_links": {
            "self": {
                "href": "/jobs/email-index"
            },
            "id": "email-index",
            "description": "Email indexing jobs."
        }
      }
    ]
  }
}
```

Resources directly contained inside collection MUST be represented as items of `item` list. This is the only place where it is valid to use singular noun for list names, because [according to RFC 6573](https://tools.ietf.org/html/rfc6573) it is a recommended relation type for representing a member of a collection.


## Linking vs Embedding

Many other APIs include related resource exclusively via `_links` or via `_embedded`. But per [RFC](https://tools.ietf.org/html/draft-kelly-json-hal-08#section-8.3)

> Servers SHOULD NOT entirely "swap out" a link for an embedded resource (or vice versa) because client support for this technique is OPTIONAL.

Thus, our guidelines are:

* for single resource you SHOULD continue to indicate embedded resources in `_links`
* for collections you MAY omit items from `_links`
