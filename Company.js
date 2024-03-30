import React,{ useEffect, useState } from "react"
import { Grid, 
  TextField,
  IconButton,
  Button,
  MenuItem,
  Select,
  FormControl, 
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Avatar} from "@mui/material"
import { useStyles } from "./CompanyCss";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getData, postData } from "../services/FetchNodeServices";
export default function Company(){
    const [showPassword, setShowPassword] = useState(false);
    const [companyName,setCompanyName]=useState('')
    const [ownerName,setOwnerName]=useState('')
    const [emailAddress,setEmailAddress]=useState('')
    const [mobileNumber,setMobileNumber]=useState('')
    const [address,setAddress]=useState('')
    const [password,setPassword]=useState('')
    const [state,setState]=useState('')
    const [city,setCity]=useState('')
    const [states,setStates]=useState([])
    const [cities,setCities]=useState([])
    const [companyLogo, setCompanyLogo] = useState({
        
        bytes: "",
      });
    const [error,setError]=useState({})
    var classes = useStyles();
    var navigate=useNavigate()

   const fetchAllState=async()=>{
    var result=await getData('statecity/fetch_all_states')
    setStates(result.data)

   }
 

   useEffect(function(){
  fetchAllState()
 
   },[])


const handleError=(inputs,value)=>{
  setError(prev=>({...prev,[inputs]:value}))
}

const validation=()=>{
  var isValid=true
  if(!companyName)
  {
    handleError("companyName","Invalid Company Name")
    isValid=false
  }
  if(!ownerName)
  {
    handleError("ownerName","Invalid Owner Name")
    isValid=false
  }
  if(!mobileNumber || !(/^[0-9]{10}$/.test(mobileNumber)))
  {
    handleError("mobileNumber","Invalid Mobile Number")
    isValid=false
  }
  if(!emailAddress || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailAddress)))
  {
    handleError("emailAddress","Invalid Company Name")
    isValid=false
  }
  if(!address)
  {
    handleError("address","Pls Input Address")
    isValid=false
  }
  if(!state || state=="Choose State...")
  {
    handleError("state","Pls Select State")
    isValid=false
  }
  if(!city || city=="Choose City...")
  {
    handleError("city","Pls Select City")
    isValid=false
  }
  if(!password)
  {
    handleError("password","Pls Input Address")
    isValid=false
  }
return isValid

}


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
    const clearValues=()=>{
      setCompanyName('')
      setOwnerName('')
      setEmailAddress('')
      setMobileNumber('')
      setState('Choose State...')
      setCity('Choose City...')
      setAddress('')
      setCompanyLogo({bytes:""})
      setPassword('')
    }
  




   const handleSubmit=async()=>{
    console.log("XXXX",error)
    if(validation())
    {
    var cd=new Date()
   var dd=cd.getFullYear()+"/"+(cd.getMonth()+1)+"/"+cd.getDate()+" "+cd.getHours()+":"+cd.getMinutes()+":"+cd.getSeconds()
   var formData=new FormData()
   formData.append('companyname',companyName)
   formData.append('ownername',ownerName)
   formData.append('emailaddress',emailAddress)
   formData.append('mobilenumber',mobileNumber)
   formData.append('state',state)
   formData.append('city',city)
   formData.append('address',address)
   formData.append('logo',companyLogo.bytes)
   formData.append('password',password)
   formData.append('status','Pending')
   formData.append('createdat',dd)
   formData.append('updateat',dd)
   formData.append('createdby','ADMIN')
   

// Check if formData is being constructed correctly
// console.log("Form Data:", formData);
// console.log("API Response:", result);

 var result=await postData('company/add_new_company',formData)
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
   clearValues()
  }
   }



    const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
      };
  return( <div className={classes.mainContainer}>
    <div className={classes.box}>
   <Grid container spacing={2}>
   <Grid item xs={12} className={classes.rowStyle}>
            <div style={{display:'flex',flexDirection:'row',justifyContent:"space-between"}}>
            
            <div className={classes.headingStyle}>Company Registration</div>
            <div style={{display:'flex',justifyContent:'space-between'}}>
              <img src="/assets/photos.png" width="40"  onClick={()=>navigate("/displayallcompany")}/>
            </div>
             </div>
            <div>
            {/* <FormatListBulletedIcon /> */}
            </div>
          </Grid>
    <Grid item xs={6}>
        <TextField error={!error.companyName?false:true} helperText={error.companyName} onFocus={()=>handleError("companyName",null)} fullWidth value={companyName} onChange={(event)=>setCompanyName(event.target.value)} label="Company Name" variant="outlined"/>
    </Grid>
    <Grid item xs={6}>
        <TextField error={!error.ownerName?false:true} helperText={error.ownerName} onFocus={()=>handleError("ownerName",null)} fullWidth value={ownerName} onChange={(event)=>setOwnerName(event.target.value)} label="Owner Name" variant="outlined"/>
    </Grid>
    <Grid item xs={6}>
        <TextField error={!error.emailAddress?false:true} helperText={error.emailAddress} onFocus={()=>handleError("emailAddress",null)} fullWidth value={emailAddress} onChange={(event)=>setEmailAddress(event.target.value)}  label="Email Address" variant="outlined"/>
    </Grid>
    <Grid item xs={6}>
        <TextField error={!error.mobileNumber?false:true} helperText={error.mobileNumber} onFocus={()=>handleError("mobileNumber",null)} fullWidth value={mobileNumber} onChange={(event)=>setMobileNumber(event.target.value)}  label="Mobile Number" variant="outlined"/>
    </Grid>
    <Grid item xs={6}>
    <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label">State</InputLabel>
    <Select
          
   
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={state}
          label="State"
          error={!error.state?false:true}
          onFocus={()=>handleError("state",null)}
          onChange={handleStateChange}
        >
          <MenuItem value={'Choose State...'} >Choose State...</MenuItem>
          {fillState()}
        </Select>
        <div style={{padding:5,fontSize:12,color:'red'}}>{error.state}</div>
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
          error={!error.city?false:true}
          onFocus={()=>handleError("city",null)}

          onChange={handleCityChange}
        >
          <MenuItem value={'Choose City...'} >Choose City...</MenuItem>
          {fillCities()}
        </Select>
        <div style={{padding:5,fontSize:12,color:'red'}}>{error.city}</div>
      </FormControl>

    </Grid>

    <Grid item xs={12}>
        <TextField error={!error.address?false:true} helperText={error.address} onFocus={()=>handleError("address",null)} fullWidth value={address} onChange={(event)=>setAddress(event.target.value)}  label="Address" variant="outlined"/>
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
          </Grid>
    <Grid item xs={6}>
      <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
    <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(event)=>setPassword(event.target.value)}
            error={!error.password?false:true}
            onFocus={()=>handleError("password",null)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <div style={{padding:5,fontSize:12,color:'red'}}>{error.password}</div>

    </Grid>
    
    <Grid item xs={6}>
        <Button fullWidth onClick={handleSubmit} variant="contained">Submit</Button>
    </Grid>
    <Grid item xs={6}>
        <Button fullWidth onClick={clearValues} variant="contained">Reset</Button>
    </Grid>
    

   </Grid>

  </div>
  </div>)

}