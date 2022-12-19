import { Autocomplete, createFilterOptions, TextField } from "@mui/material";
import { useState } from "react";
import { Player } from "../models/Player";

interface VoteCardProps {
    id: number;
    pollList: Player[];
}

const filter = createFilterOptions<Player>();

const VoteCard = ({ id, pollList }: VoteCardProps) => {
    const [value, setValue] = useState<Player | null>(null);
    let typedText = "";

    return (
        <Autocomplete
            value={value}
            options={pollList}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);
                if (params.inputValue !== "") {
                    typedText = params.inputValue;
                }
                return filtered;
            }}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label={"# " + id} variant="standard" />}
            onKeyDown={(event) => {
                if (event.key === "Enter" && typedText.length > 0) {
                    event.defaultPrevented = true;
                    pollList.push({ id: 0, name: typedText });
                    setValue({ id: 0, name: typedText });
                }
            }}
            onChange={(event, value) => {
                setValue(value);
            }}
        />
    );
};

export default VoteCard;
