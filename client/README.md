# Technical Overview for `/client`

## components
**Announcements.js**

This component displays any announcements. The user to collapse the announcements.

**App.js**

This component hold's all the routes for the project. It functions as the parent components which holds all other components within the project.

**GuideCard.js**

This component handles the link cards to the different pages are displayed. the `useEffect` sets `currentMap` and `currentImageMap` to null.

**IconCard.js**

This component handles how item cards will be displayed in pikmin, characters, maps, enemies, and treasure pages. Function `handleClick` sets state for what item will be displayed.

**LoginForm.js**

This component handles the login feature. Formik is being used for frontend data validation. Sign in with a social account does not work at the current state. Also there are no Terms of Use or Privacy Policy.

**Navbar.js**

This component provides a way for users to navigate to the home and login pages. This component is not visible on the login page.

**PostCard.js**

This component handles how posts will be displayed. It also handles the feature where users can edit and delete their posts. Functions `rerenderReply`, `editRenderReply`, and `deleteRenderReplies` update state so the page will properly rerender. 

**PostForm.js**

This component handles the form where users can create posts. Forimk is used for data validation. 

**ReplyCard.js**

This component handles how replies will be displayed. It also handles the feature where users can edit and delete their replies. 

**ReplyForm.js**

This component handles the form where users can add replies to posts. Forimk is used for data validation. 

**Sidebar.js**

This component provides a quick and convenient way for users to navigate to different pages within the web application. This component is not visible on the login page.

**SignupForm.js**

This component handles the signup feature. Formik is being used for frontend data validation. Signuo with a social account does not work at the current state. Also there are no Terms of Use or Privacy Policy. Email me about WIKI news and events also does not actually send out an email.

## context
**images**

This folder holds several files which contain a list of key and value objects. These are import into `UserContext.js` giving all components access to these objects. This is necessary in order to display the correct images. 

**UserContext.js**

This file uses `useContext` to give all components access to any of the variable declared inside this file. 

## pages
**Characters.js**

This file fetch's and displays the character's that are in the backend database. Character has no relationship with any other tables in the database. 

**Enemies.js**

This file fetch's and displays the enemies's that are in the backend database. A `useEffect` is used to fetch data from `/enemies` and `/maps` once per render. Since enemies belong to a map each enemy has a relationship with a map. The state `currentEnemy` determines what enemy is to be displayed. The function `linkToMaps` allows the user to click on the location of the displayed enemy, and the function will set the states of `CurrentMap` and `CurrentImageMap`. By doing so when the user navigates to maps, the correct corelating map will be displayed. 

**Forums.js**

This file fetch's and displays the posts that are in the backend data base. A `useEffect` is used to fetch data from `/users`, `/replies`, and `/posts`. All three have relationships between each other so it's necessary to get data from all 3. Functions `deleteRenderPost` and `editRenderPost` both make the states update in forums to cause the file to rerender. 

**Home.js**

This file holds links to all other pages within the project. Here the user can see what is available to them. 

**Login.js**

This file contains the `LoginForm` and `SignupForm` components. It allows the user to switch between the two forms.

**Maps.js**

This file fetch's and displays the maps that are in the backend database. Maps have many enemies and many treasures. 

**Pikmin.js**

This file fetch's and displays the pikmin that are in the backend database. Pikmin has no relationship with any other tables in the database. 

**Treasure.js**

This file fetch's and displays the treasure's that are in the backend database. A `useEffect` is used to fetch data from `/treasures` and `/maps` once per render. Since treasures belong to a map each treasure has a relationship with a map. The state `currentTreasure` determines what treasure is to be displayed. The function `linkToMaps` allows the user to click on the location of the displayed treasure, and the function will set the states of `CurrentMap` and `CurrentImageMap`. By doing so when the user navigates to maps, the correct corelating map will be displayed. 

## schemas
**index.js**

This file has all the schemas used in the project. For form validation I am using Formik and yup. So the schemas used here work best for Formik. `passwordRules` states that the password must be; a minimum of 5 characters, include at least 1 upper case letter, at least 1 lower case letter, and at least 1 numeric digit.

## utils
This folder containers all the images used in the project.