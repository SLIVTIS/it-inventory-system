import React from 'react'

function Button({ onClick, children, className }) {
    return (
        <button
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-white bg-[#2F4050] hover:bg-[#293846]/80 h-10 px-4 py-2 ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button