export interface CompressedImage {
  fileName: string;
  originalImageSize: number;
  compressedImageSize: number;
  fileType: string;
  content: string;
  originalContent: string;
  compressionPercentage: string;
}
