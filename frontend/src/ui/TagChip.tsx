export default function TagChip({ label }: { label: string }) {
  return (
    <span className="text-xs px-2 py-1 rounded-full border leading-none">
      {label}
    </span>
  );
}
