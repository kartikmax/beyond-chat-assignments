import React, { useContext, useState, useEffect } from "react";
import {
  Stack,
  Tabs,
  Tab,
  Box,
  IconButton,
  Menu,
  MenuItem,
  InputAdornment,
  OutlinedInput,
  ListItemIcon,
} from "@mui/material";
import { MessageList } from "./MessageList";
import axios from "axios";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Cloud,
  Logout,
  SearchOutlined,
  AccountCircle,
  DarkMode,
} from "@mui/icons-material";
import { ThemeContext } from "../theme/themeContext";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ overflowY: "auto", height: "90vh" }}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export const TopBar = () => {
  const { toggleTheme, mode } = useContext(ThemeContext);
  const [value, setValue] = useState(0);
  const [data, setData] = useState();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://devapi.beyondchats.com/api/get_all_chats?page=1"
        );
        setData(res.data.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // console.log(data);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        gap={2}
        style={{ margin: "10 0" }}
        
      >
        <IconButton onClick={handleClick}>
          <MenuIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <AccountCircle fontSize="small" />
            </ListItemIcon>
            <ListItemIcon>Profile</ListItemIcon>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Cloud fontSize="small" />
            </ListItemIcon>
            <ListItemIcon>My Account</ListItemIcon>
          </MenuItem>
          <MenuItem
            onClick={() => {
              toggleTheme();
              handleClose();
            }}
          >
            <ListItemIcon>
              <DarkMode fontSize="small" />
            </ListItemIcon>
            <ListItemIcon>Theme</ListItemIcon>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            <ListItemIcon>Logout</ListItemIcon>
          </MenuItem>
        </Menu>
        <OutlinedInput
          style={{ height: "36px", borderRadius: "16px" }}
          id="outlined-basic"
          label="search"
          variant="outlined"
          endAdornment={
            <InputAdornment position="start">
              <IconButton>
                <SearchOutlined />
              </IconButton>
            </InputAdornment>
          }
        />
      </Stack>

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            color='primary'
          >
            <Tab label="All Chats" />
            <Tab label="Personal" />
            <Tab label="Unread" />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          {data
            ? data.map((x) => (
                <MessageList
                  key={x.id}
                  title={x.creator.email}
                  msgCount={x.msg_count}
                  status={x.status}
                  time={x.updated_at}
                  id={x.id}
                />
              ))
            : "Data is loading..."}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
      </Box>
    </>
  );
};
