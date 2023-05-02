# INFINITE BG PROJECT

This project is a full-stack web application built using Node.js with Express.js for the backend and React with Vite for the frontend. Getting Started Prerequisites

Make sure you have Node.js installed on your machine. You can download it from the official website: https://nodejs.org/ 

## INSTALLATION

Clone the repository to your local machine using Git:

    git clone https://github.com/MUST4NG8888/InfiniteBG.git

Navigate to the project directory:

    cd your-project-name

Navigate to the project backend directory:
    cd BE

Install the backend dependencies:
    npm install

Navigate to the frontend directory:

    cd FE

Install the frontend dependencies:

    npm install

Create a .env file in the backend directory of the project and add any necessary environment variables.

// example .env file PORT=8080 MONGO_URL=mongodb://localhost:27017/my-database REDIRECT_URI= http://localhost:YOURPORT/googleauth It's needed for Google Oauth.  JWT_SECRET_KEY=f4nt4sticmrf0x CLIENT_ID = a client ID for the OAuth2 application from the Google Developer Console. CLIENT_SECRET = a secret key for the OAuth2 application from the Google Developer Console. TEST_TOKEN = create a test token for testing that is created with the JWT_SECRET_KEY
TEST_SUB = create a sub that will be included in the TEST_TOKEN
GOOGLE_TEST_TOKEN = a valid JWT TOKEN INCLUDING USERDATA from google for mocking GOOGLE LOGIN Endpoint



## USAGE

Start the backend server:

    npm run dev

Start the frontend development server:

    npm run dev

Access the frontend by navigating to http://localhost:5173 in your browser.
