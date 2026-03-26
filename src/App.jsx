import { useState, useEffect } from "react";

// ─── Brand Colors (extracted from PDF) ───────────────────────
const BRAND = {
  top: "#32CDFF",       // brand light sky blue
  mid1: "#2BB6E8",      // ~15%
  mid2: "#239FD1",      // ~30%
  mid3: "#1980B2",      // ~50%
  mid4: "#0F6193",      // ~70%
  bottom: "#054274",    // ~90%
  darkest: "#003264",   // brand dark blue
  white: "#FFFFFF",
  textMuted: "rgba(255,255,255,0.8)",
  textLight: "rgba(255,255,255,0.65)",
  cardBg: "rgba(255,255,255,0.08)",
  cardBorder: "rgba(255,255,255,0.15)",
  tableBg: "rgba(255,255,255,0.12)",
  tableRow: "rgba(255,255,255,0.06)",
  dropBlue: "#32CDFF",  // brand accent
};

// ─── Plant Data ───────────────────────────────────────────────
const PLANTS = [
  { id: 1, name: "Baja Ruellia", image: "bajaruellia.png", categories: ["Modern", "Adaptive"], description: "A small shrub with light green foliage and lavender, trumpet-shaped flowers that bloom in summer.", drought: 2, sun: "both", cutback: false, type: "shrub", price: 1 },
  { id: 2, name: "Coral Fountain Grass", image: "coralfountaingrass.png", categories: ["Modern", "Adaptive"], description: "A graceful ornamental grass with arching green leaves and pinkish-red, foxtail-like plumes that resemble water spraying from a fountain.", drought: 3, sun: "full", cutback: false, type: "grass", price: 1 },
  { id: 3, name: 'Dwarf Olive Shrub "Little Ollies"', image: "dwarfoliveshrub.png", categories: ["Modern"], description: "A slow-growing, compact shrub with attractive silvery-green foliage, often used for hedges or accents. Tolerant of heat and drought once established.", drought: 2, sun: "full", cutback: false, type: "shrub", price: 1 },
  { id: 4, name: "Gardenia", image: "gardenia.png", categories: ["Modern"], description: "Highly fragrant evergreen shrub with creamy white flowers and glossy, dark green leaves. Prefers partial shade.", drought: 4, sun: "partial", cutback: false, type: "shrub", price: 2 },
  { id: 5, name: "Gold Lantana", image: "goldlantana.png", categories: ["Modern", "Adaptive"], description: "A low-maintenance, mounding lantana with bright gold-yellow flower clusters. Excellent for attracting butterflies. Rejuvenation cutback candidate.", drought: 2, sun: "full", cutback: true, type: "shrub", price: 1 },
  { id: 7, name: "Hopseed Bush", image: "hopseedbush.png", categories: ["Modern", "Adaptive", "Xeriscape"], description: "An evergreen shrub or small tree with slender green or purple leaves. Very durable and drought-tolerant, used for screening.", drought: 2, sun: "full", cutback: false, type: "shrub", price: 1 },
  { id: 8, name: "Mexican Red Bird of Paradise", image: "mexicanredbirdofparadise.png", categories: ["Modern", "Adaptive"], description: "A desert shrub with bright red and yellow, pea-like flowers and ferny foliage. Blooms from spring until fall in warm climates. Should only be planted in open areas, where it can grow to its full size. Rejuvenation cutback candidate.", drought: 2, sun: "full", cutback: true, type: "shrub", price: 2 },
  { id: 9, name: "Orange Jubilee", image: "orangejubilee.png", categories: ["Modern", "Adaptive"], description: "A fast-growing shrub or small tree with showy clusters of bright orange, trumpet-shaped flowers. Attracts hummingbirds. Rejuvenation cutback candidate.", drought: 2, sun: "full", cutback: true, type: "shrub", price: 1 },
  { id: 10, name: "Outback Sunrise", image: "outbacksunrise.png", categories: ["Modern", "Adaptive"], description: "A dark green, ground cover plant with bright yellow flowers. Grows quickly, and thrives in full sun.", drought: 2, sun: "full", cutback: false, type: "groundcover", price: 1 },
  { id: 11, name: "Radiation Lantana", image: "radiationlantana.png", categories: ["Modern", "Adaptive"], description: "A vigorous, mounding lantana variety known for its continuous display of flowers that are bright red, fading to orange and yellow. Rejuvenation cutback candidate.", drought: 2, sun: "full", cutback: true, type: "shrub", price: 1 },
  { id: 13, name: "Sago Palm", image: "sagopalm.png", categories: ["Modern"], description: "A very slow-growing palm with a symmetrical crown of stiff, dark green fronds. A popular, architectural plant for landscape accents. Prefers shade.", drought: 3, sun: "partial", cutback: false, type: "palm", price: 3 },
  { id: 15, name: "Torch Glow Bougainvillea", image: "torchglowbougainvillea.png", categories: ["Modern", "Adaptive"], description: "A unique, upright, and non-vining bougainvillea with vivid magenta-red bracts. Excellent as a colorful hedge or accent plant.", drought: 2, sun: "full", cutback: true, type: "shrub", price: 1 },
  { id: 44, name: "Mexican Bird of Paradise", image: "mexicanbirdofparadise.png", categories: ["Modern", "Adaptive", "Xeriscape", "Trees"], description: "This small, ornamental tree or large shrub boasts striking, colorful blooms that are typically yellow. It is highly drought-tolerant once established.", drought: 2, sun: "full", cutback: false, type: "tree", price: 2 },
  { id: 43, name: "Chinese Elm", image: "chineseelm.png", categories: ["Modern", "Adaptive", "Trees"], description: "The Chinese Elm is a fast-growing, semi-deciduous tree prized for its attractive, mottled bark and excellent shade qualities. It is adaptable to various soil types.", drought: 3, sun: "full", cutback: false, type: "tree", price: 2 },
  { id: 42, name: 'Ruellia Simplex "Mexican Petunia"', image: "ruelliasimplex.png", categories: ["Modern", "Adaptive"], description: "Commonly known as Mexican Petunia, this perennial features trumpet-shaped flowers, typically purple, that bloom throughout the warm season. It is a resilient and low-maintenance plant.", drought: 2, sun: "both", cutback: false, type: "shrub", price: 1 },
  { id: 41, name: "Morning Glory", image: "morningglory.png", categories: ["Modern", "Adaptive"], description: "The Morning Glory Shrub offers beautiful, funnel-shaped flowers, often blue or purple, that open in the morning and close later in the day. It provides dense coverage and is fast-growing. Makes excellent groundcover.", drought: 2, sun: "both", cutback: false, type: "groundcover", price: 1 },
  { id: 40, name: "Myoporum", image: "myoporum.png", categories: ["Modern", "Adaptive"], description: "Myoporum is a versatile, evergreen shrub or groundcover known for its tolerance to heat and poor soil. It has small, white flowers and dense, bright green foliage, making it a good choice for screens or mass planting. Makes for excellent ground cover.", drought: 2, sun: "full", cutback: false, type: "groundcover", price: 1 },
  { id: 39, name: "Hong Kong Orchid", image: "hongkongorchid.png", categories: ["Modern", "Trees"], description: "A spectacular ornamental tree famous for its large, fragrant flowers and butterfly-shaped leaves. Provides rare winter color by blooming late fall to early spring.", drought: 3, sun: "partial", cutback: false, type: "tree", price: 3 },
  { id: 38, name: "Velvet Mesquite", image: "velvetmesquite.png", categories: ["Modern", "Adaptive", "Xeriscape", "Trees"], description: "The Mesquite tree is known for its shade and tolerance to arid conditions. It features feathery, green foliage and produces bean pods. Does best in open, unconfined areas.", drought: 1, sun: "full", cutback: false, type: "tree", price: 2 },
  { id: 37, name: "Elephant Food", image: "elephantfood.png", categories: ["Modern", "Xeriscape"], description: "A versatile, succulent shrub. Known for its emerald green leaves, it comes in different varieties like variegated, trailing, and mammoth. Does best in pots and planters.", drought: 1, sun: "full", cutback: false, type: "succulent", price: 1 },
  { id: 36, name: "Fuego Tecoma", image: "fuegotecoma.png", categories: ["Modern"], description: "A compact, fast-growing shrub known for its intense red-orange flowers. The hybrid cousin of the yellow bells, it tends to stay under 6 feet tall.", drought: 2, sun: "full", cutback: false, type: "shrub", price: 1 },
  { id: 16, name: "Yellow Bell", image: "yellowbell.png", categories: ["Modern", "Adaptive"], description: "A cousin to the Orange Jubilee; fast-growing shrub or small tree with showy clusters of bright yellow, trumpet-shaped flowers. Attracts hummingbirds. Cutback candidate.", drought: 2, sun: "full", cutback: true, type: "shrub", price: 1 },
  { id: 17, name: "Little Leaf Cordia", image: "littleleafcordia.png", categories: ["Adaptive"], description: "A desert-adapted shrub with a dense, mounding form and small, gray-green leaves. Provides texture and is very heat tolerant. Should only be planted in desert space, like retentions.", drought: 2, sun: "both", cutback: false, type: "shrub", price: 1 },
  { id: 18, name: "Agave Americana", image: "agaveamericana.png", categories: ["Xeriscape"], description: "A large, blue tinted agave. Produces pups around the base and will produce a massive flower stalk signaling the end of its life cycle.", drought: 1, sun: "full", cutback: false, type: "succulent", price: 2 },
  { id: 19, name: "Aloe Vera", image: "aloevera.png", categories: ["Xeriscape"], description: "A clumping aloe with thick, fleshy, spotted leaves, often used for its soothing gel. A hardy, easy-to-grow succulent.", drought: 1, sun: "full", cutback: false, type: "succulent", price: 2 },
  { id: 20, name: "Artichoke Agave", image: "artichokeagave.png", categories: ["Xeriscape"], description: "A medium-sized agave that forms a tight, symmetrical rosette of gray-green leaves, resembling an artichoke head.", drought: 1, sun: "full", cutback: false, type: "succulent", price: 2 },
  { id: 21, name: "Argentine Giant Cactus", image: "argentinegiantcactus.png", categories: ["Xeriscape"], description: "A columnar cactus known for its very large, fragrant white flowers that open at night. Grows in tall, ribbed columns.", drought: 1, sun: "full", cutback: false, type: "cactus", price: 2 },
  { id: 22, name: "Blue Elf Aloe", image: "blueelfaloe.png", categories: ["Xeriscape"], description: "A fast-clumping aloe that produces striking red-orange flower spikes in winter. Its blue-green leaves add year-round color.", drought: 1, sun: "full", cutback: false, type: "succulent", price: 2 },
  { id: 23, name: "Firestick", image: "firestick.png", categories: ["Xeriscape"], description: "A striking, low-maintenance succulent known for its pencil-thin branches that turn from bright green to fiery orange in the winter. Can grow to 8-10 feet tall.", drought: 1, sun: "full", cutback: false, type: "succulent", price: 2 },
  { id: 24, name: "Fish Hook Barrel", image: "fishhookbarrel.png", categories: ["Xeriscape"], description: "A spherical to columnar cactus covered in fierce, hooked spines that resemble fish hooks. A tough, iconic desert plant.", drought: 1, sun: "full", cutback: false, type: "cactus", price: 2 },
  { id: 25, name: "Golden Barrel", image: "goldenbarrel.png", categories: ["Xeriscape"], description: "A solitary, spherical cactus with golden-yellow spines and ribs. A classic, architectural desert plant that can grow quite large.", drought: 1, sun: "full", cutback: false, type: "cactus", price: 2 },
  { id: 26, name: "Lady Slipper Succulent", image: "ladyslippersucculent.png", categories: ["Xeriscape"], description: "A unique, multi-branched succulent with thin, pencil-like, green stems. Prefers partial sun and is very drought tolerant. Pink-orange flowers.", drought: 1, sun: "full", cutback: false, type: "succulent", price: 2 },
  { id: 27, name: "Mexican Fence Post", image: "mexicanfencepost.png", categories: ["Xeriscape"], description: "A tall, columnar cactus with a chalky blue-green color, used to create living fences or strong vertical accents.", drought: 1, sun: "full", cutback: false, type: "cactus", price: 2 },
  { id: 28, name: "Moroccan Mound", image: "moroccanmound.png", categories: ["Xeriscape"], description: "A low-growing, mounding cactus that spreads to form a dense clump of cylindrical, spiny stems.", drought: 1, sun: "full", cutback: false, type: "cactus", price: 2 },
  { id: 29, name: "Queen Victoria Agave", image: "queenvictoriaagave.png", categories: ["Xeriscape"], description: "A slow growing, highly symmetrical agave that is known for its architectural form and green color. Can grow up to 12-18 inches tall.", drought: 1, sun: "full", cutback: false, type: "succulent", price: 2 },
  { id: 30, name: "Red Push Pistache", image: "redpushpistache.png", categories: ["Trees"], description: "A hardy, fast-growing deciduous tree; renowned for its winter foliage that turns a striking red color.", drought: 3, sun: "full", cutback: false, type: "tree", price: 2 },
  { id: 31, name: "Texas Live Oak", image: "texasliveoak.png", categories: ["Trees"], description: "A hardy, drought-tolerant, evergreen tree; dark trunk with dark green leaves. Survives in parking lots through the summer heat.", drought: 2, sun: "both", cutback: false, type: "tree", price: 2 },
  { id: 33, name: "Pygmy Palm", image: "pygmypalm.png", categories: ["Trees"], description: "A small, slow-growing, slender palm with a slightly curved trunk and fine-textured, bright green, arching fronds. Ideal for small spaces.", drought: 3, sun: "both", cutback: false, type: "palm", price: 2 },
  { id: 34, name: "Mexican Fan Palm", image: "mexicanfanpalm.png", categories: ["Trees"], description: "A fast-growing, evergreen palm, known for its towering height and fan-shaped fronds. Can grow up to 100 feet tall, heat and drought tolerant.", drought: 1, sun: "full", cutback: false, type: "palm", price: 3 },
  { id: 35, name: "Date Palm", image: "datepalm.png", categories: ["Trees"], description: "An evergreen palm, known for its blue-tinted fronds. Produces date fruits in bunches every May; is both heat and drought-tolerant.", drought: 1, sun: "full", cutback: false, type: "palm", price: 3 },
  { id: 45, name: "Tangerine Beauty Crossvine", image: "tangerinebeautycrossvine.png", categories: ["Modern", "Adaptive"], description: "A vigorous, semi-evergreen to evergreen vine, known for its trumpet-shaped, reddish-orange flowers with a yellow throat. Stunning addition to cover walls, fences, and trellises.", drought: 2, sun: "both", cutback: false, type: "vine", price: 1 },
  { id: 46, name: "Caribbean Agave", image: "caribbeanagave.png", categories: ["Xeriscape"], description: "A medium-sized agave with dense, symmetrical rosettes of sword-shaped leaves. The variegated variety is preferred, with its striking white edges.", drought: 1, sun: "full", cutback: false, type: "succulent", price: 2 },
  { id: 47, name: "Weber's Agave", image: "webersagave.png", categories: ["Xeriscape"], description: "A medium-sized agave native to Mexico. With striking blue-green leaves, this agave tends to grow 4-6 feet tall and can be 6 feet wide.", drought: 1, sun: "full", cutback: false, type: "succulent", price: 2 },
  { id: 48, name: "Yellow Ice Plant", image: "yellowiceplant.png", categories: ["Modern", "Adaptive"], description: "Often called 'Rocky Point Ice Plant', this hearty succulent forms a dense ground cover with bright yellow, daisy-like flowers.", drought: 2, sun: "full", cutback: false, type: "groundcover", price: 1 },
  { id: 49, name: "Acacia Mulga", image: "acaciamulga.png", categories: ["Trees"], description: "A hearty, drought-resistant tree native to Australia. Well-known for its silvery-grey foliage and adaptability to harsh climates. Produces small, yellow cylindrical flowers.", drought: 2, sun: "full", cutback: false, type: "tree", price: 2 },
];

