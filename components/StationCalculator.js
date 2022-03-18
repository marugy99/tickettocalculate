const StationCalculator = ({ handleStationPoints, stationPoints, name }) => {
  return ( 
    <>
      <p className="my-4 font-semibold sm:text-lg text-white">
        Total points: {stationPoints.points}
      </p>
      <section
        className="grid-rows-[1fr, 40px] grid items-center justify-center gap-4 rounded bg-slate-700 py-6 px-4 text-center text-white"
        key={name}
      >
        <div>
          <p className="text-2xl font-bold md:text-3xl">{stationPoints.amount}</p>
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
            data-action="add"
            onClick={handleStationPoints}
          >
            +
          </button>
          <button
            className="inline-block rounded bg-rose-100 py-2 px-4 text-sm font-semibold text-rose-800 hover:bg-rose-200 md:text-base"
            data-action="deduct"
            onClick={handleStationPoints}
          >
            -
          </button>
          <span className="mt-2 block text-sm font-normal italic text-slate-400">
            4 points each
          </span>
        </div>
      </section>
    </>
   );
}
 
export default StationCalculator;