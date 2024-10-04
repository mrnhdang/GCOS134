import ShopLayout from "@/components/shop/layout/ShopLayout";
import "../globals.css";

import CartProvider from "@/provider/CartContext";

export default function ShopRootLayout({ children }) {
  return (
    <CartProvider>
      <ShopLayout>{children}</ShopLayout>
    </CartProvider>
  );
}
