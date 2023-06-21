import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import ActionAreaCard from "../../components/ActionAreaCard";
import Strings from "../../components/LocalizedStrings";
import PageTitle from "../../components/PageTitle";
import Layout from "../../layout/layout";
import { GetNewsList } from "../../services/NewsService";

const Title = Strings.rules;

// function handleOnCartClick(id: number): void {
//     window.location.href = "/news/" + id;
// }

interface RulesProps {
    id : number,
    name : string,
    image : string
};

const lang = localStorage.getItem("Language") ?? 'gb';

const rules : Array<RulesProps> = [];
rules.push({ id: 1, name:  "0pt 1k", image: "/options/0pt1k_" + lang + ".png" });
rules.push({ id: 2, name:  "0pt 5k", image: "/options/0pt5k_" + lang + ".png" });
rules.push({ id: 3, name: "15pt 5k", image: "/options/15pt5k_" + lang + ".png" });
rules.push({ id: 4, name: "20pt 5k Sea", image: "/options/20pt_sea_" + lang + ".png" });
rules.push({ id: 5, name: "10pt Millions", image: "/options/10pt_$$$_" + lang + ".png" });

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
                        {rules.map(({ id, name, image }: RulesProps) => {
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

