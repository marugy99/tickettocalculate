import { useState } from "react";
import Modal from "../components/Modal";
import RouteCalculator from "../components/RouteCalculator";
import ColorPicker from "../components/ColorPicker";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoColorFillOutline } from "react-icons/io5";

const PlayerCard = ({ name, deletePlayer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [playerColor, setPlayerColor] = useState("");
  const [routeInfo, setRouteInfo] = useState({
    points: 0,
    routeLength: 0,
  });

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = (value) => {
    setIsOpen(value);
  };

  const handleRoutePoints = (value, multiplyBy, action) => {
    const total = 1 * multiplyBy;
    if (action === "add") {
      setRouteInfo({
        points: routeInfo.points + total,
        routeLength: routeInfo.routeLength + value,
      });
    } else if (
      action === "deduct" &&
      !(routeInfo.points <= 0) &&
      !(routeInfo.points < multiplyBy)
    ) {
      setRouteInfo({
        points: routeInfo.points - total,
        routeLength: routeInfo.routeLength - value,
      });
    }
  };

  return (
    <div
      className={`rounded bg-white bg-gradient-to-r p-1.5 ${
        playerColor == "" ? "from-slate-50 to-slate-300" : playerColor
      } `}
    >
      <article className="relative rounded bg-slate-800 py-8 px-6 text-white shadow-xl">
        <div className="absolute right-4 top-3 flex gap-2">
          <button onClick={() => openModal("picker")} aria-label="Change color">
            <IoColorFillOutline className="h-5 w-5 text-slate-500 hover:text-slate-200" />
          </button>
          <button onClick={deletePlayer} aria-label="Delete player">
            <RiDeleteBin5Line className="h-5 w-5 text-slate-500 hover:text-rose-500" />
          </button>
        </div>

        <h2 className="-mt-2 mb-3 text-center text-2xl font-bold capitalize">
          {name}
        </h2>

        <div className="items-start justify-between xl:flex">
          <section className="flex-1 border-b border-slate-500 pb-3 xl:border-r xl:border-b-0 xl:pr-4 xl:pb-0">
            <div className="flex flex-col items-center justify-between gap-2 2xl:flex-row">
              <h3 className="text-xl font-bold">Routes</h3>
              <button
                className="rounded bg-slate-700 py-2 px-4 text-sm font-semibold text-white hover:bg-slate-600"
                onClick={() => openModal("routes")}
              >
                Modify
              </button>
            </div>
            <p className="mt-4 text-center text-lg xl:text-left">
              Points: <span className="font-bold">{routeInfo.points}</span>
            </p>
            <p className="mt-2 text-center text-base text-slate-400 xl:text-left">
              Length: <span className="font-bold">{routeInfo.routeLength}</span>
            </p>
          </section>

          <section className="mt-3 flex-1 xl:mt-0">
            <div className="flex flex-col items-center justify-between gap-2 xl:ml-4 2xl:flex-row">
              <h3 className="text-xl font-bold">Destinations</h3>
              <button
                className="rounded bg-slate-700 py-2 px-4 text-sm font-semibold text-white hover:bg-slate-600"
                onClick={() => openModal("destination")}
              >
                Modify
              </button>
            </div>
          </section>
        </div>

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
            routeInfo={routeInfo}
            handleRoutePoints={(e) =>
              handleRoutePoints(
                parseInt(e.target.value),
                e.target.dataset.multiply,
                e.target.dataset.action
              )
            }
            resetRoutePoints={() => {
              setRouteInfo({
                points: 0,
                routeLength: 0,
              });
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
          <p className="mt-2 text-center text-lg text-slate-400">
            Pick a color for <span className="capitalize">{name}</span>.
          </p>
          <ColorPicker
            captureColor={(e) => setPlayerColor(e.target.value)}
            currentColor={playerColor}
          />
        </Modal>
      </article>
    </div>
  );
};

export default PlayerCard;
