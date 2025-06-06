import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { productId } = useParams();

  return (
    <div>
      <h1>Product ID: {productId}</h1>
    </div>
  );
};

export default ProductDetail;
