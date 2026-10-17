import { createContext, useContext, useMemo, useState } from 'react';
const Context = createContext(null);
export function CartProvider({ children }) {
  const [lines, setLines] = useState([]);
  const value = useMemo(
    () => ({
      lines,
      count: lines.reduce((n, l) => n + l.quantity, 0),
      totalKobo: lines.reduce((n, l) => n + l.price_kobo * l.quantity, 0),
      add(product, quantity = 1) {
        setLines((prev) => {
          const found = prev.find((x) => x.id === product.id);
          return found
            ? prev.map((x) =>
                x.id === product.id
                  ? { ...x, quantity: x.quantity + quantity }
                  : x,
              )
            : [
                ...prev,
                {
                  id: product.id,
                  name: product.name,
                  price_kobo: product.price_kobo,
                  quantity,
                },
              ];
        });
      },
      remove(id) {
        setLines((p) => p.filter((x) => x.id !== id));
      },
      clear() {
        setLines([]);
      },
    }),
    [lines],
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useCart() {
  const c = useContext(Context);
  if (!c) throw new Error('CartProvider missing');
  return c;
}
