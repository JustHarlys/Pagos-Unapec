import { createRoot } from 'react-dom/client'
import { useContext } from 'react'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import App from './App.jsx'
import DarkModeToggleProvider, { DarkModeContext } from './Context/DarkModeToggleContext.jsx'

const lightTokens = {
  primary: '#1E3A5F',
  secondary: '#2563EB',
  accent: '#059669',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  muted: '#F1F3F5',
  border: '#E4E7EB',
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
}

const darkTokens = {
  primary: '#4A90D9',
  secondary: '#3B82F6',
  accent: '#10B981',
  background: '#0F172A',
  surface: '#1E293B',
  muted: '#1E2D3D',
  border: '#334155',
  textPrimary: '#F1F5F9',
  textSecondary: '#94A3B8',
}

function ThemedApp() {
  const { darkMode } = useContext(DarkModeContext)
  const t = darkMode ? darkTokens : lightTokens

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: t.primary, contrastText: '#FFFFFF' },
      secondary: { main: t.secondary, contrastText: '#FFFFFF' },
      success: { main: t.accent, contrastText: '#FFFFFF' },
      background: { default: t.background, paper: t.surface },
      text: { primary: t.textPrimary, secondary: t.textSecondary },
      divider: t.border,
    },
    shape: { borderRadius: 10 },
    typography: {
      fontFamily: '"Fira Sans", system-ui, sans-serif',
      h4: { fontWeight: 700, letterSpacing: '-0.5px' },
      h5: { fontWeight: 700, letterSpacing: '-0.3px' },
      h6: { fontWeight: 600 },
      subtitle1: { fontWeight: 500 },
      subtitle2: { fontWeight: 600 },
      body1: { lineHeight: 1.65 },
      body2: { lineHeight: 1.6 },
      button: { fontWeight: 600, letterSpacing: '0.3px', textTransform: 'none', fontSize: '0.95rem' },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: { backgroundColor: t.background },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? t.surface : t.primary,
            color: '#FFFFFF',
            boxShadow: darkMode
              ? '0 1px 0 rgba(255,255,255,0.06)'
              : '0 2px 8px rgba(30,58,95,0.18)',
          },
        },
      },
      MuiPaper: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: {
            border: `1px solid ${t.border}`,
            backgroundImage: 'none',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '10px 20px',
            boxShadow: 'none',
            '&:hover': { boxShadow: 'none' },
          },
          containedPrimary: {
            background: `linear-gradient(135deg, ${t.primary} 0%, #2a4f80 100%)`,
            '&:hover': {
              background: `linear-gradient(135deg, #162d4a 0%, ${t.primary} 100%)`,
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: t.secondary,
            },
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            '&:last-child td': { borderBottom: 0 },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderColor: t.border,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { fontWeight: 500 },
        },
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <DarkModeToggleProvider>
    <ThemedApp />
  </DarkModeToggleProvider>
)
