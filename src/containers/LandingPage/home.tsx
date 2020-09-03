import * as React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = React.memo(() => {
  return (
    <React.Fragment>
      <section className="bg-half-170 d-table w-100 bg-white" id="home">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 col-md-7">
              <div className="title-heading mt-4">
                <h1 className="heading mb-3">
                  Grow Your Audience
                  <br />
                  By leverging the Power of
                  <br />
                  <span className="text-primary">Social Media</span>
                </h1>
                <p className="para-desc text-muted">
                  Start driving more traffic and increase engagement by
                  leverging the power of social media.
                </p>
                <div className="mt-4">
                  <Link
                    to="/signup?redirect=/tools/new"
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
              <img src="images/illustrator/happy.svg" alt="Buffer" />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-light border-bottom mid-container">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <div className="section-title mb-4 pb-2">
                <h4 className="title mb-4">Simple, Stylish, and Free!</h4>
                <p className="text-muted para-desc mb-0 mx-auto">
                  Start working with
                  <span className="text-primary font-weight-bold">
                    &nbsp;Social9&nbsp;
                  </span>
                  and take Social Sharing to the Next Level with Style. Grow
                  your audience. Keep them engaged. Do it for FREE!
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6 mt-4 pt-2">
              <div className="card text-center bg-transparent border-0">
                <div className="card-body p-0">
                  <div className="">
                    <img
                      src="images/illustrator/visual_data.svg"
                      className="img-fluid avatar avatar-medium"
                      alt="Visual Data"
                    />
                  </div>
                  <div className="content pt-3 pb-3">
                    <h5 className="mb-0">Increase Website Traffic</h5>
                    <small className="text-muted">
                      Drive new and returning visitors to your website.
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mt-4 pt-2">
              <div className="card text-center bg-transparent border-0">
                <div className="card-body p-0">
                  <div className="">
                    <img
                      src="images/illustrator/random_thoughts.svg"
                      className="img-fluid avatar avatar-medium"
                      alt="Random Thoughts"
                    />
                  </div>
                  <div className="content pt-3 pb-3">
                    <h5 className="mb-0">Generate Brand Awareness</h5>
                    <small className="text-muted">
                      Reach a wider audience. Grow your brand&apos;s reach on a
                      global scale.
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mt-4 pt-2">
              <div className="card text-center bg-transparent border-0">
                <div className="card-body p-0">
                  <div className="">
                    <img
                      src="images/illustrator/design_inspiration.svg"
                      className="img-fluid avatar avatar-medium"
                      alt="Design Inspiration"
                    />
                  </div>
                  <div className="content pt-3 pb-3">
                    <h5 className="mb-0">Better Design</h5>
                    <small className="text-muted">
                      Full of design options for seamless design integration.
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mt-4 pt-2">
              <div className="card text-center bg-transparent border-0">
                <div className="card-body p-0">
                  <div className="">
                    <img
                      src="images/illustrator/speed_test.svg"
                      className="img-fluid avatar avatar-medium"
                      alt="Speed Test"
                    />
                  </div>
                  <div className="content pt-3 pb-3">
                    <h5 className="mb-0">Super Fast</h5>
                    <small className="text-muted">
                      Lightning speed to provide a excellent performance and
                      experience
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row align-items-center my-100 share-buttons">
            <div className="col-lg-7 col-md-6 mt-4 pt-2">
              <div className="section-title">
                <h4 className="title mb-4">Share Buttons</h4>
                <p className="text-muted w-75">
                  Pick and choose where you would like to show your share
                  buttons. All positions are highly customizable & optimized to
                  increase your shares.
                </p>
                <div className="button-wrapper d-flex justify-content-between flex-wrap w-75">
                  <div className="sharing-buttons inline d-flex align-items-center">
                    <div className="icon" />
                    <div>Inline</div>
                  </div>
                  <div className="sharing-buttons floating d-flex align-items-center">
                    <div className="icon" />
                    <div>Floating</div>
                  </div>
                  <div className="sharing-buttons banner d-flex align-items-center disabled">
                    <div className="icon" />
                    <div>Banner</div>
                  </div>
                  <div className="sharing-buttons expanding d-flex align-items-center disabled">
                    <div className="icon" />
                    <div>Expanding</div>
                  </div>
                  <div className="sharing-buttons popup d-flex align-items-center disabled">
                    <div className="icon" />
                    <div>Popup</div>
                  </div>
                  <div className="sharing-buttons slider d-flex align-items-center disabled">
                    <div className="icon" />
                    <div>Slider</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-6 mt-4 pt-2">
              <img
                src="images/preview.png"
                width="650"
                className="floating-preview"
                alt="Floating Widget"
              />
            </div>
          </div>
          <div className="row align-items-center my-100 advanced-statistics">
            <div className="col-lg-5 col-md-6 mt-4 pt-2">
              <img
                src="images/dashboard.png"
                className="floating-preview dashboard-img"
                width="650"
                alt="Social9 Dashboard"
              />
            </div>
            <div className="col-lg-7 col-md-6 mt-4 pt-2">
              <div className="section-title ml-lg-5">
                <h4 className="title mb-4">Advanced statistics</h4>
                <p className="text-muted">
                  An overview of your
                  <span className="text-primary font-weight-bold">
                    &nbsp;Social9&nbsp;
                  </span>
                  statistics can be accessed at any time via the dashboard. Just
                  click the stats icon in the upper right for statistics around
                  your shares.
                </p>
              </div>
            </div>
          </div>
          <div className="row align-items-center my-100">
            <div className="col-lg-7 col-md-6 mt-4 pt-2">
              <div className="section-title">
                <h4 className="title mb-4">UI Configuration</h4>
                <p className="text-muted w-75">
                  <span className="text-primary font-weight-bold">
                    Social9&nbsp;
                  </span>
                  lets you refine your display settings to fit your every need.
                  Animations share count display minimums and structures are
                  just a few of the things you can control.
                </p>
              </div>
            </div>
            <div className="col-lg-5 col-md-6 mt-4 pt-2">
              <img
                src="images/configuration.png"
                className="floating-preview"
                width="650"
                alt="Social9 Configuration"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <div className="section-title mb-4 pb-2">
                <h4 className="title mb-4">How It Work?</h4>
                <p className="text-muted para-desc mx-auto mb-0">
                  <span className="text-primary font-weight-bold">
                    Social9&nbsp;
                  </span>
                  lets you harness tha activity and use it as a positive force
                  for your business. Choose from social sharing networks to
                  display on your website to create a custom collection of
                  sharing options for your visitors.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4 col-md-6 mt-4 pt-2">
              <div className="card text-center bg-light border-0">
                <div className="card-body p-0">
                  <div className="">
                    <img
                      src="images/illustrator/select-design.svg"
                      className="img-fluid avatar avatar-ex-large"
                      alt="Social9 Design"
                    />
                  </div>
                  <div className="content pt-3 pb-3">
                    <h5 className="mb-0">Select Design</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mt-4 pt-2">
              <div className="card text-center bg-light border-0">
                <div className="card-body p-0">
                  <div className="">
                    <img
                      src="images/illustrator/style.svg"
                      className="img-fluid avatar avatar-ex-large"
                      alt="Social9 Themes"
                    />
                  </div>
                  <div className="content pt-3 pb-3">
                    <h5 className="mb-0">Style</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mt-4 pt-2">
              <div className="card text-center bg-light border-0">
                <div className="card-body p-0">
                  <div className="">
                    <img
                      src="images/illustrator/progress_tracking.svg"
                      className="img-fluid avatar avatar-ex-large"
                      alt="Analytics"
                    />
                  </div>
                  <div className="content pt-3 pb-3">
                    <h5 className="mb-0">Configure</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section bg-light border-bottom">
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

      <section className="section bg-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-12">
              <div className="media">
                <i
                  data-feather="help-circle"
                  className="fea icon-ex-md text-primary mr-2 mt-1"
                />
                <div className="media-body">
                  <h5 className="mt-0">
                    What is
                    <span className="text-primary">&nbsp;Social9?&nbsp;</span>
                  </h5>
                  <p className="answer text-muted mb-0">
                    <span className="text-primary">Social9&nbsp;</span>
                    is the content sharing platform. We provide tools that make
                    it easier to share content across the social, web and
                    provide publishers with increased traffic and in-depth
                    analytics.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
              <div className="media">
                <i
                  data-feather="help-circle"
                  className="fea icon-ex-md text-primary mr-2 mt-1"
                />
                <div className="media-body">
                  <h5 className="mt-0">How does it work?</h5>
                  <p className="answer text-muted mb-0">
                    <span className="text-primary">Social9&nbsp;</span>
                    provides publishers with a small amount of HTML and
                    Javascript code that displays sharing tools on pages and
                    captures information about their usage.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-12 mt-4 pt-2">
              <div className="media">
                <i
                  data-feather="help-circle"
                  className="fea icon-ex-md text-primary mr-2 mt-1"
                />
                <div className="media-body">
                  <h5 className="mt-0">
                    How much does
                    <span className="text-primary">&nbsp;Social9&nbsp;</span>
                    cost?
                  </h5>
                  <p className="answer text-muted mb-0">
                    Nothing!
                    <span className="text-primary">&nbsp;Social9&nbsp;</span>
                    is absolutely free for anyone to install on their website or
                    blog.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-12 mt-4 pt-2">
              <div className="media">
                <i
                  data-feather="help-circle"
                  className="fea icon-ex-md text-primary mr-2 mt-1"
                />
                <div className="media-body">
                  <h5 className="mt-0">
                    Do I have to register for social networks to use
                    <span className="text-primary">&nbsp;Social9&nbsp;</span>
                    tools?
                  </h5>
                  <p className="answer text-muted mb-0">
                    You do not have to register for the social networks to use
                    our sharing tools
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-12 mt-4 pt-2">
              <div className="media">
                <i
                  data-feather="help-circle"
                  className="fea icon-ex-md text-primary mr-2 mt-1"
                />
                <div className="media-body">
                  <h5 className="mt-0">
                    Can you handle the traffic from my very popular web site?
                  </h5>
                  <p className="answer text-muted mb-0">
                    Absolutely! We have tested the tools for maximum load and it
                    allows us to serve even the most popular sites.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12 mt-4 pt-2">
              <div className="media">
                <i
                  data-feather="help-circle"
                  className="fea icon-ex-md text-primary mr-2 mt-1"
                />
                <div className="media-body">
                  <h5 className="mt-0">
                    Why not just make my own sharing tool?
                  </h5>
                  <p className="answer text-muted mb-0">
                    Because
                    <span className="text-primary">&nbsp;Social9&nbsp;</span>
                    is working on much more functionality for their customer can
                    be used for free. Our personalization tools make it easy to
                    offer the right sharing services to the right user at the
                    right time. We will continue the development to provide more
                    features that help in Growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
});

export default HomePage;
