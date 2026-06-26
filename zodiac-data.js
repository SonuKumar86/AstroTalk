
const ZODIAC_SIGNS = [
  {
    id: "aries",
    name: "Aries",
    symbol: "♈",
    dateRange: "Mar 21 – Apr 19",
    startMonth: 3, startDay: 21, endMonth: 4, endDay: 19,
    element: "Fire",
    modality: "Cardinal",
    polarity: "Positive",
    ruler: "Mars",
    house: 1,
    bodyPart: "Head",
    luckyNumbers: [1, 9, 18],
    luckyColor: "Red",
    compatibleSigns: ["Leo", "Sagittarius", "Gemini"],
    strengths: ["initiating", "courageous", "direct"],
    cautions: ["impatience", "impulsiveness"]
  },
  {
    id: "taurus",
    name: "Taurus",
    symbol: "♉",
    dateRange: "Apr 20 – May 20",
    startMonth: 4, startDay: 20, endMonth: 5, endDay: 20,
    element: "Earth",
    modality: "Fixed",
    polarity: "Negative",
    ruler: "Venus",
    house: 2,
    bodyPart: "Neck & Throat",
    luckyNumbers: [2, 6, 24],
    luckyColor: "Forest Green",
    compatibleSigns: ["Virgo", "Capricorn", "Cancer"],
    strengths: ["steady", "patient", "reliable"],
    cautions: ["stubbornness", "resistance to change"]
  },
  {
    id: "gemini",
    name: "Gemini",
    symbol: "♊",
    dateRange: "May 21 – Jun 20",
    startMonth: 5, startDay: 21, endMonth: 6, endDay: 20,
    element: "Air",
    modality: "Mutable",
    polarity: "Positive",
    ruler: "Mercury",
    house: 3,
    bodyPart: "Arms & Lungs",
    luckyNumbers: [3, 5, 14],
    luckyColor: "Pale Yellow",
    compatibleSigns: ["Libra", "Aquarius", "Aries"],
    strengths: ["adaptable", "communicative", "curious"],
    cautions: ["scattered focus", "inconsistency"]
  },
  {
    id: "cancer",
    name: "Cancer",
    symbol: "♋",
    dateRange: "Jun 21 – Jul 22",
    startMonth: 6, startDay: 21, endMonth: 7, endDay: 22,
    element: "Water",
    modality: "Cardinal",
    polarity: "Negative",
    ruler: "Moon",
    house: 4,
    bodyPart: "Chest & Stomach",
    luckyNumbers: [2, 7, 11],
    luckyColor: "Silver",
    compatibleSigns: ["Scorpio", "Pisces", "Taurus"],
    strengths: ["nurturing", "intuitive", "protective"],
    cautions: ["moodiness", "over-attachment"]
  },
  {
    id: "leo",
    name: "Leo",
    symbol: "♌",
    dateRange: "Jul 23 – Aug 22",
    startMonth: 7, startDay: 23, endMonth: 8, endDay: 22,
    element: "Fire",
    modality: "Fixed",
    polarity: "Positive",
    ruler: "Sun",
    house: 5,
    bodyPart: "Heart & Spine",
    luckyNumbers: [1, 4, 19],
    luckyColor: "Gold",
    compatibleSigns: ["Aries", "Sagittarius", "Gemini"],
    strengths: ["confident", "generous", "expressive"],
    cautions: ["pride", "need for validation"]
  },
  {
    id: "virgo",
    name: "Virgo",
    symbol: "♍",
    dateRange: "Aug 23 – Sep 22",
    startMonth: 8, startDay: 23, endMonth: 9, endDay: 22,
    element: "Earth",
    modality: "Mutable",
    polarity: "Negative",
    ruler: "Mercury",
    house: 6,
    bodyPart: "Digestive System",
    luckyNumbers: [5, 14, 23],
    luckyColor: "Light Green",
    compatibleSigns: ["Taurus", "Capricorn", "Cancer"],
    strengths: ["analytical", "precise", "diligent"],
    cautions: ["overcriticism", "perfectionism"]
  },
  {
    id: "libra",
    name: "Libra",
    symbol: "♎",
    dateRange: "Sep 23 – Oct 22",
    startMonth: 9, startDay: 23, endMonth: 10, endDay: 22,
    element: "Air",
    modality: "Cardinal",
    polarity: "Positive",
    ruler: "Venus",
    house: 7,
    bodyPart: "Kidneys & Lower Back",
    luckyNumbers: [4, 6, 15],
    luckyColor: "Powder Blue",
    compatibleSigns: ["Gemini", "Aquarius", "Leo"],
    strengths: ["diplomatic", "fair-minded", "cooperative"],
    cautions: ["indecision", "people-pleasing"]
  },
  {
    id: "scorpio",
    name: "Scorpio",
    symbol: "♏",
    dateRange: "Oct 23 – Nov 21",
    startMonth: 10, startDay: 23, endMonth: 11, endDay: 21,
    element: "Water",
    modality: "Fixed",
    polarity: "Negative",
    ruler: "Pluto",
    house: 8,
    bodyPart: "Reproductive System",
    luckyNumbers: [8, 11, 18],
    luckyColor: "Maroon",
    compatibleSigns: ["Cancer", "Pisces", "Virgo"],
    strengths: ["resourceful", "perceptive", "resolute"],
    cautions: ["secretiveness", "jealousy"]
  },
  {
    id: "sagittarius",
    name: "Sagittarius",
    symbol: "♐",
    dateRange: "Nov 22 – Dec 21",
    startMonth: 11, startDay: 22, endMonth: 12, endDay: 21,
    element: "Fire",
    modality: "Mutable",
    polarity: "Positive",
    ruler: "Jupiter",
    house: 9,
    bodyPart: "Hips & Thighs",
    luckyNumbers: [3, 9, 21],
    luckyColor: "Pink",
    compatibleSigns: ["Aries", "Leo", "Libra"],
    strengths: ["optimistic", "adventurous", "honest"],
    cautions: ["restlessness", "bluntness"]
  },
  {
    id: "capricorn",
    name: "Capricorn",
    symbol: "♑",
    dateRange: "Dec 22 – Jan 19",
    startMonth: 12, startDay: 22, endMonth: 1, endDay: 19,
    element: "Earth",
    modality: "Cardinal",
    polarity: "Negative",
    ruler: "Saturn",
    house: 10,
    bodyPart: "Bones & Joints",
    luckyNumbers: [4, 8, 22],
    luckyColor: "Charcoal",
    compatibleSigns: ["Taurus", "Virgo", "Scorpio"],
    strengths: ["disciplined", "ambitious", "patient"],
    cautions: ["rigidity", "overwork"]
  },
  {
    id: "aquarius",
    name: "Aquarius",
    symbol: "♒",
    dateRange: "Jan 20 – Feb 18",
    startMonth: 1, startDay: 20, endMonth: 2, endDay: 18,
    element: "Air",
    modality: "Fixed",
    polarity: "Positive",
    ruler: "Uranus",
    house: 11,
    bodyPart: "Circulatory System",
    luckyNumbers: [4, 11, 22],
    luckyColor: "Blue",
    compatibleSigns: ["Gemini", "Libra", "Sagittarius"],
    strengths: ["inventive", "independent", "humanitarian"],
    cautions: ["detachment", "stubborn idealism"]
  },
  {
    id: "pisces",
    name: "Pisces",
    symbol: "♓",
    dateRange: "Feb 19 – Mar 20",
    startMonth: 2, startDay: 19, endMonth: 3, endDay: 20,
    element: "Water",
    modality: "Mutable",
    polarity: "Negative",
    ruler: "Neptune",
    house: 12,
    bodyPart: "Feet",
    luckyNumbers: [3, 7, 12],
    luckyColor: "Sea Green",
    compatibleSigns: ["Cancer", "Scorpio", "Capricorn"],
    strengths: ["empathetic", "imaginative", "adaptable"],
    cautions: ["escapism", "boundary-blurring"]
  }
];
  //  ELEMENT & MODALITY BEHAVIOUR LIBRARIES
