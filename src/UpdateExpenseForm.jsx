import React, { useState } from "react";

const UpdateExpenseForm = ({
  expense,
  onUpdateExpense,
  onCloseUpdateModal,
}) => {
  const [updatedDescription, setUpdatedDescription] = useState(
    expense.description
  );
  const [updatedAmount, setUpdatedAmount] = useState(String(expense.amount));
  const [updatedDate, setUpdatedDate] = useState(expense.date);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!updatedDescription || isNaN(updatedAmount) || updatedAmount <= 0) {
      alert("Please enter valid data.");
      return;
    }

    onUpdateExpense(updatedDescription, parseFloat(updatedAmount), updatedDate);
  };

  return (
    <div id="update-modal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={onCloseUpdateModal}>
          &times;
        </span>
        <h2>Update Expense</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="update-description">New Description:</label>
          <input
            type="text"
            id="update-description"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            required
          />
          <label htmlFor="update-amount">New Amount ($):</label>
          <input
            type="number"
            id="update-amount"
            value={updatedAmount}
            onChange={(e) => setUpdatedAmount(e.target.value)}
            required
          />
          <label htmlFor="date">Date:</label>{" "}
          <input
            type="date"
            id="date"
            value={updatedDate}
            onChange={(e) => setUpdatedDate(e.target.value)}
            required
          />
          <button type="submit">Update Expense</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateExpenseForm;
