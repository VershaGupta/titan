import * as React from "react";
import { Link } from "react-router-dom";

export interface FooterProps {}

const Footer: React.FC<FooterProps> = React.memo(props => {
  return (
    <div id="landing-page">
      <footer className="footer ">
        <div className="container ">
          <div className="row">
            <div className="col-lg-3 col-12 mb-0 mb-md-4 pb-0 pb-md-2">
              <Link className="logo-footer" to="/">
                Titan
              </Link>
              <p className="mt-4">
                Deploy, Generate Site with zero configuration
              </p>
              <div className="social d-flex">
                {/* <Link
            to="/"
            className="facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="mdi mdi-facebook"></i>
          </Link> */}

                {/* <a
                  href="https://www.linkedin.com/company/social9/"
                  className="linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="mdi mdi-linkedin"></i>
                </a>
                <a
                  href="https://twitter.com/Social9dotcom"
                  className="twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="mdi mdi-twitter"></i>
                </a> */}
              </div>
            </div>
            <div className="col-lg-3 col-12 mb-0 mb-md-4 pb-0 pb-md-2">
              <h4 className="text-light footer-head">Quick Links</h4>
              <ul className="list-unstyled footer-list mt-4">
                <li>
                  <Link className="text-foot" to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-foot"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-foot"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Docs
                  </a>
                </li>
                <li>
                  <Link className="text-foot" to="/shorturl">
                    ULR Shortener
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-foot"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Roadmap
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-foot"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Report a bug
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    className="text-foot"
                    rel="noopener noreferrer"
                  >
                    RSS Feed
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-12 mb-0 mb-md-4 pb-0 pb-md-2">
              <h4 className="text-light footer-head">Social Vs</h4>
              {/* <ul className="list-unstyled footer-list mt-4">
                <li>
                  <Link className="text-foot" to="/social9vsaddthis">
                    Vs AddThis
                  </Link>
                </li>
                <li>
                  <Link className="text-foot" to="/social9vssharethis">
                    Vs ShareThis
                  </Link>
                </li>
                <li>
                  <Link className="text-foot" to="/social9vsshareholic">
                    Vs Shareholic
                  </Link>
                </li>
                <li>
                  <Link className="text-foot" to="/social9vssumome">
                    Vs Sumome
                  </Link>
                </li>
                <li>
                  <Link className="text-foot" to="/social9vs-addthis-sharethis">
                    Vs AddThis Vs ShareThis
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-foot"
                    to="/social9vs-addthis-shareholic"
                  >
                    Vs AddThis Vs Shareholic
                  </Link>
                </li>
                <li>
                  <Link className="text-foot" to="/social9vs-sharethis-sumome">
                    Vs ShareThis Vs Sumome
                  </Link>
                </li>
                <li>
                  <Link className="text-foot" to="/social9vs-sharethis-sumome">
                    Vs ShareThis Vs Shareholic
                  </Link>
                </li>
              </ul>*/}
            </div>
            <div className="col-lg-3 col-12 mb-0 mb-md-4 pb-0 pb-md-2">
              <h4 className="text-light footer-head">Newsletter</h4>
              <p className="mt-4">
                Sign up and receive the latest tips via email.
              </p>
              <form>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="foot-subscribe form-group position-relative">
                      <label>
                        Write your email
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="emailsubscribe"
                        className="form-control rounded"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <input
                      type="submit"
                      id="submitsubscribe"
                      name="send"
                      className="btn btn-primary btn-block"
                      value="Subscribe"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="footer footer-bar">
          <div className="col-sm-12 ">
            <div className="text-center d-flex justify-content-center">
              <p className="mb-0">© 2020 All Rights Reserved.</p>
              <ul className="d-flex p-0 list-unstyled footer-list ">
                <li>
                  <Link className="text-foot" to="/">
                    Terms of use
                  </Link>
                </li>
                <li>
                  <Link className="text-foot" to="/">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
});

export default Footer;
