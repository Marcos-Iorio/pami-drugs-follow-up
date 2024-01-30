import { prisma } from "@/lib/prisma";

async function POST(req: Request) {
  const body = await req.json();

  const formattedDrugs = body.drugs.map((drug: string) => BigInt(drug));

  try {
    const updatedRecipe = await prisma.orders.update({
      where: {
        id: body.id,
      },
      data: {
        givenAt: new Date(
          body.givenAt.replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1")
        ),
        retiredAt:
          body.retiredAt === null || body.retiredAt === ""
            ? null
            : new Date(
                body.retiredAt.replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1")
              ),
        boughtAt:
          body.boughtAt === null || body.boughtAt === ""
            ? null
            : new Date(
                body.boughtAt.replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1")
              ),
        patientId: BigInt(body.patientId),
        drugs: formattedDrugs,
      },
    });

    (BigInt.prototype as any).toJSON = function () {
      return this.toString();
    };

    if (updatedRecipe) {
      return Response.json({
        message: "Receta actualizado exitosamente!",
        status: 200,
        data: JSON.stringify(updatedRecipe),
      });
    }
  } catch (e) {
    throw e;
  }
}

export { POST };
