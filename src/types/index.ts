import { InferOutput } from "valibot";
import { ProductSchema } from "../schemas/product-schema";

export type Product = InferOutput<typeof ProductSchema>;
