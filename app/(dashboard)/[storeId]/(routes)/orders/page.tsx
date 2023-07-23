import { format } from "date-fns";
import prismadb from "@/lib/prismadb";

import OrderClient from "./components/order-client";
import { OrderColumn } from "./components/columns";
import { priceFormatter } from "@/lib/utils";

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prismadb.order.findMany({
    where: { storeId: params.storeId },
    include: {
      orderItems: {
        include: { product: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: priceFormatter.format(
      item.orderItems.reduce(
        (total, item) => total + Number(item.product.price),
        0
      )
    ),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, "dd/MM/yyyy"),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
