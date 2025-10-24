@echo off
echo Testing if backend will run...

cd apps\api

echo.
echo Checking if Maven is available...
mvn --version
if %errorlevel% neq 0 (
    echo Maven is not installed or not in PATH
    echo Please install Maven and try again
    pause
    exit /b 1
)

echo.
echo Checking if Java is available...
java -version
if %errorlevel% neq 0 (
    echo Java is not installed or not in PATH
    echo Please install Java 17 and try again
    pause
    exit /b 1
)

echo.
echo Compiling the project...
mvn clean compile
if %errorlevel% neq 0 (
    echo Compilation failed!
    echo Check the errors above
    pause
    exit /b 1
)

echo.
echo Backend compilation successful!
echo The backend should run properly.
echo.
echo To start the backend:
echo 1. Make sure PostgreSQL is running on localhost:5432
echo 2. Create database 'chess_db' with user 'chess_user' and password 'chess_password'
echo 3. Run: mvn spring-boot:run
echo.
pause
