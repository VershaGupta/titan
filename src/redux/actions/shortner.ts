import { createAction } from ".";
import { IShortnerError } from "../../schema";

export const shortnerConst = {
    FETCH_SHORTENED_URL: "FETCH_SHORTENED_URL",
    SHORTEN_URL: "SHORTEN_URL"
};

export interface IShortner {
    long_url?: string,
    url?: string,
    aggregate_url?: string
}

export interface IGetShortenedUrls extends IShortnerError {data?: IShortner[]}
export interface IGetShortenedUrlsArgs {token?: string}
export const getShortenedUrlsAction = createAction<IGetShortenedUrls, IGetShortenedUrlsArgs>(shortnerConst.FETCH_SHORTENED_URL);


export interface IShortenUrl extends IShortner, IShortnerError {}
export interface IShortenUrlArgs {url: string, token?: string}
export const shortUrlAction = createAction<IShortenUrl, IShortenUrlArgs>(shortnerConst.SHORTEN_URL);