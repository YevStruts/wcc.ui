import { RulesProps } from "../interfaces/RulesProps";

const lang = localStorage.getItem(`Language`) ?? 'gb';

const base_url = `https://wcc-cossacks.s3.eu-central-1.amazonaws.com`;

const rules : Array<RulesProps> = [
    { id: 1, name:  `0pt 1k`, image: `${base_url}/images/rules/0pt1k_` + lang + `.png` },
    { id: 2, name:  `0pt 5k`, image: `${base_url}/images/rules/0pt5k_` + lang + `.png` },
    { id: 3, name: `10pt 5k`, image: `${base_url}/images/rules/10pt5k_` + lang + `.png` },
    { id: 4, name: `15pt 5k`, image: `${base_url}/images/rules/15pt5k_` + lang + `.png` },
    { id: 5, name: `0pt 5k Sea`, image: `${base_url}/images/rules/0pt_sea_` + lang + `.png` },
    { id: 6, name: `20pt 5k Sea`, image: `${base_url}/images/rules/20pt_sea_` + lang + `.png` },
    { id: 7, name: `0pt Millions`, image: `${base_url}/images/rules/0pt_mlns_` + lang + `.png` },
    { id: 8, name: `10pt Millions`, image: `${base_url}/images/rules/10pt_mlns_` + lang + `.png` },
];

export default {
    rules,
}