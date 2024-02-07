

import { environment } from '../../environments/environment';

export class Urls {
    private static BASE_URL: string = environment.api_base_url;
    public static readonly LOGIN = `${Urls.BASE_URL}/accountDetails/login`;
    public static readonly USERS = `${Urls.BASE_URL}/accountDetails`;
    public static readonly BAGS = `${Urls.BASE_URL}/bagsFromPanchayats`;
    public static readonly BALE = `${Urls.BASE_URL}/bales`;

    public static readonly WLIST = `${Urls.BASE_URL}/wasteLists`;
    public static readonly TALUK = `${Urls.BASE_URL}/taluks`;
    public static readonly PANCH = `${Urls.BASE_URL}/panchayats`;
    public static readonly WCOLL = `${Urls.BASE_URL}/wasteCollecteds`;
    public static readonly AGGR = `${Urls.BASE_URL}/wAggregateds`;

    public static readonly LOGOUT = `${Urls.BASE_URL}/accountDetails/logout`;
    public static readonly SendEmail = `${Urls.BASE_URL}/emails/sendEmail`;
    public static readonly Emailsave = `${Urls.BASE_URL}/emails`;

}
