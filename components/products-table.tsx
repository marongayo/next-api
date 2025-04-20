import React, { useEffect, useState } from "react";
import UserTable from "./user-table";

const ProductsList = ({
  onEditClick,
}: {
  onEditClick: (product: any) => void;
}) => {
  const [products, setProducts] = useState<any[]>([]);
  const [productToEdit, setProductToEdit] = useState<any>({});
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();

      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Created By</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <UserTable id={product.createdBy} />
              </td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <button
                  className="btn btn-ghost btn-xs"
                  onClick={() => onEditClick(product)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsList;
