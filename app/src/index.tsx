// TODO: Vite build does double API calls in a strict mode, there has to be a research and impelementation of a fix
// import React from "react";
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material'
import App from './App'
import { theme } from './theme/muiTheme'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Clock from '@src/ClockWindow'
import React from 'react'
import './styles.css'

const container = document.getElementById('root')
if (!container) {
    throw new Error('root is missing html file')
}
const root = createRoot(container)

root.render(
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/clock" element={<Clock />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    </ErrorBoundary>
)
