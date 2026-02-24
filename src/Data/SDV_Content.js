export const SDV_Content = [
  {
    bgCard: "bg-[#1738B8]",
    icon: new URL("@/assets/icons/SDV/group-1.png", import.meta.url).href,
    title: "rPPG Signals Extraction",
    titleColor: "text-[#1738B8]",
    body: `Derives remote photoplethysmographic (rPPG) signals from facial video data. These signals reflect vital signs such as heart rate and are extracted without physical sensors.`,
  },
  {
    bgCard: "bg-[#1738B8]",
    icon: new URL("@/assets/icons/SDV/group-2.png", import.meta.url).href,
    title: "Signal Filtering",
    titleColor: "text-[#1738B8]",
    body: `Applies advanced signal processing filters to enhance relevant health data while removing interference. This step ensures the extracted rPPG signals are clean and ready for analysis.`,
  },
  {
    bgCard: "bg-[#1738B8]",
    icon: new URL("@/assets/icons/SDV/group-3.png", import.meta.url).href,
    title: "Noise Reduction",
    titleColor: "text-[#1738B8]",
    body: `Removes unwanted disturbances like lighting changes or small head movements from the signal. This enhances the clarity of health indicators by eliminating signal artifacts.`,
  },
  {
    bgCard: "bg-[#1738B8]",
    icon: new URL("@/assets/icons/SDV/group-4.png", import.meta.url).href,
    title: "AI Feature Extraction",
    titleColor: "text-[#1738B8]",
    body: `Uses machine learning algorithms to identify critical patterns in the cleaned signals. The system recognizes features such as heart rate variability and other biometric indicators.`,
  },
  {
    bgCard: "bg-[#1738B8]",
    icon: new URL("@/assets/icons/SDV/group-5.png", import.meta.url).href,
    title: "Feature Prediction",
    titleColor: "text-[#1738B8]",
    body: `Predicts key physiological parameters based on the extracted features, such as estimated pulse, respiration rate, and stress indicators enabling fast, contactless health insights.`,
  },
];
