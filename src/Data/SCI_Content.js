export const SCI_Content = [
  {
    bgCard: "bg-[#2B7C3F]",
    icon: new URL("@/assets/icons/SCI/group-255.png", import.meta.url).href,
    title: "Capturing Facial Blood Flow Video",
    titleColor: "text-[#2B7C3F]",
    body: `Captures real-time facial video to analyze micro blood flow changes using standard cameras. This process is non-contact and helps extract physiological signals from skin color fluctuations linked to blood circulation.`,
  },
  {
    bgCard: "bg-[#2B7C3F]",
    icon: new URL("@/assets/icons/SCI/group-256.png", import.meta.url).href,
    title: "Object Detection",
    titleColor: "text-[#2B7C3F]",
    body: `Detects and tracks facial areas and other relevant objects to ensure the correct region is monitored throughout the video. This improves accuracy by isolating key visual components.`,
  },
  {
    bgCard: "bg-[#2B7C3F]",
    icon: new URL("@/assets/icons/SCI/group-257.png", import.meta.url).href,
    title: "Requirement Condition Detection",
    titleColor: "text-[#2B7C3F]",
    body: `Automatically checks for environmental and positional requirements such as lighting quality, subject distance, and motion artifacts. This ensures the system only processes usable and reliable visual data.`,
  },
  {
    bgCard: "bg-[#2B7C3F]",
    icon: new URL("@/assets/icons/SCI/group-258.png", import.meta.url).href,
    title: "Region of Interest (ROI)",
    titleColor: "text-[#2B7C3F]",
    body: `Selects specific facial zones (like the forehead or cheeks) where blood flow signals are most visible. Focusing on ROI improves signal strength and reduces noise from unrelated areas.`,
  },
  {
    bgCard: "bg-[#2B7C3F]",
    icon: new URL("@/assets/icons/SCI/group-259.png", import.meta.url).href,
    title: "Raw (RGB) Signals Extraction",
    titleColor: "text-[#2B7C3F]",
    body: `Extracts color channel values (Red, Green, Blue) from the ROI. These raw signals form the basis for further physiological analysis, capturing subtle changes caused by blood flow variations.`,
  },
];
