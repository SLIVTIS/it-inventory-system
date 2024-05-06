import React from 'react'

function Table({ children, columns }) {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-600 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                        {columns ? (
                            columns.map(column => (
                                <th scope="col" className="px-6 py-3" key={column}>
                                    {column}
                                </th>
                            ))
                        ) : (
                            <th scope="col" className="px-6 py-3">
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    )
}

export default Table