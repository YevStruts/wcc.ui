import { IconButton, Box } from "@mui/material";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { format } from 'react-string-format';
import Strings from "./LocalizedStrings";

interface LanguageCodeProps {
    id: number,
    code: string
}

const SupportedLanguages: Array<LanguageCodeProps> = [
    // { id: 1, code: "gb" },
    { id: 2, code: "ua" }
]

const LanguageSwitcher = () => {
    const handleClick = (id: number) => {
        switch (id) {
            case 1 /* english */:
                // Strings.setLanguage('gb');
                localStorage.setItem("Language", "gb");
                break;
            case 2 /* ukraine */:
                // Strings.setLanguage('uk');
                localStorage.setItem("Language", "uk");
                break;
        }
        window.location.reload();
    };

    return (
        <Box>
            {SupportedLanguages.map((lang: LanguageCodeProps) => (
                <IconButton
                    key={lang.id}
                    onClick={() => handleClick(lang.id)}
                    size="small"
                    sx={{ mr: 2, borderRadius: 0 }}
                    aria-haspopup="true"
                    className={format('fi fi-{0}', lang.code)}
                />
            ))}
        </Box>
    );
};

export default LanguageSwitcher;