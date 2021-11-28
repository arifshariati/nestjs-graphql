## Description

This is backend project which allow users to regiser, login, list properties and mark property as favorite.

Project stack is;

1. Nestjs
2. Graphql
3. Postgresql 
4. Docker

## Installation

For this project i have maintained two different setup, for local development and production. However, for any of the flow you wish to run proejct, Docker is required to get postgres up and running. 

if you already do not have docker setup on your machine, below link for docker official website can you set up docker on your machine depening on your OS (macOS, Windows or linux).

```
https://www.docker.com
```

### Installation for Production

Provided that you have Docker setup on your machine, making project up and running is quite straight forward. In root directory of project, run below command on yoru terminal.

```
docker-compose up -d
```

What above command does is running docker-compose with default docker-compose.yml file and configures, deploys and installs project with its dependencies in their respective conainers. Above command creates docker containers with below configuration;

1. Postgres container and creates database folder **"pgData"** (*can be used for database backup*) with external port **5432** mapped to container port **5432**.
2. Project container with "Backend" name running on external port **4000** mapped to container port **4000**.

### Installation for Development 

Unlike installation for production, installation for development does not include shipping project into container, rather installs container for Postgres only. Run below command on your terminal, in project root folder.

```
docker-compose -f docker-compose.pg.yml up -d
```

Postgres container configuration is the same as in production installation. 

## Running the app

Similar to Installation, running the project production and development has different methods. 

### Running the app in Production

Since, Installation in production already spins both containers for postgres and project, you can directly access project in your browser on below url.

```
http://localhost:4000
```

### Running the app in Development

Since, Installation in development only spins postgres container, to run project, you need to install node packages and run project by following below commands in project folder.

```bash
# install node dependencies via npm or yarn (depends on your choice)

# npm 
npm i

# yarn 
yarn 
```

Once required packages are installed, run below command to run the proejct.

```bash

# Set Environment variable

# macOS, linux 
export SOURCE=LOCAL

# Windows 
set SOURCE=LOCAL 

# npm 
npm run start:dev #with hot reload
npm run start

# yarn 
yarn start
```

Once project runs, go to below url.

```
http://localhost:4000
```

**NOTE:** project url is same regardless of your installation method.
## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
### Sample Test Output
For this project i have written test cases and below is test result.

```
PASS  src/user/test/user.service.spec.ts (5.961 s)
PASS  src/user/test/user.resolver.spec.ts (6.219 s)

Test Suites: 2 passed, 2 total
Tests:       20 passed, 20 total
Snapshots:   0 total
Time:        6.834 s, estimated 7 s
Ran all test suites.

```

Below helps on understading details of assertions made for a test.

```
PASS  src/user/test/user.service.spec.ts
  UserService
    ✓ should be defined (13 ms)
    signup
      When signup is called
        ✓ then it should have called this.getUserByEmail(signupInput.email) (3 ms)
        ✓ then it should have called userRespository.create() (2 ms)
        ✓ then should save user to database and return user (2 ms)
    login
      Wehen login is called
        ✓ then it should have called useService.login() (3 ms)
        ✓ then should return jwt token (2 ms)
    users
      When users is called
        ✓ then it should have called userService.findAll() (3 ms)
        ✓ then should return list of users (2 ms)
    user
      when user is called
        ✓ then it should call userService.findOne() (2 ms)
        ✓ then should return list of users (2 ms)

Test Suites: 1 passed, 1 total
Tests:       10 passed, 10 total
Snapshots:   0 total
Time:        5.039 s, estimated 7 s
Ran all test suites matching /user.service/i.

```

## Useful commands

Below commands will come in handy while running this project.

### Docker 

```bash

# list containers 
docker ps -a # list all containers

# list images  
docker images 

# Bring down containers  
docker-compose down

# Stop specific container
docker stop [container_id]

# Remove specific container  
docker rm container [container_id]

# Remove specif imagee 
docker rm image [image_id]

# Remove all images and containers from your machine  
docker system prune -a
```

### Environment 

```bash
# list all environments 
env or printenv   

# get specific env variable 
env | grep SOURCE OR printenv | grep SOURCE 

```

## Best of Luck &nbsp; &nbsp; 🚀