import { prisma } from "@/lib/prisma";
import "server-only";

export async function getDrugsByPatient(id: string) {
  const drugs = prisma.drugs.findMany({
    where: {
      patiendId: BigInt(id),
    },
  });

  return drugs;
}
