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
    position: number;
    totalPoints: number;
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
                        <StyledTableCell width={300}>{Strings.ratings_name}</StyledTableCell>
                        <StyledTableCell width={200}>{Strings.ratings_score}</StyledTableCell>
                        <StyledTableCell>{Strings.ratings_comment}</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {players.map(({ id, name, comment, avatarUrl, position, totalPoints }: any, index) => {
                        return (
                            <StyledTableRow key={id}>
                                <StyledTableCell>{position}</StyledTableCell>
                                <StyledTableCell>
                                    <Avatar alt={name} src={avatarUrl} sx={{ width: 24, height: 24 }}/>
                                </StyledTableCell>
                                <StyledTableCell>{name}</StyledTableCell>
                                <StyledTableCell>{totalPoints}</StyledTableCell>
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
