import ProductDetail from "@/components/shop/product/detail/ProductDetail";

const ProductDetailPage = ({ params }) => {
  const { id } = params;
  return (
    <div className="h-full min-h-screen">
      <ProductDetail id={id} />
    </div>
  );
};
export default ProductDetailPage;
