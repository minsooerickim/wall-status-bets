import { Doughnut } from 'react-chartjs-2'

export default function Chart({ chartData }) {
    return (
        <Doughnut
            data = { chartData }
            options = {{
                maintainAspectRatio: false,
            }}
            // options = {
            //     responsive = true,
            //     plugins = {
            //         legend: {
            //             position: 'top',
            //         },
            //         title: {
            //             display: true,
            //             text: "# of Mentions"
            //         }
            //     }
            // }
        />
    )
}

