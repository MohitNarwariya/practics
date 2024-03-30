import { useState, useEffect } from "react"
import { AppBar, Grid, Paper } from "@mui/material";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import CategoryIcon from "@mui/icons-material/Category";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DisplayAllCategory from "./DisplayAllCategory";
import Category from "./Category"
import Products from "./Products"
import ListProduct from "./ListProduct"
import DisplayAllProducts from "./DisplayAllProducts"
import DisplayAllListProduct from "./DisplayAllListProduct"
import LogoutIcon from "@mui/icons-material/Logout";
import { Routes,Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../services/FetchNodeServices";
export default function DashBoard(props) {
    var navigate=useNavigate()
    var admin=JSON.parse(localStorage.getItem("ADMIN"))
    // console.log(admin)
    return (<div>
        
            <AppBar position="static" style={{ background: "#000" }}>
                <Toolbar variant="dense">
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon style={{ color: "#FFF" }} />
                    </IconButton>
                    <Typography variant="h6" component="div">
                        <span style={{ color: "#FFF" }}>GwaliorBasket</span>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Grid container spacing={3}>
                <Grid item xs={2}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <img
                            src={`${serverURL}/images/${admin.logo}`}
                            style={{ width: 80, margin: 20, borderRadius: 40 }}
                        />
                        <Paper
                            style={{
                                width: 220,
                                height: 60,
                                background: "#dfe6e9",
                                margin: 20,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                            elevation={1}
                        >
                            <img
                                src="/assets/profile.png"
                                style={{ marginLeft: 10, width: 50, borderRadius: 25 }}
                            />
                            <span
                                style={{
                                    fontWeight: "bold",
                                    fontFamily: "Poppins",
                                    marginRight: 60,
                                }}
                            >
                               {admin.ownername}
                            </span>
                        </Paper>
                        {/*  List */}
                        <div style={{ width: 220, margin: 20 }}>
                            <List component="nav">
                                <ListItemButton
                                    onClick={() => navigate("/dashboard/displayallcategory")}
                                >
                                    <ListItemIcon>
                                        <CategoryIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <span
                                                style={{
                                                    fontWeight: 500,
                                                    letterSpacing: 1,
                                                    fontFamily: "Poppins",
                                                }}
                                            >
                                                Category
                                            </span>
                                        }
                                    />
                                </ListItemButton>

                                <ListItemButton
                                    onClick={() => navigate("/dashboard/displayallproducts")}
                                >
                                    <ListItemIcon>
                                        <AddShoppingCartIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <span
                                                style={{
                                                    fontWeight: 500,
                                                    letterSpacing: 1,
                                                    fontFamily: "Poppins",
                                                }}
                                            >
                                                Products
                                            </span>
                                        }
                                    />
                                </ListItemButton>

                                <ListItemButton
                                    onClick={() => navigate("/dashboard/displayalllistproduct")}
                                >
                                    <ListItemIcon>
                                        <AddPhotoAlternateIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <span
                                                style={{
                                                    fontWeight: 500,
                                                    letterSpacing: 1,
                                                    fontFamily: "Poppins",
                                                }}
                                            >
                                                Products List
                                            </span>
                                        }
                                    />
                                </ListItemButton>


                                {/* <ListItemButton
                                //  onClick={() => navigate("/dashboard/Banner")}
                                 >
                                    <ListItemIcon>
                                        <AddPhotoAlternateIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <span
                                                style={{
                                                    fontWeight: 500,
                                                    letterSpacing: 1,
                                                    fontFamily: "Poppins",
                                                }}
                                            >
                                                Banners
                                            </span>
                                        }
                                    />
                                </ListItemButton> */}
                                <Divider />
                                <ListItemButton

                                // onClick={(event) => handleListItemClick(event, 0)}
                                >
                                    <ListItemIcon>
                                        <LogoutIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <span
                                                style={{
                                                    fontWeight: 500,
                                                    letterSpacing: 1,
                                                    fontFamily: "Poppins",
                                                }}
                                            >
                                                Logout
                                            </span>
                                        }
                                    />
                                </ListItemButton>
                            </List>
                        </div>
                    </div>
                </Grid>


                <Grid item xs={10}>
                    <Routes>

                    <Route element={<Category/>} path={"/category"}/>
                    <Route element={<Products/>} path={"/products"}/>
                    <Route element={<ListProduct/>} path={"/listproduct"}/>
                    <Route element={<DisplayAllCategory/>} path={"/displayallcategory"}  />
                    <Route element={<DisplayAllProducts/>} path={"/displayallproducts"}/>
                    <Route element={<DisplayAllListProduct/>} path={"/displayalllistproduct"}/>

                    </Routes>

                </Grid>
                </Grid>
                
        </div>)
}