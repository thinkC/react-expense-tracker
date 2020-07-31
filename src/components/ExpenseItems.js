import React, { Component } from 'react'

export default class ExpenseItems extends Component {
    render() {
        const { id, text, amount } = this.props.expense;
        return (
            <div>

                <li>{text} <span className="amount">{amount}</span></li>

            </div>
        )
    }
}
