#!/bin/bash

rm -rf cypress
rm -rf dist
rm -rf node_modules

npm install && npm run lint && npm run test:unit && npm run test:e2e