In the message body there SHOULD NOT be any field with trailing "id," "href," "url," etc. in its name.

When a resource requires linking to other foreign objects, relation MUST be expressed as an object:

```json
{
  "id": "Sample job",
  "targetLocation": {
    "id": "1234"
  },
  "sourceLocations": [
    { "id": "1"},
    { "id": "2"}
  ]
  ...
}

```

Same rules applies for resources with or without corresponding resources.
