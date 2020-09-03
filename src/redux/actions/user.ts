import { createAction } from ".";
import { ILRError } from "../../schema";

export const userConst = {
  FETCH_PROFILE: "FETCH_PROFILE",
};

export interface IProfile {
  Identities: Identity[];
  Password: null;
  LastPasswordChangeDate: null;
  PasswordExpirationDate: null;
  LastPasswordChangeToken: null;
  EmailVerified: boolean;
  IsActive: boolean;
  IsDeleted: boolean;
  Uid: string;
  CustomFields: CustomFields;
  IsEmailSubscribed: boolean;
  UserName: null;
  NoOfLogins: number;
  PhoneId: null;
  PhoneIdVerified: boolean;
  Roles: null;
  ExternalUserLoginId: null;
  RegistrationProvider: null;
  IsLoginLocked: boolean;
  LoginLockedType: string;
  LastLoginLocation: string;
  RegistrationSource: string;
  IsCustomUid: boolean;
  UnverifiedEmail: null;
  IsSecurePassword: null;
  PrivacyPolicy: null;
  ExternalIds: null;
  IsRequiredFieldsFilledOnce: null;
  ConsentProfile: null;
  PIN: null;
  RegistrationData: null;
  ID: string;
  Provider: string;
  Prefix: null;
  FirstName: string;
  MiddleName: null;
  LastName: string;
  Suffix: null;
  FullName: string;
  NickName: null;
  ProfileName: null;
  BirthDate: null;
  Gender: string;
  Website: null;
  Email: Email[] | null;
  Country: null;
  ThumbnailImageUrl: string;
  ImageUrl: string;
  Favicon: null;
  ProfileUrl: string;
  HomeTown: null;
  State: null;
  City: string;
  Industry: null;
  About: null;
  TimeZone: null;
  LocalLanguage: string;
  CoverPhoto: null;
  TagLine: null;
  Language: string;
  Verified: string;
  UpdatedTime: null;
  Positions: null;
  Educations: null;
  PhoneNumbers: null;
  IMAccounts: null;
  Addresses: null;
  MainAddress: null;
  Created: null;
  CreatedDate: Date;
  ModifiedDate: Date;
  ProfileModifiedDate: null;
  LocalCity: null;
  ProfileCity: string;
  LocalCountry: string;
  ProfileCountry: null;
  FirstLogin: boolean;
  IsProtected: boolean;
  RelationshipStatus: null;
  Quota: null;
  Quote: null;
  InterestedIn: null;
  Interests: null;
  Religion: null;
  Political: null;
  Sports: null;
  InspirationalPeople: null;
  HttpsImageUrl: string;
  FollowersCount: number;
  FriendsCount: number;
  IsGeoEnabled: null;
  TotalStatusesCount: number;
  Associations: null;
  NumRecommenders: number;
  Honors: null;
  Awards: null;
  Skills: null;
  CurrentStatus: null;
  Certifications: null;
  Courses: null;
  Volunteer: null;
  RecommendationsReceived: null;
  Languages: null;
  Projects: null;
  Games: null;
  Family: null;
  TeleVisionShow: null;
  MutualFriends: null;
  Movies: null;
  Books: null;
  AgeRange: null;
  PublicRepository: null;
  Hireable: boolean;
  RepositoryUrl: null;
  Age: null;
  Patents: null;
  FavoriteThings: null;
  ProfessionalHeadline: null;
  ProviderAccessCredential: ProviderAccessCredential;
  RelatedProfileViews: null;
  KloutScore: null;
  LRUserID: null;
  PlacesLived: null;
  Publications: null;
  JobBookmarks: null;
  Suggestions: null;
  Badges: null;
  MemberUrlResources: null;
  TotalPrivateRepository: number;
  Currency: null;
  StarredUrl: null;
  GistsUrl: null;
  PublicGists: number;
  PrivateGists: number;
  Subscription: null;
  Company: null;
  GravatarImageUrl: string;
  ProfileImageUrls: IProfileProfileImageUrls;
  WebProfiles: null;
  PinsCount: number;
  BoardsCount: number;
  LikesCount: number;
  SignupDate: string;
  LastLoginDate: string;
  PreviousUids: null;
}

