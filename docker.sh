#!/bin/bash -x

# docker rm -f $(docker ps -a -q)
# docker rmi -f $(docker images -q)

docker build -t phillips-hue-api --no-cache .
docker rm -f phillips-hue-api
docker run -d -p 80:8088 --name phillips-hue-api phillips-hue-api

docker run -d -p 4040:4040 --link phillips-hue-api:http --name www_ngrok fnichol/ngrok
