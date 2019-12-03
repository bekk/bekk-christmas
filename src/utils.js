const getCalendarNumber = (calendar, year) => {
    if (year < 2019) {
        return '01';
    }

    switch (calendar) {
        case 'css':
            return '01';
        case 'functional':
            return '02';
        case 'thecloud':
            return '03';
        case 'opensource':
            return '04';
        case 'java':
            return '05';
        case 'kotlin':
            return '06';
        case 'security':
            return '07';
        case 'ux':
            return '08';
        case 'product':
            return '09';
        case 'ml':
            return '10';
        case 'javascript':
            return '11';
        case 'react':
            return '12';
        default:
            return '12';
    }
};

const getDayNumber = day => {
    if (day < 10) {
        return `0${day}`;
    }

    return `${day}`;
};

export const getChristmasTree = (calendar, year) => {
    return `https://cdn.jsdelivr.net/gh/kgolid/lukebilder@1ad5684/${getCalendarNumber(
        calendar,
        year
    )}/tre.png`;
};

export const getWindowImagePlaceholder = (calendar, day, year) => {
    if (year < 2019) {
        return `/assets/generated/${day}.png`;
    }

    return `https://cdn.jsdelivr.net/gh/kgolid/lukebilder@1ad5684/${getCalendarNumber(
        calendar
    )}/small/${getDayNumber(day)}.jpeg`;
};

export const setImageWidth = url => {
    if (url.includes('unsplash')) {
        const urlPart = url.split('?')[0];
        return urlPart + '?w=1226&h=400&fit=crop&crop=edges';
    }

    return url;
};

export const mapCalendarToName = calendar => {
    switch (calendar) {
        case 'javascript':
            return 'JavaScript';
        case 'kotlin':
            return 'Kotlin';
        case 'react':
            return 'React';
        case 'opensource':
            return 'Open Source';
        case 'functional':
            return 'Functional';
        case 'java':
            return 'Java';
        case 'ml':
            return 'Machine Learning';
        case 'product':
            return 'Product';
        case 'security':
            return 'Security';
        case 'thecloud':
            return 'The Cloud';
        case 'ux':
            return 'UX';
        case 'css':
            return 'CSS';
        default:
            return null;
    }
};

export const getCalendarPostLink = (isPreview, calendar, year, day) => {
    let link = '';

    if (isPreview) {
        link = `/${calendar}`;
    } else {
        link = `https://${calendar}.christmas`;
    }

    if (!day) {
        return year === 2019 ? link : `${link}/${year}`;
    }

    return `${link}/${year}/${day}`;
};
