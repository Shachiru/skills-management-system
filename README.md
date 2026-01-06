# Skills Management System

A comprehensive full-stack web application for managing personnel skills, projects, and team assignments. This system helps organizations track employee skills, match personnel to projects based on requirements, and analyze team capabilities through interactive dashboards and analytics.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-Sequelize-orange.svg)](https://www.mysql.com/)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### Personnel Management
- **CRUD Operations**: Create, read, update, and delete personnel records
- **Skill Assignment**: Assign multiple skills to personnel with proficiency levels
- **Experience Levels**: Track personnel experience (Junior, Mid-Level, Senior)
- **Availability Tracking**: Monitor personnel availability for project assignments
- **Role Management**: Organize personnel by roles and departments

### Skills Management
- **Skill Categories**: Organize skills into categories:
  - Programming Languages
  - Frameworks
  - Libraries
  - Databases
  - Cloud Providers
  - Tool/DevOps
  - Soft Skills
  - Management
- **Skill Descriptions**: Detailed descriptions for each skill
- **Skill Analytics**: Track skill distribution across the organization

### Project Management
- **Project Lifecycle**: Manage projects through different stages (Planning, Active, Completed)
- **Project Requirements**: Define required skills and minimum proficiency levels for projects
- **Timeline Management**: Track project start and end dates
- **Status Tracking**: Monitor project progress and completion

### Project Matching
- **Intelligent Matching**: Automatically match available personnel to projects based on skill requirements
- **Proficiency Matching**: Consider minimum proficiency levels when matching personnel
- **Availability Filter**: Only match personnel who are currently available
- **Skill Gap Analysis**: Identify missing skills or insufficient proficiency levels

### Analytics & Reporting
- **Dashboard Overview**: Real-time statistics on personnel, projects, and skills
- **Project Distribution**: Visual breakdown of projects by status
- **Skill Coverage**: Analyze skill distribution across the organization
- **Team Insights**: Comprehensive analytics for decision-making

### Authentication & Authorization
- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control (RBAC)**: Two user roles (Admin, Manager)
- **Protected Routes**: Secure API endpoints and frontend routes
- **Session Management**: Persistent login sessions with token verification

## 🛠 Tech Stack

### Frontend
- **React 19.2** - Modern UI library with latest features
- **TypeScript 5.9** - Type-safe development
- **Vite 7.2** - Fast build tool and dev server
- **React Router DOM 7.11** - Client-side routing
- **TailwindCSS 4.1** - Utility-first CSS framework
- **Axios 1.13** - HTTP client for API calls
- **Lucide React** - Beautiful icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express 5.2** - Web application framework
- **TypeScript 5.9** - Type-safe server development
- **Sequelize 6.37** - ORM for database management
- **Sequelize-TypeScript 2.1** - TypeScript decorators for Sequelize
- **MySQL2 3.16** - MySQL database driver

### Authentication & Security
- **JWT (jsonwebtoken 9.0)** - Token-based authentication
- **bcryptjs 3.0** - Password hashing
- **CORS** - Cross-Origin Resource Sharing
- **Zod 4.2** - Schema validation

### Development Tools
- **ESLint** - Code linting
- **Nodemon** - Auto-restart development server
- **ts-node** - TypeScript execution
- **PostCSS** - CSS transformations
- **Autoprefixer** - CSS vendor prefixing

## 🏗 Architecture

The application follows a modern full-stack architecture with clear separation of concerns:

```
┌─────────────────────────────────────────────────────┐
│                    Client (React)                    │
│  ┌────────────┬────────────┬─────────────────────┐  │
│  │   Pages    │ Components │  Context (Auth)     │  │
│  └────────────┴────────────┴─────────────────────┘  │
│  └─────────────── Axios HTTP Client ────────────┘   │
└──────────────────────┬──────────────────────────────┘
                       │ REST API
┌──────────────────────▼──────────────────────────────┐
│              Server (Express + TypeScript)           │
│  ┌────────────┬────────────┬─────────────────────┐  │
│  │   Routes   │Controllers │   Middleware (Auth) │  │
│  └────────────┴────────────┴─────────────────────┘  │
│  └─────────────── Sequelize ORM ────────────────┘   │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│                   MySQL Database                     │
│  ┌─────────┬─────────┬──────────┬────────────────┐  │
│  │Personnel│ Skills  │ Projects │ Users (Auth)   │  │
│  └─────────┴─────────┴──────────┴────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### Design Patterns
- **MVC Pattern**: Model-View-Controller architecture
- **Repository Pattern**: Data access abstraction through Sequelize models
- **Middleware Pattern**: Request processing pipeline (authentication, validation)
- **Protected Routes**: Route guards for authentication and authorization
- **Context API**: Global state management for authentication

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn**
- **MySQL** (v8.0 or higher)
- **Git** (for cloning the repository)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd skills-management-system
```

### 2. Install Server Dependencies

```bash
cd server
npm install
```

### 3. Install Client Dependencies

```bash
cd ../client
npm install
```

### 4. Create MySQL Database

Connect to your MySQL server and create a database:

```sql
CREATE DATABASE skills_mgmt_db;
```

## ⚙️ Configuration

### Server Configuration

Create a `.env` file in the `server` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=skills_mgmt_db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=1d
```

### Client Configuration

Create a `.env` file in the `client` directory (if needed):

```env
VITE_API_URL=http://localhost:5000/api
```

> **Note**: The client uses `http://localhost:5000/api` as the default API base URL, configured in `client/src/api/axios.ts`.

## 🏃 Running the Application

### Development Mode

#### Option 1: Run Both Client and Server Separately

**Terminal 1 - Start the Server:**
```bash
cd server
npm run dev
```

The server will start on `http://localhost:5000`

**Terminal 2 - Start the Client:**
```bash
cd client
npm run dev
```

The client will start on `http://localhost:5173` (Vite default port)

#### Option 2: Using Concurrently (Optional)

You can create a root `package.json` to run both simultaneously:

```json
{
  "scripts": {
    "dev": "concurrently \"cd server && npm run dev\" \"cd client && npm run dev\"",
    "server": "cd server && npm run dev",
    "client": "cd client && npm run dev"
  },
  "devDependencies": {
    "concurrently": "^8.2.0"
  }
}
```

Then run:
```bash
npm run dev
```

### Production Mode

#### Build the Client

```bash
cd client
npm run build
```

This creates an optimized production build in `client/dist`.

#### Build and Start the Server

```bash
cd server
npm run build
npm start
```

The built server runs from the `server/dist` directory.

### First Time Setup

1. **Start the server** - It will automatically create the database tables (via Sequelize sync)
2. **Register a user** - Navigate to `http://localhost:5173/signup`
3. **Login** - Use your credentials to access the dashboard

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "securepassword",
  "role": "Admin"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "securepassword"
}

