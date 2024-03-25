import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import Strings from "../../components/LocalizedStrings";
import PageTitle from "../../components/PageTitle";
import Layout from "../../layout/layout";
import rules from '../../data/Rules';
import { RulesProps } from "../../interfaces/RulesProps";

const Title = Strings.rules;

// function handleOnCartClick(id: number): void {
//     window.location.href = "/news/" + id;
// }

const Rules = () => {
    // const [newsList, setNewsList] = useState<ArticleProps[]>([]);

    useEffect(() => {
        // GetNewsList().then((news) => {
        //     setNewsList(news);
        // });
    }, []);

    return (
        <Layout>
            <Grid container>
                <Grid item xs={12} textAlign={"center"} mb={5}>
                    <PageTitle text={Title} />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={5}>
                        {rules.rules.map(({ id, name, image }: RulesProps) => {
                            return (
                                <Grid item xs={12} sm={6} md={4} key={id} textAlign="center">
                                    <Box>{name}</Box>
                                    <Box
                                        component="img"
                                        sx={{
                                        height: 594,
                                        width: 318,
                                        maxHeight: { xs: 594 },
                                        maxWidth: { xs: 318 },
                                        }}
                                        alt={name}
                                        src={image}
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </Layout>
    );
};
export default Rules;

