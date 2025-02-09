import { safeParse } from "valibot";
import { DraftProductSchema } from "../schemas/product-schema";
import axios from "axios";

type ProductDataProps = {
  [k: string]: FormDataEntryValue;
};

export async function addProduct(data: ProductDataProps) {
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: +data.price,
    });
    if (result.success) {
      const url = `${import.meta.env.VITE_URL_API}/api/products`;
      /*const { data } =*/ await axios.post(url, {
        name: result.output.name,
        price: result.output.price,
      });
      // console.log(data);
    } else {
      throw new Error("Invalid data");
    }
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
