import { useState,useEffect } from "react";
import MaterialTable from "@material-table/core";
import { useStyles } from "./DisplayAllProductsCss";
import { useNavigate } from "react-router-dom";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar,MenuItem ,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions,Button,Grid,TextField,FormControl,
FormControlLabel,
Radio,
InputLabel,Select,
FormLabel,
RadioGroup,
IconButton,

} from "@mui/material";
import Swal from "sweetalert2";
import { getData ,serverURL,postData} from "../services/FetchNodeServices";
export default function DisplayAllProducts(){
var classes=useStyles()
var navigate=useNavigate()
const [products,setProducts]=useState([])

const [productId,setProductId]=useState('')
const [open, setOpen] = useState(false);
const [categoryIds,setCategoryIds]=useState([])
const [companyId,setCompanyId]=useState('')
const [categoryId,setCategoryId]=useState('')
const [productName,setProductName]=useState('')
const [description,setDescription]=useState('')
const [status,setStatus]=useState('')
const [trending,setTrending]=useState('')
const [deals,setDeals]=useState('')
const [priceType,setPriceType]=useState('')
const [oldImage,setOldImage]=useState('')
const [btnStatus,setBtnStatus]=useState(false)
const [message,setMessage]=useState('')
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
     setBtnStatus(true)
}




const handleClose = () => {

  setOpen(false);
};




const fetchAllProducts=async()=>{
    var result=await getData('product/fetch_all_products')
    setProducts(result.data)
}

useEffect(function(){
    fetchAllProducts()
     },[])

     const handleEdit=async()=>{
      var cd=new Date()
      var dd=cd.getFullYear()+"/"+(cd.getMonth()+1)+"/"+cd.getDate()+" "+cd.getHours()+":"+cd.getMinutes()+":"+cd.getSeconds()
       var body={
        'productid':productId,
        'companyid':companyId,
        'categoryid':categoryId,
        'productname':productName,
        'description':description,
        'pricetype':priceType,
        'trending':trending,
        'deals':deals,
        'status':status,
        'updateat':dd,
        'createdby':'ADMIN',}
        var result=await postData('product/edit_product_data',body)
        if(result.status)
        {
          setOpen(false)
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
        fetchAllProducts()
     }

     const handleShowDialog=(rowData)=>{
     
      setProductId(rowData.productid);
      setCompanyId(rowData.companyid);
      setCategoryId(rowData.categoryid);
      setProductName(rowData.productname);
      setDescription(rowData.description);
      setStatus(rowData.status);
      setTrending(rowData.trending);
      setDeals(rowData.deals);
      setPriceType(rowData.pricetype);
      setImage({
        fileName: `${serverURL}/images/${rowData.image}`,
        bytes: "",
      });
     setOldImage(rowData.image)
      setOpen(true);
    
    }
    const handleSave=async()=>{
      var formData= new FormData()
      formData.append('productid',productId)
      formData.append('image',image.bytes)
      var result=await postData('product/edit_product_image',formData)
      if(result.status)
{
  setMessage("assets/tik.gif")
}
else
{
  setMessage(result.message)
}
fetchAllProducts()
setBtnStatus(false)

    }
    const handleCancel=()=>{
      setImage({fileName:`${serverURL}/images/${oldImage}`,bytes:''})
      setOldImage('')
      setBtnStatus(false)
    }
    const handleDelete=async(rowData)=>{

      setOpen(false)
          Swal.fire({
            title: 'Do you want to delete company?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
          
          }).then(async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              var res=await postData('product/delete_product_data',{productid:rowData.productid})
    
              if(res.status)
              {Swal.fire('Deleted!', '', 'Success')
              fetchAllProducts()
             }
              else
              Swal.fire({
                icon: 'error',
                title: result.message,
               })
             
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })
    
     }

  const PictureButton=()=>{
    return(<div>
      <div style={{display:'flex',padding:5}}>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>)
  }


const ShowProductDialog=()=>{
  return(<div>
       <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{display:'flex',justifyContent:'space-between'}}>
      <div style={{display:'flex',alignItems:'center'}}>
       Edit Category
      </div>
      <div>
       <CloseIcon  style={{cursor:'pointer'}}  onClick={handleClose}/>
       </div>
     </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <Grid container spacing={2} style={{marginTop:2}}>
       <Grid item xs={6}>
     <TextField fullWidth value={companyId} onChange={(event)=>setCompanyId(event.target.value)} label="company Id" variant="outlined"/>
       </Grid>
       <Grid item xs={6}>
       <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category Id</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={categoryId}
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
     <TextField fullWidth value={productName} onChange={(event)=>setProductName(event.target.value)} label="Product Name" variant="outlined"/>
       </Grid>
       <Grid item xs={6}>
     <TextField fullWidth value={description} onChange={(event)=>setDescription(event.target.value)} label="Description" variant="outlined"/>
       </Grid>
       <Grid item xs={6}>
       <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Price Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={priceType}
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
        value={trending}
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
        value={deals}
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
            {btnStatus?<PictureButton/>:<div style={{fontSize:20,color:'green',fontWeight:'bold'}} ><img src={`${message}`} width="60"/></div>}
          </Grid>
          <Grid item xs={6}>
        <FormControl>
      <FormLabel id="status">Status</FormLabel>
      <RadioGroup
       row={true}
        aria-labelledby="status"
        name="status"
        value={status}
        onChange={(event)=>setStatus(event.target.value)}
      >
        <FormControlLabel value="Available" control={<Radio />} label="Available" />
        <FormControlLabel value="Not Available" control={<Radio />} label="Not Available" />
      </RadioGroup>
    </FormControl>
        </Grid>
       
       </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEdit}>Edit Data</Button>
          <Button onClick={handleClose} >Cancel</Button>
        </DialogActions>
      </Dialog>
  </div>)
}

 function showAllProduct(){
    return(<div>
    <MaterialTable
      title="Product Details"
      columns={[
        { title: 'company Id', field: 'companyid' },
        { title: 'Category Id', field: 'categoryid' },       
        {title:'Product Name/Price Type',
              render:rowData=><div>{rowData.productname}{"/"}{rowData.pricetype}</div>},
              { title: 'Description', field: 'description' },
        { title: 'Trending/Deals/Status', field: 'createdby',
                render:rowData=><div>{rowData.trending}{"/"}{rowData.deals}{"/"}{rowData.status}</div>
                },
        
        { title: 'Last Updation', field: 'createdby',
                render:rowData=><div>{rowData.createdat}<br/>{rowData.updateat}<br/>{rowData.createdby}</div>
                },
        
                { title: 'Icon',
                render:rowData=><Avatar src={`${serverURL}/images/${rowData.image}`} style={{width:70,height:70}} variant="rounded"/>},
       
      ]}
      data={products}        
      actions={[
        { icon:'add',
        isFreeAction:true,
        tooltip:'Add Product',
        onClick: (event) =>navigate('/dashboard/products') 
      },

        {
          icon: 'edit',
          tooltip: 'Edit User',
          onClick: (event, rowData) => handleShowDialog(rowData),
        },
        {
          icon: 'delete',
          tooltip: 'Delete User',
          onClick: (event, rowData) => handleDelete(rowData)
        }
      ]}
    />
    </div>)
 }


    return(<div className={classes.mainContainer}>
        <div className={classes.box}>
    {showAllProduct()}
    {ShowProductDialog()}
    </div>
    </div>)
}