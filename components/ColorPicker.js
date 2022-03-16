const ColorPicker = ({ captureColor, currentColor }) => {
  return (
    <section className="py-10 px-8">
      <select
        className="mt-6 w-full rounded bg-slate-600 py-2 px-4 text-lg text-white"
        onChange={captureColor}
        value={currentColor}
      >
        <option value="" selected>
          Select
        </option>
        <option value="from-orange-100 to-yellow-300">Yellow</option>
        <option value="from-sky-200 to-sky-700">Blue</option>
        <option value="from-lime-200 to-green-600">Green</option>
        <option value="from-rose-200 to-rose-600">Red</option>
        <option value="from-slate-400 to-slate-700">Black</option>
      </select>
    </section>
  );
};

export default ColorPicker;
