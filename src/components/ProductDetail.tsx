import {
  ActionFunctionArgs,
  Form,
  redirect,
  useFetcher,
  useNavigate,
} from "react-router-dom";
import { Product } from "../types";
import { formatCurrency } from "../utils";
import { deleteProduct } from "../services/ProductService";

type ProductDetailProps = {
  product: Product;
};

export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await deleteProduct(+params.id);
    // Redirect to products
    return redirect("/");
  }
}
export default function ProductDetail({ product }: ProductDetailProps) {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const isAvailable = product.availability;
  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <fetcher.Form
          action=""
          method="POST">
          <button
            type="submit"
            name="id"
            value={product.id}
            className={`${
              isAvailable ? " text-black" : "bg-red-500"
            }  rounded-xl w-full p-2 uppercase font-bold text-xs text-center border border-black-100 hover:cursor-pointer`}>
            {isAvailable ? "Disponible" : "No Disponible"}
          </button>
        </fetcher.Form>
      </td>
      <td className="p-3 text-lg text-gray-800">
        <div className="flex gap-2 items-center">
          {/* <Link
            to={`/products/${product.id}/edit`}
            className="bg-indigo-600 text-white rounded-xl w-full p-2 uppercase font-bold text-xs text-center">
            Editar
          </Link> */}
          <button
            onClick={() => navigate(`/products/${product.id}/edit`)}
            className="bg-indigo-600 text-white rounded-xl w-full p-2 uppercase font-bold text-xs text-center">
            Editar
          </button>
          <Form
            className="w-full"
            method="POST"
            // se coloca este action ya que no existe una ruta para eliminar productos entonces se hace directamente desde los componentes
            action={`products/${product.id}/delete`}
            // este onSubmit se coloca para que se muestre un mensaje de confirmación antes de eliminar el producto, se ejecuta antes del action
            onSubmit={(event) => {
              if (!confirm("¿Estás seguro de eliminar este producto?")) {
                event.preventDefault();
              }
            }}>
            <button className="bg-red-500 text-white rounded-xl w-full p-2 uppercase font-bold text-xs text-center">
              Eliminar
            </button>
          </Form>
        </div>
      </td>
    </tr>
  );
}
