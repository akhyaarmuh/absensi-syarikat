# Users API Spec

## Create User

Endpoint : POST /api/users

Cookies:

- Authorization = Bearer [AccessToken]

Request Body :

```json
{
  "full_name": "User 1",
  "email": "user1@gmail.com",
  "password": "Rahasia123"
}
```

Response Body (Success) :

```json
{
  "data": {
    "full_name": "Akhyaar Muhammad",
    "email": "user1@gmail.com"
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
  "message": "Email ini sudah digunakan",
  "error": {
    "statusCode": 400
  }
}
```

## Get All User

Endpoint : GET /api/users

queries:

- full-name = string (optional)
- page = number (optional)
- limit = number (optional)

Cookies:

- refresh-token = [refreshToken]

Response Body (Success) :

```json
{
  "data": [
    {
      "id": 1,
      "full-name": "Akhyar Muhammad",
      "email": "admin@gmail.com"
    },
    {
      "id": 2,
      "full-name": "Noor Azizah",
      "email": "user1@gmail.com"
    },
    {
      "id": 3,
      "full-name": "Muhammad Hilmi",
      "email": "user2@gmail.com"
    }
  ],
  "rows": 3,
  "page": 1,
  "pages": 1,
  "limit": 20
}
```

## Get User By Id

Endpoint : GET /api/users/:id

Cookies:

- refresh-token = [refreshToken]

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "full-name": "Akhyar Muhammad",
    "email": "admin@gmail.com"
  }
}
```

## Update User By ID

Endpoint : PATCH /api/users/:id

Cookies:

- Authorization = Bearer [AccessToken]

Request Body :

```json
{
  "full_name": "Muhammad Akhyar"
  "email": "admin@gmail.com"
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
  "message": "Email ini sudah digunakan",
  "error": {
    "statusCode": 400
  }
}
```

## Delete User By ID

Endpoint : DELETE /api/users/:id

Cookies:

- Authorization = Bearer [AccessToken]

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "full_name": "Muhammad Akhyar",
    "email": "admin@gmail.com",
    "created_at": "2024-04-20T01:41:18.000Z",
    "updated_at": "2024-04-20T09:41:54.000Z"
  }
}
```

Response Body Failed (500) :

```json
{
  "message": "\nInvalid `prisma.users.delete()` invocation:\n\n\nAn operation failed because it depends on one or more records that were required but not found. Record to delete does not exist.",
  "error": {
    "name": "PrismaClientKnownRequestError",
    "code": "P2025",
    "clientVersion": "5.12.1",
    "meta": {
      "modelName": "users",
      "cause": "Record to delete does not exist."
    }
  }
}
```
