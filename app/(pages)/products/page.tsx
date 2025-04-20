"use client";
import React, { useRef, useState } from "react";
import { postProduct, patchProduct, getCurrentUser } from "@/lib/utils/actions";
import toast, { Toaster } from "react-hot-toast";
import Modal from "@/components/modal";
import ProductsList from "@/components/products-table";
import { useRouter } from "next/navigation";

const Page = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [productToEdit, setProductToEdit] = useState<any>(null);

  const openModal = (mode: "add" | "edit", product?: any) => {
    setModalMode(mode);
    if (product) {
      setProductToEdit(product);
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
    } else {
      setName("");
      setDescription("");
      setPrice(0);
    }
    modalRef.current?.showModal();
  };

  const handleSaveProduct = async (
    e: React.MouseEvent<HTMLButtonElement>,
    edit: boolean = false
  ) => {
    e.preventDefault();
    const user = await getCurrentUser()
    console.log("this is the user",user)
    const userID=user?._id
    const data = { name, price, description, createdBy:userID };
    modalRef.current?.close();
  
    // Choose the correct action based on mode
    const promise = edit
      ? patchProduct(productToEdit._id, data) // 👈 add the ID
      : postProduct(data);
  
    await toast.promise(promise, {
      loading: edit ? "Saving changes..." : "Saving product...",
      success: edit ? "Product updated!" : "Product saved successfully!",
      error: "Failed to save product. Try again.",
    });
  
    setName("");
    setDescription("");
    setPrice(0);
    router.refresh();
  };
  
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <button className="btn" onClick={() => openModal("add")}>
        Add Product
      </button>

      <Modal ref={modalRef}>
        <div className="flex gap-3">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Title</legend>
            <input
              type="text"
              className="input"
              placeholder="Type here"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p className="fieldset-label">Required</p>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Price</legend>
            <input
              className="input"
              placeholder="Type here"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
            <p className="fieldset-label">Required</p>
          </fieldset>
        </div>
        <div className="flex flex-col">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Description</legend>
            <textarea
              className="textarea h-24"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <div className="fieldset-label">Optional</div>
          </fieldset>
        </div>
        <div className="flex gap-3">
          <button
            className="btn grow"
            onClick={(e) => handleSaveProduct(e, modalMode === "edit")}
          >
            {modalMode === "add" ? "Add Product" : "Save Changes"}
          </button>

          <button
            className="btn grow"
            onClick={() => modalRef.current?.close()}
          >
            Exit
          </button>
        </div>
      </Modal>

      <ProductsList
        onEditClick={(product: any) => openModal("edit", product)}
      />
    </div>
  );
};

export default Page;