export interface CustomFields {}

export interface Email {
  Type: string;
  Value: string;
}

export interface Identity {
  ID: string;
  Provider: string;
  Prefix: null;
  FirstName: string;
  MiddleName: null;
  LastName: string;
  Suffix: null;
  FullName: string;
  NickName: null;
  ProfileName: null;
  BirthDate: null;
  Gender: string;
  Website: null;
  Email: Email[];
  Country: null;
  ThumbnailImageUrl: string;
  ImageUrl: string;
  Favicon: null;
  ProfileUrl: string;
  HomeTown: null;
  State: null;
  City: string;
  Industry: null;
  About: null;
  TimeZone: null;
  LocalLanguage: string;
  CoverPhoto: null;
  TagLine: null;
  Language: string;
  Verified: string;
  UpdatedTime: null;
  Positions: null;
  Educations: null;
  PhoneNumbers: null;
  IMAccounts: null;
  Addresses: null;
  MainAddress: null;
  Created: null;
  CreatedDate: Date;
  ModifiedDate: Date;
  ProfileModifiedDate: Date;
  LocalCity: string;
  ProfileCity: string;
  LocalCountry: string;
  ProfileCountry: null;
  FirstLogin: boolean;
  IsProtected: boolean;
  RelationshipStatus: null;
  Quota: null;
  Quote: null;
  InterestedIn: null;
  Interests: null;
  Religion: null;
  Political: null;
  Sports: null;
  InspirationalPeople: null;
  HttpsImageUrl: string;
  FollowersCount: number;
  FriendsCount: number;
  IsGeoEnabled: null;
  TotalStatusesCount: number;
  Associations: null;
  NumRecommenders: number;
  Honors: null;
  Awards: null;
  Skills: null;
  CurrentStatus: null;
  Certifications: null;
  Courses: null;
  Volunteer: null;
  RecommendationsReceived: null;
  Languages: null;
  Projects: null;
  Games: null;
  Family: null;
  TeleVisionShow: null;
  MutualFriends: null;
  Movies: null;
  Books: null;
  AgeRange: null;
  PublicRepository: null;
  Hireable: boolean;
  RepositoryUrl: null;
  Age: null;
  Patents: null;
  FavoriteThings: null;
  ProfessionalHeadline: null;
  ProviderAccessCredential: ProviderAccessCredential;
  RelatedProfileViews: null;
  KloutScore: null;
  LRUserID: null;
  PlacesLived: null;
  Publications: null;
  JobBookmarks: null;
  Suggestions: null;
  Badges: null;
  MemberUrlResources: null;
  TotalPrivateRepository: number;
  Currency: null;
  StarredUrl: null;
  GistsUrl: null;
  PublicGists: number;
  PrivateGists: number;
  Subscription: null;
  Company: null;
  GravatarImageUrl: string;
  ProfileImageUrls: IdentityProfileImageUrls;
  WebProfiles: null;
  PinsCount: number;
  BoardsCount: number;
  LikesCount: number;
  SignupDate: Date;
  LastLoginDate: Date;
  PreviousUids: null;
}

export interface IdentityProfileImageUrls {
  Profile: string;
}

export interface ProviderAccessCredential {
  AccessToken: string;
  TokenSecret: null;
}

export interface IProfileProfileImageUrls {
  "Image Url": string;
  "ThumbnailImage Url": string;
}

export interface IGetProfile extends IProfile, ILRError {}

export interface IGetProfileArgs {
  token: string;
  skip_fetch?: boolean;
}
export const getProfileAction = createAction<IProfile, IGetProfileArgs>(
  userConst.FETCH_PROFILE
);
