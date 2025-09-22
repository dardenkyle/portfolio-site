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

export function getRandomShadowColor(): string {
  return SHADOW_COLORS[Math.floor(Math.random() * SHADOW_COLORS.length)];
}
