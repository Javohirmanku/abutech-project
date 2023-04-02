import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  colors,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";
import routes from "../routes";
import LinearProgress from "@mui/material/LinearProgress";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import "./main.css";
import zIndex from "@mui/material/styles/zIndex";

const drawerWidth = 250;

export const Main = () => {
  const [degree, setDegree] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("https://media.istockphoto.com/id/1034587098/photo/tashkent-tv-tower-aerial-shot-during-sunset-in-uzbekistan.jpg?s=612x612&w=0&k=20&c=vos2bfAhLB8HuKgh91KnMkllxkZC6RYoXNt-F8Tz6Os=");
  const [loader, setLoader] = useState(true);

  const regions = [
    {
      label: "Tashkent",
      value: "Tashkent",
      url: "https://media.istockphoto.com/id/1034587098/photo/tashkent-tv-tower-aerial-shot-during-sunset-in-uzbekistan.jpg?s=612x612&w=0&k=20&c=vos2bfAhLB8HuKgh91KnMkllxkZC6RYoXNt-F8Tz6Os=",
    },
    {
      label: "Namangan",
      value: "Namangan",
      url: "https://www.norma.uz/img/9b/39/14b22b4fec43cbb19ac0c2e5104e.jpg",
    },
    {
      label: "Andijon",
      value: "Andijon",
      url: "https://i.ytimg.com/vi/7lv922gGSZg/maxresdefault.jpg",
    },
    {
      label: "Bukhara",
      value: "Bukhara",
      url: "https://xabar.uz/static/crop/3/1/960__80_3187275673.jpg",
    },
    {
      label: "Fergana",
      value: "Fergana",
      url: "data:image/jpeg;base64,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",
    },
    {
      label: "Jizzakh",
      value: "Jizzakh",
      url: "https://travelplanner.app/wp-content/uploads/2020/07/dVFoMGNNam50VW1qbTVoR0hpUXoybXM0dkdjZ3UxUVlFRGFWNXE1ZWhtZlNySUNsZGFHaU00bXNiOUdHSUhLYUptbEFqb0NXaUR1a1pkNG55Wk93dW81VnY4ZGdRemJBQVRXNEd4WmhXTlk9.jpg",
    },
    {
      label: "Xiva",
      value: "Xiva",
      url: "https://fastly.4sqi.net/img/general/600x600/74992663_764FVWnPmBCB7GkehsRGNI4_jHFO0XP8q5foLBXUCPw.jpg",
    },
    {
      label: "Navoiy",
      value: "Navoiy",
      url: "data:image/jpeg;base64,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",
    },
    {
      label: "Qashqadaryo",
      value: "Qashqadaryo",
      url: "https://qashqadaryo.uz/images/slide/slide1.jpg",
    },
    {
      label: "Samarkand",
      value: "Samarkand",
      url: "https://upload.wikimedia.org/wikipedia/commons/8/8c/RegistanSquare_Samarkand.jpg",
    },
    {
      label: "Sirdaryo",
      value: "Sirdaryo",
      url: "http://geografiya.uz/uploads/posts/2015-07/thumbs/1436875140_4.jpg",
    },
    {
      label: "Termiz",
      value: "Termiz",
      url: "https://storage.kun.uz/source/uploads/20180104/images/032018/tt/jsj987tyj-1.jpg",
    },
  ];

  useEffect(() => {
    getDegree("Tashkent")();
    setLoader(false);
  }, []);
  const getDegree = (city) => async () => {
    try {
      const res = await axios.get(routes.getDegree(city));
      const deg = res.data.main.temp - 273;
      const url = regions.find((item) => item.value === city);
      console.log(url);
      setUrl(url.url);
      setTitle(city);
      setDegree(deg);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event, value) => {
    getDegree(value.value)();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  if (loader) return <LinearProgress />;
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
          }}
        >
          <Toolbar>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={regions}
              sx={{ width: 300 }}
              value={{ label: title, value: title }}
              disableClearable
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} label={title} />}
            />
            <Button
              style={{
                marginLeft: "auto",
                color: "black",
                backgroundColor: "rgb(178 175 183)",
                border: "1px solid black",
              }}
              variant="outlined"
              color="error"
              onClick={logout}
            >
              Log out
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <img src="https://nordicapis.com/wp-content/uploads/5-Best-Free-and-Paid-Weather-APIs-2019-e1587582023501.png" alt="" />
          <Divider />
          <List>
            {regions.map((text) => (
              <ListItem
                key={text.label}
                disablePadding
                onClick={getDegree(text.label)}
              >
                <ListItemButton className={title === text.label ? 'bgcolor' : ''}>
                  <ListItemText primary={text.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
        <Box
          component="main"
          className="test"
          sx={{ backgroundImage: `url(${url})` }}
        >
          <Toolbar />
          <Typography sx={{mb:0 , ml: 2}} variant="h2" paragraph>{title && title}</Typography>
          <Typography sx={{mb:0 , ml: 2}} variant="h6" paragraph>{degree && degree.toFixed(1)}°C</Typography>
        </Box>
      </Box>
    </div>
  );
};
