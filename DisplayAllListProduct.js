import { useState,useEffect } from "react";
import { useStyles } from "./DisplayAllListProductCss";
import MaterialTable from "@material-table/core";
import { Avatar ,Button,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions,Grid,TextField,MenuItem,Select,FormControl,InputLabel} from "@mui/material";
import { getData, serverURL ,postData} from "../services/FetchNodeServices";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import { DropzoneDialog, DropzoneArea } from "material-ui-dropzone";


export default function DisplayAllListProduct (){
    var classes=useStyles()
    var navigate=useNavigate()
    const [listProducties,setListProducties]=useState([])
   
    const [productListId,setProductListId]=useState('')
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
    const [open, setOpen] = useState(false);

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

  

    
  
    const handleClose = () => {
      setOpen(false);
    };
  
  
    const fetchAllListProduct=async()=>{
  var result=await getData('listproduct/fetch_all_listproduct')
  setListProducties(result.data)
    }

useEffect(function(){
fetchAllListProduct()
},[])

const handleShowDialog=(rowData)=>{
    fetchAllProduct(rowData.categoryid)
    setProductListId(rowData.productlistid)
    setComapnyId(rowData.companyid)
    setCategoryId(rowData.categoryid)
    setProductId(rowData.productid)
    setWeight(rowData.weight)
    setPrice(rowData.price)
    setOfferPrice(rowData.offerprice)
    setDescription(rowData.description)
//     setMultiImage({fileName:`${serverURL}/images/${rowData.image}`,
//   bytes:"",
//   })
    setOpen(true)
}

const ShowListProductDialog=()=>{
return(<div>
   <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
         <DialogTitle id="alert-dialog-title" style={{display:'flex',justifyContent:'space-between'}}>
      <div style={{display:'flex',alignItems:'center'}}>
       Edit Product List
      </div>
      <div>
       <CloseIcon  style={{cursor:'pointer'}}  onClick={handleClose}/>
       </div>
     </DialogTitle>
       
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <Grid container spacing={2} style={{marginTop:2}}>
           
            <Grid item xs={4}>
            <TextField fullWidth value={companyId} onChange={(event)=>setComapnyId(event.target.value)} label="Company Id" variant="outlined"/>
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
            <TextField fullWidth value={weight} onChange={(event)=>setWeight(event.target.value)} label="Weight" variant="outlined"/>
            </Grid>
            <Grid item xs={4}>
            <TextField fullWidth value={price} onChange={(event)=>setPrice(event.target.value)} label="Price" variant="outlined"/>
            </Grid>
            <Grid item xs={4}>
            <TextField fullWidth value={offerPrice} onChange={(event)=>setOfferPrice(event.target.value)} label="Offer Price" variant="outlined"/>
            </Grid>
            <Grid item xs={12}>
            <TextField fullWidth value={description} onChange={(event)=>setDescription(event.target.value)} label="Description" variant="outlined"/>
            </Grid>
            {/* <Grid item xs={12}>
              <DropzoneArea
                acceptedFiles={["image/*"]}
                dropzoneText={"Drag and drop an image here or click"}
                filesLimit={5}
                onChange={(files) => handleImage(files)}
              />
            </Grid> */}
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Edit Data</Button>
          <Button onClick={handleClose} >Cancel</Button>
        </DialogActions>
      </Dialog>
</div>)
}



    function ShowAllListProduct(){
        return(<div>

<MaterialTable
      title="Product List"
      columns={[
        { title: 'Company Id', field: 'companyid' },
        { title: 'Category Id', field: 'categoryid' },
        { title: 'Product Id', field: 'productid' },
        { title: 'Weight/Price', field: 'weight',
        render:rowData=><div>{rowData.weight}<br/>{"/"}{rowData.price}</div>
        },
        { title: 'Description/Offer Price', field: 'description',
        render:rowData=><div>{rowData.description}<br/>{"/"}{rowData.offerprice}</div>
        },



    //     {title:'Image',
    //     render:rowData=><Avatar src={`${serverURL}/images/${rowData.image}`} style={{width:70,height:70}} variant="rounded"/>
    // }
      ]}
      data={listProducties}        
      actions={[
        { icon:'add',
        isFreeAction:true,
        tooltip:'Add Product List',
        onClick: (event) =>navigate('/dashboard/listproduct') 
      },
        {
          icon: 'edit',
          tooltip: 'Edit User',
          onClick: (event, rowData) => handleShowDialog(rowData)
        },
        {
          icon: 'delete',
          tooltip: 'Delete User',
          onClick: (event, rowData) => alert("You want to delete " + rowData.name)
        }
      ]}
    />
        </div>)
    }
    
    return(<div className={classes.mainContainer}> 
         <div className={classes.box}>
     {ShowAllListProduct()}
     {ShowListProductDialog()}
         </div>
    </div>)
}