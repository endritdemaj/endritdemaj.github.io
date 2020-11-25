#!/bin/bash
git pull origin developement
git add .
git commit -m "some message"
git push origin developement
GIT_USER=endritdemaj npm run deploy

