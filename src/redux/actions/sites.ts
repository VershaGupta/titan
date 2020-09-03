import { createAction } from ".";
import { IAPIError, IObject } from "../../schema";

export const SitesConst = {
  GET_SITES: "GET_SITES",
  GET_ALL_UPLOAD_SITES: "GET_ALL_UPLOAD_SITES",
  GET_ALL_SITES: "GET_ALL_SITES",
  ADD_SITES: "ADD_SITES",
   UPDATE_SITE: "UPDATE_SITE",
  // DELETE_Site: "DELETE_Site",
};

export interface Background {
  style: string;
  color: string;
}

export interface Margins {
  top: number;
  bottom: number;
}

export interface Appearance {
  style: string;
  color: string;
  size?: number;
  spacing?: number;
  weight?: number;
  align: string;
  background: Background;
  position: string;
  display: string;
  height?: number;
  kerning?: number;
  margins: Margins;
  width?: number;
}

export interface Text {
  content: string;
  role: string;
}

export interface Group {
  align: string;
  componentIds: string[];
  width: number;
  spacer: boolean;
}


export interface Container {
  mode: string;
  groups: Group[];
  appearance: Appearance;
}

export interface Element {
  id: string;
  classes: string;
  attributes: string;
}

export interface Component {
  id: string;
  appearance: Appearance;
  type: string;
  style: string;
  text: Text;
  container: Container;
}


/**
 * GET_SITES
 */
interface CodeTemplate {
  components: Component[];
  theme: string;
}
interface ISite {
  CodeTemplate?: CodeTemplate
  tempateDomain: string;
  appID: string;
  DateCreated: string;
  DateUpdated: string;
}
export interface ISites extends ISite, IAPIError {
}

export const getSitesAction = createAction<ISites>(
  SitesConst.GET_SITES
);

/**
 * GET_ALL_SITES
 */
// export interface IAllSites extends IAPIError, ISite  {
// }
export interface IAllSites extends IAPIError {
  data: ISite[];
}
export interface IAllSitesArgs {
  customerId: string
}
export const getAllSitesAction = createAction<IAllSites, IAllSitesArgs>(
  SitesConst.GET_ALL_SITES
);
export const getAllUploadSitesAction = createAction<IAllSites, IAllSitesArgs>(
  SitesConst.GET_ALL_UPLOAD_SITES
);

/**
 * ADD_Site
 */

export interface IAddSiteArgs {
  template: CodeTemplate;
  appId: string;
}
export const addSiteAction = createAction<ISites, IAddSiteArgs>(
  SitesConst.ADD_SITES
);

/**
 * UPDATE_Site
 */

export const updateSiteAction = createAction<ISites, IAddSiteArgs>(
  SitesConst.UPDATE_SITE
);
