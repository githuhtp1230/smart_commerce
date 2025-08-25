import { Package, ShoppingCart } from "lucide-react";
import { KpiCard } from "./kpi-card";
import { UserParticipationKpi } from "./UserParticipationKpi";
import { SaleReportChart } from "./sale-report-chart";
import { CategoriesChart } from "./categories-chart";
import TableReviews from "../Review/TableReviews";
import { ProductParticipationKpi } from "./ProductParticipationKpi";
import { ProductsSoldKpi } from "./ProductsSoldKpi";
import { OrderTotalKpi } from "./OrderTotalKpi";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductParticipationKpi />

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
      <div>
        <TableReviews />
      </div>
    </div>
  );
}
