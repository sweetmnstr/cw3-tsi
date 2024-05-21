# CW3-TSI Project

## Overview

This project is a TypeScript-based application that includes various modules for authentication, database interactions, and student management. It utilizes Docker for containerization and follows a modular architecture to ensure scalability and maintainability.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Authentication**: User sign-up and sign-in functionalities.
- **Database Interaction**: Models and repositories for managing users, students, and documents.
- **Student Management**: Services and routers for handling student-related operations.
- **Docker Support**: Dockerfile and docker-compose for containerization.

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/cw3-tsi.git
    cd cw3-tsi
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Configure Environment Variables**:
    Create a `.env` file in the root directory and add the necessary environment variables.

4. **Start the application**:

    ```bash
    npm start
    ```

## Usage

### Running the Application

To start the application in a development environment:

```bash
npm run dev
```

To build and start the application in a production environment:

```bash
npm run build
npm start
```

### Docker

To run the application using Docker:

1. **Build the Docker image**:

    ```bash
    docker-compose build
    ```

2. **Start the Docker containers**:

    ```bash
    docker-compose up
    ```

## Project Structure

```bash
cw3-tsi/
├── .dockerignore
├── .gitignore
├── README.md
├── package-lock.json
├── package.json
├── tsconfig.json
├── oio-xfs/
│   ├── Dockerfile
│   ├── docker-compose.yaml
│   └── entrypoint.sh
├── src/
│   ├── index.ts
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.router.ts
│   │   │   ├── auth.service.ts
│   │   │   └── dtos/
│   │   │       ├── index.ts
│   │   │       ├── sign-in.dto.ts
│   │   │       └── sign-up.dto.ts
│   │   ├── db/
│   │   │   ├── enums/
│   │   │   ├── models/
│   │   │   ├── repositories/
│   │   │   └── index.ts
│   │   ├── student/
│   │   │   ├── student.router.ts
│   │   │   └── student.service.ts
│   ├── utils/
│   ├── validators/
│   └── types/
└── types/
    └── global.d.ts
```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Make sure to follow the code style and include appropriate tests.

1. **Fork the repository**
2. **Create a new branch**:

    ```bash
    git checkout -b feature/your-feature-name
    ```

3. **Commit your changes**:

    ```bash
    git commit -m 'Add some feature'
    ```

4. **Push to the branch**:

    ```bash
    git push origin feature/your-feature-name
    ```

5. **Open a pull request**

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
