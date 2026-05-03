import { formatBytes } from "@/lib/utils";
import { Download, X } from "lucide-react";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// ---------------------------------------------------------------------------
// Industry-standard before/after slider
// Both images are full-size and absolutely stacked.
// The "before" (original) image is clipped with clipPath so it perfectly
// aligns with the "after" image — no sizing hacks needed.
// ---------------------------------------------------------------------------
const BeforeAfterSlider = ({
  original,
  compressed,
  fileName,
}: {
  original: string;
  compressed: string;
  fileName: string;
}) => {
  const [position, setPosition] = useState(50);
  const dragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const calcPosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const { left, width } = el.getBoundingClientRect();
    return Math.min(100, Math.max(0, ((clientX - left) / width) * 100));
  }, []);

  // Mouse
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;
    const p = calcPosition(e.clientX);
    if (p !== undefined) setPosition(p);
  }, [calcPosition]);

  // Touch
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    dragging.current = true;
    const p = calcPosition(e.touches[0].clientX);
    if (p !== undefined) setPosition(p);
  }, [calcPosition]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const p = calcPosition(e.clientX);
      if (p !== undefined) setPosition(p);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!dragging.current) return;
      e.preventDefault();
      const p = calcPosition(e.touches[0].clientX);
      if (p !== undefined) setPosition(p);
    };
    const onUp = () => { dragging.current = false; };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [calcPosition]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none overflow-hidden"
      style={{ cursor: "col-resize", touchAction: "none" }}
    >
      {/* AFTER — compressed, full size, base layer */}
      <img
        src={compressed}
        alt={`${fileName} after`}
        className="absolute inset-0 w-full h-full object-contain"
        draggable={false}
      />

      {/* BEFORE — original, clipped to left portion via clipPath */}
      <img
        src={original}
        alt={`${fileName} before`}
        className="absolute inset-0 w-full h-full object-contain"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        draggable={false}
      />

      {/* Divider line */}
      <div
        className="absolute inset-y-0 w-0.5 -translate-x-1/2 pointer-events-none"
        style={{ left: `${position}%`, background: "rgba(255,255,255,0.95)" }}
      />

      {/* Drag handle — positioned on the divider, captures all pointer events */}
      <div
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full"
        style={{
          left: `${position}%`,
          background: "white",
          boxShadow: "0 2px 16px rgba(0,0,0,0.45)",
          cursor: "col-resize",
        }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <path d="M7 5L3 10L7 15" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13 5L17 10L13 15" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Labels */}
      <span
        className="pointer-events-none absolute bottom-4 left-4 rounded px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-white"
        style={{
          background: "rgba(0,0,0,0.55)",
          opacity: position > 12 ? 1 : 0,
          transition: "opacity 0.15s",
        }}
      >
        Before
      </span>
      <span
        className="pointer-events-none absolute bottom-4 right-4 rounded px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-white"
        style={{
          background: "rgba(0,0,0,0.55)",
          opacity: position < 88 ? 1 : 0,
          transition: "opacity 0.15s",
        }}
      >
        After
      </span>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Modal — rendered into document.body via a portal so it is never constrained
// by the grid or any ancestor's overflow/stacking context.
// ---------------------------------------------------------------------------
const PreviewModal = ({
  original,
  compressed,
  fileName,
  onClose,
}: {
  original: string;
  compressed: string;
  fileName: string;
  onClose: () => void;
}) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    // Prevent body scroll while modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex flex-col"
      style={{ background: "#000" }}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-4 py-3 flex-shrink-0"
        style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
      >
        <p className="truncate text-sm font-medium text-white/80 max-w-[calc(100%-3rem)]">
          {fileName}
        </p>
        <button
          onClick={onClose}
          className="ml-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-white/80 hover:text-white transition-colors"
          style={{ background: "rgba(255,255,255,0.12)" }}
          aria-label="Close preview"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Slider — takes all remaining height */}
      <div className="flex-1 min-h-0">
        <BeforeAfterSlider
          original={original}
          compressed={compressed}
          fileName={fileName}
        />
      </div>

      {/* Bottom hint */}
      <div
        className="flex-shrink-0 flex items-center justify-center py-2.5 text-[11px] text-white/40"
        style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
      >
        Drag to compare &nbsp;·&nbsp; Esc to close
      </div>
    </div>,
    document.body
  );
};

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------
const ImagePreviewCard = memo(
  ({
    onSingleFileDownload,
    ...props
  }: {
    onSingleFileDownload: (file: string, fileName?: string) => void;
    content: string;
    originalContent: string;
    fileName: string;
    originalImageSize: number;
    compressedImageSize: number;
    compressionPercentage: string;
  }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const saved = parseFloat(props.compressionPercentage);

    return (
      <>
        <div className="group relative flex flex-col rounded-lg border border-border bg-surface overflow-hidden transition-all duration-150 hover:border-border-strong hover:shadow-md will-change-transform">
          {/* Thumbnail */}
          <div className="relative aspect-square w-full overflow-hidden bg-muted">
            <img
              src={props.content}
              alt={props.fileName}
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />
            {saved < 0 && (
              <div
                className="absolute top-2 left-2 rounded-full px-2 py-0.5 text-[10px] font-bold leading-none pointer-events-none"
                style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
              >
                -{Math.abs(saved).toFixed(1)}%
              </div>
            )}
          </div>

          {/* Info row */}
          <div className="flex items-center justify-between gap-2 px-2.5 py-2">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-medium text-foreground">{props.fileName}</p>
              <p className="text-[10px] text-muted-foreground">
                <span>{formatBytes(props.originalImageSize)}</span>
                <span className="mx-1 opacity-50">→</span>
                <span style={{ color: "var(--primary)" }} className="font-semibold">
                  {formatBytes(props.compressedImageSize)}
                </span>
              </p>
            </div>

            <button
              className="app-btn-icon flex-shrink-0"
              style={{ width: 28, height: 28 }}
              aria-label={`Preview ${props.fileName}`}
              onClick={() => setModalOpen(true)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>

            <button
              className="app-btn-icon flex-shrink-0"
              style={{ width: 28, height: 28 }}
              onClick={() => onSingleFileDownload(props.content, props.fileName)}
              aria-label={`Download ${props.fileName}`}
            >
              <Download className="size-3.5" strokeWidth={2} />
            </button>
          </div>
        </div>

        {modalOpen && (
          <PreviewModal
            original={props.originalContent}
            compressed={props.content}
            fileName={props.fileName}
            onClose={() => setModalOpen(false)}
          />
        )}
      </>
    );
  }
);

export default ImagePreviewCard;
