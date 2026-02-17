# Backend Architecture

Rails 7.2 API backend for the Expense System providing RESTful endpoints for expense tracking.

## Tech Stack

- **Ruby**: 3.3.7
- **Rails**: 7.2.2 (API-only mode)
- **Database**: MySQL 8.0
- **Server**: Puma 6.4.3
- **Testing**: RSpec 6.1.0

## Project Structure

```
backend/
├── app/
│   ├── controllers/api/      # API endpoints
│   │   ├── categories_controller.rb
│   │   └── expenses_controller.rb
│   └── models/               # Business logic
│       ├── category.rb
│       └── expense.rb
├── config/
│   ├── routes.rb            # API routes
│   ├── database.yml         # DB configuration
│   └── initializers/cors.rb # CORS settings
├── db/
│   ├── migrate/             # Database migrations
│   ├── schema.rb            # Current schema
│   └── seeds.rb             # Seed data
└── spec/                    # RSpec tests
    ├── models/
    └── requests/
```

## Database Schema

### Categories Table

```sql
- id: bigint (PK)
- name: string(100) [unique, indexed]
- created_at, updated_at: datetime
```

**Predefined Categories**: Food, Transport, Housing, Entertainment, Healthcare, Education, Shopping, Work, Utilities, Other

### Expenses Table

```sql
- id: bigint (PK)
- description: string [required]
- amount: decimal(10,2) [required, > 0]
- date: date [required, indexed]
- category_id: bigint [FK, indexed]
- created_at, updated_at: datetime
```

## API Endpoints

### Categories

```
GET  /api/categories     # List all categories
GET  /api/categories/:id # Get single category
```

### Expenses

```
GET    /api/expenses              # List expenses (supports ?year=YYYY&month=MM&category_id=N)
POST   /api/expenses              # Create expense
GET    /api/expenses/:id          # Get single expense
PUT    /api/expenses/:id          # Update expense
DELETE /api/expenses/:id          # Delete expense
```

**Example Request**:

```bash
# List expenses for February 2026
GET /api/expenses?year=2026&month=2

# Create expense
POST /api/expenses
{
  "expense": {
    "description": "Grocery shopping",
    "amount": 125.50,
    "category_id": 1,
    "date": "2026-02-18"
  }
}
```

**Response Format**:

```json
{
  "id": 1,
  "description": "Grocery shopping",
  "amount": "125.50",
  "category": "Food",
  "date": "2026-02-18",
  "created_at": "2026-02-18T00:00:00.000Z",
  "updated_at": "2026-02-18T00:00:00.000Z"
}
```

## Development

### Setup

```bash
cd backend

# Install dependencies
bundle install

# Setup database
rails db:create db:migrate db:seed

# Start server (port 3000)
rails server
```

### Testing

```bash
# Run all tests
bundle exec rspec

# Run with documentation format
bundle exec rspec --format documentation

# Run specific test file
bundle exec rspec spec/models/expense_spec.rb
```

### Code Quality

```bash
bundle exec rubocop          # Lint code
bundle exec rubocop -A       # Auto-fix
bundle exec brakeman         # Security scan
```

### Rails Commands

```bash
rails console                # Interactive console
rails routes                 # View all routes
rails db:migrate            # Run migrations
rails db:rollback           # Rollback migration
rails db:reset              # Drop, create, migrate, seed
```

## Models

### Category

```ruby
# Validations
validates :name, presence: true, uniqueness: true, length: { maximum: 100 }

# Associations
has_many :expenses, dependent: :destroy
```

### Expense

```ruby
# Validations
validates :description, presence: true
validates :amount, numericality: { greater_than: 0 }
validates :date, presence: true
validates :category_id, presence: true

# Associations
belongs_to :category

# Scopes
scope :by_year, ->(year) { where('YEAR(date) = ?', year) }
scope :by_month, ->(month) { where('MONTH(date) = ?', month) }
scope :recent, -> { order(date: :desc, created_at: :desc) }
```

## Configuration

### CORS

Configured in `config/initializers/cors.rb` for frontend integration:

```ruby
origins 'http://localhost:5173'  # Development
methods :get, :post, :put, :delete, :options
```

### Database

Connection settings in `config/database.yml`:

```yaml
development:
  adapter: mysql2
  host: db
  username: expense_user
  password: expense_password
  database: expense_system_development
```

## Docker

```bash
# Build
docker compose build backend

# Run migrations
docker compose exec backend rails db:migrate

# Access Rails console
docker compose exec backend rails console

# View logs
docker compose logs -f backend
```

## Deployment

### Environment Variables

```bash
DATABASE_HOST=your-db-host
DATABASE_USER=your-db-user
DATABASE_PASSWORD=your-password
RAILS_ENV=production
SECRET_KEY_BASE=$(rails secret)
```

### Production Setup

```bash
RAILS_ENV=production rails db:create db:migrate
RAILS_ENV=production rails server
```

## Testing Coverage

- **Model Tests**: Validations, associations, scopes
- **Request Tests**: API endpoints, response formats
- **Factories**: Test data generation with FactoryBot

---

**Built with Ruby on Rails 7.2**
