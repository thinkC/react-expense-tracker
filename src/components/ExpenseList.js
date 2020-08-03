// import React, { Component } from 'react';
// import { ExpenseConsumer } from '../context';
// import ExpenseItems from './ExpenseItems';

// export default class ExpenseList extends Component {
//     render() {
//         return (
//             <React.Fragment>
//                 <div className="col-md-6 mx-auto">
//                     <h2>History</h2>
//                     <div className="expense-list">
//                         <ul>
//                             <ExpenseConsumer>
//                                 {value => {
//                                     // console.log(value.expenses[0].id)
//                                     // if (value.expenses[0].id && ) { //create a func that loops and find text ===''
//                                     //     console.log(value.removeExtra)
//                                     //     let aa = value.removeExtra(value.expenses)
//                                     //     console.log(aa)
//                                     //     value.expenses.map((expense) => {
//                                     //         return <ExpenseItems key={expense.id} expense={expense} />
//                                     //     })
//                                     // }
//                                     //console.log(value)
//                                     return value.expenses.map((expense) => {
//                                         return <ExpenseItems key={expense.id} expense={expense} />
//                                     })
//                                 }}
//                             </ExpenseConsumer>
//                         </ul>
//                     </div>
//                 </div>
//             </React.Fragment>
//         )
//     }
// }




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

                                    const checkArrWithEmptyValue = (arr) => {
                                        for (let i = 0; i < arr.length; ++i) {
                                            console.log(arr[i])
                                            if (arr[i].text === '') {
                                                return true;
                                            }
                                            console.log(arr[i])
                                        }

                                        return false;
                                    }

                                    if (checkArrWithEmptyValue(value.expenses) === true) {
                                        console.log(value.expenses)
                                        console.log(value.removeExtra)

                                        //returns array with empty value
                                        let arrayWithoutEmptyValue = value.removeExtra(value.expenses)
                                        console.log(arrayWithoutEmptyValue)
                                        return arrayWithoutEmptyValue.map((expense) => {
                                            return <ExpenseItems key={expense.id} expense={expense} />
                                        })
                                    }
                                    else {
                                        //console.log(value)
                                        return value.expenses.map((expense) => {
                                            return <ExpenseItems key={expense.id} expense={expense} />
                                        })

                                    }



                                }}
                            </ExpenseConsumer>
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
