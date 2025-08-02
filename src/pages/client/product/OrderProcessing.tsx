"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Clock, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function OrderProcessing() {
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = "/";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleContinueShopping = () => {
    window.location.href = "/";
  };

  const progressValue = ((15 - countdown) / 15) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Đơn hàng đang được xử lí
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Cảm ơn bạn đã đặt hàng! Chúng tôi đang xử lý đơn hàng.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Processing Animation */}
          <div className="flex items-center justify-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
            </div>
          </div>

          {/* Countdown Section */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center space-x-2 text-gray-700">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-medium">
                Đang chuyển hướng đến trang chủ trong
              </span>
            </div>
            <div className="text-3xl font-bold text-blue-600">{countdown}s</div>
            <Progress value={progressValue} className="w-full h-2" />
          </div>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Mã đơn hàng:</span>
              <span className="font-medium">
                #ORD-{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Trạng thái:</span>
              <span className="font-medium text-blue-600">đang chờ xử lí</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Thời gian ước tính:</span>
              <span className="font-medium">2-3 phút</span>
            </div>
          </div>

          {/* Action Button */}
          <Button
            onClick={handleContinueShopping}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            size="lg"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Tiếp tục mua sắm
          </Button>

          {/* Additional Info */}
          <div className="text-center text-xs text-gray-500 space-y-1">
            <p>Bạn sẽ sớm nhận được email xác nhận.</p>
            <p>Cần trợ giúp? Liên hệ với nhóm hỗ trợ của chúng tôi.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
