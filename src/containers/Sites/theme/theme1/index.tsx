import React from "react";
import { Link } from "react-router-dom";
import "./assets/css/style.scss";
import cloneDeep from "lodash/cloneDeep";
import { Button } from "semantic-ui-react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { connect } from "react-redux";

export interface TemplatesProps {}
export interface FieldSchema {
  type: string;
  order: number;
  value?: string;
  isClicked: boolean;
  inner?: FieldSchema[];
  name: string;
  tag?: string;
}

let isCalledThemeEditor = "";
export interface TemplatesState {
  templatePage: any;
  isOpen: boolean;
  currentTheme: any;
  currentContainer: string;
}
const SortableItem = SortableElement((item: any) => {
  const { value } = item;
  return <div className="social-li">{value}</div>;
});
const SortableContainers = SortableContainer((item: any) => {
  const { children, name, onClick } = item;
  return (
    <div className="social-ul" onClick={onClick}>
      {children}
    </div>
  );
});

class Templates extends React.Component<TemplatesProps, TemplatesState> {
  defaultState: TemplatesState;

  constructor(props: TemplatesProps) {
    super(props);

    this.defaultState = {
      templatePage: this._getDefaultTheme1(),
      isOpen: false,
      currentContainer: "",
      currentTheme: {
        type: "background",
        order: -1,
        value: "",
        isClicked: false,
        name: "background",
      },
    };

    this.state = cloneDeep(this.defaultState);
  }
  // componentDidUpdate(pProps: TemplatesProps) {
  //   if (pProps.appData.isLoading && !this.props.appData.isLoading) {
  //     const appData = this.props.appData;

  //     if (appData.isSuccess) {
  //       const file = this._getTemplateFile();
  //       // const encodedString = new Buffer(file).toString("base64");
  //       this.props.createTemplateAction(appData.appID, btoa(file));
  //     } else {
  //       Toastify("error", "Unable to create app");
  //     }
  //   }
  //   if (pProps.templateData.isLoading && !this.props.templateData.isLoading) {
  //     const templateData = this.props.templateData;

