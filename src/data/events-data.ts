export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  status: "Active" | "Draft" | "Completed";
  ticketsSold: number;
  capacity: number;
  price: string;
  description?: string;
  image?: string;
}

export const INITIAL_EVENTS: Event[] = [
  {
    id: "EVT-004",
    name: "Week of Prayer Online",
    date: "June 14, 2026",
    location: "OMS Global Hub",
    status: "Active",
    ticketsSold: 12450,
    capacity: 50000,
    price: "Free",
    description: "Seven nights of worship, teaching, and guided prayer streamed live to homes worldwide. Join a global movement of faith.",
    image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=1200&q=80"
  },
  {
    id: "EVT-001",
    name: "Summer Bible Camp 2026",
    date: "July 15, 2026",
    location: "Grace Cathedral",
    status: "Active",
    ticketsSold: 145,
    capacity: 200,
    price: "$45.00",
    description: "A fun-filled week of learning and growing in faith for children ages 5-12. Includes media workshops and nature tours.",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1200&q=80"
  },
  {
    id: "EVT-002",
    name: "Worship Night: Echoes of Grace",
    date: "June 02, 2026",
    location: "City Park Arena",
    status: "Active",
    ticketsSold: 890,
    capacity: 1500,
    price: "$20.00",
    description: "Join us for an evening of powerful worship and community prayer under the stars.",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&q=80"
  },
  {
    id: "EVT-003",
    name: "Leadership Summit 2026",
    date: "May 28, 2026",
    location: "Online",
    status: "Active",
    ticketsSold: 320,
    capacity: 1000,
    price: "$15.00",
    description: "Equipping the next generation of ministry leaders with practical tools and spiritual insights for digital outreach.",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&q=80"
  },
  {
    id: "EVT-005",
    name: "Creation Science: The Deep",
    date: "August 10, 2026",
    location: "Museum of Discovery",
    status: "Active",
    ticketsSold: 75,
    capacity: 150,
    price: "$30.00",
    description: "An interactive seminar exploring the wonders of marine life from a biblical perspective.",
    image: "https://images.unsplash.com/photo-1528460033278-a6ba57020470?w=1200&q=80"
  }
];
