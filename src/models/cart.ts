type Cart = {
  items: CartItem[];
};

type CartItem = {
  id: string;
  name: string;
  price: number;
};

export type { Cart, CartItem };
