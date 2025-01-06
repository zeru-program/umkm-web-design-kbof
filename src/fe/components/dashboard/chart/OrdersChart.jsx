import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import dayjs from 'dayjs';
import OrdersGet from '../../../../be/get/OrdersGet';

// Register komponen Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const today = dayjs().format("YYYY-MM-DD");

const OrdersChart = () => {
  const { dataOrders } = OrdersGet()
  // sorting data by month
  const filteredData = dataOrders.filter(item =>
    dayjs(item.created_at).year() === 2024
  );
  
  // Hitung jumlah data per bulan
  const monthlyData = filteredData.reduce((acc, item) => {
    const month = dayjs(item.created_at).month(); // 0 = January, 11 = December
    // console.log(acc[month] = (acc[month] || 0) + 1)
    acc[month] = (acc[month] || 0) + 1; // Tambahkan jumlah per bulan
    return acc;
  }, {});

  // Buat array jumlah data untuk setiap bulan (0-11)
  const dataCounts = Array.from({ length: 12 }, (_, i) => monthlyData[i] || 0);


  // Data untuk chart
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'Mei', 'Juny', 'July', 'Agustus', 'September', 'November', 'December'],
    datasets: [
      {
        label: 'Sales',
        data: dataCounts,
        backgroundColor: '#496653',
        borderColor: '#496653',
        borderWidth: 1,
      },
    ],
  };

  // Opsi konfigurasi chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Orders Data (2024)',
      },
    },
  };

  return <Bar data={data} responsive="true" options={options} />;
};

export default OrdersChart;
