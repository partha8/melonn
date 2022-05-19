<h1 align="center">Melonn</h1>

<p align="center">
  A note taking web application.
  <br>
  <a target="__blank" href="https://melonn-8c85c.web.app/"><strong>To the site!</strong></a>
  <br>
</p>

</div>

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
- [Connect with me](#-connect-with-me)
- [Thanks](#thanks)

---

## Tech Stack
- ReactJS
- CSS modules
- Firebase/firestore
- Firebase/auth
- [CKEditor](https://ckeditor.com/docs/index.html) 

---

## Features

### Add a new note
- User can add a note by clicking on a primary button "Add Note" or a "+" icon button which will open a textbox where we can add texts. And a "Save" button that will save the note.

### Edit & Delete Note
- User can delete and edit a note

### Filter & Sort by date, priority, tags
- User can filter notes by tags added to the note
- User can filter the notes by priority. Priorities would be high, medium, low
- User can sort the notes by the date added/created.

### Change Card Color
- User can see various color containers (div) where if I click on any one of it. It will change the background color of the note.

### Add Tags to notes
- User can see the input text area beside the "Add Note" component where we can add tags.

### Trash & Archive
- User can trash/archive a note. User can also untrash/unarchive a note.

### Authentication

- Signup
- Login
- Logout

---

## Getting Started

- clone the repository on your local machine with the command below in your terminal, and cd into the **melonn** folder

```
git clone https://github.com/partha8/melonn.git

cd melonn
```

- install dependencies (if you are using **yarn** then do with that)

```
npm install
```
- Install firebase in the local directory.
- You'll also need to setup a project in firebase and setup firebase.config file in src folder.
- The config file will look like this
```
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { app, db, auth };

```

- start the server

```
npm start
```

---

## 👨‍💻 Connect with me

<a href="https://twitter.com/partha_sarma8"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white"/></a>

## Thanks

Special thanks to my team members (team D3) for reviewing this project!
