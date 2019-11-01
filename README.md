# Paperflix APIs

## Setup & Commands

> For developer only.

#### 1. Download the repository
Just choose some folder on your terminal/shell to put this project. And then run this command:
```
> git clone git@bitbucket.org:nimbly/nimbly-api.git
```

And then choose the `functions` folder:
```
> cd functions
```

Run the `npm` command to install all dependencies package.
```
> npm install
```

#### 2. Install Firebase Tools
To use all Firebase method, event and command as locally. You must to install the [Firebase Tools](https://github.com/firebase/firebase-tools) on your local computer.
```
> npm install -g firebase-tools
```

#### 3. Running locally
a. Please make sure you have privillege to contribute at this project. Just [send me a message](muhammadfuaditrockz@gmail.com "Fuadit's Email") to get access to the database account(Firebase)

b. If you have an access to the database, please open [Firebase Account Pannel](https://console.firebase.google.com/u/0/project/nimbly-db/overview "Fling Firebase").

c. Open **settings** and choose **Project Settings**. And then choose **Service Account**.

d. Click **Generate new private key** button. It will be download file.json. It contains tokens and keys to give database access permission in the Firebase account from your computer.

e. Change the file name to `key.json`.

f. Move `key.json` to this repository. No problem, it will not be uploaded automatically when pushing to github, because it has been setup in `.gitignore`.

g. Run in your terminal:
```
> export GOOGLE_APPLICATION_CREDENTIALS="path/to/key.json"

> firebase emulators:start
```

***

## HTTP Status Code
You can see the **responsers code** from the our status code at the `./nimbly-api/functions/src/helpers/responsers.js`.

HTTP Code | Description | Object
----------|-------------|-------
200 | Success GET | `success_OK(message, data)`
201 | Success POST | `success_created(message, data)`
202 | Success PUT | `success_accepted(message, data)`
204 | Success NO CONTENT | `success_no_content(message, data)`
400 | Bad Request | `client_error_bad_request(message)`
401 | Token is not provided | `client_error_unauthorized(message)`
403 | Forbidden | `client_error_forbidden(message)`
404 | Not Found | `client_error_not_found(message)`
405 | Not Allowed | `client_error_not_allowed(message)`
500 | Internal Server Error | `server_error_internal(message)`
501 | Not Implemented Server Error | `server_error_not_implemented(message)`

***

## Authentication

> Endpoints for manage authentication in Paperflix.

#### Authentication Services
No | Name | HTTP Method | HTTP Requests | HTTP Code
---|------|-------------|---------------|----------
1 | REGISTER | POST | /v1_auth/register | 201, 403, 405, 500

#### 1. Register
**Production Endpoint:** `https://us-central1-paperflix-company.cloudfunctions.net/v1_auth/register`

**Development Endpoint:** `http://localhost:5000/paperflix-company/us-central1/v1_auth/register`

**Token Required:** No

**Description:** No description yet.

```javascript
{
  "firstname": your_firstname, //required
  "lastname": your_lastname, //required
  "email": your_email, //required
  "password": your_password, //required
  "avatar": your_photoURL, // optional
  "gender": your_gender, //required || enum["male" or "female"]
  "device_info": {
    all_device_info_objects // required
  },
}
```

**Success Response**
```
{
  "statusCode": 201,
  "error": false,
  "message": "Success create Paperflix account. Please open your email to confirmation your account.",
  "data": {
      "id": "duuQVHqOoS918H2bbogR"
  }
}    
```

**Error Response**
```
// Required not filled.
{
    "statusCode": 500,
    "error": true,
    "message": "Register failed, email cannot be empty."
}

// Email has been exists.
{
    "statusCode": 405,
    "error": true,
    "message": "Email ${email} has already taken by other user."
}
```

***