# Internal Examination Portal

## Introduction

This project was made as a part of a course curriculum for B.Tech 3rd Year Mini Project.

This is an Examination Portal that students can use to give university internal exams also teachers can use it for creating and grading papers.

You can visit the page here : [Internal Examination Portal](https://internal-examination-portal.vercel.app)

### **Note\***

> This site uses 3rd party cookies so to login to the site allow the restricted cookies or enable 3rd party cookies from your browser settings

## Features

### Student

Student can login/signup to see what exams they have to give and can give the exam on the site. Students can upload handwritten picture in the answer script in the provided text editor if they like or can use the on board features in the text editor to write their answers. After the paper is graded by the teacher students can see what marks did they get in the portal.

### Teacher

Teachers can signup to the site using the institute key to verify them as a teacher once verified they can login to create papers, grade submitted answers and also delete the paper once the examination is concluded.

## Technology Used

### Frontend

We used [NextJs](https://nextjs.org/docs) for our frontend framework.

We hosted our frontend on [Vercel](https://vercel.com/).
|Feature|Technology|
|----|-----|
|Forms|[Formik](https://formik.org/docs/overview)|
|Rich Text Editor|[react-quilljs](https://www.npmjs.com/package/react-quilljs)|
|Data Fetching|[Axios](https://www.npmjs.com/package/axios)|

### Backend

We used [Express](https://expressjs.com/) and [NodeJs](https://nodejs.org/en) for our backend.

We hosted our backend on [Heroku](https://www.heroku.com).
|Feature|Technology|
|----|-----|
|Password Hashing|[Argon 2](https://www.npmjs.com/package/argon2)|
|Session Storage|[Express-Session](https://www.npmjs.com/package/express-session)|
|Database Connector|[mysql2](https://www.npmjs.com/package/mysql2)|
|CORS|[CORS](https://www.npmjs.com/package/cors)|

### Database

We used MySQL database for our database needs.

We hosted our database on [Free MySQL Hosting](https://www.freemysqlhosting.net/).
