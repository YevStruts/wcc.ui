import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import ActionAreaCard from "../components/ActionAreaCard";
import PageTitle from "../components/PageTitle";
import Layout from "../layout/layout";
import { NewsItem } from "../models/NewsItem";
import { GetNews } from "../services/NewsService";

const Title = "NEWS";

const News = () => {
    const [news, setNewsList] = useState<NewsItem[]>([]);

    useEffect(() => {
        GetNews().then((news) => {
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
                        {news.map(({ id, name, description, image_url }: any) => {
                            return (
                                <Grid item xs={12} sm={6} md={4} key={id}>
                                    <ActionAreaCard
                                        id={id}
                                        name={name}
                                        description={description}
                                        image_url={image_url}
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
