import React, {useState, useEffect} from 'react'
import "./Chart.css"
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
    const [revenueData, setRevenueData] = useState({
        labels: [],
        datasets: [
          {
            label:"chart of products",
            data: [],
            backgroundColor: "#32a7e1",
            borderColor: "#3498db",
          },
        ],
      });
      useEffect(() => {
        fetch("http://localhost:8080/api/statistics/summaryByMonth?model=products",{
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
                label: "summary of products",
                data: data.data,
                backgroundColor: "#32a7e1",
                borderColor: "#3498db",
              },
            ],
          })
        })
      
        return () => {
          
        }
      }, [])


    return (
        <div className='line-chart chart'>
            <Line
                data={revenueData}
                title={"summary of products"}
            />
        </div>
    )
}

export default ProductLineChart