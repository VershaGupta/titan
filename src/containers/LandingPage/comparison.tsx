import * as React from "react";
import { useHistory, useParams } from "react-router-dom";

const FEATURES = [
  "Pricing",
  "Sells Your Data",
  "Page View",
  "Core Sharing Tools",
  "Mobile Sharing Tools",
  "SEO Friendliness",
  "No. Of Social Share Plugins",
  "Get Sharing Without Registration",
  "Integration With Google Analytics",
  "Facebook Page Like Feature",
  "No. Of Social Sharing Providers",
];

const COMPETITORS = {
  social9: [
    "Free",
    "☓",
    "Unlimited",
    "✓",
    "✓",
    "✓",
    "18",
    "✓",
    "✓",
    "✓",
    "50+",
  ],
  addthis: [
    "$325/month",
    "✓",
    "Limited",
    "✓",
    "✓",
    "✓",
    "4",
    "☓",
    "☓",
    "☓",
    "200+",
  ],
  sharethis: ["Free", "✓", "Limited", "✓", "✓", "✓", "-", "☓", "☓", "☓", "25"],
  sumome: [
    "Free & Paid(from $29/month)",
    "-",
    "Limited",
    "✓",
    "✓",
    "✓",
    "7",
    "X",
    "✓ (Paid version)",
    "X",
    "-",
  ],
  shareholic: [
    "Free & Paid (From $95/month)",
    "✓",
    "Limited",
    "✓",
    "✓",
    "✓",
    "29",
    "X",
    "✓",
    "✓",
    "87",
  ],
};

// Check if the source array contains all dest array items
function all(srcArr: string[], destArr: string[]) {
  for (let val of destArr) {
    if (!srcArr.includes(val)) {
      return false;
    }
  }
  return true;
}

const Comparison: React.FC = React.memo(() => {
  const { other, others } = useParams();

  const compare = other ? [other] : others ? others.split("-") : [];
  const competitors = Object.keys(COMPETITORS);

  // Invalid case
  if (compare.length === 0 || !all(competitors, compare)) {
    useHistory().push("/");
    return null;
  }

  return (
    <React.Fragment>
      <section className="bg-half bg-light d-table w-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12 text-center">
              <div className="page-next-level">
                <h4 className="title"> Why use Social9? </h4>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="position-relative bg-white">
        <div className="shape overflow-hidden text-white">
          <svg
            viewBox="0 0 2880 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
      <div className="blog-content bg-white">
        <section className="section">
          <div className="container">
            <div className="row align-items-center justify-content-between blog-content-inner">
              <div className=" mt-4 pt-2 blog-content-block">
                <div className="card pricing-rates business-rate shadow bg-light rounded text-center border-0">
                  <div className="card-body py-5">
                    <h2 className="title mb-4">Features</h2>
                    <ul className="feature list-unstyled pl-0">
                      {FEATURES.map((feature, index) => {
                        return (
                          <li className="feature-list text-muted" key={index}>
                            {feature}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              {renderColumns(["social9", ...compare])}
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
});

const renderColumns = (columns: string[]) => {
  return (
    <React.Fragment>
      {columns.map((column, index) => {
        return (
          <div key={index} className="mt-4 pt-2 blog-content-block">
            <div className="card pricing-rates business-rate shadow bg-light rounded text-center border-0">
              <div className="card-body py-5">
                <h2 className="title mb-4">{column}</h2>
                <ul className="feature list-unstyled pl-0">
                  {(COMPETITORS as any)[column].map(
                    (feature: string, index: number) => {
                      return (
                        <li className="feature-list text-muted" key={index}>
                          {feature}
                        </li>
                      );
                    }
                  )}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default Comparison;
