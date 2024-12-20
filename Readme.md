# Socio-AI

Socio-AI is an AI-powered platform designed for [brief project description]. This repository includes the frontend and backend implementation along with Docker configurations for seamless deployment.

## Prerequisites

### Frontend
    - Node.js (v14.17.0) (includes npm)
    - compatible browser (Google Chrome, Mozilla Firefox)

### Backend
    - Docker
    - Install Docker and Docker Compose

## Environment Variables
- [.env.sample]() file is provided in the each directory[Frontend, Backend, Downloader].
- [MongoDB](https://www.mongodb.com/) Atlas connection string.
- [Gemini API Key](https://ai.google.dev/gemini-api/docs/api-key) Gemini API Key.
- [Cloudinary Setup](https://cloudinary.com) Cloudinary API Key, API Secret, and Cloud Name.

## Steps to Run

### Clone the Repository

```bash
    git clone https://github.com/Dumb-Crews/socio-ai.git
    cd socio-ai
```

### Frontend Setup (Root Directory)

```bash
    cd frontend
    npm install
    npm run dev
```

### Backend Setup (Root Directory)

```bash
    cd backend
    npm install
    npm run dev

```bash
    docker-compose up --build
```

## Ports [Development: Localhost]

- Frontend: 3000
- Backend: 4000 & 5000
    - 4000: API [Main Service]
    - 5000: Flask API [Post Downloader]

## Compatibility

Tested With:
    - Mozilla Firefox Version 89.0.2 (64-bit)
    - Node.js (v14.17.0)
    - Docker Desktop Version 3.5.2 (66501)

## Contributors

- [Lovish Bansal](https://www.linkedin.com/in/lovish2584-profile)
- [Tushar Singla](https://www.linkedin.com/in/tushar-singla19)
- [Kundan Tamsoy](https://www.linkedin.com/in/kundan-tamsoy-646023230)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.