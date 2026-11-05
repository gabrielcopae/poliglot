@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo   Poliglot - pornesc aplicatia...
echo.
if not exist node_modules call npm install
call npx vite build
echo.
echo   Deschide in browser:  http://localhost:4173
echo   (pe telefon, in aceeasi retea Wi-Fi: adresa "Network" de mai jos)
echo   Inchide aceasta fereastra ca sa opresti aplicatia.
echo.
start "" http://localhost:4173
call npx vite preview --host --port 4173