Response:
{
  "token": "jwt-token-here",
  "role": "Admin"
}
```

#### Verify Token
```http
GET /api/auth/verify
Authorization: Bearer <token>

Response:
{
  "email": "admin@example.com",
  "role": "Admin",
  "id": 1
}
```

### Personnel Endpoints

All personnel endpoints require authentication.

#### Get All Personnel
```http
GET /api/personnel
Authorization: Bearer <token>
Query Parameters: ?role=Developer (optional)
```

#### Create Personnel
```http
POST /api/personnel
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "role": "Full Stack Developer",
  "experienceLevel": "Senior",
  "isAvailable": true
}
```

#### Update Personnel
```http
PUT /api/personnel/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "role": "Senior Full Stack Developer",
  "experienceLevel": "Senior",
  "isAvailable": false
}
```

#### Delete Personnel
```http
DELETE /api/personnel/:id
Authorization: Bearer <token>
```

#### Add Skill to Personnel
```http
POST /api/personnel/:id/skills
Authorization: Bearer <token>
Content-Type: application/json

{
  "skillId": 1,
  "proficiencyLevel": "Advanced"
}
```

### Skills Endpoints

#### Get All Skills
```http
GET /api/skills
Authorization: Bearer <token>
Query Parameters: ?category=Programming%20Language (optional)
```

#### Create Skill
```http
POST /api/skills
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "React",
  "category": "Framework",
  "description": "A JavaScript library for building user interfaces"
}
```

#### Update Skill
```http
PUT /api/skills/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "React 19",
  "category": "Framework",
  "description": "Latest version of React"
}
```

#### Delete Skill
```http
DELETE /api/skills/:id
Authorization: Bearer <token>
```

### Projects Endpoints

#### Get All Projects
```http
GET /api/projects
Authorization: Bearer <token>
Query Parameters: ?status=Active (optional)
```

#### Create Project
```http
POST /api/projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "E-Commerce Platform",
  "description": "Building a modern e-commerce solution",
  "startDate": "2025-01-15",
  "endDate": "2025-06-30",
  "status": "Planning",
  "requirements": [
    {
      "skillId": 1,
      "minProficiency": "Advanced"
    },
    {
      "skillId": 2,
      "minProficiency": "Intermediate"
    }
  ]
}
```

#### Update Project
```http
PUT /api/projects/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "E-Commerce Platform v2",
  "status": "Active"
}
```

#### Delete Project
```http
DELETE /api/projects/:id
Authorization: Bearer <token>
```

#### Match Personnel to Project
```http
GET /api/projects/:id/match
Authorization: Bearer <token>

