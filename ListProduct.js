import { useState,useEffect } from "react";
import { useStyles } from "./ListProductCSS";
import { DropzoneDialog, DropzoneArea } from "material-ui-dropzone";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Grid, TextField,FormControl,InputLabel,Select,MenuItem, Button } from "@mui/material";
import { getData, postData } from "../services/FetchNodeServices";
export default function ListProduct(){
    var classes=useStyles()
    var admin=JSON.parse(localStorage.getItem('ADMIN'))
    var navigate=useNavigate()
    const [categoryIds,setCategoryIds]=useState([])
    const [productIds,setProductIds]=useState([])
    const[companyId,setComapnyId]=useState('')
    const[categoryId,setCategoryId]=useState('')
    const[productId,setProductId]=useState('')
    const[weight,setWeight]=useState('')
    const[price,setPrice]=useState('')
    const[offerPrice,setOfferPrice]=useState('')
    const[description,setDescription]=useState('')
    const[multiImage,setMultiImage]=useState({bytes:''})


    const fetchAllCategory=async()=>{
      var result=await getData('listproduct/fetch_all_category')
      setCategoryIds(result.data)

    }


    const fetchAllProduct=async(categoryid)=>{
      var body = { categoryid: categoryid };

    var result=await postData('listproduct/fetch_all_product',body)
    setProductIds(result.data)
  
    }


 
  

    useEffect(function(){
    fetchAllCategory()
    
    },[])
    

    const fillCategory=()=>{
     return categoryIds.map((item)=>{
         return(<MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>)
      })
    }

    const fillProduct=()=>{
      return productIds.map((item)=>{
        return(<MenuItem value={item.productid}>{item.productname}</MenuItem>)
      })

    }
    const handleCategoryChange=(event)=>{
      setCategoryId(event.target.value)
      fetchAllProduct(event.target.value)
    }


    const handleProductChange=(event)=>{
    setProductId(event.target.value)
    }

    const handleImage=(files)=>{
      setMultiImage(files)
      }

const handleSubmit=async()=>{
  var cd = new Date()
  var dd = cd.getFullYear() + "/" + (cd.getMonth() + 1) + "/" + cd.getDate() + " " + cd.getHours() + ":" + cd.getMinutes() + ":" + cd.getSeconds()

var formData=new FormData()
formData.append('companyid',companyId)
formData.append('categoryid',categoryId)
formData.append('productid',productId)
formData.append('weight',weight)
formData.append('price',price)
formData.append('offerprice',offerPrice)
formData.append('description',description)
formData.append('createdat', dd)
formData.append('updatedat', dd)
formData.append('createdby', 'ADMIN')
multiImage.map((item, i) => {
  formData.append("picture" + i, item);
});

var result=await postData('listproduct/add_new_productlist',formData)
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
            
            <div className={classes.headingStyle}>Product List</div>
            <div style={{display:'flex',justifyContent:'space-between' ,alignItems:'center'}} >
              <img src="/assets/photos.png" width="40"  onClick={()=>navigate("/dashboard/displayalllistproduct")}/>
            </div>
             </div>
            </Grid>
            <Grid item xs={4}>
            <TextField fullWidth onChange={(event)=>setComapnyId(event.target.value)} value={admin.companyid} label="Company Id" variant="outlined"/>
            </Grid>

            <Grid item xs={4}>
       <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category Id</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={categoryId}
          label="CategoryId"
          // onChange={(event)=>setCategoryId(event.target.value)}
          onChange={handleCategoryChange}
        >
          <MenuItem value={'Choose Category...'}>Choose Category...</MenuItem>
          {fillCategory()}
        </Select>
      </FormControl> 
            </Grid>
            <Grid item xs={4}>
       <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Product Id</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={productId}
          label="ProductId"
          // onChange={(event)=>setCategoryId(event.target.value)}
          onChange={handleProductChange}
        >
          <MenuItem value={'Choose Product...'}>Choose Product...</MenuItem>
          {fillProduct()}
        </Select>
      </FormControl> 
            </Grid>
            <Grid item xs={4}>
            <TextField fullWidth onChange={(event)=>setWeight(event.target.value)} label="Weight" variant="outlined"/>
            </Grid>
            <Grid item xs={4}>
            <TextField fullWidth onChange={(event)=>setPrice(event.target.value)} label="Price" variant="outlined"/>
            </Grid>
            <Grid item xs={4}>
            <TextField fullWidth onChange={(event)=>setOfferPrice(event.target.value)} label="Offer Price" variant="outlined"/>
            </Grid>
            <Grid item xs={12}>
            <TextField fullWidth onChange={(event)=>setDescription(event.target.value)} label="Description" variant="outlined"/>
            </Grid>
            <Grid item xs={12}>
              <DropzoneArea
                acceptedFiles={["image/*"]}
                dropzoneText={"Drag and drop an image here or click"}
                filesLimit={5}
                onChange={(files) => handleImage(files)}
              />
            </Grid>
            <Grid item xs={6}>
         <Button fullWidth onClick={handleSubmit} variant="contained" >Submit</Button>
            </Grid>
            <Grid item xs={6}>
         <Button fullWidth variant="contained" >Reset</Button>
            </Grid>
          </Grid>
        </div>
    </div>)
}