const ELEMENT_PROFILE = {
  Fire: {
    career: "Momentum favors bold moves over careful waiting {tf}.",
    health: "Energy runs high {tf} — channel it through movement rather than friction.",
    love: "Directness reads as confidence {tf}; say what you mean.",
    finance: "Quick decisions outperform slow deliberation {tf}."
  },
  Earth: {
    career: "Steady, methodical effort compounds faster than any shortcut {tf}.",
    health: "The body responds well to routine {tf} — keep to your usual rhythm.",
    love: "Stability and follow-through matter more than grand gestures {tf}.",
    finance: "Conservative, practical choices protect what you've already built {tf}."
  },
  Air: {
    career: "Conversations and exchange of ideas move things forward {tf}.",
    health: "Mental restlessness needs an outlet {tf} — a walk clears more than it costs.",
    love: "Honest dialogue does more for the bond than assumptions do {tf}.",
    finance: "Information you gather {tf} is worth more than the money itself."
  },
  Water: {
    career: "Intuition about people and timing outperforms pure logic {tf}.",
    health: "Emotional load shows up physically {tf} — rest is not optional.",
    love: "Vulnerability deepens connection more than performance does {tf}.",
    finance: "Avoid decisions made purely from emotion {tf}; weigh the big ones carefully."
  }
};

const MODALITY_PROFILE = {
  Cardinal: {
    career: "You're suited to start the new initiative {tf}, not just maintain the old one.",
    health: "A fresh routine sticks better {tf} than forcing the old one to work.",
    love: "Taking the first step works in your favor {tf}.",
    finance: "A new plan beats patching an old one {tf}."
  },
  Fixed: {
    career: "Persistence on a single priority pays off more than spreading thin {tf}.",
    health: "Consistency, not intensity, is what the body needs from you {tf}.",
    love: "Loyalty and depth matter more than novelty {tf}.",
    finance: "Hold your position rather than chasing a new one {tf}."
  },
  Mutable: {
    career: "Flexibility to pivot serves you better than a rigid plan {tf}.",
    health: "Listen to what the body is asking for {tf} — it may have changed.",
    love: "Adapting to the other person's mood opens things up {tf}.",
    finance: "Keep options open {tf}; don't lock in just yet."
  }
};

const RULER_FOCUS = {
  Mars: "action and assertiveness",
  Venus: "relationships and aesthetics",
  Mercury: "communication and logistics",
  Moon: "emotional needs and home life",
  Sun: "identity and recognition",
  Jupiter: "growth and opportunity",
  Saturn: "structure and responsibility",
  Uranus: "change and originality",
  Neptune: "imagination and intuition",
  Pluto: "transformation and depth"
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { ZODIAC_SIGNS, ELEMENT_PROFILE, MODALITY_PROFILE, RULER_FOCUS };
}
