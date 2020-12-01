import { graphql } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Calendar from '../components/Calendar';
import CalendarWindowOpen from '../components/CalendarWindowOpen';
import Layout from '../components/Layout';
import Search from '../components/search/Search';
import { Teaser } from '../components/Teaser';
import * as mediaQueries from '../constants/media-queries';
import treeImage from '../images/frontpage-tree.png';
import ogImageSrc from '../images/teaser-1.jpg';
import { getCalendarPostLink, getWindowImagePlaceholder } from '../utils';

const Header = styled.h1`
    font-size: 4.1rem;
    font-weight: 400;

    ${mediaQueries.smallUp}  {
        font-size: 5rem;
    }
`;

const Description = styled.p`
    margin: 0;
    margin-bottom: 50px;
    font-size: 2em;
    max-width: 100%;

    ${mediaQueries.smallUp}  {
        font-size: 2.8em;
    }

    ${mediaQueries.mediumUp}  {
        max-width: 700px;
    }
`;

const CalendarHeading = styled.h2`
    font-weight: 400;
    font-size: 3em;
    padding-left: 10px;

    ${mediaQueries.mediumUp}  {
        padding-left: 15px;
    }
`;

const ChristmasTreeMobile = styled.div`
    display: none;
    margin-left: 30px;
    max-width: 120px;

    @media all and (min-width: 500px) {
        display: block;
    }

    ${mediaQueries.mediumUp} {
        display: none;
    }
`;

const ChristmasTreeDesktop = styled.div`
    display: none;
    padding-top: 40px;
    max-width: 240px;

    ${mediaQueries.mediumUp}  {
        display: block;
    }
`;

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 20px 100px;

    ${mediaQueries.mediumUp}  {
        margin: 0 40px 150px;
    }

    ${mediaQueries.largeUp}  {
        margin: 0 100px 150px;
    }
`;

const SearchWrapper = styled.div`
    padding: 0 10px;
    max-width: 750px;
    margin: 25px auto;
`;

const Frontpage = ({ data, pageContext }) => {
    const calendars = data.allMarkdownRemark.nodes.map((markdown) => markdown.frontmatter);
    const showTeaser = calendars.length === 0;
    const isDecember = new Date().getMonth() === 11;

    if (showTeaser) {
        return <Teaser />;
    }

    return (
        <Layout>
            <Helmet>
                <html lang="en" />
                <title>Bekk Christmas</title>
                <meta
                    property="description"
                    content="Bekk is getting in the Christmas spirit with 24 days of articles"
                />
                <meta property="og:title" content="Bekk Christmas" />
                <meta
                    property="og:description"
                    content="Bekk is getting in the Christmas spirit with 24 days of articles"
                />
                <meta property="og:image" content={ogImageSrc} />
            </Helmet>
            <Top>
                <div>
                    <HeaderContainer>
                        <Header>Bekk Christmas</Header>
                        <ChristmasTreeMobile>
                            <img src={treeImage} alt="" />
                        </ChristmasTreeMobile>
                    </HeaderContainer>
                    <Description>
                        264 articles, 24 days.
                        <br />
                        Made with{' '}
                        <span role="img" aria-label="christmas spirit">
                            🎅
                        </span>{' '}
                        in Oslo and Trondheim, Norway!
                    </Description>
                    <Description>
                        Read about this project
                        <br />
                        <a href="https://blogg.bekk.no/wishing-you-all-a-very-bekk-christmas-8505a0a332e2">
                            on our blog
                        </a>
                        .
                    </Description>
                </div>
                <ChristmasTreeDesktop>
                    <img src={treeImage} alt="" />
                </ChristmasTreeDesktop>
            </Top>
            <SearchWrapper>
                <Search
                    searchIndex={pageContext.siteSearchIndex.index}
                    isPreview={pageContext.isPreview}
                />
            </SearchWrapper>
            <CalendarHeading>{isDecember ? "Today's articles" : 'Our calendars'}</CalendarHeading>
            <Calendar>
                {calendars.map((calendar) => (
                    <li key={calendar.calendar}>
                        <CalendarWindowOpen
                            to={
                                pageContext.isPreview &&
                                getCalendarPostLink(
                                    pageContext.isPreview,
                                    calendar.calendar,
                                    calendar.post_year,
                                    calendar.post_day
                                )
                            }
                            href={
                                !pageContext.isPreview &&
                                getCalendarPostLink(
                                    pageContext.isPreview,
                                    calendar.calendar,
                                    calendar.post_year,
                                    calendar.post_day,
                                    !isDecember
                                )
                            }
                            imageUrl={getWindowImagePlaceholder(
                                calendar.calendar,
                                calendar.post_day
                            )}
                            calendarName={calendar.calendar}
                            title={isDecember && calendar.title}
                        />
                    </li>
                ))}
            </Calendar>
        </Layout>
    );
};

export const frontpageQuery = graphql`
    query FrontPage($day: Int!, $year: Int!) {
        allMarkdownRemark(
            filter: {
                frontmatter: {
                    post_day: { eq: $day }
                    post_year: { eq: $year }
                    calendar: { ne: null }
                }
            }
        ) {
            nodes {
                frontmatter {
                    calendar
                    post_year
                    post_day
                    title
                }
            }
        }
    }
`;

export default Frontpage;
