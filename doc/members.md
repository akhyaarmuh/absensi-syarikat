# Members API Spec

## Create Member

Endpoint : POST /api/members

Cookies:

- Authorization = Bearer [AccessToken]

Request Body :

```json
{
  "no_induk": "123456789",
  "full_name": "Hj. Nidawati",
  "birth": "1994-06-24",
  "father_name": "H. Ideham",
  "address": "Amuntai, Ds. Harusan",
  "region_id": 1
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": 8,
    "no_induk": "258",
    "full_name": "Muhammad Hilmi",
    "birth": "2001-01-01T00:00:00.000Z",
    "father_name": "H. Abdul Wahid",
    "address": "Amuntai, Ds. Tigarun",
    "region_id": 4,
    "status": "new",
    "image": null,
    "created_at": "2024-04-21T13:01:29.000Z",
    "updated_at": "2024-04-21T13:01:29.000Z"
  }
}
```

Response Body Failed (422) :

```json
{
  "message": "Unprocessable Content",
  "data": {
    "full_name": "Nama lengkap hanya boleh terdiri dari huruf"
  },
  "error": {
    "statusCode": 422,
    "data": {
      "full_name": "Nama lengkap hanya boleh terdiri dari huruf"
    }
  }
}
```

Response Body Failed (400) :

```json
{
  "message": "No. induk sudah digunakan",
  "error": {
    "statusCode": 400
  }
}
```

## Get All Member

Endpoint : GET /api/members

queries:

- no-induk = string (optional)
- full-name = string (optional)
- region = number (optional)
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
      "no_induk": "123",
      "full_name": "Hj. Nidawati",
      "father_name": "H. Ideham",
      "status": "new",
      "regions": {
        "id": 7,
        "name": "Amuntai"
      }
    },
    {
      "id": 2,
      "no_induk": "456",
      "full_name": "H. Abdul Wahid",
      "father_name": "H. Basran",
      "status": "new",
      "regions": {
        "id": 7,
        "name": "Amuntai"
      }
    },
    {
      "id": 3,
      "no_induk": "789",
      "full_name": "Laina Fitriani",
      "father_name": "H. Abdul Wahid",
      "status": "new",
      "regions": {
        "id": 3,
        "name": "Pamangkih"
      }
    },
    {
      "id": 4,
      "no_induk": "321",
      "full_name": "Muhammad Akhyar",
      "father_name": "H. Abdul Wahid",
      "status": "new",
      "regions": {
        "id": 1,
        "name": "Barabai Kota"
      }
    },
    {
      "id": 5,
      "no_induk": "654",
      "full_name": "Noor Azizah",
      "father_name": "Hamsawi",
      "status": "new",
      "regions": {
        "id": 2,
        "name": "Barabai Darat"
      }
    },
    {
      "id": 6,
      "no_induk": "987",
      "full_name": "Muhammad Hilmi",
      "father_name": "H. Abdul Wahid",
      "status": "new",
      "regions": {
        "id": 4,
        "name": "Binjai"
      }
    }
  ],
  "rows": 5,
  "page": 1,
  "pages": 1,
  "limit": 20
}
```

## Get Member By ID

Endpoint : GET /api/members/:id

Cookies:

- refresh-token = [refreshToken]

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "no_induk": "123",
    "full_name": "Hj. Nidawati",
    "birth": "1969-09-01T00:00:00.000Z",
    "father_name": "H. Ideham",
    "address": "Amuntai, Ds. Harusan",
    "region_id": 7,
    "status": "new",
    "image": null,
    "regions": {
      "id": 7,
      "name": "Amuntai"
    }
  }
}
```

## Get Absent Details Member By Id

Endpoint : GET /api/members/:id/absent-details

Cookies:

- refresh-token = [refreshToken]

Response Body (Success) :

```json
{
  "data": {
    "dzikiran_details": [
      {
        "name": "Pamangkih",
        "created_at": "2024-04-20T13:11:41.000Z",
        "hadir": 1
      },
      {
        "name": "Pamangkih",
        "created_at": "2024-04-20T13:11:40.000Z",
        "hadir": null
      },
      {
        "name": "Pamangkih",
        "created_at": "2024-04-20T13:11:39.000Z",
        "hadir": 1
      },
      {
        "name": "Pamangkih",
        "created_at": "2024-04-20T13:08:39.000Z",
        "hadir": null
      }
    ],
    "kematian_details": [
      {
        "name": "Hj. Nidawati",
        "created_at": "2024-04-20T13:11:26.000Z",
        "hadir": null
      }
    ]
  }
}
```

## Update Member By ID

Endpoint : PATCH /api/members/:id

Cookies:

- Authorization = Bearer [AccessToken]

Request Body :

```json
{
  "no_induk": "123456789",
  "full_name": "Hj. Nidawati",
  "birth": "1994-06-24",
  "father_name": "H. Ideham",
  "address": "Amuntai, Ds. Harusan",
  "region_id": 1,
  "status": "repeat"
}
```

Response Body Failed (422) :

```json
{
  "message": "Unprocessable Content",
  "data": {
    "full_name": "Nama lengkap hanya boleh terdiri dari huruf"
  },
  "error": {
    "statusCode": 422,
    "data": {
      "full_name": "Nama lengkap hanya boleh terdiri dari huruf"
    }
  }
}
```

Response Body Failed (400) :

```json
{
  "message": "No. induk sudah digunakan",
  "error": {
    "statusCode": 400
  }
}
```

## Delete Member By ID

Endpoint : DELETE /api/members/:id

Cookies:

- Authorization = Bearer [AccessToken]

Response Body (Success) :

```json
{
  "data": {
    "id": 8,
    "no_induk": "258",
    "full_name": "Muhammad Hilmi",
    "birth": "2001-01-01T00:00:00.000Z",
    "father_name": "H. Abdul Wahid",
    "address": "Amuntai, Ds. Tigarun",
    "region_id": 4,
    "status": "new",
    "image": null,
    "created_at": "2024-04-21T13:01:29.000Z",
    "updated_at": "2024-04-21T13:01:29.000Z"
  }
}
```

Response Body Failed (500) :

```json
{
  "message": "\nInvalid `prisma.members.delete()` invocation:\n\n\nAn operation failed because it depends on one or more records that were required but not found. Record to delete does not exist.",
  "error": {
    "name": "PrismaClientKnownRequestError",
    "code": "P2025",
    "clientVersion": "5.12.1",
    "meta": {
      "modelName": "members",
      "cause": "Record to delete does not exist."
    }
  }
}
```
