# eKitab - P2P eBook Store

**eKitab** is a Peer-to-Peer (P2P) eBook store that allows users to buy, sell, and manage digital books. Built with modern web technologies, the platform offers seamless user authentication, a secure book management system, and a dynamic marketplace where authors can sell their eBooks directly to readers. 

## Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Setup](#project-setup)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
eKitab is designed to be an easy-to-use platform for book lovers and authors to interact with digital books. Authors can upload and manage their books, while readers can explore, purchase, and manage their library.

### Key Features:
- **Authentication**: JWT-based user authentication (Register, Login, Logout).
- **Book Management**: Users can add, update, and delete their book listings.
- **P2P Marketplace**: A secure marketplace for buying and selling eBooks.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS.
- **Payment Integration**: Integrated with eSewa for seamless payments (future releases).
- **Cloud Storage (MinIO)**: MinIO is used to store eBooks securely in the cloud.

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

- **Payment Integration**:
  - eSewa

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

    #### Ensure that PostgreSQL is running, or use Docker  to start the database container.

    #### Create a .env file in the backend with your database credentials.

    #### Run database migrations to set up tables.

1. **Set up Cloud Storage**:

    #### MinIO is used to store book files. If running locally, you can start MinIO using Docker:

    ```bash
    docker run -p 9000:9000 -e "MINIO_ACCESS_KEY=minioaccesskey" -e "MINIO_SECRET_KEY=miniosecretkey" minio/minio server /data
    ```

    #### Add the MinIO credentials to the .env file in the backend (e.g., MINIO_ACCESS_KEY, MINIO_SECRET_KEY, and MINIO_ENDPOINT).

1. **Run the project**:

    #### For development mode, use the following commands:

    #### Start the frontend:
    ```bash
    npm run start
    ```

    #### Start the backend:
    ```bash
    npm run dev
    ```
    
  #### The application should now be running locally at http://localhost:3000 (or your configured port).

### Docker Setup

#### If you want to run the application in Docker containers:

**Build Docker images**:
```bash
docker-compose build
```

**Start the application**:
```bash
docker-compose up
```

#### This will start both the frontend and backend containers, as well as the database and MinIO Object Storage.

## Contributing
#### Contributions are welcome! Feel free to fork the repository and submit pull requests.

### How to Contribute:

- ### Fork the repository

- ### Create a new branch:
  ```bash
  git checkout -b feature-name
  ```

- ### Make your changes and commit them:
  ```bash
  git commit -m 'Add new feature'
  ```

- ### Push to the branch:
  ```bash
  git push origin feature-name
  ```

- ### Create a pull request

## License

#### Distributed under the [MIT License](./LICENSE). See the LICENSE file for more information.

---

### Thank you for checking out eKitab!
#### Let's build a vibrant digital book community together! 📚

---