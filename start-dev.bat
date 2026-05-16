@echo off
cd /d "c:\Users\САМАКЕ ИБРАНИМ\Desktop\projet_fin_anne"

echo Checking for node_modules...
if exist node_modules (
    echo node_modules already exists, skipping npm install
) else (
    echo Installing dependencies with npm install...
    call npm install
    if errorlevel 1 (
        echo npm install failed!
        exit /b 1
    )
)

echo.
echo Starting Next.js development server...
echo Server will be available at http://localhost:3000
echo Press Ctrl+C to stop the server
echo.

call npm run dev
