const RouteCalculator = ({
  routePoints,
  handleRoutePoints,
  resetRoutePoints,
}) => {
  const pointButtons = [
    {
      point: 1,
      multiplyBy: 1,
    },
    {
      point: 2,
      multiplyBy: 2,
    },
    {
      point: 3,
      multiplyBy: 4,
    },
    {
      point: 4,
      multiplyBy: 7,
    },
    {
      point: 5,
      multiplyBy: 10,
    },
    {
      point: 6,
      multiplyBy: 15,
    },
    {
      point: 7,
      multiplyBy: 18,
    },
    {
      point: 8,
      multiplyBy: 21,
    },
  ];

  return (
    <>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {pointButtons.map((btn) => (
          <div className="grid grid-cols-2 gap-2 text-center" key={btn.point}>
            <p className="text-lg">
              {btn.point}
              <span className="block text-sm text-gray-500">
                {btn.multiplyBy} points
              </span>
            </p>
            <div className="flex gap-1">
              <button
                className="rounded bg-white py-2 px-4 hover:bg-gray-100"
                value={btn.point}
                data-multiply={btn.multiplyBy}
                data-action="add"
                onClick={handleRoutePoints}
              >
                +
              </button>
              <button
                className="rounded bg-white py-2 px-4 hover:bg-gray-100"
                value={btn.point}
                data-multiply={btn.multiplyBy}
                data-action="deduct"
                onClick={handleRoutePoints}
              >
                -
              </button>
            </div>
          </div>
        ))}
      </div>
      <p className="my-4 text-lg">Total: {routePoints}</p>
      <button
        className="mt-4 mr-2 rounded bg-red-600 py-2 px-4 text-white"
        onClick={resetRoutePoints}
      >
        Reset
      </button>
    </>
  );
};

export default RouteCalculator;
