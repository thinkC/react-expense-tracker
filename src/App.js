import React from 'react';
import Top from './components/Top';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';



import './App.css';

function App() {
  return (
    <div className="container top">
      <Top />
      <ExpenseList />
      <ExpenseForm />
    </div>
  );
}

export default App;
