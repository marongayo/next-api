import React,{forwardRef} from "react";

interface ModalProps{
    children: React.ReactNode;
}

const Modal = forwardRef<HTMLDialogElement, ModalProps> (({children}, ref) => {
  return (
    <div>  
      <dialog id="my_modal_1" className="modal" ref={ref}>
        <div className="modal-box">
          
            <form method="dialog">
            {children}
              
            </form>
      
        </div>
      </dialog>
    </div>
  );
});

Modal.displayName = "Modal";
export default Modal;
