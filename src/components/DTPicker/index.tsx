import * as React from "react";
import moment from "moment";
import { DateRangePicker, DateRangePickerProps } from "rsuite";
import "rsuite/dist/styles/rsuite-default.min.css";
import { ValueType, RangeType } from "rsuite/lib/DateRangePicker";

export interface DTPickerProps extends DateRangePickerProps {
  onDTChange: (value: ValueType) => void;
  minDate?: Date;
}

function dateFns(days: number, type: "start" | "end" = "start"): Date {
  const now = moment().subtract(days, "days");
  return type === "start"
    ? now.startOf("day").toDate()
    : now.endOf("day").toDate();
}

const DTPicker: React.FC<DTPickerProps> = ({
  onDTChange,
  minDate,
  ...props
}) => {
  const [dates, setDates] = React.useState<ValueType | undefined>(props.value);

  const now = moment()
    .endOf("day")
    .toDate();
  const ranges: RangeType[] = [
    {
      label: "Today",
      value: [dateFns(0), now],
    },
    {
      label: "Last 3 Days",
      value: [dateFns(2), now],
    },
    {
      label: "Last 7 Days",
      value: [dateFns(6), now],
    },
    {
      label: "Last 30 Days",
      value: [dateFns(29), now],
    },
    {
      label: "All Time",
      value: [moment(minDate).toDate(), moment().toDate()],
    },
  ];

  return (
    <DateRangePicker
      onChange={setDates}
      onOk={onDTChange}
      onClose={() => dates && onDTChange(dates)}
      limitEndYear={new Date().getFullYear()}
      ranges={ranges}
      {...props}
    />
  );
};

export default DTPicker;
