#!/bin/bash

cd /app
if [ ! -f package.json ]; then
  rm .gitkeep
  npx -y create-react-app bs5-react . 
fi
npm install react-bootstrap bootstrap
npm install
npm start