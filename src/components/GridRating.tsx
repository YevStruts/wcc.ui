import {
    TableContainer,
    TableHead,
    TableRow,
    TableBody,
    styled,
    Table,
    TableCell,
    tableCellClasses,
} from "@mui/material";
import { Player } from "../models/Player";

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

interface GridRatingProps {
    players: Player[];
}

const GridRating = ({ players }: GridRatingProps) => {
    return (
        <TableContainer>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell width={100}>#</StyledTableCell>
                        <StyledTableCell width={30}>{/* progress */}</StyledTableCell>
                        <StyledTableCell width={500}>Name</StyledTableCell>
                        <StyledTableCell>Comment</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {players.map(({ id, name, comment }: any) => {
                        return (
                            <StyledTableRow key={id}>
                                <StyledTableCell>{id}</StyledTableCell>
                                <StyledTableCell></StyledTableCell>
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
