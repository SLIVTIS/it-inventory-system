import React, { useEffect, useState } from 'react'

function RadioGroupItem({ id, name, value, checked, defaultValue, onChange, className, children }) {
    const handleInputChange = () => {
        onChange(value);
    };

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <input
                id={id}
                name={name}
                type="radio"
                value={value}
                checked={defaultValue === value}
                onChange={handleInputChange}
                className="peer h-4 w-4 rounded-full border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <label htmlFor={id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {children}
            </label>
        </div>
    )
}

export default RadioGroupItem