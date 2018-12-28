## Foursquare
---



## Project Schema
---

Foursquare 

    |-- bin 
        |-- www --> DB project repo structure created
    |-- controllers
        |-- auth.js --> handles user registration, login and logout functionalities
        |-- filters.js --> handles user filters 
        |-- index.js --> contains indices of other controller objects
        |-- notes.js --> handles notes functionalities
        |-- posts.js --> handles user posts functionalities
        |-- relationships.js --> handles friends requests, friends suggestions, add or delete friend functionality
    |-- middlewares
        |-- fetchToken.js -->  
        |-- index.js --> 
    |-- models
        |-- sql
            |-- create_filter.sql --> sql script for creation of filters
            |-- create_note.sql --> sql script for create notes functionality
            |-- get_friends_note.sql --> stored procedure for friends note functionalities
            |-- get_private_notes.sql --> stored procedure to retrieve private notes
            |-- get_public_notes.sql --> stored procedure to retrieve public notes
        |-- index.js
    |-- public
        |-- css   
        |-- images 
        |-- stylesheets
        |-- js
    |-- routes
        |-- auth.js --> route for funcitonalities of login controller
        |-- filters.js --> route for functionalities of filter controller
        |-- index.js --> index files containing all the routes
        |-- notes.js --> route for functionalities of notes controller
        |-- relationships.js --> route for functionalities of realationships controller
        |-- users.js --> route for functionalities of user controller
    |-- util
        |-- index.js
        |-- message.js
    |-- views
        |-- error.ejs 
        |-- index.ejs 
        |-- login.ejs 
        |-- posts.ejs 
