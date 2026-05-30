# Team Task Tracker API

## Overview

Team Task Tracker API is a backend application built using Node.js, Express.js, MongoDB, Redis, and Docker.

The application allows organizations to manage users and tasks with role-based access control (RBAC), JWT authentication, task status workflows, Redis caching, and containerized deployment.

---

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Redis
* Docker & Docker Compose
* JWT Authentication
* Mongoose

---

## Features

### Authentication & Authorization

* User Registration
* User Login
* JWT Access Tokens
* Refresh Token Rotation
* Role-Based Access Control (RBAC)

Supported Roles:

* ADMIN
* MANAGER
* MEMBER

Permissions:

#### ADMIN

* Manage Users
* Manage Tasks
* Full Organization Access

#### MANAGER

* Manage Tasks
* Assign Tasks
* Update Task Status

#### MEMBER

* View Assigned Tasks
* Update Assigned Task Status

---

## Task Management

Task fields:

* title
* description
* priority (LOW, MEDIUM, HIGH)
* status
* assignee
* dueDate

Supported Status Workflow:

TODO → IN_PROGRESS → IN_REVIEW → DONE

BLOCKED can be reached from:

* TODO
* IN_PROGRESS
* IN_REVIEW

Only the assignee, MANAGER, or ADMIN can update task status.

---

## Pagination & Filtering

Task listing supports:

* page
* limit
* status
* priority
* assignee

Example:

GET /api/tasks?page=1&limit=10

GET /api/tasks?status=TODO

GET /api/tasks?priority=HIGH

---

## Database Schema

### Organization

| Field | Type   |
| ----- | ------ |
| name  | String |

### User

| Field          | Type     |
| -------------- | -------- |
| name           | String   |
| email          | String   |
| password       | String   |
| role           | String   |
| organizationId | ObjectId |

### Task

| Field          | Type     |
| -------------- | -------- |
| title          | String   |
| description    | String   |
| priority       | String   |
| status         | String   |
| assignee       | ObjectId |
| dueDate        | Date     |
| organizationId | ObjectId |
| createdBy      | ObjectId |

### RefreshToken

| Field     | Type     |
| --------- | -------- |
| userId    | ObjectId |
| token     | String   |
| expiresAt | Date     |

---

## Database Design Decision

Tasks are linked to organizations using organizationId.

This ensures complete tenant isolation, allowing users to access only data belonging to their organization.

Indexes were added on:

* status
* assignee
* dueDate

These fields are frequently used for filtering and querying tasks.

---

## Redis Caching Strategy

Task lists are cached per user.

Cache Key:

tasks:<userId>

When a task list is requested:

1. Redis cache is checked first.
2. If cache exists, data is returned immediately.
3. If cache does not exist, MongoDB is queried.
4. Response is stored in Redis for future requests.

---

## Cache Invalidation Strategy

Cache is cleared whenever:

* Task Created
* Task Updated
* Task Deleted
* Task Status Updated

This ensures users always receive fresh data.

---

## Error Handling

A centralized error middleware is implemented to provide consistent API responses.

Example:

{
"status": 400,
"code": "VALIDATION_ERROR",
"message": "due_date must be a future date"
}

---

## Running The Project

### Prerequisites

* Docker
* Docker Compose

### Start Application

docker compose up --build

Application:

http://localhost:5000

---

## API Endpoints

### Authentication

POST /api/auth/register

POST /api/auth/login

POST /api/auth/refresh

### Users

POST /api/users

GET /api/users

GET /api/users/:id

PUT /api/users/:id

DELETE /api/users/:id

### Tasks

POST /api/tasks

GET /api/tasks

GET /api/tasks/:id

PUT /api/tasks/:id

DELETE /api/tasks/:id

PATCH /api/tasks/:id/status

---

## Future Improvements

Given more time, the following enhancements would be added:

* Swagger/OpenAPI documentation
* Unit and Integration Testing
* Analytics Dashboard
* WebSocket Notifications
* Audit Logging
* Rate Limiting
* CI/CD Pipeline
* Task Activity History

---

## Author

Saicharan
