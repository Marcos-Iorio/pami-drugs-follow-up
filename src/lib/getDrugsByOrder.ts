import { prisma } from "@/lib/prisma";
import "server-only";

export async function getDrugsByOrder(arrayOfIds: bigint[]) {
  const drugs = prisma.drugs.findMany({
    where: {
      id: { in: arrayOfIds },
    },
  });

  return drugs;
}
