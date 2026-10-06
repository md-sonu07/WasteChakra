#!/bin/bash

echo "Starting WasteChakra Frontend and Backend..."

# Trap Ctrl+C (SIGINT) and kill all child processes gracefully
trap 'echo -e "\nStopping servers..."; kill 0' SIGINT

# Start frontend in background
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

# Start backend in background
cd backend
DATABASE_URL="sqlite:///$PWD/dev.sqlite3" python manage.py runserver 8000 &
BACKEND_PID=$!
cd ..

# Wait for both processes to keep the script running
wait $FRONTEND_PID
wait $BACKEND_PID
