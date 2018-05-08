# Location-based Quiz - Web Application Component

This repository, in conjunction with the ‘**[quiz](https://github.com/CoryWilliamsGIS/quiz)**’ and ‘**[server](https://github.com/CoryWilliamsGIS/server)**’ repositories creates a location-based quiz system including both web and mobile applications, and a PostgreSQL database hosted on a local web server (three-tier architecture).

This is the repository for the question setting **web application component.**
The application is intended for use by the quiz administrator / question setter.

# Demo
 <img src="https://user-images.githubusercontent.com/35572803/39776217-0cd78bc4-52f8-11e8-8fad-b75a73ec5735.gif"> 

The web application:

 1. Displays an embedded leaflet map which the user can click to obtain the geographic position of their question.
 2. Displays a question setting form.
 3. Submits the question to the database.
 4. Retrieve existing questions from the database and adds them to the map.

This application interface is adapted from the [Material Design Lite](https://getmdl.io/templates/index.html) front-end dashboard template. 

The embedded map utilises the [Leaflet API](https://leafletjs.com/). 
