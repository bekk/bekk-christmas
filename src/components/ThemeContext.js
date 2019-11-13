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
        linkTextColor: colors.primary,
        contrastTextColor: colors.black,
    },
    [lightTheme]: {
        primaryBackgroundColor: colors.white,
        secondaryBackgroundColor: colors.lightGray,
        contrastBackgroundColor: colors.contrastYellow,
        textColor: colors.black,
        linkTextColor: colors.primary,
        contrastTextColor: colors.black,
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
