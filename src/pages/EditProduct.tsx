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
import { getProductByID } from "../services/ProductService";
import { Product } from "../types";

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

export async function action({ request }: ActionFunctionArgs) {
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

  // Add product
  // await addProduct(data);

  // Redirect to products
  return redirect("/");
}

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
        <div className="mb-4">
          <label
            className="text-gray-800"
            htmlFor="name">
            Nombre Producto:
          </label>
          <input
            id="name"
            type="text"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Nombre del Producto"
            name="name"
            defaultValue={product.name}
          />
        </div>
        <div className="mb-4">
          <label
            className="text-gray-800"
            htmlFor="price">
            Precio:
          </label>
          <input
            id="price"
            type="number"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Precio Producto. ej. 200, 300"
            name="price"
            defaultValue={product.price}
          />
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
