import { useState } from "react";

const DestinationTickets = ({ handleDestination }) => {
  const allTickets = [
    {
      name: "Amsterdam - Pamplona",
      points: 7,
    },
    {
      name: "Amsterdam - Wilno",
      points: 12,
    },
    {
      name: "Angora - Kharkov",
      points: 10,
    },
    {
      name: "Athinia - Angora",
      points: 5,
    },
    {
      name: "Barcelona - Bruxelles",
      points: 8,
    },
    {
      name: "Barcelona - Munchen",
      points: 8,
    },
    {
      name: "Berlin - Bucharesti",
      points: 8,
    },
    {
      name: "Berlin - Moskva",
      points: 12,
    },
    {
      name: "Berlin - Roma",
      points: 9,
    },
    {
      name: "Brest - Marseille",
      points: 7,
    },
    {
      name: "Brest - Petrograd",
      points: 20,
    },
    {
      name: "Brest - Venezia",
      points: 8,
    },
    {
      name: "Bruxelles - Danzig",
      points: 9,
    },
    {
      name: "Budapest - Sofia",
      points: 5,
    },
    {
      name: "Cadiz - Stockholm",
      points: 21,
    },
    {
      name: "Edinburgh - Athina",
      points: 21,
    },
    {
      name: "Edinburgh - Paris",
      points: 7,
    },
    {
      name: "Essen - Kyiv",
      points: 10,
    },
    {
      name: "Frankfurt - Kobenhavn",
      points: 5,
    },
    {
      name: "Frankfurt - Smolensk",
      points: 13,
    },
    {
      name: "Kobenhavn - Erzurum",
      points: 21,
    },
    {
      name: "Kyiv - Petrograd",
      points: 6,
    },
    {
      name: "Kyiv - Sochi",
      points: 8,
    },
    {
      name: "Lisboa - Danzig ",
      points: 20,
    },
    {
      name: "London - Berlin",
      points: 7,
    },
    {
      name: "London - Wien",
      points: 10,
    },
    {
      name: "Madrid - Dieppe",
      points: 8,
    },
    {
      name: "Madrid - Zurich",
      points: 8,
    },
    {
      name: "Marseille - Essen",
      points: 8,
    },
    {
      name: "Palermo - Constantinople",
      points: 8,
    },
    {
      name: "Palermo - Moskva",
      points: 20,
    },
    {
      name: "Paris - Wien",
      points: 8,
    },
    {
      name: "Paris - Zagrab",
      points: 7,
    },
    {
      name: "Riga - Bucuresti",
      points: 10,
    },
    {
      name: "Roma - Smyrna",
      points: 8,
    },
    {
      name: "Rostov - Erzurum",
      points: 5,
    },
    {
      name: "Sarajevo - Sevestopol",
      points: 8,
    },
    {
      name: "Smolensk - Rostov",
      points: 8,
    },
    {
      name: "Sofia - Smyrna",
      points: 5,
    },
    {
      name: "Stockholm - Wien",
      points: 11,
    },
    {
      name: "Venezia - Constantinople ",
      points: 10,
    },
    {
      name: "Warszawa - Smolensk",
      points: 6,
    },
    {
      name: "Zagrab - Brindisi",
      points: 6,
    },
    {
      name: "Zurich - Brindisi",
      points: 6,
    },
    {
      name: "Zurich - Budapest",
      points: 6,
    },
  ];

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
