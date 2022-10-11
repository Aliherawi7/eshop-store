import React, {useState} from 'react'
import { Bar} from 'react-chartjs-2'
import data from '../../data';
import './Chart.css'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
);


function OrderBarChart() {
    const [revenueData] = useState({
        labels: data.revenueByMonths.labels,
        datasets: [
          {
            label: "summary of orders",
            data: data.revenueByMonths.data,
            backgroundColor: "#1abc9c",
          },
        ],
      });


    return (
        <div className='chart'>
            <Bar
                data={revenueData}
            />
        </div>
    )
}

export default OrderBarChart