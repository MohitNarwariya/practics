import MaterialTable from "@material-table/core"
import { useEffect, useState } from "react"
import { Avatar, DialogContentText } from "@mui/material";
import Swal from "sweetalert2";
import { getData, postData ,serverURL} from "../services/FetchNodeServices";
import { useStyles } from "./DisplayAllCompanyCss";
import { useNavigate } from "react-router-dom";
import {Button,Dialog,DialogActions,DialogContent,DialogTitle,
 
  TextField,
  Grid,
  IconButton,
  FormControl,
  InputLabel,
  Switch,
  Select,
  MenuItem } from '@mui/material';
  import CloseIcon from '@mui/icons-material/Close';
  import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

export default function DisplayAllCompany(props){
  var classes=useStyles()
  var navigate=useNavigate()

  const [companies,setCompanies]=useState([])
  const [companyId,setCompanyId]=useState('')
  const [status,setStatus]=useState('')
  const [companyName,setCompanyName]=useState('')
  const [ownerName,setOwnerName]=useState('')
  const [emailAddress,setEmailAddress]=useState('')
  const [mobileNumber,setMobileNumber]=useState('')
  const [address,setAddress]=useState('')
  const [state,setState]=useState('')
  const [city,setCity]=useState('')
  const [states,setStates]=useState([])
  const [cities,setCities]=useState([])
  const [companyLogo, setCompanyLogo] = useState({
      
      bytes: "",
    });
  const [open, setOpen] = useState(false);
  const [btnStatus,setBtnStatus]=useState(false)
  const [oldPicture,setOldPicture]=useState('')
  const [message,setMessage]=useState('')
  

  const fetchAllState=async()=>{
    var result=await getData('statecity/fetch_all_states')
    setStates(result.data)

   }
 

   useEffect(function(){
  fetchAllState()
 
   },[])


   const fetchAllCities=async(stateid)=>{
    var body={'stateid':stateid}
    var result=await postData('statecity/fetch_all_cities',body)
    setCities(result.data)
   }
   const handleStateChange=(event)=>{
    setState(event.target.value)
    fetchAllCities(event.target.value)
   }
   const handleCityChange=(event)=>{
    setCity(event.target.value)
   }
   
   
  
    const fillState=()=>{
      return states.map((item)=>{
          return(<MenuItem value={item.stateid}>{item.statename}</MenuItem>)
      })
     }
     const fillCities=()=>{
      return cities.map((item)=>{
          return(<MenuItem value={item.cityid}>{item.cityname}</MenuItem>)
      })
     }
  
      const handleImage = (event) => {
          setCompanyLogo({
            fileName: URL.createObjectURL(event.target.files[0]),
            bytes: event.target.files[0],
          });
          setBtnStatus(true)
        };
  
  const fatchAllCompany=async()=>{
   var result=await getData('company/display_all_company')
   setCompanies(result.data)
  }
  useEffect(function(){
 fatchAllCompany()
  },[])

  const handleClose=()=>{
    setOpen(false)
   }

  const handleShowDialog=(rowData)=>{
   fetchAllCities(rowData.state)
    setCompanyId(rowData.companyid)
    setCompanyName(rowData.companyname)
    setOwnerName(rowData.ownername)
    setEmailAddress(rowData.emailaddress)
    setMobileNumber(rowData.mobilenumber)
    setState(rowData.state)
    setCity(rowData.city)
    setAddress(rowData.address)
    setStatus(rowData.status)
    setCompanyLogo({fileName:`${serverURL}/images/${rowData.logo}`,
  bytes:"",
  })
  setOldPicture(rowData.logo)
  
    setOpen(true)
  }

  const handleStatus=(temp)=>{
    if(temp=='Pending')
    { setStatus('Verified')}
    if(temp=="Verified")
    { setStatus('Pending')}
   }
 

  const handleEditData=async()=>{
    var cd=new Date()
    var dd=cd.getFullYear()+"/"+(cd.getMonth()+1)+"/"+cd.getDate()+" "+cd.getHours()+":"+cd.getMinutes()+":"+cd.getSeconds()
    
     var body={'companyid':companyId,
              'companyname':companyName,
              'ownername':ownerName,
              'emailaddress':emailAddress,
              'mobilenumber':mobileNumber,
              'address':address,
              'state':state,
              'city':city,
              'updateat':dd,
              'createdby':'ADMIN',
              'status':status}
var result=await postData('company/edit_company_data',body)
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
fatchAllCompany()
  }
  
  const handleCancel=()=>{
    setCompanyLogo({fileName:`${serverURL}/images/${oldPicture}`,bytes:''})
    setOldPicture('')
    setBtnStatus(false)
    setMessage('')

   }  

const handleDelet=async(rowData)=>{


  setOpen(false)
      Swal.fire({
        title: 'Do you want to delete company?',
        showCancelButton: true,
        confirmButtonText: 'Delete',
      
      }).then(async(result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          var res=await postData('company/delete_company_data',{companyid:rowData.companyid})

          if(res.status)
          {Swal.fire('Deleted!', '', 'Success')
          fatchAllCompany()
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
  formData.append('companyid',companyId)
  formData.append('logo',companyLogo.bytes)

  var result=await postData('company/edit_company_logo',formData)
if(result.status)
{
  setMessage("assets/tik.gif")
}
else
{
  setMessage(result.message)
}
fatchAllCompany()
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
  
 
const ShowCompanyDialog=()=>{

  return (
   <div>
      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
         <DialogTitle id="alert-dialog-title" style={{display:'flex',justifyContent:'space-between'}}>
           <div style={{display:'flex',alignItems:'center'}}>
          
            Edit Company
           </div>
           <div>
            <CloseIcon  style={{cursor:'pointer'}}  onClick={handleClose}/>
            </div>
          </DialogTitle>
        <DialogContent>
       
        <Grid container spacing={2}>
   <Grid item xs={12} className={classes.rowStyle}>
           
            <div>
            {/* <FormatListBulletedIcon /> */}
            </div>
          </Grid>
    <Grid item xs={6}>
        <TextField fullWidth value={companyName} onChange={(event)=>setCompanyName(event.target.value)} label="Company Name" variant="outlined"/>
    </Grid>
    <Grid item xs={6}>
        <TextField fullWidth value={ownerName} onChange={(event)=>setOwnerName(event.target.value)} label="Owner Name" variant="outlined"/>
    </Grid>
    <Grid item xs={6}>
        <TextField fullWidth value={emailAddress} onChange={(event)=>setEmailAddress(event.target.value)}  label="Email Address" variant="outlined"/>
    </Grid>
    <Grid item xs={6}>
        <TextField fullWidth value={mobileNumber} onChange={(event)=>setMobileNumber(event.target.value)}  label="Mobile Number" variant="outlined"/>
    </Grid>
    <Grid item xs={6}>
    <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label">State</InputLabel>
    <Select
          
   
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={state}
          label="State"
          onChange={handleStateChange}
        >
          <MenuItem value={'Choose State...'} >Choose State...</MenuItem>
          {fillState()}
        </Select>
      </FormControl>

    </Grid>
  
    <Grid item xs={6}>
    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">City</InputLabel>
    <Select
          
   
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={city}
          label="City"
          onChange={handleCityChange}
        >
          <MenuItem value={'Choose City...'} >Choose City...</MenuItem>
          {fillCities()}
        </Select>
      </FormControl>

    </Grid>

    <Grid item xs={12}>
        <TextField fullWidth value={address} onChange={(event)=>setAddress(event.target.value)}  label="Address" variant="outlined"/>
    </Grid>

    <Grid item xs={6}>
   {status=="Pending"?<Switch onChange={()=>handleStatus(status)} />:<Switch onChange={()=>handleStatus(status)} defaultChecked />}
   {status}
    </Grid>
    <Grid item xs={6} className={classes.rowStyle}>
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
                onChange={handleImage}
              />
              <PhotoCameraIcon />
            </IconButton>

            <Avatar
              alt="Remy Sharp"
              variant="rounded"
              src={companyLogo.fileName}
              sx={{ width: 56, height: 56 }}
            />
           {btnStatus? <PictureButton/>:<div style={{fontSize:20,color:'green',fontWeight:'bold'}} ><img src={`${message}`} width="60"/></div>}
          </Grid>
    
    
    
    

   </Grid>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditData} >Edit</Button>
          <Button onClick={handleClose}>Cancal</Button>
        </DialogActions>
      </Dialog>
      </div>
  );


}

function ShowAllCompany() {
 
    return (
      <MaterialTable
        title="Company Details"
        columns={[
          { title: 'Company Name', field: 'companyname',
        render:rowData=><div>{rowData.companyname}<br/>{rowData.ownername}</div>
        },
       
        {title: 'Address', field: 'cityname',
        render:rowData=><div>{rowData.address}<br/>{rowData.cityname},{rowData.statename}</div>},

          { title: 'Contact Details',
        render:rowData=><div>{rowData.emailaddress}<br/>{rowData.mobilenumber}</div>
        },
          { title: 'Status', field: 'status'},
          
          { title: 'Last Updation', field: 'createdby',
        render:rowData=><div>{rowData.createdat}<br/>{rowData.updateat}<br/>{rowData.createdby}</div>
        },

        { title: 'Logo',
        render:rowData=><Avatar src={`${serverURL}/images/${rowData.logo}`} style={{width:70,height:70}} variant="rounded"/>},
        
         
             
        ]}
        data={companies}
                
        actions={[

           { icon:'add',
            isFreeAction:true,
            tooltip:'Add Company',
            onClick: (event) =>navigate('/company') 
          },
          {
            icon: 'edit',
            tooltip: 'Save User',
            onClick: (event, rowData) => handleShowDialog(rowData)
          },
          {
            icon: 'delete',
            tooltip: 'Delete User',
            onClick: (event, rowData) =>handleDelet(rowData)
          }
        ]}
      />
    )
  }


    return(<div className={classes.mainContainer}>
      <div className={classes.box}>
     {ShowAllCompany()}
     {ShowCompanyDialog()}
     </div>
    </div>)
}