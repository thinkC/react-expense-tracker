import React, { Component, createContext } from 'react';
import { expenseDB } from './data';
import { v4 } from 'uuid'

const ExpenseContext = createContext();

class ExpenseProvider extends Component {
    // state = {
    //     expenses: expenseDB,
    //     id: '',
    //     text: '',
    //     amount: '',
    //     updateOnEdit: []
    // }
    state = {
        expenses: expenseDB,
        id: '',
        text: '',
        amount: '',
        updateOnEdit: [],
        chartData: {},
        newItemAdded: [],
        itemAdded: {
            status: false
        }

    }
    componentWillMount() {
        this.getChartData()
    }

    getChartData = () => {
        this.setState({
            chartData: {
                //labels: ['Groceries', 'Savings', 'Shoe', 'Gift'],
                //labels: this.getChartText(this.state.expenses),
                labels: this.getChartText(this.state.expenses, this.state.newItemAdded),
                datasets: [
                    {
                        label: 'Test',
                        // data: [
                        //     20,
                        //     100,
                        //     30,
                        //     60
                        // ],
                        data: this.getChartAmount(this.state.expenses),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)'
                        ]
                    }
                ],

            }
        })
    }

    //summ all expenses
    addExpenses = (arr) => {
        console.log(arr)
        const total = arr.reduce((acc, curr) => {
            console.log(curr.amount)
            return acc += parseInt(curr.amount)
        }, 0)
        //console.log(total)
        return total
    }

    //add new expense
    addNewExpense = (expense) => {
        expense.id = v4()
        let tempExpenses = [...this.state.expenses, expense];
        console.log(tempExpenses)

        // this.setState(() => {
        //     return {
        //         expenses: tempExpenses
        //     }
        // })

        this.setState({
            expenses: tempExpenses
        })
        console.log(this.state.expenses)
        return tempExpenses;
    }

    //submit new expense
    submitNewExpense = (e, expense, id) => {
        e.preventDefault();
        let newState = this.addNewExpense(expense);
        console.log(newState)

        this.setState({
            text: '',
            amount: '',
            newItemAdded: newState


        }, () => {
            this.setState({
                itemAdded: true
            })
        })

        // let new1 = this.state.itemAdded
        // new1.status = true
        // this.setState({
        //     new1: new1,
        //     newItemAdded: newState
        // })

        // console.log(this.state.itemAdded)
        // console.log(this.state.newItemAdded)
        return newState
    }

    updateAddAndEditExpense = (e, value1) => {
        if (value1 === 'text') {
            this.state.text = e.target.value
            //console.log(this.state.text)
        }

        if (value1 === 'amount') {
            this.state.amount = e.target.value
        }

        const tempArr = [
            this.state.id,
            this.state.text,
            this.state.amount
        ];



        console.log(tempArr)
        this.setState({
            //updateOnEdit: this.convertAmountStringInArrayToNum(tempArr)
            updateOnEdit: tempArr
        })
        //console.log(tempArr)
    }


    // convertAmountStringInArrayToNum = (arr) => {
    //     let newArr = [];

    //     arr.forEach(item => {
    //         if (arr.indexOf(item) === 1) {
    //             newArr.push(item)
    //         }
    //         else if (arr.indexOf(item) === 2) {
    //             newArr.push(parseInt(item))
    //         } else {
    //             newArr.push(item)
    //         }
    //     });
    //     console.log(newArr)
    //     return newArr;
    // }
    expenseArrayPositive = (arr) => {

        //get amount into an array
        let amountArr = arr.map(element => element.amount);
        console.log(amountArr);
        amountArr = this.removeExtra(amountArr)
        console.log(amountArr)
        let convertArrItemsToNum = amountArr.map((x) => {
            return parseInt(x, 10)
        })
        console.log(convertArrItemsToNum)
        //console.log(amountArr);
        let positiveArr = this.checkPositiveExpenseType(convertArrItemsToNum);
        //console.log(positiveArr)
        return positiveArr
    }

    expenseArrayNegative = (arr) => {
        let amountArr = arr.map(element => element.amount);
        let convertArrItemsToNum = amountArr.map((x) => {
            return parseInt(x, 10)
        })

        //console.log(amountArr);
        let negativeArr = this.checkNegativeExpenseType(convertArrItemsToNum);
        //console.log(negativeArr)
        return negativeArr
    }

    checkPositiveExpenseType = (arr) => {
        console.log(arr)
        let income = [];
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
        //console.log(expense);
        return expense.reduce((acc, curr) => {
            return acc += curr
        }, 0)
    }

    // iterateArr = (arr) => {
    //     arr.forEach((item) => {
    //         console.log(item)
    //         console.log(item.amount)
    //         let amount = item.amount;
    //         return amount;
    //         //return item.amount
    //     })
    // }


    getExpense = (id) => {
        let tempExpenses = [...this.state.expenses];
        let OneExpense = tempExpenses.find(expense => expense.id === id)
        //console.log(OneExpense)
        return OneExpense

    }

    getAndEditChosenExpense = (id) => {
        let tempExpenses = [...this.state.expenses];
        let index = tempExpenses.indexOf(this.getExpense(id))
        //console.log(index);
        let chosenExpense = tempExpenses[index]
        console.log(chosenExpense);
        this.setState({
            id: chosenExpense['id'],
            text: chosenExpense['text'],
            amount: chosenExpense['amount']
        });
        //console.log(this.state)
    }

    removeExpense = (id) => {
        let tempExpenses = [...this.state.expenses];
        tempExpenses = tempExpenses.filter((expense) => expense.id !== id)

        this.setState(() => {
            return {
                expenses: tempExpenses
            }
        })
    };

    convertTextToNum = (str) => {
        return parseInt(str);
    }

    onEditSave = (id) => {

        if (id !== null) {
            const expensesToSave = this.state.expenses;
            const index = expensesToSave.indexOf(this.getExpense(id));
            //console.log(expensesToSave)
            const expenseRecord = expensesToSave[index];
            expenseRecord['text'] = this.state.updateOnEdit[1];
            expenseRecord['amount'] = this.state.updateOnEdit[2];
            //expenseRecord['amount'] = this.state.updateOnEdit[this.convertTextToNum(2)];
            this.setState({
                expenses: [...this.state.expenses],
                id: '',
                text: '',
                amount: ''
            })
            console.log(this.state.expenses)

        }

    }

    removeExtra = (arr) => {
        let arr1 = arr.pop();
        console.log(arr)
        return arr;

    }

    checkArrWithEmptyValue = (arr) => {
        arr.map((item) => {
            console.log(item.text)
            if (item.text === '') {
                //console.log(item.text)
                return true
            } else {
                return false
            }
        })
    }

    check = (arr, id) => {
        if (this.checkArrWithEmptyValue(arr)) {
            this.removeExtra(arr)
        }
    }

    getChartAmount = (arr) => {
        let amount = arr.map((item) => item.amount);
        console.log(amount)
        return amount;
    }

    getChartText = (arr) => {
        let text = arr.map((item) => item.text);
        console.log(text)
        return text;
    }

    getChartText = (arr1, arr2) => {
        if (this.state.itemAdded === false) {
            let text = arr1.map((item) => item.text);
            console.log(text)
            return text;
        } else {
            let text = arr2.map((item) => item.text);
            console.log(text)
            return text;
            // console.log(this.state.newItemAdded)
            // let text = func.map((item) => item.text);
            // console.log(text)
            // return text;
            // let text = this.addNewExpenseOne(id).map((item) => item.text)
            // console.log(text);
            // return text;
        }

    }





    render() {
        return (
            <ExpenseContext.Provider value={{
                ...this.state,
                addExpenses: this.addExpenses,
                addNewExpense: this.addNewExpense,
                updateAddAndEditExpense: this.updateAddAndEditExpense,
                submitNewExpense: this.submitNewExpense,
                expenseArrayPositive: this.expenseArrayPositive,
                expenseArrayNegative: this.expenseArrayNegative,
                removeExpense: this.removeExpense,
                getAndEditChosenExpense: this.getAndEditChosenExpense,
                onEditSave: this.onEditSave,
                removeExtra: this.removeExtra


            }}>
                {this.props.children}
            </ExpenseContext.Provider>
        )
    }
}

const ExpenseConsumer = ExpenseContext.Consumer;


export { ExpenseProvider, ExpenseConsumer }

//https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react