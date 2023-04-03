import {
    TableContainer,
    TableHead,
    TableRow,
    TableBody,
    styled,
    Table,
    TableCell,
    tableCellClasses,
    Avatar,
} from "@mui/material";
import Strings from "./LocalizedStrings";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

export interface PlayerProps {
    id: number;
    name: string;
    avatarUrl: string;
}

interface GridRatingProps {
    players: PlayerProps[];
}

const GridRating = ({ players }: GridRatingProps) => {
    return (
        <TableContainer>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell width={100}>#</StyledTableCell>
                        <StyledTableCell width={30}>{/* progress */}</StyledTableCell>
                        <StyledTableCell width={500}>{Strings.ratings_name}</StyledTableCell>
                        <StyledTableCell>{Strings.ratings_comment}</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {players.map(({ id, name, comment, avatarUrl }: any, index) => {
                        return (
                            <StyledTableRow key={id}>
                                <StyledTableCell>{index + 1}</StyledTableCell>
                                <StyledTableCell>
                                    <Avatar alt={name} src={avatarUrl} sx={{ width: 24, height: 24 }}/>
                                </StyledTableCell>
                                <StyledTableCell>{name}</StyledTableCell>
                                <StyledTableCell>{comment}</StyledTableCell>
                            </StyledTableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default GridRating;
