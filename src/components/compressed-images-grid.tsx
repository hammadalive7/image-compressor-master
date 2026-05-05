import { downloadSingleImage, type CompressedImage } from "@/lib";
import { Inbox } from "lucide-react";
import ImagePreviewCard from "./image-preview-card";

interface CompressedImagesGridProps {
  compressedImages: CompressedImage[];
}

const CompressedImagesGrid = ({ compressedImages }: CompressedImagesGridProps) => {
  if (compressedImages.length === 0) {
    return (
      <div className="animate-fadeIn flex flex-col items-center justify-center py-10 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-sunken">
          <Inbox className="size-5 text-muted-foreground" strokeWidth={1.5} />
        </div>
        <p className="text-sm font-medium text-muted-foreground">Nothing compressed yet</p>
        <p className="mt-0.5 max-w-[220px] text-xs text-muted-foreground">
          Drop some images up there. Even Dinesh figured it out on his first try.
        </p>
      </div>
    );
  }

  const totalOriginal   = compressedImages.reduce((s, i) => s + i.originalImageSize, 0);
  const totalCompressed = compressedImages.reduce((s, i) => s + i.compressedImageSize, 0);
  const savedPct = totalOriginal > 0
    ? (((totalOriginal - totalCompressed) / totalOriginal) * 100).toFixed(1)
    : "0";

  return (
    <div className="animate-fadeIn mt-4 space-y-3">
      {/* Summary strip */}
      <div
        className="flex items-center gap-4 rounded-lg px-3 py-2.5"
        style={{ background: "var(--primary-subtle)", border: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-2">
          <svg className="size-4 flex-shrink-0" viewBox="0 0 16 16" fill="none" style={{ color: "var(--primary)" }}>
            <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-xs font-medium" style={{ color: "var(--primary)" }}>
            {savedPct}% crushed across {compressedImages.length} file{compressedImages.length !== 1 ? "s" : ""} — Gavin Belson is seething.
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {compressedImages.map((image, i) => (
          <div
            key={`${image.fileName}-${i}`}
            className="animate-popIn"
            style={{ animationDelay: `${Math.min(i * 35, 250)}ms` }}
          >
            <ImagePreviewCard
              onSingleFileDownload={downloadSingleImage}
              {...image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompressedImagesGrid;
