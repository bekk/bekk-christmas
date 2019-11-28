import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import * as colors from '../constants/colors';

const ThemeContext = React.createContext(null);

const themes = ['dark', 'light'];
const [darkTheme, lightTheme] = themes;
const themeConfigs = {
    [darkTheme]: {
        secondaryBackgroundColor: colors.darkGray,
        contrastBackgroundColor: colors.yellow,
        textColor: colors.white,
        linkTextColor: colors.white,
        contrastTextColor: colors.black,
        prism: {
            textColor: '#c5c8c6',
            backgroundColor: '#1d1f21',
            commentTextColor: '#7C7C7C',
            punctuationColor: '#c5c8c6',
            propertyColor: '#96CBFE',
            selectorColor: '#A8FF60',
            operatorColor: '#BCCEDD',
            keywordColor: '#96CBFE',
            functionColor: '#DAD085',
            variableColor: '#C6C5FE',
        },
        darkThemeImageDisplay: 'block',
        lightThemeImageDisplay: 'none',
    },
    [lightTheme]: {
        secondaryBackgroundColor: colors.lighterGray,
        contrastBackgroundColor: colors.contrastYellow,
        textColor: colors.black,
        linkTextColor: colors.black,
        contrastTextColor: colors.black,
        prism: {
            textColor: colors.black,
            backgroundColor: '#f6f8fa',
            commentTextColor: '#6a737d;',
            punctuationColor: '#999999',
            propertyColor: '#990055',
            selectorColor: '#669900',
            operatorColor: '#a67f59',
            keywordColor: '#0077aa',
            functionColor: '#DD4A68',
            variableColor: '#ee9900',
        },
        darkThemeImageDisplay: 'none',
        lightThemeImageDisplay: 'block',
    },
};

export const ThemeProvider = ({ children, ...rest }) => {
    const [theme, setTheme] = React.useState(lightTheme);

    React.useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = e => setTheme(e.matches ? darkTheme : lightTheme);
        mediaQuery.addListener(handleChange);
        setTheme(mediaQuery.matches ? darkTheme : lightTheme);
        return () => mediaQuery.removeListener(handleChange);
    }, []);

    const contextValue = {
        toggleTheme: () =>
            setTheme(prevTheme => (prevTheme === darkTheme ? lightTheme : darkTheme)),
        theme,
    };

    return (
        <ThemeContext.Provider value={contextValue} {...rest}>
            <StyledThemeProvider theme={themeConfigs[theme]}>{children}</StyledThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = React.useContext(ThemeContext);
    if (!context) {
        throw new Error('You have to wrap your app in a `ThemeProvider`.');
    }
    return context;
};
