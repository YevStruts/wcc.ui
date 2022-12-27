import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import ActionAreaCard from "../../components/ActionAreaCard";
import PageTitle from "../../components/PageTitle";
import Layout from "../../layout/layout";
import { GetNewsList } from "../../services/NewsService";
import { ArticleProps } from "./article";

const Title = "NEWS";

function handleOnCartClick(id: number): void {
    window.location.href = "/news/" + id;
}

const News = () => {
    const [newsList, setNewsList] = useState<ArticleProps[]>([]);

    useEffect(() => {
        GetNewsList().then((news) => {
            setNewsList(news);
        });
    }, []);

    return (
        <Layout>
            <Grid container>
                <Grid item xs={12} textAlign={"center"} mb={5}>
                    <PageTitle text={Title} />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        {newsList.map(({ id, name, description, image_url }: any) => {
                            return (
                                <Grid item xs={12} sm={6} md={4} key={id}>
                                    <ActionAreaCard
                                        id={id}
                                        name={name}
                                        description={description}
                                        image_url={image_url}
                                        on_click={() => handleOnCartClick(id)}
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
export default News;

