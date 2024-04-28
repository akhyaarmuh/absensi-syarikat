# Events API Spec

## Create Event

Endpoint : POST /api/events

Cookies:

- Authorization = Bearer [AccessToken]

Request Body :

```json
{
  "name": "Pamangkih | Hj. Nidawati bnt H. Ideham",
  "type": "dzikiran | kematian",
  "description?": ""
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "name": "Pamangkih | Hj. Nidawati bnt H. Ideham",
    "type": "dzikiran | kematian",
    "description": "",
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
    "name": "Judul kegiatan hanya boleh terdiri dari huruf dan angka"
  },
  "error": {
    "statusCode": 422,
    "data": {
      "name": "Judul kegiatan hanya boleh terdiri dari huruf dan angka"
    }
  }
}
```

## Create Attendance By Id Event

Endpoint : GET /api/events/:event_id

Cookies:

- refresh-token = [refreshToken]

Request Body :

```json
{
  "no_induk": "987",
  "type": "dzikiran",
  "created_at": "2024-04-20T13:11:41.000Z"
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": 6,
    "no_induk": "987",
    "full_name": "Muhammad Hilmi",
    "father_name": "H. Abdul Wahid",
    "address": "Amuntai, Ds. Tigarun",
    "image": null,
    "status": "new",
    "regions": {
      "name": "Binjai"
    }
  }
}
```

## Get All Event

Endpoint : GET /api/events

queries:

- name = string (optional)
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
      "name": "Pamangkih",
      "type": "dzikiran",
      "description": "",
      "created_at": "2024-04-20T00:37:46.000Z",
      "updated_at": "2024-04-20T00:37:46.000Z"
    },
    {
      "id": 2,
      "name": "Hj. Nidawati bnt H. Ideham",
      "type": "kematian",
      "description": "Masjid Jami",
      "created_at": "2024-04-20T00:37:46.000Z",
      "updated_at": "2024-04-20T00:37:46.000Z"
    },
    {
      "id": 3,
      "name": "Pamangkih",
      "type": "dzikiran",
      "description": "",
      "created_at": "2024-04-20T00:37:46.000Z",
      "updated_at": "2024-04-20T00:37:46.000Z"
    },
    {
      "id": 4,
      "name": "Pamangkih",
      "type": "dzikiran",
      "description": "",
      "created_at": "2024-04-20T00:37:46.000Z",
      "updated_at": "2024-04-20T00:37:46.000Z"
    },
    {
      "id": 5,
      "name": "Pamangkih",
      "type": "dzikiran",
      "description": "",
      "created_at": "2024-04-20T00:37:46.000Z",
      "updated_at": "2024-04-20T00:37:46.000Z"
    }
  ],
  "rows": 5,
  "page": 1,
  "pages": 1,
  "limit": 20
}
```

## Get Attendance Details By Id Event

Endpoint : GET /api/events/:id/attendance-details

queries:

- no-induk = string (optional)
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
      "members": {
        "no_induk": "2200370",
        "full_name": "hadimah",
        "father_name": "abdul hamid",
        "address": "pemangkih"
      }
    },
    {
      "members": {
        "no_induk": "2301107",
        "full_name": "nurjannah",
        "father_name": "H Sarani",
        "address": "binjai pemangkih"
      }
    },
    {
      "members": {
        "no_induk": "2301651",
        "full_name": "raudah",
        "father_name": "iwi",
        "address": "perumahan"
      }
    },
    {
      "members": {
        "no_induk": "2302342",
        "full_name": "Sri Maulini",
        "father_name": "Supiani",
        "address": "Pemangkih"
      }
    }
  ],
  "rows": 4,
  "page": 1,
  "pages": 1,
  "limit": 20
}
```

## Update Event By ID

Endpoint : PATCH /api/events/:id

Cookies:

- Authorization = Bearer [AccessToken]

Request Body :

```json
{
  "name": "Hj. Nidawati bnt H. Ideham",
  "type": "kematian",
  "description?": "Masjid Walangku"
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

## Delete Event By ID

Endpoint : DELETE /api/events/:id

Cookies:

- Authorization = Bearer [AccessToken]

Response Body (Success) :

```json
{
  "data": {
    "id": 6,
    "name": "Pamangkih",
    "type": "dzikiran",
    "description": "",
    "created_at": "2024-04-20T00:37:46.000Z",
    "updated_at": "2024-04-20T00:37:46.000Z"
  }
}
```

Response Body Failed (500) :

```json
{
  "message": "\nInvalid `prisma.events.delete()` invocation:\n\n\nAn operation failed because it depends on one or more records that were required but not found. Record to delete does not exist.",
  "error": {
    "name": "PrismaClientKnownRequestError",
    "code": "P2025",
    "clientVersion": "5.12.1",
    "meta": {
      "modelName": "events",
      "cause": "Record to delete does not exist."
    }
  }
}
```
