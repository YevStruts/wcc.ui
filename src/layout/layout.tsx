import { ReactNode, useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { Exchange } from "../services/DiscordService";
import { SignIn } from "../helpers/AuthHelper";
import Header from "./header";
import { WhoAmI, WhoAmIContext } from "../components/WhoAmIContext";
import { GetWhoAmI } from "../services/UserService";
import { Constants } from "../helpers/ConstantHelper";

interface LayoutProps {
    children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const [searchParams] = useSearchParams();
    const whoAmI = useContext(WhoAmIContext);

    useEffect(() => {
        GetWhoAmI().then((whoami) => {
            whoAmI.role = whoami.role;
            whoAmI.username = whoami.username;
        });
    }, []);

    useEffect(() => {
        let code = searchParams.get("code");
        let state = searchParams.get("state");
        if (code !== null && state !== null) {
            Exchange(code, state)
                .then((response) => {
                    SignIn(response.data.token, response.data.id, response.data.username, response.data.avatar);
                    window.location.href = "/";
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }, []);

    return (
        <WhoAmIContext.Provider value={whoAmI} >
            <Grid>
                <Header />
                <Grid pt={5} mb={5}>
                    <Container>{children}</Container>
                </Grid>
                {/* <Footer /> */}
            </Grid>
        </WhoAmIContext.Provider>
    );
};

export default Layout;