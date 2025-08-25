"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Users } from "lucide-react";
import {
  fetchTotalUserParticipation,
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

export function UserParticipationKpi() {
  const [category, setCategory] = React.useState<
    "YEAR" | "MONTH" | "WEEK" | "DAY"
  >("WEEK");

  const { data } = useQuery<TotalStatisticResponse, Error>({
    queryKey: ["totalUserParticipation", category],
    queryFn: () => fetchTotalUserParticipation({ category }),
    placeholderData: {
      totalUsers: 0,
      trendPercentage: "0%",
      trendDirection: "up",
    },
    staleTime: 5 * 1000,
  });

  const handleTimeframeChange = (value: string) => {
    // value nhận từ UI: "year" | "month" | "week" | "day"
    const entry = Object.entries(uiLabel).find(([, v]) => v === value);
    if (entry) {
      setCategory(entry[0] as "YEAR" | "MONTH" | "WEEK" | "DAY");
    }
  };

  return (
    <KpiCard
      title="Total users participating"
      value={data?.totalUsers?.toString() ?? "0"}
      trend={{
        direction: data?.trendDirection ?? "up",
        percentage: data?.trendPercentage ?? "0%",
      }}
      icon={
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <Users className="w-4 h-4 text-white" />
        </div>
      }
      timeframe={uiLabel[category]} // hiển thị year | month | week | day
      bordered
      onTimeframeChange={handleTimeframeChange}
    />
  );
}
