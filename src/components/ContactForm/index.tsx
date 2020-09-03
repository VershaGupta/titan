import * as React from "react";

export interface ContactFormProps {}

const ContactForm: React.FC<ContactFormProps> = React.memo(props => {
  return (
    <section className="section bg-light" id="contact">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <div className="section-title mb-4 pb-2">
              <h4 className="title mb-4">
                Have Question or Suggestions? Get in touch!
              </h4>
              <p className="text-muted para-desc mb-0 mx-auto">
                Start working with
                <span className="text-primary font-weight-bold">
                  &nbsp;Social9&nbsp;
                </span>
                that can provide everything you need to generate awareness,
                drive traffic, connect.
              </p>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-9 mt-4 pt-2">
            <div className="custom-form">
              <div id="message-box" />
              <form
                method="post"
                action="https://formsubmit.io/send/ddea4ab3-0b32-482d-b946-17d8c4ac7a80"
                name="contact-form"
                id="contact-form"
              >
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        name="_redirect"
                        type="hidden"
                        id="redirect"
                        value=""
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        name="_formsubmit_id"
                        type="text"
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        name="name"
                        id="name"
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        name="email"
                        id="email"
                        type="email"
                        className="form-control"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <input
                        name="subject"
                        id="subject"
                        className="form-control"
                        placeholder="Your subject"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <textarea
                        name="message"
                        id="message"
                        rows={4}
                        className="form-control"
                        placeholder="Your Message"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 text-right">
                    <input
                      type="submit"
                      id="submit"
                      className="submitBnt btn btn-primary"
                      value="Submit"
                    />
                    <div id="simple-msg" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default ContactForm;
