docker build -t phillips-hue-api .

#start the hue api
docker run -d -P --restart=always --name phillips-hue-api phillips-hue-api

#start ngrok and link to hue api
docker run -d -p 4040:4040 --restart=always --link phillips-hue-api:http --name www_ngrok fnichol/ngrok
