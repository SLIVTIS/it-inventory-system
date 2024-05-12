import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import BusinessIcon from '@mui/icons-material/Business';
import DevicesIcon from '@mui/icons-material/Devices';
import PublicIcon from '@mui/icons-material/Public';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StoreIcon from '@mui/icons-material/Store';
import InventoryIcon from '@mui/icons-material/Inventory';

export const SideBarData = [
    {
        title: "Home",
        icon: <HomeIcon />,
        link: "/dashboard",
        admin: false
    },
    {
        title: "Paises",
        icon: <PublicIcon />,
        link: "/countries",
        admin: true
    },
    {
        title: "Ubicaciones",
        icon: <LocationOnIcon />,
        link: "/locations",
        admin: true
    },
    {
        title: "Locales",
        icon: <StoreIcon />,
        link: "/store",
        admin: false
    },
    {
        title: "Stock general",
        icon: <InventoryIcon />,
        link: "/stock",
        admin: false
    },
    {
        title: "Proveedores",
        icon: <BusinessIcon />,
        link: "/suppliers",
        admin: true
    },
    {
        title: "Modelos",
        icon: <DevicesIcon />,
        link: "/models",
        admin: true
    },
    {
        title: "Usuarios",
        icon: <GroupIcon />,
        link: "/users",
        admin: true
    }
];