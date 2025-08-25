"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

const categoryData = [
  { name: "Phone", value: 71546033.4, color: "#3b82f6" },
  { name: "PC & Laptop", value: 55661751.4, color: "#10b981" },
  { name: "Cameras", value: 41597019.4, color: "#f59e0b" },
  { name: "Audio equipment", value: 23586266.4, color: "#8b5cf6" },
  { name: "Accessory", value: 7607931.0, color: "#ef4444" },
]

export function CategoriesChart() {
  const chartData = {
    labels: categoryData.map((item) => item.name),
    datasets: [
      {
        data: categoryData.map((item) => item.value),
        backgroundColor: categoryData.map((item) => item.color),
        borderWidth: 0,
        cutout: "60%",
      },
    ],
  }

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
            `${context.label}: ${context.parsed.toLocaleString("vi-VN", { minimumFractionDigits: 1 })} đ`,
        },
      },
    },
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Categories By Sales</CardTitle>
        <button className="text-muted-foreground hover:text-foreground">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative h-48">
            <Doughnut data={chartData} options={options} />
          </div>

          <div className="space-y-3">
            {categoryData.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                  <span className="text-sm text-muted-foreground">{category.name}</span>
                </div>
                <span className="text-sm font-medium">
                  {category.value.toLocaleString("vi-VN", { minimumFractionDigits: 1 })} đ
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t">
            <div className="text-center">
              <p className="text-2xl font-bold">199.999.000 đ</p>
              <p className="text-sm text-muted-foreground">Total earned</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
