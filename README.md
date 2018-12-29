## Oingo
---

Oingo is a new mobile app named that allows users to share useful information via their mobile devices based on social, geographic, temporal, and keyword constraints. The main idea in oingo is that users can publish information in the form of short notes, and then link these notes to certain locations and certain times. Other users can then receive these notes based on their own location, the current time, and based on what
type of messages they want to receive.  The startup believes that this may become a popular application as it can be useful in many scenarios. For example:
* Suppose you discover a nice Thai restaurant (by finding it on the web or by walking by it) that you want to try out some time for lunch. To make sure that you do not forget the restaurant, you want the app to send you a note if you are ever within 300 yards of the restaurant during lunch time.
* Or maybe you see a store that you think one of your friends might really like. You could then add a note about this store, such that your friend (or maybe everybody) sees the note if they come within a certain distance of this place.
* Suppose the local historical society wants to leave a note that tells tourists about an interesting place (a building or a monument), so that tourists within 100 yards who use the app can see the information.
* A store or restaurant might want to show information about special deals to potential customers nearby during times when such deals are available (e.g., during Happy Hour for a bar).
* Or you might sit somewhere and be interested in meeting other people, either your friends who are nearby or people that you do not know yet.


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
        
### Part 1
---

In this first part of the course project, we have designed the relational database that stores all the information about users, friendships between users, notes published by users, and filters that users have for what kind of notes they want to receive at different times and in different situations.

### Part 2
---

In the second part of the project, we have designed a web-accessible interface for this system. We designed a browser interface that would also work on small screens, with not too much information on screen and with big buttons etc.
