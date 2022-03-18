import Head from "next/head";
import { useState } from "react";
import PlayerCard from "../components/PlayerCard";

const Home = () => {
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([]);

  const addPlayer = (e) => {
    e.preventDefault();

    const nameExists = players.some(
      (player) => player.playerName == name
    );

    if (name && !nameExists) {
      setPlayers([
        {
          playerName: name,
        },
        ...players,
      ]);

      setName("");
    } else if (nameExists) {
      setName("exists")
    }
  };

  const deletePlayer = (name) => {
    const updatedPlayers = players.filter(
      (player) => player.playerName != name
    );

    setPlayers(updatedPlayers);
  };

  return (
    <main className="isolate min-h-screen w-full bg-slate-900 flex flex-col">
      <Head>
        <title>Ticket to Ride Calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="container mx-auto pt-10 text-center px-4 sm:px-0 flex-1">
        <img
          className="mx-auto h-20 w-20"
          src="/train-ticket.svg"
          alt="Train ticket icon"
          aria-hidden="true"
        />

        <h1 className="my-4 text-4xl sm:text-5xl font-bold text-white">
          Ticket to Ride Calculator
        </h1>
        <form action="#" onSubmit={(e) => addPlayer(e)} className="flex items-start justify-center gap-2 flex-wrap">
          <div>
            <input
              type="text"
              className="rounded bg-gray-100 py-2 px-4 w-full sm:w-auto"
              placeholder="Enter name"
              value={name === "exists" ? "" : name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {name === "exists" && <p className="text-rose-400 text-sm mt-4">This name already exists. Enter a different one.</p>}
          </div>
          <button className="rounded bg-gradient-to-r from-indigo-500 to-sky-500 py-2 px-4 font-semibold text-white hover:from-indigo-700">
            Add new player
          </button>
        </form>
      </header>
      <div className="container mx-auto mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 flex-grow pb-4">
        {players.map((player, index) => (
          <PlayerCard
            name={player.playerName}
            deletePlayer={() => deletePlayer(player.playerName)}
            key={player.playerName}
          />
        ))}
      </div>
      <footer className="text-white text-sm text-center flex-1 py-4 grid place-items-center">
        Made with ♡ by Maru
      </footer>
    </main>
  );
};

export default Home;
