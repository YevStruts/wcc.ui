import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";

interface GameTypeProps {
    gametype: number;
    on_gametype_change: (value : number) => void
}

const GameType = ({ gametype, on_gametype_change } : GameTypeProps) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        var value = parseInt((event.target as HTMLInputElement).value);
        on_gametype_change(value);
    };

    return (
        <>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                defaultValue={gametype}
                onChange={handleChange}
            >
                <FormControlLabel value="1" control={<Radio />} label="Individual" />
                <FormControlLabel value="2" control={<Radio />} label="Teams" disabled />
            </RadioGroup>
        </>
    );
};

export default GameType;