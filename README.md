# Expense System

A full-stack expense tracking application with calendar-based visualization for managing personal finances.

## Overview

The Expense System is a modern web application designed to help users track and visualize their expenses through an intuitive calendar interface. Built with a React frontend and Rails API backend, it provides a seamless experience for recording daily expenses, categorizing spending, and understanding financial patterns.

### Core Concepts

**Calendar-Based Visualization**: Expenses are displayed in a monthly calendar grid, making it easy to see spending patterns across days and weeks.

**Category Organization**: All expenses are organized into 10 predefined categories (Food, Transport, Housing, Entertainment, Healthcare, Education, Shopping, Work, Utilities, Other), each with visual emoji indicators.

**Real-Time Updates**: The application provides instant feedback when creating, updating, or deleting expenses without page reloads.

**RESTful Architecture**: Clean separation between frontend and backend enables scalability and maintainability.

## Technology Stack

### Frontend

- **React 18.2** with **TypeScript 5.3** for type-safe UI development
- **Vite 5.1** as the modern build tool and development server
- Custom **"Vibes"** component library for consistent design

### Backend

- **Ruby 3.3.7** with **Rails 7.2** in API-only mode
- **MySQL 8.0** for relational data storage
- **RSpec** for comprehensive testing

### Infrastructure

- **Docker Compose** for containerized development and deployment
- **Puma** web server for handling concurrent requests
- **CORS** configured for frontend-backend communication

## Quick Start

### Using Docker (Recommended)

```bash
# Clone and navigate to project
cd expense_system_rails

# Start all services
docker compose up

# Access the application
# Frontend: http://localhost:5173
# Backend API: http://localhost:3000/api
```

### Manual Setup

**Backend**:

```bash
cd backend
bundle install
rails db:create db:migrate db:seed
rails server  # Starts on port 3000
```

**Frontend**:

```bash
cd frontend
npm install
npm run dev  # Starts on port 5173
```

## Architecture

### System Design

```
┌─────────────┐      HTTP/JSON      ┌─────────────┐      SQL      ┌──────────┐
│   React     │ ←─────────────────→ │ Rails API   │ ←───────────→ │  MySQL   │
│  Frontend   │    REST Endpoints   │   Backend   │   ActiveRecord │ Database │
└─────────────┘                     └─────────────┘               └──────────┘
```

### Project Structure

```
expense_system_rails/
├── frontend/              # React + TypeScript SPA
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Route-level pages
│   │   ├── vibes/         # Custom component library
│   │   ├── services/      # API integration layer
│   │   └── hooks/         # Custom React hooks
│   └── README.md          # Frontend documentation
│
├── backend/               # Rails API
│   ├── app/
│   │   ├── controllers/   # API endpoints
│   │   └── models/        # Business logic
│   ├── db/migrate/        # Database migrations
│   ├── spec/              # RSpec test suite
│   └── README.md          # Backend documentation
│
├── db/                    # Database initialization
└── docker-compose.yml     # Container orchestration
```

## Key Features

### Expense Management

- Create, read, update, and delete expenses
- Required fields: description, amount, date, category
- Automatic timestamp tracking

### Calendar Interface

- Monthly grid view (Monday-Sunday layout)
- Daily expense listing with amounts
- Visual category indicators with emojis
- Navigate between months and years

### Category System

- 10 predefined categories with unique emojis:
  - 🍔 Food | 🚗 Transport | 🏠 Housing | 🎬 Entertainment | 🏥 Healthcare
  - 📚 Education | 🛍️ Shopping | 💼 Work | ⚡ Utilities | 💳 Other
- Color-coded category breakdown
- Spending summary with percentages

### API Endpoints

```
GET    /api/categories              List all categories
GET    /api/categories/:id          Get specific category

GET    /api/expenses                List expenses (?year=YYYY&month=MM&category_id=N)
POST   /api/expenses                Create new expense
GET    /api/expenses/:id            Get specific expense
PUT    /api/expenses/:id            Update expense
DELETE /api/expenses/:id            Delete expense
```

## Database Schema

**categories** (predefined, read-only)

- id, name (unique indexed), created_at, updated_at

**expenses** (user-managed)

- id, description, amount (decimal 10,2), date (indexed), category_id (FK, indexed)
- created_at, updated_at

**Relationships**: Category has many Expenses; Expense belongs to Category

## Development

### Running the Application

```bash
# Start with Docker
docker compose up

# Or start services individually
cd backend && rails server      # Terminal 1
cd frontend && npm run dev      # Terminal 2
```

### Running Tests

```bash
# Backend tests
cd backend
bundle exec rspec

# Frontend type checking
cd frontend
npm run type-check
```

### Database Operations

```bash
# Using Docker
docker compose exec backend rails db:migrate
docker compose exec backend rails db:reset
docker compose exec backend rails console

# Without Docker
cd backend
rails db:migrate
rails db:reset
rails console
```

## Environment Configuration

### Frontend Environment Variables

Create `frontend/.env`:

```bash
VITE_API_URL=http://localhost:3000
```

### Backend Environment Variables (Production)

```bash
DATABASE_HOST=your-db-host
DATABASE_USER=your-db-user
DATABASE_PASSWORD=your-password
RAILS_ENV=production
SECRET_KEY_BASE=$(rails secret)
```

## Documentation

- **Root README.md** (this file): System overview and architecture
- **frontend/README.md**: Frontend implementation details
- **backend/README.md**: Backend API reference

## Contributing

1. Follow Rails and React best practices
2. Maintain TypeScript type safety
3. Write tests for new features
4. Run code quality tools:
   - Backend: `bundle exec rubocop`
   - Frontend: `npm run type-check`

---

**Built with Ruby on Rails + React + TypeScript**
