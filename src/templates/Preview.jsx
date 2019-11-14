import React from 'react';
import { Link } from 'gatsby';

const Preview = ({ calendarsWithContent }) => {
    if (calendarsWithContent == null || calendarsWithContent.length === 0) {
        return null;
    }

    return (
        <>
            <h2>Only visible in preview - all available calendars</h2>
            <ul>
                {calendarsWithContent.map(link => (
                    <li key={link}>
                        <Link to={link}>{link}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Preview;
