import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";

const theme = createTheme({
    palette: { mode: "dark" },
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes />
            </Router>
        </ThemeProvider>
    );
};

export default App;