const CATEGORIES = ["All", "Modern", "Xeriscape", "Adaptive", "Trees"];
const CATEGORY_LABELS = { All: "All Plants", Modern: "Modern & Premier", Xeriscape: "Desert / Xeriscape", Adaptive: "Adaptive", Trees: "Trees & Palms" };

const CATEGORY_COLORS = {
  Modern:    { bg: "rgba(160,210,255,0.25)", border: "rgba(160,210,255,0.7)" },   // cool blue
  Xeriscape: { bg: "rgba(255,190,120,0.25)", border: "rgba(255,190,120,0.7)" },   // warm amber
  Adaptive:  { bg: "rgba(140,230,180,0.25)", border: "rgba(140,230,180,0.7)" },   // soft green
  Trees:     { bg: "rgba(200,170,255,0.25)", border: "rgba(200,170,255,0.7)" },   // light purple
};

const CUTBACK_CALENDAR = [
  { month: "January", tasks: "Cutback ornamental grasses", active: true },
  { month: "February", tasks: "Rejuvenation cutbacks: bougainvillea, lantana, yellow/orange bells, sages, natal plums, ruellia, red birds of paradise, oleanders", active: true },
  { month: "March", tasks: "Rejuvenation cutbacks: bougainvillea, lantana, yellow/orange bells, sages, natal plums, ruellia, red birds of paradise, oleanders", active: true },
  { month: "April", tasks: "Rejuvenation cutbacks: bougainvillea, lantana, yellow/orange bells, sages, natal plums, ruellia, red birds of paradise, oleanders. Install summer flowers", active: true },
  { month: "May", tasks: "Stop all rejuvenation cutbacks", active: false },
  { month: "June", tasks: "Minor pruning only — safety pruning away from curbs, sidewalks, blocking signage", active: false },
  { month: "July", tasks: "Minor pruning only — safety pruning away from curbs, sidewalks, blocking signage", active: false },
  { month: "August", tasks: "Minor pruning only — safety pruning away from curbs, sidewalks, blocking signage", active: false },
  { month: "September", tasks: "Minor pruning only — safety pruning away from curbs, sidewalks, blocking signage", active: false },
  { month: "October", tasks: "Rejuvenation cutbacks: sages + petite oleanders. Install winter flowers", active: true },
  { month: "November", tasks: "Rejuvenation cutbacks (only where needed): sages and petite oleanders. Start thinning red yuccas", active: true },
  { month: "December", tasks: "Rejuvenation cutbacks: thinning red yucca only", active: true },
];

