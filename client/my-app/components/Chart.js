import React from 'react';
import { Line } from 'react-chartjs-2'

const data = { 
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    datasets: [
        {
            labels: '# of Mentions',
            data: [20],
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
        },
    ],
};

const options = {
    scales: {
        yAxes: {
            beginAtZero: true,
        }
    }
}

export default function Chart() {
    return(
        <>
            <div>
                <h1>Chart</h1>
                <Line data={data} options={options}/>
            </div>
        </>
    )
}