# Bug Reports and Feature Requests

## BUG-001: New Expenses Not Appearing at Top of List

## 📝 Summary

When adding a new expense, it doesn't appear at the top of the expense list. Expenses should be ordered by their expense date (descending) rather than creation timestamp to ensure the most recent expenses appear first.

## 🐛 Bug Report / ✨ Feature Request

- [x] This is a Bug Report
- [ ] This is a Feature Request

---

### 🔍 Actual Behavior

When a new expense is created, it appears somewhere in the middle or bottom of the expense list instead of at the top, making it difficult for users to verify their newly added expense.

### 🎯 Expected Behavior

Newly added expenses should appear at the top of the expense table, ordered by their expense date in descending order (most recent dates first).

### 🎬 Steps to Reproduce

1. Go to the Expense History page
2. Click on 'Add Expense' button
3. Fill in the form with today's date and submit
4. Observe the expense list after the page reloads
5. Notice the new expense is not at the top of the list

### 📸 Screenshots / Recordings

N/A

### 💻 Environment

- **OS:** macOS
- **Browser:** Chrome/Safari
- **Version:** Current

---

### 💡 Possible Solution

In `backend/app/controllers/api/expenses_controller.rb`, change the ordering from `created_at` to `date`:

```ruby
expenses = Expense.includes(:category).order(date: :desc, created_at: :desc)
```

The issue is that expenses are currently ordered by `created_at` timestamp, but should be ordered by the `date` field which represents the actual expense date. Add `created_at` as a secondary sort for expenses on the same date.

### 🚩 Additional Context

**Severity:** Medium - Affects user experience but workaround exists (user can manually scroll to find their expense)
**Files Affected:**

- `backend/app/controllers/api/expenses_controller.rb` (line 7)

---

## BUG-002: Year Not Decreasing When Navigating from January to Previous Month

## 📝 Summary

When clicking the "Previous" button from January, the month correctly changes to December, but the year remains the same instead of decreasing by 1.

## 🐛 Bug Report / ✨ Feature Request

- [x] This is a Bug Report
- [ ] This is a Feature Request

---

### 🔍 Actual Behavior

When viewing January 2026 and clicking the "Previous month" arrow button, the interface changes to December 2026 instead of December 2025.

### 🎯 Expected Behavior

When clicking "Previous month" from January, the interface should navigate to December of the previous year (e.g., January 2026 → December 2025).

### 🎬 Steps to Reproduce

1. Go to the Expense History page
2. Navigate to January of any year (e.g., January 2026)
3. Click on the 'Previous month' arrow button (←)
4. Observe that the month changes to December but year stays as 2026
5. Expected: December 2025, Actual: December 2026

### 📸 Screenshots / Recordings

N/A

### 💻 Environment

- **OS:** macOS
- **Browser:** Chrome/Safari
- **Version:** Current

---

### 💡 Possible Solution

In `frontend/src/pages/HistoryPage.tsx`, the `handleMonthChange` function only accepts one parameter (month) but `MonthNavigation` component passes two parameters (month and year):

Current implementation in HistoryPage.tsx (line 66-69):

```typescript
const handleMonthChange = (month: number) => {
  setSelectedMonth(month);
  updateURL(selectedYear, month);
};
```

Should be changed to:

```typescript
const handleMonthChange = (month: number, year: number) => {
  setSelectedMonth(month);
  setSelectedYear(year);
  updateURL(year, month);
};
```

The MonthNavigation component correctly calculates the new year when going from January to December, but the parent component's handler ignores the year parameter.

### 🚩 Additional Context

**Severity:** Medium - Critical navigation bug but can be worked around by using year navigation controls
**Files Affected:**

- `frontend/src/pages/HistoryPage.tsx` (handleMonthChange function around line 66)

---

## FEATURE-001: Add Category Management Feature

## 📝 Summary

Implement the ability to create new expense categories dynamically through the UI, allowing users to customize categories beyond the predefined list.

## 🐛 Bug Report / ✨ Feature Request

- [ ] This is a Bug Report
- [x] This is a Feature Request

---

### 🔍 Actual Behavior

Users can only select from a predefined list of expense categories. There is no way to add custom categories.

### 🎯 Expected Behavior

Users should be able to create new categories through the UI with the following features:

1. An "Add Category" button in a prominent location
2. A modal dialog to input new category details
3. Backend endpoint to persist the new category
4. Updated category list after creation

### 🎬 Steps to Reproduce

N/A - Feature doesn't exist yet

### 📸 Screenshots / Recordings

N/A

### 💻 Environment

- **OS:** macOS
- **Browser:** Chrome/Safari
- **Version:** Current

---

### 💡 Possible Solution

**Frontend Changes:**

1. Add "Add Category" button (possibly in Sidebar or near category filter)
2. Create `CreateCategoryModal` component with form fields:
   - Category name (required)
   - Category emoji/icon selector
