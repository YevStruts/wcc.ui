import { Grid } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import Layout from "../../layout/layout";
import { GetNewsItem } from "../../services/NewsService";

export interface ArticleProps {
    id: number;
    name: string;
    description: string;
    image_url: string;
}

const Article = () => {
    const [searchParams] = useSearchParams();
    const [newsItem, setNewsItem] = useState<ArticleProps>();

    useEffect(() => {
        let id = searchParams.get("id") ?? "0";
        GetNewsItem(id).then((article) => {
            setNewsItem(article);
        });
    }, []);

    return (
        <Layout>
            <Grid container>
                <Grid item xs={12} textAlign={"center"} mb={5}>
                    <PageTitle text={newsItem?.name ?? ""} />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        {newsItem?.description ?? ""}
                    </Grid>
                </Grid>
            </Grid>
        </Layout>
    );
};
export default Article;