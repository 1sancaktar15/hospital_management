import React from 'react';

const Table = ({ data, columns }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column, index) => (
              <th 
                key={index} 
                className="py-3 px-4 text-left font-semibold text-gray-700"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, rowIndex) => (
              <tr 
                key={rowIndex} 
                className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="py-3 px-4 border-t border-gray-200">
                    {column.render 
                      ? (column.accessor 
                          ? column.render(item[column.accessor]) 
                          : column.render(item)
                        )
                      : item[column.accessor] || '-'}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td 
                colSpan={columns.length} 
                className="py-4 px-4 text-center text-gray-500"
              >
                Kayıt bulunamadı
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
