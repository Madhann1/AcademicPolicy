@echo off
echo Starting Academic Policy System...

:: Start Backend
start "AcademicPolicy Backend" cmd /k "cd backend && npm run dev"

:: Start Frontend (wait a moment for backend)
timeout /t 5
start "AcademicPolicy Frontend" cmd /k "npm run dev"

echo.
echo Application started!
echo Backend: Port 5000
echo Frontend: Port 5176 (or similar)
echo.
echo You can minimize this window, but do not close the other two command windows.
pause
