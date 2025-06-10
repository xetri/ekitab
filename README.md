# eKitab - P2P eBook Store

### Avinash Pokhrel

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Project Setup](#project-setup)
- [Conclusion](#conclusion)

## Project Overview
**eKitab** is a Peer-to-Peer (P2P) eBook store that allows users to upload, download, and manage digital books. Built with modern web technologies, the platform offers seamless user authentication, a secure book management system, and a dynamic marketplace where publishers can upload their eBooks directly to readers. 

## Features

- JWT Authentication with Email Verification
- Book Upload & File Management
- Peer-to-Peer Purchase Flow
- Payment Integration with eSewa
- Review & Rating System
- Publisher Dashboard
- Fully Dockerized Setup

## Tech Stack

- **Frontend**:
  - React.js
  - Zustand (state management)
  - Tailwind CSS
  - Radix UI (for UI components)
  
- **Backend**:
  - Node.js
  - Express.js
  - PostgreSQL
  - JWT Authentication
  - MinIO (Cloud Storage)

- **DevOps**:
  - Docker

## Screenshots

![](./screenshots/1.jpg)
![](./screenshots/2.jpg)
![](./screenshots/3.jpg)
![](./screenshots/4.jpg)
![](./screenshots/5.jpg)
![](./screenshots/6.jpg)
![](./screenshots/7.jpg)

## Project Setup

To get a local copy of **eKitab** up and running on your machine, follow these simple steps:

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (LTS version recommended).
- **Docker**: If you're using Docker for containerization.

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/xetri/eKitab.git
   ```

1. **Install dependencies**:
  
    ```bash
    npm install

    # Frontend
    cd eKitab/client
    npm install

    # Backend
    cd eKitab/server
    npm install
    ```

1. **Setup the database**:

    #### To ensure that PostgreSQL is running, use Docker to start the database container.

    ```bash
    docker run -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=ekitab -p 5432:5432 docker.io/postgres:15.2-alpine
    ```

1. **Set up Cloud Storage**:

    #### MinIO is used to store book files. If running locally, you can start MinIO using Docker:

    ```bash
    docker run -p 9000:9000 -p 9001:9001 -e "MINIO_ACCESS_KEY=minioadmin" -e "MINIO_SECRET_KEY=minioadmin" -e "MINIO_ROOT_USER=minioadmin" -e "MINIO_ROOT_PASSWORD=minioadmin" docker.io/minio/minio server --console-address ":9001" /data
    ```

    #### Add the MinIO credentials to the .env file in the backend (e.g., MINIO_ACCESS_KEY, MINIO_SECRET_KEY, and MINIO_ENDPOINT).

1. **Environment**
    ### Create a .env file inside the [Server](./server/) folder

    ```
    CLIENT_URL=http://localhost:5173
    DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ekitab
    JWT_SECRET_KEY=weak-secret-key

    MINIO_URL=http://localhost:9000
    MINIO_ENDPOINT=localhost
    MINIO_PORT=9000
    MINIO_ACCESS_KEY=minioadmin
    MINIO_SECRET_KEY=minioadmin
    MINIO_BUCKET=ekitab
    MINIO_USE_SSL=false
    ```

    ### Create a .env file inside the [Client](./client/) folder
    ```
    VITE_API_URL=http://localhost:8000/api
    VITE_CDN_URL=http://localhost:9000/ekitab
    ```

1. **Run the project**:
    ```bash
    npm install # First install the monorepo dependenices.
    npm run preinstall # Install all the dependencies for the whole project (client and server).
    npm run build
    npm run dev # For cloud and database in a seperate terminal, should be run through the program.
    npm run start # Starts the frontend & backend.
    ```

    #### For development mode, use the following commands:
    #### Start the database
    ```
    npm run db
    ```

    ####  Start the Cloud Server
    ```
    npm run cloud
    ```

    #### Start the frontend:
    ```bash
    npm run client
    ```

    #### Start the backend:
    ```bash
    npm run server
    ```
    
  #### The application should now be running locally at http://localhost:3000 (or your configured port).

---

## Challenges Faced

- Integrating JWT-based authentication with access and refresh tokens for secure user sessions.  
- Managing book uploads and secure storage using MinIO with public-access CDN behavior.  
- Maintaining global state across authentication, uploaded books, and reviews using Zustand.  
- Handling CORS issues in a full-stack environment with multiple services.  
- Implementing file upload previews and validation for cover images and eBook files.  
- Creating and maintaining clean, developer-friendly documentation. 

---

## Conclusion

This internship project was a highly enriching experience that allowed me to build a fully functional peer-to-peer eBook marketplace from scratch using modern web technologies. Through the real-world integration of secure authentication, cloud storage (MinIO), I developed a deeper understanding of full-stack application architecture and DevOps workflows.

The project not only sharpened my React and Node.js skills but also gave me practical exposure to working with authentication, database, and cloud storage.

---

Thanks to **Digital Pathshala** for providing this opportunity to gain hands-on development experience and boost my confidence as a full-stack developer.
---