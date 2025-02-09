import { Link, useLoaderData } from "react-router-dom";
import { getProducts } from "../services/ProductService";
import { Product } from "../types";
import ProductDetail from "../components/ProductDetail";

export async function loader() {
  // obtener productos
  const products = await getProducts();
  return products;
}

export default function Products() {
  const products = useLoaderData() as Product[];
  console.log(products);
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-4xl font-black text-slate-500">Productos</h1>
        <Link
          to={"/products/new"}
          className="rounded-md bg-indigo-700 p-3 text-sm font-bold text-white shadow-md hover:bg-indigo-500">
          Nuevo producto
        </Link>
      </div>
      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2">Producto</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Disponibilidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductDetail
                key={product.id}
                product={product}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
