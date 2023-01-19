import TextFieldForm from "./TextFieldForm";

export const DynamicFiled=(filedName:string,item:any)=>{
    switch(filedName){
        case "TextFieldForm":
            return <TextFieldForm {...item}/>
            default:
                return "missing components";
    }
} ;

export default DynamicFiled