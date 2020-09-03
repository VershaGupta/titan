import React, { useState, useEffect, useCallback, useRef } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import { Button, Popup, Form } from "semantic-ui-react";
import { ISites } from "../../redux/actions/sites";
import { capitalizeFirst } from "../../utils";
import "./create_site.scss";
import logoDark from "../../assets/images/logo-dark.svg";
import DragAndDrop from "./upload_file";
import ReactDropzone, { useDropzone } from "react-dropzone";
import Http from "../../services/http";
import config from "../../config";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { RootSchema } from "../../redux/reducers";
import { addAppAction, IApp } from "../../redux/actions/app";
import Providers from "./CreateProviders/index";
// import amplitude from "../../services/amplitude";

export const defaultThemes = [
  {
    id: "template1",
    templateName: "Template 1",
    thumbnail: "",
    css: "/themes/theme1/assets/css/syle.scss",
    html: "/themes/theme1/index.html",
  },
  {
    id: "template2",
    templateName: "Template 2",
    thumbnail: "",
    css: "/themes/theme1/assets/css/syle.scss",
    html: "/themes/theme1/index.html",
  },
];

const CreateSite: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const params = new URLSearchParams(location.search);
  const template = params.get("t");

  const category = params.get("category");

  const [selectedStyle, updateStyle] = useState<string | null>(template);

  const [selectedCategory, updateCategory] = useState<string | null>(
    category || "templates"
  );
  const [isUploadFileLoading, uploadFileLoading] = useState<boolean | null>(
    false
  );
  const [selectedSite, uploadSite] = useState<any>({});
  const profileData = useSelector((state: RootSchema) => state.user.profile);
  const appData = useSelector((state: RootSchema) => state.app.added);

  const usePrevious = value => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };
  const previousAppData: IApp | undefined = usePrevious({ appData });

  useEffect(() => {
    if (selectedCategory === "dragndrop") {
      const _site =
        history.action === "PUSH"
          ? (location.state || ({} as any)).site
          : undefined;
      uploadSite(_site);
      // history.push(
      //   `/tools/edit?style=${selectedStyle}&category=${selectedCategory}`
      // );
    }

    if (appData && previousAppData !== undefined) {
      if (
        previousAppData["appData"]["state"] === "loading" &&
        appData.state !== "loading"
      )
        if (appData.state === "success") {
          let formData = new FormData();
          formData.append("uploadFile", uploadFile);
          new Http({
            endpoint: config.api_endpoint,
            headers: {
              Authorization: "",
            },
            contentType: true,
          })
            .post(`/uploadFile/${appData.appID}`, {}, formData)
            .then(res => {
              uploadFileLoading(false);
              toast.success("File uploaded successfully");
              history.push("/sites");
            })
            .catch(err => {
              uploadFileLoading(false);
              toast.error("Unable to upload files");
              history.push("/sites");
            });
        } else if (appData.state === "error") {
          toast.error("Unable to create app");
        }
    }
  }, [selectedCategory, appData, previousAppData]);

  const dispatch = useDispatch();
  const [uploadFile, uploadFileFn] = useState<any>([]);

  const handleDrop = files => {
    if (files !== null) {
      uploadFileFn(files[0]);
      uploadFileLoading(true);

      if (selectedSite && selectedSite.appID) {
        let formData = new FormData();
        formData.append("uploadFile", files[0]);
        new Http({
          endpoint: config.api_endpoint,
          headers: {
            Authorization: "",
          },
          contentType: true,
        })
          .put(`/uploadFile/${selectedSite.appID}`, {}, formData)
          .then(res => {
            uploadFileLoading(false);
            toast.success(res);
          })
          .catch(err => {
            uploadFileLoading(false);
            toast.error("Unable to upload files");
          });
      } else {
        dispatch(addAppAction.dispatch({ customerId: profileData.Uid }));
      }
    }
  };
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    if (selectedStyle !== null) {
      // amplitude.logEvent("Widget Configure", {
      //   selectedStyle: selectedStyle,
      // });
      history.push(`/site/configure?t=${selectedStyle}`);
    }
  }, [selectedStyle]);

  return (
    <React.Fragment>
      <section>
        <div className="d-flex button-wrapper">
          {/* left block */}
          <div className="left-panel share-buttons col-md-4 col-sm-12 d-flex align-items-start justify-content-start flex-column">
            <div className="logo dark">
              <Link to="/tools/list">
                Titan
                {/* <img src={""} alt="Titan" title="Titan" /> */}
              </Link>
            </div>
            <div className="message">
              <h1>Website Contents</h1>
              <p>----------------</p>
              <ul>
                <li
                  className={`${
                    selectedCategory === "templates" ? "active" : ""
                  }`}
                  onClick={() => updateCategory("templates")}
                >
                  <a>
                    <i aria-hidden="true" className="share alternate icon" />{" "}
                    Templates
                  </a>
                </li>
                <li
                  className={`${
                    selectedCategory === "dragndrop" ? "active" : ""
                  }`}
                  onClick={() => updateCategory("dragndrop")}
                >
                  <a>
                    <i aria-hidden="true" className="envelope outline icon" />{" "}
                    Drag & Drop
                  </a>
                </li>
                <li
                  className={`${
                    selectedCategory === "providers" ? "active" : ""
                  }`}
                  onClick={() => updateCategory("providers")}
                >
                  <a>
                    <i aria-hidden="true" className="envelope outline icon" />{" "}
                    Providers
                  </a>
                </li>
                <li
                  className={`${
                    selectedCategory === "providers" ? "active" : ""
                  }`}
                  onClick={() => updateCategory("cms")}
                >
                  <a>
                    <i aria-hidden="true" className="envelope outline icon" />{" "}
                    Headless CMS
                  </a>
                </li>
                {/* <li
                  className={`${
                    selectedCategory === "introduction" ? "active" : ""
                  }`}
                  onClick={() => updateCategory("introduction")}
                >
                  <a>
                    <i aria-hidden="true" className="user outline icon"></i>{" "}
                    Introduction Popup
                  </a>
                </li> */}
              </ul>
            </div>
          </div>

          {/* right block */}
          <div className="right-panel share-button-buttons col-md-8 col-sm-12">
            {selectedCategory === "templates" && (
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h2 className="mb-0">Select Templates</h2>
                <div>
                  <Link to="/sites">
                    <i aria-hidden="true" className="s9iconcross" />
                  </Link>
                </div>
              </div>
            )}

            {selectedCategory === "templates" && (
              <div className="button-wrapper d-flex justify-content-between flex-wrap">
                {defaultThemes.map((theme, index) => {
                  return (
                    <div
                      key={index.toString()}
                      className={`sharing-buttons d-flex align-items-center`}
                      onClick={() => updateStyle(theme.id)}
                    >
                      <div className="icon" />
                      <div className="buttonlabel">
                        {capitalizeFirst(theme.templateName)}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {selectedCategory === "dragndrop" && (
              <div className="button-wrapper d-flex justify-content-between flex-wrap">
                <div>
                  {!isUploadFileLoading ? (
                    <DragAndDrop handleDrop={handleDrop}>
                      <div className="dropfield">
                        <div className="dropcontent">
                          {selectedSite && selectedSite.appID
                            ? `Want to deploy a updated site to domain ${selectedSite.tempateDomain}`
                            : "Want to deploy a new site without connecting to any provider? Drag and drop your site files here"}
                        </div>
                      </div>
                    </DragAndDrop>
                  ) : (
                    <div className="dropfield">
                      <Form loading />{" "}
                    </div>
                  )}
                </div>
              </div>
            )}
            {selectedCategory === "providers" && (
              <div className="button-wrapper d-flex justify-content-between flex-wrap">
                <h2>Connect to Git Providers</h2>
                <Providers />
              </div>
            )}
            {selectedCategory === "cms" && (
              <div className="button-wrapper d-flex justify-content-between flex-wrap">
                Coming Soon...
              </div>
            )}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default CreateSite;
