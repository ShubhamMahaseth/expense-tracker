import React, { useState, useEffect } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpensesList from "./ExpensesList";
import UpdateExpenseForm from "./UpdateExpenseForm";
import "./App.css";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [selectedExpense, setSelectedExpense] = useState(null);

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(storedExpenses);
    calculateTotalExpense(storedExpenses);
  }, []);

  const calculateTotalExpense = (expenses) => {
    const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    setTotalExpense(total);
  };

  const addExpense = (newExpense) => {
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    calculateTotalExpense(updatedExpenses);
    saveExpenses(updatedExpenses);
  };

  const deleteExpense = (description, amount) => {
    const updatedExpenses = expenses.filter(
      (expense) => expense.description !== description
    );
    setExpenses(updatedExpenses);
    calculateTotalExpense(updatedExpenses);
    saveExpenses(updatedExpenses);
  };

  const deleteAllExpenses = () => {
    if (window.confirm("Are you sure you want to delete all expenses?")) {
      setExpenses([]);
      setTotalExpense(0);
      localStorage.removeItem("expenses");
    }
  };

  const saveExpenses = (expenses) => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  };

  const openUpdateModal = (expense) => {
    setSelectedExpense(expense);
  };

  const closeUpdateModal = () => {
    setSelectedExpense(null);
  };

  const updateExpense = (updatedDescription, updatedAmount, updatedDate) => {
    const updatedExpenses = expenses.map((expense) => {
      if (expense === selectedExpense) {
        return {
          ...expense,
          description: updatedDescription,
          amount: updatedAmount,
          date: updatedDate,
        };
      }
      return expense;
    });

    setExpenses(updatedExpenses);
    calculateTotalExpense(updatedExpenses);
    saveExpenses(updatedExpenses);
    closeUpdateModal();
  };

  return (
    <div className="container">
      <h1>Expense Tracker</h1>
      <ExpenseForm onAddExpense={addExpense} />
      <ExpensesList
        expenses={expenses}
        onDeleteExpense={deleteExpense}
        onEditExpense={openUpdateModal}
      />
      <div className="total">
        <div id="total-expense">
          <h2>Total Expense: ${totalExpense.toFixed(2)}</h2>
        </div>
        <button onClick={deleteAllExpenses}>Delete All Expenses</button>
      </div>
      {selectedExpense && (
        <UpdateExpenseForm
          expense={selectedExpense}
          onUpdateExpense={updateExpense}
          onCloseUpdateModal={closeUpdateModal}
        />
      )}
    </div>
  );
};

export default App;