  //     if (templateData.isSuccess) {
  //       console.log(templateData);
  //     } else {
  //       Toastify("error", "Unable to create template");
  //     }
  //   }
  // }
  _getDefaultTheme1 = () => {
    return {
      components: [
        {
          id: "background",
          appearance: {
            style: "color",
            color: { color: "#C7E3F2" },
          },
          type: "background",
        },
        {
          id: "main",
          // appearance: {
          //   contents: { align: "left", spacing: 0.0 },
          //   padding: { vertical: 3.0, horizontal: 3.0 },
          //   margin: 4.0,
          //   size: 18,
          //   position: "center",
          //   cornerRadius: 0.5,
          //   style: "box",
          //   width: 35,
          //   overlap: true,
          //   background: {
          //     style: "color",
          //     color: { color: "#CC1B1B" }
          //   },
          //   border: { color: "", width: 1, style: 1 }
          // },
          type: "main",
        },
        {
          id: "text06",
          style: "style3",
          text: { content: "Build the future", role: "h1" },
          appearance: {
            size: 4.5,
            spacing: 1.125,
            weight: 700,
          },
          type: "text",
        },
        {
          id: "text02",
          style: "style4",
          text: {
            content:
              "Aenean ornare velit lacus varius enim ullamcorper proin aliquam facilisis ante sed etiam magna interdum amet congue. Lorem ipsum dolor sit amet nullam et magna veroeros consequat.",
            role: "p",
          },
          appearance: {},
          type: "text",
        },
        {
          id: "container02",
          container: {
            mode: "default",
            groups: [
              {
                align: "right",
                componentIds: ["image01"],
                width: 38,
                spacer: false,
              },
              {
                align: "left",
                componentIds: ["text06", "text02"],
                width: 100,
                spacer: false,
              },
            ],
            appearance: { background: { image: { assetId: "" } } },
          },

          appearance: {
            align: "center",
            background: {
              style: "color",
              color: "#CF1D1D",
            },
            color: "#fff",
            position: "relative",
            display: "flex",
            height: 762,
          },
          settings: {
            element: { id: "", classes: "", attributes: "" },
            styles: { container: "", mobile: { container: "" } },
          },
          type: "container",
        },
        {
          id: "text04",
          style: "style3",
          text: { content: "Magna sed consequat", role: "h2" },
          appearance: {
            color: "#eb4f1e",
          },
          type: "text",
        },
        {
          id: "text05",
          style: "style4",
          text: {
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec lacinia ligula. Morbi nec rutrum neque, nec sagittis dui. Integer pulvinar nunc ut maximus dui lorem ipsum magna consequat.",
            role: "p",
          },
          appearance: {
            color: "#666666",
            kerning: -0.1,
            margins: { top: 1.5, bottom: 1.5 },
            size: 1.25,
            spacing: 1.625,
            weight: 300,
          },
          type: "text",
        },
        // {
        //   id: "container03",
        //   container: {
        //     mode: "default",
        //     groups: [
        //       {
        //         align: "left",
        //         componentIds: ["text04", "text05"],
        //         width: 100,
        //         spacer: false
        //       }
        //     ]
        //   },

        //   appearance: {
        //   },
        //   type: "container"
        // },

        // container 04
        {
          id: "text07",
          style: "style3",
          text: { content: "Sed amet faucibus", role: "h3" },
          appearance: {
            color: "#eb4f1e",
          },
          type: "text",
        },
        {
          id: "text08",
          style: "style4",
          text: {
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec lacinia ligula. Morbi nec rutrum neque, nec sagittis dui. Integer pulvinar nunc ut maximus dui lorem ipsum magna consequat.",
            role: "p",
          },
          appearance: {
            color: "#666666",
            margins: { top: 1.5, bottom: 1.5 },
            size: 1.25,
            spacing: 1.625,
            weight: 300,
          },
          type: "text",
        },
        {
          id: "text09",
          style: "style3",
          text: { content: "Sed amet faucibus", role: "h3" },
          appearance: {
            color: "#eb4f1e",
          },
          type: "text",
        },
        {
          id: "text10",
          style: "style4",
          text: {
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec lacinia ligula. Morbi nec rutrum neque, nec sagittis dui. Integer pulvinar nunc ut maximus dui lorem ipsum magna consequat.",
            role: "p",
          },
          appearance: {
            color: "#666666",
            margins: { top: 1.5, bottom: 1.5 },
            size: 1.25,
            spacing: 1.625,
            weight: 300,
          },
          type: "text",
        },
        {
          id: "container04",
          container: {
            mode: "columns",
            groups: [
              {
                align: "left",
                componentIds: ["text07", "text08"],
                width: 50,
                spacer: false,
              },
              {
                align: "right",
                componentIds: ["text09", "text10"],
                width: 50,
                spacer: false,
              },
            ],
          },

          appearance: {},
          type: "container",
        },
      ],
    };
  };
  onSortEnd = (Index: any) => {
    const { oldIndex, newIndex } = Index;
    let { templatePage } = this.state;
    let activeListLength = [...templatePage.entries()].filter(
      val => val[1].isClicked
    ).length;
    let newOrder: Map<string, FieldSchema> = new Map(
      this.shiftPosition(
        [...templatePage.entries()],
        oldIndex,
        Math.min(activeListLength - 1, newIndex)
      )
    );
    this.setState({
      //  isLoadingState: false,
      templatePage: newOrder,
    });
  };
  shiftPosition = (array: any, from: number, to: number) => {
    array = array.slice();
    array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
    return array;
  };
  _getUniqueid = (type: string, index: number) => {
    const id = type + "0" + index;
    if (!this.searchId(id)) {
      return id;
    } else {
      this._getUniqueid(type, index + 1);
    }
  };

  _addFieldtoTemplatePage = (type: string) => {
    const { templatePage, currentContainer } = this.state;
    const fieldExists = this._searchFieldbyType(type);
    const field = {
      type: type,
      id: this._getUniqueid(type, fieldExists.length + 1),
      [type]: type === "text" ? { role: "auto", content: "text" } : {},
      style: "",
      settings: {},
      appearence: {},
    };
    templatePage.components.push(field);
    if (currentContainer) {
      this.updateContainerComponentsIds(currentContainer, field.id);
    }
    this.setState({ templatePage: templatePage });
  };

