import { useState,useEffect } from "react";
import { Grid, 
    TextField,
    Avatar,FormControl,Radio,FormLabel,RadioGroup,FormControlLabel,Select,MenuItem,InputLabel,IconButton, Button

} from "@mui/material";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useStyles } from "./ProductCss";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getData,postData,serverURL } from "../services/FetchNodeServices";
export default function Products(){
    var classes=useStyles()
    var admin=JSON.parse(localStorage.getItem('ADMIN'))
    var navigate=useNavigate()
    
    const [categoryIds,setCategoryIds]=useState([])
    const [companyId,setCompanyId]=useState('')
    const [categoryId,setCategoryId]=useState('')
    const [productName,setProductName]=useState('')
    const [description,setDescription]=useState('')
    const [status,setStatus]=useState('')
    const [trending,setTrending]=useState('')
    const [deals,setDeals]=useState('')
    const [priceType,setPriceType]=useState('')
    const [image,setImage]=useState({
        bytes:''
    })
    

    const fetchAllCategories=async()=>{
        var result=await getData('category/fetch_all_category')
        setCategoryIds(result.data)
   
       }
       useEffect(function(){
           fetchAllCategories()
            },[])
       
        const fillCategory=()=>{
            return categoryIds.map((item)=>{
                return(<MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>)
            })
        }

    const handleProdutcImage=(event)=>{
        setImage({
            fileName:URL.createObjectURL(event.target.files[0]),
            bytes:event.target.files[0]
          })
    }

  const handleSubmit=async()=>{
    var cd = new Date()
    var dd = cd.getFullYear() + "/" + (cd.getMonth() + 1) + "/" + cd.getDate() + " " + cd.getHours() + ":" + cd.getMinutes() + ":" + cd.getSeconds()
    var formData=new FormData()
   formData.append('companyid',companyId)
   formData.append('categoryid',categoryId)
   formData.append('productname',productName)
   formData.append('description',description)
   formData.append('status',status)
   formData.append('trending',trending)
   formData.append('deals',deals)
   formData.append('pricetype',priceType)
   formData.append('image',image.bytes)
   formData.append('createdat', dd)
   formData.append('updateat', dd)
   formData.append('createdby', 'ADMIN')
   var result=await postData('product/add_new_product',formData)
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
        <Grid item xs={12} className={classes.rowStyle}>
      <div style={{display:'flex',flexDirection:'row',justifyContent:"space-between"}}>
            
            <div className={classes.headingStyle}>Products Registration</div>
            <div style={{display:'flex',justifyContent:'space-between' ,alignItems:'center'}} >
              <img src="/assets/photos.png" width="40"  onClick={()=>navigate("/dashboard/displayallproducts")}/>
            </div>
             </div>

      </Grid>
    
       <Grid container spacing={2}>
       <Grid item xs={6}>
     <TextField fullWidth onChange={(event)=>setCompanyId(event.target.value)} value={admin.companyid} label="company Id" variant="outlined"/>
       </Grid>
       <Grid item xs={6}>
       <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category Id</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
        //   value={age}
          label="CategoryId"
          onChange={(event)=>setCategoryId(event.target.value)}
        //   onChange={handleChange}
        >
          <MenuItem value={'Choose Category...'}>Choose Category...</MenuItem>
          {fillCategory()}
        </Select>
      </FormControl> 
            </Grid>
       <Grid item xs={6}>
     <TextField fullWidth onChange={(event)=>setProductName(event.target.value)} label="Product Name" variant="outlined"/>
       </Grid>
       <Grid item xs={6}>
     <TextField fullWidth onChange={(event)=>setDescription(event.target.value)} label="Description" variant="outlined"/>
       </Grid>
       <Grid item xs={6}>
       <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Price Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
        //   value={age}
          label="Price Type"
          onChange={(event)=>setPriceType(event.target.value)}
        //   onChange={handleChange}
        >
          <MenuItem value={'Kg'}>Kg</MenuItem>
          <MenuItem value={'Ltr'}>Ltr</MenuItem>
          <MenuItem value={'Pcs'}>Pcs</MenuItem>
        </Select>
      </FormControl>
       </Grid>
        <Grid item xs={3}>
        <FormControl>
      <FormLabel id="trending">Trending</FormLabel>
      <RadioGroup
        row={true}
        aria-labelledby="trending"
        name="trending"
        onChange={(event)=>setTrending(event.target.value)}
      >
        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="No" control={<Radio />} label="No" />
        
      </RadioGroup>
    </FormControl>
        </Grid>

        <Grid item xs={3}>
        <FormControl>
      <FormLabel id="deals">Deals</FormLabel>
      <RadioGroup
       row={true}
        aria-labelledby="deals"
        name="deals"
        onChange={(event)=>setDeals(event.target.value)}
      >
        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="No" control={<Radio />} label="No" />
      </RadioGroup>
    </FormControl>
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
                onChange={handleProdutcImage}
              />
              <PhotoCameraIcon />
            </IconButton>

            <Avatar
              alt="Remy Sharp"
              variant="rounded"
              src={image.fileName}
              sx={{ width: 56, height: 56 }}
            />
          </Grid>
          <Grid item xs={6}>
        <FormControl>
      <FormLabel id="status">Status</FormLabel>
      <RadioGroup
       row={true}
        aria-labelledby="status"
        name="status"
        onChange={(event)=>setStatus(event.target.value)}
      >
        <FormControlLabel value="Available" control={<Radio />} label="Available" />
        <FormControlLabel value="Not Available" control={<Radio />} label="Not Available" />
      </RadioGroup>
    </FormControl>
        </Grid>
        <Grid item xs={6}>
        <Button fullWidth  onClick={handleSubmit} variant="contained" >Submit</Button>
        </Grid>
        <Grid item xs={6}>
       <Button fullWidth variant="contained">Reset</Button>
        </Grid>
       </Grid>
        </div>
    </div>)

}