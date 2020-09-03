import * as React from "react";
import { ChromePicker, ColorChangeHandler } from "react-color";
import { Button } from "semantic-ui-react";
import "./colorpicker.scss";

export interface ColorPickerProps {
  open?: boolean;
  color?: string | null;
  onChange?: ColorChangeHandler;
}

const ColorPicker: React.SFC<ColorPickerProps> = props => {
  const [color, setColor] = React.useState<string | undefined>(
    props.color || undefined
  );
  const [open, setOpen] = React.useState<boolean>(props.open || false);

  React.useEffect(() => {
    setColor(props.color || color);
  }, [props.color, color]);

  return (
    <div className="two wide field cp-wrapper d-flex align-items-end">
      <Button icon="eye dropper" onClick={() => setOpen(!open)} />
      {open ? (
        <div className="cp-main">
          <div className="cover" onClick={() => setOpen(false)} />
          <div className="picker">
            <ChromePicker
              color={color}
              onChange={c => setColor(c.hex)}
              onChangeComplete={props.onChange}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ColorPicker;
