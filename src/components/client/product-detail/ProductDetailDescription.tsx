import React from "react";

interface Props {
  description?: string;
}

const ProductDetailDescription = ({ description }: Props) => {
  if (!description) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No description available for this product.
      </div>
    );
  }

  return (
    <div>
      <div 
        className="text-muted-foreground space-y-4"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};

export default ProductDetailDescription;
