FRONTEND:-

    Requirements:-
        - Node.js (npm)

    Environment Variables:-
        - Copy the .env.example file and Rename it as .env
        - Handle the Backend API URL named as
            - NEXT_PUBLIC_API_URL = http://localhost:4000

    Steps to run:-
        - Run the following commands:
            - npm install
            - npm start
        - Open the browser and go to http://localhost:3000

BACKEND:-

    Requirements:-
        - Node.js (npm)
        - MongoDB

    Environment Variables:-
        - Copy the .env.example file and Rename it as .env
        - Go to https://www.mongodb.com/
            - Create a new cluster and get the connection string
            - Add the connection string in the .env file
        - Go to https://ai.google.dev/gemini-api/docs/api-key
            - Create a new project and get the api key
            - Add the api key in the .env file
        - Go to https://cloudinary.com/
            - Create a new account and get the cloud name, api key and api secret
            - Add the cloud name, api key and api secret in the .env file

    Steps to run:-
        - Run the following commands:
            - npm install
            - npm start
        - Open the postman and go to http://localhost:4000

FLASK:-

    Requirements:-
        - Python 3.6 or higher

    Steps to run:-
        - Run the following commands:
            - pip install -r requirements.txt
            - python app.py
        - Open the postman and go to http://localhost:5000