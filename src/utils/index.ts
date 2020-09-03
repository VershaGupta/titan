export const capitalizeFirst = (str: string) => {
  return str[0].toUpperCase() + str.substr(1);
};

export const removeUnderscore = (str: string) => {
  return capitalizeFirst(str).replace(/_/g, " ");
};

export const getInstallationCode = (uid: string) => {
  const file =
    (window.location.origin.includes("//social9")
      ? "socialshare"
      : "socialshare-dev") + ".min.js";
  return `<script id="s9-sdk" async defer content="${uid}" src="//cdn.social9.com/js/${file}"></script>`;
};

export const getFileName = () =>
  (window.location.origin.includes("//social9")
    ? "socialshare"
    : "socialshare-dev") + ".min.js";
