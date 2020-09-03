import Slider, { createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
import * as React from "react";
import { connect, ReactReduxContext } from "react-redux";
import UploadPic from "./upload_picture";
import {
  RouteComponentProps,
  withRouter,
  Link,
  useHistory,
  useLocation,
} from "react-router-dom";
import { toast } from "react-toastify";
import { Dispatch } from "redux";
import {
  Button,
  Form,
  Icon,
  Image,
  Message,
  Modal,
  Tab,
  Dropdown,
} from "semantic-ui-react";
import S9Container from "../../assets/images/s9-container.png";
import Code from "../../components/Code";
import ColorPicker from "../../components/ColorPicker";
// import InfoModal from "../../components/InfoModal";
// import Tooltip from "../../components/Tooltip";
import { IGetProfile } from "../../redux/actions/user";

import { RootSchema } from "../../redux/reducers";
import { capitalizeFirst, removeUnderscore } from "../../utils";
import { sanitizeIDOrClass } from "../../utils/dom";
import { IAppState } from "../../redux/actions/default";
import { IObject } from "../../schema";
interface WidgetConfigurationProps extends RouteComponentProps {
  profile: IGetProfile;
  appState: IAppState;
  theme: any;
  updateVaues: (values: any) => void;
  templatePage: any;
}
interface WidgetConfigurationState {
  action: "new" | "edit" | "clone";
  theme: any;
  colorPicker: string;
  hideThemeEditor: boolean;
  hideBasicPane: boolean;
  showIconComponent: number;
}

const SeekBar = createSliderWithTooltip(Slider);
const availableIcons = [
  "twitter",
  "email",
  "github",
  "mobile",
  "phone",
  "home",
  "youtube",
  "zoom",
];

class WidgetConfiguration extends React.Component<
  WidgetConfigurationProps,
  WidgetConfigurationState
> {
  private PANES = [
    {
      name: "Basic",
      icon: "s9icongear",
    },
    {
      name: "Design",
      icon: "s9icondesign",
    },
  ];
  private HIDEBASICPANES = [
    {
      name: "Design",
      icon: "s9icondesign",
    },
  ];
  constructor(props: WidgetConfigurationProps) {
    super(props);

    const { location } = props;
    const params = new URLSearchParams(location.search);

    let action: WidgetConfigurationState["action"] = "new";
    if (["clone", "edit"].includes(params.get("action") || "")) {
      action = params.get("action") as WidgetConfigurationState["action"];
    }

    this.state = {
      hideThemeEditor: false,
      action,
      theme: "",
      colorPicker: "none",
      hideBasicPane: false,
      showIconComponent: -1,
    };
  }

  // Life-cycle
  componentDidMount() {
    if (!this.state.theme) {
      const _stateValues = { theme: this.props.theme, hideThemeEditor: true };
      if (this.props.theme.type === "divider") {
        _stateValues["hideBasicPane"] = true;
      }
      this.setState(_stateValues);
    }
  }
  componentDidUpdate(
    prevProps: WidgetConfigurationProps,
    prevState: WidgetConfigurationState
  ) {
    const _stateValues = {};
    if (prevProps.theme !== this.props.theme) {
      _stateValues["hideThemeEditor"] = true;
      _stateValues["theme"] = this.props.theme;
      if (this.props.theme.type === "divider") {
        _stateValues["hideBasicPane"] = true;
      }
      this.setState(_stateValues);
    }
  }

  // Events
  private onTabChange = (name: string) => {
    const comingSoon = (
      <Message
        className="d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "#ffffff" }}
        header="This section is coming soon"
        content={
          <span className="d-flex justify-content-center">
            Thank you for your patience!
          </span>
        }
      />
    );

    const disableOnDefaultButtons = (
      <Message
        warning
        className="d-flex justify-content-center align-items-center "
        style={{ backgroundColor: "#ffffff" }}
        header="Using Providers With Default Style"
        content={
          <span className="">
            Please disable <b>Only Use Providers With Default Style</b> under
            the <b>Basic</b> tab to access this section.
          </span>
        }
      />
    );

    const showCounterForSharingPopupOnly = (
      <Message
        warning
        className="d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "#ffffff" }}
        header="Counter Section Only Works For Sharing Widgets"
        content=""
      />
    );
    switch (name) {
      case "Basic":
        return this.__renderBasic();
      case "Design":
        return this.__renderDesign();

      default:
        return <Tab.Pane>This section doesn&apos;t exist.</Tab.Pane>;
    }
  };

  // Validations
  updateComponentByID = (templatePage: any, theme: any) => {
    templatePage.components.find((element: any) => {
      if (element.id == theme.id) {
        element = theme;
      }
    });
  };
  _getElemntsIndex = (id: string) => {
    const { templatePage } = this.props;
    let index = templatePage.components.findIndex(
      (element: any) => element.id === id
    );
    return index;
  };
  _delete = () => {
    const { templatePage, theme } = this.props;
    if (theme.type !== "main" && theme.type !== "background") {
      let index = this._getElemntsIndex(theme.id);
      if (index !== -1) {
        templatePage.components.splice(index, 1);
        this.props.updateVaues({ templatePage: templatePage });
      }
    }
  };

  // Render forms
  private __renderBasic = () => {
    const { templatePage } = this.props;
    const { theme, showIconComponent } = this.state;
    const mergedOpts = availableIcons.map(icon => {
      return {
        text: `${capitalizeFirst(icon)}`,
        value: icon,
        icon: {
          name: icon,
        },
      };
    });
    if (theme)
      return (
        <div className="pane-inner">
          <Tab.Pane>
            <Form className="provider-row">
              {theme && theme.type == "image" && (
                <UploadPic
                  getImage={({ image }) => {
                    theme.image.stuffId = image;
                    this.updateComponentByID(templatePage, theme);
                    this.props.updateVaues({
                      templatePage: templatePage,
                    });
                  }}
                />
              )}
              {theme && theme.type == "icons" && (
                <React.Fragment>
                  {theme.icons.icons.map((icon, index) => {
                    //  return     <React.Fragment>
                    //  <div className="header">
                    //  <div className= "icon"></div>
                    //  <span>{icon.type}</span>
                    //  <div className="action">Delete</div></div>
                    //  </React.Fragment>
                    return (
                      <React.Fragment key={index + icon.type}>
                        <div className="provider-row-inner">
                          <Form.Group widths="equal">
                            {/* <Form.Select
                    required
                    options={mergedOpts}
                    placeholder="Select a icons"
                    search
                    searchInput={{ id: "fsc-button" + index }}
                    value={icon.type}
                    icon={icon.type}
                    onChange={(e, d) => {
                      if (typeof d.value === "string") {
                        const { theme } = this.state;
                    theme.icons.icons[index].type = d.value;
                        this.updateComponentByID(templatePage, theme);
                        this.props.updateVaues({ templatePage: templatePage });
                      }
                    }}
                  /> */}
                            <Form.Input
                              onClick={() => {
                                this.setState({ showIconComponent: index });
                              }}
                              value={capitalizeFirst(icon.type)}
                              icon={icon.type}
                              onChange={event => {
                                const { theme } = this.state;
                                theme.icons.icons[index].type =
                                  event.target.value;
                                this.updateComponentByID(templatePage, theme);
                                this.props.updateVaues({
                                  templatePage: templatePage,
                                });
                              }}
                            />
                            <Form.Button
                              id={"fbc-delete" + index}
                              color="red"
                              className="custom-icon"
                              icon
                              width="2"
                              onClick={() => {
                                const { theme } = this.state;
                                theme.icons.icons.splice(index, 1);
                                this.updateComponentByID(templatePage, theme);
                                this.props.updateVaues({
                                  templatePage: templatePage,
                                });
                              }}
                            >
                              <i className="s9iconcross icon"></i>
                            </Form.Button>
                          </Form.Group>

                          {showIconComponent == index && (
                            <React.Fragment>
                              {" "}
                              <Form.Select
                                required
                                options={mergedOpts}
                                placeholder="Select a icons"
                                search
                                searchInput={{ id: "fsc-button" + index }}
                                value={icon.type}
                                icon={icon.type}
                                onChange={(e, d) => {
                                  if (typeof d.value === "string") {
                                    const { theme } = this.state;
                                    theme.icons.icons[index].type = d.value;
                                    this.updateComponentByID(
                                      templatePage,
                                      theme
                                    );
                                    this.props.updateVaues({
                                      templatePage: templatePage,
                                    });
                                  }
                                }}
                              />
                              <Form.Input
                                value={icon.url}
                                onChange={event => {
                                  const { theme } = this.state;
                                  theme.icons.icons[index].url =
                                    event.target.value;
                                  this.updateComponentByID(templatePage, theme);
                                  this.props.updateVaues({
                                    templatePage: templatePage,
                                  });
                                }}
                              />
                              <hr />
                            </React.Fragment>
                          )}
                        </div>
                      </React.Fragment>
                    );
                  })}
                  <Form.Button
                    id="fbc-add"
                    primary
                    content="Add Icon"
                    onClick={() => {
                      const { theme } = this.state;
                      theme.icons.icons.push({
                        type: "email",
                        url: "https://domain.ext/path",
                      });
                      this.updateComponentByID(templatePage, theme);
                      this.props.updateVaues({ templatePage: templatePage });
                    }}
                  />
                </React.Fragment>
              )}
              {theme && theme.type == "text" && (
                <Form.Input
                  id={"fic-widget_name"}
                  label={"Text"}
                  value={theme.text.content}
                  onChange={event => {
                    const { theme } = this.state;
                    theme.text.content = event.target.value;

                    this.updateComponentByID(templatePage, theme);
                    this.props.updateVaues({ templatePage: templatePage });
                  }}
                />
              )}
              {theme && theme.type === "container" && (
                <Form.Select
                  id="fsc-animation_entrance"
                  options={["default", "columns"].map((_type, i) => {
                    return {
                      text: _type,
                      value: _type,
                      key: i,
                    };
                  })}
                  label="Mode"
                  value={theme.container.mode}
                  onChange={(e, d) => {
                    const { theme } = this.state;
                    theme.container.mode = d.value;
                    this.updateComponentByID(templatePage, theme);
                    this.props.updateVaues({ templatePage: templatePage });
                  }}
                />
              )}
              {theme.type === "container" &&
                theme.container.mode === "columns" &&
                theme.container.groups.map((groupele, index) => {
                  return (
                    <React.Fragment key={index}>
                      <Form.Input
                        id={"fic-banner_text"}
                        label="Width"
                        value={groupele.width}
                        onChange={(e, d) => {
                          const { theme } = this.state;
                          theme.container.groups[index].width = d.value;

                          this.updateComponentByID(templatePage, theme);
                          this.props.updateVaues({
                            templatePage: templatePage,
                          });
                        }}
                      />
                      <Form.Input
                        id={"fic-banner_text"}
                        label="Alignment"
                        value={groupele.align}
                        onChange={(e, d) => {
                          const { theme } = this.state;
                          theme.container.groups[index].align = d.value;

                          this.updateComponentByID(templatePage, theme);
                          this.props.updateVaues({
                            templatePage: templatePage,
                          });
                        }}
                      />
                    </React.Fragment>
                  );
                })}
            </Form>
          </Tab.Pane>
        </div>
      );
  };
  private __renderDesign = () => {
    const { templatePage } = this.props;
    const { theme } = this.state;
    const color = theme.appearance && theme.appearance.color;
    const bgcolor =
      theme.appearance &&
      theme.appearance.background &&
      theme.appearance.background.color;
    return (
      <div className="pane-inner">
        <Tab.Pane>
          {/* <h5 className="mb-4">Buttons</h5> */}
          <Form>
            {theme.type === "image" && (
              <Form.Field className="mb-4">
                <div className="d-flex custom-label">
                  <span> Corner Radius </span>
                </div>
                <SeekBar
                  className="mt-2"
                  trackStyle={{ height: 10 }}
                  handleStyle={{ height: 20, width: 20 }}
                  railStyle={{ height: 10 }}
                  step={0.05}
                  min={0}
                  max={3}
                  value={
                    (theme.appearance && theme.appearance.cornerRadius) || 0
                  }
                  tipFormatter={(v: number) => `${v}`}
                  onChange={val => {
                    const { theme } = this.state;
                    theme.appearance.cornerRadius = val;
                    this.updateComponentByID(templatePage, theme);
                    this.props.updateVaues({ templatePage: templatePage });
                  }}
                />
              </Form.Field>
            )}
            {theme.type === "icons" && (
              <React.Fragment>
                <label>Select Style</label>
                <Dropdown
                  placeholder="Select Style"
                  fluid
                  label="Select Style"
                  selection
                  defaultValue={theme.appearance.style}
                  options={["solid", "outline"].map((value, key) => ({
                    key,
                    value,
                    text: capitalizeFirst(value),
                  }))}
                  onChange={(e, d) => {
                    theme.appearance.style = d.value;
                    this.updateComponentByID(templatePage, theme);
                    this.props.updateVaues({ templatePage: templatePage });
                  }}
                />
                <label>Select Style</label>
                <Dropdown
                  placeholder="Select shape"
                  fluid
                  label="Select shape"
                  selection
                  defaultValue={theme.appearance.shape}
                  options={["circle", "square"].map((value, key) => ({
                    key,
                    value,
                    text: capitalizeFirst(value),
                  }))}
                  onChange={(e, d) => {
                    theme.appearance.shape = d.value;
                    this.updateComponentByID(templatePage, theme);
                    this.props.updateVaues({ templatePage: templatePage });
                  }}
                />
                <Form.Group className="unstackable">
                  <Form.Input
                    width="14"
                    id={"fic-bg_color"}
                    //  placeholder="#0c0ced or grey"
                    label={"Background"}
                    value={theme.appearance.colorBG}
                    onChange={(e, d) => {
                      theme.appearance.colorBG = d.value;
                      this.updateComponentByID(templatePage, theme);
                      this.props.updateVaues({ templatePage: templatePage });
                    }}
                  />

                  <ColorPicker
                    color={theme.appearance.colorBG}
                    onChange={color => {
                      if (theme.appearance) {
                        theme.appearance.colorBG = color.hex;
                        this.updateComponentByID(templatePage, theme);
                        this.props.updateVaues({ templatePage: templatePage });
                      }
                    }}
                  />
                </Form.Group>
                <Form.Group className="unstackable">
                  <Form.Input
                    width="14"
                    id={"fic-bg_color"}
                    //  placeholder="#0c0ced or grey"
                    label={"Color"}
                    value={theme.appearance.colorFG}
                    onChange={(e, d) => {
                      theme.appearance.colorFG = d.value;
                      this.updateComponentByID(templatePage, theme);
                      this.props.updateVaues({ templatePage: templatePage });
                    }}
                  />

                  <ColorPicker
                    color={theme.appearance.colorFG}
                    onChange={color => {
                      if (theme.appearance) {
                        theme.appearance.colorFG = color.hex;
                        this.updateComponentByID(templatePage, theme);
                        this.props.updateVaues({ templatePage: templatePage });
                      }
                    }}
                  />
                </Form.Group>
              </React.Fragment>
            )}
            {theme.type === "divider" && (
              <React.Fragment>
                <label>Select Style</label>
                <Dropdown
                  placeholder="Select Style"
                  fluid
                  label="Select Style"
                  selection
                  defaultValue={theme.appearance.style}
                  options={["single", "double", "dotted", "dashed"].map(
                    (value, key) => ({
                      key,
                      value,
                      text: capitalizeFirst(value),
                    })
                  )}
                  onChange={(e, d) => {
                    theme.appearance.style = d.value;
                    this.updateComponentByID(templatePage, theme);
                    this.props.updateVaues({ templatePage: templatePage });
                  }}
                />
                <label>Select Orientation</label>
                <Dropdown
                  placeholder="Select Orientation"
                  fluid
                  label="Select Orientation"
                  selection
                  defaultValue={theme.appearance.orientation}
                  options={["horizontal", "vertical"].map((value, key) => ({
                    key,
                    value,
                    text: capitalizeFirst(value),
                  }))}
                  onChange={(e, d) => {
                    theme.appearance.orientation = d.value;
                    this.updateComponentByID(templatePage, theme);
                    this.props.updateVaues({ templatePage: templatePage });
                  }}
                />

                <Form.Field className="mb-4">
                  <div className="d-flex custom-label">
                    <span>
                      {" "}
                      {theme.appearance.orientation === "horizontal"
                        ? "Width"
                        : "Height"}{" "}
                    </span>
                  </div>
                  <SeekBar
                    className="mt-2"
                    trackStyle={{ height: 10 }}
                    handleStyle={{ height: 20, width: 20 }}
                    railStyle={{ height: 10 }}
                    step={
                      theme.appearance.orientation === "horizontal" ? 10 : 1
                    }
                    min={0}
                    max={
                      theme.appearance.orientation === "horizontal" ? 100 : 15
                    }
                    value={
                      (theme.appearance.orientation === "horizontal"
                        ? theme.appearance.width
                        : theme.appearance.height) || 0
                    }
                    tipFormatter={(v: number) => `${v}`}
                    onChange={val => {
                      const { theme } = this.state;
                      if (theme.appearance.orientation === "horizontal") {
                        theme.appearance.width = val;
                      } else {
                        theme.appearance.height = val;
                      }
                      this.updateComponentByID(templatePage, theme);
                      this.props.updateVaues({ templatePage: templatePage });
                    }}
                  />
                </Form.Field>
                <Form.Field className="mb-4">
                  <div className="d-flex custom-label">
                    <span> Thickness </span>
                  </div>
                  <SeekBar
                    className="mt-2"
                    trackStyle={{ height: 10 }}
                    handleStyle={{ height: 20, width: 20 }}
                    railStyle={{ height: 10 }}
                    step={1}
                    min={0}
                    max={5}
                    value={
                      (theme.appearance && theme.appearance.thickness) || 0
                    }
                    tipFormatter={(v: number) => `${v}`}
                    onChange={val => {
                      const { theme } = this.state;
                      theme.appearance.thickness = val;
                      this.updateComponentByID(templatePage, theme);
                      this.props.updateVaues({ templatePage: templatePage });
                    }}
                  />
                </Form.Field>

                <Form.Field className="mb-4">
                  <div className="d-flex custom-label">
                    <span> Margins </span>
                  </div>
                  <SeekBar
                    className="mt-2"
                    trackStyle={{ height: 10 }}
                    handleStyle={{ height: 20, width: 20 }}
                    railStyle={{ height: 10 }}
                    step={0.001}
                    min={0}
                    max={8}
                    value={(theme.appearance && theme.appearance.margins) || 0}
                    tipFormatter={(v: number) => `${v}`}
                    onChange={val => {
                      const { theme } = this.state;
                      theme.appearance.margins = { top: val, bottom: val };
                      this.updateComponentByID(templatePage, theme);
                      this.props.updateVaues({ templatePage: templatePage });
                    }}
                  />
                </Form.Field>

                <label>Alignment</label>
                <Dropdown
                  placeholder="Select Alignment"
                  fluid
                  label="Select Alignment"
                  selection
                  defaultValue={theme.appearance.align}
                  options={["left", "right", "center", "auto"].map(
                    (value, key) => ({
                      key,
                      value,
                      text: capitalizeFirst(value),
                    })
                  )}
                  onChange={(e, d) => {
                    theme.appearance.align = d.value;
                    this.updateComponentByID(templatePage, theme);
                    this.props.updateVaues({ templatePage: templatePage });
                  }}
                />
              </React.Fragment>
            )}
            {theme.type === "container" && (
              <Form.Field className="mb-4">
                <div className="d-flex custom-label">
                  <span> Width </span>
                </div>
                <SeekBar
                  className="mt-2"
                  trackStyle={{ height: 10 }}
                  handleStyle={{ height: 20, width: 20 }}
                  railStyle={{ height: 10 }}
                  step={10}
                  min={0}
                  max={100}
                  value={(theme.appearance && theme.appearance.width) || 0}
                  tipFormatter={(v: number) => `${v}`}
                  onChange={val => {
                    const { theme } = this.state;
                    theme.appearance.width = val;
                    this.updateComponentByID(templatePage, theme);
                    this.props.updateVaues({ templatePage: templatePage });
                  }}
                />
              </Form.Field>
            )}
            {theme.type === "container" && (
              <Form.Field className="mb-4">
                <div className="d-flex custom-label">
                  <span> Height </span>
                </div>
                <SeekBar
                  className="mt-2"
                  trackStyle={{ height: 10 }}
                  handleStyle={{ height: 20, width: 20 }}
                  railStyle={{ height: 10 }}
                  step={10}
                  min={0}
                  max={1000}
                  value={(theme.appearance && theme.appearance.height) || 0}
                  tipFormatter={(v: number) => `${v}`}
                  onChange={val => {
                    const { theme } = this.state;
                    theme.appearance.height = val;
                    this.updateComponentByID(templatePage, theme);
                    this.props.updateVaues({ templatePage: templatePage });
                  }}
                />
              </Form.Field>
            )}

            {/* <Form.Select
              className="custom-label"
              id="fsc-size"
              options={Object.keys(config.data?.sizes || {}).map((_type, i) => {
                return {
                  text: this.__getSizeName(_type),
                  value: _type,
                  key: i,
                };
              })}
              label="Size"
              labelClass
              value={buttons.size}
              onChange={(e, d) => {
                const { form } = this.state;
                form.design.buttons.size = d.value as string;
                this.setState({ form });
              }}
            /> */}
            {theme.type === "text" ||
              (theme.type === "divider" && (
                <Form.Group className="unstackable">
                  <Form.Input
                    width="14"
                    id={"fic-bg_color"}
                    //  placeholder="#0c0ced or grey"
                    label={"Color"}
                    value={color}
                    onChange={(e, d) => {
                      theme.appearance.color = d.value;
                      this.updateComponentByID(templatePage, theme);
                      this.props.updateVaues({ templatePage: templatePage });
                    }}
                  />

                  <ColorPicker
                    color={color}
                    onChange={color => {
                      if (theme.appearance) {
                        theme.appearance.color = color.hex;
                        this.updateComponentByID(templatePage, theme);
                        this.props.updateVaues({ templatePage: templatePage });
                      }
                    }}
                  />
                </Form.Group>
              ))}
            {theme.type === "container" && (
              <React.Fragment>
                <label>Select Background</label>
                <Dropdown
                  placeholder="Select Background"
                  fluid
                  label="Select Background"
                  selection
                  defaultValue={theme.appearance.background.style}
                  options={["color", "image", "gradient"].map((value, key) => ({
                    key,
                    value,
                    text: capitalizeFirst(value),
                  }))}
                  onChange={(e, d) => {
                    theme.appearance.background.style = d.value;
                    this.updateComponentByID(templatePage, theme);
                    this.props.updateVaues({ templatePage: templatePage });
                  }}
                />
                {theme.appearance.background &&
                  theme.appearance.background.style === "image" && (
                    <React.Fragment>
                      <UploadPic
                        getImage={({ image }) => {
                          if (!theme.appearance.background.image) {
                            theme.appearance.background.image = {};
                          }
                          theme.appearance.background.image.stuffId = image;
                          this.updateComponentByID(templatePage, theme);
                          this.props.updateVaues({
                            templatePage: templatePage,
                          });
                        }}
                      />
                      {theme.appearance.background.image &&
                        theme.appearance.background.image.stuffId && (
                          <img
                            style={{ width: "60%" }}
                            src={theme.appearance.background.image.stuffId}
                            alt={theme.appearance.background.image.altText}
                          />
                        )}
                    </React.Fragment>
                  )}

                {theme.appearance.background.style === "color" && (
                  <React.Fragment>
                    <Form.Group className="unstackable">
                      <Form.Input
                        width="14"
                        id={"fic-bg_color"}
                        //  placeholder="#0c0ced or grey"
                        label={"Background Color"}
                        value={bgcolor}
                        onChange={(e, d) => {
                          theme.appearance.background.color = d.value;
                          this.updateComponentByID(templatePage, theme);
                          this.props.updateVaues({
                            templatePage: templatePage,
                          });
                        }}
                      />
                      <ColorPicker
                        color={bgcolor}
                        onChange={color => {
                          if (theme.appearance) {
                            theme.appearance.background.color = color.hex;
                            this.updateComponentByID(templatePage, theme);
                            this.props.updateVaues({
                              templatePage: templatePage,
                            });
                          }
                        }}
                      />
                    </Form.Group>
                  </React.Fragment>
                )}
              </React.Fragment>
            )}
            {/* <Form.Group className="unstackable">
              <Form.Input
                width="14"
                id={"fic-icon_color"}
                placeholder="#0fc2e3 or blue"
                label={
                  <Tooltip
                    label="Icon Color"
                    content="It sets the provider icon color in the button."
                  />
                }
                value={buttons.icon_color || ""}
                onChange={(e, d) => {
                  const { form } = this.state;
                  form.design.buttons.icon_color = d.value;
                  this.setState({ form });
                }}
              />
              <ColorPicker
                color={buttons.icon_color}
                onChange={color => {
                  const { form } = this.state;
                  form.design.buttons.icon_color = color.hex;
                  this.setState({ form });
                }}
              />
            </Form.Group>
         */}
            {theme.type === "text" ||
              (theme.type === "icons" && (
                <Form.Field className="mb-4">
                  <div className="d-flex custom-label">
                    <span> Size </span>
                  </div>
                  <SeekBar
                    className="mt-2"
                    trackStyle={{ height: 10 }}
                    handleStyle={{ height: 20, width: 20 }}
                    railStyle={{ height: 10 }}
                    step={0.05}
                    min={0}
                    max={20}
                    value={(theme.appearance && theme.appearance.size) || 0}
                    tipFormatter={(v: number) => `${v}`}
                    onChange={val => {
                      const { theme } = this.state;
                      theme.appearance.size = val;
                      this.updateComponentByID(templatePage, theme);
                      this.props.updateVaues({ templatePage: templatePage });
                    }}
                  />
                </Form.Field>
              ))}
            {theme.type == "text" && (
              <Form.Field className="mb-4">
                <div className="d-flex custom-label">
                  <span> Weight </span>
                </div>
                <SeekBar
                  className="mt-2"
                  trackStyle={{ height: 10 }}
                  handleStyle={{ height: 20, width: 20 }}
                  railStyle={{ height: 10 }}
                  step={50}
                  min={0}
                  max={900}
                  value={(theme.appearance && theme.appearance.weight) || 400}
                  tipFormatter={(v: number) => `${v}`}
                  onChange={val => {
                    const { theme } = this.state;
                    theme.appearance.weight = val;
                    this.updateComponentByID(templatePage, theme);
                    this.props.updateVaues({ templatePage: templatePage });
                  }}
                />
              </Form.Field>
            )}
            {theme.type == "text" ||
              (theme.type === "icons" && (
                <Form.Field className="mb-4">
                  <div className="d-flex custom-label">
                    <span>
                      {" "}
                      {theme.type === "icons" ? "Spacing" : "Line Height"}{" "}
                    </span>
                  </div>
                  <SeekBar
                    className="mt-2"
                    trackStyle={{ height: 10 }}
                    handleStyle={{ height: 20, width: 20 }}
                    railStyle={{ height: 10 }}
                    step={0.1}
                    min={0.75}
                    max={2.5}
                    value={(theme.appearance && theme.appearance.spacing) || 0}
                    tipFormatter={(v: number) => `${v}`}
                    onChange={val => {
                      const { theme } = this.state;
                      theme.appearance.spacing = val;
                      this.updateComponentByID(templatePage, theme);
                      this.props.updateVaues({ templatePage: templatePage });
                    }}
                  />
                </Form.Field>
              ))}
            {theme.type == "text" && (
              <Form.Field className="mb-4">
                <div className="d-flex custom-label">
                  <span> Letter Spacing </span>
                </div>
                <SeekBar
                  className="mt-2"
                  trackStyle={{ height: 10 }}
                  handleStyle={{ height: 20, width: 20 }}
                  railStyle={{ height: 10 }}
                  step={0.1}
                  min={-0.5}
                  max={1.5}
                  value={(theme.appearance && theme.appearance.distance) || 0}
                  tipFormatter={(v: number) => `${v}rem`}
                  onChange={val => {
                    const { theme } = this.state;
                    theme.appearance.distance = val;
                    this.updateComponentByID(templatePage, theme);
                    this.props.updateVaues({ templatePage: templatePage });
                  }}
                />
              </Form.Field>
            )}

            <hr className="mt-5" />

            {/* <hr className="mt-5" />
            <h5 className="mt-5 mb-4">Banner</h5>
            <Form.Select
              id="fsc-banner_layout"
              options={Object.keys(config.data?.banner_layouts || {}).map(
                (_type, i) => {
                  return {
                    text: _type,
                    value: _type,
                    key: i,
                  };
                }
              )}
              label="Layout"
              value={banner?.layout || ""}
              onChange={(e, d) => {
                const { form } = this.state;
                if (form.design.banner) {
                  form.design.banner.layout = d.value as string;
                } else {
                  form.design.banner = {
                    layout: d.value as string,
                  };
                }
                this.setState({ form });
              }}
            />
            <Form.Input
              id={"fic-banner_text"}
              label="Banner Text"
              value={banner?.text || ""}
              onChange={(e, d) => {
                const { form } = this.state;
                if (form.design.banner) {
                  form.design.banner.text = d.value;
                } else {
                  form.design.banner = {
                    text: d.value,
                  };
                }
                this.setState({ form });
              }}
            />
            <hr className="mt-5" />
            <h5 className="mt-5 mb-4">Backdrop</h5>
            <Form.Group widths="equal">
              <Form.Select
                id="fsc-banner_bd_type"
                options={Object.keys(config.data?.banner_backdrops || {}).map(
                  (_type, i) => {
                    return {
                      text: _type,
                      value: _type,
                      key: i,
                    };
                  }
                )}
                label="Type"
                value={banner?.backdrop?.type || ""}
                onChange={(e, d) => {
                  const { form } = this.state;
                  if (form.design.banner?.backdrop) {
                    form.design.banner.backdrop.type = d.value as string;
                  } else {
                    form.design.banner = {
                      backdrop: {
                        type: d.value as string,
                      },
                    };
                  }
                  this.setState({ form });
                }}
              />
              <Form.Input
                id="fic-banner_bd_value"
                label="Value"
                value={banner?.backdrop?.value || ""}
                onChange={(e, d) => {
                  const { form } = this.state;
                  if (form.design.banner?.backdrop) {
                    form.design.banner.backdrop.value = d.value;
                  } else {
                    form.design.banner = {
                      backdrop: {
                        value: d.value,
                      },
                    };
                  }
                  this.setState({ form });
                }}
              />
            </Form.Group> */}
          </Form>
        </Tab.Pane>
      </div>
    );
  };

  render() {
    const _Panes = this.state.hideBasicPane ? this.HIDEBASICPANES : this.PANES;
    return (
      <React.Fragment>
        {this.state.hideThemeEditor ? (
          <div className="configuration-tabs">
            <div className="top-section">
              <h1>Theme Editor</h1>
              <div
                onClick={() => {
                  this.setState({ hideThemeEditor: false });
                }}
              >
                <i aria-hidden="true" className="s9iconcross" />
              </div>
              {/* <label>Select a widget style</label>
            <Dropdown
              placeholder="Select Widget Style"
              fluid
              label="Select a Widget Style"
              selection
              defaultValue={this.props.widgetType}
              //options={}
              onChange={(e, d) => {
                this.props.onStyleChange(d.value as IWidget["widget_type"]);
              }}
              disabled={this.state.action === "edit"}
            /> */}
            </div>
            <div className="configuration-options" id="custom-tab">
              <Tab
                menu={{ fluid: true, vertical: true, tabular: true }}
                panes={_Panes.map((pane, index) => {
                  return {
                    menuItem: {
                      key: index,
                      content: (
                        <div>
                          <Icon className={pane.icon} />
                          <div>{pane.name}</div>
                        </div>
                      ),
                    },
                    render: () => {
                      return this.onTabChange(pane.name);
                    },
                  };
                })}
              />
              <div className="configuration-action " id="configuration-action">
                <div className="action-button ">
                  {/* <Button
                  type="submit"
                  className="ui primary button w-50"
                  
                >
                  {this.state.action === "edit"
                    ? "Update"
                    : "Add"}
                </Button> */}
                  <Button
                    type="submit"
                    className="button w-20"
                    onClick={this._delete}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : null}{" "}
      </React.Fragment>
    );
  }
}

const mapState = (state: RootSchema) => {
  return {
    profile: state.user.profile,
    appState: state.default.appState,
  };
};
const mapDispatch = (dispatch: Dispatch) => {
  return {
    // getConfig: () => dispatch(getWidgetConfigAction.dispatch({})),
    // addWidget: (args: IAddWidgetArgs) =>
    //   dispatch(addWidgetAction.dispatch(args)),
    // getWidgetById: (args: IGetWidgetByIdArgs) =>
    //   dispatch(getWidgetByIdAction.dispatch(args)),
  };
};
export default connect(mapState, mapDispatch)(withRouter(WidgetConfiguration));
