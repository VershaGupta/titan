import _ from "lodash";
import React from "react";
import { connect } from "react-redux";

import { RouteComponentProps, withRouter, Link } from "react-router-dom";
import { getCookie } from "../../../utils/urls";
import { Form, Table } from "semantic-ui-react";
import { RootSchema } from "../../../redux/reducers";
import Http from "../../../services/http";
import { toast } from "react-toastify";


const emailRegex = new RegExp(/\S+@\S+\.\S+/);

export interface PickRepoProps extends RouteComponentProps {
  //i18n: LanguageSchema;
  nextStep: (number?: number) => void;
  accessToken: string;
  requiredInfo: (info) => void;
}
interface InstallationSchema {
  id: string;
  account: {
    login: string;
    avatar_url: string;
  };
}
export interface RepositoriesSchema {
  full_name: string;
  id: string;
  private: boolean;
  name: string;
  node_id:string;
}
export interface PickRepoState {
  isLoading: boolean;
  installations: InstallationSchema[];
  repositories: RepositoriesSchema[];
}

const defaultFormState: PickRepoState = {
  isLoading: false,
  installations: [],
  repositories: []
};

class PickRepo extends React.Component<PickRepoProps, PickRepoState> {
  constructor(props: PickRepoProps) {
    super(props);
    this.state = defaultFormState;
  }

  componentDidMount = () => {
    if (this.props.accessToken) {
      const _http =    new Http({
        endpoint: "https://api.github.com/",
        headers: {
          Accept: "application/vnd.github.machine-man-preview+json",
              Authorization: "token " + this.props.accessToken
        },
        contentType: true,
      });
      this.setState({ isLoading: true }, () => {
        _http
          .get( "user/installations",
            {"page":1,"per_page":100}
          )
          .then(repos => {
            console.log(repos);
            if (repos) {
              this.setState({ installations: repos.installations });
              if (repos.installations.length) {
                _http
                
                  .get(
                    "user/installations/" +
                      repos.installations[0].id +
                      "/repositories",
                     {"page":1,"per_page":25}
                  )
                  .then(repositories => {
                    if (repositories) {
                      this.setState({
                        isLoading: false,
                        repositories: repositories.repositories
                      });
                    } else {
                      this.setState({ isLoading: false });
                      toast.error("Unable to find any Repos");
                    }
                  })
                  .catch(err => {
                    this.setState({ isLoading: false });
                    toast.error(err.message);
                  });
              }
            } else {
              this.setState({ isLoading: false });
              toast.error("Unable to find any Repos");
            }
          })
          .catch(err => {
            this.setState({ isLoading: false });
            toast.error(err.message);
          });
      });
    } else {
      this.props.nextStep(1);
    }
  };
  // componentDidUpdate(prevProps) {
  //   console.log(this.props)
  //   // const { location, history } = this.props;
  //   // console.log(location);
  // }
  addRepoToTable = repoList => {
    // eslint-disable-next-line @typescript-eslint/camelcase
    const tableRows: JSX.Element[][] = [];
    if (repoList) {
      repoList.forEach((repo: RepositoriesSchema) => {
        const row: JSX.Element[] = [];
        const { id, full_name, node_id, name } = repo;
        row.push(
          <Link
            to={"/create-site"}
            id={`lnk_${id}`}
            onClick={() => {
              this.props.nextStep();
              this.props.requiredInfo({
                id: id,
                full_name: full_name,
                name:name,
                private:repo.private,
                node_id:node_id
              });
            }}
          >
            {full_name}
          </Link>
        );

        tableRows.push(row);
      });
    }
    return tableRows;
  };
  render() {
    const { isLoading, installations, repositories } = this.state;
    return isLoading ? (
      <Form Loading />
    ) : (
      <React.Fragment>
        <div className="mt-5 sub-header mb-3">
          <h4>Continuous Deployment : </h4>
          <p>Choose Repository to deploy the content</p>
        </div>
        <div>

          <Table celled>
          <Table.Body>{
           repositories.map((repo: RepositoriesSchema) => {
            return (
            <Table.Row>
              <Table.Cell>
              <div
              id={`lnk_${repo.id}`}
              onClick={() => {
                  this.props.nextStep();
                  this.props.requiredInfo({
                  id: repo.id,
                  full_name: repo.full_name,
                  name:repo.name,
                  private:repo.private,
                  node_id:repo.node_id
              });
              }}>
              {repo.full_name}
              </div>
            </Table.Cell></Table.Row>
            )
           })
        }
    </Table.Body>
          </Table>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: RootSchema) => {
  return {
    accessToken: state.provider.githubToken.access_token
  };
};

export default connect(mapStateToProps)(withRouter(PickRepo));
