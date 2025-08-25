"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const saleData = [
  { month: "January", revenue: -600000000, products: -400000000 },
  { month: "February", revenue: -500000000, products: -450000000 },
  { month: "March", revenue: 400000000, products: -300000000 },
  { month: "April", revenue: -900000000, products: -500000000 },
  { month: "May", revenue: 600000000, products: -200000000 },
  { month: "June", revenue: -300000000, products: -400000000 },
  { month: "July", revenue: 200000000, products: -450000000 },
];

export function SaleReportChart() {
  const chartData = {
    labels: saleData.map((item) => item.month),
    datasets: [
      {
        label: "Revenue",
        data: saleData.map((item) => item.revenue),
        borderColor: "#ef4444",
        backgroundColor: "#ef4444",
        borderWidth: 3,
        pointBackgroundColor: "#ef4444",
        pointBorderColor: "#ef4444",
        pointRadius: 4,
        pointBorderWidth: 2,
        tension: 0.4,
      },
      {
        label: "Products sold",
        data: saleData.map((item) => item.products),
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
        borderWidth: 3,
        pointBackgroundColor: "#3b82f6",
        pointBorderColor: "#3b82f6",
        pointRadius: 4,
        pointBorderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) =>
            `${context.dataset.label}: ${(context.parsed.y / 1000000).toFixed(
              0
            )}M`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: "#f0f0f0",
          drawBorder: false,
        },
        ticks: {
          color: "#666",
          font: {
            size: 12,
          },
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
          color: "#f0f0f0",
          drawBorder: false,
        },
        ticks: {
          color: "#666",
          font: {
            size: 12,
          },
          callback: (value: any) => `${value / 1000000}M`,
        },
        border: {
          display: false,
        },
      },
    },
  };

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Sale Report</CardTitle>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-sm text-muted-foreground">Revenue</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-sm text-muted-foreground">
                Products sold
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <Line data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}
