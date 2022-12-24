import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import Layout from "../layout/layout";
import { NewsItemModel } from "../models/NewsItemModel";

const Title = "NEWS Item";

const NewsItem = () => {
    const [newsItem, setNewsItem] = useState<NewsItemModel>();

    useEffect(() => {
    }, []);

    return (
        <Layout>
            <Grid container>
                <Grid item xs={12} textAlign={"center"} mb={5}>
                    <PageTitle text={Title} />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        Single News Item
                    </Grid>
                </Grid>
            </Grid>
        </Layout>
    );
};
export default NewsItem;