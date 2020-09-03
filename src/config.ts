function getConfig() {
  return {
    idp_apikey:
      process.env.REACT_APP_IDP_KEY || "2d64e216-81a6-44c1-85c5-e063f81d25f6",
    idp_endpoint:
      process.env.REACT_APP_IDP_ENDPOINT || "https://devapi.lrinternal.com",
    idp_hub_endpoint:
      process.env.REACT_APP_HUB_ENDPOINT ||
      "https://dev-titan.devhub.lrinternal.com/requesthandlor.aspx",
    idp_sott:
      process.env.REACT_APP_IDP_SOTT ||
      "ab5KLQroi7teVzrxMZolXsGEVGSsHHEsX/g3Gqj3imyXnnm4VFNOpPdOT/aJ3Vc3aDxNe6rRm7PWxvfFCQODXwLujNPli2wR97Ynx/zoSSQ=*04eaab1c5dafcb38637e51abdcd15fd4",
    api_endpoint: !window.location.origin.includes("localhost")
      ? "http://139.59.85.131:3001"
      : process.env.REACT_APP_API_ENDPOINT || "http://139.59.85.131:3001",
    gtm_id: process.env.REACT_APP_GTM_ID || "GTM-K6H6BHX",
    apmlitude_key:
      process.env.REACT_APP_AMPLITUDE_KEY || "dcf9ba8de97876a3a3897bd17b7987e3",
    github_clientid: process.env.GITHUB_CLIENTID || "Iv1.661d6b889e2f7575",
  };
}

export default getConfig();
