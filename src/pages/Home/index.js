import React, { useEffect } from "react";
import styled from 'styled-components'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Header } from "semantic-ui-react";
import { searchNotCheckedMemos } from "../../db/api";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
            position: 'top',
        },
        title: {
            text: 'Chart.js Line Chart',
        },
    },
};

const displayDate = (date = new Date()) =>
    date.getDate() + '.' + (+date.getMonth() + 1)

const now = new Date()
const labels = [
    // displayDate(new Date(new Date().setDate(now.getDate()-6))),
    displayDate(new Date(new Date().setDate(now.getDate() - 5))),
    displayDate(new Date(new Date().setDate(now.getDate() - 4))),
    displayDate(new Date(new Date().setDate(now.getDate() - 3))),
    displayDate(new Date(new Date().setDate(now.getDate() - 2))),
    displayDate(new Date(new Date().setDate(now.getDate() - 1))),
    displayDate(new Date(new Date().setDate(now.getDate()))),
    // displayDate(new Date().setDate(now.getDay() - 1))
];

export const data = {
    labels,
    datasets: [
        {
            label: 'Created memos',
            data: [4, 6, 6, 7, 9, 10],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
    ],
};

const Wrapper = styled.div`
    width: calc(50% + 500px);
    margin-left: auto;
    margin-right: auto;
    min-height: 90vh;
    padding-top: 3em;
`

const Home = () => {
    return (
        <Wrapper>
            <div style={{ width: '50%' }}>
                <Header
                    as={'h2'}
                    style={{ marginLeft: '1.5em' }}
                    content={
                        <p>On that month <u>42</u> memos were created</p>
                    } />
                <Line options={options} data={data} />
            </div>
        </Wrapper>
    )
}

export default Home