const DROUGHT_LABELS = ["", "Very High", "High", "Moderate", "Low", "Very Low"];
const DROUGHT_DESC = [
  "",
  "Survives on minimal to no supplemental water once established.",
  "Needs infrequent watering, survives extended dry periods.",
  "Requires regular but infrequent deep watering.",
  "Needs regular, consistent watering, especially in heat.",
  "Requires frequent watering, not suitable for xeric landscapes.",
];

// ─── SVG Components ───────────────────────────────────────────
const WaterDrop = ({ filled, size = 18 }) => (
  <svg width={size * 0.78} height={size} viewBox="0 0 14 18" fill="none">
    <path d="M7 1C7 1 1 8 1 11.5C1 14.5 3.7 17 7 17C10.3 17 13 14.5 13 11.5C13 8 7 1 7 1Z"
      fill={filled ? BRAND.dropBlue : "rgba(255,255,255,0.15)"}
      stroke="#fff"
      strokeWidth="1" />
  </svg>
);

const SunFull = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="5" fill="#fff" />
    {[0,45,90,135,180,225,270,315].map(a => (
      <line key={a} x1="12" y1="3" x2="12" y2="5.5"
        stroke="#fff" strokeWidth="2" strokeLinecap="round"
        transform={`rotate(${a} 12 12)`} />
    ))}
  </svg>
);

