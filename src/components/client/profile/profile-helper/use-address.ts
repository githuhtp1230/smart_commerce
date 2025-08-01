import {
  fetchDistricts,
  fetchProvinces,
  fetchWards,
} from "@/services/address.service";
import { useAuthStore } from "@/store/auth-store";
import type { Address } from "@/type/auth";
import { useEffect, useState } from "react";

export interface Province {
  code: number;
  name: string;
}

export interface District {
  code: number;
  name: string;
  wards: Ward[];
}

export interface Ward {
  code: number;
  name: string;
}

export function useAddress(isFetchProvinces: boolean = false) {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const { me, setMe } = useAuthStore((s) => s);
  const addresses = me?.addresses;

  const isExistAddress = (address: Partial<Address>) => {
    const isExist = addresses?.some(
      (addr: Address) =>
        addr.streetAddress === address.streetAddress &&
        addr.ward === address.ward &&
        addr.district === address.district &&
        addr.province === address.province
    );
    return !!isExist;
  };

  const selectedAddressId = () => {
    return addresses?.find((addr) => addr.isDefault)?.id;
  };

  const setDefaultAddress = (addressId: number) => {
    const newAddress = addresses?.map((addr) => {
      if (addr.id === addressId) {
        return {
          ...addr,
          isDefault: true,
        };
      }
      return {
        ...addr,
        isDefault: false,
      };
    });
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
  }, []);

  const handleProvinceChange = async (provinceCode: number) => {
    const data = await fetchDistricts(provinceCode);
    setDistricts(data.districts || []);
    setWards([]);
  };

  const handleDistrictChange = async (districtCode: number) => {
    const data = await fetchWards(districtCode);
    setWards(data.wards || []);
  };

  const findAddrNameByAddrCode = (
    addrCode: Partial<Address>
  ): Partial<Address> => {
    const provinceName =
      provinces.find((p) => p.code === Number(addrCode.province))?.name || "";
    const districtName =
      districts.find((d) => d.code === Number(addrCode.district))?.name || "";
    const wardName =
      wards.find((w) => w.code === Number(addrCode.ward))?.name || "";
    return {
      province: provinceName,
      district: districtName,
      ward: wardName,
    };
  };

  const defaultAddr = addresses?.find((addr) => addr.isDefault);

  const findProvince = (provinceName: string) =>
    provinces.find((p) => p.name === provinceName);

  const findDistrict = (districtName: string) =>
    districts.find((d) => d.name === districtName);

  const findWard = (wardName: string) => wards.find((w) => w.name === wardName);

  return {
    provinces,
    districts,
    wards,
    defaultAddr,
    setDefaultAddress,
    isExistAddress,
    selectedAddressId,
    findAddrNameByAddrCode,
    handleProvinceChange,
    handleDistrictChange,
    findProvince,
    findWard,
    findDistrict,
  };
}
