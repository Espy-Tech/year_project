@echo off
setlocal enabledelayedexpansion

echo.
echo ============================================================
echo   Numerical Integration Scientific Platform
echo   Development Server Launcher
echo ============================================================
echo.

cd /d "c:\Users\САМАКЕ ИБРАНИМ\Desktop\projet_fin_anne"

echo Current directory: %CD%
echo.

REM Check if node_modules exists
if exist node_modules (
    echo [✓] node_modules found
) else (
    echo [*] node_modules not found. Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo [✗] npm install failed
        exit /b 1
    )
    echo [✓] Dependencies installed successfully
)

echo.
echo ============================================================
echo Starting Next.js Development Server...
echo ============================================================
echo.
echo Server URL: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

npm run dev

pause
