"use client";

import type React from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  trend: {
    direction: "up" | "down";
    percentage: string;
  };
  icon: React.ReactNode;
  timeframe: string;
  bordered?: boolean;
  onTimeframeChange?: (value: string) => void; // ✅ callback khi đổi
}

export function KpiCard({
  title,
  value,
  trend,
  icon,
  timeframe,
  bordered = false,
  onTimeframeChange,
}: KpiCardProps) {
  return (
    <Card className={bordered ? "border-2 border-blue-400" : ""}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          {icon}
          <Select
            value={timeframe}
            onValueChange={onTimeframeChange} // ✅ gọi callback khi đổi
          >
            <SelectTrigger className="w-24 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="year">Year</SelectItem>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="day">Day</SelectItem>{" "}
              {/* ✅ thêm lựa chọn ngày */}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <div className="flex items-center space-x-2">
            {trend.direction === "up" ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
            <span
              className={`text-xs ${
                trend.direction === "up" ? "text-green-500" : "text-red-500"
              }`}
            >
              {trend.percentage}
            </span>
          </div>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
