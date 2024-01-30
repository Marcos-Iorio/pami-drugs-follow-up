import { prisma } from "@/lib/prisma";

async function POST(req: Request) {
  const body = await req.json();

  try {
    const newRecipe = await prisma.orders.create({
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
        patientId: body.patientId,
        drugs: body.drugs,
      },
    });

    if (newRecipe) {
      return Response.json({
        message: "Receta creada exitosamente!",
        status: 200,
      });
    }
  } catch (e) {
    throw e;
  }
}

export { POST };
