"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { KpiCard } from "./kpi-card";
import {
  fetchProductRevenueStatistic,
  type TotalStatisticResponse,
  type TotalStatisticRequest,
} from "@/services/statistics.service";
import { formatPercentage } from "@/helper/format-percentage";

const uiLabel: Record<"YEAR" | "MONTH" | "WEEK" | "DAY", string> = {
  YEAR: "year",
  MONTH: "month",
  WEEK: "week",
  DAY: "day",
};

export function ProductParticipationKpi() {
  const [category, setCategory] =
    React.useState<TotalStatisticRequest["category"]>("YEAR");

  const { data } = useQuery<TotalStatisticResponse, Error>({
    queryKey: ["productRevenue", category],
    queryFn: () => fetchProductRevenueStatistic({ category }),
    placeholderData: {
      total: 0,
      trendPercentage: "0%",
      trendDirection: "up",
    },
    staleTime: 5 * 1000,
  });

  const handleTimeframeChange = (value: string) => {
    const entry = Object.entries(uiLabel).find(([, v]) => v === value);
    if (entry) setCategory(entry[0] as TotalStatisticRequest["category"]);
  };

  return (
    <KpiCard
      title="Product revenue"
      value={`${data?.total.toLocaleString() ?? 0} đ`}
      trend={{
        direction: data?.trendDirection ?? "up",
        percentage: formatPercentage(data?.trendPercentage, 0), // <-- dùng helper
      }}
      icon={
        <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
        </div>
      }
      timeframe={uiLabel[category]}
      bordered
      onTimeframeChange={handleTimeframeChange}
    />
  );
}
