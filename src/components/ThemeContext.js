import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import * as colors from '../constants/colors';

const ThemeContext = React.createContext(null);

const themes = ['dark', 'light'];
const [darkTheme, lightTheme] = themes;
const themeConfigs = {
    [darkTheme]: {
        primaryBackgroundColor: colors.black,
        secondaryBackgroundColor: colors.darkGray,
        contrastBackgroundColor: colors.yellow,
        textColor: colors.white,
        linkTextColor: colors.white,
        contrastTextColor: colors.black,
        prism: {
            textColor: colors.white,
            backgroundColor: colors.darkGray,
            commentTextColor: colors.lightGray,
            punctuationColor: colors.primary,
            propertyColor: colors.white,
            selectorColor: colors.white,
            operatorColor: '#BCCEDD',
            keywordColor: colors.contrastYellow,
            functionColor: colors.primaryDark,
            variableColor: '#ee9900',
        },
    },
    [lightTheme]: {
        primaryBackgroundColor: colors.white,
        secondaryBackgroundColor: colors.lighterGrey,
        contrastBackgroundColor: colors.contrastYellow,
        textColor: colors.black,
        linkTextColor: colors.black,
        contrastTextColor: colors.black,
        prism: {
            textColor: colors.black,
            backgroundColor: '#f0f0f0',
            commentTextColor: colors.darkGray,
            punctuationColor: '#ff5b5b',
            propertyColor: colors.black,
            selectorColor: colors.black,
            operatorColor: '#a67f59',
            keywordColor: '#162365',
            functionColor: '#FF5B5B',
            variableColor: '#ee9900',
        },
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
