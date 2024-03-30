import { useState,useEffect } from "react";
import { Grid, TextField ,Avatar,IconButton, Button} from "@mui/material";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./CategoryCss";
import { postData } from "../services/FetchNodeServices";
export default function Category (){
  var classes=useStyles()
  // var admin=JSON.parse(localStorage.getItem('ADMIN'))
  var navigate=useNavigate()
    const [companyId,setComapnyId]=useState('')
    const [categoryName,setCategoryName]=useState('')
    const [description,setDescription]=useState('')
    const [categoryLogo,setCategoryLogo]=useState({bytes:"",})


    const handleCategoryImage=(event)=>{
      setCategoryLogo({
        fileName:URL.createObjectURL(event.target.files[0]),
        bytes:event.target.files[0]
      })
    }


    const handleSubmitCategory=async()=>{
      var cd=new Date()
      var dd=cd.getFullYear()+"/"+(cd.getMonth()+1)+"/"+cd.getDate()+" "+cd.getHours()+":"+cd.getMinutes()+":"+cd.getSeconds()

   var formData=new FormData()
   formData.append('companyid',companyId)
   formData.append('categoryname',categoryName)
   formData.append('description',description)
   formData.append('icon',categoryLogo.bytes)
   formData.append('createdat',dd)
   formData.append('updateat',dd)
   formData.append('createdby','ADMIN')

   var result=await postData('category/add_new_category',formData)
   if(result.status)
   {
    Swal.fire({
      icon: "success",
      title: result.message
     
    });
   
   }
   else
   {
    Swal.fire({
      icon: "error",
      title: result.message
    });
   }

    }
    return(<div className={classes.mainContainer}>
        <div className={classes.box}> 
     <Grid container spacing={2}>
      <Grid item xs={12} className={classes.rowStyle}>
      <div style={{display:'flex',flexDirection:'row',justifyContent:"space-between"}}>
            
            <div className={classes.headingStyle}>Category Registration</div>
            <div style={{display:'flex',justifyContent:'space-between' ,alignItems:'center'}} >
              <img src="/assets/photos.png" width="40"  onClick={()=>navigate("/dashboard/displayallcategory")}/>
            </div>
             </div>

      </Grid>
        <Grid item xs={6}>
            <TextField fullWidth onChange={(event)=>setComapnyId(event.target.value)}  label="Company Id" variant="outlined"/>

        </Grid>
        <Grid item xs={6}>
            <TextField fullWidth onChange={(event)=>setCategoryName(event.target.value)} label="Category Name" variant="outlined"/>

        </Grid>
        <Grid item xs={6}>
            <TextField fullWidth onChange={(event)=>setDescription(event.target.value)} label="Description" variant="outlined"/>

        </Grid>
        <Grid item xs={6} className={classes.rowStyle} >
            <IconButton
              fullWidth
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleCategoryImage}
              />
              <PhotoCameraIcon />
            </IconButton>

            <Avatar
              alt="Remy Sharp"
              variant="rounded"
              src={categoryLogo.fileName}
              sx={{ width: 56, height: 56 }}
            />
          </Grid>
          <Grid item xs={6}>
        <Button fullWidth onClick={handleSubmitCategory} variant="contained">Submit</Button>
          </Grid>
          <Grid item xs={6}>
        <Button fullWidth variant="contained">Reset</Button>
          </Grid>
     </Grid>
     </div>
    </div>)
}