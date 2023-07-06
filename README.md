# API Documentation - PDF Management & Collaboration System

## Introduction

The PDF Management & Collaboration System is a web application designed to simplify the management and collaboration of PDF files. It provides users with the ability to securely upload, share, and collaborate on PDF documents. The system ensures easy access to shared files, facilitates commenting and discussions, and prioritizes data privacy and security.

**Base URL**
The base URL for all API endpoints in this system is: `{{BaseUrl}}`

## Authentication

The system utilizes bearer token authentication for protected routes. Users need to obtain a valid token by signing up and logging in before accessing the protected endpoints. The token should be included in the `Authorization` header of each request as a bearer token.

### User Signup and Authentication

#### Register User

- **Endpoint:** `POST /auth/register`
- **Description:** Allows users to create an account by providing essential information such as name, email address, and password.
- **Request Body:**
  ```json
  {
    "username": "example_user",
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:** No response body is returned.

#### Login

- **Endpoint:** `POST /auth/login`
- **Description:** Authenticates users and provides them with a bearer token for accessing protected routes.
- **Request Body:**
  ```json
  {
    "username": "example_user",
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:** No response body is returned. The bearer token will be included in the response header.

### File Upload

- **Endpoint:** `POST /pdf/upload`
- **Description:** Allows authenticated users to upload a PDF file to the system.
- **Request Body:**

  - Content-Type: `multipart/form-data`
  - Form Data:
    - `file`: PDF file to upload (File)

- **Response:** No response body is returned.

### Dashboard

- **Endpoint:** `GET /pdf`
- **Description:** Retrieves the list of uploaded PDF files accessible to the authenticated user.
- **Response:**
  ```json
  [
    {
      "id": "64a4050d21b01a2e1d3841f5",
      "name": "example_file.pdf",
      "uploadedAt": "2023-07-07T12:00:00Z",
      "uploadedBy": "example_user"
    },
    ...
  ]
  ```

### File Sharing

- **Endpoint:** `POST /pdf/share/{fileId}`
- **Description:** Generates a unique link to share a PDF file with authenticated users.
- **URL Parameters:**
  - `fileId`: ID of the PDF file to share
- **Response:**
  ```json
  {
    "link": "https://example.com/shared/{fileId}"
  }
  ```

### Commenting

- **Endpoint:** `POST /pdf/comment/{fileId}`
- **Description:** Allows authenticated users to add comments to a specific PDF file.
- **URL Parameters:**
  - `fileId`: ID of the PDF file to comment on
- **Request Body:**
  ```json
  {
    "comment": "This is a comment."
  }
  ```
- **Response:** No response body is returned.

- **Endpoint:** `GET /pdf/comment/{fileId}`
- **Description:** Retrieves the comments for a specific PDF file.
- **URL Parameters:**
  - `fileId`: ID of the PDF file to retrieve comments for
- **Response:**
  ```json
  [
    {
      "id": "98f7e6d5c4b3a2",
      "comment": "This is a comment.",
      "createdAt": "2023-07-07T12:00:00Z",
      "createdBy": "example_user"
    },
    ...
  ]
  ```

### Security and Data Privacy

- Access to PDF files and comments is restricted to authorized users only.
- User passwords are securely hashed and stored.

Please note that all endpoints require valid authentication except for user registration and login. Ensure that you include the bearer token in the `Authorization` header of each request.

This API documentation provides an overview of the available routes and their functionalities for the PDF Management & Collaboration System. For more detailed information about request/response structures and error handling, please refer to the API documentation or contact the system administrators.
