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
        link: "/dashboard"
    },
    {
        title: "Paises",
        icon: <PublicIcon />,
        link: "/countries"
    },
    {
        title: "Ubicaciones",
        icon: <LocationOnIcon />,
        link: "/locations"
    },
    {
        title: "Locales",
        icon: <StoreIcon />,
        link: "/store"
    },
    {
        title: "Stock general",
        icon: <InventoryIcon />,
        link: "/stock"
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