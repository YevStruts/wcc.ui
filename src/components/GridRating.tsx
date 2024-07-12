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
    Link,
} from "@mui/material";
import Strings from "./LocalizedStrings";
import "/node_modules/flag-icons/css/flag-icons.min.css";

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
    nation: string;
}

interface GridRatingProps {
    players: PlayerProps[];
}

const GridRating = ({ players }: GridRatingProps) => {
    var positionCounter = 0;
    var samePointsCount = 0;
    var lastPointsCount = 0;
    return (
        <TableContainer>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell width={100}>#</StyledTableCell>
                        <StyledTableCell width={30}>{/* progress */}</StyledTableCell>
                        <StyledTableCell width={300}>{Strings.ratings_name}</StyledTableCell>
                        <StyledTableCell width={100}></StyledTableCell>
                        <StyledTableCell width={200}>{Strings.ratings_score}</StyledTableCell>
                        <StyledTableCell>{Strings.ratings_comment}</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {players.map(({ id, name, comment, avatarUrl, position, totalPoints, nation }: any, index) => {
                        var profileUrl = "/profile/" + id;
                        var nationality = "fi fi-" + nation;
                        if (lastPointsCount == 0 || lastPointsCount > totalPoints) {
                            lastPointsCount = totalPoints;
                            positionCounter++;
                            samePointsCount = 0;
                        } else if (lastPointsCount == totalPoints) {
                            positionCounter++;
                            samePointsCount++;
                        }
                        if (id == "players/40-A") {
                            comment = "Champion in Vacation"
                        }
                        return (
                            <StyledTableRow key={id}>
                                <StyledTableCell>{positionCounter - samePointsCount}</StyledTableCell>
                                <StyledTableCell>
                                    <Avatar alt={name} src={avatarUrl} sx={{ width: 24, height: 24 }}/>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Link href={profileUrl} underline="none" color="white">{name}</Link>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <span className={nationality}></span>
                                </StyledTableCell>
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
