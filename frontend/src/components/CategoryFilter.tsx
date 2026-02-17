/**
 * Category filter component
 */

import React from "react";
import { EXPENSE_CATEGORIES } from "../constants/categories";
import { COLORS } from "../constants/colors";
import { getCategoryEmoji } from "../constants/categoryEmojis";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap",
    padding: "1rem 0",
  };

  const buttonStyle = (isActive: boolean): React.CSSProperties => ({
    padding: "0.5rem 1rem",
    border: `2px solid ${isActive ? COLORS.accent.a01 : COLORS.border}`,
    borderRadius: "1.5rem",
    backgroundColor: isActive ? COLORS.accent.a01 : COLORS.background.main,
    color: isActive ? "white" : COLORS.text.primary,
    cursor: "pointer",
    fontSize: "0.875rem",
    fontWeight: 600,
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  });

  return (
    <div style={containerStyle}>
      <button
        style={buttonStyle(selectedCategory === "")}
        onClick={() => onCategoryChange("")}
      >
        All Categories
      </button>
      {EXPENSE_CATEGORIES.map((category) => (
        <button
          key={category}
          style={buttonStyle(selectedCategory === category)}
          onClick={() => onCategoryChange(category)}
        >
          <span>{getCategoryEmoji(category)}</span>
          <span>{category}</span>
        </button>
      ))}
    </div>
  );
}
