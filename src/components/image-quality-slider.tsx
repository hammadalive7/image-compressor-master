const STEPS = [
  { pct: 0,   tier: "J-Yang",   cls: "app-chip-warning" },
  { pct: 20,  tier: "Dinesh",   cls: "app-chip-warning" },
  { pct: 40,  tier: "B.Head",   cls: "app-chip" },
  { pct: 60,  tier: "Gilfoyle", cls: "app-chip-success" },
  { pct: 80,  tier: "Richard",  cls: "app-chip-success" },
  { pct: 100, tier: "Erlich",   cls: "app-chip-warning" },
];

const getQualityMeta = (v: number) => {
  if (v === 0)   return { label: "Why tho", cls: "app-chip-warning" };
  if (v === 100) return { label: "Erlich mode", cls: "app-chip-warning" };
  if (v <= 40)   return { label: "Dinesh would", cls: "app-chip" };
  if (v <= 80)   return { label: "Richard approves", cls: "app-chip-success" };
  return { label: "Erlich mode", cls: "app-chip-warning" };
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
          <span className="text-sm font-medium text-foreground">Compression Level</span>
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
            title={`${s.tier} — ${s.pct}%`}
            className={`flex cursor-pointer flex-col items-center transition-opacity duration-150 hover:opacity-100 ${
              value === s.pct ? "opacity-100" : "opacity-30"
            }`}
          >
            <span className={`text-[10px] font-medium leading-tight ${value === s.pct ? "text-foreground" : "text-muted-foreground"}`}>
              {value === s.pct ? s.tier : s.pct + "%"}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageQualitySlider;
