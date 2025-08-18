"use client";

import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import { toastError, toastSuccess } from "@/components/common/sonner";
import { createPromotion } from "@/services/promotions.service";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { vi } from "date-fns/locale";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CustomInput from "@/components/common/input/CustomInput";
import { formatTimeDay } from "@/helper/format-time-day";

interface Props {
  onSuccess?: () => void;
}

// Schema validate bằng zod
const formSchema = z.object({
  description: z.string().min(1, "Vui lòng nhập mô tả khuyến mãi"),
  discountValuePercent: z
    .string()
    .min(1, "Vui lòng nhập giá trị giảm")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) <= 100,
      {
        message: "Giá trị giảm phải là số từ 1 đến 100",
      }
    ),
  startDate: z.date({ required_error: "Vui lòng chọn ngày bắt đầu" }),
  endDate: z.date({ required_error: "Vui lòng chọn ngày kết thúc" }),
});

export default function AddPromotions({ onSuccess }: Props) {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      discountValuePercent: "",
      startDate: undefined,
      endDate: undefined,
    },
  });

  const mutation = useMutation({
    mutationFn: createPromotion,
    onSuccess: () => {
      toastSuccess("Thêm khuyến mãi thành công");
      form.reset();
      onSuccess?.();
      queryClient.invalidateQueries({ queryKey: ["promotions"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toastError(`Lỗi: ${error.message}`);
      } else {
        toastError("Lỗi không xác định khi thêm khuyến mãi");
      }
      console.error("API Error:", error);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutation.mutate({
      description: values.description.trim(),
      discountValuePercent: Number(values.discountValuePercent),
      startDate: values.startDate.toISOString(),
      endDate: values.endDate.toISOString(),
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 border rounded-xl bg-white dark:bg-gray-800 mb-2 ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-start">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Mô tả khuyến mãi
                  </FormLabel>
                  <FormControl>
                    <CustomInput
                      className="h-9 px-3 text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="Nhập mô tả khuyến mãi"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm mt-1 min-h-[20px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discountValuePercent"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Giá trị giảm (%)
                  </FormLabel>
                  <FormControl>
                    <CustomInput
                      className="h-9 px-3 text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-md focus:ring-2 focus:ring-blue-500"
                      type="number"
                      placeholder="Nhập giá trị giảm (%)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm mt-1 min-h-[20px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Ngày bắt đầu
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className="h-10 px-3 text-sm text-left font-normal border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-md flex items-center w-full hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                          {field.value
                            ? formatTimeDay(field.value)
                            : "Chọn ngày bắt đầu"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-800">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        locale={vi}
                        className="rounded-md border border-gray-300 dark:border-gray-600"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-sm mt-1 min-h-[20px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Ngày kết thúc
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className="h-10 px-3 text-sm text-left font-normal border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-md flex items-center w-full hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                          {field.value
                            ? formatTimeDay(field.value)
                            : "Chọn ngày kết thúc"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-800">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        locale={vi}
                        className="rounded-md border border-gray-300 dark:border-gray-600"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-sm mt-1 min-h-[20px]" />
                </FormItem>
              )}
            />

            <div className=" flex justify-end sm:col-span-5 mr-3">
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="h-10 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                {mutation.isPending ? "Đang thêm..." : "Thêm"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
