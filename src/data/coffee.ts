import filterImg from '../assets/images/filter_coffee_v60_1784523495087.jpg';
import affogatoImg from '../assets/images/affogato_coffee_1784523507893.jpg';

export interface CoffeeExperience {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  preparation: string;
  ingredients: string[];
  pairing: string;
  image: string;
}

export const coffeeExperiences: CoffeeExperience[] = [
  {
    id: 'c1',
    slug: 'espresso',
    title: 'Espresso',
    subtitle: 'Milanese discipline. Glasgow pace.',
    description: 'The foundation of the laboratory. Pulled precisely. A concentrated snapshot of origin.',
    preparation: '18g in. 36g out. 28 seconds.',
    ingredients: ['Single Origin Coffee', 'Filtered Water'],
    pairing: 'Sparkling water, Pastel de Nata.',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=1470&auto=format&fit=crop'
  },
  {
    id: 'c2',
    slug: 'milk',
    title: 'Milk',
    subtitle: 'Texture and temperature.',
    description: 'Espresso integrated with carefully textured microfoam. Highlighting the sweetness of both components.',
    preparation: 'Double ristretto base. Milk steamed to 60°C.',
    ingredients: ['Espresso', 'Whole Milk or Oat Alternative'],
    pairing: 'Cannolo Siciliano.',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1637&auto=format&fit=crop'
  },
  {
    id: 'c3',
    slug: 'filter',
    title: 'Filter',
    subtitle: 'Clarity and origin.',
    description: 'Hand-poured to highlight delicate floral and fruit notes. A slower, longer experience.',
    preparation: '15g coffee. 250g water. 93°C. 3:00 minute draw down.',
    ingredients: ['Single Origin Coffee', 'Filtered Water'],
    pairing: 'Almond Biscotti.',
    image: filterImg
  },
  {
    id: 'c4',
    slug: 'cold',
    title: 'Cold',
    subtitle: 'Temperature manipulation.',
    description: 'Flash chilled or slow steeped. Maintaining clarity without bitterness.',
    preparation: 'Steeped for 18 hours at 4°C, or extracted hot over ice.',
    ingredients: ['Coffee', 'Filtered Water', 'Ice'],
    pairing: 'Nothing. Drink it sharp.',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1469&auto=format&fit=crop'
  },
  {
    id: 'c5',
    slug: 'affogato',
    title: 'Affogato',
    subtitle: 'Hot and cold contrast.',
    description: 'A shot of hot espresso poured over artisanal fior di latte gelato. The ultimate collision.',
    preparation: 'Double espresso immediately poured over one scoop of gelato.',
    ingredients: ['Espresso', 'Fior di Latte Gelato'],
    pairing: 'A silver spoon.',
    image: affogatoImg
  }
];
