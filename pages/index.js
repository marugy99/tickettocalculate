import Head from "next/head";
import { useState } from "react";
import PlayerCard from "../components/PlayerCard";

const Home = () => {
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([]);

  const addPlayer = (e) => {
    e.preventDefault();

    const nameExists = players.some((player) => player.playerName == name);

    if (name && !nameExists) {
      setPlayers([
        {
          playerName: name,
        },
        ...players,
      ]);

      setName("");
    } else if (nameExists) {
      setName(false);
    }
  };

  const deletePlayer = (name) => {
    const updatedPlayers = players.filter(
      (player) => player.playerName != name
    );

    setPlayers(updatedPlayers);
  };

  return (
    <main className="isolate min-h-screen w-full bg-slate-900">
      <Head>
        <title>Ticket to Ride Calculator</title>
        <meta
          name="description"
          content="Score calculator for the board game Ticket to Ride: Europe"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <header className="container mx-auto px-4 pt-10 text-center sm:px-0">
        <img
          className="mx-auto h-20 w-20"
          src="/train-ticket.svg"
          alt="Train ticket icon"
          aria-hidden="true"
        />
        <div>
          <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
            Ticket to Ride Calculator
          </h1>
          <p className="mt-4 text-center text-sm text-white">
            Made with ♡ by{" "}
            <a
              href="https://marucodes.com/"
              rel="noreferrer"
              target="_blank"
              className="inline-block hover:underline"
            >
              Maru
            </a>
          </p>
        </div>
        <form
          action="#"
          onSubmit={(e) => addPlayer(e)}
          className="mt-4 flex flex-wrap items-start justify-center gap-2"
        >
          <div>
            <input
              type="text"
              className="w-full rounded bg-gray-100 py-2 px-4 sm:w-auto"
              placeholder="Enter name"
              value={name === false ? "" : name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {name === false && (
              <p className="mt-4 text-sm text-rose-400">
                This name already exists. Enter a different one.
              </p>
            )}
          </div>
          <button className="rounded bg-gradient-to-r from-indigo-500 to-sky-500 py-2 px-4 font-semibold text-white hover:from-indigo-700">
            Add new player
          </button>
        </form>
      </header>
      <div className="container mx-auto mt-8 grid min-h-fit grid-cols-1 gap-4 pb-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        {players.map((player, index) => (
          <PlayerCard
            name={player.playerName}
            deletePlayer={() => deletePlayer(player.playerName)}
            key={player.playerName}
          />
        ))}
      </div>
    </main>
  );
};

export default Home;
