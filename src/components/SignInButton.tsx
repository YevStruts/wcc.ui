import { Avatar, Box, Button, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import React from "react";
import { GetAuthData, SignOut } from "../helpers/AuthHelper";
import { GetAuthorizeUrl } from "../services/DiscordService";
import Strings from "./LocalizedStrings";

const { useCallback } = React;

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

    const handleManageMenu = () => {
        window.location.href = "/manage";
    };

    const handleSettingsMenu = () => {
        setAnchorElUser(null);
        window.location.href = "/settings";
    };

    const handleSignOutMenu = () => {
        setAnchorElUser(null);
        SignOut();
        window.location.href = "/";
    };

    const settings = [
        // { id: 1, name: Strings.manage, onclick: handleManageMenu },
        { id: 3, name: Strings.settings, onclick: handleSettingsMenu },
        { id: 2, name: Strings.logout, onclick: handleSignOutMenu }
    ];

    let authData = GetAuthData();
    let avatar_url = authData.avatar !== null && authData.avatar.length > 0 ?
        `https://cdn.discordapp.com/avatars/${authData.id}/${authData.avatar}.png` : ``;
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
                        <MenuItem key={setting.id} onClick={setting.onclick}>
                            <Typography textAlign="center">{setting.name}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        );
    }
    return (
        <Button color="inherit" onClick={signIn}>
            {Strings.signin}
        </Button>
    );
};

export default SignInButton;
