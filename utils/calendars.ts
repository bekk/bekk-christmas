type CalendarInfo = {
  displayName: string;
  keywords: string[];
  image?: string;
  description?: string;
};
/** Maps a given calendar slug to some static calendar information */
export const calendarInfo: Record<string, CalendarInfo> = {
  css: { displayName: "CSS", keywords: ["CSS", "styles", "styling", "HTML"] },
  elm: {
    displayName: "Elm",
    keywords: ["elm", "elmlang", "functional programming", "fp"],
  },
  functional: {
    displayName: "Functional",
    keywords: ["functional programming", "fp", "immutable"],
  },
  innovation: {
    displayName: "Innovation",
    keywords: ["innovation", "podcast"],
  },
  java: { displayName: "Java", keywords: ["java", "jvm"] },
  javascript: {
    displayName: "JavaScript",
    keywords: ["javascript", "js", "typescript", "ts", "ecma", "ecmascript"],
  },
  kotlin: { displayName: "Kotlin", keywords: ["kotlin", "jvm", "java"] },
  ml: {
    displayName: "Machine Learning",
    keywords: ["ml", "ai", "machine learning"],
  },
  opensource: { displayName: "Open Source", keywords: ["opensource", "oss"] },
  react: {
    displayName: "React",
    keywords: ["react", "javascript", "js", "jsx"],
  },
  security: { displayName: "Security", keywords: ["security", "infosec"] },
  strategy: {
    displayName: "Strategy",
    keywords: ["strategy", "okr", "business"],
  },
  talks: {
    displayName: "Talks",
    keywords: [
      "talks",
      "presentations",
      "cfp",
      "call for proposals",
      "public speaking",
    ],
  },
  thecloud: {
    displayName: "The Cloud",
    keywords: [
      "cloud",
      "cloud computing",
      "serverless",
      "aws",
      "google cloud platform",
      "azure",
      "firebase",
      "kubernetes",
    ],
  },
  ux: {
    displayName: "UX",
    keywords: ["ux", "user experience", "design", "visual design"],
  },
};
