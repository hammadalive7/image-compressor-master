import { formatBytes } from "@/lib/utils";
import { Download } from "lucide-react";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

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
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const { left, width } = el.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - left) / width) * 100));
    setPosition(pct);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
    updatePosition(e.clientX);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setDragging(true);
    updatePosition(e.touches[0].clientX);
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => updatePosition(e.clientX);
    const onTouchMove = (e: TouchEvent) => updatePosition(e.touches[0].clientX);
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [dragging, updatePosition]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-square w-full overflow-hidden select-none"
      style={{ cursor: dragging ? "ew-resize" : "col-resize" }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      {/* Compressed (right / base layer) */}
      <img
        src={compressed}
        alt={`${fileName} compressed`}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />

      {/* Original (left / clipped layer) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img
          src={original}
          alt={`${fileName} original`}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ width: containerRef.current?.offsetWidth ?? "100%" }}
          draggable={false}
        />
      </div>

      {/* Labels */}
      <div className="pointer-events-none absolute top-2 left-2 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white"
        style={{ background: "rgba(0,0,0,0.55)", opacity: position > 15 ? 1 : 0, transition: "opacity 0.15s" }}>
        Before
      </div>
      <div className="pointer-events-none absolute top-2 right-2 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white"
        style={{ background: "rgba(0,0,0,0.55)", opacity: position < 85 ? 1 : 0, transition: "opacity 0.15s" }}>
        After
      </div>

      {/* Divider line */}
      <div
        className="pointer-events-none absolute inset-y-0 w-px"
        style={{ left: `${position}%`, background: "rgba(255,255,255,0.9)" }}
      />

      {/* Handle */}
      <div
        className="pointer-events-none absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full shadow-lg"
        style={{
          left: `${position}%`,
          background: "white",
          boxShadow: "0 2px 8px rgba(0,0,0,0.35)",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M4.5 3L1.5 7L4.5 11" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9.5 3L12.5 7L9.5 11" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
};

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
    const saved = parseFloat(props.compressionPercentage);

    return (
      <div className="group relative flex flex-col rounded-lg border border-border bg-surface overflow-hidden transition-all duration-150 hover:border-border-strong hover:shadow-md will-change-transform">
        {/* Before/After slider */}
        <BeforeAfterSlider
          original={props.originalContent}
          compressed={props.content}
          fileName={props.fileName}
        />

        {/* Savings badge — overlaid on top-left */}
        {saved < 0 && (
          <div
            className="absolute top-2 left-2 rounded-full px-2 py-0.5 text-[10px] font-bold leading-none pointer-events-none"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
          >
            -{Math.abs(saved).toFixed(1)}%
          </div>
        )}

        {/* Info row */}
        <div className="flex items-center justify-between gap-2 px-2.5 py-2">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-medium text-foreground">
              {props.fileName}
            </p>
            <p className="text-[10px] text-muted-foreground">
              <span>{formatBytes(props.originalImageSize)}</span>
              <span className="mx-1 opacity-50">→</span>
              <span style={{ color: "var(--primary)" }} className="font-semibold">
                {formatBytes(props.compressedImageSize)}
              </span>
            </p>
          </div>
          {/* Download — always visible so user doesn't have to hunt for it */}
          <PhotoView src={props.content}>
            <button
              className="app-btn-icon flex-shrink-0"
              style={{ width: 28, height: 28 }}
              aria-label={`Preview ${props.fileName}`}
              onClick={(e) => e.stopPropagation()}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </button>
          </PhotoView>
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
    );
  }
);

export default ImagePreviewCard;
