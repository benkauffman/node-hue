# README #

run `npm install` to install dependencies  
then `npm run` to start the application  


When you run it, it will try to log into the Hue bridge. If the auth fails, 
you'll have to press the button and copy down the username, and update the code.

Once it's running, it will cycle the colors of the lights, and then expose an API endpoint at  
http://localhost:8088/?r=0&g=200&b=40&i=255

you can change the colors and intensity of the lights with each query parameter

