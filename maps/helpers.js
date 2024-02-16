import europeRoutes from "./europe-routes";
import usaRoutes from "./usa-routes";

export const gameMaps = [
  {
    id: "europe",
    readableName: "Ticket to Ride - Europe",
    default: true,
  },
  {
    id: "usa",
    readableName: "Ticket to Ride - USA",
    default: false,
  },
];

export const getGameMapTitle = (map) => {
  const currentMap = gameMaps.filter((gameMap) => gameMap.id === map)[0];
  return currentMap?.readableName;
};

export const getDefaultGameMap = () => {
  const defaultMap = gameMaps.filter((gameMap) => gameMap.default)[0];
  return defaultMap?.id;
};

export const getGameMapTickets = (map) => {
  switch (map) {
    case "europe":
      return europeRoutes;
    case "usa":
      return usaRoutes;
    default:
      return europeRoutes;
  }
};
