/* doc: https://www.npmjs.com/package/react-localization */
import LocalizedStrings from 'react-localization';

let Strings = new LocalizedStrings({
    en:{
        news:"NEWS",
    },
    uk: {
        news:"НОВИНИ",
    }
});

Strings.setLanguage(localStorage.getItem("Language") ?? 'uk');

export default Strings;