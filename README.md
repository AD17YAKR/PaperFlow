# PaperFlow API Documentation

## Introduction
The PDF Management & Collaboration System is a web application designed to simplify the management and collaboration of PDF files. It provides users with the ability to securely upload, share, and collaborate on PDF documents. The system ensures easy access to shared files, facilitates commenting and discussions, and prioritizes data privacy and security.

**Project Links:**
- Backend (NestJs): [GitHub Repository](https://github.com/AD17YAKR/PaperFlow)
- Frontend (Flutter): [GitHub Repository](https://github.com/AD17YAKR/PaperFlow_ui)
- Video Demonstration: [Watch Here](https://user-images.githubusercontent.com/71925269/251809509-6d3f2666-25be-4f99-909c-863f9ecbd352.webm)

**Base URL:** The base URL for all API endpoints in this system is `{{BaseUrl}}`.

## Authentication (Auth)
The system utilizes bearer token authentication for protected routes. Users need to obtain a valid token by signing up and logging in before accessing the protected endpoints. The token should be included in the `Authorization` header of each request as a bearer token.

### Login
- **Description:** Authenticate a user by logging in.
- **Method:** POST
- **URL:** `{{BaseUrl}}/auth/login`
- **Request Body:**
```json
{
    "username": "john_doe",
    "email": "john.doe@example.com",
    "password": "password123"
}
```

### Register User
- **Description:** Register a new user.
- **Method:** POST
- **URL:** `{{BaseUrl}}/auth/register`
- **Request Body:**
```json
{
    "username": "Aditya",
    "email": "Aditya@example.com",
    "password": "password123"
}
```

## PDF (Pdf)
This section contains endpoints related to PDF file management and collaboration.

### Upload PDF
- **Description:** Upload a PDF file to the system.
- **Method:** POST
- **URL:** `{{BaseUrl}}/pdf/upload`
- **Authorization:** Bearer token required
- **Request Body:**
  - `file`: PDF file to upload
- **Response:** Returns the URL/location of the uploaded file.

### Add Comment to PDF
- **Description:** Add a comment to a specific PDF file.
- **Method:** POST
- **URL:** `{{BaseUrl}}/pdf/comment/{pdfId}`
- **Authorization:** Bearer token required
- **Request Body:**
```json
{
    "comment": "Is this working?"
}
```

### Get PDF By ID
- **Description:** Retrieve details of a specific PDF file by its ID.
- **Method:** GET
- **URL:** `{{BaseUrl}}/pdf/{pdfId}`
- **Authorization:** Bearer token required

### Get PDF By User
- **Description:** Retrieve all PDF files and shared PDF files accessible by the user.
- **Method:** GET
- **URL:** `{{BaseUrl}}/pdf/user`
- **Authorization:** Bearer token required

### Share PDF Access with Another User
- **Description:** Share PDF file access with another user.
- **Method:** PATCH
- **URL:** `{{BaseUrl}}/pdf/user/share/{pdfId}`
- **Authorization:** Bearer token required
- **Request Body:**
```json
{
    "sharedUserId": "64a4047d6ef9621d10cd05dd"
}
```

## User
This section contains endpoints related to user management and information retrieval.

### Get User Details
- **Description:** Get the details of the authenticated user, including their PDF files and shared PDF files.
- **Method:** GET
- **URL:** `{{BaseUrl}}/user/details`
- **Authorization:** Bearer token required

### Get All Users
- **Description:** Get the data of all users in the system.
- **Method:** GET
- **URL:** `{{BaseUrl}}/user/all`
- **Authorization:** Bearer token required

## Hello World
This endpoint is used to check if the server is up and running.

### Hello World
- **Description:** Check if the server is up and running.
- **Method:** GET
- **URL:** `{{BaseUrl}}`

Note: Replace `{{BaseUrl}}` with the actual base URL of the deployed API.

For more details and implementation, please refer to the [GitHub repositories](https://github.com/AD17YAKR/PaperFlow) for the backend and frontend components of the PaperFlow application.
