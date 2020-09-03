import * as React from "react";
import { useLocation } from "react-router-dom";
import ContactForm from "../../components/ContactForm";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Comparison from "./comparison";
import HomePage from "./home";
import "./landing_page.scss";
import PublicShortener from "./public_shortener";

export interface LandingPageProps {
  type?: "home" | "public_shortener" | "comparison";
}

const LandingPage: React.FC<LandingPageProps> = React.memo(props => {
  const [pageLoaded, setPageLoaded] = React.useState<boolean>(false);
  const path = useLocation().pathname;

  // Update page title
  React.useEffect(() => {
    document.title = "Titan | Publish Site";
    setPageLoaded(true);
    return () => {
      document.title = "Titan Console";
    };
  }, [pageLoaded]);

  // Scroll to top on type change
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 100, behavior: "smooth" });
  }, [path]);

  return (
    <React.Fragment>
      <div id="preloader" style={{ display: pageLoaded ? "none" : "block" }}>
        <div id="status">
          <div className="spinner">
            <div className="double-bounce1" />
            <div className="double-bounce2" />
          </div>
        </div>
      </div>
      <div id="landing-page">
        <Header />
        {props.type === "public_shortener" ? (
          <PublicShortener />
        ) : props.type === "comparison" ? (
          <Comparison />
        ) : (
          <HomePage />
        )}
        <ContactForm />
        <Footer />

        <a
          href="#"
          className="back-to-top rounded text-center"
          id="back-to-top"
        >
          <i data-feather="chevron-up">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-chevron-up icons d-inline-block"
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </i>
        </a>
      </div>
    </React.Fragment>
  );
});

export default LandingPage;
