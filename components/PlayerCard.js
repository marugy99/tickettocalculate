import { useState } from "react";
import Modal from "../components/Modal";
import RouteCalculator from "../components/RouteCalculator";

const PlayerCard = ({ name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [routePoints, setRoutePoints] = useState(0);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleRoutePoints = (value, multiplyBy, action) => {
    const total = 1 * multiplyBy;
    if (action === "add") {
      setRoutePoints(routePoints + total);
    } else if (
      action === "deduct" &&
      !(routePoints <= 0) &&
      !(routePoints < multiplyBy)
    ) {
      setRoutePoints(routePoints - total);
    }
  };

  return (
    <section className="rounded bg-slate-300 p-6">
      <h2 className="text-2xl font-bold capitalize">{name}</h2>

      <p>Route points: {routePoints}</p>
      <button
        className="mt-4 rounded bg-cyan-600 py-2 px-4 text-white"
        onClick={openModal}
      >
        Modify route points
      </button>

      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        title={`Route points for ${name}`}
        key={name}
      >
        <RouteCalculator
          routePoints={routePoints}
          handleRoutePoints={(e) =>
            handleRoutePoints(
              e.target.value,
              e.target.dataset.multiply,
              e.target.dataset.action
            )
          }
          resetRoutePoints={() => setRoutePoints(0)}
          key={name}
        />
      </Modal>
    </section>
  );
};

export default PlayerCard;
