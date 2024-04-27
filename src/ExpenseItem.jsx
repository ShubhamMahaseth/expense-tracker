import React from "react";

const ExpenseItem = ({ expense, onDeleteExpense, onEditExpense }) => {
  const { description, amount, date } = expense;

  const handleDelete = () => {
    onDeleteExpense(description, amount);
  };

  const handleEdit = () => {
    onEditExpense(expense);
  };

  return (
    <div className="expense">
      <span>{description}</span>
      <span>${amount.toFixed(2)}</span>
      <span>{date}</span>
      <button className="edit-btn" onClick={handleEdit}>
        Edit
      </button>
      <button className="delete-btn" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default ExpenseItem;
