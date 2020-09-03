export interface IScripts {
  id: string;
  src: string;
  async?: boolean;
}
export const addJS = (args: IScripts[]) => {
  const promises = args.map(({ id, src, async = false }) => {
    if (document.getElementById(id)) {
      return Promise.resolve();
    }
    const ele = document.createElement("script");
    ele.id = id;
    ele.src = src;
    ele.async = ele.defer = async;
    document.body.appendChild(ele);
    return new Promise(resolve => (ele.onload = resolve));
  });

  return Promise.all(promises);
};

export const addCSS = (id: string, href: string) => {
  if (document.getElementById(id)) {
    return Promise.resolve();
  }

  const ele = document.createElement("link");
  ele.rel = "stylesheet";
  ele.href = href;
  ele.id = id;
  document.head.appendChild(ele);
  return new Promise(resolve => (ele.onload = resolve));
};

export const sanitizeIDOrClass = (value: string) => {
  return (value
    ? ["#", "."].includes(value[0])
      ? value
      : "#" + value
    : ""
  ).replace(/ /g, "");
};
