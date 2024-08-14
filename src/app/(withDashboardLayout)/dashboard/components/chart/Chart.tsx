"use client";

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js';
import { useGetAllFlatPostsAdminQuery } from '@/redux/api/flatApi';
import { useGetAllUserQuery } from '@/redux/api/userManagementApi';
import { useGetAllFlatRequestForAdminQuery } from '@/redux/api/flatRequest';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartComponent = () => {
  const { data: adminFlats, isLoading } = useGetAllFlatPostsAdminQuery({});
  const { data: allUsers, isLoading: userLoading } = useGetAllUserQuery({});
  const { data: flatRequest, isLoading: flatLoading } = useGetAllFlatRequestForAdminQuery({});

  if (isLoading || userLoading || flatLoading) {
    return <p></p>;
  }

  const data = {
    labels: ['Flats', 'Users', 'Flat Requests'],
    datasets: [
      {
        label: 'Total Count',
        data: [adminFlats?.length, allUsers?.length, flatRequest?.length],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4, // Adds some curvature to the line
      },
    ],
  };

  // Explicitly typing the options object
  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Overview of Flats, Users, and Requests',
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuad', // Using a valid easing value
    },
  };

  return <Line data={data} options={options} />;
};

export default ChartComponent;
