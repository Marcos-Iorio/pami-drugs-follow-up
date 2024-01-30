import { getDrugsByOrder } from "@/lib/getDrugsByOrder";
import Recipe from "./Recipe";
import { Order } from "../../Orders/Orders";
import { Drug } from "../../Drugs/Drugs";

const RecipeWrapper = async (order: Order) => {
  const drugs: Drug[] = await getDrugsByOrder(order.drugs);

  return <Recipe order={order} drugs={drugs} />;
};

export default RecipeWrapper;
