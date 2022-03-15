const ColorPicker = ({ captureColor }) => {
  return (
    <select className="absolute top-4" onChange={captureColor}>
      {/* <option value="" selected disabled hidden>
        Select
      </option> */}
      <option value="from-yellow-200 to-yellow-400">Yellow</option>
      <option value="from-indigo-500 to-sky-500">Blue</option>
      <option value="from-emerald-400 to-lime-600">Green</option>
    </select>
  );
};

export default ColorPicker;