3. Update `frontend/src/services/api.ts` to add:
   ```typescript
   export async function createCategory(name: string): Promise<Category> {
     const response = await fetch(`${API_BASE_URL}/categories`, {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ category: { name } }),
     });
     if (!response.ok) throw new Error("Failed to create category");
     return response.json();
   }
   ```

**Backend Changes:**

1. Add `create` action to `backend/app/controllers/api/categories_controller.rb`:

   ```ruby
   def create
     category = Category.new(category_params)
     if category.save
       render json: category, status: :created
     else
       render json: { errors: category.errors.full_messages },
              status: :unprocessable_entity
     end
   end

   private
   def category_params
     params.require(:category).permit(:name)
   end
   ```

2. Update routes in `backend/config/routes.rb` to include POST endpoint

**State Management:**

- Refresh category list after successful creation
- Update both the expense form dropdown and category filter components

### 🚩 Additional Context

**Priority:** Medium
**Files to Create/Modify:**

- `frontend/src/components/CreateCategoryModal.tsx` (new)
- `frontend/src/services/api.ts` (add createCategory function)
- `backend/app/controllers/api/categories_controller.rb` (add create action)
- `backend/config/routes.rb` (if not already POST-enabled)
- `backend/app/models/category.rb` (add validations)

---

## FEATURE-002: Category Card Filtering

## 📝 Summary

Make category cards in the CategoryBreakdown component clickable to filter expenses by that specific category.

## 🐛 Bug Report / ✨ Feature Request

- [ ] This is a Bug Report
- [x] This is a Feature Request

---

### 🔍 Actual Behavior

The CategoryBreakdown component displays category cards with total amounts, but clicking on them does nothing. Users cannot filter expenses by clicking on category cards.

### 🎯 Expected Behavior

When users click on any category card in the CategoryBreakdown section, the expense table below should filter to show only expenses from that category. Clicking again or clicking another category should update the filter accordingly.

### 🎬 Steps to Reproduce

N/A - Feature doesn't exist yet

### 📸 Screenshots / Recordings

N/A

### 💻 Environment

- **OS:** macOS
- **Browser:** Chrome/Safari
- **Version:** Current

---

### 💡 Possible Solution

1. **Add state management in HistoryPage:**

   ```typescript
   const [selectedCategory, setSelectedCategory] = useState<string>("");
   ```

2. **Pass click handler to CategoryBreakdown:**

   ```typescript
   <CategoryBreakdown
     categories={categories}
     total={total}
     totalCount={totalCount}
     onCategoryClick={setSelectedCategory}
     selectedCategory={selectedCategory}
   />
   ```

3. **Update CategoryBreakdown component:**
   - Add `onCategoryClick` and `selectedCategory` props
   - Make category cards clickable with visual feedback
   - Add hover and active states
   - Show visual indicator for selected category

4. **Filter expenses in HistoryPage:**

   ```typescript
   const filteredExpenses = selectedCategory
     ? expenses.filter((e) => e.category === selectedCategory)
     : expenses;
   ```

5. **Pass filtered expenses to CalendarExpenseTable:**

   ```typescript
   <CalendarExpenseTable
     expenses={filteredExpenses}
     onExpenseUpdated={fetchExpenses}
   />
   ```

6. **Add "Clear Filter" or "All Categories" button** to reset filter

### 🚩 Additional Context

**Priority:** High - Improves UX significantly
**Files to Modify:**

- `frontend/src/components/CategoryBreakdown.tsx`
- `frontend/src/pages/HistoryPage.tsx`

**Design Considerations:**

- Add visual feedback (cursor pointer, hover effects)
- Highlight selected category
- Consider adding a badge or indicator showing active filter
- Ensure clicking the same category again deselects it

---

## FEATURE-003: Pagination Limit Options in Calendar Expense Table

## 📝 Summary

Add a dropdown selector to allow users to choose how many expenses to display per page (10, 20, or 50 items) instead of the hardcoded 10 items per page.

## 🐛 Bug Report / ✨ Feature Request

- [ ] This is a Bug Report
- [x] This is a Feature Request

---

### 🔍 Actual Behavior

The CalendarExpenseTable component displays exactly 10 expenses per page with no option to change this limit.

### 🎯 Expected Behavior

Users should be able to select their preferred number of items per page from a dropdown with options: 10, 20, or 50. The selection should persist during the session and update the table immediately.

### 🎬 Steps to Reproduce

N/A - Feature doesn't exist yet

### 📸 Screenshots / Recordings

N/A

### 💻 Environment

- **OS:** macOS
- **Browser:** Chrome/Safari
- **Version:** Current

---

### 💡 Possible Solution

1. **Update CalendarExpenseTable component state:**

   ```typescript
   const [itemsPerPage, setItemsPerPage] = useState(10);
   const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50];
   ```

