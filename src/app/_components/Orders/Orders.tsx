import { getOrdersByPatient } from "@/lib/getOrdersByPatients";
import Recipe from "../Recipes/Recipe/Recipe";
import AddRecipe from "../Recipes/AddRecipe/AddRecipe";
import { Drug } from "../Drugs/Drugs";
import { Suspense } from "react";
import RecipeWrapper from "../Recipes/Recipe/RecipeWrapper";

interface OrdersProp {
  id: string;
  drugs: Drug[];
}

export interface Order {
  id: bigint;
  givenAt: Date | string;
  retiredAt: Date | null | string;
  boughtAt: Date | null | string;
  patientId: bigint;
  drugs: bigint[];
}

const Orders = async ({ id, drugs }: OrdersProp) => {
  const orders = await getOrdersByPatient(id);

  return (
    <div className="h-full flex flex-col items-center justify-center px-40 w-fit">
      <h2 className="text-2xl text-[#BBD1EA]">
        {orders.length === 0
          ? "No hay recetas agregadas, empezá cargando una."
          : "Últimas 5 órdenes:"}
      </h2>
      <section className="flex flex-row gap-5 mt-10 flex-wrap items-center justify-stretch xl:w-full 2xl:w-[92.5rem] pb-14">
        {orders.map((order: Order, index: number) => (
          <RecipeWrapper key={index} {...order} />
        ))}
        <Suspense fallback={<p style={{ textAlign: "center" }}>Cargando...</p>}>
          <AddRecipe drugs={drugs} id={id} />
        </Suspense>
      </section>
    </div>
  );
};

export default Orders;
