const SHADOW_COLORS = [
  "shadow-blue-500/20",
  "shadow-green-500/20",
  "shadow-purple-500/20",
  "shadow-pink-500/20",
  "shadow-yellow-500/20",
  "shadow-red-500/20",
  "shadow-indigo-500/20",
  "shadow-teal-500/20",
  "shadow-orange-500/20",
  "shadow-cyan-500/20",
];

const HOVER_COLORS = [
  "hover:shadow-blue-500/20",
  "hover:shadow-green-500/20",
  "hover:shadow-purple-500/20",
  "hover:shadow-pink-500/20",
  "hover:shadow-yellow-500/20",
  "hover:shadow-red-500/20",
  "hover:shadow-indigo-500/20",
  "hover:shadow-teal-500/20",
  "hover:shadow-orange-500/20",
  "hover:shadow-cyan-500/20",
];

export function getRandomHoverColor(): string {
  return HOVER_COLORS[Math.floor(Math.random() * HOVER_COLORS.length)];
}

export function getRandomShadowColor(): string {
  return SHADOW_COLORS[Math.floor(Math.random() * SHADOW_COLORS.length)];
}
