const Intro = () => {
  return (
    <section className="animate-slideUp">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        Pied Piper{" "}
        <span style={{ color: "var(--primary)" }}>Image Compressor</span>
      </h1>
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest" style={{ color: "var(--primary)" }}>
        Middle-Out™ Compression — Hooli couldn't buy this. We checked.
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        Middle-Out™ compression, right in your browser. No uploads, no server, no Gavin Belson. Your images never leave your device.
      </p>
      <p className="mt-3 text-[11px] italic text-muted-foreground border-l-2 pl-3 hidden sm:block" style={{ borderColor: "var(--primary)" }}>
        "A compression ratio that would make Lossless weep." — Richard Hendricks
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {[
          { label: "Unlimited images" },
          { label: "JPG · PNG · WebP" },
          { label: "No uploads — ever" },
          { label: "Middle-Out™"      },
          { label: "Weissman: ∞"      },
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
