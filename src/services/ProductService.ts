import { safeParse } from "valibot";
import { DraftProductSchema } from "../schemas/product-schema";

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
    } else {
      throw new Error("Invalid data");
    }
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
