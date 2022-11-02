import React, {useState, useEffect} from 'react'
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

    const [revenueData, setRevenueData] = useState({
        labels: [],
        datasets: [
          {
            label: "summary of orders",
            data: [],
            backgroundColor: "#1abc9c",
          },
        ],
      });
      useEffect(() => {
        fetch("http://localhost:8080/api/statistics/summaryByMonth?model=orders",{
          headers:{
            "Content-Type":"application/json",
            "Authorization": localStorage.getItem("accessToken")
          }
        }).then(res => res.json())
        .then(data => {
          setRevenueData({
            labels: data.labels,
            datasets: [
              {
                label: "summary of orders",
                data: data.data,
                backgroundColor: "#1abc9c",
              },
            ],
          })
        })
      
        return () => {
          
        }
      }, [])
      


    return (
        <div className='chart'>
            <Bar
                data={revenueData}
            />
        </div>
    )
}

export default OrderBarChart