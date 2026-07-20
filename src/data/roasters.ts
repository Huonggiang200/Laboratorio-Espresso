import laCabraImg from '../assets/images/la_cabra_roaster_1784525516796.jpg';
import theBarnImg from '../assets/images/the_barn_roaster_1784525532280.jpg';
import friedhatsImg from '../assets/images/friedhats_roaster_1784525549359.jpg';
import manhattanImg from '../assets/images/manhattan_roaster_1784525562866.jpg';

export interface Roaster {
  id: string;
  order: number;
  slug: string;
  name: string;
  city: string;
  country: string;
  cityCode: string;
  coordinates: { lat: number; lng: number };
  shortStatement: string;
  whySelected: string;
  selectedFor: string[];
  currentCoffee: string;
  coffeeOrigin: string;
  coffeeProcess: string;
  tastingNotes: string[];
  recommendedBrew: string;
  image: string;
  imageAlt: string;
  accentColor: string;
  status: string;
  altitude: string;
}

export const roasters: Roaster[] = [
  {
    id: "r1",
    order: 1,
    slug: "la-cabra",
    name: "La Cabra",
    city: "Aarhus",
    country: "Denmark",
    cityCode: "ARH",
    coordinates: { lat: 56.1629, lng: 10.2039 },
    shortStatement: "A modern approach to Nordic roasting, prioritizing bright and clean cup profiles.",
    whySelected: "La Cabra's unwavering commitment to clarity and origin expression aligns perfectly with our filter coffee program.",
    selectedFor: ["Clarity", "Sourcing transparency", "Modern roast expression"],
    currentCoffee: "Peña Blanca",
    coffeeOrigin: "Santa Barbara, Honduras",
    coffeeProcess: "Washed",
    tastingNotes: ["Green Apple", "Caramel", "White Floral"],
    recommendedBrew: "Filter / V60",
    image: laCabraImg,
    imageAlt: "La Cabra Roasting Machine Detail",
    accentColor: "#C8752E",
    status: "CURRENT",
    altitude: "1600m"
  },
  {
    id: "r2",
    order: 2,
    slug: "the-barn",
    name: "The Barn",
    city: "Berlin",
    country: "Germany",
    cityCode: "BER",
    coordinates: { lat: 52.5200, lng: 13.4050 },
    shortStatement: "One of Europe's specialty coffee pioneers, known for uncompromising quality and direct trade.",
    whySelected: "We feature The Barn for their consistency and their ability to extract intense sweetness and balance for espresso.",
    selectedFor: ["Consistency", "Direct Trade", "Espresso Balance"],
    currentCoffee: "Burtukaana",
    coffeeOrigin: "Guji, Ethiopia",
    coffeeProcess: "Natural",
    tastingNotes: ["Blueberry", "Jasmine", "Milk Chocolate"],
    recommendedBrew: "Espresso",
    image: theBarnImg,
    imageAlt: "The Barn Green Beans Inspection",
    accentColor: "#AAB0B1",
    status: "CURRENT",
    altitude: "2100m"
  },
  {
    id: "r3",
    order: 3,
    slug: "friedhats",
    name: "Friedhats",
    city: "Amsterdam",
    country: "Netherlands",
    cityCode: "AMS",
    coordinates: { lat: 52.3676, lng: 4.9041 },
    shortStatement: "Distinctive packaging meets exceptionally clean and vibrant coffee roasting.",
    whySelected: "Friedhats consistently pushes boundaries with experimental processes while maintaining cup cleanliness.",
    selectedFor: ["Vibrancy", "Experimental Processing", "Cup Cleanliness"],
    currentCoffee: "El Paraiso",
    coffeeOrigin: "Cauca, Colombia",
    coffeeProcess: "Anaerobic Washed",
    tastingNotes: ["Lychee", "Peach", "Rose"],
    recommendedBrew: "Filter / Aeropress",
    image: friedhatsImg,
    imageAlt: "Friedhats Coffee Packaging",
    accentColor: "#898178",
    status: "CURRENT",
    altitude: "1930m"
  },
  {
    id: "r4",
    order: 4,
    slug: "manhattan-coffee-roasters",
    name: "Manhattan",
    city: "Rotterdam",
    country: "Netherlands",
    cityCode: "RTM",
    coordinates: { lat: 51.9244, lng: 4.4777 },
    shortStatement: "Competition-level coffees roasted with extreme precision and care.",
    whySelected: "Chosen for their access to rare, high-end micro-lots and their ability to roast them flawlessly for espresso.",
    selectedFor: ["Competition Quality", "Rare Lots", "Roast Precision"],
    currentCoffee: "Letty Bermudez",
    coffeeOrigin: "Cauca, Colombia",
    coffeeProcess: "Thermal Shock",
    tastingNotes: ["Mango", "Passionfruit", "Vanilla"],
    recommendedBrew: "Espresso",
    image: manhattanImg,
    imageAlt: "Manhattan Coffee Cupping",
    accentColor: "#D6924F",
    status: "CURRENT",
    altitude: "1900m"
  }
];
