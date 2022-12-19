import { Typography } from "@mui/material";

interface PageTitleProps {
    text: string;
}

const PageTitle = ({ text }: PageTitleProps) => {
    return (
        <Typography variant="h6" color="white">
            {text}
        </Typography>
    );
};

export default PageTitle;
