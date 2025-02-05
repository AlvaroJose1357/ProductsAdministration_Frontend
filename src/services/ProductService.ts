type ProductDataProps = {
  [k: string]: FormDataEntryValue;
};

export async function addProduct(data: ProductDataProps) {
  console.log("Adding product", data);
}
