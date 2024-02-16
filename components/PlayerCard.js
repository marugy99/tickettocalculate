import { useState } from "react";
import Modal from "../components/Modal";
import RouteCalculator from "../components/RouteCalculator";
import ColorPicker from "../components/ColorPicker";
import DestinationTickets from "../components/DestinationTickets";
import DestinationTicketsList from "../components/DestinationTicketsList";
import StationCalculator from "../components/StationCalculator";
import { IoColorFillOutline, IoTrashOutline } from "react-icons/io5";

const PlayerCard = ({
  name,
  deletePlayer,
  parentCallback,
  totalPoints,
  gameMap,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [playerColor, setPlayerColor] = useState("");
  const [routeInfo, setRouteInfo] = useState({
    points: 0,
    routeLength: 0,
  });
  const [destinationTickets, setDestinationTickets] = useState([]);
  const [destinationPoints, setDestinationPoints] = useState(0);
  const [stationPoints, setStationPoints] = useState({
    amount: 0,
    points: 0,
  });

  const updateTotal = (action, value) => {
    if (action === "+") {
      parentCallback(name, totalPoints + value);
    } else if (action === "-") {
      parentCallback(name, totalPoints - value);
    }
  };

  const handleRoutePoints = (value, multiplyBy, action) => {
    const total = 1 * multiplyBy;

    if (action === "add") {
      setRouteInfo({
        points: routeInfo.points + total,
        routeLength: routeInfo.routeLength + value,
      });
      updateTotal("+", total);
    } else if (
      action === "deduct" &&
      !(routeInfo.points <= 0) &&
      !(routeInfo.points < total)
    ) {
      setRouteInfo({
        points: routeInfo.points - total,
        routeLength: routeInfo.routeLength - value,
      });
      updateTotal("-", total);
    }
  };

  const handleDestinationPoints = (name, points, action) => {
    const ticketExists = destinationTickets.some(
      (ticket) => ticket.name == name
    );

    const ticketExistsWithAction = destinationTickets.some(
      (ticket) => ticket.name == name && ticket.action != "Failed"
    );

    if (action === "Done") {
      if (!ticketExists) {
        setDestinationPoints(destinationPoints + points);
        updateTotal("+", points);
      } else if (!ticketExistsWithAction) {
        // If the same ticket already exists with a "Failed" action, add double points to make it a positive number
        const doublePoints = points * 2;
        setDestinationPoints(destinationPoints + doublePoints);
        updateTotal("+", doublePoints);
      }
    } else if (action === "Failed") {
      if (!ticketExists) {
        setDestinationPoints(destinationPoints + -points);
        updateTotal("+", -points);
      } else if (ticketExistsWithAction) {
        // If the same ticket already exists with a "Done" action, deduct double points to make it a negative number
        const doublePoints = -points * 2;
        setDestinationPoints(destinationPoints + doublePoints);
        updateTotal("+", doublePoints);
      }
    }
  };

  const handleDestinationTickets = (name, points, action) => {
    const ticketExists = destinationTickets.some(
      (ticket) => ticket.name == name
    );

    if (!ticketExists) {
      // If ticket doesn't exist, add it to the destination tickets object
      setDestinationTickets([
        {
          name: name,
          points: points,
          action: action,
        },
        ...destinationTickets,
      ]);
    } else {
      // If ticket already exists and the action was changed, update same ticket with new action
      setDestinationTickets((prevState) =>
        prevState.map((ticket) =>
          ticket.name === name ? { ...ticket, action: action } : ticket
        )
      );
    }
  };

  const deleteTicket = (name, points, action) => {
    const updatedTickets = destinationTickets.filter(
      (ticket) => ticket.name != name
    );

    setDestinationTickets(updatedTickets);

    // Update points accordingly
    if (action === "Done") {
      setDestinationPoints(destinationPoints - points);
      updateTotal("-", points);
    } else if (action === "Failed") {
      setDestinationPoints(destinationPoints + points);
      updateTotal("+", points);
    }
  };

  const handleStationPoints = (action) => {
    if (action === "add" && !(stationPoints.amount === 3)) {
      setStationPoints({
        amount: stationPoints.amount + 1,
        points: (stationPoints.amount + 1) * 4,
      });
      updateTotal("+", 1 * 4);
    } else if (action === "deduct" && !(stationPoints.amount === 0)) {
      setStationPoints({
        amount: stationPoints.amount - 1,
        points: (stationPoints.amount - 1) * 4,
      });
      updateTotal("-", 1 * 4);
    }
  };

  return (
    <div
      className={`mx-4 min-h-full rounded bg-white bg-gradient-to-r p-1.5 lg:mx-5 ${
        playerColor == "" ? "from-slate-50 to-slate-300" : playerColor
      } `}
    >
      <article className="relative min-h-full rounded bg-slate-800 py-8 px-6 text-white shadow-xl">
        <div className="absolute right-4 top-3 flex gap-2">
          <button onClick={() => setIsOpen("picker")} aria-label="Change color">
            <IoColorFillOutline className="h-5 w-5 text-slate-500 hover:text-slate-200" />
          </button>
          <button onClick={deletePlayer} aria-label="Delete player">
            <IoTrashOutline className="h-5 w-5 text-slate-500 hover:text-rose-500" />
          </button>
        </div>

        <h2 className="-mt-2 mb-3 text-center text-2xl font-bold capitalize">
          {name}
        </h2>

        <div className="space-y-6">
          <section>
            <div className="flex flex-col items-center justify-between gap-2 2xl:flex-row">
              <h3 className="text-xl font-bold">Routes</h3>
              <button
                className="rounded bg-slate-700 py-2 px-4 text-sm font-semibold text-white hover:bg-slate-600"
                onClick={() => setIsOpen("routes")}
              >
                Edit
              </button>
            </div>
            <p className="mt-4 text-center text-base xl:text-left">
              Points: <span className="font-bold">{routeInfo.points}</span>
            </p>
            <p className="mt-2 text-center text-sm italic text-slate-400 xl:text-left">
              {routeInfo.routeLength} trains used.
            </p>
          </section>

          <section className="border-t border-slate-500 pt-3">
            <div className="flex flex-col items-center justify-between gap-2 2xl:flex-row">
              <h3 className="text-xl font-bold">Destinations</h3>
              <button
                className="rounded bg-slate-700 py-2 px-4 text-sm font-semibold text-white hover:bg-slate-600"
                onClick={() => setIsOpen("destination")}
              >
                Edit
              </button>
            </div>
            {destinationTickets.length > 0 ? (
              <ul className="mt-4 space-y-1 text-center text-base md:text-xs">
                {destinationTickets.map((ticket, index) => (
                  <DestinationTicketsList
                    key={index}
                    action={ticket.action}
                    name={ticket.name}
                    points={ticket.points}
                  />
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-center text-sm italic text-slate-400 xl:text-left">
                No tickets yet.
              </p>
            )}
          </section>

          <section className="border-t border-slate-500 pt-3">
            <div className="flex flex-col items-center justify-between gap-2 2xl:flex-row">
              <h3 className="text-xl font-bold">Stations</h3>
              <button
                className="rounded bg-slate-700 py-2 px-4 text-sm font-semibold text-white hover:bg-slate-600"
                onClick={() => setIsOpen("station")}
              >
                Edit
              </button>
            </div>
            <p className="mt-4 text-center text-base xl:text-left">
              Points: <span className="font-bold">{stationPoints.points}</span>
            </p>
          </section>
          <section className="flex items-center gap-2 border-t border-slate-500 pt-4">
            <input
              onChange={(e) =>
                e.target.checked ? updateTotal("+", 10) : updateTotal("-", 10)
              }
              id={`longest-path-${name}`}
              type="checkbox"
              className="h-4 w-4 rounded-sm border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor={`longest-path-${name}`}
              className="text-lg font-medium text-white"
            >
              Longest path
            </label>
          </section>
        </div>

        <p className="mt-6 text-right text-2xl font-semibold">
          Total: {totalPoints}
        </p>

        <Modal
          isOpen={isOpen === "routes"}
          closeModal={() => setIsOpen(false)}
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
              updateTotal("-", routeInfo.points);
            }}
            key={name}
          />
        </Modal>

        <Modal
          isOpen={isOpen === "picker"}
          closeModal={() => setIsOpen(false)}
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

        <Modal
          isOpen={isOpen === "destination"}
          closeModal={() => setIsOpen(false)}
          title="Destination Tickets"
          key="Destination Tickets"
        >
          <section className="mt-6 rounded bg-slate-700 py-4 px-4">
            <p className="font-semibold text-white sm:text-lg">
              Tickets for <span className="capitalize">{name}</span>
            </p>
            {destinationTickets.length == 0 && (
              <p className="mt-2 italic text-white">No tickets yet.</p>
            )}
            <ul className="mt-4 space-y-2 text-sm sm:text-base">
              {destinationTickets.length > 0 &&
                destinationTickets.map((ticket, index) => (
                  <DestinationTicketsList
                    key={index}
                    action={ticket.action}
                    name={ticket.name}
                    points={ticket.points}
                  >
                    <button
                      aria-label="Delete ticket"
                      onClick={() =>
                        deleteTicket(ticket.name, ticket.points, ticket.action)
                      }
                    >
                      <IoTrashOutline className="h-4 w-4 text-slate-500 hover:text-rose-700 sm:h-5 sm:w-5" />
                    </button>
                  </DestinationTicketsList>
                ))}
            </ul>
            <p className="mt-6 font-semibold text-slate-400 sm:text-lg">
              Total points: {destinationPoints}
            </p>
          </section>

          <DestinationTickets
            handleDestination={(e) => {
              handleDestinationPoints(
                e.target.dataset.ticket,
                parseInt(e.target.value),
                e.target.dataset.action
              );

              handleDestinationTickets(
                e.target.dataset.ticket,
                parseInt(e.target.value),
                e.target.dataset.action
              );
            }}
            gameMap={gameMap}
          />
        </Modal>

        <Modal
          isOpen={isOpen === "station"}
          closeModal={() => setIsOpen(false)}
          title="Stations"
          key="Stations"
        >
          <p className="mt-2 text-center text-lg text-slate-400">
            How many stations <span className="capitalize">{name}</span> didn't
            use?
          </p>
          <StationCalculator
            handleStationPoints={(e) =>
              handleStationPoints(e.target.dataset.action)
            }
            stationPoints={stationPoints}
            name={name}
          />
        </Modal>
      </article>
    </div>
  );
};

export default PlayerCard;
