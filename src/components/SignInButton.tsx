import { Avatar, Box, Button, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import React from "react";
import { GetAuthData, SignOut } from "../helpers/AuthHelper";
import { GetAuthorizeUrl } from "../services/DiscordService";

const { useCallback } = React;

const settings = ["Logout"];

const SignInButton = () => {
    const signIn = useCallback(() => {
        GetAuthorizeUrl().then((data) => (window.location.href = data.redirectUrl));
    }, []);

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleSignOutMenu = () => {
        setAnchorElUser(null);
        SignOut();
        window.location.href = "/";
    };

    let authData = GetAuthData();
    let avatar_url = `https://cdn.discordapp.com/avatars/${authData.id}/${authData.avatar}.png`;
    if (authData.username !== null) {
        return (
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title={authData.username}>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt={authData.username} src={avatar_url} />
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleSignOutMenu}>
                            <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        );
    }
    return (
        <Button color="inherit" onClick={signIn}>
            Sign In
        </Button>
    );
};

export default SignInButton;
