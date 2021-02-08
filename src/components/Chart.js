import React, { Component } from 'react';
import { ExpenseConsumer } from '../context';
import { Bar, Pie } from 'react-chartjs-2';

export default class Chart extends Component {
    // state = {
    //     chartData: {
    //         labels: ['Groceries', 'Savings', 'Shoe', 'Gift'],
    //         datasets: [
    //             {
    //                 label: 'Test',
    //                 data: [
    //                     10,
    //                     100,
    //                     40,
    //                     60
    //                 ],
    //                 backgroundColor: [
    //                     'rgba(255, 99, 132, 0.6)',
    //                     'rgba(54, 162, 235, 0.6)',
    //                     'rgba(255, 206, 86, 0.6)',
    //                     'rgba(75, 192, 192, 0.6)'
    //                 ]
    //             }
    //         ],

    //     }
    // }

    // state = {
    //     chartData: 
    // }
    render() {
        return (
            // <div className="chart">
            //     <Pie
            //         data={this.state.chartData}
            //         width={100}
            //         height={50}
            //         //options={{ maintainAspectRatio: false }}
            //         options={{}}
            //     />

            // </div>

            <div className="chart">
                <ExpenseConsumer>
                    {value => {
                        return <Pie
                            data={value.chartData}
                            width={100}
                            height={50}
                            //options={{ maintainAspectRatio: false }}
                            options={{}}
                        />
                    }}

                </ExpenseConsumer>
            </div>
        )
    }
}
