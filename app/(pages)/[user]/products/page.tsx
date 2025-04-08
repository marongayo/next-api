"use client";
import React, { useEffect, useState, useRef } from "react";
import {postProduct} from '@/lib/utils/actions'
import { usePathname } from "next/navigation";

const page = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const pathname =usePathname()

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const handleClick = function () {
    modalRef.current?.showModal();
  };
  const handleSaveNewProducts = async function(e:React.MouseEvent<HTMLButtonElement>){
    e.preventDefault
    const data = {name: name, price:price,description:description,}    
      const pathSegments = pathname.split('/');
      const userId = pathSegments[1];

    console.log(data, userId)
    await postProduct(userId, data)

    
  }
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn" onClick={handleClick}>
        open modal
      </button>
      <dialog id="my_modal_1" className="modal" ref={modalRef}>
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-2">Add New Product</h3>

      <div className="flex">
      <input
            type="text"
            placeholder="Product Name"
            className="input mb-4 mr-3 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price (KES)"
            className="input mb-4 ml-3 w-full"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
      </div>
          <fieldset className="fieldset" >
            <legend className="fieldset-legend">Product Description</legend>
            <textarea
              className="textarea h-24 w-full"
              placeholder="Description"
              value={description}
              onChange={e=>setDescription(e.target.value)}
            ></textarea>
            <div className="fieldset-label">Optional</div>
          </fieldset>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn w-full" onClick={e=>handleSaveNewProducts(e)}>Add Product</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default page;
