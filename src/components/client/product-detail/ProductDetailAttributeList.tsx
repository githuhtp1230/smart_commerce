import type { IAttributeValue } from "@/type/attribute";
import React from "react";

interface Props {
  attributeValues?: IAttributeValue[];
}

const ProductDetailAttributeList = ({ attributeValues }: Props) => {
  if (!attributeValues || attributeValues.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No specifications available for this product.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto  rounded-lg border-1">
      <table className="min-w-full table-auto ">
        <tbody className="divide-y divided-ring  text-txt-primary ">
          {attributeValues.map((attrVal) => (
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
