import copy from "clipboard-copy";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Dispatch } from "redux";
import { Button } from "semantic-ui-react";
import {
  IShortenUrlArgs,
  IShortner,
  shortUrlAction,
  IShortenUrl,
} from "../../redux/actions/shortner";
import { RootSchema } from "../../redux/reducers";

export interface PublicShortenerProps {
  shortenUrlAction: (args: IShortenUrlArgs) => void;
  shortenUrl: IShortenUrl;
}

const getStoredURLs = (key: string) => {
  try {
    const localStorageValue = localStorage.getItem(key);
    let typeValue: IShortner[] = [];
    if (localStorageValue) {
      typeValue = JSON.parse(localStorageValue) as IShortner[];
      if (typeValue.length > 4) {
        typeValue = typeValue.slice(0, 4);
      }
    }
    return typeValue;
  } catch {
    return [];
  }
};

const PublicShortener: React.SFC<PublicShortenerProps> = props => {
  const localStorageKey = "shortenedUrls";
  const [urlState, setUrlState] = React.useState<string>("");
  const [value, setValue] = React.useState<IShortner[]>(
    getStoredURLs(localStorageKey)
  );

  const handleInputChange = (e: { target: { value: any } }) => {
    setUrlState(e.target.value);
  };

  const handleClick = () => {
    props.shortenUrlAction({ url: urlState });
  };

  const handleCopy = (v?: string) => {
    copy(v || "").then(() => toast.info("Copied to clipboard!"));
  };

  React.useEffect(() => {
    if (props.shortenUrl.state == "success") {
      let value = getStoredURLs(localStorageKey);
      value.unshift(props.shortenUrl);
      localStorage.setItem(localStorageKey, JSON.stringify(value));
      setValue(getStoredURLs(localStorageKey));
    } else if (props.shortenUrl.state == "error") {
      toast.error(props.shortenUrl.error);
    }
  }, [props.shortenUrl.state]);

  return (
    <React.Fragment>
      <section className="bg-half-170 d-table w-100 bg-white" id="home">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 col-md-7">
              <div className="title-heading mt-4">
                <h1 className="heading mb-3">Create Click-Worthy Links</h1>
                <p className="para-desc text-muted">
                  Build and protect your brand using powerful, recognizable
                  short links.
                </p>
                <div className="mt-4">
                  <Link
                    to="/urlshortener"
                    className="btn btn-primary mt-2 mr-2"
                  >
                    <i className="mdi mdi-rocket" /> Get started for free
                  </Link>
                  {/* <a href="#" className="btn btn-outline-primary mt-2">
                    <i className="mdi mdi-book-outline"></i> Documentation
                  </a> */}
                </div>
              </div>
            </div>

            <div className="col-lg-5 col-md-5 mt-4 pt-2 mt-sm-0 pt-sm-0 hero-img">
              <img src="images/illustrator/link_shortener.svg" />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-darkest border-bottom mid-container">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <div className="section-title mb-4 pb-2">
                <h4 className="title mb-4">Simplify your links</h4>
                <p className="text-muted para-desc mb-0 mx-auto">
                  Shorten your URL so it&lsquo;s ready to be shared everywhere
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-12 text-center">
              <input
                name="name"
                id="name"
                type="text"
                className="form-control"
                placeholder="Your original URL"
                onChange={handleInputChange}
                onKeyDown={e => (e.keyCode === 13 ? handleClick() : undefined)}
              />
              <Button
                loading={props.shortenUrl.state === "loading"}
                className="btn btn-primary mt-4"
                onClick={handleClick}
              >
                Shorten URL
              </Button>
            </div>
          </div>
          <div className="url-shortner mt-3">
            {(value || []).map((url, i) => {
              return (
                <div key={i} className="url-shortner-row">
                  <div className="row d-flex align-items-center">
                    <div className="col-lg-8 col-md-12 col-sm-12 text-muted shorten-url">
                      <p>{url.long_url}</p>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6 ">
                      <a
                        target="_blank"
                        href={url.url}
                        rel="noopener noreferrer"
                      >
                        {url.url}
                      </a>
                    </div>
                    <div className="col-lg-1 col-md-6 col-sm-6">
                      <Button
                        className="btn btn-primary"
                        onClick={() => {
                          handleCopy(url.url);
                        }}
                      >
                        <i className="mdi mdi-content-copy" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section bg-white border-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12 ">
              <div className="section-title text-center">
                <h4 className="title mb-4">
                  Grow your website with
                  <span className="text-primary">&nbsp;Social9&nbsp;</span>
                </h4>
                <p className="text-muted para-desc mb-0 mx-auto">
                  Attract an insane amount of traffic from Social Media like
                  Facebook, Twitter and many more. All you need is an easy to
                  setup and eye catching share buttons that will make visitors
                  spread your awesome content.
                </p>
                {/* <button className="btn btn-primary btn-block col-lg-2 col-md-4 col-sm-3 ml-auto mr-auto mt-5">
                  
                </button> */}
                <Link
                  to="/signup?redirect=/tools/new"
                  className="btn btn-primary mt-4"
                >
                  Sign Up for Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

const mapState = (state: RootSchema) => {
  return {
    shortenUrl: state.shortner.shortenUrl,
  };
};

const mapDispatch = (dispatch: Dispatch) => {
  return {
    shortenUrlAction: (args: IShortenUrlArgs) =>
      dispatch(shortUrlAction.dispatch(args)),
  };
};

export default connect(mapState, mapDispatch)(PublicShortener);
