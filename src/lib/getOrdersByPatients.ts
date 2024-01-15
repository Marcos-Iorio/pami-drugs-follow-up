import { prisma } from "@/lib/prisma";
import "server-only";

export async function getOrdersByPatient(id: string) {
  const orders = prisma.orders.findMany({
    where: {
      patientId: BigInt(id),
    },
    take: 5,
    orderBy: {
      id: "desc",
    },
  });

  return orders;
}
