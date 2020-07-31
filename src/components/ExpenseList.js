import React, { Component } from 'react';
import { ExpenseConsumer } from '../context';
import ExpenseItems from './ExpenseItems';

export default class ExpenseList extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="col-md-6 mx-auto">
                    <h2>History</h2>
                    <div className="expense-list">
                        <ul>
                            <ExpenseConsumer>
                                {value => {
                                    console.log(value)
                                    return value.expenses.map((expense) => {
                                        return <ExpenseItems key={expense.id} expense={expense} />
                                    })
                                }}
                            </ExpenseConsumer>
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
