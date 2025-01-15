import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import dayjs from "dayjs";
import OrdersGet from "../../../../be/get/OrdersGet";
import ProductsGet from "../../../../be/get/ProductsGet";

// Register komponen Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const today = dayjs().format("YYYY-MM-DD");

const ProductsChart = () => {
  const { dataOrders } = OrdersGet();
  const { dataProducts } = ProductsGet();
  // sorting data by month
  const filteredData = dataProducts.filter(
    (item) => dayjs(item.created_at).year() === 2024
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
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "Mei",
      "Juny",
      "July",
      "Agustus",
      "September",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Products",
        data: dataCounts,
        backgroundColor: "#496653",
        borderColor: "#496653",
        borderWidth: 1,
      },
    ],
  };

  // Opsi konfigurasi chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Products Data (2024)",
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ProductsChart;
