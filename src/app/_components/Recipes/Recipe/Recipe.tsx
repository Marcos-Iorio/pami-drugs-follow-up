"use client";

import calcNextDate from "@/utils/calcNextDate";
import formatDate from "@/utils/formatDate";
import { Order } from "../../Orders/Orders";
import Attr from "../../Attr/Attr";
import Drugs, { Drug } from "../../Drugs/Drugs";
import { useState } from "react";
import toast from "react-hot-toast";
import NewRecipeModal from "../NewRecipeModal/NewRecipeModal";

interface RecipeProps {
  order: Order;
  drugs: Drug[];
}

const updateRecipe = async (order: Order | undefined): Promise<any> => {
  //Serializa el BigInt a String ya que stringify no puede manejar bigints
  (BigInt.prototype as any).toJSON = function () {
    return this.toString();
  };

  try {
    const response = await fetch(`/api/orders/update`, {
      method: "POST",
      body: JSON.stringify(order),
    });

    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error();
    }
  } catch (error) {
    return error;
  }
};

const Recipe = ({ order, drugs }: RecipeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(order);

  const updateRecipeHandler = async (data: Order) => {
    const response = await updateRecipe(data);

    if (response?.status === 200) {
      setData(JSON.parse(response.data));
      setIsOpen(false);
      toast.success(response?.message);
    } else {
      toast.error("Hubo un error actualizando la receta");
    }
  };

  return (
    <>
      <article
        onClick={() => setIsOpen(true)}
        className="border-2 cursor-pointer relative  overflow-hidden border-solid rounded-lg border-[#18283A] bg-[#0B131D] p-10 flex flex-col gap-3 flex-wrap h-[32rem] w-[30rem] first-of-type:border-green-500 after:absolute after:top-0 after:left-1 after:w-full after:h-full after:bg-black/30 transition-all after:backdrop-blur-sm after:hidden hover:after:block before:content-['Editar'] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:z-50 before:hidden hover:before:block before:text-4xl before:font-bold"
      >
        <h4 className="text-2xl text-[#BBD1EA] flex justify-between items-center mb-5 font-bold">
          Receta{" "}
          <span className="text-5xl text-[#E9EDDE] font-bold">
            #{data.id.toString()}
          </span>
        </h4>
        <Attr text={"Llevada el:"} info={formatDate(data.givenAt)} />
        <Attr
          text={"Retirado el:"}
          info={
            data.retiredAt === null
              ? "Pendiente de carga"
              : formatDate(data.retiredAt)
          }
        />
        <Attr
          text={"Compra el:"}
          info={
            data.boughtAt === null
              ? "Pendiente de carga"
              : formatDate(data.boughtAt)
          }
        />

        <section className="mt-5 mb-auto">
          {data.retiredAt === null ? (
            ""
          ) : (
            <Attr
              text={"Llevar recetas el:"}
              info={formatDate(calcNextDate(data.givenAt, 90))}
            />
          )}
          {data.boughtAt === null ? (
            ""
          ) : (
            <>
              <Attr
                text={"Próxima compra:"}
                info={formatDate(calcNextDate(data.boughtAt, 30))}
              />
              <Attr info={formatDate(calcNextDate(data.boughtAt, 60))} />
            </>
          )}
        </section>
        <Drugs drugs={drugs} />
      </article>
      {isOpen && (
        <NewRecipeModal
          setOpenModal={setIsOpen}
          drugs={drugs}
          orderData={data}
          func={updateRecipeHandler}
          id={order.id.toString()}
          buttonText="Guardar edición"
        />
      )}
    </>
  );
};

export default Recipe;
