import React, {useState} from 'react'
import "./Chart.css"
import data from '../../data';
import './Chart.css'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
  } from "chart.js";
  import { Line } from "react-chartjs-2";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
  );

function ProductLineChart() {
    const [revenueData] = useState({
        labels: data.revenueByMonths.labels,
        datasets: [
          {
            label:"chart of products",
            data: data.revenueByMonths.data,
            backgroundColor: "#32a7e1",
            borderColor: "#3498db",
          },
        ],
      });


    return (
        <div className='line-chart chart'>
            <Line
                data={revenueData}
                title={"summary of orders"}
            />
        </div>
    )
}

export default ProductLineChart