// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tooltip } from "@/components/ui/tooltip";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Clock5,
  Ellipsis,
  Info,
  ShoppingCart,
  X,
} from "lucide-react";
interface Order {
  id: string;
  status: {
    label: string;
    type:
      | "shipped"
      | "ready"
      | "partially"
      | "canceled"
      | "fulfilled"
      | "unfulfilled";
  };
  deliveryMethod: string;
  date: string;
  total: string;
}
const HistoryOrder: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const allOrders: Order[] = [
    // Page 1
    {
      id: "2453",
      status: { label: "SHIPPED", type: "shipped" },
      deliveryMethod: "Cash on delivery",
      date: "Dec 12, 12:56 PM",
      total: "$87",
    },
    {
      id: "2452",
      status: { label: "READY TO PICKUP", type: "ready" },
      deliveryMethod: "Free shipping",
      date: "Dec 9, 2:28PM",
      total: "$7,264",
    },
    {
      id: "2451",
      status: { label: "PARTIALLY FULFILLED", type: "partially" },
      deliveryMethod: "Local pickup",
      date: "Dec 4, 12:56 PM",
      total: "$375",
    },
    {
      id: "2450",
      status: { label: "CANCELED", type: "canceled" },
      deliveryMethod: "Standard shipping",
      date: "Dec 1, 4:07 AM",
      total: "$657",
    },
    {
      id: "2449",
      status: { label: "FULFILLED", type: "fulfilled" },
      deliveryMethod: "Express",
      date: "Nov 28, 7:28 PM",
      total: "$9,562",
    },
    {
      id: "2448",
      status: { label: "UNFULFILLED", type: "unfulfilled" },
      deliveryMethod: "Local delivery",
      date: "Nov 24, 10:16 AM",
      total: "$256",
    },
    // Page 2
    {
      id: "2447",
      status: { label: "SHIPPED", type: "shipped" },
      deliveryMethod: "Express",
      date: "Nov 20, 3:45 PM",
      total: "$432",
    },
    {
      id: "2446",
      status: { label: "READY TO PICKUP", type: "ready" },
      deliveryMethod: "Local pickup",
      date: "Nov 18, 1:30 PM",
      total: "$892",
    },
    {
      id: "2445",
      status: { label: "FULFILLED", type: "fulfilled" },
      deliveryMethod: "Standard shipping",
      date: "Nov 15, 9:20 AM",
      total: "$1,243",
    },
  ];
  const ordersPerPage = 6;
  const orders = allOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );
  const totalOrders = allOrders.length;
  const getStatusBadge = (status: Order["status"]) => {
    const statusStyles = {
      shipped: "bg-green-100 text-green-800 border-green-200",
      ready: "bg-blue-100 text-blue-800 border-blue-200",
      partially: "bg-yellow-100 text-yellow-800 border-yellow-200",
      canceled: "bg-background-darkgray text-txt-zinc-black border-gray-200",
      fulfilled: "bg-green-100 text-green-800 border-green-200",
      unfulfilled: "bg-red-100 text-red-800 border-red-200",
    };
    const statusIcons = {
      shipped: <Check className="mr-1 text-green-800" />,
      ready: <Info className="mr-1 text-blue-800" />,
      partially: <Clock5 className="mr-1 text-yellow-800" />,
      canceled: <X className="mr-1 text-txt-zinc-black" />,
      fulfilled: <Check className="mr-1 text-green-800" />,
      unfulfilled: <Check className="mr-1 text-red-800" />,
    };
    return (
      <Badge
        className={`font-medium text-xs px-2 py-1 rounded-sm ${
          statusStyles[status.type]
        } whitespace-nowrap`}
      >
        {statusIcons[status.type]} {status.label}
      </Badge>
    );
  };
  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Navigation Tabs */}
      <div className="flex items-center overflow-x-auto mb-4">
        <h2 className="text-txt-blue font-medium flex items-center gap-2 ">
          <ShoppingCart />
          Orders (35)
        </h2>
      </div>
      {/* Orders Table */}
      <div className="overflow-x-auto">
        <Table className="w-full border-t border-b ">
          <TableHeader>
            <TableRow>
              <TableHead className="text-txt-zinc-black font-semibold text-sm">
                ORDER
              </TableHead>
              <TableHead className="text-txt-zinc-black font-semibold text-sm">
                STATUS
              </TableHead>
              <TableHead className="text-txt-zinc-black font-semibold text-sm">
                DELIVERY METHOD
              </TableHead>
              <TableHead className="text-txt-zinc-black font-semibold text-sm text-right">
                DATE
              </TableHead>
              <TableHead className="text-txt-zinc-black font-semibold text-sm text-right">
                TOTAL
              </TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="py-4">
                  <a
                    href={`#${order.id}`}
                    className="text-blue-500 hover:underline font-medium"
                  >
                    #{order.id}
                  </a>
                </TableCell>
                <TableCell>
                  {order.status.type === "ready" ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          {getStatusBadge(order.status)}
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">Order is ready for pickup</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    getStatusBadge(order.status)
                  )}
                </TableCell>
                <TableCell className="text-txt-zinc-black">
                  {order.deliveryMethod}
                </TableCell>
                <TableCell className="text-txt-zinc-black text-right">
                  {order.date}
                </TableCell>
                <TableCell className="text-txt-zinc-black font-bold text-right">
                  {order.total}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 !rounded-button cursor-pointer"
                  >
                    <Ellipsis className="text-gray-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-600">
          {`${(currentPage - 1) * ordersPerPage + 1} to ${Math.min(
            currentPage * ordersPerPage,
            totalOrders
          )} items of ${totalOrders}`}
          <Button
            variant="link"
            className="text-blue-500 font-medium ml-2 p-0 h-auto !rounded-button whitespace-nowrap"
          >
            View all <i className="fas fa-chevron-right text-xs ml-1"></i>
          </Button>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-500 !rounded-button cursor-pointer"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`h-8 w-8 ${
              currentPage === 1 ? "bg-blue-500 text-white" : "text-gray-700"
            } !rounded-button cursor-pointer whitespace-nowrap`}
            onClick={() => setCurrentPage(1)}
          >
            1
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`h-8 w-8 ${
              currentPage === 2 ? "bg-blue-500 text-white" : "text-gray-700"
            } !rounded-button cursor-pointer whitespace-nowrap`}
            onClick={() => setCurrentPage(2)}
          >
            2
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-500 !rounded-button cursor-pointer"
            disabled={currentPage * ordersPerPage >= totalOrders}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default HistoryOrder;
