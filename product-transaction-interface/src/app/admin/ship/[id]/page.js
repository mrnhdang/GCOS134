import ShipDetail from "@/components/admin/ship/detail/ShipDetail";

const ShipDetailPage = ({ params }) => {
  const { id } = params;
  return <ShipDetail id={id} />;
};
export default ShipDetailPage;
