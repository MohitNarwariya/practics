import { useState,useEffect } from "react";
import { Grid, TextField ,Avatar,IconButton, Button} from "@mui/material";
import { useStyles } from "./DetailsCss";

export default function Details (){
  var classes=useStyles()
    const [name,setName]=useState('')
    const [phoneNumber,setPhoneNumber]=useState('')
    const [email,setEmail]=useState('')
    const [address,setAddress]=useState('')
    const [textBox,setTextBox]=useState('')
    const [image,setImage]=useState({bytes:"",filename:''})


    const handleImage=(event)=>{
        setImage({bytes:event.target.files[0],filename:URL.createObjectURL(event.target.files[0])})
      
      
       } 


    return(<div className={classes.mainContainer}>
        <div className={classes.box}> 
     <Grid container spacing={2}>
      <Grid item xs={12} className={classes.rowStyle}>
     
            
            <div className={classes.headingStyle}>Registration Form</div>
           
             

      </Grid>
        <Grid item xs={6}>
            <TextField fullWidth onChange={(event)=>setName(event.target.value)} label="Name" variant="outlined"/>

        </Grid>
        <Grid item xs={6}>
            <TextField fullWidth onChange={(event)=>setPhoneNumber(event.target.value)} label="Phone Number" variant="outlined"/>

        </Grid>
        <Grid item xs={6}>
            <TextField fullWidth onChange={(event)=>setEmail(event.target.value)} label="Email" variant="outlined"/>

        </Grid>
        <Grid item xs={6}>
            <TextField fullWidth onChange={(event)=>setAddress(event.target.value)} label="Address" variant="outlined"/>

        </Grid>
        <Grid item xs={12}>
            <TextField  fullWidth  onChange={(event)=>setTextBox(event.target.value)} label="Text Box" variant="outlined"/>

        </Grid>
        
        <Grid item xs={6}>
                <Button component="label" 
                fullWidth
                variant="contained"
                
                >
                 <input   onChange={handleImage} hidden type="file" accept="images/*" multiple/>

                    Form Image
                </Button>

            </Grid>
            <Grid item xs={6} className={classes.center} >
                <Avatar src={image.filename} alt='Register' variant="rounded" style={{weight:150,height:50}}/>
            </Grid>


        
          <Grid item xs={6}>
        <Button fullWidth variant="contained">Submit</Button>
          </Grid>
          <Grid item xs={6}>
        <Button fullWidth variant="contained">Reset</Button>
          </Grid>
     </Grid>
     </div>
    </div>)
}