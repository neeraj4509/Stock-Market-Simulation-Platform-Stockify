
# npm start
# sleep 5
# python backend/app.py
#!/bin/bash
# Start Python service
gnome-terminal --tab --title="Python service" -e "bash -c 'python backend/app.py; $SHELL'"
# Start React app
gnome-terminal --tab --title="React app" -e "bash -c 'npm start; $SHELL'"
