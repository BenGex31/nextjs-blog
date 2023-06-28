import { format } from 'date-fns';

export function toDayString(){
    const today = format(new Date(), "YYYY-MM-DD")
    return today;
}