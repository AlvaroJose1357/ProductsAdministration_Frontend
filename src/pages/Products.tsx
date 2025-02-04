import { Link } from "react-router-dom";

export default function Products() {
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
    </>
  );
}
