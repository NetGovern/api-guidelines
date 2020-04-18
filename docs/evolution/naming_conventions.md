## General

SHOULD use verbose naming and SHOULD NOT use abbreviations.

Exception: acronyms that are the dominant mode of expression in the domain being represented by the API.


## Resource Names

SHOULD use nouns except when [controller pattern](patterns/controllers.md) is unavoidable.

SHOULD use the plural version of a resource name. For example, `/jobs`.

Exception: the resourse is singleton within the system, e.g., `/status`.

Resource names MUST be lower-case and use only alphanumeric characters and hyphens. The hyphen character, `-`, MUST be used as a word separator. Example: `/file-archive`


## URI Template Variables

MUST be `camelCase`. Example: `/{tenantId}`.


## Query Parameter Names

MUST be `camelCase`.


## HTTP Headers

SHOULD prefer hyphenated-pascal-case with exception to common abbreviations. Example: `Original-Message-ID`


`X-` headers were initially reserved for proprietary parameters, but the usage of `X-` headers is deprecated per [RFC 6648](https://tools.ietf.org/html/rfc6648). It states that such headers should incorporate the organization’s name. In order to preserve backward compatibility, we keep the `X-` prefix for existing headers.

### Body Field Names

MUST be `camelCase`.

Prefixes such as `is_` or `has_` SHOULD NOT be used for keys of type boolean.

Fields that represent arrays SHOULD be named using plural nouns.


### Enums

MUST be `camelCase`.


## API Description

Naming conventions within API Description document (OpenAPI).


### operationId

`operationId` MUST be `camelCase`.


### Model Names

MUST be `PascalCase`.
