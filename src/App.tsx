import { useEffect, useRef } from "react";
import ActionButtons from "./components/action-buttons";
import CompressedImagesGrid from "./components/compressed-images-grid";
import DropZone from "./components/drop-zone";
import Footer from "./components/footer";
import Header from "./components/header";
import ImageQualitySlider from "./components/image-quality-slider";
import Intro from "./components/intro";
import LoadingSpinner from "./components/loading-spinner";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/sonner";
import { useImageCompression } from "./hooks";

function App() {
  const {
    compressedImages,
    zipFile,
    loading,
    value,
    filelist,
    compressProgress,
    handleImageUpload,
    onImageQualityChange,
    resetCompression,
  } = useImageCompression();

  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (compressedImages.length > 0 && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, [compressedImages.length]);

  return (
    <ThemeProvider defaultTheme="system" storageKey="imgzip-theme">
      <div className="flex min-h-screen flex-col bg-background">
        <Header />

        {/* Responsive container: single column on mobile/tablet, two-column sidebar layout on xl+ */}
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 xl:px-8">

          {/* ── Mobile / tablet: stacked ─────────────────────────────── */}
          <div className="xl:hidden max-w-3xl space-y-6">
            <Intro />
            <ImageQualitySlider value={value} onImageQualityChange={onImageQualityChange} />
            <div className="app-card p-5" ref={resultsRef}>
              <DropZone onFilesSelected={handleImageUpload} hasCompressedImages={compressedImages.length > 0} />
              <ActionButtons zipFile={zipFile} onReset={resetCompression} hasCompressedImages={compressedImages.length > 0} hasFileList={filelist.length > 0} />
              {loading
                ? <div className="mt-4"><LoadingSpinner compressProgress={compressProgress} /></div>
                : <CompressedImagesGrid compressedImages={compressedImages} />
              }
            </div>
          </div>

          {/* ── Large screen: sidebar layout ─────────────────────────── */}
          <div className="hidden xl:grid xl:grid-cols-[320px_1fr] xl:gap-8 xl:items-start">

            {/* Left sidebar — intro + quality control (sticky) */}
            <aside className="sticky top-20 space-y-5">
              <Intro />
              <ImageQualitySlider value={value} onImageQualityChange={onImageQualityChange} />
            </aside>

            {/* Right — upload workspace + results */}
            <div className="space-y-4" ref={resultsRef}>
              <div className="app-card p-5">
                <DropZone onFilesSelected={handleImageUpload} hasCompressedImages={compressedImages.length > 0} />
                <ActionButtons zipFile={zipFile} onReset={resetCompression} hasCompressedImages={compressedImages.length > 0} hasFileList={filelist.length > 0} />
                {loading
                  ? <div className="mt-4"><LoadingSpinner compressProgress={compressProgress} /></div>
                  : <CompressedImagesGrid compressedImages={compressedImages} />
                }
              </div>
            </div>

          </div>
        </main>

        <Footer />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
