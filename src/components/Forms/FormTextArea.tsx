"use client";
import { Input } from 'antd';
import { useFormContext, Controller } from 'react-hook-form';

type TextAreaProps = {
  name: string;
  label?: string;
  rows?: number;
  value?: string;
  placeholder?: string;
  className?: string;
};

const FormTextArea = ({ 
  name,
  label,
  rows = 4,
  value,
  placeholder,
  className = ''
}: TextAreaProps) => {
  const { control } = useFormContext();

  return (
    <>
      {label ? <div className='block text-sm font-medium text-gray-700 mb-1'>
        {label}
      </div> : null}

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input.TextArea
            rows={rows}
            className={`${className} border-gray-300 focus:border-teal-500 focus:ring-teal-500`}
            placeholder={placeholder}
            {...field}
            defaultValue={value}
          />
        )}
      />
    </>
  );
};

export default FormTextArea;
