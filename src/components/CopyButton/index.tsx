import * as React from "react";
import { Button, Icon } from "semantic-ui-react";
import { toast } from "react-toastify";
import copy from "clipboard-copy";

const CopyButton: React.FC<{ content: string }> = React.memo(
  ({ content = "" }) => {
    return document.queryCommandSupported("copy") ? (
      <div>
        <Button
          primary
          icon
          labelPosition="left"
          size="tiny"
          onClick={() => {
            copy(content).then(() => toast.info("Copied to clipboard!"));
          }}
        >
          <Icon name="copy" />
          Copy
        </Button>
      </div>
    ) : null;
  }
);

export default CopyButton;
