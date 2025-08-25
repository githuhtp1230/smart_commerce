import { Package, ShoppingCart } from "lucide-react";
import { KpiCard } from "./kpi-card";
import { UserParticipationKpi } from "./UserParticipationKpi";
import { SaleReportChart } from "./sale-report-chart";
import { CategoriesChart } from "./categories-chart";
import TableReviews from "../Review/TableReviews";
import { ProductParticipationKpi } from "./ProductParticipationKpi";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductParticipationKpi />

          {/* ✅ dùng API */}
          <UserParticipationKpi />

          <KpiCard
            title="Total products sold"
            value="250"
            trend={{ direction: "up", percentage: "12.24%" }}
            icon={
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Package className="w-4 h-4 text-white" />
              </div>
            }
            timeframe="month"
            onTimeframeChange={() => {}}
          />

          <KpiCard
            title="Total orders"
            value="182"
            trend={{ direction: "up", percentage: "25%" }}
            icon={
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 text-white" />
              </div>
            }
            timeframe="week"
            onTimeframeChange={() => {}}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SaleReportChart />
          <CategoriesChart />
        </div>
      </div>
      <div>
        <TableReviews />
      </div>
    </div>
  );
}
