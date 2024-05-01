"use client"
import {  Input } from 'antd';
import {useFormContext,Controller} from 'react-hook-form'

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
  rows,
  value,
  placeholder,
  className
    
}:TextAreaProps
) => {
        const { control } = useFormContext();
    return (
       <>
       {label ? label : null}
       <Controller
        control={control}
        name={name}
        render={({field}) => (
            <Input.TextArea
            rows={rows}
            cols={8}
            className={`${className}`}
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