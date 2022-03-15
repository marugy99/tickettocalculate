import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { RiCloseCircleLine } from "react-icons/ri";

const Modal = ({ isOpen, closeModal, title, children }) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        onClose={closeModal}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <Dialog.Overlay className="fixed inset-0 grid place-items-center bg-black opacity-50" />
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="mx-4">
            <section className="container relative my-16 mx-auto transform overflow-hidden rounded bg-slate-800 p-8 text-left align-middle shadow-xl transition-all">
              <button
                onClick={closeModal}
                aria-label="Close modal"
                className="absolute right-1 top-3 rounded py-2 px-4 text-slate-400 hover:text-slate-200 md:right-2"
              >
                <RiCloseCircleLine className="text-3xl" />
              </button>
              <Dialog.Title className="mt-6 text-center text-2xl font-bold capitalize text-white md:mt-4 md:text-3xl">
                {title}
              </Dialog.Title>
              {children}
            </section>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default Modal;
