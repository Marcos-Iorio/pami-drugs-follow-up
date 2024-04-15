"use client";

import { useState } from "react";
import NewRecipeModal from "../NewRecipeModal/NewRecipeModal";
import { Drug } from "../../Drugs/Drugs";
import { Order } from "../../Orders/Orders";

import { toast } from "react-hot-toast";
import Loader from "../../Loader/Loader";

const createOrder = async (order: Order | undefined): Promise<any> => {
  //Serializa el BigInt a String ya que stringify no puede manejar bigints
  (BigInt.prototype as any).toJSON = function () {
    return this.toString();
  };

  try {
    const response = await fetch(`/api/orders/create`, {
      method: "POST",
      body: JSON.stringify(order),
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error();
    }
  } catch (error) {
    return error;
  }
};

const AddRecipe = ({ drugs, id }: { drugs: Drug[]; id: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const createRecipe = async (data: Order) => {
    setIsLoading(true);
    const response = await createOrder(data);

    if (response?.status === 200) {
      setIsOpen(false);
      setIsLoading(false);
      toast.success(response?.message);
    } else {
      setIsOpen(false);
      setIsLoading(false);
      toast.error(response?.message);
    }
  };

  return (
    <>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className=" h-[29rem] w-[30rem] border-[#c2c2c2] hover:bg-gray-200/10 transition-all border-dashed border-4 rounded-2xl flex justify-center items-center cursor-pointer"
      >
        <p className="text-[#c2c2c2] text-6xl font-ligth">+</p>
      </div>
      {isLoading && <Loader />}
      {isOpen && (
        <NewRecipeModal
          setOpenModal={setIsOpen}
          drugs={drugs}
          id={id}
          func={createRecipe}
          buttonText="Agregar"
        />
      )}
    </>
  );
};

export default AddRecipe;
