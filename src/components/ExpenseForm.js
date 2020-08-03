import React, { Component } from 'react';
import { ExpenseConsumer } from '../context';

export default class ExpenseForm extends Component {
    // state = {
    //     text: '',
    //     amount: ''
    // }

    handleChangeText = (e) => {
        this.setState({
            text: e.target.value
        })
    }

    handleChangeAmount = (e) => {
        this.setState({
            amount: e.target.value
        })
    }

    render() {
        return (
            <div className="col-md-6 mx-auto">
                <h2>Add new transaction</h2>
                <ExpenseConsumer>
                    {(value => {
                        //console.log(value)
                        this.state = {
                            text: value.text,
                            amount: value.amount
                        }
                        return <form onSubmit={(e) => { value.submitNewExpense(e, this.state) }}  >
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Text</label>
                                <input type="text"
                                    onChange={(e) => { value.updateAddAndEditExpense(e, 'text') }}
                                    // onChange={this.handleChangeText}
                                    className="form-control"
                                    id="text"
                                    placeholder="expense text"
                                    // value={this.state.text} 
                                    value={value.text}
                                />

                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Amount</label><br />
                                <small>(negative expense, positive income)</small>
                                <input type="number"
                                    onChange={(e) => { value.updateAddAndEditExpense(e, 'amount') }}
                                    // onChange={this.handleChangeAmount}
                                    className="form-control"
                                    id="amount"
                                    placeholder="Enter amount"
                                    //value={this.state.amount}
                                    value={value.amount}
                                />
                            </div>

                            {/* <button type="submit" className="btn btn-primary btn-lg" onClick={(e) => { value.onEditSave(value.id) }}> {value.id ? 'Save' : 'Add Transaction'}</button> */}
                            <button type="submit" className="btn btn-primary mr-3 " onClick={(e) => { value.onEditSave(value.id) }} >Edit</button>
                            <button type="submit" className="btn btn-primary" >Add New Expense</button>
                        </form>

                    })}


                </ExpenseConsumer>
            </div>
        )
    }
}
