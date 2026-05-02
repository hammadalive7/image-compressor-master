const STEPS = [
  { pct: 0,   tier: "Low",  cls: "app-chip-warning" },
  { pct: 20,  tier: "Fair", cls: "app-chip-warning" },
  { pct: 40,  tier: "Okay", cls: "app-chip" },
  { pct: 60,  tier: "Good", cls: "app-chip-success" },
  { pct: 80,  tier: "High", cls: "app-chip-success" },
  { pct: 100, tier: "Max",  cls: "app-chip-warning" },
];

const getQualityMeta = (v: number) => {
  if (v === 0 || v === 100) return { label: "Not recommended", cls: "app-chip-warning" };
  if (v <= 40)  return { label: "Moderate",    cls: "app-chip" };
  if (v <= 80)  return { label: "Recommended", cls: "app-chip-success" };
  return { label: "Not recommended", cls: "app-chip-warning" };
};

const ImageQualitySlider = ({
  value,
  onImageQualityChange,
}: {
  value: number;
  onImageQualityChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { label, cls } = getQualityMeta(value);

  return (
    <div className="animate-fadeIn animate-delay-100 app-card p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="text-sm font-medium text-foreground">Quality</span>
          <span className={`app-chip ${cls}`}>{label}</span>
        </div>
        <span className="text-xl font-semibold tabular-nums" style={{ color: "var(--primary)" }}>
          {value}%
        </span>
      </div>

      <input
        type="range"
        className="app-range"
        value={value}
        min={0}
        max={100}
        step={20}
        onChange={onImageQualityChange}
        aria-label="Compression quality"
      />

      <div className="mt-2.5 flex justify-between">
        {STEPS.map((s) => (
          <button
            key={s.pct}
            type="button"
            onClick={() =>
              onImageQualityChange({
                target: { value: String(s.pct) },
              } as React.ChangeEvent<HTMLInputElement>)
            }
            className={`flex cursor-pointer flex-col items-center gap-0.5 transition-opacity duration-150 hover:opacity-100 ${
              value === s.pct ? "opacity-100" : "opacity-35"
            }`}
          >
            <span className="text-[11px] font-medium text-foreground">{s.tier}</span>
            <span className="text-[10px] tabular-nums text-muted-foreground">{s.pct}%</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageQualitySlider;
