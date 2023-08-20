Slideshow: https://docs.google.com/presentation/

# Natural Disasters around The World Interactive Dashboard

## Group 8 slideshow URL:
    https://docs.google.com/presentation/

## Contributors:   
    ### - Elee Saleem
    ### - Tran Duong
    ### - Makram KaraBibar
    ### - Nifa Coutinho
    ### - Khrystyna Dubei

## Summary
    In this research we will explore and visualize data of natural disasters around the world which cover 16000 records of data from 1900 to 2021and how these statistics are changing, which disaster type is more impactful on human and which country with the most number of disasters.

## Source of Data:  
    https://www.kaggle.com/datasets/brsdincer/all-natural-disasters-19002021-eosdis
    We chose this source because it incldes all key input data those cover so many aspects like country, latitude, longitude, death toll, year, damage costs and others, those enable us to visualize and analyze.

## The Collection, Exploration, and Cleanup Process:
    ### Backend process:
        - We first used postgresql app to import the csv file (which contains natural disaster data) then created column names and sorted them.
        - Then with python we processed the data and flasked it.
        - With flask command we created routes for each chart and map, these routes will enable us to export the data to javascript.

    ### Frontend process:
        - With JavaScript we made charts and map visualizations but after importing the data from flask routes into JavaScript files.
        - With html to preview this data as a webpage + css as secondary helpful codes for styling.

## Achieving The Project Goals:
    - First we created the first line chart with plotly, then created second and third ones with d3.js library and the fourth chart was made with chartjs library.
    - Then we added these charts into a dropdown list so they appear pon clicking on their name.
    - Second we imported two maps from "open street map" and programmed them with leaflet.js library then added markers and cluster marker to them and added moment.js library which is good for calculating the time.
    - Css files were used for styling the objects on the webpage and we used some helpful libraries like polyfill, fonts.googleapis, leafletmarkercluster, and code.ionicframework.

## Analysis and Explanation
    + ![Chart 1](<line_chart_of_disasters_per_year.png>) 
        This chart illustrates how number of disasters goes up over time. It sgnificantly goes up from 1996.

    + ![Chart 2](<bar_chart_of_most_occuring_disasters.png>)
        In this chart we see the number of each disaster type. We notice that the most occuring disaster is flood followed by storm, whenever we notice that animal accidents, fog, impact, and glacial lake outburst are the least occuring diasters.

    + ![Chart 3](<bar_chart_of_death_per_disaster.png>)
        This chart illustrates death toll per disaster and which disaster is thw most fatal than others. We notice that drought followed by epidemic are the most fatal ones.

    + ![Chart 4](<bar_chart_of_counteries_with_the_number_of_disasters.png>)
        This chart shows countries with the number of disasters. We notice that the US followed by India, Indonesia, Bangladesh, and Iran are the most 5 countries with the number of disasters. 

## Conclusion 
    We found that in the last 20 years disasters haven't ticked up, and flood and storms are the most occuring disasters in the five countries with the highest number of disasters.
## Potential Next Steps for The Project:
    - Taking data of year 2015 and comparing it to our project study then taking data of upto last 10 years then comparing them with each other to see how trends have changed over years.
    - I think the project lacked some more data such as vehicle conditions whether it was salvage or damaged, also lacks data such as whether urban or rural cities to know the consumer location,  Another data needed is that knowing the "median income" of consumer and whether purchased a vehicle with loan or without, also a study on engine type is needed to know if consumer favored electric over combustion and what average price change for each vehicle with a certain engine type.

## Code References
    - TA Anthony, Justin Schadwill, tutor Steve, and AskBCS Assistant Liang helped us with this project mostly the backend part.

