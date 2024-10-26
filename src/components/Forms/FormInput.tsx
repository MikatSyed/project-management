"use client"
import { Input } from 'antd';
import {useFormContext,Controller} from 'react-hook-form'
import { getErrorMessageByPropertyName } from "@/utils/schema-validator";

interface IInput {
    name: string;
    type?: string;
    size?: "large" | "small";
    value?: string | string[] | undefined;
    id?: string;
    placeholder?: string;
    validation?: object;
    label?: string;
    className?: string;
  }

const FormInput = ({name,
    type,
    size="large",
    value,
    id,
    placeholder,
    validation,
    label,
    className
}:IInput
) => {
        const { control, formState: { errors },} = useFormContext();
        const errorMessage = getErrorMessageByPropertyName(errors, name);
    return (
       <>
       {label ? <div className='block text-sm font-medium'>
        {label}
       </div> : null}
       <Controller
        control={control}
        name={name}
        render={({field}) => (
           type === "password" ? (
            <Input.Password
            type={type}
            size={size}
            placeholder={placeholder}
            className={`${className} border-gray-300  border-gray-300 focus:border-teal-500 focus:ring-teal-500`}
            {...field}
            value={value ? value : field.value}
          />
           ) : (
            <Input
            type={type}
            size={size}
            placeholder={placeholder}
            className={`${className} border-gray-300  border-gray-300 focus:border-teal-500 focus:ring-teal-500`}
            {...field}
            value={value ? value : field.value}
          />
           )
        )}
      />
       <small className='text-red-500 p-2'>{errorMessage}</small>
       </>
    );
};

export default FormInput;