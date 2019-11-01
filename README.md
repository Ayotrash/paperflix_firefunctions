# Paperflix APIs

## Setup & Commands

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