Response:
{
  "matches": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "matchedSkills": [...],
      "matchPercentage": 85
    }
  ]
}
```

### Analytics Endpoints

#### Get Dashboard Statistics
```http
GET /api/analytics/stats
Authorization: Bearer <token>

Response:
{
  "summary": {
    "totalPersonnel": 50,
    "totalProjects": 12,
    "totalSkills": 35
  },
  "projectDistribution": [
    { "status": "Planning", "count": 3 },
    { "status": "Active", "count": 7 },
    { "status": "Completed", "count": 2 }
  ]
}
```

## 🗄️ Database Schema

### Users Table
```sql
users
├── id (INT, PRIMARY KEY, AUTO_INCREMENT)
├── email (VARCHAR, UNIQUE, NOT NULL)
├── password (VARCHAR, NOT NULL) -- hashed
├── role (ENUM: 'Admin', 'Manager', DEFAULT: 'Manager')
├── createdAt (DATETIME)
└── updatedAt (DATETIME)
```

### Personnel Table
```sql
personnel
├── id (INT, PRIMARY KEY, AUTO_INCREMENT)
├── name (VARCHAR, NOT NULL)
├── email (VARCHAR, UNIQUE, NOT NULL)
├── role (VARCHAR, NOT NULL)
├── experienceLevel (ENUM: 'Junior', 'Mid-Level', 'Senior', NOT NULL)
├── isAvailable (BOOLEAN, DEFAULT: true)
├── createdAt (DATETIME)
└── updatedAt (DATETIME)
```

### Skills Table
```sql
skills
├── id (INT, PRIMARY KEY, AUTO_INCREMENT)
├── name (VARCHAR, UNIQUE, NOT NULL)
├── category (ENUM: 'Programming Language', 'Framework', 'Library', 
│            'Database', 'Cloud Provider', 'Tool/DevOps', 
│            'Soft Skill', 'Management', NOT NULL)
├── description (TEXT)
├── createdAt (DATETIME)
└── updatedAt (DATETIME)
```

### Personnel_Skills Table (Junction)
```sql
personnel_skills
├── id (INT, PRIMARY KEY, AUTO_INCREMENT)
├── personnelId (INT, FOREIGN KEY -> personnel.id)
├── skillId (INT, FOREIGN KEY -> skills.id)
└── proficiencyLevel (ENUM: 'Beginner', 'Intermediate', 'Advanced', 'Expert')
```

### Projects Table
```sql
projects
├── id (INT, PRIMARY KEY, AUTO_INCREMENT)
├── name (VARCHAR, NOT NULL)
├── description (TEXT, NOT NULL)
├── startDate (DATE, NOT NULL)
├── endDate (DATE, NOT NULL)
├── status (ENUM: 'Planning', 'Active', 'Completed', DEFAULT: 'Planning')
├── createdAt (DATETIME)
└── updatedAt (DATETIME)
```

### Project_Requirements Table
```sql
project_requirements
├── id (INT, PRIMARY KEY, AUTO_INCREMENT)
├── projectId (INT, FOREIGN KEY -> projects.id)
├── skillId (INT, FOREIGN KEY -> skills.id)
└── minProficiency (ENUM: 'Beginner', 'Intermediate', 'Advanced', 'Expert', NOT NULL)
```

### Entity Relationships

```
Users (1) ─────────────────── (Authentication)

Personnel (1) ────< Personnel_Skills >──── (M) Skills
                                               │
