const RouteCalculator = ({
  routeInfo,
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
      <div className="mt-8 grid grid-cols-2 gap-2 md:grid-cols-4">
        {pointButtons.map((btn) => (
          <section
            className="grid-rows-[1fr, 40px] grid items-center justify-center gap-4 rounded bg-slate-700 py-6 px-4 text-center text-white"
            key={btn.point}
          >
            <div>
              <p className="text-2xl font-bold md:text-3xl">{btn.point}</p>
              <img
                className="mx-auto h-12 w-12 md:h-16 md:w-16"
                src="./wagon.svg"
                alt="Train ticket icon"
                aria-hidden="true"
              />
            </div>
            <div>
              <button
                className="mr-1 inline-block rounded bg-green-100 py-2 px-4 text-sm font-semibold text-green-800 hover:bg-green-200 md:text-base"
                value={btn.point}
                data-multiply={btn.multiplyBy}
                data-action="add"
                onClick={handleRoutePoints}
              >
                +
              </button>
              <button
                className="inline-block rounded bg-rose-100 py-2 px-4 text-sm font-semibold text-rose-800 hover:bg-rose-200 md:text-base"
                value={btn.point}
                data-multiply={btn.multiplyBy}
                data-action="deduct"
                onClick={handleRoutePoints}
              >
                -
              </button>
              <span className="mt-2 block text-sm font-normal italic text-slate-400">
                {btn.multiplyBy} point{btn.point > 1 ? "s" : ""}
              </span>
            </div>
          </section>
        ))}
      </div>
      <section className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="text-xl font-semibold text-white md:text-2xl">
          <p className="my-4">Total points: {routeInfo.points}</p>
          <p>Total length: {routeInfo.routeLength}</p>
        </div>
        <button
          className="mt-4 mr-2 rounded bg-rose-600 py-2 px-4 font-medium text-white hover:bg-rose-700"
          onClick={resetRoutePoints}
        >
          Reset
        </button>
      </section>
    </>
  );
};

export default RouteCalculator;
