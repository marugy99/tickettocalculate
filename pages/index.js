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

  return (
    <div className="flex min-h-screen py-2">
      <Head>
        <title>Ticket to Ride Calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="isolate m-6 min-h-max w-full rounded bg-white p-16 text-center opacity-70">
        <h1 className="my-4 text-6xl font-bold">Ticket to Ride Calculator</h1>
        <form action="#" onSubmit={(e) => addPlayer(e)}>
          <input
            type="text"
            className="mr-4 rounded bg-gray-200 py-2 px-4"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button className="rounded bg-purple-500 py-2 px-4 text-white">
            Add new player
          </button>
        </form>
        <div className="mt-6 grid grid-cols-3 gap-4">
          {players.map((player, index) => (
            <PlayerCard name={player.playerName} key={player.playerName} />
          ))}
        </div>
      </main>

      <img
        src="./ticket-to-ride.jpeg"
        className="absolute inset-0 -z-10 opacity-50"
        alt="wallpaper"
      />
    </div>
  );
};

export default Home;
