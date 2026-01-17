@echo off
echo ==========================================
echo Marketing Mistico - Iniciando Sistema
echo ==========================================

:: Iniciar Backend en una nueva ventana
start cmd /k "cd backend && echo Iniciando Backend... && python -m uvicorn server:app --reload"

:: Iniciar Frontend en la ventana actual
cd frontend
echo Iniciando Frontend...
npm start
