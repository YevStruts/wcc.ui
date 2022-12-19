import { ReactNode, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { Exchange } from "../services/DiscordService";
import { SignIn } from "../helpers/AuthHelper";
import Header from "./header";
import Footer from "./footer";

interface LayoutProps {
    children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const [searchParams] = useSearchParams();

    useEffect(() => {
        let code = searchParams.get("code");
        let state = searchParams.get("state");
        if (code !== null && state !== null) {
            Exchange(code, state)
                .then((response) => {
                    SignIn(response.data.code, response.data.id, response.data.username, response.data.avatar);
                    window.location.href = "/";
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }, []);

    return (
        <Grid>
            <Header />
            <Grid pt={5} mb={5}>
                <Container>{children}</Container>
            </Grid>
            <Footer />
        </Grid>
    );
};

export default Layout;