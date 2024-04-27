import React from "react";
import ExpenseItem from "./ExpenseItem";

const ExpensesList = ({ expenses, onDeleteExpense, onEditExpense }) => {
  return (
    <div id="expenses-container">
      {expenses.map((expense, index) => (
        <ExpenseItem
          key={index}
          expense={expense}
          onDeleteExpense={onDeleteExpense}
          onEditExpense={onEditExpense}
        />
      ))}
    </div>
  );
};

export default ExpensesList;
