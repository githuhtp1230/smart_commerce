
import { Package, ShoppingCart } from "lucide-react";
import { KpiCard } from "./kpi-card";
import { UserParticipationKpi } from "./UserParticipationKpi";
import { SaleReportChart } from "./sale-report-chart";
import { CategoriesChart } from "./categories-chart";
import { ProductsSoldKpi } from "./ProductsSoldKpi";
import { OrderTotalKpi } from "./OrderTotalKpi";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiCard
            title="Product revenue"
            value="199.999.000 đ"
            trend={{ direction: "up", percentage: "12.24%" }}
            icon={
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              </div>
            }
            timeframe="year"
            bordered
            onTimeframeChange={() => {}}
          />

          {/* ✅ dùng API */}
          <UserParticipationKpi />
          
          <ProductsSoldKpi />

          <OrderTotalKpi/>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SaleReportChart />
          <CategoriesChart />
        </div>
      </div>
    </div>
  );
}
