import WindowImage0 from './images/luke-0.png';
import WindowImage1 from './images/luke-1.png';
import WindowImage2 from './images/luke-2.png';

export const getWindowImagePlaceholder = index => {
    if (index % 3 === 0) {
        return WindowImage0;
    }
    if (index % 3 === 1) {
        return WindowImage1;
    }
    if (index % 3 === 2) {
        return WindowImage2;
    }
};

export const mapCalendarToName = calendar => {
    console.log(calendar);
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
            return 'CSS';
        default:
            return null;
    }
};
