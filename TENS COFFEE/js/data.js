const WA = "6285959868473"; // Ganti dengan nomor WhatsApp asli Tens Coffee

// Daftar Cabang Aktif
const CABANG = [
  "Kantin Vokasi UI",
  "Margonda Raya",
  "Blok M UNJ",
  "Science Techno Park UI"
];

// Daftar Adds-On sesuai gambar menu
const ADDON = [
  { id: "caramel-sauce", nama: "Caramel sauce", harga: 2000 },
  { id: "choco-sauce", nama: "Choco sauce", harga: 2000 },
  { id: "caramel-crumble", nama: "Caramel crumble", harga: 2000 },
  { id: "choco-crumbs", nama: "Choco crumbs", harga: 3000 },
  { id: "bread", nama: "Bread", harga: 3000 },
  { id: "ice-cream", nama: "Ice cream", harga: 4000 },
  { id: "espresso", nama: "Espresso", harga: 5000 },
  { id: "bowl-takeaway", nama: "Bowl takeaway", harga: 5000 },
  { id: "oatmilk-r", nama: "Oatmilk (R)", harga: 7000 },
  { id: "oatmilk-l", nama: "Oatmilk (L)", harga: 10000 }
];

// Helper untuk mengubah kode SVG menjadi Data URI yang bisa langsung dibaca tag <img>
const svgUrl = svg => "data:image/svg+xml;utf8," + encodeURIComponent(svg.trim());

