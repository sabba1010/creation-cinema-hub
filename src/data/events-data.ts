// â”€â”€â”€ Events Data System â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export interface Showtime {
  id: string;
  date: string;
  day: string;
  time: string;
  timezone: string;
  spotsLeft: number;
  totalSpots: number;
  status: "available" | "limited" | "sold-out";
}

export interface Venue {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode?: string;
  mapUrl: string;
  parkingInfo: string;
  accessibilityInfo: string;
  phone?: string;
  email?: string;
}

export interface CityScreening {
  cityId: string;
  city: string;
  country: string;
  flag: string;
  venue: Venue;
  showtimes: Showtime[];
  isOnline?: boolean;
}

export interface SupportContact {
  type: "email" | "phone" | "whatsapp" | "chat";
  label: string;
  value: string;
  available: string;
}

export interface Event {
  // Legacy fields (for admin compatibility)
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

  // Extended fields
  subtitle?: string;
  heroImage?: string;
  tags?: string[];
  duration?: string;
  ageRating?: string;
  language?: string;
  cities?: CityScreening[];
  support?: SupportContact[];
  includes?: string[];
  faq?: { q: string; a: string }[];
}

// â”€â”€â”€ Event Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export const INITIAL_EVENTS: Event[] = [
  {
    id: "EVT-004",
    name: "Week of Prayer Online",
    subtitle: "Seven nights of global worship, teaching & prayer",
    date: "August 18â€“22, 2026",
    location: "Global â€” Online + In-Person",
    status: "Active",
    ticketsSold: 12450,
    capacity: 50000,
    price: "Free",
    duration: "2 hrs per night",
    ageRating: "All Ages",
    language: "English (with subtitles)",
    description:
      "Seven nights of worship, teaching, and guided prayer streamed live to homes worldwide. Join a global movement of faith.",
    image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=1200&q=80",
    heroImage: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=1600&q=80",
    tags: ["Worship", "Prayer", "Online", "Free"],
    includes: [
      "Live stream access for all 5 nights",
      "Daily devotional resource pack",
      "Downloadable prayer journal",
      "Post-event replay (48 hours)",
      "Children's activity pack",
    ],
    cities: [
      {
        cityId: "online",
        city: "Online â€” Global Stream",
        country: "Worldwide",
        flag: "ðŸŒ",
        isOnline: true,
        venue: {
          name: "OMS Live Stream Platform",
          address: "stream.onemustardSeed.org",
          city: "Online",
          state: "",
          country: "Worldwide",
          mapUrl: "#",
          parkingInfo: "No parking needed â€” join from anywhere.",
          accessibilityInfo: "Closed captions available. Screen-reader compatible.",
          email: "stream@onemustardSeed.org",
        },
        showtimes: [
          { id: "st-wop-1", date: "Monday, Aug 18", day: "Night 1", time: "7:00 PM", timezone: "GMT", spotsLeft: 99999, totalSpots: 99999, status: "available" },
          { id: "st-wop-2", date: "Tuesday, Aug 19", day: "Night 2", time: "7:00 PM", timezone: "GMT", spotsLeft: 99999, totalSpots: 99999, status: "available" },
          { id: "st-wop-3", date: "Wednesday, Aug 20", day: "Night 3", time: "7:00 PM", timezone: "GMT", spotsLeft: 99999, totalSpots: 99999, status: "available" },
          { id: "st-wop-4", date: "Thursday, Aug 21", day: "Night 4", time: "7:00 PM", timezone: "GMT", spotsLeft: 99999, totalSpots: 99999, status: "available" },
          { id: "st-wop-5", date: "Friday, Aug 22", day: "Night 5 â€” Commissioning", time: "7:00 PM", timezone: "GMT", spotsLeft: 99999, totalSpots: 99999, status: "available" },
        ],
      },
      {
        cityId: "accra",
        city: "Accra",
        country: "Ghana",
        flag: "ðŸ‡¬ðŸ‡­",
        venue: {
          name: "National Theatre of Ghana",
          address: "Liberation Road, Accra",
          city: "Accra",
          state: "Greater Accra",
          country: "Ghana",
          zipCode: "GA-000",
          mapUrl: "https://maps.google.com/?q=National+Theatre+Ghana",
          parkingInfo: "Free parking available on Liberation Road. Carpooling encouraged.",
          accessibilityInfo: "Wheelchair accessible entrances available. Reserved seating for persons with disabilities.",
          phone: "+233 30 2123456",
          email: "accra@onemustardSeed.org",
        },
        showtimes: [
          { id: "st-accra-1", date: "Monday, Aug 18", day: "Night 1", time: "7:00 PM", timezone: "GMT", spotsLeft: 380, totalSpots: 500, status: "available" },
          { id: "st-accra-2", date: "Friday, Aug 22", day: "Night 5 â€” Commissioning", time: "7:00 PM", timezone: "GMT", spotsLeft: 45, totalSpots: 500, status: "limited" },
        ],
      },
      {
        cityId: "london",
        city: "London",
        country: "United Kingdom",
        flag: "ðŸ‡¬ðŸ‡§",
        venue: {
          name: "Emmanuel Centre",
          address: "9-23 Marsham Street, Westminster",
          city: "London",
          state: "England",
          country: "United Kingdom",
          zipCode: "SW1P 3DW",
          mapUrl: "https://maps.google.com/?q=Emmanuel+Centre+London",
          parkingInfo: "Limited on-site parking. Nearest tube: Westminster (5 min walk) or St James's Park.",
          accessibilityInfo: "Fully accessible venue. Induction loop available. Please contact us for specific requirements.",
          phone: "+44 20 7222 9191",
          email: "london@onemustardSeed.org",
        },
        showtimes: [
          { id: "st-ldn-1", date: "Tuesday, Aug 19", day: "Night 2", time: "7:30 PM", timezone: "BST", spotsLeft: 210, totalSpots: 300, status: "available" },
          { id: "st-ldn-2", date: "Friday, Aug 22", day: "Night 5 â€” Commissioning", time: "7:30 PM", timezone: "BST", spotsLeft: 12, totalSpots: 300, status: "limited" },
        ],
      },
      {
        cityId: "toronto",
        city: "Toronto",
        country: "Canada",
        flag: "ðŸ‡¨ðŸ‡¦",
        venue: {
          name: "Centennial College â€” Progress Campus",
          address: "941 Progress Ave, Scarborough",
          city: "Toronto",
          state: "Ontario",
          country: "Canada",
          zipCode: "M1G 3T8",
          mapUrl: "https://maps.google.com/?q=Centennial+College+Progress+Campus",
          parkingInfo: "Free parking in Lot 8 (enter via Progress Ave). Spaces limited on Friday nights.",
          accessibilityInfo: "Wheelchair accessible. Elevator access to all floors. Contact us in advance for sign language interpretation.",
          phone: "+1 416-289-5000",
          email: "toronto@onemustardSeed.org",
        },
        showtimes: [
          { id: "st-tor-1", date: "Wednesday, Aug 20", day: "Night 3", time: "7:00 PM", timezone: "EDT", spotsLeft: 175, totalSpots: 250, status: "available" },
          { id: "st-tor-2", date: "Friday, Aug 22", day: "Night 5 â€” Commissioning", time: "7:00 PM", timezone: "EDT", spotsLeft: 0, totalSpots: 250, status: "sold-out" },
        ],
      },
    ],
    support: [
      { type: "email", label: "General Enquiries", value: "events@onemustardSeed.org", available: "Monâ€“Fri, 9amâ€“5pm GMT" },
      { type: "whatsapp", label: "WhatsApp Support", value: "+233 55 123 4567", available: "Monâ€“Sat, 8amâ€“8pm GMT" },
      { type: "phone", label: "Accra Office", value: "+233 30 2123456", available: "Monâ€“Fri, 9amâ€“5pm GMT" },
      { type: "chat", label: "Live Chat", value: "Available on this page", available: "During event weeks only" },
    ],
    faq: [
      { q: "Is the online stream free?", a: "Yes! The global online stream is completely free. Simply register with your email and you'll receive a link before each night." },
      { q: "Can I watch replays?", a: "Yes, replays are available for 48 hours after each live night. Premium replay access (30 days) is available for a small donation." },
      { q: "How do I get tickets for an in-person city?", a: "Select your city and preferred showtime, then click 'Register.' You'll receive a confirmation email with your digital ticket." },
      { q: "Is there a children's programme?", a: "Yes! Children's activities run simultaneously at in-person venues. Online, a downloadable children's pack is available." },
      { q: "What if my city is not listed?", a: "Host Week of Prayer in your city or church! Contact us at partners@onemustardSeed.org to learn about our partner programme." },
    ],
  },
  {
    id: "EVT-002",
    name: "Worship Night: Echoes of Grace",
    subtitle: "An evening of powerful music, prayer & community",
    date: "June 2, 2026",
    location: "Multiple Cities â€” UK & Ghana",
    status: "Active",
    ticketsSold: 890,
    capacity: 3000,
    price: "$20.00",
    duration: "3 hours",
    ageRating: "All Ages",
    language: "English",
    description:
      "Join us for an evening of powerful worship and community prayer. Featuring live artists, spoken word, and a moment of unified global prayer.",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&q=80",
    heroImage: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1600&q=80",
    tags: ["Worship", "Music", "In-Person"],
    includes: [
      "Reserved seating",
      "Printed programme",
      "Refreshments included",
      "Meet & greet (VIP only)",
      "Digital download of live recording",
    ],
    cities: [
      {
        cityId: "kumasi",
        city: "Kumasi",
        country: "Ghana",
        flag: "ðŸ‡¬ðŸ‡­",
        venue: {
          name: "Kumasi Cultural Centre",
          address: "Old Railway Station Rd, Kumasi",
          city: "Kumasi",
          state: "Ashanti Region",
          country: "Ghana",
          mapUrl: "https://maps.google.com/?q=Kumasi+Cultural+Centre",
          parkingInfo: "Large parking area available on site. Security personnel on duty.",
          accessibilityInfo: "Ground-floor venue. Wheelchair accessible throughout.",
          phone: "+233 32 2024850",
          email: "kumasi@onemustardSeed.org",
        },
        showtimes: [
          { id: "st-ks-1", date: "Monday, Jun 2", day: "Evening Show", time: "6:30 PM", timezone: "GMT", spotsLeft: 320, totalSpots: 800, status: "available" },
        ],
      },
      {
        cityId: "birmingham",
        city: "Birmingham",
        country: "United Kingdom",
        flag: "ðŸ‡¬ðŸ‡§",
        venue: {
          name: "Symphony Hall",
          address: "Broad Street, Birmingham",
          city: "Birmingham",
          state: "West Midlands",
          country: "United Kingdom",
          zipCode: "B1 2EA",
          mapUrl: "https://maps.google.com/?q=Symphony+Hall+Birmingham",
          parkingInfo: "NCP car park adjacent to venue. Brindleyplace offers additional parking within walking distance.",
          accessibilityInfo: "Full accessibility including hearing loops, accessible toilets, and step-free access throughout.",
          phone: "+44 121 780 3333",
          email: "birmingham@onemustardSeed.org",
        },
        showtimes: [
          { id: "st-bham-1", date: "Monday, Jun 2", day: "Early Show", time: "5:00 PM", timezone: "BST", spotsLeft: 95, totalSpots: 1000, status: "available" },
          { id: "st-bham-2", date: "Monday, Jun 2", day: "Late Show", time: "8:30 PM", timezone: "BST", spotsLeft: 18, totalSpots: 1000, status: "limited" },
        ],
      },
      {
        cityId: "manchester",
        city: "Manchester",
        country: "United Kingdom",
        flag: "ðŸ‡¬ðŸ‡§",
        venue: {
          name: "Albert Hall Manchester",
          address: "27 Peter St, Manchester",
          city: "Manchester",
          state: "Greater Manchester",
          country: "United Kingdom",
          zipCode: "M2 5QR",
          mapUrl: "https://maps.google.com/?q=Albert+Hall+Manchester",
          parkingInfo: "Nearby NCP on Deansgate. Metrolink stops: St Peter's Square or Deansgate-Castlefield.",
          accessibilityInfo: "Lift access available. Accessible toilets on all floors. Pre-book accessible tickets directly with the venue.",
          phone: "+44 161 817 3490",
          email: "manchester@onemustardSeed.org",
        },
        showtimes: [
          { id: "st-mcr-1", date: "Monday, Jun 2", day: "Evening Show", time: "7:00 PM", timezone: "BST", spotsLeft: 0, totalSpots: 700, status: "sold-out" },
        ],
      },
    ],
    support: [
      { type: "email", label: "Ticket Enquiries", value: "tickets@onemustardSeed.org", available: "Monâ€“Fri, 9amâ€“5pm GMT" },
      { type: "whatsapp", label: "WhatsApp", value: "+44 7700 900123", available: "Monâ€“Sat, 8amâ€“9pm BST" },
    ],
    faq: [
      { q: "Are tickets refundable?", a: "Tickets are non-refundable but transferable. You may transfer your ticket to another person by contacting us at least 48 hours before the event." },
      { q: "What time should I arrive?", a: "Doors open 45 minutes before the show. We recommend arriving 30 minutes early for the best experience." },
      { q: "Is there an age restriction?", a: "This is an all-ages event. Children under 5 enter free with a paying adult." },
      { q: "Can I bring my own food?", a: "Refreshments are included. Outside food and drink may not be brought into the venue." },
    ],
  },
  {
    id: "EVT-001",
    name: "Summer Bible Camp 2026",
    subtitle: "Faith, fun & friendship for children ages 5â€“12",
    date: "July 15â€“19, 2026",
    location: "Accra, Ghana",
    status: "Active",
    ticketsSold: 145,
    capacity: 200,
    price: "$45.00",
    duration: "5 Days",
    ageRating: "Ages 5â€“12",
    language: "English",
    description:
      "A fun-filled week of learning and growing in faith for children ages 5-12. Includes media workshops and nature tours.",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1200&q=80",
    heroImage: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1600&q=80",
    tags: ["Children", "Camp", "In-Person"],
    includes: [
      "All meals and snacks included",
      "Camp t-shirt & welcome pack",
      "Nature tour and workshops",
      "Daily devotional booklet",
      "End-of-camp showcase & certificate",
    ],
    cities: [
      {
        cityId: "accra-camp",
        city: "Accra",
        country: "Ghana",
        flag: "ðŸ‡¬ðŸ‡­",
        venue: {
          name: "OMS Retreat Centre",
          address: "Abokobi Road, East Legon Hills, Accra",
          city: "Accra",
          state: "Greater Accra",
          country: "Ghana",
          mapUrl: "https://maps.google.com/?q=Abokobi+Road+Accra",
          parkingInfo: "Ample on-site parking available. Pick-up and drop-off zone clearly marked at main gate.",
          accessibilityInfo: "Ground-level facilities available. Please contact us in advance to arrange specific support.",
          phone: "+233 30 2123456",
          email: "camp@onemustardSeed.org",
        },
        showtimes: [
          { id: "st-camp-1", date: "Tueâ€“Sat, Jul 15â€“19", day: "Full Week Programme", time: "8:00 AM â€“ 4:00 PM", timezone: "GMT", spotsLeft: 55, totalSpots: 200, status: "available" },
        ],
      },
    ],
    support: [
      { type: "email", label: "Camp Registration", value: "camp@onemustardSeed.org", available: "Monâ€“Fri, 9amâ€“5pm GMT" },
      { type: "phone", label: "Parents Helpline", value: "+233 30 2123456", available: "Monâ€“Fri, 8amâ€“6pm GMT" },
      { type: "whatsapp", label: "WhatsApp Parents Group", value: "+233 55 123 4567", available: "Anytime" },
    ],
    faq: [
      { q: "What should my child bring?", a: "A list will be sent after registration. Essentials include a Bible, notebook, comfortable shoes, sunscreen, and a water bottle." },
      { q: "Are there supervised drop-off and pick-up times?", a: "Yes. Drop-off is between 7:30â€“8:15 AM and pick-up is between 4:00â€“4:45 PM. ID required for pick-up." },
      { q: "My child has dietary requirements â€” can you accommodate?", a: "Absolutely. Please indicate any dietary needs during registration and our catering team will be notified." },
    ],
  },
  {
    id: "EVT-003",
    name: "Leadership Summit 2026",
    subtitle: "Equipping the next generation of ministry leaders",
    date: "May 28, 2026",
    location: "Online â€” Global",
    status: "Active",
    ticketsSold: 320,
    capacity: 1000,
    price: "$15.00",
    duration: "6 hours (with breaks)",
    ageRating: "18+",
    language: "English",
    description:
      "Equipping the next generation of ministry leaders with practical tools and spiritual insights for digital outreach.",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&q=80",
    heroImage: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1600&q=80",
    tags: ["Leadership", "Online", "Training"],
    includes: [
      "Full-day virtual summit access",
      "6 keynote sessions with Q&A",
      "Downloadable resource toolkit",
      "30-day replay access",
      "Digital certificate of completion",
      "Private alumni community access",
    ],
    cities: [
      {
        cityId: "online-summit",
        city: "Online â€” Zoom Webinar",
        country: "Worldwide",
        flag: "ðŸŒ",
        isOnline: true,
        venue: {
          name: "OMS Virtual Summit Platform",
          address: "summit.onemustardSeed.org",
          city: "Online",
          state: "",
          country: "Worldwide",
          mapUrl: "#",
          parkingInfo: "No parking needed.",
          accessibilityInfo: "Closed captions available throughout. All sessions recorded for replay.",
          email: "summit@onemustardSeed.org",
        },
        showtimes: [
          { id: "st-sum-1", date: "Thursday, May 28", day: "Full Day", time: "9:00 AM", timezone: "GMT", spotsLeft: 680, totalSpots: 1000, status: "available" },
        ],
      },
    ],
    support: [
      { type: "email", label: "Summit Support", value: "summit@onemustardSeed.org", available: "Monâ€“Fri, 9amâ€“5pm GMT" },
      { type: "whatsapp", label: "WhatsApp", value: "+233 55 123 4567", available: "Monâ€“Sat, 8amâ€“6pm GMT" },
    ],
    faq: [
      { q: "What platform is the summit on?", a: "The summit is hosted on Zoom Webinar. You will receive a unique join link after registration." },
      { q: "Can I watch in a different time zone?", a: "Yes! The sessions will be recorded and available for replay for 30 days after the event." },
      { q: "Is there a group discount?", a: "Yes â€” groups of 5 or more receive 20% off. Contact us at summit@onemustardSeed.org for a group code." },
    ],
  },
];
