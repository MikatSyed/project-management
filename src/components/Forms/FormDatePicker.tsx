"use client"
import React, { ChangeEvent, useEffect } from "react";
import { Controller, useFormContext, FieldValues } from "react-hook-form";
import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { getErrorMessageByPropertyName } from "../../../src/utils/schema-validator";
 // Import Ant Design styles

interface FormDatePickerProps {
  name: string;
  label?: string;
  onChange?: (selectedDate: Dayjs, formattedDate: string) => void;
  size?: "large" | "small"; // Assuming these are the only two possible values
  className?: string;
}

const FormDatePicker: React.FC<FormDatePickerProps> = ({
  name,
  label,
  onChange,
  size = "large",
  className,
}) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<FieldValues>();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  const handleOnChange = (date: Dayjs | null) => {
    if (date) {
      const formattedDate = date.format("YYYY-MM-DD");
      onChange?.(date, formattedDate);
      setValue(name, formattedDate);
    }
  };

  return (
    <div>
    {label ? label : null}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            value={field.value ? dayjs(field.value) : null}
            onChange={handleOnChange}
            className={`${className}`}
          />
        )}
      />
      {errorMessage && <p className="text-red-500 mt-1">{errorMessage}</p>}
    </div>
  );
};

export default FormDatePicker;
