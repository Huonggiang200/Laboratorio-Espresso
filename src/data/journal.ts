export interface JournalPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
}

export const journalPosts: JournalPost[] = [
  {
    id: "j1",
    slug: "milanese-discipline-glasgow-pace",
    title: "Milanese Discipline, Glasgow Pace",
    date: "2023-11-15",
    excerpt: "How we adapt traditional Italian espresso culture to a fast-moving Scottish city without losing the soul.",
    content: "One small room. A rotating map of Europe in the hopper. We built Laboratorio Espresso not to slow Glasgow down, but to give it a precise focal point. The espresso machine is our anchor. In Milan, coffee is a quick, standing affair—a brief exchange of energy before returning to the street. Here, we embrace that rhythm. The coffee changes, but the address doesn't. We weigh, we measure, we time. Every parameter is controlled. Yet, the final product is warm, analog, and human.",
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1471&auto=format&fit=crop"
  },
  {
    id: "j2",
    slug: "the-importance-of-water",
    title: "The Importance of Water in the Laboratory",
    date: "2023-10-02",
    excerpt: "Coffee is 98% water. If the water isn't right, nothing else matters.",
    content: "When we talk about coffee, we often talk about the bean, the roast, the origin. But coffee is 98% water. The mineral content of the water in Glasgow is incredibly soft, which is generally excellent for coffee extraction. However, we still run it through a rigorous filtration system to ensure absolute consistency. The pH balance and total dissolved solids (TDS) must be perfectly calibrated to extract the vibrant acidity of our European guest roasters without harshness.",
    image: "/src/assets/images/coffee_water_filtering_1784526782790.jpg"
  },
  {
    id: "j3",
    slug: "thirty-square-metres",
    title: "Thirty Square Metres. No Wasted Movement.",
    date: "2023-09-10",
    excerpt: "Designing a workflow that feels like a dance, not a struggle.",
    content: "Our space on West Nile Street is exactly thirty square metres. Every inch of reclaimed timber, concrete, and stainless steel was placed with intent. Behind the bar, the layout is designed for maximum efficiency. The grinder, the machine, the knock box, the milk pitchers—everything is within arm's reach. This isn't just about speed; it's about focus. When the barista doesn't have to think about where things are, they can focus entirely on the extraction in front of them.",
    image: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=1470&auto=format&fit=crop"
  }
];