  searchId = (idToSearch: string) => {
    const { templatePage } = this.state;
    return templatePage.components.find(
      (element: any) => element.id == idToSearch
    );
  };
  _searchFieldbyType = (type: string) => {
    const { templatePage } = this.state;
    return templatePage.components.filter((item: any) => {
      return item.type === type;
    });
  };
  updateContainerComponentsIds = (current: string, id: string | undefined) => {
    const { templatePage } = this.state;
    templatePage.components.find((element: any) => {
      if (element.type === "container") {
        element.container.groups.find((group: any) => {
          if (group.componentIds.includes(current)) {
            group.componentIds.push(id);
          }
        });
      }
    });
  };
  _existInAnyContainer = (current: any) => {
    const { templatePage } = this.state;
    return templatePage.components.find((element: any) => {
      if (element.type === "container") {
        return element.container.groups.find((group: any) =>
          group.componentIds.includes(current)
        );
      }
    });
  };
  _renderElemnts = (item: any) => {
    if (item.type === "text") {
      const CustomTag = item.text.role === "auto" ? `div` : item.text.role;
      return (
        <CustomTag
          key={item.id}
          id={item.id}
          onClick={() => {
            console.log("_renderElemnts");
            isCalledThemeEditor = "elements";
            this.setState({
              currentContainer: item.id,
              isOpen: true,
              currentTheme: item,
            });
          }}
        >
          {item.text.content}
        </CustomTag>
      );
    }
  };
  _publishElemnts = (item: any) => {
    if (item.type === "text") {
      let file = "";
      const CustomTag = item.text.role === "auto" ? `div` : item.text.role;
      file += `<${CustomTag}
          id=${item.id}
        >
          ${item.text.content}
        </${CustomTag}>`;
      file += "";
      return file;
    }
  };
  _publishCss = () => {
    const { templatePage } = this.state;
    let css =
      '<style> html {line-height: 1.15;-webkit-text-size-adjust: 100%;}body {margin: 0;}main {display: block;}h1 {font-size: 2em;margin: 0.67em 0;}hr {box-sizing: content-box;height: 0;overflow: visible;}pre {font-family: monospace, monospace;font-size: 1em;}a {background-color: transparent;}abbr[title] {border-bottom: none;text-decoration: underline;text-decoration: underline dotted;}b, strong {font-weight: bolder;}code, kbd, samp {font-family: monospace, monospace;font-size: 1em;}small {font-size: 80%;}sub, sup {font-size: 75%;line-height: 0;position: relative;vertical-align: baseline;}sub {bottom: -0.25em;}sup {top: -0.5em;}img {border-style: none;}button, input, optgroup, select, textarea {font-family: inherit;font-size: 100%;line-height: 1.15;margin: 0;}button, input {overflow: visible;}button, select {text-transform: none;}button, [type="button"], [type="reset"], [type="submit"] {-webkit-appearance: button;}button::-moz-focus-inner, [type="button"]::-moz-focus-inner, [type="reset"]::-moz-focus-inner, [type="submit"]::-moz-focus-inner {border-style: none;padding: 0;}button:-moz-focusring, [type="button"]:-moz-focusring, [type="reset"]:-moz-focusring, [type="submit"]:-moz-focusring {outline: 1px dotted ButtonText;}fieldset {padding: 0.35em 0.75em 0.625em;}legend {box-sizing: border-box;color: inherit;display: table;max-width: 100%;padding: 0;white-space: normal;}progress {vertical-align: baseline;}textarea {overflow: auto;}[type="checkbox"], [type="radio"] {box-sizing: border-box;padding: 0;}[type="number"]::-webkit-inner-spin-button, [type="number"]::-webkit-outer-spin-button {height: auto;}[type="search"] {-webkit-appearance: textfield;outline-offset: -2px;}[type="search"]::-webkit-search-decoration {-webkit-appearance: none;}::-webkit-file-upload-button {-webkit-appearance: button;font: inherit;}details {display: block;}summary {display: list-item;}template {display: none;}[hidden] {display: none;}';
    css += this._getCss(templatePage);
    css += "</style>";
    return css;
  };
  _publishComponent = (component: any) => {
    let file = "";
    if (component.type === "container") {
      file += `<div
          class=${"container"}
          id=${component.id}
        ><div class='inner'>`;
      {
        component.container.groups &&
          component.container.groups.map((ele: any) => {
            file += ``;
            {
              ele.componentIds.map((ids: string) => {
                file += this._publishElemnts(this.searchId(ids));
              });
            }
            file += ``;
          });
      }

      file += `</div></div>`;
    } else if (!this._existInAnyContainer(component.id)) {
      file += this._publishElemnts(component);
    }
    return file;
  };
  _renderComponent = (component: any) => {
    if (component.type === "container") {
      return (
        <div
          key={component.id}
          className={`container ${
            component.container.mode === "columns"
              ? "columns"
              : " default fullscreen"
          }`}
          id={component.id}
          data-id={component.id}
          onClick={() => {
            if (isCalledThemeEditor !== "elements") {
              this.setState({ isOpen: true, currentTheme: component });
            }
            isCalledThemeEditor = "containers";
          }}
        >
          <div className="inner">
            {component.container.groups &&
              component.container.groups.map((ele: any, index: number) => {
                return (
                  <div key={`group-${index}`} className={"align-" + ele.align}>
                    {ele.componentIds.map((ids: string) => {
                      const item = this.searchId(ids);
                      if (item) {
                        return this._renderElemnts(item);
                      }
                    })}
                  </div>
                );
              })}
          </div>
        </div>
      );
    } else if (!this._existInAnyContainer(component.id)) {
      return this._renderElemnts(component);
    } else {
      return null;
    }
  };
  _getCss = (templatePage: any) => {
    let css = "";
    templatePage.components.map((component: any) => {
      const id =
        "#" + component.type === "background"
          ? "__body"
          : component.type === "main"
          ? "main"
          : component.id;

      if (component.appearance) {
        css += "#" + id + "{";
        if (id === "main") {
          css += "display: flex;max-width:100%;";
        }
        if (typeof component.appearance.color === "string") {
          css += "color:" + component.appearance.color + ";";
        }
        if (typeof component.appearance.cornerRadius === "string") {
          css += "border-radius:" + component.appearance.cornerRadius + ";";
        }
        if (
          component.appearance.contents &&
          component.appearance.contents.align
        ) {
          css += "text-align:" + component.appearance.contents.align + ";";
        }
        if (component.appearance.background) {
          css +=
            "background-color:" + component.appearance.background.color + ";";
        }
        if (component.appearance.width) {
          css += "width:" + component.appearance.width + "rem;";
        }
        if (component.appearance.height) {
          css += "height:" + component.appearance.height + "px;";
        }
        if (component.appearance.display) {
          css += "display:" + component.appearance.display + ";";
        }
        if (component.appearance.position) {
          css += "position:" + component.appearance.position + ";";
        }
        if (component.appearance.align) {
          //  css += "justify-content:" + component.appearance.position + ";";
          css += "align-items:" + component.appearance.align + ";";
        }
        if (component.appearance.weight) {
          css += "font-weight:" + component.appearance.weight + ";";
        }
        // if (component.appearance.align) {
        //   css += "text-align:" + component.appearance.align + ";";
        // }
        // if (component.appearance.spacing) {
        //   css += "letter-spacing:" + component.appearance.spacing + "rem;";
        // }
        if (component.appearance.size) {
          css += "font-size:" + component.appearance.size + "rem;";
        }
        if (component.appearance.spacing) {
          css += "line-height:" + component.appearance.spacing + ";";
        }
        if (component.appearance.font) {
          css += "font-family:" + component.appearance.font + ", sans-serif;";
        }
        css += "}";
      }
      // console.log(component)
      if (
        component.type === "container" &&
        component.container.mode === "columns"
      ) {
        //  console.log("hrtfgv")
        css += "#" + id + " > *:first-child{";
        css += "    margin-left: -3rem;";
        css += "}";
        component.container.groups.map((grpEle: any, gindex: number) => {
          css += "#" + id + " > :nth-child(" + (gindex + 1) + "){";
          if (grpEle.width) {
            css += "width:" + "calc(" + grpEle.width + "% + 1rem);";
          }
          if (grpEle.align) {
            css += "text-align:" + grpEle.align;
          }
          css += "}";
        });
      }
    });
    return css;
  };
  _renderCss = () => {
    const { templatePage } = this.state;
    console.log(this._getCss(templatePage));
    return <style>{this._getCss(templatePage)}</style>;
  };
  _getTemplateFile = () => {
    const { templatePage } = this.state;
    let file = "";
    file += this._publishCss();
    {
      file += '<div id="wrapper"><div id="main"> <div class="inner">';
      templatePage.components.map((component: any) => {
        file += this._publishComponent(component);
      });
      file += "</div></div></div>";
    }
    return file;
  };
  _publishTemplate = () => {
    const { templatePage } = this.state;
    let file = "";
    file += this._publishCss();
    {
      file += '<div id="wrapper"><div id="main"> <div class="inner">';
      templatePage.components.map((component: any) => {
        file += this._publishComponent(component);
      });
      file += "</div></div></div>";
    }
    console.log(file);

    //  this.props.createAppAction(this.props.profileData.Uid);
    // return httpPost("/template", {}, { templatePage });
  };

