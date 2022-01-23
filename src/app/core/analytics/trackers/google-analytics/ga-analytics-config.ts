

export type GaAnalyticsConfig = {
    trackerId: string;
    trackerName: string;
    cookieDomain: string;
    options?: {
      allowLinker: boolean;
    };
    links?: string[]
}