// Generator Ilustrasi Cup Minuman Khas Tens Coffee (1 gambar unik per parameter)
function gambarCup({ bg, bawah, atas, swirl = "", topping = "", gelasGelap = false }) {
  return svgUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
      <rect width="240" height="240" fill="${bg}"/>
      <ellipse cx="120" cy="212" rx="52" ry="9" fill="rgba(0,0,0,0.14)"/>
      <defs>
        <clipPath id="cupClip">
          <path d="M68 58 L172 58 L156 202 Q154 210 144 210 L96 210 Q86 210 84 202 Z"/>
        </clipPath>
      </defs>
      <!-- Isi Minuman -->
      <g clip-path="url(#cupClip)">
        <rect x="65" y="58" width="110" height="155" fill="${bawah}"/>
        <rect x="65" y="58" width="110" height="58" fill="${atas}"/>
        ${swirl}
        <!-- Es Batu -->
        <rect x="82" y="64" width="24" height="22" rx="5" transform="rotate(-12 94 75)" fill="rgba(255,255,255,0.38)"/>
        <rect x="116" y="62" width="26" height="24" rx="5" transform="rotate(14 129 74)" fill="rgba(255,255,255,0.42)"/>
        <rect x="98" y="80" width="22" height="20" rx="4" transform="rotate(6 109 90)" fill="rgba(255,255,255,0.28)"/>
        ${topping}
      </g>
      <!-- Outline Cup & Tutup -->
      <path d="M68 58 L172 58 L156 202 Q154 210 144 210 L96 210 Q86 210 84 202 Z" fill="none" stroke="${gelasGelap ? '#333' : 'rgba(255,255,255,0.85)'}" stroke-width="3"/>
      <ellipse cx="120" cy="58" rx="55" ry="9" fill="rgba(255,255,255,0.75)" stroke="#d0d7de" stroke-width="2"/>
      <ellipse cx="120" cy="58" rx="46" ry="5.5" fill="none" stroke="rgba(62,99,227,0.35)" stroke-width="1.5"/>
      <!-- Kilau Gelas -->
      <path d="M78 72 L89 194" stroke="rgba(255,255,255,0.45)" stroke-width="4" stroke-linecap="round"/>
      <!-- Logo Vertikal 'tens' -->
      <text x="122" y="142" fill="#ffffff" font-family="Arial Rounded MT Bold, Arial, sans-serif" font-weight="900" font-size="25" text-anchor="middle" transform="rotate(-90 122 142)" letter-spacing="1">tens</text>
    </svg>
  `);
}

// =========================================
// 20 MENU DENGAN 20 ILUSTRASI SVG UNIK
// =========================================
const MENU = [
  // 1. Es Krim Karambol (Kertas kotak-kotak biru-putih + es krim vanila & remah karambol)
  {
    id: "karambol-original",
    nama: "Es Krim Karambol",
    kategori: "Dessert",
    deskripsi: "Es krim signature Tens Coffee dengan taburan biskuit karambol.",
    harga: { R: 14000, L: 20000 },
    badge: "Best Seller",
    stok: true,
    foto: svgUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
        <rect width="240" height="240" fill="#EBF3FF"/>
        <ellipse cx="120" cy="208" rx="76" ry="12" fill="rgba(0,0,0,0.12)"/>
        <!-- Tray Kertas Cokelat -->
        <polygon points="56,162 184,162 168,202 72,202" fill="#C89D6C" stroke="#8C6239" stroke-width="2"/>
        <!-- Kertas Bungkus Kotak-Kotak Biru Putih -->
        <polygon points="34,122 120,96 206,122 182,174 58,174" fill="#ffffff" stroke="#0086E6" stroke-width="2"/>
        <g fill="#0086E6">
          <rect x="54" y="118" width="18" height="16"/><rect x="90" y="108" width="18" height="16"/>
          <rect x="126" y="108" width="18" height="16"/><rect x="162" y="118" width="18" height="16"/>
          <rect x="72" y="134" width="18" height="16"/><rect x="108" y="124" width="18" height="16"/>
          <rect x="144" y="134" width="18" height="16"/><rect x="64" y="150" width="18" height="16"/>
          <rect x="100" y="146" width="18" height="16"/><rect x="136" y="146" width="18" height="16"/>
        </g>
        <!-- 3 Scoop Es Krim Vanila -->
        <circle cx="96" cy="136" r="27" fill="#FFF8E7" stroke="#E6D5B8" stroke-width="2"/>
        <circle cx="144" cy="136" r="27" fill="#FFF8E7" stroke="#E6D5B8" stroke-width="2"/>
        <circle cx="120" cy="112" r="30" fill="#FFFDF7" stroke="#E6D5B8" stroke-width="2"/>
        <!-- Taburan Remah Karambol Keemasan -->
        <g fill="#D9822B">
          <circle cx="115" cy="95" r="3.5"/><circle cx="126" cy="98" r="4"/><circle cx="108" cy="105" r="3"/>
          <circle cx="132" cy="108" r="3.5"/><circle cx="120" cy="114" r="4"/><circle cx="92" cy="126" r="3.5"/>
          <circle cx="104" cy="130" r="3"/><circle cx="142" cy="125" r="3.5"/><circle cx="152" cy="132" r="3"/>
        </g>
      </svg>
    `)
  },

  // 2. Choco Karambol (Kertas kotak-kotak biru-putih + saus cokelat & remah hitam)
  {
    id: "karambol-choco",
    nama: "Choco Karambol",
    kategori: "Dessert",
    deskripsi: "Es krim cokelat signature dengan taburan karambol renyah.",
    harga: { R: 20000, L: 25000 },
    badge: "Best Seller",
    stok: true,
    foto: svgUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
        <rect width="240" height="240" fill="#F3ECE7"/>
        <ellipse cx="120" cy="208" rx="76" ry="12" fill="rgba(0,0,0,0.14)"/>
        <polygon points="56,162 184,162 168,202 72,202" fill="#3B2F2F"/>
        <polygon points="34,122 120,96 206,122 182,174 58,174" fill="#ffffff" stroke="#0086E6" stroke-width="2"/>
        <g fill="#0086E6">
          <rect x="54" y="118" width="18" height="16"/><rect x="90" y="108" width="18" height="16"/>
          <rect x="126" y="108" width="18" height="16"/><rect x="162" y="118" width="18" height="16"/>
          <rect x="72" y="134" width="18" height="16"/><rect x="108" y="124" width="18" height="16"/>
          <rect x="144" y="134" width="18" height="16"/><rect x="64" y="150" width="18" height="16"/>
          <rect x="100" y="146" width="18" height="16"/><rect x="136" y="146" width="18" height="16"/>
        </g>
        <!-- Scoop Es Krim + Lelehan Cokelat Pekat -->
        <circle cx="96" cy="136" r="27" fill="#FFF8E7"/>
        <circle cx="144" cy="136" r="27" fill="#FFF8E7"/>
        <circle cx="120" cy="112" r="30" fill="#FFFDF7"/>
        <path d="M98 102 Q120 84 142 102 Q146 118 136 122 Q128 112 120 126 Q112 112 104 122 Q94 118 98 102 Z" fill="#3E1F0D"/>
        <g fill="#231208">
          <circle cx="114" cy="96" r="3.5"/><circle cx="127" cy="99" r="4"/><circle cx="119" cy="110" r="3.5"/>
          <circle cx="93" cy="128" r="3.5"/><circle cx="147" cy="128" r="3.5"/><circle cx="105" cy="134" r="3"/>
        </g>
      </svg>
    `)
  },

  // 3. Brownies Cheesecake
  {
    id: "brownies-cheesecake",
    nama: "Brownies Cheesecake",
    kategori: "Dessert",
    deskripsi: "Perpaduan fudgy brownies dan cheesecake lembut.",
    harga: { R: 20000 },
    badge: "",
    stok: true,
    foto: svgUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
        <rect width="240" height="240" fill="#F6EFE6"/>
        <ellipse cx="120" cy="188" rx="82" ry="14" fill="#D9CBB8"/>
        <!-- Potongan Brownies Bawah -->
        <polygon points="52,135 168,135 188,162 52,162" fill="#4A2511"/>
        <rect x="52" y="148" width="136" height="28" rx="4" fill="#3B1D0E"/>
        <!-- Lapisan Cheesecake Putih Krim -->
        <polygon points="52,108 168,108 188,135 52,135" fill="#FFFDF5"/>
        <rect x="52" y="124" width="136" height="24" fill="#F7EED3"/>
        <!-- Topping Swirl Cokelat di Atas -->
        <path d="M68 116 Q95 110 120 118 T170 116" fill="none" stroke="#5C2E14" stroke-width="5" stroke-linecap="round"/>
        <path d="M78 125 Q110 120 155 126" fill="none" stroke="#5C2E14" stroke-width="4" stroke-linecap="round"/>
      </svg>
    `)
  },

  // 4. Makaroni Abdul
  {
    id: "makaroni-abdul",
    nama: "Makaroni Abdul",
    kategori: "Pasta",
    deskripsi: "Menu pasta signature gurih favorit mahasiswa.",
    harga: { R: 18000 },
    badge: "",
    stok: true,
    foto: svgUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
        <rect width="240" height="240" fill="#FFF3E0"/>
        <ellipse cx="120" cy="196" rx="78" ry="12" fill="rgba(0,0,0,0.12)"/>
        <!-- Potongan Bawah Makaroni Panggang -->
        <rect x="56" y="136" width="128" height="48" rx="8" fill="#E09F3E" stroke="#9E5A14" stroke-width="2.5"/>
        <rect x="56" y="136" width="128" height="12" rx="4" fill="#F4C95D"/>
        <!-- Potongan Atas Bertumpuk -->
        <rect x="64" y="84" width="122" height="48" rx="8" fill="#E09F3E" stroke="#9E5A14" stroke-width="2.5"/>
        <rect x="64" y="84" width="122" height="12" rx="4" fill="#F4C95D"/>
        <!-- Isian Makaroni & Daging Saus -->
        <g fill="none" stroke="#FFF3B0" stroke-width="5" stroke-linecap="round">
          <path d="M78 106 Q88 98 96 108"/><path d="M110 112 Q122 102 130 114"/><path d="M144 106 Q156 98 164 108"/>
          <path d="M74 158 Q86 148 94 160"/><path d="M108 162 Q120 152 128 164"/><path d="M142 158 Q154 148 162 160"/>
        </g>
        <g fill="#8C2D19">
          <circle cx="102" cy="108" r="4"/><circle cx="136" cy="106" r="4.5"/><circle cx="122" cy="118" r="3.5"/>
          <circle cx="98" cy="160" r="4"/><circle cx="134" cy="158" r="4.5"/><circle cx="116" cy="168" r="3.5"/>
        </g>
      </svg>
    `)
  },

  // 5. Americano
  {
    id: "americano",
    nama: "Americano",
    kategori: "Coffee",
    deskripsi: "Espresso pilihan dengan air mineral segar.",
    harga: { R: 12000, L: 18000, "1L": 84000 },
    badge: "",
    stok: true,
    foto: gambarCup({
      bg: "#EBF1FA",
      bawah: "#261209",
      atas: "#4A2511",
      swirl: `<ellipse cx="120" cy="66" rx="44" ry="8" fill="#8C5327" opacity="0.7"/>`
    })
  },

  // 6. Cafe Latte
  {
    id: "cafe-latte",
    nama: "Cafe Latte",
    kategori: "Coffee",
    deskripsi: "Espresso dengan susu segar creamy tanpa pemanis tambahan.",
    harga: { R: 12000, L: 18000, "1L": 84000 },
    badge: "",
    stok: true,
    foto: gambarCup({
      bg: "#F5EFE6",
      bawah: "#E8D5B7",
      atas: "#9C663B",
      swirl: `<path d="M75 115 Q120 132 165 110 L165 135 Q120 145 75 130 Z" fill="#C49363" opacity="0.6"/>`
    })
  },

  // 7. Aren Latte
  {
    id: "aren-latte",
    nama: "Aren Latte",
    kategori: "Coffee",
    deskripsi: "Kopi susu favorit dengan manis alami gula aren.",
    harga: { R: 15000, L: 22000, "1L": 84000 },
    badge: "Best Seller",
    stok: true,
    foto: gambarCup({
      bg: "#F7EDE2",
      bawah: "#F3E5D0",
      atas: "#8B5A2B",
      swirl: `
        <path d="M75 190 Q120 205 165 188 L160 210 L80 210 Z" fill="#5C2C06"/>
        <path d="M84 120 L92 195 M112 115 L106 198 M148 118 L142 195" stroke="#7A3E0C" stroke-width="5" stroke-linecap="round" opacity="0.75"/>
      `
    })
  },

  // 8. Caramel Latte
  {
    id: "caramel-latte",
    nama: "Caramel Latte",
    kategori: "Coffee",
    deskripsi: "Perpaduan espresso, susu creamy, dan sirup karamel manis.",
    harga: { R: 18000, L: 25000, "1L": 108000 },
    badge: "",
    stok: true,
    foto: gambarCup({
      bg: "#FDF3E7",
      bawah: "#F2DEC4",
      atas: "#B0733B",
      swirl: `<path d="M80 110 Q95 155 88 195 M145 105 Q132 150 142 195" stroke="#D9822B" stroke-width="6" fill="none" stroke-linecap="round"/>`
    })
  },

  // 9. Sea Salt Butterscotch Latte
  {
    id: "sea-salt-butterscotch-latte",
    nama: "Sea Salt Butterscotch Latte",
    kategori: "Coffee",
    deskripsi: "Kopi susu butterscotch dengan sentuhan gurih sea salt.",
    harga: { R: 20000, L: 28000, "1L": 120000 },
    badge: "Best Seller",
    stok: true,
    foto: gambarCup({
      bg: "#EEF4FB",
      bawah: "#E6C79C",
      atas: "#FFFDF7",
      swirl: `
        <rect x="65" y="92" width="110" height="44" fill="#8F5624"/>
        <path d="M70 92 Q120 104 170 92" stroke="#E09F3E" stroke-width="4" fill="none"/>
      `
    })
  },

  // 10. Caramel Macchiatto
  {
    id: "caramel-macchiatto",
    nama: "Caramel Macchiatto",
    kategori: "Coffee",
    deskripsi: "Susu vanilla lembut berpadu espresso dan saus karamel.",
    harga: { R: 20000, L: 28000, "1L": 120000 },
    badge: "",
    stok: true,
    foto: gambarCup({
      bg: "#FAF0E4",
      bawah: "#FFF9EE",
      atas: "#6F3E1D",
      swirl: `<path d="M82 88 L156 102 L85 114 L152 128" stroke="#C86D1F" stroke-width="4.5" fill="none" stroke-linecap="round"/>`
    })
  },

  // 11. Spanish Latte
  {
    id: "spanish-latte",
    nama: "Spanish Latte",
    kategori: "Coffee",
    deskripsi: "Kopi susu klasik dengan tekstur creamy yang kaya rasa.",
    harga: { R: 20000, L: 28000, "1L": 120000 },
    badge: "",
    stok: true,
    foto: gambarCup({
      bg: "#F4ECE1",
      bawah: "#DFC39D",
      atas: "#A66E3E",
      swirl: `<path d="M72 145 Q120 160 168 142 L162 210 L78 210 Z" fill="#F5E8D3"/>`
    })
  },

  // 12. Aren Oat Latte
  {
    id: "aren-oat-latte",
    nama: "Aren Oat Latte",
    kategori: "Coffee",
    deskripsi: "Kopi susu gula aren menggunakan susu oat nabati.",
    harga: { R: 22000, L: 30000, "1L": 130000 },
    badge: "",
    stok: true,
    foto: gambarCup({
      bg: "#F2EFE9",
      bawah: "#E5D9C3",
      atas: "#8A5A32",
      swirl: `<path d="M76 186 Q120 202 164 186 L158 210 L82 210 Z" fill="#63320A"/>`
    })
  },

  // 13. Hazelnut Oat Latte
  {
    id: "hazelnut-oat-latte",
    nama: "Hazelnut Oat Latte",
    kategori: "Coffee",
    deskripsi: "Perpaduan kopi, aroma kacang hazelnut, dan susu oat.",
    harga: { R: 22000, L: 30000, "1L": 130000 },
    badge: "",
    stok: true,
    foto: gambarCup({
      bg: "#F5EFE6",
      bawah: "#DFCEB4",
      atas: "#966134",
      swirl: `<circle cx="105" cy="145" r="18" fill="#B88456" opacity="0.35"/><circle cx="138" cy="165" r="22" fill="#B88456" opacity="0.3"/>`
    })
  },

  // 14. Lychee Tea
  {
    id: "lychee-tea",
    nama: "Lychee Tea",
    kategori: "Thai Tea",
    deskripsi: "Teh manis segar dengan aroma dan buah leci.",
    harga: { R: 15000, L: 18000, "1L": 90000 },
    badge: "",
    stok: true,
    foto: gambarCup({
      bg: "#FDEEE2",
      bawah: "#C86D2D",
      atas: "#E08E45",
      topping: `
        <ellipse cx="102" cy="68" rx="15" ry="10" fill="#FFFDF9" stroke="#E6D5C3" stroke-width="1.5"/>
        <ellipse cx="134" cy="70" rx="15" ry="10" fill="#FFFDF9" stroke="#E6D5C3" stroke-width="1.5"/>
        <ellipse cx="118" cy="186" rx="14" ry="10" fill="rgba(255,253,249,0.8)"/>
      `
    })
  },

  // 15. Sparkling Blue
  {
    id: "sparkling-blue",
    nama: "Sparkling Blue",
    kategori: "Non-Coffee",
    deskripsi: "Minuman soda biru menyegarkan khas Tens Coffee.",
    harga: { R: 15000, L: 18000, "1L": 90000 },
    badge: "",
    stok: true,
    foto: gambarCup({
      bg: "#E6F4FF",
      bawah: "#0095F6",
      atas: "#5CC2FF",
      swirl: `
        <circle cx="95" cy="150" r="3" fill="#fff" opacity="0.7"/><circle cx="138" cy="130" r="4" fill="#fff" opacity="0.7"/>
        <circle cx="110" cy="175" r="3.5" fill="#fff" opacity="0.7"/><circle cx="145" cy="168" r="2.5" fill="#fff" opacity="0.7"/>
      `,
      topping: `<circle cx="142" cy="66" r="14" fill="#F59E0B" stroke="#FDE68A" stroke-width="2.5"/>`
    })
  },

  // 16. Taro Latte
  {
    id: "taro-latte",
    nama: "Taro Latte",
    kategori: "Non-Coffee",
    deskripsi: "Minuman susu rasa talas ungu yang manis dan lembut.",
    harga: { R: 15000, L: 18000, "1L": 90000 },
    badge: "",
    stok: true,
    foto: gambarCup({
      bg: "#F4ECFF",
      bawah: "#B57EDC",
      atas: "#9B5DE5",
      swirl: `<path d="M74 130 Q120 148 166 128 L160 210 L80 210 Z" fill="#C996EC" opacity="0.6"/>`
    })
  },

  // 17. Charcoal Latte
  {
    id: "charcoal-latte",
    nama: "Charcoal Latte",
    kategori: "Non-Coffee",
    deskripsi: "Minuman susu charcoal unik dengan rasa creamy favorit.",
    harga: { R: 18000, L: 22000, "1L": 108000 },
    badge: "Best Seller",
    stok: true,
    foto: gambarCup({
      bg: "#ECEEF2",
      bawah: "#374151",
      atas: "#1F2937",
      swirl: `<path d="M76 140 Q120 120 164 145 L158 210 L82 210 Z" fill="#6B7280" opacity="0.45"/>`,
      topping: `<circle cx="112" cy="64" r="14" fill="#FFFBEB"/><circle cx="132" cy="66" r="12" fill="#FEF3C7"/>`
    })
  },

  // 18. Choco Latte
  {
    id: "choco-latte",
    nama: "Choco Latte",
    kategori: "Non-Coffee",
    deskripsi: "Cokelat pekat berpadu susu segar.",
    harga: { R: 18000, L: 22000, "1L": 108000 },
    badge: "",
    stok: true,
    foto: gambarCup({
      bg: "#F5EBE6",
      bawah: "#5C3317",
      atas: "#8B5A2B",
      swirl: `
        <path d="M76 125 Q115 145 164 120 L160 175 Q115 160 78 180 Z" fill="#D7B89C" opacity="0.55"/>
        <ellipse cx="120" cy="64" rx="44" ry="7" fill="#3B1E0D"/>
      `
    })
  },

  // 19. Coco Matcha
  {
    id: "coco-matcha",
    nama: "Coco Matcha",
    kategori: "Matcha",
    deskripsi: "Perpaduan segar air/susu kelapa dengan matcha pilihan.",
    harga: { R: 23000, L: 30000, "1L": 130000 },
    badge: "New Arrival",
    stok: true,
    foto: gambarCup({
      bg: "#ECF7E8",
      bawah: "#DCEAD5",
      atas: "#4C8C2B",
      swirl: `<path d="M72 104 Q105 122 132 106 T168 112 L168 85 L72 85 Z" fill="#5FA336"/>`
    })
  },

  // 20. Kiwi Squash
  {
    id: "kiwi-squash",
    nama: "Kiwi Squash",
    kategori: "Non-Coffee",
    deskripsi: "Kesegaran buah kiwi dengan soda dingin.",
    harga: { R: 25000, L: 32000, "1L": 132000 },
    badge: "New Arrival",
    stok: true,
    foto: gambarCup({
      bg: "#EFFAE6",
      bawah: "#7CB518",
      atas: "#AACC00",
      swirl: `
        <circle cx="96" cy="120" r="2.5" fill="#1F2937"/><circle cx="136" cy="145" r="2.5" fill="#1F2937"/>
        <circle cx="108" cy="168" r="2.5" fill="#1F2937"/><circle cx="144" cy="115" r="2.5" fill="#1F2937"/>
        <circle cx="90" cy="152" r="3" fill="#fff" opacity="0.6"/>
      `,
      topping: `<ellipse cx="136" cy="65" rx="14" ry="8" fill="#65A30D" stroke="#ECFCCB" stroke-width="2"/>`
    })
  }
]