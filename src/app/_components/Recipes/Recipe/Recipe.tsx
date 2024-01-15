import calcNextDate from "@/utils/calcNextDate";
import formatDate from "@/utils/formatDate";
import { Order } from "../../Orders/Orders";
import Attr from "../../Attr/Attr";
import { getDrugsByOrder } from "@/lib/getDrugsByOrder";
import Drugs from "../../Drugs/Drugs";

const Recipe = async (order: Order) => {
  const drugs = await getDrugsByOrder(order.drugs);

  return (
    <article className="border-2 border-solid rounded-lg border-[#18283A] bg-[#0B131D] p-10 flex flex-col gap-3 flex-wrap h-[29rem] w-[30rem] first-of-type:border-green-500">
      <h4 className="text-2xl text-[#BBD1EA] flex justify-between items-center mb-5 font-bold">
        Receta{" "}
        <span className="text-5xl text-[#E9EDDE] font-bold">
          #{order.id.toString()}
        </span>
      </h4>
      <Attr text={"Llevada el:"} info={formatDate(order.givenAt)} />
      <Attr
        text={"Retirado el:"}
        info={
          order.retiredAt === null
            ? "Pendiente de carga"
            : formatDate(order.retiredAt)
        }
      />
      <Attr
        text={"Compra el:"}
        info={
          order.boughtAt === null
            ? "Pendiente de carga"
            : formatDate(order.boughtAt)
        }
      />

      <section className="mt-5 mb-auto">
        {order.retiredAt === null ? (
          ""
        ) : (
          <Attr
            text={"Próximo pedido:"}
            info={formatDate(calcNextDate(order.retiredAt, 60))}
          />
        )}
        {order.boughtAt === null ? (
          ""
        ) : (
          <Attr
            text={"Próxima compra:"}
            info={formatDate(calcNextDate(order.boughtAt, 30))}
          />
        )}
      </section>
      <Drugs drugs={drugs} />
    </article>
  );
};

export default Recipe;
