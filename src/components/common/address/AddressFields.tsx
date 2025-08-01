import { useAddress } from "@/components/client/profile/profile-helper/use-address";
import Combobox from "@/components/common/combobox/Combobox";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { Address } from "@/type/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomInput from "../input/CustomInput";
import { useEffect } from "react";

interface Props {
  onSelectedAddress: (address: Partial<Address>) => void;
  onCancel?: () => void;
  saveButtonContent: string;
  defaultValue?: Address;
}

const addressSchema = z.object({
  streetAddress: z.string().min(1, "streetAddress is required"),
  ward: z.string().min(1, "Ward is required"),
  district: z.string().min(1, "District is required"),
  province: z.string().min(1, "Province is required"),
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

const AddressField = ({
  onSelectedAddress,
  saveButtonContent,
  defaultValue,
}: Props) => {
  const {
    provinces,
    districts,
    wards,
    handleProvinceChange,
    handleDistrictChange,
    findProvince,
    findDistrict,
  } = useAddress(true);

  const formAddress = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      streetAddress: "",
      ward: "",
      district: "",
      province: "",
    },
  });

  const province = formAddress.watch("province");
  const district = formAddress.watch("district");

  useEffect(() => {
    formAddress.resetField("district");
    formAddress.resetField("ward");
  }, [province]);

  useEffect(() => {
    formAddress.resetField("ward");
  }, [district]);

  const initDefaultValue = async () => {
    if (defaultValue && provinces.length > 0) {
      const { province } = defaultValue;
      const findedProvince = findProvince(province);
      if (findedProvince) {
        await handleProvinceChange(findedProvince?.code);
      }
    }
  };

  const initDistricts = async () => {
    if (defaultValue && districts.length > 0) {
      const findedDistrict = findDistrict(district);
      if (findedDistrict) {
        await handleDistrictChange(findedDistrict.code);
      }
    }
  };

  useEffect(() => {
    initDistricts();
    if (defaultValue) {
      const { streetAddress, province, district, ward } = defaultValue;
      formAddress.reset({
        streetAddress,
        province,
        district,
        ward,
      });
    }
  }, [defaultValue, districts]);

  useEffect(() => {
    initDefaultValue();
  }, [defaultValue, provinces]);

  const handleSubmitAddress = (address: Partial<Address>) => {
    onSelectedAddress({
      ...address,
      id: defaultValue?.id,
      isDefault: defaultValue?.isDefault,
    });
  };

  return (
    <div>
      <Form {...formAddress}>
        <form
          className="w-full space-y-5"
          onSubmit={formAddress.handleSubmit(handleSubmitAddress)}
        >
          <FormField
            control={formAddress.control}
            name="streetAddress"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>{fieldLabels.streetAddress}</FormLabel>
                <FormControl>
                  <CustomInput
                    field={field}
                    containerClassName="py-0"
                    hasError={!!formState.errors.streetAddress}
                    placeholder="Street address"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between gap-2 items-start">
            <FormField
              control={formAddress.control}
              name="province"
              render={({ field, formState }) => (
                <FormItem className="flex-1">
                  <FormLabel>{fieldLabels.province}</FormLabel>
                  <Combobox
                    className="w-full"
                    field={field}
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value.name);
                      handleProvinceChange(value.value);
                    }}
                    options={provinces.map((d) => ({
                      value: d.code,
                      name: d.name,
                    }))}
                    placeholder="Select option"
                    hasError={!!formState.errors.province}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={formAddress.control}
              name="district"
              render={({ field, formState }) => (
                <FormItem className="flex-1">
                  <FormLabel>{fieldLabels.district}</FormLabel>
                  <Combobox
                    className="w-full"
                    field={field}
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value.name);
                      handleDistrictChange(value.value);
                    }}
                    options={districts.map((d) => ({
                      value: d.code,
                      name: d.name,
                    }))}
                    disabled={!(districts.length > 0)}
                    hasError={!!formState.errors.district}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={formAddress.control}
              name="ward"
              render={({ field, formState }) => (
                <FormItem className="flex-1">
                  <FormLabel>{fieldLabels.ward}</FormLabel>
                  <Combobox
                    className="w-full"
                    field={field}
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value.name);
                    }}
                    options={wards.map((d) => ({
                      value: d.code,
                      name: d.name,
                    }))}
                    disabled={!(wards.length > 0)}
                    hasError={!!formState.errors.ward}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-1 justify-end">
            {/* <Button
              variant="outline"
              type="button"
            >
              Cancel
            </Button> */}
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-400 text-white"
            >
              {saveButtonContent}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddressField;
