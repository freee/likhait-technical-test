/**
 * Utility functions for expense calculations and data manipulation
 */

import { Expense, CategoryBreakdown, TopCategory } from "../types";

/**
 * Calculate total amount from an array of expenses
 */
export function calculateTotal(expenses: Expense[]): number {
  return expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
}

/**
 * Group expenses by category and calculate totals
 */
export function calculateCategoryBreakdown(
  expenses: Expense[],
): CategoryBreakdown[] {
  const total = calculateTotal(expenses);
  const categoryTotals = new Map<string, number>();

  expenses.forEach((expense) => {
    const current = categoryTotals.get(expense.category) || 0;
    categoryTotals.set(expense.category, current + Number(expense.amount));
  });

  return Array.from(categoryTotals.entries())
    .map(([category, categoryTotal]) => ({
      category,
      total: categoryTotal,
      percentage: total > 0 ? (categoryTotal / total) * 100 : 0,
    }))
    .sort((a, b) => b.total - a.total);
}

/**
 * Get top spending categories with count
 */
export function getTopCategories(
  expenses: Expense[],
  limit: number = 5,
): TopCategory[] {
  const categoryData = new Map<string, { total: number; count: number }>();

  expenses.forEach((expense) => {
    const current = categoryData.get(expense.category) || {
      total: 0,
      count: 0,
    };
    categoryData.set(expense.category, {
      total: current.total + Number(expense.amount),
      count: current.count + 1,
    });
  });

  return Array.from(categoryData.entries())
    .map(([category, data]) => ({
      category,
      total: data.total,
      count: data.count,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, limit);
}

/**
 * Format currency amount
 */
export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

/**
 * Format date to YYYY-MM-DD
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Get days in month
 */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

/**
 * Group expenses by day
 */
export function groupExpensesByDay(expenses: Expense[]) {
  const grouped = new Map<number, Expense[]>();

  expenses.forEach((expense) => {
    const day = new Date(expense.date).getDate();
    const dayExpenses = grouped.get(day) || [];
    dayExpenses.push(expense);
    grouped.set(day, dayExpenses);
  });

  return grouped;
}

/**
 * Filter expenses by month and year
 */
export function filterExpensesByMonth(
  expenses: Expense[],
  year: number,
  month: number,
): Expense[] {
  return expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return (
      expenseDate.getFullYear() === year && expenseDate.getMonth() + 1 === month
    );
  });
}

/**
 * Filter expenses by category
 */
export function filterExpensesByCategory(
  expenses: Expense[],
  category: string,
): Expense[] {
  if (!category) return expenses;
  return expenses.filter((expense) => expense.category === category);
}
