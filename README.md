# Smart Waste Management System

# TrashWell


# Link to the slide
[Click here](https://docs.google.com/presentation/d/1eO9hAtvZ3vDhsLh9FTfifRkS3Ty6mEAEYNdlE4bdtaY/edit#slide=id.g2e6a755ee06_1_41)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Repository Structure](#repository-structure)
- [Usage](#usage)
  - [Running the Application](#running-the-application)
  - [Waste Collection Schedule](#waste-collection-schedule)
  - [Recycling Tracker](#recycling-tracker)
  - [User Management](#user-management)
- [Testing](#testing)
  - [Schedule Test](#schedule-test)
  - [Recycling Test](#recycling-test)
  - [User Authentication Test](#user-authentication-test)
- [CI/CD Pipeline](#cicd-pipeline)
- [Contributing](#contributing)
- [License](#license)
- [Contributor](#contributor)

## Overview

TrashWell the Smart Waste Management System  is an innovative web application designed to streamline waste management processes for households, waste collection services, and administrators. The system aims to enhance waste collection efficiency, promote recycling efforts, and provide insights into environmental impact metrics.

## Features

- **User Registration and Login**: Secure user authentication and session management.
- **Waste Collection Schedule**: Schedule and manage waste collection activities.
- **Recycling Tracker**: Log and track recycling activities with visualizations and metrics.
- **Admin Dashboard**: Monitor system performance, manage users, and generate reports.

## Prerequisites

Ensure you have the following before starting:
- Node.js (version 12.x or higher)
- PostgreSQL or MySQL

## Installation

Clone the repository:

```bash
git clone https://github.com/Lydia02/SmartWasteManagementSystem.git
cd SmartWasteManagementSystem
```

Install the dependencies:

```bash
npm install
```

Set up the database by running migrations:

```bash
npx sequelize-cli db:migrate
```

## Repository Structure

When you clone the repository, you'll find the following directories and files:
- **`frontend/`**: Contains the HTML, CSS, and JavaScript files for the frontend.
- **`backend/`**: Contains the backend code including routes, models, and middleware.
- **`admin/`**: Contains the HTML, CSS, and JavaScript files for the admin interface.
- **`models/`**: Defines the database models.
- **`routes/`**: Contains the route handlers for different functionalities.
- **`middleware/`**: Contains middleware for authentication and error handling.
- **`config/`**: Configuration files for the database and environment settings.

## Usage

### Running the Application

To run the application, navigate to the project directory in your terminal and start the server:

```bash
npm dev
```

This command will start the server and the application will be accessible at `http://localhost:3000`.

### Waste Collection Schedule

- **Schedule a Collection**: Users can schedule a new waste collection.
  ```bash
  POST /api/schedules
  {
    "date": "YYYY-MM-DD",
    "time": "HH:MM"
  }
  ```
- **Get Schedules**: Retrieve all scheduled collections for a user.
  ```bash
  GET /api/schedules
  ```
- **Update Schedule**: Update an existing scheduled collection.
  ```bash
  PUT /api/schedules/:id
  {
    "date": "YYYY-MM-DD",
    "time": "HH:MM"
  }
  ```
- **Delete Schedule**: Cancel a scheduled collection.
  ```bash
  DELETE /api/schedules/:id
  ```

### Recycling Tracker

- **Log Recycling Activity**: Users can log a new recycling activity.
  ```bash
  POST /api/recycling
  {
    "date": "YYYY-MM-DD",
    "material": "string",
    "amount": "number"
  }
  ```
- **Get Recycling Activities**: Retrieve all recycling activities for a user.
  ```bash
  GET /api/recycling
  ```
- **Update Recycling Activity**: Update an existing recycling activity.
  ```bash
  PUT /api/recycling/:id
  {
    "date": "YYYY-MM-DD",
    "material": "string",
    "amount": "number"
  }
  ```
- **Delete Recycling Activity**: Delete a recycling activity.
  ```bash
  DELETE /api/recycling/:id
  ```

### User Management

- **Get All Users**: Retrieve all users for the admin.
  ```bash
  GET /api/admin/users
  ```

## Testing

### Schedule Test

To test the scheduling functionality, use tools like Postman or CURL to send requests to the `/api/schedules` endpoint.

### Recycling Test

To test the recycling functionality, use tools like Postman or CURL to send requests to the `/api/recycling` endpoint.

### User Authentication Test

#### Example `tests/auth.test.js`

```javascript
const request = require('supertest');
const app = require('../app'); // make sure the path is correct

describe('User Authentication', () => {
  it('should signup a new user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        firstname: 'Lydia',
        lastname: 'Ojoawo',
        email: 'Lydia@example.com',
        password: 'secret123',
        address: '123 Main St'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toContain('registered successfully');
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'Lydia@example.com',
        password: 'secret123'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not login with incorrect credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'Lydia@example.com',
        password: 'wrongpassword'
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toContain('Invalid credentials');
  });
});
```

## CI/CD Pipeline

The CI/CD pipeline is set up using GitHub Actions. You can find the configuration in the `.github/workflows/ci-cd.yml` file.

## Contributing

Contributions are welcome. Please fork the repository, create a feature branch, and submit a pull request for review.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

## Contributor

- **Lydia Ojoawo** - [GitHub Profile](https://github.com/Lydia02)

- **Damilare Azeez** - [GitHub Profile](https://github.com/dazeez1)

- **Nduka Oluchi** - [GitHub Profile](https://github.com/Lisky-pixel)

- **Marvelous Nelson** - [GitHub Profile](https://github.com/mnelson-1)

- **Gabriel** - [GitHub Profile](https://github.com/KhotKeys)

## Live Applications

- **Web Application:** [https://trashwell.onrender.com](https://trashwell.onrender.com)
- **Admin Web Application:** [https://trashwelladmin.onrender.com](https://trashwelladmin.onrender.com)
  - **Admin Credentials:**
    - **Email:** admin2gmail.com
    - **Password:** secret

## Happy Coding 🎉
