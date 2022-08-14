# User account management

User account manages users registration, login, logout, and password reset. 
It allows secure login with two-factor authentication with SMS.

---

## Getting Started
The project contains two folders(services) both built with Nestjs. Make sure you have both folders.
1. git clone this repository & cd to the project directory

## Pre-requisites

* Nodejs v14 or greater
* Git
* Kafka
* VSCode, Webstorm or even any other code editor of your preferred choice.
* MySQL
* Redis

## Installing

* Install [Nodejs](https://nodejs.org/en/) if you don't have it installed.

* Install [git](https://www.digitalocean.com/community/tutorials/how-to-contribute-to-open-source-getting-started-with-git)
  , (optional) if you dont have it installed.

* Install [Kafka](https://kafka.apache.org/) if you don't have it
* Install [MySQL](https://www.mysql.com)

## Run the project

#### Using VSCode
The instructions below work on both services.
1. Make sure you have both folders,
2. Launch VSCode editor,
3. Make copy of `.env.example` to `.env`,
4. Set up `Redis` in `.env` file, with URL, PASSWORD, and PORT, 
5. Set your `KAFKA_BROKER_URL` with your valid Kafka,
6. On account service, set your MySQL DB credentials.
7. You can set the `NODE_PORT` you want to use in the `.env` file, if you don't set it, it will run on `3000` by default.
8. Congratulations! You have successfully launched Accounting service!

### Launch with Docker

> For this, you need to have [Docker](https://www.docker.com/) installed in your system.

1. Run `docker build -t <image-name> .` to build the docker image
2. Run `docker run -p 3000:3000 <image-name>` to run the image. This will expose port `3000`


### To check if the API is up and running.

Just call this endpoint: `http://localhost:3000/` using a GET method It will show a `pong` response.

#### Find `SWAGGER` the API docs on account service `/api-docs` to get all API available

## Testing

Run `npm test`

## Built With

* [Nestjs](https://nestjs.com/)
* [Kafkajs](https://kafka.js.org)
* [Typeorm](https://typeorm.io)
* [Bull MQ](https://docs.bullmq.io)


## Authors

* **Alain MUCYO** (https://github.com/alainmucyo)

## Licence

This software is published under the [MIT licence](http://opensource.org/licenses/MIT).

