import { useState,useEffect } from "react";
import { useStyles } from "./DisplayAllCategoryCss";
import MaterialTable from "@material-table/core";
import { getData ,serverURL,postData} from "../services/FetchNodeServices";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Avatar ,Dialog,Button,DialogTitle,DialogContent,DialogActions,Grid,TextField,IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
export default function DisplayAllCategory(){
    var classes=useStyles()
    var navigate=useNavigate()
    const [categories,setCategories]=useState([])
    const [categoryId,setCategoryId]=useState('')
    const [open, setOpen] = useState(false);
    const [companyId,setComapnyId]=useState('')
    const [categoryName,setCategoryName]=useState('')
    const [description,setDescription]=useState('')
    const [btnStatus,setBtnStatus]=useState(false)
    const [message,setMessage]=useState('')
    const [oldIcon,setOldIcon]=useState('')
    const [categoryLogo,setCategoryLogo]=useState({
      
      bytes:"",
  });


    

    const fetchAllCategories=async()=>{
     var result=await getData('category/fetch_all_category')
     setCategories(result.data)

    }
    useEffect(function(){
        fetchAllCategories()
         },[])
    

         const handleCategoryImage=(event)=>{
          setCategoryLogo({
            fileName:URL.createObjectURL(event.target.files[0]),
            bytes:event.target.files[0]
          })
          setBtnStatus(true)
        }
  
         const handleClose = () => {
            setOpen(false);
          };


          const handleShowDialog=(rowData)=>{
            setCategoryId(rowData.categoryid);
            setComapnyId(rowData.companyid);
            setCategoryName(rowData.categoryname);
            setDescription(rowData.description);
            setCategoryLogo({fileName:`${serverURL}/images/${rowData.icon}`,
          bytes:"",
          
          })
        
          setOldIcon(rowData.icon);
            setOpen(true)
        }
        

          const handleEdit=async()=>{
            var cd=new Date()
            var dd=cd.getFullYear()+"/"+(cd.getMonth()+1)+"/"+cd.getDate()+" "+cd.getHours()+":"+cd.getMinutes()+":"+cd.getSeconds()
             var body={
                  categoryid:categoryId,
                  companyid:companyId,
                  categoryname:categoryName,
                  description:description,
                  updateat:dd,
                  createdby:'ADMIN',}

                  var result=await postData('category/edit_category_data',body)
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
                  fetchAllCategories()
          }


        

const handleCancel=()=>{
  setCategoryLogo({fileName:`${serverURL}/images/${oldIcon}`,bytes:''})
  setOldIcon('')
  setBtnStatus(false)
  setMessage('')
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
          var res=await postData('category/delete_category_data',{categoryid:rowData.categoryid})

          if(res.status)
          {Swal.fire('Deleted!', '', 'Success')
          fetchAllCategories()
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


const handleSaveLogo=async()=>{
  var formData=new FormData()
  formData.append('categoryid',categoryId)
  formData.append('icon',categoryLogo.bytes)

  var result=await postData('category/edit_category_icon',formData)
if(result.status)
{
  setMessage("assets/tik.gif")
}
else
{
  setMessage(result.message)
}
fetchAllCategories()
setBtnStatus(false)
}





 const PictureButton=()=>{
  return(<div>
    <div style={{display:'flex',padding:10}}>
      <Button onClick={handleCancel}>Cancel</Button>
      <Button onClick={handleSaveLogo}>Save</Button>
    </div>
  </div>)
 }


    const ShowCategoryDialog=()=>{
        return(<div >
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
       
        <DialogContent >
        <Grid container spacing={2} style={{marginTop:2}}>
   
        <Grid item xs={6}>
            <TextField fullWidth  value={companyId} onChange={(event)=>setComapnyId(event.target.value)} label="Company Id" variant="outlined"/>

        </Grid>
        <Grid item xs={6}>
            <TextField fullWidth value={categoryName} onChange={(event)=>setCategoryName(event.target.value)} label="Category Name" variant="outlined"/>

        </Grid>
        <Grid item xs={6}>
            <TextField fullWidth value={description} onChange={(event)=>setDescription(event.target.value)} label="Description" variant="outlined"/>

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
            {btnStatus?<PictureButton/>:<div style={{fontSize:20,color:'green',fontWeight:'bold'}} ><img src={`${message}`} width="60"/></div>}
          </Grid>
          
     </Grid>
 
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEdit}>Edit</Button>
          <Button onClick={handleClose} >Cancel</Button>
          
        </DialogActions>
      </Dialog>
 


        </div>)
    }





    
    
    function ShowAllCategory() {
 
        return (
         
            <MaterialTable
              title="Category List"
              columns={[
                { title: 'Comapany Id', field: 'companyid' },
                { title: 'Category Name', field: 'categoryname' },
                { title: 'Description', field: 'description' },

                { title: 'Last Updation', field: 'createdby',
                render:rowData=><div>{rowData.createdat}<br/>{rowData.updateat}<br/>{rowData.createdby}</div>
                },
        
                { title: 'Icon',
                render:rowData=><Avatar src={`${serverURL}/images/${rowData.icon}`} style={{width:70,height:70}} variant="rounded"/>},
                
               
              ]}
              data={categories}        
              actions={[
                { icon:'add',
                isFreeAction:true,
                tooltip:'Add Category',
                onClick: (event) =>navigate('/dashboard/category') 
              },

                {
                  icon: 'edit',
                  tooltip: 'Edit User',
                  onClick: (event, rowData) => handleShowDialog(rowData)
                },
                {
                  icon: 'delete',
                  tooltip: 'Delete User',
                  onClick: (event, rowData) => handleDelete(rowData)
                }
              ]}
            />
           
          )
      }
    
    
    
    return(<div className={classes.mainContainer}>
      <div className={classes.box}>
        {ShowAllCategory()}
        {ShowCategoryDialog()}
      </div>
    </div>)
}