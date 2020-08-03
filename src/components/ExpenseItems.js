import React, { Component } from 'react';
import { ExpenseConsumer } from '../context';

export default class ExpenseItems extends Component {
    render() {
        const { id, text, amount } = this.props.expense;
        return (
            <ExpenseConsumer>
                {(value) => {
                    //console.log(value)
                    //console.log(value.expenses)

                    return (
                        <div>
                            <li className="item">
                                <div className="info">
                                    <span className="text">{text}</span>
                                    <span className="amount">{amount}</span>
                                </div>
                                <div>
                                    <button onClick={() => { value.getAndEditChosenExpense(id) }} className="edit-btn" aria-label="edit button">
                                        <span><i className="fas fa-pen"  ></i></span>
                                    </button>
                                    <button onClick={() => { value.removeExpense(id) }} className="clear-btn" aria-label="delete button">
                                        <span><i className="fas fa-trash" ></i></span>
                                    </button>
                                </div>
                            </li>

                        </div>
                    )
                }}

            </ExpenseConsumer>
        )
    }
}
