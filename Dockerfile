# Use Python base image
FROM python:3.11-slim

WORKDIR /app

# Create shared folders
RUN mkdir final media temp

# Copy Python server files
COPY downloader ./python-server
COPY downloader/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install Node.js
RUN apt update && apt install -y curl gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt install -y nodejs

# Copy Node server
COPY backend ./node-server

# Make sure to copy env file explicitly
# COPY backend/.env ./node-server/.env

WORKDIR /app/node-server
RUN npm install

# Return to base directory
WORKDIR /app

# Copy shared folders and start script
COPY . .

# Give permission to start.sh
RUN chmod +x start.sh

CMD ["bash", "start.sh"]
