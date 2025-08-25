"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Package } from "lucide-react"; // icon sản phẩm
import {
  fetchTotalProductsSold,
  type TotalStatisticResponse,
} from "@/services/statistics.service";
import { KpiCard } from "./kpi-card";

// UI label trực tiếp (không còn -ly)
const uiLabel: Record<"YEAR" | "MONTH" | "WEEK" | "DAY", string> = {
  YEAR: "year",
  MONTH: "month",
  WEEK: "week",
  DAY: "day",
};

export function ProductsSoldKpi() {
  const [category, setCategory] = React.useState<
    "YEAR" | "MONTH" | "WEEK" | "DAY"
  >("WEEK");

  const { data } = useQuery<TotalStatisticResponse, Error>({
    queryKey: ["totalProductsSold", category],
    queryFn: () => fetchTotalProductsSold({ category }),
    placeholderData: {
      total: 0, // ⚠️ có thể rename thành totalProducts để semantic hơn
      trendPercentage: "0%",
      trendDirection: "up",
    },
    staleTime: 5 * 1000,
  });

  const handleTimeframeChange = (value: string) => {
    const entry = Object.entries(uiLabel).find(([, v]) => v === value);
    if (entry) {
      setCategory(entry[0] as "YEAR" | "MONTH" | "WEEK" | "DAY");
    }
  };

  return (
    <KpiCard
      title="Total products sold"
      value={data?.total?.toString() ?? "0"} // ⚠️ ở đây cũng có thể đổi thành data?.totalProducts
      trend={{
        direction: data?.trendDirection ?? "up",
        percentage: data?.trendPercentage === "0%"? "NEW" : data?.trendPercentage ?? "0%",
      }}
      icon={
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <Package className="w-4 h-4 text-white" />
        </div>
      }
      timeframe={uiLabel[category]}
      bordered
      onTimeframeChange={handleTimeframeChange}
    />
  );
}
