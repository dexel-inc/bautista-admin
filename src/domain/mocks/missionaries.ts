import {Missionary} from "@/domain/models/Missionary.ts";

const missionaries: Missionary[] = [
    {
        id: 1,
        family: "Goins Family",
        description: "Familia fundadora",
        user: {
            name: "Bobby Goins",
            email: "bobby@gmail.com",
        },
        address: "Arizona",
        status: "Active",
        img: "https://bautista-iglesia.vercel.app/assets/IMG-20250530-WA0056-CSCPfhX6.jpg"
    },
    {
        id: 2,
        family: "George Family",
        description: "Familia que apoya nuestra iglesia",
        user: {
            name: "Kaiya George",
            email: "Kaiya@gmail.com",
        },
        address: "Arizona",
        status: "Inactive",
        img: "https://bautista-iglesia.vercel.app/assets/IMG-20250530-WA0056-CSCPfhX6.jpg"
    },
    {
        id: 3,
        family: "Geidt Family",
        description: "Familia que apoya nuestra iglesia",
        user: {
            name: "Zain Geidt",
            email: "Geidt@gmail.com",
        },
        address: "Mexico City",
        status: "Inactive",
        img: "https://bautista-iglesia.vercel.app/assets/IMG-20250530-WA0056-CSCPfhX6.jpg"
    },
    {
        id: 4,
        family: "Abram Family",
        description: "Familia que apoya nuestra iglesia",
        user: {
            name: "Abram Schleifer",
            email: "Abram@gmail.com",
        },
        address: "Europa",
        status: "Active",
        img: "https://bautista-iglesia.vercel.app/assets/IMG-20250530-WA0056-CSCPfhX6.jpg",
    },
    {
        id: 5,
        family: "George Family",
        description: "Familia que apoya nuestra iglesia",
        user: {
            name: "Carla George",
            email: "Carla@gmail.com",
        },
        address: "Europa",
        status: "Active",
        img: "https://bautista-iglesia.vercel.app/assets/IMG-20250530-WA0056-CSCPfhX6.jpg",
    },
];

export default missionaries;