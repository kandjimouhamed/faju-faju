import { BsPersonCheck } from "react-icons/bs";
import { RiCalendarCheckLine, RiDashboardLine } from "react-icons/ri";
import { Settings } from 'tabler-icons-react';

const adminData = [
    {
        to: '',
        label: "Dashboard",
        icon: <RiDashboardLine size={25} />
    },
    {
        to: 'appointements',
        label: "Rendez-vous",
        icon: <RiCalendarCheckLine size={25} />
    },
    {
        to: 'calendar',
        label: "Mon agenda",
        icon: <BsPersonCheck size={25} />
    },
    {
        to: 'settings',
        label: "Paramètres",
        icon: <Settings size={25} />
    },
]

export default adminData