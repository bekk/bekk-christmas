import { Index } from 'elasticlunr';

const getCalendarNumber = (calendar) => {
    switch (calendar) {
        case 'css':
        case 'talks':
            return '01';
        case 'functional':
            return '02';
        case 'thecloud':
            return '03';
        case 'opensource':
        case 'dot-net':
            return '04';
        case 'java':
        case "elm":
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
        case 'strategy':
            return '10';
        case 'javascript':
            return '11';
        case 'react':
            return '12';
        default:
            return '01';
    }
};

const getDayNumber = (day) => {
    if (day < 10) {
        return `0${day}`;
    }

    return `${day}`;
};

export const getChristmasTree = (calendar, year) => {
    return `https://cdn.jsdelivr.net/gh/kgolid/lukebilder@1ad5684/${getCalendarNumber(calendar)}/tre.png`;
};

export const getWindowImagePlaceholder = (calendar, day) => {
    return `https://cdn.jsdelivr.net/gh/kgolid/lukebilder@1ad5684/${getCalendarNumber(
        calendar
    )}/small/${getDayNumber(day)}.jpeg`;
};

export const setImageWidth = (url) => {
    if (url.includes('unsplash')) {
        const urlPart = url.split('?')[0];
        return urlPart + '?w=1226&h=400&fit=crop&crop=edges';
    }

    return url;
};

export const setImageHeight = (url) => {
    if (url.includes('unsplash')) {
        const urlPart = url.split('?')[0];
        return urlPart + '?w=710&h=300&fit=crop&crop=edges';
    }

    return url;
};

export const mapCalendarToName = (calendar) => {
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
        case 'talks':
            return 'Talks';
        case 'dot-net':
            return '.NET';
        case 'elm':
            return 'Elm';
        case 'strategy':
            return 'Strategy';
        default:
            return null;
    }
};

export const getCalendarPostLink = (isPreview, calendar, year, day, forceFrontPage = false) => {
    let link = '';

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

export const getSearchResultsLink = (query) => `/search?${query}`;

// I stor grad hentet fra pakkedokumentasjonen til gatsby-plugin-elasticlunr-search:
// https://www.gatsbyjs.com/plugins/@gatsby-contrib/gatsby-plugin-elasticlunr-search/?=search#consuming-in-your-site
export const getSearchResults = (query, searchIndex) => {
    // Create an elastic lunr index and hydrate with graphql query results
    const index = Index.load(searchIndex);
    return (
        index
            // Query the index with search value to get list of IDs
            .search(query, { expand: true })
            // Map over the IDs, return the full set of fields as specified in gatsby-config
            .map(({ ref }) => index.documentStore.getDoc(ref))
            // As we use the title field for both authors and posts, we get both author-objects and post-objects
            // Filter on the authors-field which exists on the post-object, but not the author-object
            .filter((post) => post.authors)
    );
};
