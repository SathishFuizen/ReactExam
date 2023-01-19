import React from 'react'
import { useState,useEffect } from 'react';
import axios from "axios"
import { DetailsList, PrimaryButton} from '@fluentui/react';
import {IColumn} from "@fluentui/react"
import {Link} from "react-router-dom"
import "./View.scss"
import { MdDelete,MdRemoveRedEye } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const View = () => {
    const [data,setData]= useState <any> ();

    

    const getData = async () => {
        try {
            const url = 'http://localhost:5000/data'
            const result: any = await axios.get(url);
            setData(result.data)
        } catch (err) {
            console.log(err);
        }
    };

    
    const deleteRequest = async (id: any) => {
      try {
          const url = `http://localhost:5000/data/${id}`;
          const result: any = await axios.delete(url);
          console.log(result);
          getData();
      } catch (error) {
          console.log(error);
      }
  }
  
  useEffect(() => {
      getData();
  }, [])


  const columns: IColumn[]=[
    {
      key:"column1",
      name:"Name",
      fieldName:"Name",
      minWidth:40,
      maxWidth:80,
      isResizable:true
    },
    {
      key:"column2",
      name:"Rollno",
      fieldName:"Rollno",
      minWidth:40,
      maxWidth:80,
      isResizable:true
    },
    {
      key:"column3",
      name:"English",
      fieldName:"English",
      minWidth:40,
      maxWidth:80,
      isResizable:true
    },
    {
      key:"column4",
      name:"Telugu",
      fieldName:"Telugu",
      minWidth:40,
      maxWidth:80,
      isResizable:true
    },
    {
      key:"column5",
      name:"Hindi",
      fieldName:"Hindhi",
      minWidth:40,
      maxWidth:80,
      isResizable:true
    },
    {
      key:"column6",
      name:"Science",
      fieldName:"Social",
      minWidth:40,
      maxWidth:80,
      isResizable:true
    },
    {
      key:"column7",
      name:"Social",
      fieldName:"Social",
      minWidth:40,
      maxWidth:80,
      isResizable:true
    },
    {
      key:"column8",
      name:"Activites",
      fieldName:"Activities",
      minWidth:40,
      maxWidth:80,
      isResizable:true
    },
    {
        key:"column9",
      name:"Total marks",
      fieldName:"Total marks",
      minWidth:40,
      maxWidth:80,
      isResizable:true,
    },
    {
      key:"column10",
      name:" ",
      fieldName:"id",
      minWidth:40,
      maxWidth:80,
      isResizable:true,
      onRender:(item:any)=>(
        item.id &&
        <>
        <div className='symbols'>
            <Link  to={`/view/${item.id}`}>{<MdRemoveRedEye size={20}/>}</Link>
            <Link  to={`/update/${item.id}`}>{<CiEdit size={20}/>}</Link>
            <Link  onClick={() => deleteRequest(item.id)} to=''>{<MdDelete size={20}/>}</Link>
            </div>
        </>

        

      )

      },

    
   
  ]



  return (
    <>
   <div className='header' >
            <img src="https://zelarsoft.com/wp-content/uploads/2021/10/logo.png" alt="img"/>
            </div>
            <div className='btn'>
              <Link to="/create">  <PrimaryButton  className='header__btn' type="submit">Add</PrimaryButton></Link> 
            </div>
    
    <div className='table'>
        
      {
        data &&
        <DetailsList

            items={data}
            columns={columns}
            setKey="set"
            
      />



      }


   
</div>
</>
  )

   
}

export default View