FROM node:18-alpine

WORKDIR /client

# Copy package files first to leverage Docker cache
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . ./

# Build the frontend application
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
