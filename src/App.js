import React, { useState, useEffect } from "react";
import GlobalStyle from "./styles/global";
import Header from "./components/Header";
import Resume from "./components/Resume";
import Form from "./components/Form";

const App = () => {
  const data = localStorage.getItem("transactions");
  const [transactionsList, setTransactionsList] = useState(
    data ? JSON.parse(data) : []
  );

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    //Pegar todas as saídas
    const amountExpenses = transactionsList
      .filter((item) => item.expense)
      .map((transaction) => Number(transaction.amount));

    //Pegar todas as entradas
    const amountIncome = transactionsList
      .filter((item) => !item.expense)
      .map((transaction) => Number(transaction.amount));

    //somar total de saidas
    const expense = amountExpenses.reduce((acc, cur) => acc + cur, 0).toFixed(2);

    //somar total de entradas
    const income = amountIncome.reduce((acc, cur) => acc + cur, 0).toFixed(2);

    //total
    const total = Math.abs(income - expense).toFixed(2);

    setIncome(`R$ ${income}`);
    setExpense(`R$ ${expense}`);
    setTotal(`${Number(income) < Number(expense) ? "-" : ""}R$ ${total}`);
  }, [transactionsList]);

    const handleAdd = (transaction) => {
    const newArrayTransaction = [...transactionsList, transaction];

    setTransactionsList(newArrayTransaction);

    localStorage.setItem("transactions", JSON.stringify(newArrayTransaction));
  };

  return (
    <>
      <Header />
      <Resume income={income} expense={expense} total={total} />
      <Form handleAdd={handleAdd} transactionsList={transactionsList} setTransactionsList={setTransactionsList} />
      <GlobalStyle />
    </>
  );
};

export default App;
