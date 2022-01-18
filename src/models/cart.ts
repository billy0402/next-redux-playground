type CartItem = {
  id: string;
  name: string;
  price: number;
};

type Cart = {
  items: CartItem[];
};

export type { Cart, CartItem };
