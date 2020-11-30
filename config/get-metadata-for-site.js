module.exports = function getMetadataForSite(siteName = 'bekk') {
    switch (siteName) {
        case 'preview':
            return {
                title: 'Bekk Christmas (preview)',
                description: 'Preview of Bekk Christmas',
                siteUrl: 'https://preview.bekk.christmas',
            };
        case 'css':
            return {
                title: 'CSS Christmas',
                description: 'A Christmas calendar all about CSS',
                siteUrl: 'https://css.christmas',
            };
        case 'functional':
            return {
                title: 'A Functional Christmas',
                description: 'A Christmas calendar all about Functional Programming',
                siteUrl: 'https://functional.christmas',
            };
        case 'java':
            return {
                title: 'Java Christmas',
                description: 'A Christmas calendar all about Java',
                siteUrl: 'https://java.christmas',
            };
        case 'javascript':
            return {
                title: 'JavaScript Christmas',
                description: 'A Christmas calendar all about JavaScript',
                siteUrl: 'https://javascript.christmas',
            };
        case 'kotlin':
            return {
                title: 'Kotlin Christmas',
                description: 'A Christmas calendar all about Kotlin',
                siteUrl: 'https://kotlin.christmas',
            };
        case 'ml':
            return {
                title: 'ML Christmas',
                description: 'A Christmas calendar all about Machine Learning',
                siteUrl: 'https://ml.christmas',
            };
        case 'opensource':
            return {
                title: 'Open Source Christmas',
                description: 'A Christmas calendar all about Open Source',
                siteUrl: 'https://opensource.christmas',
            };
        case 'product':
            return {
                title: 'Product Christmas',
                description: 'A Christmas calendar all about product development',
                siteUrl: 'https://product.christmas',
            };
        case 'react':
            return {
                title: 'React Christmas',
                description: 'A Christmas calendar all about React',
                siteUrl: 'https://react.christmas',
            };
        case 'security':
            return {
                title: 'Security Christmas',
                description: 'A Christmas calendar all about infosec',
                siteUrl: 'https://security.christmas',
            };
        case 'talks':
            return {
                title: 'Talks Christmas',
                description: 'A Christmas calendar all about talks and presentations',
                siteUrl: 'https://talks.christmas',
            };
        case 'thecloud':
            return {
                title: 'Cloud Christmas',
                description: 'A Christmas calendar all about the cloud',
                siteUrl: 'https://thecloud.christmas',
            };
        case 'ux':
            return {
                title: 'UX Christmas',
                description: 'A Christmas calendar all about UX',
                siteUrl: 'https://ux.christmas',
            };
        case 'elm':
            return {
                title: 'Elm Christmas',
                description: 'A Christmas calendar all about Elm',
                siteUrl: 'https://elm.christmas',
            };
        case 'strategy':
            return {
                title: 'Strategy Christmas',
                description: 'A Christmas calendar all about strategy',
                siteUrl: 'https://strategy.christmas',
            };
        default:
            return {
                title: 'Bekk Christmas',
                description: '12 Christmas calendars about tech, design and strategy',
                siteUrl: 'https://bekk.christmas',
            };
    }
};