2. **Replace hardcoded `ITEMS_PER_PAGE` constant:**

   ```typescript
   // Remove: const ITEMS_PER_PAGE = 10;
   // Use: itemsPerPage state variable
   const totalPages = Math.ceil(expenses.length / itemsPerPage);
   const startIndex = (currentPage - 1) * itemsPerPage;
   const endIndex = startIndex + itemsPerPage;
   ```

3. **Add SelectBox component for limit selection:**

   ```typescript
   <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
     <span>Items per page:</span>
     <SelectBox
       options={ITEMS_PER_PAGE_OPTIONS.map(val => ({
         value: val.toString(),
         label: val.toString()
       }))}
       value={itemsPerPage.toString()}
       onChange={(e) => {
         setItemsPerPage(Number(e.target.value));
         setCurrentPage(1); // Reset to first page
       }}
     />
   </div>
   ```

4. **Update Pagination component** to show current range:

   ```typescript
   <div style={{ textAlign: 'center', margin: '1rem 0' }}>
     Showing {startIndex + 1}-{Math.min(endIndex, expenses.length)} of {expenses.length} expenses
   </div>
   ```

5. **Consider persisting selection** in localStorage for better UX

### 🚩 Additional Context

**Priority:** Medium
**Files to Modify:**

- `frontend/src/components/CalendarExpenseTable.tsx`

**Design Considerations:**

- Position the selector near the pagination controls
- Reset to page 1 when changing items per page
- Consider showing "Showing X-Y of Z items" text
- Consider persisting user preference in localStorage

---

## FEATURE-004: Prevent Future Date Expense Creation

## 📝 Summary

Add validation to prevent users from creating expenses with dates in the future. Users should only be able to add expenses for today or past dates.

## 🐛 Bug Report / ✨ Feature Request

- [ ] This is a Bug Report
- [x] This is a Feature Request

---

### 🔍 Actual Behavior

Users can select any date in the future when creating an expense, which doesn't make sense for expense tracking (you can't have spent money on a future date).

### 🎯 Expected Behavior

The date picker in the expense form should:

1. Prevent selection of future dates
2. Default to today's date
3. Show a validation error if user manually enters a future date
4. Display a helpful error message explaining the restriction

### 🎬 Steps to Reproduce

N/A - Feature doesn't exist yet

### 📸 Screenshots / Recordings

N/A

### 💻 Environment

- **OS:** macOS
- **Browser:** Chrome/Safari
- **Version:** Current

---

### 💡 Possible Solution

**Frontend Validation:**

1. **Update TextField component for date in ExpenseForm.tsx:**

   ```typescript
   <TextField
     label="Date"
     type="date"
     value={formData.date}
     onChange={(e) => handleChange("date", e.target.value)}
     error={errors.date}
     max={new Date().toISOString().split('T')[0]} // Set max to today
     fullWidth
     required
   />
   ```

2. **Add validation in useExpenseForm hook:**
   ```typescript
   const validateForm = () => {
     const newErrors: Record<string, string> = {};

     // Existing validations...

     // Date validation
     if (!formData.date) {
       newErrors.date = "Date is required";
     } else {
       const selectedDate = new Date(formData.date);
       const today = new Date();
       today.setHours(0, 0, 0, 0); // Reset time for accurate comparison

       if (selectedDate > today) {
         newErrors.date = "Cannot create expenses for future dates";
       }
     }

     setErrors(newErrors);
     return Object.keys(newErrors).length === 0;
   };
   ```

**Backend Validation (Defense in depth):**

1. **Add validation to Expense model:**

   ```ruby
   class Expense < ApplicationRecord
     validate :date_cannot_be_in_future

     private

     def date_cannot_be_in_future
       if date.present? && date > Date.today
         errors.add(:date, "cannot be in the future")
       end
     end
   end
   ```

### 🚩 Additional Context

**Priority:** High - Data integrity issue
**Files to Modify:**

- `frontend/src/hooks/useExpenseForm.ts` (add validation logic)
- `frontend/src/components/ExpenseForm.tsx` (add max attribute to date field)
- `backend/app/models/expense.rb` (add model validation)

**Design Considerations:**

- Clear error message explaining why future dates aren't allowed
- Consider if there are legitimate use cases for future dates (scheduled expenses?)
- Ensure validation works across different timezones
- The HTML5 date input `max` attribute provides native browser validation
- Backend validation provides additional security layer

---

## Summary

**Total Tickets:** 6

- **Bugs:** 2 (BUG-001, BUG-002)
- **Features:** 4 (FEATURE-001, FEATURE-002, FEATURE-003, FEATURE-004)

**Priority Breakdown:**

- High: FEATURE-002, FEATURE-004
- Medium: BUG-001, BUG
