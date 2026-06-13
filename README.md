# DevPlus - Internal Tech Issue & Feature Tracker

DevPlus is a lightweight and robust internal issue tracker backend designed for software teams to report bugs and suggest new features. It features role-based access control, input validation, secure authentication, and a clean REST API structure.

**Live Deployment URL:** [https://dev-plus-ivory.vercel.app/](https://dev-plus-ivory.vercel.app/)

---

## 🚀 Features

- **User Authentication:** Secure user signup and login with hashed passwords (`bcrypt`) and session token generation using JSON Web Tokens (`JWT`).
- **Role-Based Access Control (RBAC):** Supports two user roles:
  - `contributor`: Can create issues, view all issues, and update their own issues (if the status is still `open`).
  - `maintainer`: Has administrative permissions to create, view, update, and delete any issue.
- **Issue & Feature Tracking:** Supports categorization of issues into `bug` and `feature_request`, along with status tracking (`open`, `in_progress`, `resolved`).
- **Input Validation:** Strict request body checks for auth and issue routes to maintain data integrity and return clear validation error messages.
- **Robust Error Handling:** Global middleware to intercept, format, and return standard, user-friendly JSON responses for database, validation, or validation errors.

---

## 🛠️ Tech Stack

- **Core & Runtime:** [Node.js](https://nodejs.org/), [TypeScript](https://www.typescriptlang.org/)
- **Backend Framework:** [Express.js](https://expressjs.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) (hosted on [Neon Console](https://neon.tech/))
- **Compilation/Bundling:** [tsup](https://tsup.egoist.dev/) & [tsx](https://tsx.is/)
- **Authentication:** [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) & [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- **Deployment:** [Vercel](https://vercel.com/)

---

## ⚙️ Setup & Installation

Follow these steps to run the application locally:

### 1. Clone the Repository
```bash
git clone https://github.com/rockychowdhury/Internal-Tech-Issue-Feature-Tracker.git
cd Internal-Tech-Issue-Feature-Tracker
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory and configure the following variables:
```env
NEONDB=your_postgresql_connection_string
PORT=5000
secret=your_jwt_signing_secret
```

### 4. Run the Development Server
This will start the server using `tsx watch` for auto-reloading:
```bash
npm run dev
```
The server will start listening on the port configured in `.env` (default: `5000`).

### 5. Build for Production
To bundle the project into the `dist/` directory:
```bash
npm run build
```

---

## 🗄️ Database Schema

The database consists of two primary tables with relationships defined below:

### `users` Table
Stores user credentials and roles.
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `SERIAL` | `PRIMARY KEY` | Unique identifier for each user |
| `name` | `VARCHAR(255)` | `NOT NULL` | User's display name |
| `email` | `VARCHAR(255)` | `UNIQUE`, `NOT NULL` | Email address used for login |
| `password` | `VARCHAR(255)` | `NOT NULL` | Hashed password |
| `role` | `VARCHAR(50)` | `NOT NULL`, `DEFAULT 'contributor'` | Check constraint: `('contributor', 'maintainer')` |
| `created_at`| `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Record creation date |
| `updated_at`| `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Record last updated date |

### `issues` Table
Stores bugs and feature requests reported by contributors.
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `SERIAL` | `PRIMARY KEY` | Unique identifier for each issue |
| `title` | `VARCHAR(150)` | `NOT NULL` | A concise title summarizing the issue |
| `description`| `TEXT` | `NOT NULL` | Check: Minimum length of 20 characters |
| `type` | `VARCHAR(50)` | `NOT NULL` | Check constraint: `('bug', 'feature_request')` |
| `status` | `VARCHAR(50)` | `NOT NULL`, `DEFAULT 'open'` | Check: `('open', 'in_progress', 'resolved')` |
| `reporter_id`| `INTEGER` | `NOT NULL`, `FOREIGN KEY` | References `users.id` |
| `created_at`| `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Record creation date |
| `updated_at`| `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Record last updated date |

---

## 📡 API Endpoints List

All request payloads and responses are in JSON format. Authenticated routes require the JWT token passed in the `Authorization` header.

### 🔐 Authentication (`/api/auth`)

#### 1. Register User
- **Method:** `POST`
- **Path:** `/api/auth/signup`
- **Access:** Public
- **Request Body:**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "securepassword123",
    "role": "contributor" // Optional: 'contributor' or 'maintainer'
  }
  ```

#### 2. User Login
- **Method:** `POST`
- **Path:** `/api/auth/login`
- **Access:** Public
- **Request Body:**
  ```json
  {
    "email": "jane@example.com",
    "password": "securepassword123"
  }
  ```
- **Response Description:** Returns a token representing user payload upon successful login.

---

### 📋 Issues (`/api/issues`)

#### 1. Create Issue
- **Method:** `POST`
- **Path:** `/api/issues`
- **Access:** Private (`contributor`, `maintainer`)
- **Request Body:**
  ```json
  {
    "title": "Auth Token Expiration Issue",
    "description": "Tokens are not expiring after the designated time window and need refresh policy.",
    "type": "bug" // 'bug' or 'feature_request'
  }
  ```

#### 2. Get All Issues
- **Method:** `GET`
- **Path:** `/api/issues`
- **Access:** Public
- **Query Params:** None

#### 3. Get Single Issue
- **Method:** `GET`
- **Path:** `/api/issues/:id`
- **Access:** Public

#### 4. Update Issue
- **Method:** `PATCH`
- **Path:** `/api/issues/:id`
- **Access:** Private (`contributor`, `maintainer`)
- **Permissions:**
  - `maintainer` can update any issue at any time.
  - `contributor` can update only if they are the original reporter and the issue status is currently `open`.
- **Request Body:** (Any fields are optional)
  ```json
  {
    "title": "Updated Title",
    "description": "Updated description explaining the issue in more than 20 characters.",
    "type": "feature_request",
    "status": "in_progress" // 'open', 'in_progress', or 'resolved'
  }
  ```

#### 5. Delete Issue
- **Method:** `DELETE`
- **Path:** `/api/issues/:id`
- **Access:** Private (`maintainer` only)
