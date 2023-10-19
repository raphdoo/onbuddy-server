# ONBUDDY SERVER

Backend API that allows organizations effectively manage new employees.

### Technologies

<div align="center">

<a href="">![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)</a>
<a href="">![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)</a>
<a href="">![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)</a>

</div>
<div align="center">

<a href="">![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)</a>
<a href="">![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)</a>
<a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>

</div>

### Installation

Firstly, you need to clone the repository into your local machine

```javascript
$ git clone https://github.com/raphdoo/onbuddy-server.git
```

Secondly, change directory into the project file

```
$ cd onbuddy-server
```

Thirdly, you need to install the dependencies.

```javascript
$ npm install
```

Fourthly, you need to create a `.env` file and copy the `.env.example` file to it.

```javascript
$ cp dotenv .env
```

Finally, you need to run the server.

```java
$ npm start
```

### Testing

To run the test

```java
$ npm run test
```

### Base URL

http://localhost:3000

### Usage

#### Registration

- Route: /api/v1/users/signup
- Method: POST
- Body:

```java
{
  firstname: firstname,
  lastname: lastname,
  email: Myemail@gmail.com,
  password: mypassword,
  companyName: mycompanyname
}
```

```java
* Response:
  * 201: success || Created
  * 400: error || BadRequest Error/Request Validation Error
  * 401: error || Not Authorized Error
  * 404: error || Not Found Error
  * 500: error || Server/Database Error
```

#### Login

- Route: /api/v1/users/login
- Method: POST
- Body:

```java
{
  email: test@gmail.com,
  password: mypassword
}

```

- Response

```java
  * 200: success
  * 400: error || BadRequest Error/Request Validation Error
  * 401: error || Not Authorized Error
  * 404: error || Not Found Error
  * 500: error || Server/Database Error

```
