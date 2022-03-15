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
    <div className="flex min-h-screen bg-slate-900 py-2">
      <Head>
        <title>Ticket to Ride Calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="isolate m-6 min-h-max w-full p-8 text-center">
        <img
          className="mx-auto h-20 w-20"
          src="/train-ticket.svg"
          alt="Train ticket icon"
          aria-hidden="true"
        />

        <h1 className="my-4 text-5xl font-bold text-white">
          Ticket to Ride Calculator
        </h1>
        <form action="#" onSubmit={(e) => addPlayer(e)}>
          <input
            type="text"
            className="mr-4 rounded bg-gray-100 py-2 px-4"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button className="rounded bg-gradient-to-r from-indigo-500 to-sky-500 py-2 px-4 font-semibold text-white">
            Add new player
          </button>
        </form>
        <div className="mt-10 grid grid-cols-3 gap-8">
          {players.map((player, index) => (
            <PlayerCard
              name={player.playerName}
              deletePlayer={() => deletePlayer(player.playerName)}
              key={player.playerName}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
