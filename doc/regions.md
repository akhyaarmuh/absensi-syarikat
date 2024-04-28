# Regions API Spec

## Create Region

Endpoint : POST /api/regions

Cookies:

- Authorization = Bearer [AccessToken]

Request Body :

```json
{
  "name": "Barabai Kota"
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "name": "Barabai Kota",
    "created_at": "2024-04-20T00:37:46.000Z",
    "updated_at": "2024-04-20T00:37:46.000Z"
  }
}
```

Response Body Failed (422) :

```json
{
  "message": "Unprocessable Content",
  "data": {
    "name": "Nama wilayah hanya boleh terdiri dari huruf dan angka"
  },
  "error": {
    "statusCode": 422,
    "data": {
      "name": "Nama wilayah hanya boleh terdiri dari huruf dan angka"
    }
  }
}
```

Response Body Failed (400) :

```json
{
  "message": "Wilayah ini sudah ada",
  "error": {
    "statusCode": 400
  }
}
```

## Get All Region

Endpoint : GET /api/regions

queries:

- name = string (optional)
- page = number (optional)
- limit = number
- sort = string (optional)

Cookies:

- refresh-token = [refreshToken]

Response Body (Success) :

```json
{
  "data": [
    {
      "id": 1,
      "name": "Barabai Kota",
      "created_at": "2024-04-20T00:37:46.000Z",
      "updated_at": "2024-04-20T00:37:46.000Z"
    },
    {
      "id": 2,
      "name": "Barabai",
      "created_at": "2024-04-20T01:10:53.000Z",
      "updated_at": "2024-04-20T01:10:53.000Z"
    },
    {
      "id": 3,
      "name": "Pamangkih",
      "created_at": "2024-04-20T01:11:05.000Z",
      "updated_at": "2024-04-20T01:11:05.000Z"
    },
    {
      "id": 4,
      "name": "Binjai",
      "created_at": "2024-04-20T01:11:16.000Z",
      "updated_at": "2024-04-20T01:11:16.000Z"
    },
    {
      "id": 5,
      "name": "Walangku",
      "created_at": "2024-04-20T01:11:23.000Z",
      "updated_at": "2024-04-20T01:11:23.000Z"
    }
  ],
  "rows": 5,
  "page": 1,
  "pages": 1,
  "limit": 20
}
```

## Update Region By ID

Endpoint : PATCH /api/regions/:id

Cookies:

- Authorization = Bearer [AccessToken]

Request Body :

```json
{
  "name": "Barabai Darat"
}
```

Response Body Failed (422) :

```json
{
  "message": "Unprocessable Content",
  "data": {
    "name": "Nama wilayah hanya boleh terdiri dari huruf dan angka"
  },
  "error": {
    "statusCode": 422,
    "data": {
      "name": "Nama wilayah hanya boleh terdiri dari huruf dan angka"
    }
  }
}
```

Response Body Failed (400) :

```json
{
  "message": "Wilayah ini sudah ada",
  "error": {
    "statusCode": 400
  }
}
```

## Delete Region By ID

Endpoint : DELETE /api/regions/:id

Cookies:

- Authorization = Bearer [AccessToken]

Response Body (Success) :

```json
{
  "data": {
    "id": 6,
    "name": "tes updated",
    "created_at": "2024-04-20T01:41:18.000Z",
    "updated_at": "2024-04-20T09:41:54.000Z"
  }
}
```

Response Body Failed (500) :

```json
{
  "message": "\nInvalid `prisma.regions.delete()` invocation:\n\n\nAn operation failed because it depends on one or more records that were required but not found. Record to delete does not exist.",
  "error": {
    "name": "PrismaClientKnownRequestError",
    "code": "P2025",
    "clientVersion": "5.12.1",
    "meta": {
      "modelName": "regions",
      "cause": "Record to delete does not exist."
    }
  }
}
```
