import React from "react";

export const Table = ({ children, className = "", ...props }) => {
  return (
    <div className="w-full overflow-x-auto rounded-md border border-[#E4E6EE] bg-white shadow-sm">
      <table className={`w-full text-left border-collapse text-sm ${className}`} {...props}>
        {children}
      </table>
    </div>
  );
};

export const TableHeader = ({ children, className = "", ...props }) => {
  return (
    <thead className={`bg-[#F7F8FB] border-b border-[#E4E6EE] ${className}`} {...props}>
      {children}
    </thead>
  );
};

export const TableBody = ({ children, className = "", ...props }) => {
  return (
    <tbody className={`divide-y divide-[#E4E6EE] ${className}`} {...props}>
      {children}
    </tbody>
  );
};

export const TableRow = ({ children, className = "", hoverable = true, ...props }) => {
  return (
    <tr
      className={`transition-colors duration-150 ${
        hoverable ? "hover:bg-[#F7F8FB]/75" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </tr>
  );
};

export const TableHead = ({ children, className = "", ...props }) => {
  return (
    <th
      className={`py-3.5 px-4 text-xs font-semibold text-[#5B5F73] uppercase tracking-wider ${className}`}
      {...props}
    >
      {children}
    </th>
  );
};

export const TableCell = ({ children, className = "", ...props }) => {
  return (
    <td
      className={`py-3.5 px-4 text-sm text-[#1A1D29] align-middle ${className}`}
      {...props}
    >
      {children}
    </td>
  );
};

export default Table;
