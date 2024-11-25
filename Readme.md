DOCKER:-
    - Install Docker and Docker Compose
    - Run the following command to build the images and run the containers
        - `docker-compose up --build`
    - FRONTEND:- http://localhost:3000
    - BACKEND:- http://localhost:4000
    - FLASK:- http://localhost:5000
    - Run the following command to stop the containers
        - `docker-compose down`

FRONTEND:-
    Environment Variables:-
        - Copy the .env.example file and Rename it as .env
        - Handle the Backend API URL named as
            - NEXT_PUBLIC_API_URL = http://localhost:4000

BACKEND:-
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

FLASK:-
    Environment Varibles:-
        - Copy the .env.example file and Rename it as .env
        - Define PORT and HOST in the .env file