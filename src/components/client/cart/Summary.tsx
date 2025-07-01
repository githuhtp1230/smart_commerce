import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";


type SummaryProps = {
    subtotal: number;
    discount: number;
    tax: number;
    shippingCost: number;
    total: number;
};


const Summary: React.FC<SummaryProps> = ({
    subtotal,
    discount,
    tax,
    shippingCost,
    total,
}) => {
    return (
        <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-2xl font-bold text-foreground">Summary</CardTitle>
                <Button variant="link" className="text-txt-violet-soft p-0 h-auto">
                    Edit cart
                </Button>
            </CardHeader>
            <CardContent className="space-y-6">
                <Select defaultValue="cash">
                    <SelectTrigger className="w-full border-border-quarternary text-foreground">
                        <SelectValue placeholder="Cash on Delivery" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="cash">Cash on Delivery</SelectItem>
                        <SelectItem value="card">Credit Card</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                    </SelectContent>
                </Select>

                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-txt-secondary">Items subtotal:</span>
                        <span className="font-medium">${subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-txt-secondary">Discount:</span>
                        <span className="font-medium text-txt-danger-soft">-${discount}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-txt-secondary">Tax:</span>
                        <span className="font-medium">${tax}</span>
                    </div>
                    <div className="flex justify-between border-t pt-3 border-border-primary">
                        <span className="text-txt-secondary">Subtotal:</span>
                        <span className="font-medium">${subtotal - discount + tax}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-txt-secondary">Shipping Cost:</span>
                        <span className="font-medium">${shippingCost}</span>
                    </div>
                </div>

                <div className="flex">
                    <Input
                        placeholder="Voucher"
                        className="border border-border-primary rounded-l-md rounded-r-none"
                    />
                    <Button className="border border-l-0 border-border-primary background-secondary hover:bg-background text-txt-violet-soft rounded-r-md">
                        Apply
                    </Button>
                </div>

                <div className="pt-4 border-t border-border-primary">
                    <div className="flex justify-between">
                        <span className="text-xl font-bold">Total:</span>
                        <span className="text-xl font-bold">${total.toFixed(2)}</span>
                    </div>
                </div>

                <Button className="w-full bg-background-primary hover:bg-background-deepprimary text-white">
                    Proceed to check out <i className="fas fa-arrow-right ml-2 text-white"></i>
                </Button>
            </CardContent>
        </Card>
    );
};

export default Summary;
