import React, { useState, useEffect, Fragment } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpensesList from "./ExpensesList";
import UpdateExpenseForm from "./UpdateExpenseForm";
import "./App.css";
import home from "./assets/home.svg";
import add from "./assets/add.svg";
import account from "./assets/account.png";
import wallet from "./assets/wallet.png";
import barChart from "./assets/barChart.png";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [component, setComponent] = useState("Home");

  const handleScreen = (mode) => {
    setComponent(mode);
  };

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

  const updateExpense = (updatedDescription, updatedAmount) => {
    const updatedExpenses = expenses.map((expense) => {
      if (expense === selectedExpense) {
        return {
          ...expense,
          description: updatedDescription,
          amount: updatedAmount,
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
      {component === "AddExpense" ? (
        <ExpenseForm onAddExpense={addExpense} />
      ) : component === "Home" ? (
        <Fragment>
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
        </Fragment>
      ) : null}
      <div className="img-wrapper">
        <div className={"img" + (component === "Home" ? " active" : "")}>
          <img
            src={home}
            alt="home"
            className={"img"}
            onClick={() => handleScreen("Home")}
          />
        </div>
        <div className={"img" + (component === "Statistics" ? " active" : "")}>
          <img
            src={barChart}
            alt="statistics"
            width={50}
            height={50}
            className={"img"}
            onClick={() => handleScreen("Statistics")}
          />
        </div>
        <div className={"img" + (component === "AddExpense" ? " active" : "")}>
          <img
            src={add}
            alt="add"
            className={"img"}
            onClick={() => handleScreen("AddExpense")}
          />
        </div>
        <div className={"img" + (component === "Wallet" ? " active" : "")}>
          <img
            src={wallet}
            alt="wallet"
            className={"img"}
            width={50}
            height={50}
            onClick={() => handleScreen("Wallet")}
          />
        </div>
        <div className={"img" + (component === "Account" ? " active" : "")}>
          <img
            src={account}
            alt="account"
            className={"img"}
            width={55}
            height={55}
            onClick={() => handleScreen("Account")}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
