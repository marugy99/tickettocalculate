import Head from "next/head";
import { useState, useCallback } from "react";
import PlayerCard from "../components/PlayerCard";
import Modal from "../components/Modal";

const Home = () => {
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([]);
  const [winner, setWinner] = useState(false);

  const callback = useCallback((name, val) => {
    setPlayers((prevState) =>
      prevState.map((player) =>
        player.playerName === name ? { ...player, points: val } : player
      )
    );
  }, []);

  const addPlayer = (e) => {
    e.preventDefault();
    const nameExists = players.some((player) => player.playerName == name);

    if (name && !nameExists) {
      setPlayers([
        {
          playerName: name,
          points: 0,
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

  const finishGame = () => {
    // Sort player cards in ascending order
    setPlayers((prevState) => [
      ...prevState.sort((a, b) => b.points - a.points),
    ]);
    // TODO: Check if there was a tie
    setWinner(true);
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
        <div className="text-white">
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
            Ticket to Ride Calculator
          </h1>
          <div className="mt-4 flex items-center justify-center gap-2">
            <p className="text-center text-sm">
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
            <span aria-hidden="true">-</span>
            <a
              href="https://www.buymeacoffee.com/marulucenat"
              target="_blank"
              className="text-center text-sm hover:underline"
            >
              Buy me a coffee ☕️
            </a>
          </div>
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
            parentCallback={callback}
            totalPoints={player.points}
            key={player.playerName}
          />
        ))}
      </div>
      {players.length >= 2 && players.some((player) => player.points > 0) && (
        <footer className="py-4">
          <button
            onClick={finishGame}
            className="mx-auto block rounded bg-gradient-to-r from-indigo-500 to-sky-500 py-2 px-4 font-semibold text-white hover:from-indigo-700"
          >
            Finish game
          </button>
        </footer>
      )}
      {winner && (
        <Modal
          isOpen={winner}
          closeModal={() => setWinner(false)}
          title="Congratulations!"
          key={winner}
        >
          <img
            className="mx-auto mt-5 h-10 w-10 md:h-14 md:w-14"
            src="./trophy.svg"
            alt="Trophy"
            aria-hidden="true"
          />
          <p className="mt-2 pb-6 text-center text-lg text-white sm:text-2xl">
            <span className="capitalize">{players[0].playerName}</span> is the
            winner of this match
          </p>
        </Modal>
      )}
    </main>
  );
};

export default Home;
