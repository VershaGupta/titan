import { createAction } from ".";
import { IAPIError, IObject } from "../../schema";

export const insightsConst = {
  GET_ENGAGEMENT: "GET_ENGAGEMENT",
};

export interface IEngagement {
  data?: {
    hits: number;
    top_stats: ITopStats;
    aggr: {
      urls: IURLEngagement;
    };
  };
}

export interface IURLEngagement {
  [host: string]: IViewsAndShares[];
}

export interface IViewsAndShares {
  widget: string;
  t: string;
  url: string;
  v: null | number;
  c: null | IObject<number>;
}

export interface ITopStats {
  top_viewed_page: string;
  view_count: number;
  top_shared_url: string;
  top_shared_via_provider: string;
  top_conversion_ratio: string;
  top_conversion_url: string;
  top_geo: string;
  top_device_name: string;
  top_os: string;
  top_browser_name: string;
  top_channel: string;
  top_social_media: string;
}

export interface IGetEngagement extends IEngagement, IAPIError {}
export interface IGetEngagementArgs {
  user_id: string;
  from?: string;
  to?: string;
  skip?: number;
  limit?: number;
}
export const getEngagementAction = createAction<
  IGetEngagement,
  IGetEngagementArgs
>(insightsConst.GET_ENGAGEMENT);
