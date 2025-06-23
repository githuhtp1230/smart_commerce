export type CartItemType = {
    id: number;
    name: string;
    image: string;
    color: string;
    size: string;
    price: number;
    quantity: number;
    total: number;
};

export const initialCartItems: CartItemType[] = [
    {
        id: 1,
        name: "Iphone 15 Pro max 64gb",
        image: "https://phoenix-react-alt.prium.me/assets/1-B1bOxqYn.png",
        color: "Glossy black",
        size: "XL",
        price: 199,
        quantity: 2,
        total: 398
    },
    {
        id: 2,
        name: "Name 2",
        image: "https://phoenix-react-alt.prium.me/assets/2-B3P1wljo.png",
        color: "Glossy black",
        size: "XL",
        price: 150,
        quantity: 2,
        total: 300
    },
    {
        id: 3,
        name: "Name 3",
        image: "https://phoenix-react-alt.prium.me/assets/3-DiEfZzxT.png",
        color: "Glossy Golden",
        size: "34mm",
        price: 65,
        quantity: 2,
        total: 130
    }
]