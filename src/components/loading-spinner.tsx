const LoadingSpinner = ({ compressProgress }: { compressProgress: number }) => {
  const done = compressProgress === 100;

  return (
    <div className="animate-fadeIn space-y-2.5 py-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">
          {done ? "Done" : "Compressing…"}
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
          Processing locally — nothing leaves your device
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
