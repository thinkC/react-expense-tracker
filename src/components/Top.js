import React, { Component } from 'react';
import { ExpenseConsumer } from '../context';


export default class Top extends Component {
    render() {

        return (
            <div >
                <h1 className="text-center mb-5">Expense Tracker</h1>
                <div className="row">
                    <div className="col-md-6 mx-auto col-lg-6">
                        <h2>YOUR BALANCE</h2>
                        <ExpenseConsumer>
                            {(value) => {
                                //console.log(value)
                                return (
                                    <h2> <span>${value.addExpenses(value.expenses)}:00</span></h2>

                                )
                            }}

                        </ExpenseConsumer>
                    </div>


                </div>
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <div className="row">
                            <div className="col-6 container" >
                                <div className="card1 pr-5 m-5" >
                                    <div className="row">
                                        <ExpenseConsumer>
                                            {(value) => {
                                                //console.log(value.expenseArrayPositive)
                                                //console.log(value)

                                                // const iterateArr = (item, index, arr) => {
                                                //     arr.forEach((item) => {
                                                //         console.log(item.amount)
                                                //         return item.amount
                                                //     })
                                                // }

                                                return (
                                                    <div>
                                                        <div className="col-6">
                                                            <div className="container1">
                                                                <h4>INCOME</h4>
                                                                <p>${value.expenseArrayPositive(value.expenses)}</p>
                                                            </div>
                                                        </div>

                                                        <div className="col-6">
                                                            <div className="container1">
                                                                <h4>EXPENSE</h4>
                                                                <p>${value.expenseArrayNegative(value.expenses)}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                )
                                            }}







                                        </ExpenseConsumer>

                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>


                </div>


            </div>
        )
    }
}
