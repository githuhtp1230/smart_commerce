import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useAuthStore } from "@/store/auth-store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/services/me.service";
import { getMyAddresses, createAddress } from "@/services/address.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toastError } from "@/components/common/sonner";
import AddressSelector from "./AddressSelector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAdministrativeAddress } from "./useAdministrativeAddress";
 

interface ContactInfo {
  address: string;
  email: string;
  phone: string;
}

const phoneSchema = z.object({
  phone: z.string().regex(/^0(3|5|7|8|9)\d{8}$/, {
    message: "Invalid phone number.",
  }),
});

const addressSchema = z.object({
  streetAddress: z.string().min(1, "streetAddress is required"),
  ward: z.string().min(1, "Ward is required"),
  district: z.string().min(1, "District is required"),
  province: z.string().min(1, "Province is required"),
});

const RightUserProfile: React.FC = () => {
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
  const { me, setMe } = useAuthStore((state) => state);
  const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    address: "Vancouver, British Columbia\nCanada",
    email: me?.email || "",
    phone: me?.phone || "",
  });

  const formPhone = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: me?.phone || "",
    },
  });

  const formAddress = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      streetAddress: "",
      ward: "",
      district: "",
      province: "",
    },
  });

  const fieldLabels: Record<
    "streetAddress" | "ward" | "district" | "province",
    string
  > = {
    streetAddress: "Số nhà, tên đường",
    ward: "Phường/Xã",
    district: "Quận/Huyện",
    province: "Tỉnh/Thành phố",
  };

  const { mutate: updatePhone, isPending: isPhonePending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      setContactInfo((prev) => ({ ...prev, phone: data.phone }));
      setMe(data);
      setIsPhoneDialogOpen(false);
    },
    onError: () => {
      toastError("Phone number failed, please try again");
    },
  });

  const { mutate: createNewAddress, isPending: isAddressPending } = useMutation(
    {
      mutationFn: createAddress,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["myAddresses"] });
        setIsAddressDialogOpen(false);
      },
      onError: () => {
        toastError("Failed to add address");
      },
    }
  );

  const { data: addresses } = useQuery({
    queryKey: ["myAddresses"],
    queryFn: getMyAddresses,
  });

  useEffect(() => {
    if (addresses && addresses.length > 0 && !selectedAddressId) {
      const defaultAddress = addresses.find((addr) => addr.isDefault);
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress.id);
      }
    }
  }, [addresses]);

  const handlePhoneSave = (values: z.infer<typeof phoneSchema>) => {
    updatePhone({ phone: values.phone });
  };

 
  const {
    provinces,
    districts,
    wards,
    handleProvinceChange,
    handleDistrictChange,
  } = useAdministrativeAddress(isAddressDialogOpen);

  const handleAddAddress = (values: z.infer<typeof addressSchema>) => {
    const provinceName =
      provinces.find((p) => p.code === Number(values.province))?.name || "";
    const districtName =
      districts.find((d) => d.code === Number(values.district))?.name || "";
    const wardName =
      wards.find((w) => w.code === Number(values.ward))?.name || "";

    const isDuplicate = addresses?.some(
      (addr: any) =>
        addr.streetAddress === values.streetAddress &&
        addr.ward === wardName &&
        addr.district === districtName &&
        addr.province === provinceName
    );

    if (isDuplicate) {
      toastError("Địa chỉ đã tồn tại.");
      return;
    }

    createNewAddress({
      ...values,
      province: provinceName,
      district: districtName,
      ward: wardName,
    });
  };

  return (
    <>
      <Card className="p-6 rounded-md shadow bg-primary">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-secondary-foreground">
            Contact Information
          </h2>
        </div>
        <Separator className="my-4" />

        <div className="space-y-2 mt-0">
          <AddressSelector
            selectedAddressId={selectedAddressId}
            onChange={(id) => setSelectedAddressId(id)}
            onOpenAddNew={() => setIsAddressDialogOpen(true)}
          />
        </div>

        <div className="flex items-center gap-40">
          <h3 className="font-medium text-secondary-foreground">Email</h3>
          <p className="text-txt-brand">{contactInfo.email}</p>
        </div>

        <div className="flex items-center gap-50">
          <h3 className="font-medium text-secondary-foreground">Phone</h3>
          <div className="flex items-center gap-2">
            <p className="text-txt-brand">{me?.phone}</p>
            <button
              onClick={() => setIsPhoneDialogOpen(true)}
              className="text-card-foreground dark:hover:text-blue-400 cursor-pointer"
            >
              <Pencil className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>

      {/* Dialog: Phone */}
      <Dialog open={isPhoneDialogOpen} onOpenChange={setIsPhoneDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit phone number</DialogTitle>
          </DialogHeader>
          <Form {...formPhone}>
            <form
              className="w-full space-y-3"
              onSubmit={formPhone.handleSubmit(handlePhoneSave)}
            >
              <FormField
                control={formPhone.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsPhoneDialogOpen(false)}
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white"
                  disabled={isPhonePending}
                >
                  Save
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Dialog: Add Address */}
      <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm địa chỉ mới</DialogTitle>
          </DialogHeader>
          <Form {...formAddress}>
            <form
              className="w-full space-y-3"
              onSubmit={formAddress.handleSubmit(handleAddAddress)}
            >
              <FormField
                control={formAddress.control}
                name="streetAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fieldLabels.streetAddress}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={formAddress.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fieldLabels.province}</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleProvinceChange(value);
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="-- Chọn tỉnh/thành phố --" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {provinces.map((p) => (
                          <SelectItem key={p.code} value={String(p.code)}>
                            {p.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={formAddress.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fieldLabels.district}</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleDistrictChange(value);
                      }}
                      disabled={!districts.length}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="-- Chọn quận/huyện --" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {districts.map((d) => (
                          <SelectItem key={d.code} value={String(d.code)}>
                            {d.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={formAddress.control}
                name="ward"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fieldLabels.ward}</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={!wards.length}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="-- Chọn phường/xã --" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {wards.map((w) => (
                          <SelectItem key={w.code} value={String(w.code)}>
                            {w.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddressDialogOpen(false)}
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white"
                  disabled={isAddressPending}
                >
                  Save
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RightUserProfile;
