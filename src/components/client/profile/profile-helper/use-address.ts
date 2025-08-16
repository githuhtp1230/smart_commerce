import { fetchProvinces, fetchProvinceByCode } from "@/services/address.service";
import { useAuthStore } from "@/store/auth-store";
import type { Address } from "@/type/auth";
import { useEffect, useState } from "react";

export interface Province {
  code: number;
  name: string;
  wards: Ward[]; // wards nằm trong province luôn
}

export interface Ward {
  code: number;
  name: string;
}

export function useAddress(isFetchProvinces: boolean = false) {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const { me, setMe } = useAuthStore((s) => s);
  const addresses = me?.addresses;

  const isExistAddress = (address: Partial<Address>) => {
    return !!addresses?.some(
      (addr: Address) =>
        addr.streetAddress === address.streetAddress &&
        addr.ward === address.ward &&
        addr.province === address.province
    );
  };

  const selectedAddressId = () => {
    return addresses?.find((addr) => addr.isDefault)?.id;
  };

  const setDefaultAddress = (addressId: number) => {
    const newAddress = addresses?.map((addr) => ({
      ...addr,
      isDefault: addr.id === addressId,
    }));
    if (me) {
      setMe({
        ...me,
        addresses: newAddress,
      });
    }
  };

  useEffect(() => {
    if (isFetchProvinces) {
      fetchProvinces().then(setProvinces);
    }
  }, [isFetchProvinces]);

  // Khi chọn tỉnh, gọi API lấy luôn wards trong tỉnh
  const handleProvinceChange = async (provinceCode: number) => {
    const provinceData = await fetchProvinceByCode(provinceCode);
    setWards(provinceData.wards || []);
  };

  const findAddrNameByAddrCode = (
    addrCode: Partial<Address>
  ): Partial<Address> => {
    const provinceName =
      provinces.find((p) => p.code === Number(addrCode.province))?.name || "";
    const wardName =
      wards.find((w) => w.code === Number(addrCode.ward))?.name || "";
    return {
      province: provinceName,
      ward: wardName,
    };
  };

  const defaultAddr = addresses?.find((addr) => addr.isDefault);

  const findProvince = (provinceName: string) =>
    provinces.find((p) => p.name === provinceName);

  const findWard = (wardCode: number) => wards.find((w) => w.code === wardCode);

  return {
    provinces,
    wards,
    defaultAddr,
    setDefaultAddress,
    isExistAddress,
    selectedAddressId,
    findAddrNameByAddrCode,
    handleProvinceChange,
    findProvince,
    findWard,
  };
}
