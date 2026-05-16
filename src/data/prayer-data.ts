// Week of Prayer Series Data

export interface PrayerVideo {
  id: string;
  day: number;
  title: string;
  speaker: string;
  description: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  locked: boolean;
}

export interface DailyResource {
  day: number;
  title: string;
  scripture: string;
  devotional: string;
  prayerPoints: string[];
}

export interface DownloadMaterial {
  id: string;
  title: string;
  type: "PDF" | "ZIP" | "MP4" | "PPTX";
  size: string;
  description: string;
  locked: boolean;
}

export interface PrayerSeries {
  id: string;
  title: string;
  year: number;
  theme: string;
  tagline: string;
  description: string;
  thumbnail: string;
  bannerImage: string;
  startDate: string;
  endDate: string;
  price: number;
  status: "active" | "upcoming" | "archived";
  accessDays: number;
  videos: PrayerVideo[];
  resources: DailyResource[];
  downloads: DownloadMaterial[];
}

export const PRAYER_SERIES: PrayerSeries[] = [
  {
    id: "wop-2026",
    title: "Week of Prayer Online 2026",
    year: 2026,
    theme: "Rooted in Him",
    tagline: "Grounded in Scripture. Lifted in Worship.",
    description:
      "Join believers from around the world for five transformative nights of worship, teaching, and guided prayer. This year's theme 'Rooted in Him' calls the global church to anchor deeper into God's Word and flourish in faith.",
    thumbnail:
      "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&q=80&w=800",
    bannerImage:
      "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&q=80&w=1600",
    startDate: "August 18, 2026",
    endDate: "August 22, 2026",
    price: 29,
    status: "upcoming",
    accessDays: 90,
    videos: [
      {
        id: "v1",
        day: 1,
        title: "Planted by the River",
        speaker: "Pastor James Osei",
        description:
          "Exploring Psalm 1 â€” what it means to be deeply rooted in God's Word and why that matters for everyday life.",
        duration: "47:12",
        thumbnail:
          "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=600",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        locked: false,
      },
      {
        id: "v2",
        day: 2,
        title: "When the Storm Shakes the Tree",
        speaker: "Dr. Sarah Mensah",
        description:
          "A powerful message on faith through trials, drawing from the book of Job. How roots hold us when the winds of life blow hard.",
        duration: "52:38",
        thumbnail:
          "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=600",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        locked: true,
      },
      {
        id: "v3",
        day: 3,
        title: "Bearing Fruit in Season",
        speaker: "Elder Ruth Amponsah",
        description:
          "Understanding the seasons of spiritual growth. Why some seasons feel dry and how God is still working beneath the surface.",
        duration: "44:55",
        thumbnail:
          "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=600",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        locked: true,
      },
      {
        id: "v4",
        day: 4,
        title: "Community of Roots",
        speaker: "Rev. Philip Darko",
        description:
          "The church as a forest â€” how believers strengthen each other through shared rootedness in Christ and community.",
        duration: "49:20",
        thumbnail:
          "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&q=80&w=600",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        locked: true,
      },
      {
        id: "v5",
        day: 5,
        title: "A Living Hope â€” Commissioning Night",
        speaker: "Bishop Emmanuel Asante",
        description:
          "The closing night service â€” a night of praise, recommitment, and sending the global church out rooted in living hope.",
        duration: "1:08:44",
        thumbnail:
          "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=80&w=600",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        locked: true,
      },
    ],
    resources: [
      {
        day: 1,
        title: "Day 1: Planted",
        scripture: "Psalm 1:1-3 â€” 'Blessed is the one who does not walk in step with the wicked... that person is like a tree planted by streams of water.'",
        devotional:
          "Roots are invisible â€” but they determine everything. Today we reflect on what our lives are planted in. Are we nourished by God's Word daily, or surviving on spiritual junk food? A tree planted by streams doesn't strive for water; it absorbs it naturally through proximity. Move close to the source today.",
        prayerPoints: [
          "Ask God to reveal what your life is truly rooted in",
          "Pray for a deeper hunger for Scripture",
          "Intercede for one person in your life who needs to be 'planted'",
          "Thank God for the streams He has placed in your life",
        ],
      },
      {
        day: 2,
        title: "Day 2: Held in the Storm",
        scripture: "Job 1:21 â€” 'The Lord gave and the Lord has taken away; may the name of the Lord be praised.'",
        devotional:
          "Job lost everything â€” but not his roots. The storm revealed what was already there beneath the surface. When life shakes you, your response reveals your depth. Deep roots don't prevent storms; they transform how you experience them. Today, name your storm. Then name your Root.",
        prayerPoints: [
          "Bring your current trial honestly before God",
          "Pray for one person going through a storm right now",
          "Ask for grace to praise God in the middle of your storm",
          "Declare: 'The Lord is my anchor and I will not be moved'",
        ],
      },
      {
        day: 3,
        title: "Day 3: Seasons of Growth",
        scripture: "Ecclesiastes 3:1 â€” 'There is a time for everything, and a season for every activity under the heavens.'",
        devotional:
          "Not every season looks fruitful â€” and that's okay. Autumn strips the tree bare so that winter can rest it and spring can explode with new life. If you're in a dry season, you are not forgotten. God is working underground. The roots go deepest when the soil seems driest.",
        prayerPoints: [
          "Identify what season you are spiritually in right now",
          "Ask God what He is teaching you in this season",
          "Pray for patience and trust in God's timing",
          "Pray for the church worldwide to embrace its current season",
        ],
      },
      {
        day: 4,
        title: "Day 4: We Are Better Together",
        scripture: "Hebrews 10:24-25 â€” 'And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together.'",
        devotional:
          "A single tree can topple in a storm. A forest stands. When trees grow close together, their roots intertwine beneath the soil â€” sharing nutrients, anchoring each other. The church is meant to be this kind of community. Today, consider: whose roots are you intertwined with?",
        prayerPoints: [
          "Thank God for the community He has given you",
          "Pray for one person in your church or group who is isolated",
          "Ask God to deepen your commitment to community",
          "Intercede for the global body of Christ to be united",
        ],
      },
      {
        day: 5,
        title: "Day 5: Go and Bear Fruit",
        scripture: "John 15:16 â€” 'You did not choose me, but I chose you and appointed you so that you might go and bear fruit â€” fruit that will last.'",
        devotional:
          "The final night is not an ending â€” it's a sending. Everything we've received this week is seed to be sown. Your roots are not for you alone; they're the source from which your fruit blesses others. Go. Be planted in your community. Bear fruit in your generation.",
        prayerPoints: [
          "Thank God for everything received this week",
          "Ask for courage to live out what you've heard",
          "Pray for one specific way you will 'bear fruit' this month",
          "Ask God to use you beyond what you can imagine",
        ],
      },
    ],
    downloads: [
      {
        id: "d1",
        title: "Week of Prayer 2026 â€” Study Guide",
        type: "PDF",
        size: "3.2 MB",
        description: "Complete 5-day devotional guide with study notes, discussion questions, and prayer journal pages.",
        locked: false,
      },
      {
        id: "d2",
        title: "Church/School Facilitator Pack",
        type: "ZIP",
        size: "48 MB",
        description: "Everything you need to run WOP in your church or school: sermon notes, PowerPoint slides, bulletin inserts, and promo graphics.",
        locked: true,
      },
      {
        id: "d3",
        title: "Children's Curriculum â€” Rooted in Him",
        type: "PDF",
        size: "8.7 MB",
        description: "Age-appropriate activities, stories, and crafts for children aged 4-12 to participate in the week.",
        locked: true,
      },
      {
        id: "d4",
        title: "Sermon Slides â€” All 5 Nights",
        type: "PPTX",
        size: "22 MB",
        description: "Full presentation slides for all 5 sessions, ready to use on your church screen.",
        locked: true,
      },
      {
        id: "d5",
        title: "Social Media Kit â€” WOP 2026",
        type: "ZIP",
        size: "15 MB",
        description: "Professionally designed graphics for Instagram, Facebook, and WhatsApp to promote Week of Prayer in your community.",
        locked: true,
      },
    ],
  },
  {
    id: "wop-2025",
    title: "Week of Prayer Online 2025",
    year: 2025,
    theme: "The Voice of God",
    tagline: "Learning to hear. Learning to trust.",
    description:
      "Five transformative nights exploring how God speaks â€” through Scripture, community, nature, silence, and suffering. One of our most impactful series to date, drawing 40,000+ viewers from 68 countries.",
    thumbnail:
      "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&q=80&w=800",
    bannerImage:
      "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&q=80&w=1600",
    startDate: "August 19, 2025",
    endDate: "August 23, 2025",
    price: 25,
    status: "active",
    accessDays: 365,
    videos: [
      {
        id: "v1",
        day: 1,
        title: "He Speaks â€” Are We Listening?",
        speaker: "Dr. Kwame Asante",
        description: "Opening night: rediscovering our capacity to hear God in a world full of noise.",
        duration: "51:04",
        thumbnail:
          "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=600",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        locked: false,
      },
      {
        id: "v2",
        day: 2,
        title: "God Speaks Through His Word",
        speaker: "Pastor Grace Ofosu",
        description: "A deep dive into the living power of Scripture and how to approach it as a letter from God.",
        duration: "48:33",
        thumbnail:
          "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&q=80&w=600",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        locked: false,
      },
      {
        id: "v3",
        day: 3,
        title: "God Speaks in the Silence",
        speaker: "Sister Agnes Koomson",
        description: "Learning the ancient discipline of contemplative prayer and hearing God in stillness.",
        duration: "46:18",
        thumbnail:
          "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=80&w=600",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        locked: true,
      },
      {
        id: "v4",
        day: 4,
        title: "God Speaks Through Pain",
        speaker: "Rev. John Mensah-Bonsu",
        description: "The hardest and most powerful message of the series â€” how God's voice is often loudest in our suffering.",
        duration: "55:49",
        thumbnail:
          "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=600",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        locked: true,
      },
      {
        id: "v5",
        day: 5,
        title: "Responding to the Voice â€” A Call to Action",
        speaker: "Bishop Emmanuel Asante",
        description: "Commissioning night: What do we do when we have heard? The cost and the blessing of obedience.",
        duration: "1:02:11",
        thumbnail:
          "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=600",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        locked: true,
      },
    ],
    resources: [
      {
        day: 1,
        title: "Day 1: Tuning In",
        scripture: "1 Samuel 3:10 â€” 'Speak, Lord, for your servant is listening.'",
        devotional: "Samuel was sleeping in the very presence of God and didn't recognize His voice until he was taught how to listen. Many of us are in the same place â€” surrounded by God's presence, but unaware of His voice. Today, we simply practice listening.",
        prayerPoints: [
          "Ask God to open your spiritual ears",
          "Spend 5 minutes in silence â€” just listening",
          "Thank God for speaking to you even when you were not aware",
          "Pray for a listening heart for the rest of the week",
        ],
      },
      {
        day: 2,
        title: "Day 2: The Living Word",
        scripture: "Hebrews 4:12 â€” 'For the word of God is alive and active. Sharper than any double-edged sword.'",
        devotional: "We sometimes treat the Bible like a history book â€” interesting but distant. But the Word of God is described as alive. It breathes. It speaks. Today, don't just read Scripture â€” listen to it. Ask: 'God, what are you saying to me through this passage, today, in my specific situation?'",
        prayerPoints: [
          "Ask God to make Scripture alive to you today",
          "Read Psalm 119:105 slowly and meditate on it",
          "Pray for someone who has never opened a Bible",
          "Thank God for giving us His written Word",
        ],
      },
      {
        day: 3,
        title: "Day 3: The Sound of Sheer Silence",
        scripture: "1 Kings 19:12 â€” 'After the fire came a gentle whisper.'",
        devotional: "Elijah expected fire and earthquake â€” but God came in a whisper. We are trained by our culture to expect the spectacular. But God often chooses the subtle, the soft, the still. What if the reason we can't hear Him is because we've never practiced quietness?",
        prayerPoints: [
          "Practice 10 minutes of complete silence and listening today",
          "Ask God to break your addiction to noise",
          "Pray for the global church to value contemplation",
          "Thank God for meeting Elijah in his exhaustion â€” and for meeting you in yours",
        ],
      },
      {
        day: 4,
        title: "Day 4: God in the Dark",
        scripture: "Romans 8:28 â€” 'And we know that in all things God works for the good of those who love him.'",
        devotional: "Pain is perhaps God's most misunderstood language. Not because He causes pain, but because He meets us in it and speaks through it with a tenderness that prosperity cannot produce. The most intimate encounters with God in Scripture often happen in the darkest moments.",
        prayerPoints: [
          "Bring your deepest pain before God honestly",
          "Pray for one person you know who is suffering deeply",
          "Ask God: 'What are you saying to me through this?'",
          "Declare trust in God's goodness even without understanding",
        ],
      },
      {
        day: 5,
        title: "Day 5: Here I Am â€” Send Me",
        scripture: "Isaiah 6:8 â€” 'Then I heard the voice of the Lord saying, \"Whom shall I send?\" And I said, \"Here am I. Send me!\"'",
        devotional: "Isaiah heard the voice of God and his life was never the same. True hearing leads to radical obedience. The question this final night is not 'Has God spoken?' but 'Are we willing to respond?' The world is waiting for people who have heard and decided to go.",
        prayerPoints: [
          "Say aloud: 'Here I am, Lord. Send me.'",
          "Ask God specifically where He is sending you this season",
          "Pray for courage to step into your calling",
          "Intercede for the global mission of the church",
        ],
      },
    ],
    downloads: [
      {
        id: "d1",
        title: "The Voice of God â€” Study Guide 2025",
        type: "PDF",
        size: "4.1 MB",
        description: "Full 5-day study guide with reflection questions, prayer journal, and supplementary reading list.",
        locked: false,
      },
      {
        id: "d2",
        title: "Church Facilitator Toolkit 2025",
        type: "ZIP",
        size: "52 MB",
        description: "Complete church/school package: slides, notes, bulletin templates, children's materials, and promotional graphics.",
        locked: true,
      },
      {
        id: "d3",
        title: "Audio Sermon Collection â€” All 5 Nights",
        type: "ZIP",
        size: "180 MB",
        description: "High-quality MP3 recordings of all five sessions, ideal for radio broadcast or personal listening.",
        locked: true,
      },
      {
        id: "d4",
        title: "Youth Discussion Guide â€” The Voice of God",
        type: "PDF",
        size: "5.8 MB",
        description: "Specially adapted content for teens and young adults, with modern illustrations and discussion questions.",
        locked: true,
      },
      {
        id: "d5",
        title: "Printable Prayer Journal â€” 30 Days",
        type: "PDF",
        size: "6.2 MB",
        description: "30-day prayer journal to continue the momentum of Week of Prayer beyond the five nights.",
        locked: true,
      },
    ],
  },
  {
    id: "wop-2024",
    title: "Week of Prayer Online 2024",
    year: 2024,
    theme: "All Things New",
    tagline: "Renewal. Restoration. Revival.",
    description:
      "A landmark series that launched the Week of Prayer Online format. Five nights exploring the theme of renewal â€” personally, spiritually, and globally. Watched by over 28,000 people from 54 countries.",
    thumbnail:
      "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=80&w=800",
    bannerImage:
      "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=80&w=1600",
    startDate: "August 20, 2024",
    endDate: "August 24, 2024",
    price: 20,
    status: "archived",
    accessDays: 365,
    videos: [
      {
        id: "v1",
        day: 1,
        title: "Behold, I Am Doing a New Thing",
        speaker: "Pastor James Osei",
        description: "The opening night message on Isaiah 43 â€” God's invitation to stop living in the past and step into what He is creating.",
        duration: "49:22",
        thumbnail: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=600",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        locked: false,
      },
      {
        id: "v2",
        day: 2,
        title: "The Renewal of the Mind",
        speaker: "Dr. Sarah Mensah",
        description: "Romans 12:2 â€” How transformation begins in the mind and how to practically renew your thought life.",
        duration: "53:10",
        thumbnail: "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=600",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        locked: false,
      },
      {
        id: "v3",
        day: 3,
        title: "Restoring Broken Things",
        speaker: "Dr. Kwame Asante",
        description: "The God who specializes in restoration â€” broken relationships, broken faith, broken dreams.",
        duration: "47:55",
        thumbnail: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&q=80&w=600",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        locked: true,
      },
      {
        id: "v4",
        day: 4,
        title: "A New Song",
        speaker: "Elder Ruth Amponsah",
        description: "The role of worship in personal and communal renewal â€” and why singing matters more than we think.",
        duration: "44:30",
        thumbnail: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=600",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        locked: true,
      },
      {
        id: "v5",
        day: 5,
        title: "New Creation â€” Living from the Future",
        speaker: "Bishop Emmanuel Asante",
        description: "Final night: understanding what 2 Corinthians 5:17 means and how to live as a new creation every day.",
        duration: "1:05:18",
        thumbnail: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&q=80&w=600",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        locked: true,
      },
    ],
    resources: [
      { day: 1, title: "Day 1: What's New?", scripture: "Isaiah 43:19", devotional: "God is always doing something new, but we are often too attached to the old to see it. What old thing is God asking you to release today?", prayerPoints: ["Ask God to show you what He is doing new in your life", "Release one thing from the past that has held you back", "Pray for eyes to see God's newness around you"] },
      { day: 2, title: "Day 2: Renewing Your Mind", scripture: "Romans 12:2", devotional: "The battle for transformation is fought in the mind. Every stronghold begins with a thought that was never challenged. Today, challenge your thoughts.", prayerPoints: ["Identify one negative thought pattern you want God to renew", "Memorize Romans 12:2 today", "Pray for mental clarity and spiritual discernment"] },
      { day: 3, title: "Day 3: God Restores", scripture: "Joel 2:25", devotional: "God promised to restore the years the locust had eaten. No matter what has been lost, God is a specialist in restoration. Name what you want restored.", prayerPoints: ["Name specifically what you want God to restore", "Pray for a broken relationship in your life", "Thank God for things He has already restored"] },
      { day: 4, title: "Day 4: A New Song", scripture: "Psalm 40:3", devotional: "Worship is both a response to what God has done and a declaration of what He will do. When you can't find words, music carries the prayer.", prayerPoints: ["Put on a worship song and just listen and receive", "Thank God for three specific things today", "Pray for the gift of joy in your life"] },
      { day: 5, title: "Day 5: New Creation", scripture: "2 Corinthians 5:17", devotional: "You are not who you were. In Christ, the old is gone and the new has come. Today, live from this identity â€” not as someone trying to be new, but as someone who already is.", prayerPoints: ["Declare your identity in Christ out loud", "Ask God how to live more fully as a new creation", "Pray for one person who needs to experience new life"] },
    ],
    downloads: [
      { id: "d1", title: "All Things New â€” Study Guide 2024", type: "PDF", size: "3.8 MB", description: "Complete 5-day devotional study guide from the inaugural Week of Prayer Online series.", locked: false },
      { id: "d2", title: "Inaugural Church Pack 2024", type: "ZIP", size: "44 MB", description: "The original church facilitator toolkit from the 2024 launch series.", locked: false },
      { id: "d3", title: "Children's Storybook â€” God Makes Things New", type: "PDF", size: "9.1 MB", description: "Beautiful illustrated storybook for children based on the 2024 theme.", locked: true },
      { id: "d4", title: "WOP 2024 Full Audio Collection", type: "ZIP", size: "165 MB", description: "All five sermon audio recordings in high quality MP3.", locked: true },
    ],
  },
];
