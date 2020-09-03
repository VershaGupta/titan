import React, { useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { Image, Message, Modal, Tab } from "semantic-ui-react";
import RulesImage from "../../assets/images/rules-tab.png";
import S9Container from "../../assets/images/s9-container.png";
import Code from "../../components/Code";
import CopyButton from "../../components/CopyButton";
import InfoModal from "../../components/InfoModal";
import { RootSchema } from "../../redux/reducers";
import { getFileName, getInstallationCode } from "../../utils";
import "./Installation.scss";

export interface InstallationProps {
  uid: string;
}

const Installation: React.FC<InstallationProps> = React.memo(props => {
  const loc = useLocation();
  const { container, type } = (loc.state as any) || {};

  const panes = [
    {
      menuItem: "HTML",
      render: () => (
        <Tab.Pane>
          <HTMLInstallation uid={props.uid} container={container} type={type} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Wordpress",
      render: () => (
        <Tab.Pane>
          <WordpressInstallation uid={props.uid} />
        </Tab.Pane>
      ),
    },

    {
      menuItem: "Gatsby",
      render: () => (
        <Tab.Pane>
          <GatsbyInstallation uid={props.uid} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Blogger",
      render: () => (
        <Tab.Pane>
          <BloggerInstallation uid={props.uid} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "BigCommerce",
      render: () => (
        <Tab.Pane>
          <BigCommerceInstallation uid={props.uid} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Tumblr",
      render: () => (
        <Tab.Pane>
          <TumblrInstallation uid={props.uid} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "NextJS",
      render: () => (
        <Tab.Pane>
          <NextJSInstallation uid={props.uid} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Magento",
      render: () => (
        <Tab.Pane>
          <MagentoInstallation uid={props.uid} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Weebly",
      render: () => (
        <Tab.Pane>
          <WeeblyInstallation uid={props.uid} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Wix",
      render: () => (
        <Tab.Pane>
          <WixInstallation uid={props.uid} />
        </Tab.Pane>
      ),
    },
  ];

  const hash = window.decodeURI(loc.hash.replace("#", ""));
  const hashIndex = panes.findIndex(
    pane => pane.menuItem.toLowerCase() === hash
  );
  const [selectedIndex, updateSelectedIndex] = useState<number>(
    hashIndex === -1 ? 0 : hashIndex
  );

  return (
    <div className="get-code page-content">
      <section>
        <div className="content">
          <div className="full-container">
            <div className="page-title d-flex align-items-center justify-content-between pb-3 mb-5">
              <div className="title">
                <h2>Installation</h2>
              </div>
            </div>
            <div className="installation-tab" id="custom-tab">
              <Tab
                activeIndex={selectedIndex}
                onTabChange={(e, data) => {
                  const index = +(data.activeIndex || 0);
                  updateSelectedIndex(index);

                  const newHash = `#${data.panes?.[
                    index
                  ].menuItem.toLowerCase()}`;
                  window.history.replaceState(null, "", newHash);
                }}
                menu={{ fluid: true, vertical: true, tabular: true }}
                panes={panes}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

const HTMLInstallation: React.FC<{
  uid: string;
  container?: string;
  type?: "inline" | "floating";
}> = React.memo(({ uid, container, type }) => {
  const setup1 = `<html>
    <head>
      <title>My Awesome Site!</title>
    </head>
    <body>
      <h1>Where to add the code snippet?</h1>
      <p>It should be right before the closing body tag.</p>`;
  const setup2 = `    </body>
</html>`;
  const setup3 = container
    ? container.startsWith(".")
      ? `<div class="${container.substr(1)}"></div>`
      : `<div id="${container.substr(1)}"></div>`
    : `<div class="s9-widget-wrapper"></div>`;

  const code = getInstallationCode(uid);

  return (
    <ul className="code-steps html">
      <li className="code-steps__item code-steps__item--completed">
        <p className="code-steps__title">
          Add the following snippet in your site
        </p>
        <p className="code-steps__info">
          This is an one-time setup. You can always configure your widgets from
          the console and the changes will reflect instantly!
        </p>
        <div className="d-flex justify-content-between code-view with-button mb-3 mt-3">
          <div>
            <pre>
              <code>{code}</code>
            </pre>
          </div>
          <div>
            <CopyButton content={code} />
          </div>
        </div>
      </li>
      <li className="code-steps__item code-steps__item--active">
        <p className="code-steps__title">Where to add?</p>
        <p className="code-steps__info">
          Just paste the above code snippet right before the closing{" "}
          <strong className="body-tag">body</strong> tag in your HTML file.
        </p>
        <div className="d-flex justify-content-between code-view  mb-3 mt-3">
          <div>
            <pre>
              <code>{setup1}</code>
              <div className="paste-here">Paste here</div>
              <code>{setup2}</code>
            </pre>
          </div>
        </div>
      </li>
      {type === "inline" || type === undefined ? (
        <li className="code-steps__item">
          <p className="code-steps__title">For Inline Tools Only</p>
          <p className="code-steps__info">
            If you&apos;ve created an inline widget, then please make sure that
            the below snippet exists in your site.
          </p>
          <p className="code-steps__subtitle">
            The widget will be rendered here
          </p>
          <div className="d-flex justify-content-between code-view with-button  mb-3 mt-3">
            <div>
              <pre>
                <code>{setup3}</code>
              </pre>
            </div>
            <CopyButton content={code} />
          </div>
          {!container ? (
            <React.Fragment>
              <strong className="text-center d-block my-3">Or</strong>
              <p className="code-steps__info">
                You can customize this by adding the ID (#custom-container-id)
                or ClassName (.custom-container-class) in the{" "}
                <InfoModal content="Parent Container Selector">
                  <Modal.Header>
                    What is a Parent Container Selector?
                  </Modal.Header>
                  <Modal.Content>
                    <Modal.Description>
                      <p>
                        Unlike any other widget, the inline type requires a
                        parent element to associate itself with. That parent
                        element acts as a container for the widget to render.
                      </p>
                      <p>
                        You can provider either an{" "}
                        <Code>
                          id <b>(#s9-id-container)</b>
                        </Code>{" "}
                        or the{" "}
                        <Code>
                          class <b>(.s9-class-container)</b>
                        </Code>{" "}
                        name to identify the element in the page. <br />
                        <strong>Note:</strong> <Code>class</Code> is useful when
                        multiple instances of the same widget are required e.g.
                        a news page with multiple cards.
                      </p>
                      <Image
                        src={S9Container}
                        alt="Social9 Container Selector"
                      />
                    </Modal.Description>
                  </Modal.Content>
                </InfoModal>{" "}
                field under the{" "}
                <InfoModal content="Rules">
                  <Modal.Header>
                    Parent Container Selection in Rules Section
                  </Modal.Header>
                  <Modal.Content>
                    <Modal.Description>
                      <Image
                        src={RulesImage}
                        alt="Social9 Container Selector"
                      />
                    </Modal.Description>
                  </Modal.Content>
                </InfoModal>{" "}
                section.
              </p>

              <Message info>
                {/* <Message.Header>Note:</Message.Header> */}
                <p>
                  <strong>Note: </strong>Class is useful when multiple instances
                  of the same widget are required e.g. a news page with multiple
                  cards.
                </p>
              </Message>
            </React.Fragment>
          ) : null}
        </li>
      ) : null}
      {/* <li className="code-steps__item">
        <p className="code-steps__title">Verify Installation</p>
        <p className="code-steps__info">Coming soon!</p>
      </li> */}
    </ul>
  );
});

const WordpressInstallation: React.FC<{ uid: string }> = React.memo(props => {
  const setup1 = getInstallationCode(props.uid);
  const setup2 = `function social_share_top_of_page($content){	
        $before = "<div id='YOUR_CREATED_INTERFACE_ID'"></div>;
	$content = $before . $content; 
	return $content;
}
add_filter ('the_content','social_share_top_of_page');
;
`;
  const setup3 = `function social_share_bottom_of_page($content){	
        $after = "<div id='YOUR_CREATED_INTERFACE_ID'"></div>;
	$content = $content.$after; 
	return $content;
}
add_filter ('the_content','social_share_bottom_of_page');
;
`;

  return (
    <ul className="code-steps wordpress">
      <li className="code-steps__item code-steps__item--completed">
        <p className="code-steps__title">Apply Vertical Interface</p>
        <p className="code-steps__info">
          Add the following line of code before {"</head>"} in your activated
          WordPress Theme’s header.php file. It’s on path
          <strong className="body-tag">
            `wp-content/themes/YOUR_ACTIVATED_THEME_DIR`
          </strong>
        </p>

        <div className="d-flex justify-content-between code-view with-button  mb-3 mt-3">
          <div>
            <pre>
              <code>{setup1}</code>
            </pre>
          </div>
          <CopyButton content={setup1} />
        </div>
      </li>
      <li className="code-steps__item code-steps__item--active">
        <p className="code-steps__title">
          Apply Horizontal Interface Before Article
        </p>
        <p className="code-steps__info">
          1. Follow the steps for <strong>Apply Vertical Interface</strong>.
        </p>
        <p className="code-steps__info">
          2. Add Following line of code in your activated Wordpress Theme’s
          functions.php file. It’s on path{" "}
          <strong className="body-tag">
            `wp-content/themes/YOUR_ACTIVATED_THEME_DIR`
          </strong>
        </p>
        <div className="d-flex justify-content-between code-view with-button  mb-3 mt-3">
          <div>
            <pre>
              <code>{setup2}</code>
            </pre>
          </div>
          <CopyButton content={setup2} />
        </div>
      </li>
      <li className="code-steps__item">
        <p className="code-steps__title">
          Apply Horizontal Interface After Article
        </p>
        <p className="code-steps__info">
          1. Follow the steps for <strong>Apply Vertical Interface</strong>.
        </p>
        <p className="code-steps__info">
          2. Add Following line of code in your activated Wordpress Theme’s
          functions.php file. It’s on path{" "}
          <strong className="body-tag">
            `wp-content/themes/YOUR_ACTIVATED_THEME_DIR`
          </strong>
        </p>
        <div className="d-flex justify-content-between code-view with-button  mb-3 mt-3">
          <div>
            <pre>
              <code>{setup3}</code>
            </pre>
          </div>
          <CopyButton content={setup3} />
        </div>
      </li>
    </ul>
  );
});

const GatsbyInstallation: React.FC<{ uid: string }> = React.memo(props => {
  const setup1 = `plugins: [
    ......  
    ......
    {
      resolve: "gatsby-plugin-load-script",
      options: {
        id: "s9-sdk",
        async: true,
        defer: true,
        content: "${props.uid}",
        src: "${getFileName()}"
      },
    },
    ………………
    ………………
]
`;

  const setup2 = `<div id="YOUR_CREATED_INTERFACE_ID"></div>`;

  return (
    <ul className="code-steps wordpress">
      <li className="code-steps__item code-steps__item--completed">
        <p className="code-steps__title">Apply Vertical Interface</p>
        <p className="code-steps__info">1. Open your gatsby project</p>
        <p className="code-steps__info">
          2. Find file gatsby-config.js and add the following line of code under
          plugins
        </p>
        <div className="d-flex justify-content-between code-view with-button mb-3 mt-3">
          <div>
            <pre>
              <code>{setup1}</code>
            </pre>
          </div>
          <CopyButton content={setup1} />
        </div>
        <p className="code-steps__info">
          3. Save file and Run <code>npm i gatsby-plugin-load-script</code>
        </p>
        <p className="code-steps__info">
          4. Now you can start your gatsby server and you are ready to use
          Social9 share buttons
        </p>
      </li>

      <li className="code-steps__item code-steps__item--completed">
        <p className="code-steps__title">Apply Horizontal Interface Article</p>
        <p className="code-steps__info">
          1. Follow steps for <strong>Apply Vertical Interface</strong>
        </p>
        <p className="code-steps__info">
          2. Go to your theme specific layout there under <code>src</code>{" "}
          directory where you want to add horizontal interface.
        </p>

        <p className="code-steps__info">
          3. Add follwoing snippet at top (for horizontal interface at post top)
          and at bottom (for horizontal interface at post bottom) in your single
          post layout template.
        </p>
        <div className="d-flex justify-content-between code-view with-button  mb-3 mt-3">
          <div>
            <pre>
              <code>{setup2}</code>
            </pre>
          </div>
          <CopyButton content={setup2} />
        </div>
      </li>
    </ul>
  );
});

const BloggerInstallation: React.FC<{ uid: string }> = React.memo(props => {
  const setup1 = getInstallationCode(props.uid);
  const setup2 = `<div class="s9-widget-wrapper"></div>`;
  return (
    <React.Fragment>
      <ul className="code-steps wordpress">
        <li className="code-steps__item code-steps__item--completed">
          <p className="code-steps__title">
            Add Social9 buttons to your website by one click.
          </p>
          <p className="code-steps__info">
            <a
              className="btn btn-primary mt-2 mr-2"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.blogger.com/add-widget?logoUrl=https://social9.com/images/logo.svg&infoUrl=https://social9.com&widget.title=Social9 Share&widget.content=${getInstallationCode(
                props.uid
              )}></script>`}
            >
              {" "}
              Add Social9 Buttons
            </a>{" "}
          </p>
        </li>
      </ul>
      <strong className="text-center d-block my-3">Or do manually</strong>
      <ul className="code-steps wordpress">
        <li className="code-steps__item code-steps__item--completed">
          <p className="code-steps__title">Apply Vertical Interface</p>
          <p className="code-steps__info">
            1. Login to{" "}
            <a
              href="https://blogger.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Blogger.com{" "}
            </a>
          </p>
          <p className="code-steps__info">2. Go to Theme at right sidebar</p>
          <p className="code-steps__info">
            3. Click on Edit HTML button under the theme edit menu with 3 dot.
          </p>
          <p className="code-steps__info">
            4. Add following script at bottom of this page just before{" "}
            <strong className="body-tag">{"</body>"}</strong> tag
          </p>
          <div className="d-flex justify-content-between code-view with-button  mb-3 mt-3">
            <div>
              <pre>
                <code>{setup1}</code>
              </pre>
            </div>
            <CopyButton content={setup1} />
          </div>
          <p className="code-steps__info">
            5. Hit the save button and it’s ready to use.
          </p>
        </li>
        <li className="code-steps__item code-steps__item--completed">
          <p className="code-steps__title">
            Apply Horizontal Interface Before Article
          </p>
          <p className="code-steps__info">1. Login to Blogger.com</p>
          <p className="code-steps__info">2. Go to Theme at right sidebar</p>
          <p className="code-steps__info">
            3. Click on Edit HTML button under the theme edit menu with 3 dot.
          </p>
          <p className="code_steps__info">
            Add following script at this page just before{" "}
            <strong className="body-tag">{"</body>"}</strong> tag.
          </p>
          <p className="code-steps__info">
            4. Add following snippet at top [for horizontal interface at post
            top] and bottom [for horizontal interface at post bottom] of
            <strong className="body-tag">{"<data:post.body/>"}</strong>
          </p>
          <div className="d-flex justify-content-between code-view with-button  mb-3 mt-3">
            <div>
              <pre>
                <code>{setup2}</code>
              </pre>
            </div>
            <CopyButton content={setup2} />
          </div>
        </li>
      </ul>
    </React.Fragment>
  );
});

const TumblrInstallation: React.FC<{ uid: string }> = React.memo(props => {
  const setup1 = getInstallationCode(props.uid);
  const setup2 = `<div class="s9-widget-wrapper"></div>`;

  return (
    <React.Fragment>
      <ul className="code-steps wordpress">
        <li className="code-steps__item code-steps__item--completed">
          <p className="code-steps__title">Add Social9 on your Tumblr</p>
          <p className="code-steps__info">
            1. Log in to your Tumblr account. Select the Account icon in the top
            right and select Edit Appearance.
          </p>
          <p className="code-steps__info">
            2. Select Edit Theme. You will be directed to a configuration panel.
          </p>
          <p className="code-steps__info">
            3. Select Edit HTML in the top left. You will be directed to an HTML
            editor.
          </p>
          <p className="code-steps__info">
            4. Scroll all the way to the bottom of your code. Just above the
            closing <strong className="body-tag">{"</body>"}</strong> tag. tag,
            copy and paste this code:
          </p>
          <div className="d-flex justify-content-between code-view with-button  mb-3 mt-3">
            <div>
              <pre>
                <code>{setup1}</code>
              </pre>
            </div>
            <CopyButton content={setup1} />
          </div>
        </li>
        <li className="code-steps__item code-steps__item--completed">
          <p className="code-steps__title">Setup Inline Tools</p>
          <p className="code-steps__info">
            If you would like to activate an inline tool, add this additional
            code within the body of your page. Copy and paste the code below to
            the places on your page where you want the tools to appear.
          </p>
          <div className="d-flex justify-content-between code-view with-button  mb-3 mt-3">
            <div>
              <pre>
                <code>{setup2}</code>
              </pre>
            </div>
            <CopyButton content={setup2} />
          </div>
        </li>
      </ul>
    </React.Fragment>
  );
});
const MagentoInstallation: React.FC<{ uid: string }> = React.memo(props => {
  const setup1 = getInstallationCode(props.uid);
  const setup2 = `<div class="s9-widget-wrapper"></div>`;

  return (
    <React.Fragment>
      <ul className="code-steps wordpress">
        <li className="code-steps__item code-steps__item--completed">
          <p className="code-steps__title">Add Social9 to Magento</p>
          <p className="code-steps__info">
            1. Log in to your Magento Marketplace account.
          </p>
          <p className="code-steps__info">
            2. From your Dashboard, select <strong>Content </strong> &gt;{" "}
            <strong>Design </strong> &gt;<strong> Configuration</strong> from
            the left navigation bar.
          </p>
          <p className="code-steps__info">
            3. Identify which website you would like to add tools to and select{" "}
            <strong>Edit</strong>.
          </p>
          <p className="code-steps__info">
            4. Under Other Settings, select HTML Head.
          </p>
          <p className="code-steps__info">
            5. Scroll down the Scripts and Style Sheets field and paste the
            following code in Scripts and Style Sheets field.
          </p>
          <div className="d-flex justify-content-between code-view with-button  mb-3 mt-3">
            <div>
              <pre>
                <code>{setup1}</code>
              </pre>
            </div>
            <CopyButton content={setup1} />
          </div>
        </li>
        <li className="code-steps__item code-steps__item--completed">
          <p className="code-steps__title">Setup Inline Tools</p>
          <p className="code-steps__info">
            If you would like to activate an inline tool, add this additional
            code within the body of your page. Copy and paste the code below to
            the places on your page where you want the tools to appear.
          </p>
          <div className="d-flex justify-content-between code-view with-button  mb-3 mt-3">
            <div>
              <pre>
                <code>{setup2}</code>
              </pre>
            </div>
            <CopyButton content={setup2} />
          </div>
        </li>
      </ul>
    </React.Fragment>
  );
});

const NextJSInstallation: React.FC<{ uid: string }> = React.memo(props => {
  const setup1 = `
    import Head from 'next/head'

    function IndexPage() {
      return (
        <div>
          <Head>
            <title>My page title</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            ${getInstallationCode(props.uid)}
          </Head>
          <p>Hello world!</p>
        </div>
      )
    }

    export default IndexPage
`;

  const setup2 = `<div class="s9-widget-wrapper"></div>`;

  return (
    <React.Fragment>
      <ul className="code-steps wordpress">
        <li className="code-steps__item code-steps__item--completed">
          <p className="code-steps__title">Add Social9 to NextJS</p>
          <p className="code-steps__info">
            1. Add Social9 installation code at head section(generally it’s in
            pages/index.js” and this may change as per developed application).
          </p>
          <div className="d-flex justify-content-between code-view with-button  mb-3 mt-3">
            <div>
              <pre>
                <code>{setup1}</code>
              </pre>
            </div>
            <CopyButton content={setup1} />
          </div>
        </li>
        <li className="code-steps__item code-steps__item--completed">
          <p className="code-steps__title">Setup Inline Tools</p>
          <p className="code-steps__info">
            1. Add following line of code where you want to display inline
            interface
          </p>
          <div className="d-flex justify-content-between code-view with-button  mb-3 mt-3">
            <div>
              <pre>
                <code>{setup2}</code>
              </pre>
            </div>
            <CopyButton content={setup2} />
          </div>
        </li>
      </ul>
    </React.Fragment>
  );
});

const WeeblyInstallation: React.FC<{ uid: string }> = React.memo(props => {
  const setup1 = getInstallationCode(props.uid);
  const setup2 = `<div class="s9-widget-wrapper"></div>`;

  return (
    <React.Fragment>
      <ul className="code-steps wordpress">
        <li className="code-steps__item code-steps__item--completed">
          <p className="code-steps__title">Add Social9 to Weebly</p>
          <p className="code-steps__info">1. Login to Weebly</p>
          <p className="code-steps__info">
            2. Click on <strong>Embed Code</strong> option.
          </p>
          <p className="code-steps__info">
            3. Drag icon on your website at bottom/footer.
          </p>
          <p className="code-steps__info">
            4. <strong>Edit Custom HTML </strong> and add following code and
            save
          </p>
          <div className="d-flex justify-content-between code-view with-button  mb-3 mt-3">
            <div>
              <pre>
                <code>{setup1}</code>
              </pre>
            </div>
            <CopyButton content={setup1} />
          </div>
        </li>
        <li className="code-steps__item code-steps__item--completed">
          <p className="code-steps__title">Setup Inline Tools</p>
          <p className="code-steps__info">
            1. Click on <strong>Embed Code</strong> option again and drag icon
            where you want to display interface.
          </p>
          <p className="code-steps__info">
            2. <strong>Edit Custom HTML </strong> and add following code and
            save.
          </p>
          <div className="d-flex justify-content-between code-view with-button  mb-3 mt-3">
            <div>
              <pre>
                <code>{setup2}</code>
              </pre>
            </div>
            <CopyButton content={setup2} />
          </div>
        </li>
      </ul>
    </React.Fragment>
  );
});

const WixInstallation: React.FC<{ uid: string }> = React.memo(props => {
  const setup1 = getInstallationCode(props.uid);
  const setup2 = `<div class="s9-widget-wrapper"></div>`;

  return (
    <React.Fragment>
      <ul className="code-steps wordpress">
        <li className="code-steps__item code-steps__item--completed">
          <p className="code-steps__title">Add Social9 to Wix</p>
          <p className="code-steps__info">1. Login to Wix</p>
          <p className="code-steps__info">
            2. Select <strong>Manage Site </strong> then select{" "}
            <strong>Edit Site</strong>.
          </p>
          <p className="code-steps__info">
            3. Select <strong>Add </strong> option from left sidebar.
          </p>
          <p className="code-steps__info">
            4. Select <strong>More </strong> then click on{" "}
            <strong>HTML Code.</strong>
          </p>
          <p className="code-steps__info">
            5. Click <strong>Enter Code </strong> and paste following code into
            the text box.
          </p>
          <div className="d-flex justify-content-between code-view with-button  mb-3 mt-3">
            <div>
              <pre>
                <code>{setup1}</code>
              </pre>
            </div>
            <CopyButton content={setup1} />
          </div>
        </li>
        <li className="code-steps__item code-steps__item--completed">
          <p className="code-steps__title">Setup Inline Tools</p>
          <p className="code-steps__info">
            1. Select <strong>Manage Site </strong> then select{" "}
            <strong>Edit Site</strong>.
          </p>
          <p className="code-steps__info">
            2. Select <strong>Add </strong> option from left sidebar.
          </p>
          <div className="d-flex justify-content-between code-view with-button  mb-3 mt-3">
            <div>
              <pre>
                <code>{setup2}</code>
              </pre>
            </div>
            <CopyButton content={setup2} />
          </div>
          <p className="code-steps__info">3. Save and update wix changes.</p>
        </li>
      </ul>
    </React.Fragment>
  );
});

const BigCommerceInstallation: React.FC<{ uid: string }> = React.memo(props => {
  const setup1 = getInstallationCode(props.uid);
  const setup2 = `<div class="s9-widget-wrapper"></div>`;

  return (
    <React.Fragment>
      <ul className="code-steps wordpress">
        <li className="code-steps__item code-steps__item--completed">
          <p className="code-steps__title">Add Social9 to BigCommerce</p>
          <p className="code-steps__info">
            1. Login to your BigCommerce admin then go to StoreFront {"->"}{" "}
            Script Manager.
          </p>
          <p className="code-steps__info">
            2. Click on create script option in BigCommerce.
          </p>
          <p className="code-steps__info">
            3. Select footer section and paste following code and save
          </p>
          <div className="d-flex justify-content-between code-view with-button  mb-3 mt-3">
            <div>
              <pre>
                <code>{setup1}</code>
              </pre>
            </div>
            <CopyButton content={setup1} />
          </div>
        </li>
        <li className="code-steps__item code-steps__item--completed">
          <p className="code-steps__title">Setup Inline Tools</p>
          <p className="code-steps__info">
            1. Add following code where you want to display sharing interface.
          </p>

          <div className="d-flex justify-content-between code-view with-button  mb-3 mt-3">
            <div>
              <pre>
                <code>{setup2}</code>
              </pre>
            </div>
            <CopyButton content={setup2} />
          </div>
          <p className="code-steps__info">2. Save to see changes.</p>
        </li>
      </ul>
    </React.Fragment>
  );
});

const mapState = (state: RootSchema) => {
  return {
    uid: state.user.profile.Uid,
  };
};
export default connect(mapState)(Installation);
