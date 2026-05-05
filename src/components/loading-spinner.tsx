const COMPRESSION_QUIPS = [
  "Erlich is definitely taking credit for this...",
  "Jian-Yang is watching. Compress faster.",
  "Big Head could do this. Barely.",
  "Gavin Belson hates that this is free.",
  "Running middle-out on the middle-out...",
  "Not Hooli. Not ever.",
  "Gilfoyle wrote this part. It's fine.",
  "Dinesh wanted to add a loading bar. We did.",
  "Weissman score: incalculable.",
  "Your images are safe. Unlike Erlich's equity.",
  "Richard is pacing around the garage right now.",
  "No data centers were harmed in this compression.",
];

const LoadingSpinner = ({ compressProgress }: { compressProgress: number }) => {
  const done = compressProgress === 100;
  const quip = COMPRESSION_QUIPS[Math.floor(Math.random() * COMPRESSION_QUIPS.length)];

  return (
    <div className="animate-fadeIn space-y-2.5 py-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">
          {done ? "Middle-Out™ complete." : "Compressing…"}
        </span>
        <span
          className="text-sm font-semibold tabular-nums"
          style={{ color: "var(--primary)" }}
        >
          {compressProgress}%
        </span>
      </div>

      <div className="app-progress-track">
        <div
          className="app-progress-fill"
          style={{ width: `${compressProgress}%` }}
        />
      </div>

      {!done && (
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <span
            className="inline-block h-3 w-3 rounded-full border-2 border-transparent flex-shrink-0"
            style={{
              borderTopColor: "var(--primary)",
              animation: "spin 0.75s linear infinite",
            }}
          />
          {quip}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
