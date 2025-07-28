// components/AddressSelector.tsx
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Plus, Pen, Trash } from "lucide-react";
import {
  deleteAddress,
  getMyAddresses,
  setDefaultAddress,
  updateAddress,
} from "@/services/address.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Address {
  id: string;
  streetAddress: string;
  ward: string;
  district: string;
  province: string;
  isDefault?: boolean;
}

interface Province {
  code: number;
  name: string;
  districts: District[];
}

interface District {
  code: number;
  name: string;
  wards: Ward[];
}

interface Ward {
  code: number;
  name: string;
}

interface Props {
  selectedAddressId: string | null;
  onChange: (id: string) => void;
  onOpenAddNew: () => void;
}

const AddressSelector: React.FC<Props> = ({
  selectedAddressId,
  onChange,
  onOpenAddNew,
}) => {
  const [open, setOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [formState, setFormState] = useState({
    streetAddress: "",
    ward: "",
    district: "",
    province: "",
  });

  const queryClient = useQueryClient();

  const { data: addresses } = useQuery({
    queryKey: ["myAddresses"],
    queryFn: getMyAddresses,
  });

  const { mutate: setDefaultAddressMutation } = useMutation({
    mutationFn: (id: string) => setDefaultAddress(Number(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myAddresses"] });
    },
  });

  const { mutate: updateAddressMutation } = useMutation({
    mutationFn: (data: {
      id: number;
      streetAddress: string;
      ward: string;
      district: string;
      province: string;
    }) => updateAddress(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myAddresses"] });
      setEditingAddress(null);
    },
  });

  const { mutate: deleteAddressMutation } = useMutation({
    mutationFn: (id: string) => deleteAddress(Number(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myAddresses"] });
    },
  });

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xoá địa chỉ này?")) {
      deleteAddressMutation(id);
    }
  };

  const selectedAddress = addresses?.find(
    (a: Address) => a.id === selectedAddressId
  );

  const handleEdit = async (address: Address) => {
    // Gọi API để lấy danh sách tỉnh
    const provincesRes = await fetch("https://provinces.open-api.vn/api/p/");
    const provincesData = await provincesRes.json();
    setProvinces(provincesData);

    const selectedProvince = provincesData.find(
      (p) => p.name === address.province
    );
    if (!selectedProvince) return;

    // Gọi API để lấy district
    const districtsRes = await fetch(
      `https://provinces.open-api.vn/api/p/${selectedProvince.code}?depth=2`
    );
    const districtsData = await districtsRes.json();
    setDistricts(districtsData.districts);

    const selectedDistrict = districtsData.districts.find(
      (d) => d.name === address.district
    );
    if (!selectedDistrict) return;

    // Gọi API để lấy ward
    const wardsRes = await fetch(
      `https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`
    );
    const wardsData = await wardsRes.json();
    setWards(wardsData.wards);

    const selectedWard = wardsData.wards.find((w) => w.name === address.ward);
    if (!selectedWard) return;

    // Cập nhật state
    setFormState({
      streetAddress: address.streetAddress,
      province: String(selectedProvince.code),
      district: String(selectedDistrict.code),
      ward: String(selectedWard.code),
    });

    setEditingAddress(address);
  };

  const handleUpdate = () => {
    if (editingAddress) {
      const provinceName =
        provinces.find((p) => p.code === Number(formState.province))?.name ||
        formState.province;
      const districtName =
        districts.find((d) => d.code === Number(formState.district))?.name ||
        formState.district;
      const wardName =
        wards.find((w) => w.code === Number(formState.ward))?.name ||
        formState.ward;
      updateAddressMutation({
        id: Number(editingAddress.id),
        streetAddress: formState.streetAddress,
        province: provinceName,
        district: districtName,
        ward: wardName,
      });
    }
  };

  useEffect(() => {
    if (editingAddress) {
      fetch("https://provinces.open-api.vn/api/p/")
        .then((res) => res.json())
        .then((data) => setProvinces(data));
    }
  }, [editingAddress]);

  const handleProvinceChange = async (provinceCode: string) => {
    const res = await fetch(
      `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
    );
    const data = await res.json();
    setDistricts(data.districts || []);
    setWards([]);
    setFormState((prev) => ({
      ...prev,
      province: provinceCode,
      district: "",
      ward: "",
    }));
  };

  const handleDistrictChange = async (districtCode: string) => {
    const res = await fetch(
      `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
    );
    const data = await res.json();
    setWards(data.wards || []);
    setFormState((prev) => ({
      ...prev,
      district: districtCode,
      ward: "",
    }));
  };

  return (
    <>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Địa chỉ đang sử dụng</p>
          {selectedAddress ? (
            <p className="text-base font-medium mt-1">
              {selectedAddress.streetAddress}, {selectedAddress.ward},{" "}
              {selectedAddress.district}, {selectedAddress.province}
              {selectedAddress.isDefault && (
                <span className="ml-2 text-xs text-green-600">(Mặc định)</span>
              )}
            </p>
          ) : (
            <p className="text-base text-destructive mt-1">Chưa chọn địa chỉ</p>
          )}
        </div>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Thay đổi
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chọn địa chỉ giao hàng</DialogTitle>
          </DialogHeader>
          <Separator />
          <RadioGroup
            value={selectedAddressId ?? ""}
            onValueChange={(val) => {
              setDefaultAddressMutation(val);
              onChange(val);
              setOpen(false);
            }}
            className="space-y-4 mt-4"
          >
            {addresses?.map((address: Address) => (
              <div key={address.id} className="flex items-start gap-2">
                <RadioGroupItem value={address.id} />
                <div className="flex">
                  <p className="text-sm">
                    {address.streetAddress}, {address.ward}, {address.district},{" "}
                    {address.province}
                    {address.isDefault && (
                      <span className="ml-2 text-xs text-green-600">
                        (Mặc định)
                      </span>
                    )}
                  </p>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 text-blue-500"
                    onClick={() => handleEdit(address)}
                  >
                    <Pen className="w-4 h-4" />
                    Cập Nhật
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 text-red-500"
                    onClick={() => handleDelete(address.id)}
                  >
                    <Trash className="w-4 h-4" />
                    Xoá Địa Chỉ
                  </Button>
                </div>
              </div>
            ))}
          </RadioGroup>

          <DialogFooter className="mt-4">
            <Button
              variant="ghost"
              onClick={() => {
                setOpen(false);
                onOpenAddNew();
              }}
              className="flex items-center gap-2 text-blue-500"
            >
              <Plus className="w-4 h-4" />
              Thêm địa chỉ mới
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog cập nhật địa chỉ */}
      <Dialog
        open={!!editingAddress}
        onOpenChange={() => setEditingAddress(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cập nhật địa chỉ</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              value={formState.streetAddress}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  streetAddress: e.target.value,
                }))
              }
              placeholder="Số nhà, tên đường"
            />
            <Select
              value={formState.province}
              onValueChange={(val) => handleProvinceChange(val)}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder="-- Chọn tỉnh/thành phố --"
                  // Tìm tên từ mã code hiện tại
                >
                  {provinces.find((p) => String(p.code) === formState.province)
                    ?.name || "-- Chọn tỉnh/thành phố --"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {provinces.map((p) => (
                  <SelectItem key={p.code} value={String(p.code)}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={formState.district}
              onValueChange={(val) => handleDistrictChange(val)}
              disabled={!districts.length}
            >
              <SelectTrigger>
                <SelectValue placeholder="-- Chọn quận/huyện --">
                  {districts.find((d) => String(d.code) === formState.district)
                    ?.name || "-- Chọn quận/huyện --"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {districts.map((d) => (
                  <SelectItem key={d.code} value={String(d.code)}>
                    {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={formState.ward}
              onValueChange={(val) =>
                setFormState((prev) => ({ ...prev, ward: val }))
              }
              disabled={!wards.length}
            >
              <SelectTrigger>
                <SelectValue placeholder="-- Chọn phường/xã --">
                  {wards.find((w) => String(w.code) === formState.ward)?.name ||
                    "-- Chọn phường/xã --"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {wards.map((w) => (
                  <SelectItem key={w.code} value={String(w.code)}>
                    {w.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <DialogFooter>
              <Button onClick={() => setEditingAddress(null)} variant="outline">
                Hủy
              </Button>
              <Button
                onClick={handleUpdate}
                className="bg-blue-500 hover:bg-blue-700 text-white"
              >
                Lưu
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddressSelector;
