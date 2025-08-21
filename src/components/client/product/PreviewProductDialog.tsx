import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Tag, Percent, FileText, Star, MessageCircle, Gift } from "lucide-react";
import { formatTimeDay } from "@/helper/format-time-day";
import type { IProductSummary } from "@/type/products";

interface PreviewProductDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    product: IProductSummary | null;
}

const PreviewProductDialog = ({
    open,
    onOpenChange,
    product,
}: PreviewProductDialogProps) => {
    if (!product) return null;

    return (
        <>
            {/* Preview Dialog */}
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-w-xl max-h-[90vh] overflow-auto scrollbar-hide rounded-2xl p-6 space-y-6">
                    {/* Header */}
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold tracking-tight">
                            Product #{product.id}
                        </DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground">
                            Xem thông tin chi tiết về sản phẩm
                        </DialogDescription>
                    </DialogHeader>

                    {/* Image */}
                    <div className="space-y-2">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full max-h-64 object-contain rounded-lg border p-1 mx-auto"
                        />
                    </div>

                    {/* Status */}
                    <div className="flex justify-between items-center border rounded-lg p-3 bg-muted/30">
                        <span className="text-sm font-medium text-muted-foreground">
                            Trạng thái
                        </span>
                        <Badge
                            className={`flex items-center gap-2 px-3 py-1 rounded-full ${product.is_deleted === 0
                                ? "bg-green-100 text-green-700 hover:bg-green-200"
                                : "bg-red-100 text-red-700 hover:bg-red-200"
                                }`}
                        >
                            <span
                                className={`w-2 h-2 rounded-full ${product.is_deleted === 0 ? "bg-green-600" : "bg-red-600"
                                    }`}
                            />
                            {product.is_deleted === 0 ? "Active" : "Inactive"}
                        </Badge>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <FileText className="w-4 h-4" />
                            <span>Product Name</span>
                        </div>
                        <p className="text-base leading-relaxed bg-muted/40 p-3 rounded-lg border">
                            {product.name}
                        </p>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Price */}
                        <div className="p-3 rounded-lg border bg-card shadow-sm">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Tag className="w-4 h-4" />
                                Price
                            </div>
                            <p className="font-medium mt-1">{(product.price ?? 0).toLocaleString()}₫</p>
                        </div>

                        {/* Max Price */}
                        <div className="p-3 rounded-lg border bg-card shadow-sm">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Percent className="w-4 h-4" />
                                Max Price
                            </div>
                            <p className="font-medium mt-1">
                                {(product.maxPrice ?? product.price ?? 0).toLocaleString()}₫
                            </p>
                        </div>

                        {/* Created Date */}
                        <div className="p-3 rounded-lg border bg-card shadow-sm">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                Created At
                            </div>
                            <p className="font-medium mt-1">{formatTimeDay(product.createdAt)}</p>
                        </div>

                        {/* Category */}
                        <div className="p-3 rounded-lg border bg-card shadow-sm">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Tag className="w-4 h-4" />
                                Category
                            </div>
                            <p className="font-medium mt-1">{product.category?.name}</p>
                        </div>

                        {/* Review Count */}
                        <div className="p-3 rounded-lg border bg-card shadow-sm">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MessageCircle className="w-4 h-4" />
                                Review Count
                            </div>
                            <p className="font-medium mt-1">{product.reviewCount}</p>
                        </div>

                        {/* Average Rating */}
                        <div className="p-3 rounded-lg border bg-card shadow-sm">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Star className="w-4 h-4" />
                                Average Rating
                            </div>
                            <p className="font-medium mt-1">{product.averageRating}</p>
                        </div>

                        {/* Promotion */}
                        {product.promotion && (
                            <div className="p-3 rounded-lg border bg-card shadow-sm col-span-2">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Gift className="w-4 h-4" />
                                    Promotion
                                </div>
                                <p className="font-medium mt-1">{product.promotion.description}</p>
                                <p className="text-sm text-muted-foreground">
                                    Discount: {product.promotion.discountValuePercent}%
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    From: {formatTimeDay(product.promotion.startDate)} To:{" "}
                                    {formatTimeDay(product.promotion.endDate)}
                                </p>
                                <Badge
                                    className={`mt-2 ${product.promotion.isActive
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    <span
                                        className={`w-2 h-2 rounded-full ${product.promotion.isActive === true ? "bg-green-600" : "bg-red-600"
                                            }`}
                                    />
                                    {product.promotion.isActive ? "Active" : "Inactive"}
                                </Badge>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <DialogFooter className="flex justify-end gap-3 pt-4 border-t">
                        <Button variant="outline" onClick={() => onOpenChange(false)}>
                            Close Preview
                        </Button>
                        <Button
                            onClick={() => {
                                onOpenChange(false);
                            }}
                            className="bg-blue-500 text-white hover:text-white hover:bg-blue-600"
                        >
                            Edit Product
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default PreviewProductDialog;
