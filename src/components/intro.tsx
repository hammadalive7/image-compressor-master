const Intro = () => {
  return (
    <section className="animate-slideUp">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        Pied Piper{" "}
        <span style={{ color: "var(--primary)" }}>Image Compressor</span>
      </h1>
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest" style={{ color: "var(--primary)" }}>
        A Middle-Out Compression Solution Making Image Storage Problems Smaller
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        Compress JPG, PNG &amp; WebP locally using our proprietary middle-out algorithm — no uploads, no account, unlimited files. Images stay on your device.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {[
          { label: "Unlimited images" },
          { label: "JPG · PNG · WebP" },
          { label: "No uploads"       },
          { label: "Middle-Out™"      },
        ].map((f) => (
          <span key={f.label} className="app-chip">
            {f.label}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Intro;
