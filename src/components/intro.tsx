const Intro = () => {
  return (
    <section className="animate-slideUp">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        Free{" "}
        <span style={{ color: "var(--primary)" }}>Image Compressor</span>
      </h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Compress JPG, PNG &amp; WebP locally — no uploads, no account, unlimited files.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {[
          { label: "Unlimited images" },
          { label: "JPG · PNG · WebP" },
          { label: "No uploads"       },
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
