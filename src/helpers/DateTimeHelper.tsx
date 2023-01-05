import { format } from 'date-fns'

export const FormatDateTime = (ticks: number, datetimeFormat: string) => {
    return format(new Date(ticks), datetimeFormat);
};