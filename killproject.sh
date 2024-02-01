#!/bin/bash
# Kill running Python service
# kill $(lsof -t -i :5000)
# Kill running React app
# kill $(lsof -t -i :3000)
npx kill-port 3000