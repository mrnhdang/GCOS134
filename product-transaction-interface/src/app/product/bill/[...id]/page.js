import BillDetail from "@/components/shop/bill/BillDetail";

const BillPage = ({ params }) => {
  const { id } = params;
  return <BillDetail billId={id} />;
};

export default BillPage;
