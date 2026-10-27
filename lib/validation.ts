// Browser checks improve feedback; a future backend must independently validate every upload.
export function validateVideo(
  file: { name: string; type: string; size: number },
  maxBytes: number,
): string {
  const extension = file.name.split(".").pop()?.toLowerCase() || "";
  if (
    !["mp4", "mov", "webm"].includes(extension) ||
    (file.type &&
      !["video/mp4", "video/quicktime", "video/webm"].includes(file.type))
  )
    return "Choose an MP4, MOV or WebM video.";
  if (file.size === 0)
    return "This file is empty. Please choose another video.";
  if (file.size > maxBytes)
    return "Your clip is too large. The limit is 500 MB.";
  return "";
}
