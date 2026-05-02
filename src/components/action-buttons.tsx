import { downloadZip } from "@/lib";
import { Download, RotateCcw } from "lucide-react";

interface ActionButtonsProps {
  zipFile: Blob | null;
  onReset: () => void;
  hasCompressedImages: boolean;
  hasFileList: boolean;
}

const ActionButtons = ({
  zipFile,
  onReset,
  hasCompressedImages,
  hasFileList,
}: ActionButtonsProps) => {
  if (!hasCompressedImages || !hasFileList) return null;

  return (
    <div className="animate-fadeInFast mt-4 flex items-center justify-between gap-3 border-t border-border pt-4">
      <p className="text-xs text-muted-foreground">
        Compression complete
      </p>
      <div className="flex gap-2">
        <button className="app-btn-ghost" onClick={onReset} aria-label="Reset">
          <RotateCcw className="size-3.5" strokeWidth={2} />
          Reset
        </button>
        <button className="app-btn-primary" onClick={() => downloadZip(zipFile)} aria-label="Download ZIP">
          <Download className="size-3.5" strokeWidth={2} />
          Download ZIP
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;
