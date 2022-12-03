import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    ArcElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Doughnut,Bar } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    ArcElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function Charts(props) {
    const chartData=props.chartData;
    return (
        <div className={"charts-div"}>
            <div className={"gender-chart"}>
                <div>
                    <span style={{color:"rgba(54, 162, 235, 1)"}}>남자 : {Number(chartData.male/chartData.tot).toFixed(2)*100}%</span>
                    <span style={{color:"rgba(255, 99, 132, 1)",float:"right"}}>여자 : {Number(chartData.female/chartData.tot).toFixed(2)*100}%</span>
                </div>
                <Doughnut data={props.genderData} options={props.option}/>
            </div>
            <div className={"age-chart"}>
                <Bar data={props.ageData}/>
                <div>
                    <span style={{marginLeft:"50px",color:"rgba(255, 99, 132, 1)"}}>{Number(chartData.age10/chartData.tot).toFixed(3)*100}%</span>
                    <span style={{marginLeft:"55px",color:"rgba(54, 162, 235, 1)"}}>{Number(chartData.age20/chartData.tot).toFixed(3)*100}%</span>
                    <span style={{marginLeft:"48px",color:"rgba(255, 206, 86, 1)"}}>{Number(chartData.age30/chartData.tot).toFixed(3)*100}%</span>
                    <span style={{marginLeft:"53px",color:"rgba(75, 192, 192, 1)"}}>{Number(chartData.age40/chartData.tot).toFixed(3)*100}%</span>
                    <span style={{marginLeft:"57px",color:"rgba(153, 102, 255, 1)"}}>{Number(chartData.age50/chartData.tot).toFixed(3)*100}%</span>
                    <span style={{marginLeft:"57px",color:"rgba(255, 159, 64, 1)"}}>{Number(chartData.age/chartData.tot).toFixed(3)*100}%</span>
                </div>
            </div>
        </div>
    );
}

export default Charts;