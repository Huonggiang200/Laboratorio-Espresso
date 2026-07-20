export interface MenuItem {
  id: string;
  category: 'espresso' | 'milk' | 'filter' | 'cold' | 'food';
  name: string;
  description?: string;
  price: string;
  dietary?: string[];
  available: boolean;
  featured?: boolean;
}

export const menuItems: MenuItem[] = [
  { id: 'm1', category: 'espresso', name: 'Espresso', description: 'Single origin or guest blend, pulled short.', price: '£2.80', available: true, featured: true },
  { id: 'm2', category: 'espresso', name: 'Macchiato', description: 'Espresso marked with a touch of steamed milk.', price: '£3.00', available: true },
  { id: 'm3', category: 'milk', name: 'Cortado', description: 'Equal parts espresso and steamed milk.', price: '£3.20', available: true },
  { id: 'm4', category: 'milk', name: 'Flat White', description: 'Double ristretto with textured microfoam.', price: '£3.40', available: true, featured: true },
  { id: 'm5', category: 'milk', name: 'Cappuccino', description: 'Classic proportion, dense foam.', price: '£3.50', available: true },
  { id: 'm6', category: 'filter', name: 'Batch Brew', description: 'Rotating single origin, brewed precise.', price: '£3.00', available: true },
  { id: 'm7', category: 'filter', name: 'V60 Pour Over', description: 'Hand-brewed filter to highlight origin clarity.', price: '£4.50', available: true, featured: true },
  { id: 'm8', category: 'cold', name: 'Iced Latte', description: 'Espresso over ice and milk.', price: '£3.80', available: true },
  { id: 'm9', category: 'cold', name: 'Cold Brew', description: 'Slow-steeped for 18 hours.', price: '£4.00', available: true },
  { id: 'm10', category: 'cold', name: 'Affogato', description: 'Espresso poured over fior di latte gelato.', price: '£5.00', available: true, featured: true },
  { id: 'm11', category: 'food', name: 'Cannolo Siciliano', description: 'Crisp pastry shell filled with sweet ricotta.', price: '£3.50', available: true },
  { id: 'm12', category: 'food', name: 'Pastel de Nata', description: 'Portuguese custard tart.', price: '£2.50', available: true },
];
