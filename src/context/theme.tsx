import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'

const getCssVariable = (variable: string): string =>
    getComputedStyle(document.documentElement).getPropertyValue(variable).trim()

const theme = createTheme({
    palette: {
        mode: 'dark', // TODO: Unhardcode this later
        background: {
            default: getCssVariable('--background-1'),
            paper: getCssVariable('--background-2'),
        },
        primary: {
            main: getCssVariable('--color-primary-1'),
        },
    },
    shape: {
        borderRadius: parseInt(getCssVariable('--standard-radius'), 10),
    }
})

interface ThemeProviderProps {
    children: React.ReactNode
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
    return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}

export default ThemeProvider
