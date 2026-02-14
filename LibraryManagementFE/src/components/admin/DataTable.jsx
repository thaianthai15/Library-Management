import React from 'react';

export default function DataTable({ headers, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b text-gray-500 uppercase text-xs font-bold">
          <tr>
            {headers.map((head, index) => (
              <th key={index} className="p-4">{head}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {children}
        </tbody>
      </table>
    </div>
  );
}