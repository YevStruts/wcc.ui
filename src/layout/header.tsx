import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../components/Logo";
import Strings from "../components/LocalizedStrings"
import LanguageSwitcher from "../components/LanguageSwitcher";
import { WhoAmI, WhoAmIContext } from "../components/WhoAmIContext"
import { useContext } from "react";
import { Constants } from "../helpers/ConstantHelper";
import SignInButton from "../components/SignInButton";
import styled from "@emotion/styled";

const pages = [
    { title: Strings.news, url: "/news" },
    { title: Strings.rules, url: "/rules" },
    { title: Strings.ratings, url: "/ratings" },
    { title: Strings.tournaments, url: "/tournaments" },
];

const Header = () => {

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const whoAmI = useContext(WhoAmIContext);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(null);
        if (event.currentTarget.dataset.url !== undefined) {
            window.location.href = event.currentTarget.dataset.url;
        }
    };

    return (
        <AppBar position="static">
            <Container>
                <Toolbar disableGutters>
                    <Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
                        <Logo width="142px" height="40px" />
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.title} data-url={page.url} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page.title}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
                    >
                        <Logo width="142px" height="40px" />
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.title}
                                data-url={page.url}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                {page.title}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{
                            "img": {
                            width: 150,
                            height: 30,
                            },
                        }}
                        width={150}
                        pt={1}>
                        <a href="https://www.buymeacoffee.com/wcc_cossacks" target="_blank">
                            <img src="https://img.buymeacoffee.com/button-api/?text=Support WCC&emoji=&slug=wcc_cossacks&button_colour=FFDD00&font_colour=000000&font_family=Inter&outline_colour=000000&coffee_colour=ffffff" />
                        </a>
                    </Box>
                    <Box>
                        <LanguageSwitcher />
                    </Box>
                    <SignInButton whoami={whoAmI} />
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Header;
