-- Create database and user for Chess application
CREATE DATABASE chess_db;
CREATE USER chess_user WITH PASSWORD 'chess_password';
GRANT ALL PRIVILEGES ON DATABASE chess_db TO chess_user;

-- Connect to the database
\c chess_db;

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO chess_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO chess_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO chess_user;