Projects (1) ─────< Project_Requirements >─────┘
```

## 📁 Project Structure

### Server Structure
```
server/
├── src/
│   ├── config/
│   │   └── db.ts                    # Database configuration & initialization
│   ├── controllers/
│   │   ├── analytics.controller.ts  # Analytics & statistics logic
│   │   ├── auth.controller.ts       # Authentication logic (register, login, verify)
│   │   ├── personnel.controller.ts  # Personnel CRUD operations
│   │   ├── project.controller.ts    # Project management & matching
│   │   └── skill.controller.ts      # Skill management
│   ├── middleware/
│   │   ├── auth.middleware.ts       # JWT verification middleware
│   │   ├── auth.ts                  # Additional auth utilities
│   │   ├── role.middleware.ts       # Role-based access control
│   │   └── validate.ts              # Request validation middleware
│   ├── models/
│   │   ├── Personnel.ts             # Personnel model with Sequelize decorators
│   │   ├── PersonnelSkill.ts        # Junction table for many-to-many
│   │   ├── Project.ts               # Project model
│   │   ├── ProjectRequirement.ts    # Project skill requirements
│   │   ├── Skill.ts                 # Skill model
│   │   └── User.ts                  # User authentication model
│   ├── routes/
│   │   ├── analytics.routes.ts      # Analytics endpoints
│   │   ├── auth.routes.ts           # Authentication endpoints
│   │   ├── personnel.routes.ts      # Personnel endpoints
│   │   ├── project.routes.ts        # Project endpoints
│   │   └── skill.routes.ts          # Skill endpoints
│   ├── types/
│   │   └── env.d.ts                 # TypeScript environment types
│   ├── validations/
│   │   ├── personnel.schema.ts      # Zod validation schemas for personnel
│   │   ├── project.schema.ts        # Zod validation schemas for projects
│   │   └── skill.schema.ts          # Zod validation schemas for skills
│   └── index.ts                     # Express app entry point
├── nodemon.json                     # Nodemon configuration
├── package.json                     # Server dependencies
└── tsconfig.json                    # TypeScript configuration
```

### Client Structure
```
client/
├── src/
│   ├── api/
│   │   └── axios.ts                 # Axios instance with auth interceptors
│   ├── components/
│   │   ├── AssignSkill.tsx          # Skill assignment component
│   │   ├── Layout.tsx               # Main layout with sidebar & header
│   │   ├── ProtectedRoute.tsx       # Route guard for authenticated users
│   │   └── PublicRoute.tsx          # Route guard for public pages
│   ├── context/
│   │   └── AuthContext.tsx          # Authentication context provider
│   ├── pages/
│   │   ├── Analytics.tsx            # Analytics dashboard
│   │   ├── Dashboard.tsx            # Main dashboard with stats
│   │   ├── Login.tsx                # Login page
│   │   ├── Personnel.tsx            # Personnel management
│   │   ├── ProjectMatching.tsx      # Project-personnel matching
│   │   ├── Projects.tsx             # Project management
│   │   ├── Settings.tsx             # Application settings
│   │   ├── Signup.tsx               # User registration
│   │   └── Skills.tsx               # Skills management
│   ├── App.css                      # Global styles
│   ├── App.tsx                      # Main app component with routing
│   ├── index.css                    # Tailwind imports
│   └── main.tsx                     # React entry point
├── public/
│   └── vite.svg                     # Favicon
├── eslint.config.js                 # ESLint configuration
├── index.html                       # HTML entry point
├── package.json                     # Client dependencies
├── postcss.config.js                # PostCSS configuration
├── tailwind.config.js               # TailwindCSS configuration
├── tsconfig.json                    # TypeScript configuration
├── tsconfig.app.json                # App-specific TS config
├── tsconfig.node.json               # Node-specific TS config
└── vite.config.ts                   # Vite build configuration
```

## 🎨 Key Features Implementation

### Authentication Flow
1. User registers via `/signup` with email, password, and role
2. Password is hashed using bcryptjs before storage
3. User logs in via `/login` and receives a JWT token
4. Token is stored in localStorage and attached to all API requests
5. Protected routes verify token validity before allowing access
6. Auth context provides user state across the application

### Personnel-Skill Assignment
1. Admin creates personnel records with basic info
2. Skills are assigned to personnel through the AssignSkill component
3. Each skill assignment includes a proficiency level
4. Many-to-many relationship managed through PersonnelSkill junction table

### Project Matching Algorithm
1. Project requirements define needed skills and minimum proficiency
2. System queries available personnel with matching skills
3. Compares personnel proficiency with required minimum proficiency
4. Calculates match percentage based on skill coverage
5. Returns ranked list of suitable personnel

### Real-time Dashboard
1. Fetches aggregated statistics on mount
2. Displays total counts of personnel, projects, and skills
3. Shows project distribution by status
4. Updates automatically when underlying data changes

## 🔒 Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based auth with expiration
- **Protected Routes**: Both frontend and backend route protection
- **CORS Configuration**: Controlled cross-origin requests
- **SQL Injection Prevention**: Sequelize ORM parameterized queries
- **Input Validation**: Zod schema validation on all inputs
- **Role-Based Access**: Different permissions for Admin and Manager roles

## 🧪 Testing

### Manual Testing Checklist

#### Authentication
- [ ] User can register with valid credentials
- [ ] User cannot register with existing email
- [ ] User can login with correct credentials
- [ ] User cannot login with incorrect password
- [ ] Token persists across page refreshes
- [ ] User is redirected after login/logout

#### Personnel Management
- [ ] Create new personnel with all required fields
- [ ] Update existing personnel information
- [ ] Delete personnel records
- [ ] Filter personnel by role
- [ ] Assign skills to personnel
- [ ] View personnel skill list

#### Skills Management
- [ ] Create new skills with categories
- [ ] Update skill information
- [ ] Delete skills
- [ ] Filter skills by category

#### Project Management
- [ ] Create projects with requirements
- [ ] Update project status
- [ ] Delete projects
- [ ] Match personnel to projects
- [ ] View project requirements

## 🚀 Deployment

### Server Deployment (Example: Heroku)

1. **Prepare for deployment:**
   ```bash
   cd server
   npm run build
   ```

2. **Create Procfile:**
   ```
   web: node dist/index.js
   ```

3. **Set environment variables** on hosting platform

4. **Deploy:**
   ```bash
   git push heroku main
   ```

### Client Deployment (Example: Vercel)

1. **Build the client:**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to Vercel:**
   ```bash
   vercel --prod
   ```

3. **Update API URL** in environment variables

### Database Hosting

Consider using:
- **AWS RDS** - Managed MySQL service
- **PlanetScale** - Serverless MySQL platform
- **DigitalOcean** - Managed databases
- **Heroku ClearDB** - MySQL addon

## 🐛 Troubleshooting

### Common Issues

#### Database Connection Error
```
Error: Unable to connect to the database
```
**Solution**: Check MySQL is running and credentials in `.env` are correct

#### CORS Error
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Solution**: Ensure server CORS is configured to allow client origin

#### Token Expiration
```
401 Unauthorized - Token expired
```
**Solution**: Re-login to get a new token

#### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Kill process on port or change PORT in `.env`

### Development Tips

1. **Hot Reload**: Both client and server support hot module replacement
2. **Database Reset**: Drop and recreate database to reset schema
3. **Clear localStorage**: If auth issues, clear browser localStorage
4. **Check Console**: Browser and terminal console show detailed errors

## 📊 Future Enhancements

### Planned Features
- [ ] Advanced analytics with charts (Chart.js/Recharts)
- [ ] Email notifications for project assignments
- [ ] Skill endorsements and recommendations
- [ ] Personnel availability calendar
- [ ] Project timeline Gantt charts
- [ ] Export reports to PDF/Excel
- [ ] Real-time collaboration features
- [ ] Mobile app (React Native)
- [ ] Multi-language support (i18n)
- [ ] Dark mode theme
- [ ] Advanced search and filtering
- [ ] Skill proficiency assessments
- [ ] Training recommendations
- [ ] Team composition suggestions
- [ ] Resource allocation optimization

### Technical Improvements
- [ ] Unit and integration tests (Jest, React Testing Library)
- [ ] E2E testing (Playwright/Cypress)
- [ ] Docker containerization
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Rate limiting and throttling
- [ ] Caching layer (Redis)
- [ ] Database migrations (Sequelize migrations)
- [ ] API versioning
- [ ] GraphQL API option
- [ ] WebSocket for real-time updates
- [ ] Performance monitoring (New Relic, DataDog)
- [ ] Error tracking (Sentry)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Coding Standards
- Follow TypeScript best practices
- Use ESLint rules defined in the project
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation for new features

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👥 Authors

- **Shachiru Rashmika** - Initial work

## 🙏 Acknowledgments

- React and Vite communities for excellent documentation
- Sequelize team for powerful ORM capabilities
- TailwindCSS for beautiful utility classes
- Lucide for comprehensive icon library
- All contributors and open-source projects that made this possible

## 📞 Support

For support, email shachirurashmika35@gmail.com or open an issue in the repository.

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [Sequelize Documentation](https://sequelize.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [JWT.io](https://jwt.io/) - JWT debugger and documentation

---

**Built with ❤️ using React, TypeScript, Node.js, and MySQL**

