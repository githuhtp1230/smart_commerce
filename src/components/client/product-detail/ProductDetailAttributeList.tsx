import type { IProductDetail } from "@/type/products";
import React from "react";

interface Props {
  productDetail?: IProductDetail;
}

const ProductDetailAttributeList = ({ productDetail }: Props) => {
  return (
    <div className="overflow-x-auto  rounded-lg border-1">
      <table className="min-w-full table-auto ">
        <tbody className="divide-y divided-ring  text-txt-primary ">
          <tr className="">
            <td className="font-medium text-base  px-4 py-3 w-1/3 bg-background-lightgray">
              Kích thước màn hình
            </td>
            <td className="px-4 py-3 text-base">6.9 inches</td>
          </tr>
          <tr className="">
            <td className="font-medium text-base px-4 py-3 bg-background-lightgray ">
              Công nghệ màn hình
            </td>
            <td className="px-4 py-3 text-base ">Super Retina XDR OLED</td>
          </tr>
          <tr className="">
            <td className="font-medium text-base px-4 py-3 bg-background-lightgray">
              Camera sau
            </td>
            <td className="px-4 py-3 text-base">
              Camera chính: 48MP, f/1.78, 24mm, 2µm, chống rung quang học dịch
              chuyển cảm biến thế hệ thứ hai, Focus Pixels 100%
              <br />
              Telephoto 2x 12MP: 52 mm, f/1.6
              <br />
              Camera góc siêu rộng: 48MP, 13 mm, f/2.2, 120°, Hybrid Focus
              Pixels
            </td>
          </tr>
          <tr className="">
            <td className="font-medium text-base px-4 py-3 bg-background-lightgray">
              Camera trước
            </td>
            <td className="px-4 py-3 text-base">
              12MP, f/1.9, Tự động lấy nét theo pha Focus Pixels
            </td>
          </tr>
          <tr className="">
            <td className="font-medium text-base px-4 py-3 bg-background-lightgray">
              Chipset
            </td>
            <td className="px-4 py-3 text-base">Apple A18 Pro</td>
          </tr>
          <tr className="">
            <td className="font-medium text-base px-4 py-3 bg-background-lightgray">
              Công nghệ NFC
            </td>
            <td className="px-4 py-3 text-base">Có</td>
          </tr>
          <tr className="">
            <td className="font-medium text-base px-4 py-3 bg-background-lightgray">
              Bộ nhớ trong
            </td>
            <td className="px-4 py-3 text-base">256 GB</td>
          </tr>
          <tr className="">
            <td className="font-medium text-base px-4 py-3 bg-background-lightgray">
              Thẻ SIM
            </td>
            <td className="px-4 py-3 text-base">
              Sim kép (nano-SIM và e-SIM) – Hỗ trợ 2 e-SIM
            </td>
          </tr>
          <tr className="">
            <td className="font-medium text-base px-4 py-3 bg-background-lightgray">
              Hệ điều hành
            </td>
            <td className="px-4 py-3 text-base">iOS 18</td>
          </tr>
          <tr className="">
            <td className="font-medium text-base px-4 py-3 bg-background-lightgray">
              Độ phân giải màn hình
            </td>
            <td className="px-4 py-3 text-base">2868 x 1320 pixels</td>
          </tr>
          <tr className="">
            <td className="font-medium text-base px-4 py-3 bg-background-lightgray">
              Tính năng màn hình
            </td>
            <td className="px-4 py-3 text-base ">
              Dynamic Island, Màn hình Luôn Bật, Công nghệ ProMotion 120Hz, HDR,
              True Tone, Dải màu rộng (P3), Haptic Touch, Tỷ lệ tương phản
              2.000.000:1
            </td>
          </tr>
          <tr className="">
            <td className="font-medium text-base px-4 py-3 bg-background-lightgray ">
              Loại CPU
            </td>
            <td className="px-4 py-3 text-base">
              CPU 6 lõi: 2 lõi hiệu năng & 4 lõi hiệu suất
            </td>
          </tr>
          <tr className="">
            <td className="font-medium text-base px-4 py-3 bg-background-lightgray">
              Tương thích
            </td>
            <td className="px-4 py-3 text-base">
              Tương Thích Với Thiết Bị Trợ Thính
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductDetailAttributeList;
