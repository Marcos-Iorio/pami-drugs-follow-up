"use client";

import { useEffect, useState } from "react";
import NewRecipeModal from "../NewRecipeModal/NewRecipeModal";
import { Drug } from "../../Drugs/Drugs";
import { Order } from "../../Orders/Orders";
import { useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const createOrder = async (order: Order | undefined): Promise<any> => {
  //Serializa el BigInt a String ya que stringify no puede manejar bigints
  (BigInt.prototype as any).toJSON = function () {
    return this.toString();
  };

  try {
    const response = await fetch(`/api/orders`, {
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

  const createRecipe = async (data: Order) => {
    const response = await createOrder(data);

    setIsOpen(false);

    if (response?.status === 200) {
      toast.success(response?.message);
    } else {
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
      {isOpen && (
        <NewRecipeModal
          setOpenModal={setIsOpen}
          drugs={drugs}
          id={id}
          func={createRecipe}
        />
      )}
    </>
  );
};

export default AddRecipe;
