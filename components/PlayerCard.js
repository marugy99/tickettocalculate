import { useState } from "react";
import Modal from "../components/Modal";
import RouteCalculator from "../components/RouteCalculator";
import ColorPicker from "../components/ColorPicker";
import DestinationTickets from "../components/DestinationTickets";
import StationCalculator from "../components/StationCalculator";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoColorFillOutline } from "react-icons/io5";

const PlayerCard = ({ name, deletePlayer }) => {
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
    points: 0
  });
  const [totalPoints, setTotalPoints] = useState(0);

  const handleRoutePoints = (value, multiplyBy, action) => {
    const total = 1 * multiplyBy;
    if (action === "add") {
      setRouteInfo({
        points: routeInfo.points + total,
        routeLength: routeInfo.routeLength + value,
      });
      setTotalPoints(totalPoints + total)
    } else if (
      action === "deduct" &&
      !(routeInfo.points <= 0) &&
      !(routeInfo.points < total)
    ) {
      setRouteInfo({
        points: routeInfo.points - total,
        routeLength: routeInfo.routeLength - value,
      });
      setTotalPoints(totalPoints - total)
    }
  };

  const handleDestinationPoints = (name, points, action) => {
    const ticketExists = destinationTickets.some(
      (ticket) => ticket.name == name
    );

    const ticketExistsWithAction = destinationTickets.some(
      (ticket) => ticket.name == name && ticket.action != "Failed"
    );
        
    // TODO: Refactor the "Done" and "Failed" logic
    if (action === "Done") {
      if(!ticketExists) {
        setDestinationPoints(destinationPoints + points)
        setTotalPoints(totalPoints + points)
      } else if (!ticketExistsWithAction) {
        setDestinationPoints(destinationPoints + (points * 2))
        setTotalPoints(totalPoints + (points * 2))
      }
      
      
    } else if (action === "Failed") {
      if(!ticketExists) {
        setDestinationPoints(destinationPoints + -points)
        setTotalPoints(totalPoints + -points)
      } else if (ticketExistsWithAction) {
        setDestinationPoints(destinationPoints + (-points * 2))
        setTotalPoints(totalPoints + (-points * 2))
      }
    }


    if (!ticketExists) {
      setDestinationTickets([
        {
          name: name,
          points: points,
          action: action,
        },
        ...destinationTickets,
      ]);
    } else {
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

    if (action === "Done") {
      setDestinationPoints(destinationPoints - points);
      setTotalPoints(totalPoints - points);
    } else if (action === "Failed") {
      setDestinationPoints(destinationPoints + points);
      setTotalPoints(totalPoints + points);
    }
  };

  const handleStationPoints = (action) => {
    if(action === "add" && !(stationPoints.amount === 3)) {

      setStationPoints({
        amount: stationPoints.amount + 1,
        points: (stationPoints.amount + 1) * 4
      })

      setTotalPoints(totalPoints + (1 * 4))

    } else if (action === "deduct" && !(stationPoints.amount === 0)) {
      setStationPoints({
        amount: stationPoints.amount - 1,
        points: (stationPoints.amount - 1) * 4
      })
      setTotalPoints(totalPoints - (1 * 4))
    }
  }

  return (
    <div
      className={`rounded bg-white bg-gradient-to-r p-1.5 mx-4 lg:mx-5 ${
        playerColor == "" ? "from-slate-50 to-slate-300" : playerColor
      } `}
    >
      <article className="relative h-full rounded bg-slate-800 py-8 px-6 text-white shadow-xl">
        <div className="absolute right-4 top-3 flex gap-2">
          <button onClick={() => setIsOpen("picker")} aria-label="Change color">
            <IoColorFillOutline className="h-5 w-5 text-slate-500 hover:text-slate-200" />
          </button>
          <button onClick={deletePlayer} aria-label="Delete player">
            <RiDeleteBin5Line className="h-5 w-5 text-slate-500 hover:text-rose-500" />
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
            {destinationTickets.length > 0 ?
              <ul className="mt-4 flex flex-wrap gap-1 text-center">
                {destinationTickets.map((ticket, index) => (
                  // TODO: Make this a separate component
                  <li
                    key={index}
                    className={`w-full rounded ${
                      ticket.action === "Done"
                        ? "bg-lime-100 text-lime-900"
                        : "bg-rose-100 text-rose-800"
                    } py-1 px-2 text-base md:text-xs`}
                  >
                    {ticket.name}{" "}
                    <span className="font-bold">
                      {ticket.action === "Done" ? "+" : "-"}
                      {ticket.points}
                    </span>
                  </li>
                ))}  
              </ul> :
                <p className="mt-2 text-center text-sm italic text-slate-400 xl:text-left">
                  No tickets yet.
                </p>
            }
          </section>
          <section className="border-slate-500 border-t pt-3">
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
          <section className="flex items-center gap-2 border-slate-500 border-t pt-4">
            <input onChange={(e) => e.target.checked ? setTotalPoints(totalPoints + 10) : setTotalPoints(totalPoints - 10)} id={`longest-path-${name}`} type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded-sm" />
            <label htmlFor={`longest-path-${name}`} className="font-medium text-white text-lg">
              Longest path
              </label>
          </section>
        </div>
        <p className="mt-6 text-2xl font-semibold text-right">Total: {totalPoints}</p>


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
              setTotalPoints(totalPoints - routeInfo.points)
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
          <section className="mt-6 bg-slate-700 py-4 px-4 rounded">
            <p className="sm:text-lg text-white font-semibold">Tickets for <span className="capitalize">{name}</span></p>
            {destinationTickets.length == 0 && <p className="text-white italic mt-2">No tickets yet.</p>}
            <ul className="mt-4 flex flex-wrap gap-2">
              {destinationTickets.length > 0 &&
                destinationTickets.map((ticket, index) => (
                  // Make this a separate component
                  <li
                    key={index}
                    className={`w-full rounded ${
                      ticket.action === "Done"
                        ? "bg-lime-100 text-lime-900"
                        : "bg-rose-100 text-rose-800"
                    } flex justify-between py-2 px-4 text-sm sm:text-base`}
                  >
                    <p>
                      {ticket.name}
                      <span className="ml-2 font-bold">
                        {ticket.action === "Done" ? "+" : "-"}
                        {ticket.points}
                      </span>
                    </p>
                    <button
                      aria-label="Delete ticket"
                      onClick={() =>
                        deleteTicket(ticket.name, ticket.points, ticket.action)
                      }
                    >
                      <RiDeleteBin5Line className="h-4 w-4 sm:h-5 sm:w-5 text-slate-500 hover:text-rose-700" />
                    </button>
                  </li>
                ))}
            </ul>
            <p className="mt-6 sm:text-lg font-semibold text-slate-400">
              Total points: {destinationPoints}
            </p>
          </section>

          <DestinationTickets
            handleDestinationPoints={(e) =>
              handleDestinationPoints(
                e.target.dataset.ticket,
                parseInt(e.target.value),
                e.target.dataset.action
              )
            }
          />
        </Modal>
        <Modal 
          isOpen={isOpen === "station"}
          closeModal={() => setIsOpen(false)}
          title="Stations"
          key="Stations"
        >
          <p className="mt-2 text-center text-lg text-slate-400">
            How many stations <span className="capitalize">{name}</span> didn't use?
          </p>
          <StationCalculator 
            handleStationPoints={(e) => handleStationPoints(e.target.dataset.action)} 
            stationPoints={stationPoints} 
            name={name} 
          />
        </Modal>
      </article>
    </div>
  );
};

export default PlayerCard;
