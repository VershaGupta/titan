import React from "react";
import {
  Link,
  RouteComponentProps,
  withRouter,
  useLocation,
  useHistory,
} from "react-router-dom";
import { Dropdown, Button, Modal } from "semantic-ui-react";
import logoDesktop from "../../assets/images/desktop.svg";
import logoWhite from "../../assets/images/logo-dark.svg";
import logoMobile from "../../assets/images/mobile.svg";
import iconsList from "../../assets/images/icons/icons.svg";
import {
  ISites,
  addSiteAction,
  updateSiteAction,
} from "../../redux/actions/sites";
import { capitalizeFirst } from "../../utils";
import "./configure_site.scss";
import "./theme2.scss";
import Theme1 from "./theme/theme1/index";
import ThemeEditor from "./theme_editor";
import { cloneDeep } from "lodash";
//import { SortableContainer, sortableElement, DragLayer } from "react-sortable-hoc";
import {
  sortableContainer,
  sortableElement,
  arrayMove,
  DragLayer,
} from "./react-sortable-multiple-hoc";
import InfoModal from "../../components/InfoModal";
import { RootSchema } from "../../redux/reducers";
import { connect } from "react-redux";
import { IProfile } from "../../redux/actions/user";
import { IApp, addAppAction } from "../../redux/actions/app";
import { toast } from "react-toastify";
const dragLayer = new DragLayer();

export interface ConfigureSiteProps extends RouteComponentProps {
  profileData: IProfile;
  createAppAction: (customerId) => void;
  appData: IApp;
  createTemplateAction: (appId, Template) => void;
  addedSite: ISites;
  updateTemplateAction: (appId, Template) => void;
  updatedSite: ISites;
}
export interface ConfigureSiteState {
  templatePage: any;
  isOpen: boolean;
  currentTheme: any;
  currentContainer: string;
  action: "add" | "edit";
  currentAppId?: string;
}

export interface FieldSchema {
  type: string;
  order: number;
  value?: string;
  isClicked: boolean;
  inner?: FieldSchema[];
  name: string;
  tag?: string;
}

const getComponentElement = (components, idToSearch) => {
  return components.find(element => element.id == idToSearch);
};
const elementInComponent = (components, current) => {
  return components.find(element => {
    if (element.type === "container") {
      return element.container.groups.find(group =>
        group.componentIds.includes(current)
      );
    }
  });
};

const SortableItem = sortableElement(
  ({ value, item, OnSortClicked, parentItem, mode, currentTheme }) => {
    let role = `div`;
    if (item.type === "text") {
      role = item.text.role === "auto" ? `div` : item.text.role;
    }

    const CustomTag: any = role;
    return (
      <CustomTag
        key={item.id}
        // className={"tt-" + item.type + ""}
        className={
          "tt-" +
          (mode !== "icons" ? item.type : "icons-li") +
          (mode !== "icons"
            ? currentTheme.id === item.id
              ? " active"
              : ""
            : "")
        }
        id={item.id}
        onClick={() => {
          isCalledThemeEditor = "elements";
          const _item = mode === "icons" ? parentItem : item;
          OnSortClicked(_item);
        }}
      >
        {value}{" "}
      </CustomTag>
    );
  }
);

const SortableListItems = sortableContainer(
  ({
    items,
    list,
    mode,
    OnSortClicked,
    currentTheme,
    listindex,
    parentItem,
  }) => (
    <React.Fragment>
      {items.map((value, index) => {
        let item = value;
        if (mode !== "icons") {
          item = getComponentElement(list, value);
        }
        if (item) {
          return (
            <SortableItem
              key={`item-${item.id}`}
              index={index}
              OnSortClicked={OnSortClicked}
              item={item}
              mode={mode}
              parentItem={parentItem}
              currentTheme={currentTheme}
              //collection={listindex}
              value={
                <React.Fragment>
                  {mode === "icons" && (
                    <span className={`tt-${mode}-li-a`}>
                      <svg>
                        <use href={iconsList + "#icon-" + item.type}></use>
                      </svg>
                      <span className={`tt-${mode}-li-a-label`}>
                        {item.type}
                      </span>
                    </span>
                  )}
                  {item.type === "text" && item.text.content}
                </React.Fragment>
              }
            />
          );
        } else {
          return null;
        }
      })}
      {!items.length && mode === "columns" && (
        <SortableItem
          key={`item-empty`}
          index={"y5er"}
          value={<div className="placeholder" />}
        />
      )}
    </React.Fragment>
  )
);

