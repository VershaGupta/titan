import config from "../config";

const lrconfig = {
  apiKey: config.idp_apikey,
  sott: config.idp_sott,
  enableHeaderSott: true,
  verificationUrl: window.location.origin + "/verification",
  resetPasswordUrl: window.location.origin + "/resetpassword",
};
let loginradius: any = {};
if (window.LoginRadiusV2) {
  loginradius = new window.LoginRadiusV2(lrconfig);
  loginradius.api.init(lrconfig);
}

export default loginradius;
