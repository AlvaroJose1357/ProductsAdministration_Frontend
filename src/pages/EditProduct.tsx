import {
  Form,
  Link,
  useActionData,
  LoaderFunctionArgs,
  ActionFunctionArgs,
  redirect,
  useLoaderData,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { getProductByID, updateProduct } from "../services/ProductService";
import { Product } from "../types";
import ProductForm from "../components/ProductForm";

export async function loader({ params }: LoaderFunctionArgs) {
  console.log(params.id);
  if (params.id !== undefined) {
    const product = await getProductByID(+params.id);
    if (!product) {
      // throw new Response("", { status: 404, statusText: "Product not found" });
      return redirect("/");
    }
    return product;
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  // console.log(data);
  // Error handling
  let error = "";
  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
  }
  if (error.length) {
    return error;
  }

  // update product
  if (params.id !== undefined) {
    await updateProduct(+params.id, data);
    // Redirect to products
    return redirect("/");
  }
}

const availabilityOptions = [
  { name: "Disponible", value: true },
  { name: "No Disponible", value: false },
];

export default function EditProduct() {
  const error = useActionData() as string;
  const product = useLoaderData() as Product;
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-4xl font-black text-slate-500">Editar Producto</h1>
        <Link
          to={"/"}
          className="rounded-md bg-indigo-700 p-3 text-sm font-bold text-white shadow-md hover:bg-indigo-500">
          Volver a productos
        </Link>
      </div>
      {error && (
        <div className="mt-5">
          <ErrorMessage>{error}</ErrorMessage>
        </div>
      )}
      <Form
        className="mt-10"
        method="POST">
        <ProductForm product={product} />
        <div className="mb-4">
          <label
            className="text-gray-800"
            htmlFor="availability">
            Disponibilidad:
          </label>
          <select
            id="availability"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="availability"
            defaultValue={product?.availability.toString()}>
            {availabilityOptions.map((option) => (
              <option
                key={option.name}
                value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
      </Form>
    </>
  );
}