const SunPartial = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="5" fill="#fff" opacity="0.4" />
    <path d="M12 7A5 5 0 0112 17A5 5 0 0012 7Z" fill="#fff" />
    <line x1="12" y1="3" x2="12" y2="5.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    <line x1="12" y1="18.5" x2="12" y2="21" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    <line x1="3" y1="12" x2="5.5" y2="12" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    <line x1="18.5" y1="12" x2="21" y2="12" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
  </svg>
);

const SunHalf = ({ size = 24 }) => (
  <svg width={size * 0.54} height={size} viewBox="0 0 13 24" fill="none">
    <defs>
      <clipPath id="sunHalfClip">
        <rect x="0" y="0" width="13" height="24" />
      </clipPath>
    </defs>
    <g clipPath="url(#sunHalfClip)">
      <circle cx="12" cy="12" r="5" fill="#fff" />
      {[0,45,90,135,180,225,270,315].map(a => (
        <line key={a} x1="12" y1="3" x2="12" y2="5.5"
          stroke="#fff" strokeWidth="2" strokeLinecap="round"
          transform={`rotate(${a} 12 12)`} />
      ))}
    </g>
  </svg>
);

const AgaveWatermark = ({ style = {} }) => (
  <img src="/logos/whiteagave.png" alt="" style={{ position: "fixed", opacity: 0.06, pointerEvents: "none", ...style }} />
);

// ─── Plant Card ───────────────────────────────────────────────
const PlantCard = ({ plant, onClick, index }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={() => onClick(plant)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? "linear-gradient(170deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.3) 100%)"
          : "linear-gradient(170deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.22) 100%)",
        border: `1px solid ${hovered ? "#fff" : "rgba(255,255,255,0.6)"}`,
        borderRadius: 12, padding: "22px 24px", cursor: "pointer",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 32px rgba(0,0,0,0.25)" : "0 2px 8px rgba(0,0,0,0.1)",
        animation: `fadeUp 0.4s ease ${index * 0.03}s both`,
        overflow: "hidden",
      }}
    >
      {plant.image && (
        <div style={{
          margin: "-22px -24px 16px -24px",
          height: 180,
          overflow: "hidden",
          borderRadius: "12px 12px 0 0",
          background: "rgba(0,0,0,0.15)",
        }}>
          <img
            src={`/plants/${plant.image}`}
            alt={plant.name}
            style={{
              width: "100%", height: "100%",
              objectFit: "cover",
              transition: "transform 0.3s ease",
              transform: hovered ? "scale(1.05)" : "scale(1)",
            }}
            onError={(e) => { e.target.style.display = "none"; }}
          />
        </div>
      )}
      <h3 style={{
        margin: "0 0 8px", fontSize: 18, fontWeight: 800, color: "#fff",
        fontFamily: "'Montserrat', 'Helvetica Neue', sans-serif",
        textTransform: "uppercase", letterSpacing: "0.02em",
      }}>{plant.name}</h3>
      <p style={{
        margin: "0 0 14px", fontSize: 13.5, color: "#fff", lineHeight: 1.6,
        fontFamily: "'Open Sans', 'Helvetica Neue', sans-serif",
        display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
      }}>{plant.description}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
        {plant.categories.map(c => (
          <span key={c} style={{
            fontSize: 11, padding: "3px 10px", borderRadius: 4,
            background: CATEGORY_COLORS[c]?.bg || "rgba(255,255,255,0.15)",
            color: "#fff",
            border: `1px solid ${CATEGORY_COLORS[c]?.border || "rgba(255,255,255,0.5)"}`,
            fontFamily: "'Open Sans', sans-serif", fontWeight: 700,
            textTransform: "uppercase", letterSpacing: "0.03em",
          }}>{CATEGORY_LABELS[c] || c}</span>
        ))}
      </div>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.3)",
      }}>
        <div style={{ display: "flex", gap: 3, alignItems: "center" }} title={`Drought Tolerance: ${plant.drought} of 4`}>
          {[1,2,3,4].map(i => <WaterDrop key={i} filled={i <= plant.drought} />)}
        </div>
        <div style={{ display: "flex", gap: 3, alignItems: "center" }} title={plant.sun === "both" ? "Thrives in full or partial sun" : plant.sun === "full" ? "Thrives in full sun" : "Thrives in partial sun"}>
          {(plant.sun === "full" || plant.sun === "both") && <SunFull size={22} />}
          {(plant.sun === "both" || plant.sun === "partial") && <SunHalf size={22} />}
        </div>
        {plant.price && (
          <span style={{ fontSize: 13, fontWeight: 800, color: "#fff", fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.02em" }} title={plant.price === 1 ? "Low cost" : plant.price === 2 ? "Average cost" : "Premium cost"}>
            {"$".repeat(plant.price)}
          </span>
        )}
      </div>
      {plant.cutback && (
        <div style={{
          marginTop: 10, fontSize: 11, color: "#fff", fontWeight: 700,
          fontFamily: "'Open Sans', sans-serif",
          textTransform: "uppercase", letterSpacing: "0.04em"
        }} title="This plant benefits from a rejuvenation cutback">✂ Rejuvenation Cutback Candidate</div>
      )}
    </div>
  );
};

