import {Missionary} from "@/domain/models/Missionary.ts";

const missionaries: Missionary[] = [
    {
        id: 1,
        title: "Goins title",
        message: "Familia fundadora",
        user: {
            name: "Bobby Goins",
            email: "bobby@gmail.com",
        },
        status: 'active',
        image: "https://bautista-iglesia.vercel.app/assets/image-20250530-WA0056-CSCPfhX6.jpg"
    },
    {
        id: 2,
        title: "George title",
        message: "Familia que apoya nuestra iglesia",
        user: {
            name: "Kaiya George",
            email: "Kaiya@gmail.com",
        },
        status: 'active',
        image: "https://bautista-iglesia.vercel.app/assets/image-20250530-WA0056-CSCPfhX6.jpg"
    },
    {
        id: 3,
        title: "Geidt title",
        message: "Familia que apoya nuestra iglesia",
        user: {
            name: "Zain Geidt",
            email: "Geidt@gmail.com",
        },
        status: 'active',
        image: "https://bautista-iglesia.vercel.app/assets/image-20250530-WA0056-CSCPfhX6.jpg"
    },
    {
        id: 4,
        title: "Abram title",
        message: "Familia que apoya nuestra iglesia",
        status: 'active',
        user: {
            name: "Abram Schleifer",
            email: "Abram@gmail.com",
        },
        image: "https://bautista-iglesia.vercel.app/assets/image-20250530-WA0056-CSCPfhX6.jpg",
    },
    {
        id: 5,
        title: "George title",
        message: "Familia que apoya nuestra iglesia",
        user: {
            name: "Carla George",
            email: "Carla@gmail.com",
        },
        status: 'inactive',
        image: "https://bautista-iglesia.vercel.app/assets/image-20250530-WA0056-CSCPfhX6.jpg",
    },
];

export default missionaries;