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

export function useAdministrativeAddress(isOpen: boolean) {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  useEffect(() => {
    if (isOpen) {
      fetch("https://provinces.open-api.vn/api/p/")
        .then((res) => res.json())
        .then((data) => setProvinces(data));
    }
  }, [isOpen]);

  const handleProvinceChange = async (provinceCode: string) => {
    const res = await fetch(
      `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
    );
    const data = await res.json();
    setDistricts(data.districts || []);
    setWards([]);
  };

  const handleDistrictChange = async (districtCode: string) => {
    const res = await fetch(
      `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
    );
    const data = await res.json();
    setWards(data.wards || []);
  };

  return {
    provinces,
    districts,
    wards,
    handleProvinceChange,
    handleDistrictChange,
  };
}
