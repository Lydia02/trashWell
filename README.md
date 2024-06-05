# Smart Waste Management System

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
- [Testing](#testing)
  - [Schedule Test](#schedule-test)
  - [Recycling Test](#recycling-test)
- [Contributing](#contributing)
- [License](#license)
- [Contributor](#contributor)

## Overview

The Smart Waste Management System is an innovative web application designed to streamline waste management processes for households, waste collection services, and administrators. The system aims to enhance waste collection efficiency, promote recycling efforts, and provide insights into environmental impact metrics.

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
- **`models/`**: Defines the database models.
- **`routes/`**: Contains the route handlers for different functionalities.
- **`middleware/`**: Contains middleware for authentication and error handling.
- **`config/`**: Configuration files for the database and environment settings.

## Usage

### Running the Application

To run the application, navigate to the project directory in your terminal and start the server:

```bash
npm start
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

## Testing

### Schedule Test

To test the scheduling functionality, use tools like Postman or CURL to send requests to the `/api/schedules` endpoint.

### Recycling Test

To test the recycling functionality, use tools like Postman or CURL to send requests to the `/api/recycling` endpoint.

## Contributing

Contributions are welcome. Please fork the repository, create a feature branch, and submit a pull request for review.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

## Contributor

- **Lydia Ojoawo** - [GitHub Profile](https://github.com/Lydia02)

## Happy Coding 🎉
```
