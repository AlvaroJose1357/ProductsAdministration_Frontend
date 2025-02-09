import {
  boolean,
  number,
  parse,
  pipe,
  safeParse,
  string,
  transform,
} from "valibot";
import {
  DraftProductSchema,
  ProductSchema,
  ProductsSchema,
} from "../schemas/product-schema";
import axios from "axios";
import { Product } from "../types";
import { toBoolean } from "../utils";

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

export async function getProducts() {
  try {
    const url = `${import.meta.env.VITE_URL_API}/api/products`;
    const { data } = await axios.get(url);
    const result = safeParse(ProductsSchema, data.data);
    if (result.success) {
      return result.output;
    } else {
      throw new Error("Invalid data");
    }
  } catch (error) {
    console.error(error);
  }
}
export async function getProductByID(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_URL_API}/api/products/${id}`;
    const { data } = await axios.get(url);
    const result = safeParse(ProductSchema, data.data);
    if (result.success) {
      return result.output;
    } else {
      throw new Error("Invalid data");
    }
  } catch (error) {
    console.error(error);
  }
}

export const updateProduct = async (
  id: Product["id"],
  data: ProductDataProps
) => {
  try {
    // esto lo que hace es transformar el string a number y luego a number de valibot para que lo valide como numero,
    // primero recibe el tipo de dato que va a llegar que es un string, luego lo transforma a number y luego lo valida como number de valibot
    const NumberSchema = pipe(string(), transform(Number), number());
    const result = safeParse(ProductSchema, {
      id,
      name: data.name,
      price: parse(NumberSchema, data.price),
      availability: toBoolean(data.availability.toString()),
    });
    if (result.success) {
      const url = `${import.meta.env.VITE_URL_API}/api/products/${id}`;
      await axios.put(url, result.output);
    } else {
      throw new Error("Invalid data");
    }
  } catch (error) {
    console.error(error);
  }
};