  _getElemntsIndex = (id: string) => {
    const { templatePage } = this.state;
    let index = templatePage.components.findIndex(
      (element: any) => element.id === id
    );
    return index;
  };

  render() {
    //const { i18n } = this.props;
    const { templatePage, currentTheme, isOpen } = this.state;
    const bgItem = this._searchFieldbyType("background");

    return (
      <React.Fragment>
        {this._renderCss()}
        <div onClick={() => {}}>
          <div
            className="bg__"
            onClick={() => {
              this.setState({
                isOpen: true,
                currentTheme: bgItem[0],
                currentContainer: "",
              });
            }}
          >
            Background
          </div>
          <div className={bgItem[0] ? "__body" : ""} onClick={() => {}}>
            <div id="__wrapper">
              <div id="main">
                {templatePage.components.map(
                  (component: any, index: number) => {
                    return this._renderComponent(component);
                  }
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="theme-actions pl-3">
          <React.Fragment>
            <Button
              className="ui primary button w-100 mt-2"
              // disabled={activeThemeId === "0"}
              value="Text"
              onClick={() => {
                this._addFieldtoTemplatePage("text");
              }}
            />
            <Button
              className="ui primary button w-100 mt-2"
              // disabled={activeThemeId === "0"}
              value="Button"
              onClick={() => {
                this._addFieldtoTemplatePage("button");
              }}
            />
            <Button
              className="ui primary button w-100 mt-2"
              // disabled={activeThemeId === "0"}
              value="Image"
              onClick={() => {
                this._addFieldtoTemplatePage("image");
              }}
            />
            <Button
              className="ui primary button w-100 mt-2"
              // disabled={activeThemeId === "0"}
              value="Divider"
              onClick={() => {
                this._addFieldtoTemplatePage("divider");
              }}
            />
            <Button
              className="ui primary button w-100 mt-2"
              // disabled={activeThemeId === "0"}
              value="Publish"
              onClick={() => {
                this._publishTemplate();
              }}
            />
          </React.Fragment>
        </div>
      </React.Fragment>
    );
  }
}

// const mapStateToProps = (state: RootSchema) => {
//   return {
//     i18n: state.appState.i18n.languages,
//     appData: state.auth.app,
//     profileData: state.auth.profile,
//     templateData: state.auth.template
//   };
// };
// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     createAppAction: customerId => dispatch(createAppAction(customerId)),
//     createTemplateAction: (appId, template) =>
//       dispatch(createTemplateAction(appId, template))
//   };
// };

export default Templates;
