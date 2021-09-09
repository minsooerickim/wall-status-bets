import { Line } from 'react-chartjs-2'

export default function Chart({ chartData }) {
    return (
        <Line
            data = { chartData }
            options = {{
                scales: {
                    yAxes: {
                        beginAtZero: true,
                    }
                }
            }}
        />
    )
}

