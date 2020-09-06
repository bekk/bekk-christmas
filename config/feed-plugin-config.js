function shouldPublishPost(edge) {
    const currentDate = new Date();
    const currentYear = currentDate.getUTCFullYear();
    const currentMonth = currentDate.getUTCMonth();
    const currentDay = currentDate.getUTCDate();

    // if the post is from a previous year, always publish
    if (edge.node.frontmatter.post_year < currentYear) {
        return true;
    }
    // if not December of the post's year, don't publish. Remember, December is month 11 (zero-index)
    if (currentMonth < 11) {
        return false;
    }

    // if we get here, we're in the same year, and in december. It comes down to the day!
    return edge.node.frontmatter.post_day <= currentDay;
}

module.exports = function feedPluginConfig(calendar) {
    return {
        feeds: [
            {
                serialize: ({ query: { allMarkdownRemark } }) => {
                    return allMarkdownRemark.edges.filter(shouldPublishPost).map(edge => {
                        const {
                            calendar: frontmatterCalendar,
                            post_year,
                            post_day,
                            ingress,
                        } = edge.node.frontmatter;

                        return Object.assign({}, edge.node.frontmatter, {
                            description: ingress || edge.node.excerpt,
                            date: `${post_year}-12-${post_day}`,
                            url: `https://${frontmatterCalendar}.christmas/${post_year}/${post_day}`,
                            guid: `${frontmatterCalendar}-${post_year}-${post_day}`,
                            custom_elements: [{ 'content:encoded': edge.node.html }],
                        });
                    });
                },
                query: `
            {
                allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___calendar, frontmatter___post_year, frontmatter___post_day]}, filter: ${
                    [null, 'preview'].includes(calendar)
                        ? // skips authors, but includes the rest
                          '{frontmatter: {calendar: {ne: null}}}'
                        : `{frontmatter: {calendar: {eq: "${calendar}"}}}`
                }) {
                  edges {
                    node {
                      excerpt
                      html
                      id
                      frontmatter {
                        calendar
                        title
                        ingress
                        post_day
                        post_year
                      }
                    }
                  }
                }
              }
              
      `,
                output: '/rss.xml',
                title: `The ${calendar || 'Bekk'} Christmas RSS feed`,
                match: '^/2020/',
            },
        ],
    };
};
