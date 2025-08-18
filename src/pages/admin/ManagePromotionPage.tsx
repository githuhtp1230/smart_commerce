"use client";

import AddPromotions from "@/components/admin/promotion/AddPromotions";
import PromotionsTable from "@/components/admin/promotion/PromotionsTable";
import { fetchPromotions } from "@/services/promotions.service";
import type { IPromotion } from "@/type/promotion";
import { useEffect, useState } from "react";

export default function ManagePromotionPage() {
  const [promotions, setPromotions] = useState<IPromotion[]>([]);
  const [loading, setLoading] = useState(false);

  const loadPromotions = async () => {
    try {
      setLoading(true);
      // Không filter, lấy tất cả khuyến mãi
      const data = await fetchPromotions({});
      setPromotions(data);
    } catch (error) {
      console.error("Lỗi khi lấy khuyến mãi:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPromotions();
  }, []);

  return (
    <div>
      <div>
        <AddPromotions onSuccess={loadPromotions} />
      </div>

      <div className="mt-4">
        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : (
          <PromotionsTable promotions={promotions} />
        )}
      </div>
    </div>
  );
}
