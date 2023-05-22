import { BsPersonCheck } from "react-icons/bs";
import { RiCalendarCheckLine, RiDashboardLine } from "react-icons/ri";
import { Settings } from 'tabler-icons-react';
import { FaPrescriptionBottleAlt } from "react-icons/fa";
import { TbClock2 } from "react-icons/tb";
import { FaHeadSideCough } from "react-icons/fa";

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
        to: 'prescription',
        label: "Préscription",
        icon: <FaPrescriptionBottleAlt size={25} />
    },
    {
        to: 'rendezvous',
        label: "Rendez-vous",
        icon: <TbClock2 size={25} />
    },
        {
        
        to: 'patient',
        label: "Patients",
        icon: <FaHeadSideCough size={25} />
    },
    {
        to: 'settings',
        label: "Paramètres",
        icon: <Settings size={25} />
    },
]

export default adminData