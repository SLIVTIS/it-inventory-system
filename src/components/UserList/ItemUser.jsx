import React from 'react'
import getInitials from '../../utils/getInitials'

function ItemUser({ username = '', email = '' }) {
    return (
        <div className="user">
            <div className="avatar">{getInitials(username)}</div>
            <div className="user-details">
                <p>{username}</p>
                <p>{email}</p>
            </div>
        </div>
    )
}

export default ItemUser