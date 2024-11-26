## Docker

- Install Docker and Docker Compose.
- Build the images and run the containers with:
    ```sh
    docker-compose up --build
    ```
- Compatibility tested with:
    - [Open Source](https://github.com/mozilla/) Mozilla Firefox Version 89.0.2 (64-bit)
    - [Historically, Open Source](https://github.com/docker) Docker Desktop Version 3.5.2 (66501)
    - [Open Source](https://github.com/docker) Docker Compose Version 1.29.2 (5becea4c)
- The app will be running on the following ports:
    - Frontend: [http://localhost:3000](http://localhost:3000)
    - Backend: [http://localhost:4000](http://localhost:4000)
    - Flask: [http://localhost:5000](http://localhost:5000)
- Stop the containers with:
    ```sh
    docker-compose down
    ```

## Frontend

Environment Variables:
- Copy the `.env.example` file and rename it to `.env`.
- Set the Backend API URL:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:4000
    ```

## Backend

Environment Variables:
- Copy the `.env.example` file and rename it to `.env`.
- [FREE] [Create a new MongoDB cluster](https://www.mongodb.com/) and add the connection string to the `.env` file.
- [FREE] [Create a new Google project](https://ai.google.dev/gemini-api/docs/api-key) and add the API key to the `.env` file.
- [FREE] [Create a new Cloudinary account](https://cloudinary.com/) and add the cloud name, API key, and API secret to the `.env` file.

## Flask

Environment Variables:
- Copy the `.env.example` file and rename it to `.env`.
- [Optional] Define `PORT` and `HOST` in the `.env` file.

## Database

- The database is hosted on MongoDB Atlas.
    - [NPM] Built with Mongoose Version 8.8.2.
    - [FREE] Tested with MongoDB Compass.
- The database has 3 collections:
    - `users`
    - `posts`
    - `products`

## Open Source License

- This project is licensed under the MIT License. See the `LICENSE.md` file for details.
