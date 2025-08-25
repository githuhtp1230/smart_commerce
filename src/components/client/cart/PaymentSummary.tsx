import PurchaseButton from "@/components/common/button/PurchaseButton";
import HandleAddressDialog from "@/components/common/dialog/HandleAddressDialog";
import PaymentsSelect from "@/components/common/select/PaymentsSelect";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/helper/format-price-vietnam";
import { checkout } from "@/services/checkout.service";
import { useAuthStore } from "@/store/auth-store";
import { useCartStore } from "@/store/cart-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { useAddress } from "../profile/profile-helper/use-address";
import { useTranslation } from "react-i18next";

const addressSchema = z.object({
  addressId: z.number().min(1, "Address is required"),
  paymentId: z.number().min(1, "Payment is required"),
});

const PaymentSummary: React.FC = () => {
  const [isOpenAddressDialog, setIsOpenAddressDialog] =
    useState<boolean>(false);
  const formPayment = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      paymentId: 0,
      addressId: 0,
    },
  });
  const { t } = useTranslation();
  const { me } = useAuthStore((s) => s);
  const { selectedAddressId, defaultAddr } = useAddress();

  useEffect(() => {
    const addressId = selectedAddressId();
    if (addressId) {
      formPayment.setValue("addressId", addressId);
    } else {
      formPayment.resetField("addressId");
    }
  }, [me]);

  const { cartItems, getItemTotalPrice, getSelectedItemTotalPrice } =
    useCartStore((s) => s);

  const { mutate } = useMutation({
    mutationFn: checkout,
    onSuccess: (data) => {
      window.location.href = data.data.payment.vnp_url;
    },
    onError: () => { },
  });

  const handleCheckout = () => {
    const cartItemIds = cartItems
      .filter((cartItem) => cartItem.isSelected)
      .map((cartItem) => cartItem.id);
    mutate({
      cartItemIds,
      addressId: 1,
      paymentId: 1,
    });
  };

  const onChangeAddress = (addressId: number) => {
    console.log(addressId);
    formPayment.setValue("addressId", addressId, {
      shouldValidate: true,
    });
  };

  return (
    <>
      <Card className="bg-primary shadow-none gap-3 rounded-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold ">{t("info")}</CardTitle>
        </CardHeader>
        <CardContent className="gap-0 space-y-0">
          <div className="flex flex-col">
            {cartItems
              .filter((item) => item.isSelected)
              .map((item, index) => (
                <div className="flex justify-between" key={index}>
                  <div className="flex gap-2">
                    <span className="">{item.product.name}</span>
                    <span className="text-muted-foreground">
                      x{item.quantity}
                    </span>
                  </div>
                  <span className="font-medium">
                    {formatPrice(getItemTotalPrice(item.id))}đ
                  </span>
                </div>
              ))}
          </div>
          <Separator className="my-4" />
          <Form {...formPayment}>
            <form
              onSubmit={formPayment.handleSubmit(handleCheckout)}
              className="space-y-3"
            >
              <FormField
                control={formPayment.control}
                name="addressId"
                render={() => (
                  <FormItem>
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <FormLabel className="text-base  font-normal">
                          {t("Address")}
                        </FormLabel>
                        {defaultAddr ? (
                          <p className="text-base font-medium mt-1">
                            {defaultAddr.streetAddress}, {defaultAddr.ward},{" "}
                            {defaultAddr.district}, {defaultAddr.province}
                          </p>
                        ) : (
                          <p className="text-base text-muted-foreground mt-1">
                            {t("Select address")}
                          </p>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setIsOpenAddressDialog(true)}
                        type="button"
                      >
                        {t("Change")}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={formPayment.control}
                name="paymentId"
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel className="text-base font-normal">
                      {t("payment_methods")}
                    </FormLabel>
                    <FormControl>
                      <PaymentsSelect
                        field={field}
                        hasError={!!formState.errors.paymentId}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-xl font-bold">{t("Total amount:")}</span>
                  <span className="text-xl font-bold">
                    {formatPrice(getSelectedItemTotalPrice())} đ
                  </span>
                </div>
              </div>

              <PurchaseButton
                variant="default"
                message={t("checkout")}
                className="w-full text-base"
                disabled={getSelectedItemTotalPrice() === 0}
                type="submit"
              />
            </form>
          </Form>
        </CardContent>
      </Card>

      <HandleAddressDialog
        isOpen={isOpenAddressDialog}
        onOpenChange={setIsOpenAddressDialog}
        onSelectedAddress={onChangeAddress}
      />
    </>
  );
};

export default PaymentSummary;
