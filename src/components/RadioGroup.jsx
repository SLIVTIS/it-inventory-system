import React from 'react'
import { useState } from 'react';

function RadioGroup({ name, onChange, children, className, defaultValue }) {
    const [checked, setChecked] = useState(defaultValue);

    const handleRadioChange = (value) => {
        onChange(value);
        setChecked(value);
    };

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {React.Children.map(children, child =>
                React.cloneElement(child, {
                    name: name,
                    defaultValue: checked,
                    onChange: handleRadioChange,
                })
            )}
        </div>
    )
}

export default RadioGroup