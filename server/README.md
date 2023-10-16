# Technical Overview for `/server`

## models

This folder holds all tables used for the database. the users model utilizes bcrypt to encrypt the password for a user. Models user, reply, and post all use validates from sqlalchemy.orm to validate backend data.

## routes

This folder holds all the restful routes used for the frontend to communicate with. Users has multiple routes to handle auto login, logging in, signing up, and and logging out. Replies and posts have full CRUD (Create, Read, Update, Delete) routes.

## app.py

This file runs the application. 

## seed.py

This file is in charge of populating the database with consistent data. Faker is used to created random users, posts, and replies. 

## data

This folder contains data that will populate the characters, enemies, maps, pikmins, and treasures data. Since this data is meant to be the same each time, when you run `seed.py` the data will not change.

