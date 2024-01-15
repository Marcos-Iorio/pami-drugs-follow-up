import {
  Dispatch,
  FormEvent,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { Order } from "../../Orders/Orders";
import Input from "./Input";
import Drugs, { Drug } from "../../Drugs/Drugs";

interface ModalProps {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  orderData?: Order;
  drugs: Drug[];
  id: string;
  func: (data: Order) => void;
}

interface BackdropProps {
  onClose: () => void;
  children: ReactNode;
}

const Backdrop = ({ children, onClose }: BackdropProps) => {
  return (
    <section
      onClick={onClose}
      className="fixed top-0 left-0 w-full h-full bg-slate-950/70 grid place-content-center z-10 backdrop-blur-sm transition-all"
    >
      {children}
    </section>
  );
};

const NewRecipeModal = ({
  setOpenModal,
  orderData,
  drugs,
  id,
  func,
}: ModalProps) => {
  const initialState: Order = {
    id: BigInt(0),
    givenAt: "",
    retiredAt: null,
    boughtAt: null,
    patientId: BigInt(id),
    drugs: [],
  };

  const [data, setData] = useState<Order>(
    orderData === undefined ? initialState : orderData
  );
  const [selectedDrugs, setSelectedDrugs] = useState<bigint[]>([]);

  const giveAtChangeHandler = (dateString: string) => {
    setData((prev) => ({ ...prev, givenAt: dateString }));
  };
  const retiredAtChangeHandler = (dateString: string) => {
    setData((prev) => ({ ...prev, retiredAt: dateString }));
  };

  const bougthAtChangeHandler = (dateString: string) => {
    setData((prev) => ({ ...prev, boughtAt: dateString }));
  };

  const closeModalHandler = () => {
    setOpenModal(false);
  };

  const addOrRemoveHandler = (id: bigint) => {
    setSelectedDrugs((prevSelectedDrugs) => {
      let updatedDrugs: bigint[];

      if (prevSelectedDrugs.includes(id)) {
        updatedDrugs = prevSelectedDrugs.filter((drugId) => drugId !== id);
      } else {
        updatedDrugs = [...prevSelectedDrugs, id];
      }

      setData((prevData) => ({ ...prevData, drugs: updatedDrugs }));

      return updatedDrugs;
    });
  };

  const submitDataHandler = (e: FormEvent) => {
    e.preventDefault();

    func(data);
  };
  return (
    <Backdrop onClose={closeModalHandler}>
      <section
        onClick={(e) => e.stopPropagation()}
        className="border-2 border-solid rounded-lg border-[#18283A] bg-[#0B131D] h-[40em] w-[35em] z-50 px-10 py-5 flex flex-col"
      >
        <header className="w-full mb-10">
          <h2 className="text-2xl font-bold text-[#E9EDDE] text-center">
            Nueva receta
          </h2>
          <p className="text-[#E9EDDE]">
            Cargá nada más cuando llevaron las recetas. Y luego editá y cargá
            las demás fechas.
          </p>
        </header>
        <form
          action=""
          className="flex gap-5 flex-col h-full"
          onSubmit={submitDataHandler}
        >
          <Input
            info="Cúando llevaron las recetas:"
            name="givenAt"
            setData={giveAtChangeHandler}
          />
          <Input
            info="Cúando retiraron las recetas:"
            name="retiredAt"
            setData={retiredAtChangeHandler}
          />
          <Input
            info="Cúando compraron los medicamentos:"
            name="boughtAt"
            setData={bougthAtChangeHandler}
          />
          <p className="text-[#E9EDDE]">Seleccioná los medicamentos pedidos:</p>
          <Drugs
            drugs={drugs}
            isSelectable={true}
            setDrugs={addOrRemoveHandler}
            selectedDrugs={selectedDrugs}
          />

          <button
            type="submit"
            className="border-2 rounded-lg py-3 mt-auto border-[#18283A] bg-[#030C11] text-lg text-[#E9EDDE] font-bold hover:bg-[#030c115b]"
          >
            AGREGAR RECETA
          </button>
        </form>
      </section>
    </Backdrop>
  );
};

export default NewRecipeModal;
