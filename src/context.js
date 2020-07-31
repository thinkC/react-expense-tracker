import React, { Component, createContext } from 'react';
import { expenseDB } from './data';
import { v4 } from 'uuid'

const ExpenseContext = createContext();

class ExpenseProvider extends Component {
    state = {
        expenses: expenseDB,
        id: '',
        text: '',
        amount: '',
    }

    // addExpenses = (obj) => {
    //     const total = Object.values(obj).reduce((t, { value }) => t + value, 0)
    //     return total
    // }

    addExpenses = (arr) => {
        const total = arr.reduce((acc, curr) => {
            return acc += parseInt(curr.amount)
        }, 0)
        console.log(total)
        return total
    }

    addNewExpense = (expense) => {
        expense.id = v4()
        let tempExpenses = [...this.state.expenses, expense];
        //console.log(tempExpenses)

        this.setState(() => {
            return {
                expenses: tempExpenses
            }
        })
        console.log(this.state)

    }

    submitNewExpense = (e, expense) => {
        e.preventDefault();
        this.addNewExpense(expense);
        this.setState({
            text: '',
            amount: ''
        })
        console.log(this.state)
    }

    updateAddExpense = (e, value) => {
        if (value === 'text') {
            this.state.text = e.target.value
            console.log(this.state.text)
        }
        if (value === 'amount') {
            this.state.amount = e.target.value
        }
        console.log(this.state)
    }

    expenseArrayPositive = (arr) => {

        let amountArr = arr.map(element => element.amount);
        let convertArrItemsToNum = amountArr.map((x) => {
            return parseInt(x, 10)
        })
        console.log(amountArr);
        let positiveArr = this.checkPositiveExpenseType(convertArrItemsToNum);
        console.log(positiveArr)
        return positiveArr
    }

    expenseArrayNegative = (arr) => {
        let amountArr = arr.map(element => element.amount);
        let convertArrItemsToNum = amountArr.map((x) => {
            return parseInt(x, 10)
        })

        console.log(amountArr);
        let negativeArr = this.checkNegativeExpenseType(convertArrItemsToNum);
        console.log(negativeArr)
        return negativeArr
    }

    checkPositiveExpenseType = (arr) => {
        let income = [];
        let positiveValue = 5;

        for (let i = 0; i < arr.length; i++) {
            if ((Math.sign(arr[i]) !== -1)) {
                income.push(arr[i])
            }
        }
        console.log(income);
        return income.reduce((acc, curr) => {
            return acc += curr
        }, 0)

    }

    checkNegativeExpenseType = (arr) => {
        let expense = [];

        for (let i = 0; i < arr.length; i++) {
            if ((Math.sign(arr[i]) === -1)) {
                expense.push(arr[i])
            }
        }
        console.log(expense);
        return expense.reduce((acc, curr) => {
            return acc += curr
        }, 0)
    }
    // checkExpenseType = (amount) => {
    //     let positiveExpense = 5;
    //     let negativeExpense = -5
    //     let income = [];
    //     let expense = [];

    //     if (Math.sign(amount)) {
    //         income.push(amount)
    //     }
    //     if (Math.sign(amount)) {
    //         expense.push(amount)
    //     }
    //     console.log(income);
    //     console.log(expense);
    // }

    iterateArr = (arr) => {
        arr.forEach((item) => {
            console.log(item)
            console.log(item.amount)
            let amount = item.amount;
            return amount;
            //return item.amount
        })
    }

    // iterateArr = (arr) => {
    //     for (let i = 0; i < arr.length; i++) {
    //         console.log(arr[i])
    //         if (arr[i] === 'amount') {
    //             console.log(arr[i])
    //             return arr[i]
    //         }
    //     }
    // }
    render() {
        return (
            <ExpenseContext.Provider value={{
                ...this.state,
                addExpenses: this.addExpenses,
                addNewExpense: this.addNewExpense,
                updateAddExpense: this.updateAddExpense,
                submitNewExpense: this.submitNewExpense,
                expenseArrayPositive: this.expenseArrayPositive,
                expenseArrayNegative: this.expenseArrayNegative,
                iterateArr: this.iterateArr
            }}>
                {this.props.children}
            </ExpenseContext.Provider>
        )
    }
}

const ExpenseConsumer = ExpenseContext.Consumer;


export { ExpenseProvider, ExpenseConsumer }
