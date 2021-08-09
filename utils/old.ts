const getCalendarNumber = (calendar) => {
  switch (calendar) {
    case "css":
    case "talks":
      return "01";
    case "functional":
      return "02";
    case "thecloud":
      return "03";
    case "opensource":
      return "04";
    case "java":
    case "elm":
      return "05";
    case "kotlin":
      return "06";
    case "security":
      return "07";
    case "ux":
      return "08";
    case "innovation":
      return "09";
    case "ml":
    case "strategy":
      return "10";
    case "javascript":
      return "11";
    case "react":
      return "12";
    default:
      return "01";
  }
};

const getDayNumber = (day) => {
  if (day < 10) {
    return `0${day}`;
  }

  return `${day}`;
};

export const getChristmasTree = (calendar, year) => {
  return `/assets/lukebilder/${getCalendarNumber(calendar)}/tre.png`;
};

export const getWindowImagePlaceholder = (calendar, day) => {
  return `/assets/lukebilder/${getCalendarNumber(calendar)}/${getDayNumber(
    day
  )}.jpeg`;
};

export const setImageWidth = (url) => {
  if (url.includes("unsplash")) {
    const urlPart = url.split("?")[0];
    return urlPart + "?w=1226&h=400&fit=crop&crop=edges";
  }

  return url;
};

export const setImageHeight = (url) => {
  if (url.includes("unsplash")) {
    const urlPart = url.split("?")[0];
    return urlPart + "?w=710&h=300&fit=crop&crop=edges";
  }

  return url;
};

export const mapCalendarToName = (calendar) => {
  switch (calendar) {
    case "javascript":
      return "JavaScript";
    case "kotlin":
      return "Kotlin";
    case "react":
      return "React";
    case "opensource":
      return "Open Source";
    case "functional":
      return "Functional";
    case "java":
      return "Java";
    case "ml":
      return "Machine Learning";
    case "innovation":
      return "Innovation";
    case "security":
      return "Security";
    case "thecloud":
      return "The Cloud";
    case "ux":
      return "UX";
    case "css":
      return "CSS";
    case "talks":
      return "Talks";
    case "elm":
      return "Elm";
    case "strategy":
      return "Strategy";
    default:
      return null;
  }
};

export const getCalendarPostLink = (
  isPreview,
  calendar,
  year,
  day,
  forceFrontPage = false
) => {
  let link = "";

  if (isPreview) {
    link = `/${calendar}`;
  } else {
    link = `https://${calendar}.christmas`;
  }

  if (forceFrontPage) {
    return link;
  }

  if (!day) {
    return `${link}/${year}`;
  }

  return `${link}/${year}/${day}`;
};
