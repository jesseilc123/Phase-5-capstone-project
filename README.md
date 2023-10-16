# Overview

Pikmin 4 Wiki is a web application that provides a guide to the game Pikmin 4 as well as forums where people can post and reply. User's can use the website without being logged in, however they cannot create/edit/delete posts or replies in the forums section. Cookies are saved to keep user's logged in so they don't have to manually log in every time they refresh the page. If logged in, users will automatically be logged in whenever they load the page. Also on top of creating posts and replies, user's can also edit or delete them.

**Main features include**:
- Navbar for navigation to Home, Login, and Signup pages. 
- Sidebar for navigation to Pikmins, Characters, Maps, Enemies, and Treasure pages.
- Search bar in Pikmin, Characters, Maps, Enemies, and Treasure pages.
- Category filter in the Forums page. 
- Auto login. 
- Frontend and backend data validation. 

# Setup
For Backend setup:


```
cd server
pipenv install && pipenv shell
```

With Docker

```
docker build -t python-server .
docker run -p 5555:5555 python-server
```

Without Docker 

```
python seed.py
python app.py
```

For Frontend setup:

```
cd client
npm install
npm start
```

# Technical
To view Frontend information, navigate to `/client` and find `README.md` there.  

To view Backend information, navigate to `/server` and find `README.md` there.
