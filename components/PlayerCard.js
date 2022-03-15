import { useState } from "react";
import Modal from "../components/Modal";
import RouteCalculator from "../components/RouteCalculator";
import ColorPicker from "../components/ColorPicker";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoColorFillOutline } from "react-icons/io5";

const PlayerCard = ({ name, deletePlayer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [routePoints, setRoutePoints] = useState(0);
  const [routeLength, setRouteLength] = useState(0);
  const [playerColor, setPlayerColor] = useState("");

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = (value) => {
    setIsOpen(value);
  };

  const handleRoutePoints = (value, multiplyBy, action) => {
    const total = 1 * multiplyBy;
    if (action === "add") {
      setRoutePoints(routePoints + total);
      setRouteLength(routeLength + value);
    } else if (
      action === "deduct" &&
      !(routePoints <= 0) &&
      !(routePoints < multiplyBy)
    ) {
      setRoutePoints(routePoints - total);
      setRouteLength(routeLength - value);
    }
  };

  return (
    <div
      className={`rounded bg-white bg-gradient-to-r p-1 ${
        playerColor == "" ? "from-indigo-500 to-sky-500" : playerColor
      } `}
    >
      <section className="relative rounded bg-slate-800 py-8 px-6 text-white shadow-xl">
        <div className="absolute right-4 top-3 flex gap-2">
          <button onClick={() => openModal("picker")}>
            <IoColorFillOutline className="h-5 w-5 text-slate-500 hover:text-purple-700" />
          </button>
          <button onClick={deletePlayer}>
            <RiDeleteBin5Line className="h-5 w-5 text-slate-500 hover:text-rose-700" />
          </button>
        </div>

        <h2 className="-mt-2 text-2xl font-bold capitalize">{name}</h2>

        <p>Route points: {routePoints}</p>
        <button
          className="mt-4 rounded bg-sky-600 py-2 px-4 font-semibold text-white hover:bg-sky-700"
          onClick={() => openModal("routes")}
        >
          Modify route points
        </button>

        <Modal
          isOpen={isOpen === "routes"}
          closeModal={closeModal}
          title={`Route points for ${name}`}
          key={name}
        >
          <p className="mt-2 text-center text-lg text-slate-400">
            Add or deduct the amount of trains per route.
          </p>
          <RouteCalculator
            routePoints={routePoints}
            routeLength={routeLength}
            handleRoutePoints={(e) =>
              handleRoutePoints(
                parseInt(e.target.value),
                e.target.dataset.multiply,
                e.target.dataset.action
              )
            }
            resetRoutePoints={() => {
              setRoutePoints(0);
              setRouteLength(0);
            }}
            key={name}
          />
        </Modal>

        <Modal
          isOpen={isOpen === "picker"}
          closeModal={closeModal}
          title="Player color"
          key="Color picker"
        >
          <ColorPicker captureColor={(e) => setPlayerColor(e.target.value)} />
        </Modal>
      </section>
    </div>
  );
};

export default PlayerCard;
