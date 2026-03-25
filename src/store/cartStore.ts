import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  product: string; // product ID
  title: string;
  price: number;
  image: string;
  quantity: number;
  selectedVariants?: Record<string, string>;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => set((state) => {
        const existingItem = state.items.find(i => i.product === item.product);
        if (existingItem) {
          return {
            items: state.items.map(i => 
              i.product === item.product 
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
          };
        }
        return { items: [...state.items, item] };
      }),
      
      removeItem: (productId) => set((state) => ({
        items: state.items.filter(i => i.product !== productId)
      })),
      
      updateQuantity: (productId, quantity) => set((state) => ({
        items: state.items.map(i => 
          i.product === productId ? { ...i, quantity } : i
        )
      })),
      
      clearCart: () => set({ items: [] }),
      
      getTotalItems: () => {
        const state = get();
        return state.items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        const state = get();
        return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
    }),
    {
      name: 'visionary-cart-storage',
    }
  )
);

export default useCartStore;
