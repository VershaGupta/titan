import moment from "moment";
import * as React from "react";
import { connect } from "react-redux";
import {
  Link,
  useHistory,
  RouteComponentProps,
  withRouter,
} from "react-router-dom";
import { Dispatch } from "redux";
import {
  Button,
  Dropdown,
  Icon,
  Message,
  Popup,
  Loader,
  Card,
} from "semantic-ui-react";
import { RootSchema } from "../../redux/reducers";
import "./Sites.scss";
import { IGetProfile } from "../../redux/actions/user";
import { toast } from "react-toastify";
import { IAppState } from "../../redux/actions/default";
import {
  ISites,
  getSitesAction,
  IAllSites,
  getAllSitesAction,
  getAllUploadSitesAction,
} from "../../redux/actions/sites";

export interface SitesProps extends RouteComponentProps {
  allSites: IAllSites;
  getAllSites: (args) => void;
  profile: IGetProfile;
  appState: IAppState;
  allUploaded: IAllSites;
  getAllUploadSites: (args) => void;
}

export interface SitesState {}

class Sites extends React.Component<SitesProps, SitesState> {
  componentDidMount() {
    const {
      history,
      location: { state },
    } = this.props;
    if (history.action === "PUSH" && state) {
      const error = ((state || {}) as any).error;
      toast.error(error);
    }

    this.props.getAllSites({ customerId: this.props.profile.Uid });
    this.props.getAllUploadSites({ customerId: this.props.profile.Uid });
  }

