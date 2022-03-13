import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const Modal = ({ isOpen, closeModal, title, children }) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        onClose={closeModal}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="mx-auto my-16 w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-200 p-6 text-left align-middle shadow-xl transition-all">
            <Dialog.Title className="text-2xl font-bold capitalize">
              {title}
            </Dialog.Title>

            {children}

            <button
              onClick={closeModal}
              className="mt-6 rounded-md bg-gray-600 py-2 px-4 text-white hover:bg-gray-800"
            >
              Close
            </button>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default Modal;
