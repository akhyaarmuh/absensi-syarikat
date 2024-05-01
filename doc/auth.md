# Auth API Spec

## Sign-up User

Endpoint : POST /api/auth/sign-up

Request Body :

```json
{
  "full_name": "Akhyaar Muhammad",
  "email": "akhyaarmuh@gmail.com",
  "password": "123456789Aa"
}
```

Response Body (Success) :

```json
{
  "data": {
    "full_name": "Akhyaar Muhammad",
    "email": "akhyaarmuh@gmail.com"
  }
}
```

Response Body (Failed) :

```json
{
  "data": {
    "message": "Unprocessable Content",
    "data": {
      "full_name": "Nama lengkap hanya boleh huruf saja",
      "email": "Wajid diisi"
    },
    "error": "Object Error"
  }
}
```

## Sign-in User

Endpoint : POST /api/auth/sign-in

Request Body :

```json
{
  "email": "akhyaarmuh@gmail.com",
  "password": "123456789Aa"
}
```

Response Body (Success) :

Set Cookie :

refresh-token = [refresh-token]

```json
{
  "data": "[refres-token]",
  "payload": {
    //isi dari payload example
    "id": 1,
    "full_name": "Muhammad Akhyar",
    "role": "admin",
    "status": 1
  }
}
```

Response Body Failed (402) :

```json
{
  "data": {
    "message": "Unprocessable Content",
    "data": {
      "email": "Wajid diisi"
    },
    "error": "Object Error"
  }
}
```

## Refresh Token

Endpoint : GET /api/auth/refresh-token

Request Cookie :

refresh-token = [refresh-token]

Response Body (Success) :

```json
{
  "data": "[access-token]",
  "payload": {
    //isi dari payload example
    "id": 1,
    "full_name": "Muhammad Akhyar",
    "role": "admin",
    "status": 1
  }
}
```

Response Body (Failed) :

```json
{
  "data": {
    "message": "Akun anda terblokir",
    "data": null,
    "error": "Object Error"
  }
}
```

## Sign-out User

Endpoint : DELETE /api/auth/

Request Headers :

Authorization = Bearer [access-token]

Response Body (Failed) :

```json
{
  "data": {
    "message": "Access-token tidak tersedia",
    "data": null,
    "error": "Object Error"
  }
}
```

## Reset Password

Endpoint : DELETE /api/auth/reset-password

Request Body :

```json
{
  "email": "email@gmail.com"
}
```
