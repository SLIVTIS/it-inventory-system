import React from 'react'
import './UserList.css'
import ItemUser from './ItemUser'
import { colors } from '@mui/material'

function UserList({ title = "Users", list = null }) {
    return (
        <div className="section">
            <div className='list-header'>
                <h2>{title}</h2>
                <div className="badge">{list ? list.length : 0}</div>
            </div>
            <div className="user-list">
                {list && list.length > 0 ? (
                    list.map(user => (
                        <ItemUser key={user.id} username={user.username} email={user.email} />
                    ))
                ) : (
                    <p className='list-empty'>No hay usuarios registrados.</p>
                )}
            </div>
        </div>
    )
}

export default UserList