import React from 'react'
import { TextField,Label } from '@fluentui/react'
import { Controller,Control,useFormContext } from 'react-hook-form'
interface IFormTextField{
    name?:string|number|any,
    typeOf?: string|number,
    label?:string,
    isRequired?:boolean,
    defaultValue?:string,
    control?:Control<any>;
    register?:any,
    placeholder?:string
}
const TextFieldForm = ({
    name,
    typeOf,
    label,isRequired,
    defaultValue,
    placeholder}:IFormTextField) => {
    const {control,register} = useFormContext();
return(
    <Controller control={control} name={name} render={({field, fieldState:{error,invalid,isTouched,isDirty},})=>{
        return(
            <>
            <TextField
                type={typeOf==='number'?'number':'text'}
                label={label}
                styles={{fieldGroup:{background:"rgb(237,237,237)", border:0}}}
                defaultValue={defaultValue}
                placeholder={placeholder}
                {...field}
                errorMessage={error?error.message:''}
            />
            </>
        )
    }}/>
    )
}
export default TextFieldForm