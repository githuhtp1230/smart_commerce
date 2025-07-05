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
          {productDetail &&
            productDetail.attributeValues.map((attrVal) => (
              <tr key={attrVal.id}>
                <td className="font-medium text-base px-4 py-3 w-1/3 bg-background-lightgray">
                  {attrVal.attribute.name}
                </td>
                <td className="px-4 py-3 text-base">{attrVal.value}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductDetailAttributeList;
