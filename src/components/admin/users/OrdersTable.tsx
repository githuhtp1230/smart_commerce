"use client";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchOrdersByUser, type OrderItem } from "@/services/order.service";

interface Props {
  userId: number;
}

export default function OrdersTable({ userId }: Props) {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      const data = await fetchOrdersByUser(userId);
      setOrders(data);
      setLoading(false);
    };

    if (userId) {
      loadOrders();
    }
  }, [userId]);

  if (loading) return <p>Loading orders...</p>;
  if (!orders.length) return <p>No orders found for this user.</p>;

  return (
    <div className="mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Delivery Method</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>#{order.id}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{order.deliveryMethod}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>${order.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
