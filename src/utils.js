const getCalendarNumber = calendar => {
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
    }
};

const getDayNumber = day => {
    if (day < 10) {
        return `0${day}`;
    }

    return `${day}`;
};

export const getWindowImagePlaceholder = (calendar, day) => {
    return `https://cdn.jsdelivr.net/gh/kgolid/lukebilder@latest/${getCalendarNumber(
        calendar
    )}/${getDayNumber(day)}.jpeg`;
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
            return 'JavaScript Christmas';
        case 'kotlin':
            return 'Kotlin Christmas';
        case 'react':
            return 'React Christmas';
        case 'opensource':
            return 'Open Source Christmas';
        case 'functional':
            return 'Functional Christmas';
        case 'java':
            return 'Java Christmas';
        case 'ml':
            return 'ML Christmas';
        case 'product':
            return 'Product Christmas';
        case 'security':
            return 'Security Christmas';
        case 'thecloud':
            return 'The Cloud Christmas';
        case 'ux':
            return 'UX Christmas';
        case 'css':
            return 'CSS Christmas';
        default:
            return null;
    }
};
