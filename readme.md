# Docker Test App

This app is intended to demonstrate how Docker-Compose can be used in a Javascript application to neatly separate the development environment from the testing environment. It isn't deployed anywhere; it's just meant to be a proof-of-concept.

<br>

In order to use this app, please make sure you have the following installed on your local device:

- Docker & Docker-Compose
- Node and NPM
- Git, if you would like to clone this directly

<br>

## Setup

All commands in this section assume a windows device due to my personal unfamiliarity with other operating systems.

<br>

Start with:

```batch
npm install
```

<br>

To set up the development server:

<br>

```batch
docker-compose -f main.yaml up -d
npx prisma db push
```

<br>

After running these commands, you can start the dev server at any time with `npm start `

<br>

To run tests:

```batch
docker-compose -f test.yaml up -d
```

<br>

You can then run the test suite at any point with `npm test`
