import * as moment from 'moment';


export class DateUtils {

    public static getAbbreviatedFormat(date: string): string {
        return moment(date).format('DD/MM/YYYY');
    }

    public static getLongFormat(date: string): string {
        return moment(date).format('D MMMM YYYY');
    }
}
