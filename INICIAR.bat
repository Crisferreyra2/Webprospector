@echo off
echo.
echo  =============================================
echo   WebProspector AI — CRISFERRE-ANALISTA
echo  =============================================
echo.

:: Check Node.js
node -v >nul 2>&1
if %errorlevel% neq 0 (
  echo  [ERROR] Node.js no esta instalado.
  echo.
  echo  Descargalo gratis desde: https://nodejs.org
  echo  Instala la version "LTS" y volvé a ejecutar este archivo.
  echo.
  pause
  exit /b
)

echo  [OK] Node.js encontrado.
echo.

:: Install dependencies if needed
if not exist "node_modules" (
  echo  Instalando dependencias por primera vez...
  npm install
  echo.
)

echo  Iniciando servidor...
echo.
start "" http://localhost:3000
node server.js

pause
