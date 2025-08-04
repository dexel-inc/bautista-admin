import {Subscription} from "@/domain/models/Subscription.ts";

const subscriptions: Subscription[] = [
    {
        id: 1,
        email: "bobby@gmail.com",
    },
    {
        id: 2,
        email: "Kaiya@gmail.com",
    },
    {
        id: 3,
        email: "Geidt@gmail.com",
    },
    {
        id: 4,
        email: "Abram@gmail.com",
    },
    {
        id: 5,
        email: "Carla@gmail.com",
        disabledAt: new Date("2023-10-01T00:00:00Z"),
    },
];

export default subscriptions;