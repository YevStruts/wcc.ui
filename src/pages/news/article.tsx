import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import Layout from "../../layout/layout";
import { GetNewsItem } from "../../services/NewsService";

var decode = require('decode-html');

export interface ArticleProps {
    id: number;
    name: string;
    description: string;
    image_url: string;
}

const Article = () => {
    const params = useParams();

    const [newsItem, setNewsItem] = useState<ArticleProps>();

    useEffect(() => {
        let id = params.id ?? "0";
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
                        <div dangerouslySetInnerHTML={{__html: decode(newsItem?.description ?? "")}} />
                    </Grid>
                </Grid>
            </Grid>
        </Layout>
    );
};
export default Article;