// ─── Plant Detail Modal ───────────────────────────────────────
const PlantDetail = ({ plant, onClose }) => {
  if (!plant) return null;
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(2,58,107,0.85)", backdropFilter: "blur(10px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24, animation: "fadeIn 0.2s ease",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: `linear-gradient(170deg, ${BRAND.mid1} 0%, ${BRAND.mid4} 40%, ${BRAND.bottom} 100%)`,
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: 16, maxWidth: 640, width: "100%",
        maxHeight: "85vh", overflow: "auto", position: "relative",
        animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        {plant.image && (
          <div style={{
            width: "100%", height: 240, overflow: "hidden",
            borderRadius: "16px 16px 0 0",
            background: "rgba(0,0,0,0.15)",
          }}>
            <img
              src={`/plants/${plant.image}`}
              alt={plant.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => { e.target.parentElement.style.display = "none"; }}
            />
          </div>
        )}
        <AgaveWatermark style={{ right: -80, top: -40, width: 300, height: 280 }} />
        <div style={{ padding: "32px 36px", position: "relative" }}>
          <button onClick={onClose} style={{
            position: "absolute", top: 16, right: 20,
            background: "rgba(255,255,255,0.1)", border: "none",
            color: "#fff", width: 34, height: 34, borderRadius: 8,
            cursor: "pointer", fontSize: 18, display: "flex",
            alignItems: "center", justifyContent: "center",
          }}>×</button>
          <div style={{ position: "absolute", top: 20, right: 64, fontFamily: "'Montserrat', sans-serif", fontSize: 14, fontWeight: 800 }}>
            <span style={{ color: "#fff" }}>CAM</span>
            <span style={{ color: "#fff" }}>CRE.</span>
          </div>
          <h2 style={{
            margin: "0 0 10px", fontSize: 28, fontWeight: 900, color: "#fff",
            fontFamily: "'Montserrat', 'Helvetica Neue', sans-serif",
            textTransform: "uppercase", letterSpacing: "0.01em", lineHeight: 1.15,
          }}>{plant.name}</h2>
          <p style={{
            margin: "0 0 28px", fontSize: 15, color: "#fff", lineHeight: 1.7,
            fontFamily: "'Open Sans', sans-serif", maxWidth: 480,
          }}>{plant.description}</p>
          
          {/* Encore Recommendations Table */}
          <div style={{
            background: "rgba(255,255,255,0.1)", borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.15)", overflow: "hidden",
          }}>
            <div style={{
              padding: "12px 20px", background: "rgba(255,255,255,0.08)",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}>
              <span style={{
                fontSize: 13, fontWeight: 800, color: "#fff",
                textTransform: "uppercase", letterSpacing: "0.08em",
                fontFamily: "'Montserrat', sans-serif",
              }}>Encore Recommendations</span>
            </div>
            <div style={{
              padding: "14px 20px", display: "flex", justifyContent: "space-between",
              alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}>
              <span style={{ fontSize: 14, color: "#fff", fontWeight: 700, fontFamily: "'Open Sans', sans-serif", textTransform: "uppercase" }}>
                {plant.categories.join(", ")}
              </span>
              <img src="/logos/whiteagave.png" alt="Encore Logo" style={{ width: 24, height: 24, objectFit: "contain" }} />
            </div>
            <div style={{
              padding: "14px 20px", display: "flex", justifyContent: "space-between",
              alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.03)",
            }}>
              <span style={{ fontSize: 14, color: "#fff", fontWeight: 700, fontFamily: "'Open Sans', sans-serif", textTransform: "uppercase" }}>Drought Tolerance</span>
              <div style={{ display: "flex", gap: 3 }}>
                {[1,2,3,4,5].map(i => <WaterDrop key={i} filled={i <= plant.drought} size={20} />)}
              </div>
            </div>
            <div style={{ padding: "8px 20px 12px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{ margin: 0, fontSize: 12, color: "#fff", fontStyle: "italic", fontFamily: "'Open Sans', sans-serif" }}>
                {DROUGHT_LABELS[plant.drought]} — {DROUGHT_DESC[plant.drought]}
              </p>
            </div>
            <div style={{
              padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <span style={{ fontSize: 14, color: "#fff", fontWeight: 700, fontFamily: "'Open Sans', sans-serif", textTransform: "uppercase" }}>Sun Requirements</span>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                {(plant.sun === "full" || plant.sun === "both") && (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                    <SunFull size={24} />
                    <span style={{ fontSize: 10, color: "#fff", fontFamily: "'Open Sans', sans-serif" }}>full sun</span>
                  </div>
                )}
                {(plant.sun === "both" || plant.sun === "partial") && (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                    <SunHalf size={24} />
                    <span style={{ fontSize: 10, color: "#fff", fontFamily: "'Open Sans', sans-serif" }}>partial sun</span>
                  </div>
                )}
              </div>
            </div>
            {plant.price && (
              <div style={{
                padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center",
                borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.03)",
              }}>
                <span style={{ fontSize: 14, color: "#fff", fontWeight: 700, fontFamily: "'Open Sans', sans-serif", textTransform: "uppercase" }}>Relative Price</span>
                <span style={{ fontSize: 18, fontWeight: 800, color: "#fff", fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.05em" }}>
                  {"$".repeat(plant.price)}
                  <span style={{ color: "rgba(255,255,255,0.2)" }}>{"$".repeat(3 - plant.price)}</span>
                </span>
              </div>
            )}
          </div>
          {plant.cutback && (
            <div style={{
              marginTop: 18, padding: "12px 18px", borderRadius: 8,
              background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
              fontSize: 13, color: "#fff", fontWeight: 600, fontFamily: "'Open Sans', sans-serif",
            }}>✂️ <strong>Rejuvenation Cutback Candidate</strong> — Branches cut back to 12–18" tall, performed once yearly on overgrown or previously sheared shrubs.</div>
          )}
          <div style={{ marginTop: 24, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8 }}>
            <img src="/logos/whiteagave.png" alt="Encore Logo" style={{ width: 22, height: 22, objectFit: "contain" }} />
            <span style={{ fontSize: 14, fontWeight: 800, color: "#fff", fontFamily: "'Montserrat', sans-serif" }}>Encore</span>
            <span style={{ fontSize: 10, color: "#fff", fontFamily: "'Open Sans', sans-serif", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", lineHeight: 1.2 }}>Landscape<br/>Management</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Calendar ─────────────────────────────────────────────────
const CalendarView = () => {
  const [openMonth, setOpenMonth] = useState(null);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
      {CUTBACK_CALENDAR.map((m, i) => {
        const isOpen = openMonth === i;
        return (
          <div key={m.month} onClick={() => setOpenMonth(isOpen ? null : i)} style={{
            background: isOpen ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.15)",
            border: `1px solid ${isOpen ? "#fff" : "rgba(255,255,255,0.4)"}`,
            borderRadius: 10, padding: "16px 18px", cursor: "pointer",
            transition: "all 0.25s ease", animation: `fadeUp 0.4s ease ${i * 0.04}s both`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: "#fff", fontFamily: "'Montserrat', sans-serif", textTransform: "uppercase" }}>{m.month}</span>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: m.active ? BRAND.dropBlue : "rgba(255,255,255,0.25)" }} />
            </div>
            <p style={{
              margin: 0, fontSize: 13, color: "#fff", lineHeight: 1.6,
              fontFamily: "'Open Sans', sans-serif",
              maxHeight: isOpen ? 400 : 42, overflow: "hidden", transition: "max-height 0.35s ease",
            }}>{m.tasks}</p>
          </div>
        );
      })}
    </div>
  );
};

// ─── Main App ─────────────────────────────────────────────────
export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [droughtFilter, setDroughtFilter] = useState(0);
  const [sunFilter, setSunFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [activeSection, setActiveSection] = useState("plants");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    if (!showSuggestions) return;
    const close = () => setShowSuggestions(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [showSuggestions]);

  const filtered = PLANTS.filter(p => {
    if (activeCategory !== "All" && !p.categories.includes(activeCategory)) return false;
    if (droughtFilter > 0 && p.drought !== droughtFilter) return false;
    if (sunFilter === "full" && p.sun !== "full" && p.sun !== "both") return false;
    if (sunFilter === "partial" && p.sun !== "partial" && p.sun !== "both") return false;
    if (priceFilter > 0 && p.price !== priceFilter) return false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(135deg, ${BRAND.top} 0%, ${BRAND.mid1} 15%, ${BRAND.mid2} 30%, ${BRAND.mid3} 50%, ${BRAND.mid4} 70%, ${BRAND.bottom} 90%, ${BRAND.darkest} 100%)`,
      color: "#fff", position: "relative",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        ::selection { background: rgba(255,255,255,0.2); }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 3px; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        input:focus, button:focus { outline: none; }
        input::placeholder { color: #fff; opacity: 1; }
        .drought-info-trigger:hover .drought-info-tooltip { opacity: 1 !important; }
        @media (max-width: 768px) {
          .nav-inner { flex-direction: column !important; height: auto !important; padding: 10px 0 !important; gap: 8px !important; }
          .nav-brand { font-size: 14px !important; }
          .nav-brand-name { display: none !important; }
          .nav-tabs { width: 100% !important; justify-content: center !important; }
          .nav-tabs button { padding: 6px 12px !important; font-size: 11px !important; }
          .content-section { padding: 0 16px 60px !important; }
          .hero-section { padding: 32px 16px 24px !important; }
          .plant-grid { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)) !important; gap: 10px !important; }
          .footer-inner { flex-direction: column !important; text-align: center !important; }
          .footer-badges { flex-direction: column !important; align-items: center !important; gap: 8px !important; }
          nav { padding: 0 16px !important; }
        }
      `}</style>

      <AgaveWatermark style={{ right: -60, top: 40, width: 450, height: 400 }} />
      <AgaveWatermark style={{ left: -120, top: 600, width: 500, height: 440, transform: "scaleX(-1)" }} />
      <AgaveWatermark style={{ right: -80, top: 1400, width: 400, height: 350 }} />

      {/* Nav */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(2,59,112,0.9)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        transition: "all 0.3s ease", padding: "0 32px",
      }}>
        <div className="nav-inner" style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", height: 60 }}>
<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 18, fontWeight: 900, fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.01em" }}>
              <span style={{ color: "#fff" }}>CAM</span><span style={{ color: "rgba(255,255,255,0.45)" }}>CRE.</span>
            </span>
            <span style={{ fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.5)", fontFamily: "'Montserrat', sans-serif", margin: "0 4px" }}>
              &
            </span>
            <img src="/logos/whiteagave.png" alt="Encore Logo" style={{ width: 24, height: 24, objectFit: "contain" }} />
            <span className="nav-brand-name" style={{ fontSize: 18, fontWeight: 800, color: "#fff", fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.01em" }}>
              Encore Landscape Management
            </span>
          </div>
          <div className="nav-tabs" style={{ display: "flex", gap: 4 }}>
            {["plants", "calendar", "guide"].map(s => (
              <button key={s} onClick={() => setActiveSection(s)} style={{
                background: activeSection === s ? "#fff" : "rgba(255,255,255,0.06)",
                border: `1px solid #fff`,
                color: activeSection === s ? BRAND.darkest : "#fff",
                padding: "8px 18px", borderRadius: 6, cursor: "pointer",
                fontSize: 13, fontWeight: 700, fontFamily: "'Montserrat', sans-serif",
                textTransform: "uppercase", letterSpacing: "0.04em", transition: "all 0.2s ease",
              }}>{s === "plants" ? "Plant Palette" : s === "calendar" ? "Cutback Calendar" : "Care Guide"}</button>
            ))}
          </div>
        </div>
      </nav>

{/* Hero */}
      <div className="hero-section" style={{ position: "relative", padding: "48px 32px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          <h1 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 900, margin: 0, fontFamily: "'Montserrat', sans-serif", textTransform: "uppercase", letterSpacing: "0.04em", animation: "fadeUp 0.4s ease both" }}>
            Plant Palette
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="content-section" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px 80px", position: "relative" }}>
        {activeSection === "plants" && (
          <>
            <div style={{ marginBottom: 16, animation: "fadeUp 0.4s ease 0.2s both", position: "relative", zIndex: 200 }}>
              <input type="text" placeholder="Search plants..." value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
                onFocus={() => searchQuery && setShowSuggestions(true)}
                style={{ width: "100%", padding: "10px 16px", borderRadius: 8, border: "2px solid #fff", background: "rgba(255,255,255,0.1)", color: "#fff", fontSize: 14, fontFamily: "'Open Sans', sans-serif", boxSizing: "border-box" }} />
              {showSuggestions && searchQuery && (() => {
                const matches = PLANTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 6);
                if (matches.length === 0) return null;
                return (
                  <div style={{ position: "absolute", top: "100%", left: 0, right: 0, zIndex: 200, background: "rgba(2,40,80,0.95)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, marginTop: 4, overflow: "hidden", backdropFilter: "blur(12px)" }}>
                    {matches.map(p => (
                      <button key={p.id} onClick={() => { setSearchQuery(p.name); setShowSuggestions(false); }}
                        style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.06)", color: "#fff", fontSize: 14, fontFamily: "'Open Sans', sans-serif", cursor: "pointer", textAlign: "left" }}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                        <img src={`/plants/${p.image}`} alt="" style={{ width: 28, height: 28, borderRadius: 4, objectFit: "cover" }} />
                        <span>{p.name}</span>
                        <span style={{ marginLeft: "auto", fontSize: 11, color: "rgba(255,255,255,0.5)", fontFamily: "'Montserrat', sans-serif" }}>
                          {p.categories[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                );
              })()}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 24, animation: "fadeUp 0.4s ease 0.2s both" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: "#fff", fontFamily: "'Montserrat', sans-serif", textTransform: "uppercase", letterSpacing: "0.06em" }}>Sunlight Needs</span>
                <div style={{ display: "flex", gap: 4 }}>
                  {[{ val: "all", label: "Any Sun" }, { val: "full", label: "☀ Full" }, { val: "partial", label: "◑ Partial" }].map(s => (
                    <button key={s.val} onClick={() => setSunFilter(s.val)} style={{
                      background: sunFilter === s.val ? "#fff" : "rgba(255,255,255,0.08)",
                      border: "1px solid #fff",
                      color: sunFilter === s.val ? BRAND.darkest : "#fff",
                      padding: "8px 14px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 700,
                      fontFamily: "'Montserrat', sans-serif", textTransform: "uppercase", transition: "all 0.2s ease",
                    }}>{s.label}</button>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: "#fff", fontFamily: "'Montserrat', sans-serif", textTransform: "uppercase", letterSpacing: "0.06em" }}>Drought Tolerance</span>
                  <span className="drought-info-trigger" style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", width: 16, height: 16, borderRadius: "50%", border: "1px solid #fff", fontSize: 10, fontWeight: 700, color: "#fff", fontFamily: "'Open Sans', sans-serif", cursor: "help" }}>
                    i
                    <span className="drought-info-tooltip" style={{ position: "absolute", bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)", background: "rgba(0,30,60,0.95)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "10px 14px", width: 220, fontSize: 11, fontWeight: 400, color: "#fff", lineHeight: 1.5, fontFamily: "'Open Sans', sans-serif", pointerEvents: "none", opacity: 0, transition: "opacity 0.2s ease", whiteSpace: "normal", zIndex: 50, textTransform: "none", letterSpacing: "normal" }}>
                      💧 More drops = more water needed. 1 drop is very drought tolerant, 4 drops means the plant needs regular watering.
                    </span>
                  </span>
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                <button onClick={() => setDroughtFilter(0)} style={{
                  background: droughtFilter === 0 ? "#fff" : "rgba(255,255,255,0.08)",
                  border: "1px solid #fff",
                  color: droughtFilter === 0 ? BRAND.darkest : "#fff",
                  padding: "8px 12px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 700,
                  fontFamily: "'Montserrat', sans-serif", transition: "all 0.2s ease",
                }}>Any 💧</button>
                {[1,2,3,4].map(d => (
                  <button key={d} onClick={() => setDroughtFilter(droughtFilter === d ? 0 : d)} style={{
                    background: droughtFilter === d ? "#fff" : "rgba(255,255,255,0.08)",
                    border: "1px solid #fff",
                    color: droughtFilter === d ? BRAND.darkest : "#fff", padding: "8px 10px", borderRadius: 6, cursor: "pointer", fontSize: 11,
                    fontFamily: "'Open Sans', sans-serif", transition: "all 0.2s ease", display: "flex", gap: 1,
                  }}>{Array.from({length: d}).map((_, i) => <span key={i} style={{ fontSize: 10 }}>💧</span>)}</button>
                ))}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: "#fff", fontFamily: "'Montserrat', sans-serif", textTransform: "uppercase", letterSpacing: "0.06em" }}>Relative Price</span>
                <div style={{ display: "flex", gap: 4 }}>
                  <button onClick={() => setPriceFilter(0)} style={{
                    background: priceFilter === 0 ? "#fff" : "rgba(255,255,255,0.08)",
                    border: "1px solid #fff",
                    color: priceFilter === 0 ? BRAND.darkest : "#fff",
                    padding: "8px 14px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 700,
                    fontFamily: "'Montserrat', sans-serif", transition: "all 0.2s ease",
                  }}>Any $</button>
                  {[1,2,3].map(p => (
                    <button key={p} onClick={() => setPriceFilter(priceFilter === p ? 0 : p)} style={{
                      background: priceFilter === p ? "#fff" : "rgba(255,255,255,0.08)",
                      border: "1px solid #fff",
                      color: priceFilter === p ? BRAND.darkest : "#fff",
                      padding: "8px 12px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 700,
                      fontFamily: "'Montserrat', sans-serif", transition: "all 0.2s ease",
                    }}>{"$".repeat(p)}</button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 6, marginBottom: 24, flexWrap: "wrap", animation: "fadeUp 0.4s ease 0.25s both" }}>
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setActiveCategory(c)} style={{
                  background: activeCategory === c ? "#fff" : "rgba(255,255,255,0.08)",
                  border: "1px solid #fff",
                  color: activeCategory === c ? BRAND.darkest : "#fff",
                  padding: "10px 20px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 800,
                  fontFamily: "'Montserrat', sans-serif", textTransform: "uppercase", letterSpacing: "0.03em", transition: "all 0.2s ease",
                }}>
                  {CATEGORY_LABELS[c]}
                  <span style={{ fontSize: 11, marginLeft: 8, padding: "1px 7px", borderRadius: 4, background: CATEGORY_COLORS[c]?.bg || "rgba(255,255,255,0.2)" }}>
                    {c === "All" ? PLANTS.length : PLANTS.filter(p => p.categories.includes(c)).length}
                  </span>
                </button>
              ))}
            </div>

            <div style={{ marginBottom: 16, fontSize: 13, color: "#fff", fontFamily: "'Open Sans', sans-serif" }}>
              Showing {filtered.length} of {PLANTS.length} plants
            </div>

            <div className="plant-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 14 }}>
              {filtered.map((p, i) => <PlantCard key={p.id} plant={p} index={i} onClick={setSelectedPlant} />)}
            </div>

            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "#fff", fontFamily: "'Open Sans', sans-serif" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🌱</div>
                <p>No plants match your current filters.</p>
              </div>
            )}
          </>
        )}

        {activeSection === "calendar" && (
          <div style={{ animation: "fadeUp 0.4s ease both" }}>
            <h2 style={{ fontSize: 28, fontWeight: 900, fontFamily: "'Montserrat', sans-serif", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.02em" }}>Cutback Calendar</h2>
            <p style={{ fontSize: 15, color: "#fff", fontFamily: "'Open Sans', sans-serif", marginBottom: 28, maxWidth: 600, lineHeight: 1.6 }}>
              Monthly pruning and rejuvenation schedule for the Greater Phoenix area. Click any month for full details.
            </p>
            <div style={{ display: "flex", gap: 20, marginBottom: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: BRAND.dropBlue }} />
                <span style={{ fontSize: 12, color: "#fff", fontFamily: "'Open Sans', sans-serif" }}>Active Cutback Season</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.25)" }} />
                <span style={{ fontSize: 12, color: "#fff", fontFamily: "'Open Sans', sans-serif" }}>Safety Pruning / Rest</span>
              </div>
            </div>
            <CalendarView />
          </div>
        )}

        {activeSection === "guide" && (
          <div style={{ animation: "fadeUp 0.4s ease both", maxWidth: 720 }}>
            <h2 style={{ fontSize: 28, fontWeight: 900, fontFamily: "'Montserrat', sans-serif", marginBottom: 28, textTransform: "uppercase", letterSpacing: "0.02em" }}>Care Guide</h2>
            
            <div style={{ background: "rgba(255,255,255,0.22)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.6)", padding: "28px 28px", marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 900, fontFamily: "'Montserrat', sans-serif", marginBottom: 16, textTransform: "uppercase" }}>High vs. Low Maintenance</h3>
              <div style={{ display: "grid", gap: 12 }}>
                <div style={{ padding: "14px 18px", borderRadius: 8, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.4)" }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: "#fff", textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "'Montserrat', sans-serif" }}>High Maintenance</span>
                  <p style={{ margin: "8px 0 0", fontSize: 14, color: "#fff", lineHeight: 1.7, fontFamily: "'Open Sans', sans-serif" }}>Requires more frequent pruning and fertilization, and a precise and monitored irrigation frequency.</p>
                </div>
                <div style={{ padding: "14px 18px", borderRadius: 8, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.4)" }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: "#fff", textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "'Montserrat', sans-serif" }}>Low Maintenance</span>
                  <p style={{ margin: "8px 0 0", fontSize: 14, color: "#fff", lineHeight: 1.7, fontFamily: "'Open Sans', sans-serif" }}>Ideally only trimmed once a year, mostly with rejuvenation cutbacks. Irrigation frequency is simple and consistent.</p>
                </div>
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.22)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.6)", padding: "28px 28px", marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 900, fontFamily: "'Montserrat', sans-serif", marginBottom: 12, textTransform: "uppercase" }}>✂ Rejuvenation Cutbacks</h3>
              <p style={{ fontSize: 14, color: "#fff", lineHeight: 1.7, fontFamily: "'Open Sans', sans-serif" }}>
                A pruning technique where all branches are cut back to 12–18 inches tall, sometimes smaller. Performed once a year on overgrown, woody, or previously sheared shrubs. This restores healthy growth and keeps plants looking their best.
              </p>
            </div>

            <div style={{ background: "rgba(255,255,255,0.22)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.6)", padding: "28px 28px", marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 900, fontFamily: "'Montserrat', sans-serif", marginBottom: 12, textTransform: "uppercase" }}>Sun Requirements</h3>
              <p style={{ fontSize: 14, color: "#fff", lineHeight: 1.7, fontFamily: "'Open Sans', sans-serif", marginBottom: 16 }}>
                The amount of sunlight required for a plant to grow, thrive, and bloom properly.
              </p>
              <div style={{ display: "grid", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", borderRadius: 8, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.4)" }}>
                  <SunFull size={28} />
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#fff", fontFamily: "'Open Sans', sans-serif" }}>Full Sun</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", borderRadius: 8, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.4)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 3 }}><SunFull size={28} /><SunHalf size={28} /></div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#fff", fontFamily: "'Open Sans', sans-serif" }}>Full + Partial Sun</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", borderRadius: 8, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.4)" }}>
                  <SunHalf size={28} />
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#fff", fontFamily: "'Open Sans', sans-serif" }}>Partial Sun</span>
                </div>
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.22)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.6)", padding: "28px 28px", marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 900, fontFamily: "'Montserrat', sans-serif", marginBottom: 16, textTransform: "uppercase" }}>Drought Tolerance Rating: 1 to 4 Water Drops</h3>
              <div style={{ display: "grid", gap: 8 }}>
                {[1,2,3,4].map(level => (
                  <div key={level} style={{
                    display: "flex", alignItems: "center", gap: 16, padding: "12px 16px", borderRadius: 8,
                    background: "rgba(255,255,255,0.12)", borderBottom: "1px solid rgba(255,255,255,0.18)",
                  }}>
                    <span style={{ fontSize: 14, fontWeight: 800, color: "#fff", fontFamily: "'Montserrat', sans-serif", minWidth: 70, textTransform: "uppercase" }}>{level} Drop{level > 1 ? "s" : ""}</span>
                    <div style={{ display: "flex", gap: 3, minWidth: 90 }}>
                      {[1,2,3,4,5].map(i => <WaterDrop key={i} filled={i <= level} size={20} />)}
                    </div>
                    <div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#fff", fontFamily: "'Open Sans', sans-serif" }}>{DROUGHT_LABELS[level]}.</span>
                      <span style={{ fontSize: 13, color: "#fff", fontFamily: "'Open Sans', sans-serif", marginLeft: 6 }}>{DROUGHT_DESC[level]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.22)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.6)", padding: "28px 28px", marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 900, fontFamily: "'Montserrat', sans-serif", marginBottom: 12, textTransform: "uppercase" }}>Hardiness Zones</h3>
              <p style={{ fontSize: 14, color: "#fff", lineHeight: 1.7, fontFamily: "'Open Sans', sans-serif", marginBottom: 12 }}>
                Geographic areas defined by the average annual winter temperature; helps determine which plants are likely to survive outdoors year-round.
              </p>
              <p style={{ fontSize: 14, color: "#fff", fontWeight: 700, lineHeight: 1.7, fontFamily: "'Open Sans', sans-serif", paddingLeft: 16, borderLeft: "3px solid rgba(255,255,255,0.3)" }}>
                Greater Phoenix area supports zones 9B and 10A.
              </p>
            </div>

            <div style={{ background: "rgba(255,255,255,0.22)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.6)", padding: "28px 28px" }}>
              <h3 style={{ fontSize: 18, fontWeight: 900, fontFamily: "'Montserrat', sans-serif", marginBottom: 12, textTransform: "uppercase" }}>Drought Tolerance</h3>
              <p style={{ fontSize: 14, color: "#fff", lineHeight: 1.7, fontFamily: "'Open Sans', sans-serif", marginBottom: 12 }}>
                A plant's ability to survive and remain healthy during periods of little to no water once established.
              </p>
              <p style={{ fontSize: 13, color: "#fff", lineHeight: 1.6, fontFamily: "'Open Sans', sans-serif", fontStyle: "italic", paddingLeft: 16, borderLeft: "3px solid rgba(255,255,255,0.3)" }}>
                Note: drought tolerance does not mean that the plants never need water, and does not guarantee that the plants survive without establishing watering.
              </p>
            </div>

          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "24px 32px" }}>
        <div className="footer-inner" style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src="/logos/growwithus.png" alt="Encore Landscape Management - Grow With Us" style={{ height: 48, objectFit: "contain" }} />
          </div>
          <div className="footer-badges" style={{ display: "flex", gap: 20, fontSize: 11, color: "#fff", fontFamily: "'Open Sans', sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.03em", alignItems: "center" }}>
            <span>🏆 Best Places to Work 2025</span>
            <img src="/logos/topcompanies.png" alt="Top Companies to Work For in Arizona 2025" title="Top Companies in Arizona 2025" style={{ height: 48, objectFit: "contain" }} />
          </div>
        </div>
      </footer>

      <PlantDetail plant={selectedPlant} onClose={() => setSelectedPlant(null)} />
    </div>
  );
}