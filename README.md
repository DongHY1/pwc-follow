<p align='center'>
<img src="./screenshots/logo.png" width='300'/>
</p>

<p align='center'>
PWC Follow App</a>
</p>

<p align='center'>
<a href='https://follow.szuhy.xyz'/>👉 Goto App</a>
</p>
<br>

![](./screenshots/follow.mp4)

## Features

- 👉 User Login and User Follow API
- 🧙‍♂️ E2E Typesafety with tRPC
- 🔐 E2E testing with Cypress
- 🛠 FullStack React with Next.js
- 📱 Responsive Design with Tailwind
- 📚 Database with Prisma and PostgreSQL
- 🚢 Docker It!
- 💡 Inspired by [Create T3 App](https://create.t3.gg/)

## Setup
+ Install Dependencies
```
yarn install
```
+ Setup Backend Enviorment and Start
```
// cd packages/backen,create .env file
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/followapp?schema=public"
TOKEN_KEY="YOURKEY"
PORT=8000

// start
1.npm run generate
2.npm run migrate
3.npm run pushdb
4.npm run start
```

+ Run FrontEnd
```
yarn dev
```
Open http://localhost:3000 

Or you can use docker
+ Docker
```
docker-compose up --build
```
