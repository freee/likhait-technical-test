# Frontend Architecture

React + TypeScript single-page application for expense tracking with calendar-based visualization.

## Technology Stack

- **React 18.2** - UI library with functional components and hooks
- **TypeScript 5.3** - Type-safe JavaScript
- **Vite 5.1** - Fast build tool and development server
- **React Router** - Client-side routing

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CalendarExpenseTable.tsx    # Monthly calendar grid
│   ├── CategoryBreakdown.tsx       # Spending summary
│   ├── CategoryFilter.tsx          # Category selector
│   ├── ExpenseForm.tsx             # Add/edit expense
│   ├── MonthNavigation.tsx         # Month selector
│   ├── YearNavigation.tsx          # Year selector
│   ├── QuickAddButton.tsx          # Floating action button
│   └── Sidebar.tsx                 # Navigation sidebar
│
├── pages/               # Page-level components
│   └── HistoryPage.tsx             # Main calendar view
│
├── vibes/               # Custom component library
│   ├── Button.tsx                  # Button component
│   ├── TextField.tsx               # Text input
│   ├── SelectBox.tsx               # Dropdown selector
│   ├── FormControl.tsx             # Form wrapper
│   ├── Modal.tsx                   # Modal dialog
│   ├── ItemTable.tsx               # Data table
│   ├── Pagination.tsx              # Pagination controls
│   └── ColumnBase.tsx              # Table column helper
│
├── services/            # External integrations
│   └── api.ts                      # Backend API client
│
├── hooks/               # Custom React hooks
│   └── useExpenseForm.ts           # Form state management
│
├── utils/               # Helper functions
│   └── expenseUtils.ts             # Expense calculations
│
├── constants/           # App constants
│   ├── categories.ts               # Category list
│   ├── categoryEmojis.ts           # Emoji mappings
│   └── colors.ts                   # Color palette
│
├── types.ts             # TypeScript type definitions
├── App.tsx              # Root component
└── main.tsx             # Application entry point
```

## Key Components

### CalendarExpenseTable

Monthly calendar grid displaying expenses by day. Features:

- Monday-Sunday layout
- Expense listing per day
- Category emojis
- Click to edit expenses

### ExpenseForm

Modal form for creating/editing expenses:

- Description, amount, date, category fields
- Form validation
- Submit and cancel actions

### CategoryBreakdown

Spending summary visualization:

- Total per category
- Percentage calculations
- Color-coded display

### Sidebar

Navigation with category filtering:

- Route navigation
- Category selection
- Clear filters option

## State Management

**Local State**: Components use `useState` and `useEffect` hooks for managing UI state.

**Form State**: The `useExpenseForm` hook centralizes form logic for creating and editing expenses.

**API Integration**: The `api.ts` service handles all backend communication with error handling.

## API Integration

All API calls go through the centralized `services/api.ts` module:

```typescript
// Fetch expenses
getExpenses(year, month, categoryId);

// Fetch categories
getCategories();

// CRUD operations
createExpense(data);
updateExpense(id, data);
deleteExpense(id);
```

## Routing

```
/ → Redirects to /history
/history → Main calendar view (HistoryPage)
```

## Type System

Core types defined in `src/types.ts`:

```typescript
interface Category {
  id: number;
  name: string;
}

interface Expense {
  id: number;
  description: string;
  amount: string;
  date: string;
  category_id: number;
}
```

## Development

### Running Locally

```bash
npm install
npm run dev
```

Application starts at `http://localhost:5173`

### Environment Variables

Create `.env` file:

```bash
VITE_API_URL=http://localhost:3000
```

### Type Checking

```bash
npm run type-check
```

### Building for Production

```bash
npm run build       # Build to dist/
npm run preview     # Preview production build
```

## Design System

The **Vibes** component library provides consistent styling:

- Color scheme using constants
- Inline styles for simplicity
- Reusable form components
- Responsive layouts

## Notable Patterns

**API Error Handling**: All API calls include try-catch blocks with console logging for debugging.

**Date Handling**: Dates are stored as ISO strings (YYYY-MM-DD) for consistency with the backend.

**Decimal Precision**: Amounts are stored as strings to preserve decimal precision from the backend.

**Category Emojis**: Visual indicators mapped to category names for quick identification.

---

**Stack**: React + TypeScript + Vite
