import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import BusinessIcon from '@mui/icons-material/Business';
import DevicesIcon from '@mui/icons-material/Devices';

export const SideBarData = [
    {
        title: "Home",
        icon: <HomeIcon />,
        link: "/dashboard"
    },
    {
        title: "Categorias",
        icon: <HomeIcon />,
        link: "/tienda"
    },
    {
        title: "Proveedores",
        icon: <BusinessIcon />,
        link: "/suppliers"
    },
    {
        title: "Modelos",
        icon: <DevicesIcon />,
        link: "/models"
    },
    {
        title: "Usuarios",
        icon: <GroupIcon />,
        link: "/users"
    }
];