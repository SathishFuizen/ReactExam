import React from 'react'
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm

    
    
   
} from "react-hook-form";
import { Student_Details } from './helper';
import { useState } from 'react';
import { string } from 'yup/lib/locale';
import { idText } from 'typescript';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from  'react-router-dom';
import { PrimaryButton } from '@fluentui/react';
import DynamicFiled from '../SharedComponents/DynamicFiled';
import './Students.scss'
import "./Form.scss"

const Student_Form = () => {
    interface IStudentData{
        name?:string;
        rollno?:number;
        english?:string;
        telugu?:string;
        hindi?:string;
        science?:string;
        social?:string;
        activities?:string;
        totalmarks?:number;
    }
    const StudentSchema:yup.SchemaOf<IStudentData>=yup.object().shape({
        name:yup.string().min(5).max(10),
        rollno:yup.number(),
        english:yup.string().max(100),
        telugu:yup.string().max(100),
        hindi:yup.string().max(100),
        science:yup.string().max(100),
        social:yup.string().max(100),
        activities:yup.string().max(100),
        totalmarks:yup.number().max(100)
        


    });
    const StudentFormMethod= useForm<any>({
        defaultValues:{},
        mode:"all",
        resolver: async (data, context, options) => {
            return yupResolver(StudentSchema)(data,context,options);
        },

    });

    const [submitData,setsubmitData]=useState();


    const navigation = useNavigate();
    const StudentFormSubmit: SubmitHandler<any> = async (
        data: any,
    ) => {
        setsubmitData(data)
        if (id.id) {
            editForm(data);
        } else {
            createForm(data);
        }
        StudentFormMethod.reset({});
        navigation('/view')
    };
      
        
    // };


    const getAdditionalProps = (item: any) => {
        item.control = StudentFormMethod.control;
        item.setValue = StudentFormMethod.setValue;
        item.register = StudentFormMethod.register; 
        return item;
    };

    const id =useParams();
    const [data,setData]=useState<any>();
    const getStudentData = async () => {
        try {
            const result = await axios.get(`http://localhost:5000/data/${id.id}`);
            setData(result.data);
        } catch (error) {
            console.log(error)
        }
    }

    const editForm = async (updatedData: any) => {
        try {
            const result = await axios.put(`http://localhost:5000/data/${id.id}`, updatedData);
            setData(result.data);
        } catch (error) {
            console.log(error)
        }
    }

    const createForm = async (updatedData: any) => {
        const generateNumber: any = Math.random();
        const newData = { ...updatedData, 'id': generateNumber }
        try {
            const result = await axios.post(`http://localhost:5000/data`, newData);
            setData(result.data);
        } catch (error) {
            console.log(error)
        }
    }

    
    useEffect(() => {
        getStudentData();
    }, [id]);

    useEffect(() => {
        data &&
            Object.entries(data).forEach(([key, value]: any) => {
                StudentFormMethod.setValue(key, value, { shouldValidate: true });
            });
    }, [data]);

    console.log(StudentFormMethod.watch(), StudentFormMethod.formState.errors)
     return(
        
        <div className='form_main'>
      
            <div className='header1'>
            <img src="https://zelarsoft.com/wp-content/uploads/2021/10/logo.png" alt="img"/>
            </div>
              
                <div className='form'>
                <div className="form_h1">
          <h4>Student </h4>&nbsp;
          <p>Details</p>
        </div>
                

                <div>
                <hr className='form__line'></hr>
                </div> 
              
               
              
            <FormProvider {...StudentFormMethod}>
                <form onSubmit={StudentFormMethod.handleSubmit(StudentFormSubmit)}>
                <div className="form_container">
                    { Student_Details?. map((rows: any) =>
                    { return(
                        <div className="form_containerone"><div className={`rowOne ${rows.className}`}></div>
                            {rows.controls?.map((item:any)=>{
                        const updatedI= getAdditionalProps(item);
                        return DynamicFiled(item.type, updatedI);
                    })}
                    </div>
                  
                    )})}

                </div>
                   
                 
                     <div className='form__footer' > 
                        <PrimaryButton className='btn1' type="submit" onClick={StudentFormMethod.handleSubmit(StudentFormSubmit)}
                                                     >Submit</PrimaryButton>

                     </div> 
                    

                </form>


            </FormProvider>
            </div>
            </div>
            
     
           
     
        
                    
                    

   
     );
   
  
};

export default Student_Form