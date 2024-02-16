import { useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import Modal from "./Modal";
import { gameMaps, getGameMapTitle } from "../maps/helpers";

const SelectGameMap = ({ gameMap, setGameMap }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <p className="text-sm text-white">
          Map for destination tickets: {getGameMapTitle(gameMap)}
        </p>
        <button
          onClick={() => setIsOpen(true)}
          type="button"
          className="text-sky-500 hover:text-sky-600"
          aria-label="Open game map selector"
        >
          <HiOutlinePencilAlt className="h-5 w-5 " />
        </button>
      </div>
      <Modal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        title="Game map"
        key="Game map"
      >
        <p className="mt-2 text-center text-lg text-slate-400">
          Select a game map for the destination tickets.
        </p>
        <select
          onChange={(e) => setGameMap(e.target.value)}
          defaultValue={gameMap}
          className="mt-6 w-full rounded bg-slate-600 py-2 px-4 text-lg text-white"
        >
          {gameMaps.map((map) => (
            <option key={map.id} value={map.id}>
              {map.readableName}
            </option>
          ))}
        </select>
      </Modal>
    </>
  );
};

export default SelectGameMap;
