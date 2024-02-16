import { useState } from "react";
import { getGameMapTickets, getGameMapTitle } from "../maps/helpers";

const DestinationTickets = ({ handleDestination, gameMap }) => {
  const allTickets = getGameMapTickets(gameMap);

  const [tickets, setTickets] = useState(allTickets);

  const filterTickets = (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredTickets = allTickets.filter((ticket) =>
      ticket.name.toLowerCase().includes(searchString)
    );

    setTickets(filteredTickets);
  };

  return (
    <div>
      <input
        type="text"
        className="mt-4 w-full rounded bg-slate-100 py-2 px-4 text-sm sm:text-base"
        placeholder="Search tickets"
        onKeyUp={filterTickets}
      />
      <p className="mt-6 text-slate-300">
        Tickets from {getGameMapTitle(gameMap)}.
      </p>
      <ul className="mt-4 rounded border border-slate-400 bg-slate-700 text-white">
        {tickets.map((ticket, index) => (
          <li
            key={index}
            className="flex flex-col items-center justify-between gap-2 border-b border-slate-400 py-2 px-4 sm:flex-row"
          >
            <p className="text-center text-sm font-semibold sm:text-left sm:text-lg">
              {ticket.name}{" "}
              <span className="ml-3 font-normal">({ticket.points} points)</span>
            </p>
            <div className="flex items-center gap-2 text-slate-900">
              <button
                value={ticket.points}
                data-ticket={ticket.name}
                data-action="Done"
                onClick={handleDestination}
                className="rounded bg-lime-500 py-2 px-4 text-sm font-semibold hover:bg-lime-400 sm:text-base"
              >
                Done +
              </button>
              <button
                value={ticket.points}
                data-ticket={ticket.name}
                data-action="Failed"
                onClick={handleDestination}
                className="rounded bg-rose-500 py-2 px-4 text-sm font-semibold hover:bg-rose-400 sm:text-base"
              >
                Failed -
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DestinationTickets;