/**  This is the Chapter Part/Section Title, it drags as a group of items  */
const SortablePart = sortableElement(props => {
  const component = props.item;

  if (component.type === "container") {
    return (
      <div
        key={component.id}
        className={`container ${
          component.container.mode === "columns"
            ? "columns"
            : " default fullscreen"
        } ${props.currentTheme.id === component.id ? "active" : ""}`}
        id={component.id}
        data-id={component.id}
      >
        <div className="wrapper">
          <div className="inner">
            {component.container.mode == "default" &&
              component.container.groups &&
              component.container.groups.map((ele, index) => {
                return (
                  <SortableListItems
                    key={index}
                    {...props}
                    items={ele.componentIds}
                    dragLayer={dragLayer}
                    listindex={index}
                    collection={index}
                    mode={component.container.mode}
                    distance={2}
                    helperClass={"selected"}
                    isMultiple={true}
                    helperCollision={{ top: 0, bottom: 0 }}
                  />
                );
              })}
            {component.container.mode == "columns" &&
              component.container.groups.length &&
              component.container.groups.map((ele, index) => {
                return (
                  <div
                    key={`group-${index}`}
                    data-id={"group" + index}
                    className={
                      component.container.mode === "columns"
                        ? "align-" +
                          ele.align +
                          (ele.componentIds.length ? "" : " ")
                        : ""
                    }
                  >
                    {
                      <SortableListItems
                        {...props}
                        items={ele.componentIds}
                        dragLayer={dragLayer}
                        listindex={index}
                        collection={index}
                        mode={component.container.mode}
                        distance={2}
                        helperClass={"selected"}
                        isMultiple={true}
                        helperCollision={{ top: 0, bottom: 0 }}
                      />
                    }
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  } else if (component.type === "icons") {
    return (
      <div className={`tt-${component.type}`} id={component.id}>
        <SortableListItems
          {...props}
          items={component.icons.icons}
          dragLayer={dragLayer}
          parentItem={component}
          // listindex={index}
          // collection={index}
          mode={"icons"}
          distance={2}
          helperClass={"selected"}
          isMultiple={true}
          helperCollision={{ top: 0, bottom: 0 }}
        />
      </div>
    );
  } else if (
    !elementInComponent(props.list, component.id) &&
    component.type != "main" &&
    component.type != "background"
  ) {
    const item = component;
    return (
      <SortableItem
        key={`item-${item.id}`}
        item={item}
        OnSortClicked={props.OnSortClicked}
        index={props.id}
        distance={4}
        currentTheme={props.currentTheme}
        // tag={CustomTag}
        value={
          <React.Fragment>
            {item.type === "text" ? item.text.content : ""}
            {item.type === "image" ? (
              <img
                alt="Image"
                src={
                  item.image.stuffId
                    ? item.image.stuffId
                    : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
                }
              />
            ) : (
              ""
            )}
          </React.Fragment>
        }
      />
    );
  } else {
    return null;
  }
});

/** Main Container on page */
const SortableListParts = sortableContainer(
  ({ items, onSortItemsEnd, OnSortClicked, currentTheme, templatePage }) => (
    <React.Fragment>
      {items.map((value, index) => {
        if (
          value.type === "container" ||
          (!elementInComponent(items, value.id) &&
            value.type != "main" &&
            value.type != "background")
        )
          return (
            <div
              onClick={() => {
                if (isCalledThemeEditor !== "elements") {
                  OnSortClicked(value);
                }
                isCalledThemeEditor = "container";
              }}
            >
              <SortablePart
                key={index}
                index={index}
                list={items}
                templatePage={templatePage}
                item={value}
                id={index}
                currentTheme={currentTheme}
                onMultipleSortEnd={onSortItemsEnd}
                OnSortClicked={OnSortClicked}
              />
            </div>
          );
      })}
    </React.Fragment>
  )
);

let isCalledThemeEditor = "";
class ConfigureSite extends React.Component<
  ConfigureSiteProps,
  ConfigureSiteState
> {
  defaultState: ConfigureSiteState;
  constructor(props: ConfigureSiteProps) {
    super(props);

    this.defaultState = {
      templatePage: this._getDefaultTheme1(),
      isOpen: false,
      currentContainer: "",
      action: "add",
      currentTheme: {
        type: "background",
        order: -1,
        value: "",
        isClicked: false,
        name: "background",
      },
    };

    const { location, history } = props;
    const params = new URLSearchParams(location.search);
    if (params.get("action") === "edit") {
      this.defaultState["action"] = "edit";
    }
    if (params.get("t") === "template2") {
      this.defaultState["templatePage"] = this._getDefaultTheme2();
    }
    const _site: ISites =
      history.action === "PUSH"
        ? (location.state || ({} as any)).site
        : undefined;
    if (_site && this.defaultState["action"] === "edit") {
      this.defaultState["templatePage"] = _site.CodeTemplate;
      this.defaultState["currentAppId"] = _site.appID;
    }

    this.state = cloneDeep(this.defaultState);
  }
  componentDidUpdate(pProps: ConfigureSiteProps) {
    if (
      pProps.appData.state === "loading" &&
      this.props.appData.state !== "loading"
    ) {
      const appData = this.props.appData;

      if (appData.state === "success") {
        this.props.createTemplateAction(appData.appID, this.state.templatePage);
      } else {
        toast.error("Unable to create app");
      }
    }
    if (
      pProps.addedSite.state === "loading" &&
      this.props.addedSite.state !== "loading"
    ) {
      const addedSite = this.props.addedSite;

      if (addedSite.state === "success") {
        toast.success("Template Created SuccessFully.");

        this.props.history.push("/sites");
      } else {
        toast.error("Unable to create template");
      }
    }
    if (
      pProps.updatedSite.state === "loading" &&
      this.props.updatedSite.state !== "loading"
    ) {
      const updatedSite = this.props.updatedSite;

      if (updatedSite.state === "success") {
        toast.success("Template Updated SuccessFully.");

        this.props.history.push("/sites");
      } else {
        toast.error("Unable to create template");
      }
    }
  }
  /*
Template part start
*/
  _getDefaultTheme2 = () => {
    return {
      components: [
        {
          id: "background",
          appearance: {
            style: "gradient",
            color: "#4C4C7D",
          },
          type: "background",
        },
        {
          id: "main",
          appearance: {
            contents: {
              align: "center",
              spacing: 0.625,
            },
            padding: {
              vertical: 3.0,
              horizontal: 2.375,
            },
            margin: -0.125,
            size: 18,
            position: "center",
            cornerRadius: 0.5,
            style: "box",
            width: 29,
            overlap: true,
            constrain: false,
            background: {
              style: "gradient",
              color: "#2B2440",
              gradient: {
                angle: 30,
                stop1: {
                  color: "#FFFFFF85",
                  position: 15,
                },
                stop2: {
                  color: "#FFFFFF",
                  position: 59,
                },
              },
              pattern: {
                style: "none",
                color: "#00000080",
                size: 50,
                thickness: 2,
              },
            },
            border: {
              color: "",
              width: 1,
              style: 1,
            },
          },

          type: "main",
        },
        {
          id: "text02",
          text: {
            content: "Jane Smith",
            role: "auto",
          },
          appearance: {
            align: "auto",
            appearance: "normal",
            color: "#28282B99",
            colorLink: "",
            colorLinkHover: "",
            colorCode: "",
            colorCodeBG: "",
            colorHighlight: "",
            colorHighlightBG: "",
            styleLink: "underlined",
            font: "Source Sans Pro",
            kerning: -0.075,
            margins: { top: -0.125, bottom: -0.125 },
            size: 2.5,
            spacing: 1.25,
            weight: 200,
          },
          type: "text",
        },
        {
          id: "text01",
          text: {
            content: "Cyberization Management Systems",
            role: "auto",
          },
          appearance: {
            align: "auto",
            appearance: "normal",
            color: "#28282B66",
            colorLink: "",
            colorLinkHover: "",
            colorCode: "",
            colorCodeBG: "",
            colorHighlight: "",
            colorHighlightBG: "",
            styleLink: "underlined",
            font: "Source Sans Pro",
            kerning: -0.025,
            margins: { top: -0.125, bottom: -0.125 },
            size: 1.0,
            spacing: 1.5,
            weight: 200,
          },
          type: "text",
        },
        {
          id: "divider01",
          appearance: {
            align: "auto",
            color: "#28282B26",
            margins: { top: 1.125, bottom: 1.125 },
            style: "single",
            orientation: "horizontal",
            thickness: 1,
            width: 100,
            height: 8,
          },

          type: "divider",
        },
        {
          id: "icons01",
          icons: {
            icons: [
              {
                type: "twitter",
                url: "https://twitter.com",
                colorFG: "",
                colorBG: "",
                colorHover: "",
                onclick: "",
              },
              {
                colorFG: "",
                colorBG: "",
                colorHover: "",
                type: "github",
                url: "https://github.com",
              },
              {
                colorFG: "",
                colorBG: "",
                colorHover: "",
                type: "phone",
                url: "tel:0000000000",
              },
              {
                colorFG: "",
                colorBG: "",
                colorHover: "",
                type: "email",
                url: "mailto:user@domain.tld",
              },
            ],
          },
          appearance: {
            shape: "circle",
            cornerRadius: 0.5,
            size: 1.25,
            spacing: 0.75,
            style: "solid",
            colorFG: "#28282B99",
            colorBG: "#28282B0D",
            colorHover: "#28282B2B",
          },

          type: "icons",
        },
        {
          id: "icons02",
          icons: {
            icons: [
              {
                type: "email",
                url: "https://domain.ext/path",
                colorFG: "",
                colorBG: "",
                colorHover: "",
                onclick: "",
              },
              {
                type: "youtube",
                url: "https://domain.ext/path",
                colorFG: "",
                colorHover: "",
                colorBG: "",
                onclick: "",
              },
            ],
          },
          appearance: {
            shape: "circle",
            cornerRadius: 0.5,
            size: 1.25,
            spacing: 0.75,
            style: "solid",
            colorFG: "#28282B99",
            colorBG: "#28282B0D",
            colorHover: "#28282B2B",
          },

          type: "icons",
        },
        {
          id: "image01",
          image: {
            altText: "",
            stuffId: "",
            defer: false,
            linkUrl: "",
            optimizable: true,
          },
          appearance: {
            cornerRadius: 0.0,
            height: 30,
            margins: { top: 2.75, bottom: 2.75 },
            position: "center",
            shape: "rectangle",
            width: 101.0,
            scale: 100.0,
          },
          type: "image",
        },
      ],
      theme: "template2",
    };
  };
  _getDefaultTheme1 = () => {
    return {
      components: [
        {
          id: "background",
          appearance: {
            style: "color",
            color: "#C7E3F2",
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
            color: "#fff",
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
          appearance: {
            color: "#fff",
            align: "center",
          },
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
            appearance: { width: 100 },
          },

          appearance: {
            align: "center",
            background: {
              style: "color",
              color: "#44566c",
            },
            // color:"#fff",
            position: "relative",
            display: "flex",
            height: 762,
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
        {
          id: "container03",
          container: {
            mode: "default",
            groups: [
              {
                align: "left",
                componentIds: ["text04", "text05"],
                width: 100,
                spacer: false,
              },
            ],
          },

          appearance: {
            width: 100,
            align: "center",
          },
          type: "container",
        },

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
        {
          id: "container05",
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
        {
          id: "container08",
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
                componentIds: ["text25", "text21", "text20", "text22"],
                width: 100,
                spacer: false,
              },
            ],
          },

          appearance: {
            align: "center",
            background: {
              style: "color",
              color: "#eb4f1e",
            },
            // color:"#fff",
            position: "relative",
            display: "flex",
            height: 762,
          },
          type: "container",
        },
        {
          id: "container06",
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
          },

          appearance: {
            align: "center",
            background: {
              style: "color",
              color: "#44566c",
            },
            // color:"#fff",
            position: "relative",
            display: "flex",
            height: 362,
          },
          type: "container",
        },

        {
          id: "text25",
          style: "style3",
          text: { content: "Augue lorem vestibulum", role: "h2" },
          appearance: {
            //size: 4.5,
            spacing: 1.125,
            weight: 700,
            color: "#fff",
          },
          type: "text",
        },
        {
          id: "text20",
          style: "style4",
          text: {
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec lacinia ligula. Morbi nec rutrum neque, nec sagittis dui. Integer pulvinar nunc ut maximus dui lorem ipsum magna consequat.",
            role: "p",
          },
          appearance: {
            color: "#fff",
            align: "center",
            size: 1.25,
          },
          type: "text",
        },
        {
          id: "text21",
          style: "style4",
          text: {
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec lacinia ligula. Morbi nec rutrum neque, nec sagittis dui. Integer pulvinar nunc ut maximus dui lorem ipsum magna consequat.",
            role: "p",
          },
          appearance: {
            color: "#fff",
            align: "center",
            size: 1.25,
          },
          type: "text",
        },
        {
          id: "text22",
          style: "style4",
          text: {
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec lacinia ligula. Morbi nec rutrum neque, nec sagittis dui. Integer pulvinar nunc ut maximus dui lorem ipsum magna consequat.",
            role: "p",
          },
          appearance: {
            color: "#fff",
            align: "center",
            size: 1.25,
          },
          type: "text",
        },
      ],
      theme: "template1",
    };
  };
  shouldCancelStart = e => {
    // var targetEle = e;
    // console.log(targetEle)
    // if (!targetEle.id) {
    //   targetEle = e.target;
    // }
    // alert(targetEle.id)
    // if (targetEle.id === 'button_value') {
    //   console.log('Div button click here ');
    //   // perform you click opration here
    // }
  };
  onSortEnd = props => {
    const { oldIndex, newIndex, collection } = props;
    if (oldIndex !== newIndex) {
      const components = this.shiftPosition(
        this.state.templatePage.components,
        oldIndex,

        newIndex
      );
      const _stateValues = {
        templatePage: { components: components },
        currentTheme: components[oldIndex],
        //currentContainer: components[oldIndex].id,
      };
      if (components[oldIndex] && components[oldIndex].id) {
        _stateValues["currentContainer"] = components[oldIndex].id;
      }
      this.setState(_stateValues);
    }
  };
  onSortItemsEnd = props => {
    const { newListIndex, newIndex, listindex, items, collection } = props;
    const components = this.state.templatePage.components.slice();
    const itemsValue: string[] = [];
    items.forEach(item => {
      itemsValue.push(
        components[item.listId].container["groups"][item.listindex][
          "componentIds"
        ][item.id]
      );
    });
    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i];

      components[item.listId].container.groups[
        item.listindex
      ].componentIds.splice(item.id, 1);
    }
    components[newListIndex].container.groups[listindex].componentIds.splice(
      newIndex,
      0,
      ...itemsValue
    );
    this.setState({
      templatePage: { components: components },
    });
  };
  OnSortClicked = result => {
    this.setState({
      currentContainer: result.id,
      isOpen: true,
      currentTheme: result,
    });
  };

  shiftPosition = (array, from, to) => {
    array = array.slice();
    array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
    return array;
  };
  _getUniqueid = (type: string, index: number) => {
    const id = type + "0" + index;
    if (!this.searchId(id)) {
      return id;
    } else {
      return this._getUniqueid(type, index + 1);
    }
  };
  getEndFieldSettings = (templatePage, type) => {
    return templatePage
      .slice()
      .reverse()
      .find(element => element.type == type);
  };
  _addFieldtoTemplatePage = (type: string) => {
    const { templatePage, currentContainer } = this.state;
    const fieldExists = this._searchFieldbyType(type);
    const field = {
      type: type,
      id:
        this._getUniqueid(type, fieldExists.length + 1) ||
        Math.random().toString(),
      [type]:
        type === "text"
          ? { role: "auto", content: "text" }
          : type === "container"
          ? { mode: "default", groups: [] }
          : type === "icons"
          ? {
              icons: [
                {
                  colorFG: "",
                  colorBG: "",
                  colorHover: "",
                  type: "email",
                  url: "mailto:user@domain.tld",
                },
              ],
            }
          : {},
      style: "",
      settings: {},
      appearance: {},
    };
    if (type === "container") {
      field.appearance = {
        background: {},
        padding: { vertical: "30", horizontal: "0" },
      };
    } else {
      const _existingType = this.getEndFieldSettings(
        templatePage.components,
        type
      );
      if (_existingType && _existingType.appearance) {
        field.appearance = cloneDeep(_existingType.appearance);
      }
    }
    templatePage.components.push(field);
    if (currentContainer && field.type !== "container") {
      this.updateContainerComponentsIds(currentContainer, field.id);
    }
    this.setState({ templatePage: templatePage, currentContainer: field.id });
  };

  searchId = (idToSearch: string) => {
    const { templatePage } = this.state;
    return templatePage.components.find(element => element.id == idToSearch);
  };
  _searchFieldbyType = (type: string) => {
    const { templatePage } = this.state;
    return templatePage.components.filter(item => {
      return item.type === type;
    });
  };

  updateContainerComponentsIds = (current: string, id: string) => {
    const { templatePage } = this.state;
    templatePage.components.find(element => {
      if (element.type === "container") {
        if (element.id === current) {
          element.container.groups.push(
            {
              componentIds: [id],
              align: "left",
              width: "50",
            },
            {
              componentIds: [],
              align: "right",
              width: "50",
            }
          );
        } else {
          element.container.groups.find(group => {
            if (group.componentIds.includes(current)) {
              group.componentIds.push(id);
            }
          });
        }
      }
    });
  };
  _existInAnyContainer = current => {
    const { templatePage } = this.state;
    return templatePage.components.find(element => {
      if (element.type === "container") {
        return element.container.groups.find(group =>
          group.componentIds.includes(current)
        );
      }
    });
  };

  componentToHex = h => {
    let r = "0",
      g = "0",
      b = "0",
      a: any = "1";

    if (h.length == 5) {
      r = "0x" + h[1] + h[1];
      g = "0x" + h[2] + h[2];
      b = "0x" + h[3] + h[3];
      a = "0x" + h[4] + h[4];
    } else if (h.length == 9) {
      r = "0x" + h[1] + h[2];
      g = "0x" + h[3] + h[4];
      b = "0x" + h[5] + h[6];
      a = "0x" + h[7] + h[8];
    }
    a = +(a / 255).toFixed(3);

    return "rgba(" + +r + "," + +g + "," + +b + "," + a + ")";
  };

  _getCss = templatePage => {
    let css = "";
    templatePage.components.map(component => {
      const id =
        "#" + component.type === "background"
          ? "__body"
          : component.type === "main"
          ? "__main > .tt-inner"
          : component.type === "image"
          ? component.id + " img"
          : component.id;
      if (component.type === "main" && component.appearance) {
        css += "#__main" + " {";
        if (component.appearance.style === "box") {
          if (component.appearance.background.style === "color") {
            css +=
              "background-color:" + component.appearance.background.color + ";";
          } else if (component.appearance.background.style === "gradient") {
            css +=
              "background-image: linear-gradient(" +
              component.appearance.background.gradient.angle +
              "deg, " +
              this.componentToHex(
                component.appearance.background.gradient.stop1.color
              ) +
              " " +
              component.appearance.background.gradient.stop1.position +
              "%, " +
              this.componentToHex(
                component.appearance.background.gradient.stop2.color
              ) +
              " " +
              component.appearance.background.gradient.stop2.position +
              "%);box-shadow: rgba(0, 0, 0, 0.18) 0rem 1.25rem 2.625rem 0.375rem;background-position: 0% 0%; background-size: cover;";
          }
          if (component.appearance.cornerRadius) {
            css +=
              "border-radius:" + component.appearance.cornerRadius + "rem;";
          }
        }
        css += "}";
      }
      if (component.type === "divider" && component.appearance) {
        // css += ".tt-divider01:before { content:'';";
        css += "#" + id + ":before {content:'';";
        const _style =
          component.appearance.style === "single" ||
          component.appearance.style === "double"
            ? "solid"
            : component.appearance.style;
        css +=
          "border-" +
          (component.appearance.orientation === "horizontal" ? "top" : "left") +
          ":" +
          (component.appearance.thickness || "1") +
          "px " +
          _style +
          " " +
          component.appearance.color +
          ";";
        if (component.appearance.style === "double") {
          css +=
            "border-" +
            (component.appearance.orientation === "horizontal"
              ? "bottom"
              : "right") +
            ":" +
            (component.appearance.thickness || "1") +
            "px " +
            _style +
            " " +
            component.appearance.color +
            ";";
        }
        if (component.appearance.orientation === "horizontal") {
          css += "width:" + component.appearance.width + "%;";
          css += "height:" + component.appearance.thickness + "px;";
        } else if (component.appearance.orientation === "vertical") {
          css += "height:" + component.appearance.height + "rem;";
          css += "width:" + component.appearance.thickness + "px;";
        }

        css += "}";
        css += "#" + id + " {";
        css += "text-align:" + component.appearance.align || "auto" + ";";
        css += "}";
        if (component.appearance.margins) {
          css += "#" + id + ":not(:first-child){";
          css += "margin-top:" + component.appearance.margins + "rem;";
          css += "}";
          css += "#" + id + ":not(:last-child){";
          css += "margin-bottom:" + component.appearance.margins + "rem;";
          css += "}";
        }
      }
      if (component.type === "icons") {
        //width: calc(100% + 0.5rem);
        css += "#" + id + " .tt-icons-li-a" + " { width:2em;height:2em;";
        if (
          component.appearance.shape === "square" &&
          component.appearance.cornerRadius
        ) {
          css += "border-radius:" + component.appearance.cornerRadius + "rem;";
        }
        if (component.appearance.shape === "circle") {
          css += "border-radius:100%;";
        }
        if (component.appearance.style === "solid") {
          css += "background-color:" + component.appearance.colorBG + ";";
        } else if (component.appearance.style === "outline") {
          css +=
            "border-image: initial;border-width: 1px;border-style: solid;border-color:" +
            component.appearance.colorBG +
            ";";
        }

        css += "}";
        css += "#" + id + " .tt-icons-li-a svg" + " { width:60%;height:60%;";
        if (component.appearance.colorFG) {
          css += "fill:" + component.appearance.colorFG;
        }
        css += "}";
      }
      if (component.type != "divider" && component.appearance) {
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
        if (component.appearance.background && component.type !== "main") {
          if (component.appearance.background.style === "color") {
            css +=
              "background-color:" + component.appearance.background.color + ";";
          } else if (component.appearance.background.style === "image") {
            const _dImage =
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
            let _image = _dImage;
            if (
              component.appearance.background.image &&
              component.appearance.background.image.stuffId
            ) {
              _image = component.appearance.background.image.stuffId;
            }

            css +=
              "background-image:url(" +
              _image +
              ");background-position: center center;background-repeat: repeat;background-size: cover;";
          }
        }
        if (component.appearance.padding) {
          css +=
            "padding:" +
            component.appearance.padding.vertical +
            (component.type === "main" ? "rem " : "px  ") +
            component.appearance.padding.horizontal +
            (component.type === "main" ? "rem " : "px  ") +
            ";";
        }
        if (component.appearance.width) {
          const _type =
            component.type === "main" || component.type === "image"
              ? component.appearance.width > 99 && component.type === "image"
                ? "vw;"
                : "rem;"
              : "%;";

          css += "width:" + component.appearance.width + _type;
          if (component.appearance.width == 100) {
            css += "display:flex;";
          }
        }
        if (component.appearance.height) {
          css +=
            "height:" +
            component.appearance.height +
            (component.type === "image" ? "rem;" : "px;");
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
          css += "justify-content:" + component.appearance.align + ";";
        }
        if (component.appearance.weight) {
          css += "font-weight:" + component.appearance.weight + ";";
        }
        // if (component.appearance.align) {
        //   css += "text-align:" + component.appearance.align + ";";
        // }
        if (component.appearance.distance) {
          css += "letter-spacing:" + component.appearance.distance + "rem;";
        }
        if (component.appearance.size) {
          css += "font-size:" + component.appearance.size + "rem;";
        }
        if (component.type !== "icons" && component.appearance.spacing) {
          css += "line-height:" + component.appearance.spacing + ";";
        } else if (component.appearance.spacing) {
          css +=
            "width: calc(100% + " +
            component.appearance.spacing +
            "rem);margin-left:-" +
            component.appearance.spacing / 2 +
            "rem;";
        }
        if (component.appearance.font) {
          css += "font-family:" + component.appearance.font + ", sans-serif;";
        }
        css += "}";
        if (component.type === "icons" && component.appearance.spacing) {
          css += "#" + id + " .tt-icons-li {";
          css += "margin:" + component.appearance.spacing / 2 + "rem;";
          css += "}";
        }
      }

      if (
        component.type === "container" &&
        component.container.mode === "columns"
      ) {
        css += "#" + id + ".columns > .inner {";
        css += "display:flex;flex-wrap:wrap;";
        css += "}";
        component.container.groups.map((grpEle, gindex) => {
          css += "#" + id + " > .inner >  :nth-child(" + (gindex + 1) + "){";
          if (grpEle.width) {
            css += "width:" + "calc(" + grpEle.width + "% - 1rem);";
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
    return <style>{this._getCss(templatePage)}</style>;
  };

  _getElemntsIndex = (id: string) => {
    const { templatePage } = this.state;
    let index = templatePage.components.findIndex(element => element.id === id);
    return index;
  };

  render() {
    const { history } = this.props;
    const { templatePage, currentTheme, isOpen } = this.state;
    const bgItem = this._searchFieldbyType("background");
    return (
      <React.Fragment>
        <div />
        <div className="button-configuration">
          <div className="widget-headers">
            <React.Fragment>
              <Button
                primary
                content="Back"
                //icon="add"
                // labelPosition="left"
                // className="m-0"
                onClick={() => {
                  history.push("/sites");
                }}
              />
              <Button
                primary
                content="Icons"
                // icon="add"
                //labelPosition="left"
                // className="m-0"
                onClick={() => {
                  this._addFieldtoTemplatePage("icons");
                }}
              />
              <Button
                primary
                content="Divider"
                // icon="add"
                //labelPosition="left"
                // className="m-0"
                onClick={() => {
                  this._addFieldtoTemplatePage("divider");
                }}
              />
              <Button
                primary
                content="Text"
                //icon="add"
                // labelPosition="left"
                // className="m-0"
                onClick={() => {
                  this._addFieldtoTemplatePage("text");
                }}
              />
              <Button
                primary
                content="Container"
                // icon="add"
                //labelPosition="left"
                // className="m-0"
                onClick={() => {
                  this._addFieldtoTemplatePage("container");
                }}
              />
              <Button
                primary
                content="Publish"
                // icon="add"
                //labelPosition="left"
                // className="m-0"
                onClick={() => {
                  // this._publishTemplate();

                  const { action, currentAppId } = this.state;
                  if (action === "add") {
                    this.props.createAppAction(this.props.profileData.Uid);
                  } else if (action === "edit" && currentAppId) {
                    this.props.updateTemplateAction(
                      currentAppId,
                      this.state.templatePage
                    );
                  }
                }}
              />
              {/* <Button
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
          /> */}
              {/* <Button
            className="ui primary button w-100 mt-2"
            // disabled={activeThemeId === "0"}
            value="Publish"
            onClick={() => {
              this._publishTemplate();
            }}
          /> */}
            </React.Fragment>
          </div>

          {/* <header className="d-flex justify-content-between navigation">
                </header> */}
          <section>
            <div className="content">
              <div className="widget-section">
                {currentTheme.id && (
                  <ThemeEditor
                    theme={currentTheme}
                    templatePage={templatePage}
                    updateVaues={values => {
                      if (values.stuff) {
                        values.templatePage[
                          "stuff_" + Object.keys(values.stuff)[0]
                        ] = values.stuff[Object.keys(values.stuff)[0]];
                      }
                      this.setState({ templatePage: values.templatePage });
                    }}
                  />
                )}
              </div>
            </div>
          </section>
        </div>
        {/* <Theme1 options={()=>{

      }}/> */}

        {this._renderCss()}
        <div>
          <div
            className="bg__"
            onClick={() => {
              this.setState({
                isOpen: true,
                currentTheme: bgItem[0],
                currentContainer: "",
              });
            }}
          />
          <div className={bgItem[0] ? "__body" : ""} onClick={() => {}}>
            <div id="__wrapper">
              <div id="__main">
                <div className="tt-inner">
                  <SortableListParts
                    items={this.state.templatePage.components}
                    templatePage={this.state.templatePage}
                    onSortEnd={this.onSortEnd}
                    onSortItemsEnd={this.onSortItemsEnd}
                    OnSortClicked={this.OnSortClicked}
                    helperClass={"selected"}
                    currentTheme={this.state.currentTheme}
                    // shouldCancelStart={this.shouldCancelStart}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapState = (state: RootSchema) => {
  return {
    appData: state.app.added,
    profileData: state.user.profile,
    addedSite: state.sites.added,
    updatedSite: state.sites.updated,
  };
};
const mapDispatch = dispatch => {
  return {
    createAppAction: customerId =>
      dispatch(addAppAction.dispatch({ customerId })),
    createTemplateAction: (appId, template) =>
      dispatch(addSiteAction.dispatch({ appId, template })),
    updateTemplateAction: (appId, template) =>
      dispatch(updateSiteAction.dispatch({ appId, template })),
  };
};

export default connect(mapState, mapDispatch)(withRouter(ConfigureSite));
