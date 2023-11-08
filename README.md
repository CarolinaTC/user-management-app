
## Available Scripts

In the project directory, you can run:

### How to run the app

```shell
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### How to run the tests

```shell
npx cypress open
```

You will get a UI, from which you can execute one-by-one test cases.

### How to run the app in docker container

```shell
docker build .
docker run -dp 8000:3000 --name user-management-app user-management-app
```

### How to stop the app running in the docker container

```shell
docker stop user-management-app
```
