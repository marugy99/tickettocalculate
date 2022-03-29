const DestinationTicketsList = ({ action, name, points, children }) => {
  return ( 
    <li
      className={`w-full rounded ${
        action === "Done"
          ? "bg-lime-100 text-lime-900"
          : "bg-rose-100 text-rose-800"
      } flex justify-between py-1 px-2`}
    > 
      <p className="flex-1">
        {name}
        <span className="ml-1 font-bold">
          {action === "Done" ? "+" : "-"}
          {points}
        </span>
      </p>
      {children}
    </li>
   );
}
 
export default DestinationTicketsList;