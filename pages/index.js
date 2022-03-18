import Head from "next/head";
import { useState } from "react";
import PlayerCard from "../components/PlayerCard";

const Home = () => {
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([]);

  const addPlayer = (e) => {
    e.preventDefault();

    if (name) {
      setPlayers([
        {
          playerName: name,
        },
        ...players,
      ]);

      setName("");
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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="container mx-auto pt-10 text-center px-4 sm:px-0">
        <img
          className="mx-auto h-20 w-20"
          src="/train-ticket.svg"
          alt="Train ticket icon"
          aria-hidden="true"
        />

        <h1 className="my-4 text-4xl sm:text-5xl font-bold text-white">
          Ticket to Ride Calculator
        </h1>
        <form action="#" onSubmit={(e) => addPlayer(e)} className="flex items-center justify-center gap-2 flex-wrap">
          <input
            type="text"
            className="rounded bg-gray-100 py-2 px-4 w-full sm:w-auto"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button className="rounded bg-gradient-to-r from-indigo-500 to-sky-500 py-2 px-4 font-semibold text-white hover:from-indigo-700">
            Add new player
          </button>
        </form>
      </header>
      <div className="container mx-auto mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
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
