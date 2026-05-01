const perfumes = [
  {
    slug: 'royal-oud',
    name: 'Royal Oud',
    price: '₹4,999',
    image: 'https://images.pexels.com/photos/30618765/pexels-photo-30618765.jpeg?cs=srgb&dl=pexels-vldsx-500651237-30618765.jpg&fm=jpg',
    shortDescription: 'A rich, smoky signature built with saffron, oud, and amber for formal evenings.',
    description:
      'Royal Oud opens with a refined burst of saffron and bergamot before settling into a regal heart of oud, rose, and incense. The base is warm amber and cedar, designed to leave a deep, elegant trail.',
    notes: {
      top: ['Saffron', 'Bergamot', 'Pink Pepper'],
      middle: ['Oud', 'Rose', 'Incense'],
      base: ['Amber', 'Cedar', 'Patchouli'],
    },
  },
  {
    slug: 'cedar-noir',
    name: 'Cedar Noir',
    price: '₹4,299',
    image: 'https://plus.unsplash.com/premium_photo-1694787017981-b50b773a2c1e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    shortDescription: 'Smoky cedar and warm spice for evening wear.',
    category: 'woody',
    description: 'Cedar Noir balances resinous cedar with toasted spice and a whisper of leather for a modern woody signature.',
    notes: { top: ['Black Pepper'], middle: ['Cedar', 'Cashmere'], base: ['Leather', 'Amber'] }
  },
  {
    slug: 'velvet-orchid',
    name: 'Velvet Orchid',
    price: '₹3,899',
    image: 'https://images.pexels.com/photos/33820344/pexels-photo-33820344.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    shortDescription: 'Opulent floral with dark honeyed facets.',
    category: 'floral',
    description: 'Velvet Orchid explores luminous flowers against a rich gourmand background for a sensual floral-oriental.',
    notes: { top: ['Honey', 'Bergamot'], middle: ['Orchid', 'Jasmine'], base: ['Vanilla', 'Patchouli'] }
  },
  {
    slug: 'jasmine-dawn',
    name: 'Jasmine Dawn',
    price: '₹2,999',
    image: 'https://plus.unsplash.com/premium_photo-1689247946399-c4f532fda0f9?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    shortDescription: 'Transparent jasmine with citrus lift.',
    category: 'floral',
    description: 'A bright, modern jasmine with a clean, luminous profile ideal for daytime elegance.',
    notes: { top: ['Bergamot'], middle: ['Jasmine', 'Orange Blossom'], base: ['White Musk'] }
  },
  {
    slug: 'sea-mist',
    name: 'Sea Mist',
    price: '₹3,199',
    image: 'https://plus.unsplash.com/premium_photo-1763492117517-e97ab533980c?q=80&w=398&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfGVuDB8fHx8fA%3D%3D',
    shortDescription: 'Crisp marine accord with citrus and ozone.',
    category: 'fresh',
    description: 'Sea Mist is a modern aquatic with sparkling citrus and a clean salt-ozone accord.',
    notes: { top: ['Grapefruit', 'Sea Salt'], middle: ['Marine Accord'], base: ['Driftwood'] }
  },
  {
    slug: 'oud-voyage',
    name: 'Oud Voyage',
    price: '₹6,299',
    image: 'https://images.pexels.com/photos/33820345/pexels-photo-33820345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    shortDescription: 'A dense oud backed by resinous amber.',
    category: 'oriental',
    description: 'Oud Voyage is a bold, travel-inspired oud with resin and spice, designed for signature moments.',
    notes: { top: ['Saffron'], middle: ['Oud', 'Incense'], base: ['Amber', 'Resin'] }
  },
  {
    slug: 'midnight-rose',
    name: 'Midnight Rose',
    price: '₹3,999',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAUGuAIx7IUJZHqaowm1nOH8aMFcrdwx02PA&s',
    shortDescription: 'A velvet floral composition with deep musk and a soft luminous finish.',
    description:
      'Midnight Rose balances fresh pear and mandarin with a luminous rose heart. Musk, vanilla, and soft woods wrap the fragrance in a smooth, intimate finish.',
    notes: {
      top: ['Pear', 'Mandarin', 'Bergamot'],
      middle: ['Rose', 'Peony', 'Jasmine'],
      base: ['Musk', 'Vanilla', 'Sandalwood'],
    },
  },
  {
    slug: 'ocean-breeze',
    name: 'Ocean Breeze',
    price: '₹3,499',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSazTAU5JTqqQC-xXvG95DsJMuavt8eyB3SVQ&s',
    shortDescription: 'A clean marine scent with citrus sparkle and airy woods.',
    description:
      'Ocean Breeze is crisp and modern. Sparkling citrus and cool marine notes meet transparent woods, making it an effortless everyday signature.',
    notes: {
      top: ['Lemon', 'Grapefruit', 'Sea Salt'],
      middle: ['Marine Accord', 'Lavender', 'Sage'],
      base: ['Driftwood', 'Ambergris', 'White Musk'],
    },
  },
  {
    slug: 'amber-lumiere',
    name: 'Amber Lumière',
    price: '₹5,499',
    image: 'https://ottochemperfumes.com/cdn/shop/files/Ember_spice_main_image.png?v=1768485664',
    shortDescription: 'A radiant amber-spice blend with warm depth and polished sweetness.',
    description:
      'Amber Lumière opens bright and polished, then unfolds into cinnamon spice, cashmere woods, and golden amber. The result is rich but smooth, with a modern luxury edge.',
    notes: {
      top: ['Blood Orange', 'Cardamom', 'Ginger'],
      middle: ['Cinnamon', 'Cashmere Wood', 'Tonka'],
      base: ['Amber', 'Leather', 'Vanilla'],
    },
  },
]

export default perfumes