  // componentDidUpdate(pProps: SitesProps) {
  //   const { deleted } = this.props;
  //   if (pProps.deleted.state === "loading" && deleted.state !== "loading") {
  //     if (deleted.state === "success") {
  //       toast.success(`Widget "${deleted.data?.name}" is deleted.`);
  //     } else {
  //       toast.error("Unable to delete the widget.");
  //     }
  //   }
  // }
  render() {
    const { allSites, allUploaded, profile, history } = this.props;
    const { appState } = this.props;
    return (
      <div
        className={
          "dashboard page-content" + (appState.isCMSView ? " mt-2" : "")
        }
      >
        <section>
          <div className="content">
            <div className="full-container">
              <div className="page-title d-flex align-items-center justify-content-between pb-3 mb-5">
                <div className="title">
                  <h2>Configured Sites</h2>
                </div>
                <div>
                  <Link to="/site/new">
                    <Button
                      primary
                      content="New Site"
                      icon="add"
                      labelPosition="left"
                      className="m-0"
                    />
                  </Link>
                </div>
              </div>

              <div className="configured-tools">
                <div className="d-flex justify-content-start flex-wrap">
                  {!allUploaded.state ||
                  allUploaded.state === "loading" ||
                  !allSites.state ||
                  allSites.state === "loading" ? (
                    <Message icon>
                      <Icon name="circle notched" loading />
                      <Message.Content>
                        <Message.Header>Just one second</Message.Header>
                        Fetching your site list.
                      </Message.Content>
                    </Message>
                  ) : allUploaded.state === "error" &&
                    allSites.state === "error" ? (
                    <Message
                      error
                      icon="exclamation"
                      header={
                        <>
                          <span>Something went wrong!</span>
                          <Button
                            className="ml-3"
                            size="tiny"
                            primary
                            content="Retry"
                            onClick={() => {
                              this.props.getAllSites({
                                customerId: profile.Uid,
                              });
                              this.props.getAllUploadSites({
                                customerId: profile.Uid,
                              });
                            }}
                          />
                        </>
                      }
                      content={allSites.error}
                    />
                  ) : allUploaded.data &&
                    allUploaded.data.length === 0 &&
                    allSites.data.length === 0 ? (
                    <Message
                      icon="eye slash"
                      header="No sites available to display"
                      content={`Please click the "New Site" button to add a Site.`}
                    />
                  ) : (
                    (allSites.data || [])
                      .concat(allUploaded.data || [])
                      .sort(({ DateCreated: s = 0 }, { DateCreated: f = 0 }) =>
                        s > f ? -1 : 1
                      )
                      .map((w, i) => {
                        return (
                          <Card
                            key={i}
                            onClick={() => {
                              if (w.CodeTemplate) {
                                history.push(`/site/configure?action=edit`, {
                                  site: w,
                                });
                              } else {
                                history.push(`/site/new?category=dragndrop`, {
                                  site: w,
                                });
                              }
                            }}
                          >
                            <Card.Content header={w.tempateDomain} />
                            <Card.Content
                              description={"Date Created " + w.DateCreated}
                            />
                            <Card.Content extra>
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={
                                  "https://" +
                                  w.tempateDomain +
                                  ".devtitan.compile7.com"
                                }
                              >
                                Visit Site
                              </a>

                              <p>
                                {w.CodeTemplate ? "Template" : "Drag and Drop"}
                              </p>
                            </Card.Content>
                          </Card>
                        );
                      })
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

// const WidgetCard: React.FC<IWidgetCardProps> = React.memo(props => {
//   const { sites: w, loading, profile } = props;
//   const history = useHistory();

//   return (
//     <div
//       className="tools-block d-flex justify-content-start flex-column align-items-center"
//       onClick={() =>
//         history.push(
//           `/tools/edit?id=${w.id}&action=edit&style=${w.widget_type}`,
//           { widget: w }
//         )
//       }
//     >
//       {!w. ? (
//         <Button size="mini" color="red" className="custom-inactive">
//           Inactive
//         </Button>
//       ) : null}
//       <div className="buttons-type">
//         <img
//           width="50px"
//           src={__getWidgetSrc__(w.widget_type)}
//           alt={w.widget_type}
//           title={w.widget_type}
//         />
//       </div>
//       {loading ? (
//         <Loader active inline="centered" content="Please wait..." />
//       ) : (
//         <React.Fragment>
//           <div className="w-100 d-flex justify-content-between pl-3 pr-3 mt-4 align-items-center">
//             <div className="title">{w.widget_type} Widget</div>
//             <div>
//               <Dropdown
//                 icon="ellipsis vertical"
//                 className="d-flex align-items-center"
//               >
//                 <Dropdown.Menu direction="left">

//                   <Dropdown.Item
//                     text="Clone"
//                     onClick={e => {
//                       e.stopPropagation();
//                       history.push(`/tools/edit?id=${w.id}&action=clone`, {
//                         widget: w,
//                       });
//                     }}
//                   />

//                 </Dropdown.Menu>
//               </Dropdown>
//             </div>
//           </div>

//           <div className="w-100 d-flex justify-content-between pl-3 pr-3 mt-3 align-items-center">
//             <div className="sub-title">Name : {w.name}</div>
//           </div>
//           <div className="w-100 p-3 mt-3  last-modified">
//             {/* <Statistic className="d-flex">
//           <Statistic.Value>5,000</Statistic.Value>
//           <Statistic.Label>Engagements</Statistic.Label>
//         </Statistic> */}
//             {/* <p>{w.providers.list.map((btn) => btn.name).join(", ")}</p> */}
//             {/* <Label color={!!w.options.show_url ? "green" : "blue"} horizontal>
//           {w.options.show_url ? (
//             <a href={w.options.show_url}>{w.options.show_url}</a>
//           ) : (
//             "Showing on any URL"
//           )}
//         </Label> */}
//             <Popup
//               content={moment(w.updated_at).format()}
//               position="bottom right"
//               trigger={
//                 <p>
//                   <span>Last Updated : </span>
//                   <span>{moment(w.updated_at).format("DD-MM-YYYY")}</span>
//                 </p>
//               }
//             />
//           </div>
//         </React.Fragment>
//       )}
//     </div>
//   );
// });

const mapState = (state: RootSchema) => {
  return {
    allSites: state.sites.all,
    profile: state.user.profile,
    appState: state.default.appState,
    allUploaded: state.sites.allUploaded,
  };
};

const mapDispatch = (dispatch: Dispatch) => {
  return {
    getAllSites: args => dispatch(getAllSitesAction.dispatch(args)),
    getAllUploadSites: args => dispatch(getAllUploadSitesAction.dispatch(args)),
  };
};

export default connect(mapState, mapDispatch)(withRouter(Sites));
