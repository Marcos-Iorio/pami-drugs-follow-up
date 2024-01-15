import { ConfigProvider, DatePicker, DatePickerProps } from "antd";

import es from "antd/locale/es_ES";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { ChangeEvent } from "react";

dayjs.locale("es"); //Sets the locale picker in spanish

interface InputProps {
  info: string;
  name: string;
  setData: (dateString: string) => void;
}

const Input = ({ info, name, setData }: InputProps) => {
  const handleChange: DatePickerProps["onChange"] = (date, dateString) => {
    setData(dateString);
  };
  return (
    <div className="flex flex-col gap-1">
      <label className=" w-full text-[#BBD1EA]" htmlFor={name}>
        {info}
      </label>
      <ConfigProvider locale={es}>
        <DatePicker format="DD-MM-YYYY" name={name} onChange={handleChange} />
      </ConfigProvider>
    </div>
  );
};

export default Input;
