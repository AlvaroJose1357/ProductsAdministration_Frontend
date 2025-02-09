import {
  ActionFunctionArgs,
  Form,
  Link,
  useActionData,
  redirect,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";

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
  await addProduct(data);

  // Redirect to products
  return redirect("/");
}

export default function NewProduct() {
  const error = useActionData() as string;
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-4xl font-black text-slate-500">
          Registrar Producto
        </h1>
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
        <ProductForm />
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
      </Form>
    </>
  );
}
