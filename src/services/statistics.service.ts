import httpRequest from "@/utils/http-request";

export interface TotalStatisticRequest {
  category: "DAY" | "WEEK" | "MONTH" | "YEAR"; // khớp backend luôn
}

export interface TotalStatisticResponse {
  totalUsers: number;
  trendPercentage: string;
  trendDirection: "up" | "down";
}

export const fetchTotalUserParticipation = async (
  request: TotalStatisticRequest
): Promise<TotalStatisticResponse> => {
  try {
    const res = await httpRequest.post("/statistics/user-participation", {
      category: request.category, // gửi thẳng luôn
    });

    const json = res.data;

    return {
      totalUsers: json.data.total,
      trendPercentage: `${json.data.percentVariation}%`,
      trendDirection: json.data.percentVariation >= 0 ? "up" : "down",
    };
  } catch (error) {
    console.error("Error fetching user participation:", error);
    throw new Error("Failed to fetch statistics");
  }
};
export const fetchTotalProductsSold = async (
  request: TotalStatisticRequest
): Promise<TotalStatisticResponse> => {
  try {
    const res = await httpRequest.post("/statistics/products-sold", {
      category: request.category,
    });

    const json = res.data;

    return {
      totalUsers: json.data.total,
      trendPercentage: `${json.data.percentVariation}%`,
      trendDirection: json.data.percentVariation >= 0 ? "up" : "down",
    };
  } catch (error) {
    console.error("Error fetching products sold:", error);
    throw new Error("Failed to fetch products sold statistics");
  }
  
};

export const fetchTotalOrder = async (
  request: TotalStatisticRequest
): Promise<TotalStatisticResponse> => {
  try {
    const res = await httpRequest.post("/statistics/order-total", {
      category: request.category,
    });

    const json = res.data;

    return {
      totalUsers: json.data.total,
      trendPercentage: `${json.data.percentVariation}%`,
      trendDirection: json.data.percentVariation >= 0 ? "up" : "down",
    };
  } catch (error) {
    console.error("Error fetching order total:", error);
    throw new Error("Failed to fetch order total statistics");
  }
  
};
