import React from "react";
import { Stack, TextField, Tabs, Tab, Box } from "@mui/material";
import { MessageList } from "./MessageList";
import axios from "axios";
import { useState, useEffect } from "react";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{overflowY:'auto',height:"90vh"}}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export const TopBar = () => {
  const [value, setValue] = useState(0);
  const [data, setData] = useState();

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

  console.log(data);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Stack direction="row" alignItems="center" gap={2}>
        M
        <TextField id="outlined-basic" label="search" variant="outlined" />
      </Stack>

      {/* this is tabs started  */}

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="All Chats" />
            <Tab label="Personal" />
            <Tab label="Unread" />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          {data
            ? data.map((x) => (
                <MessageList key={x.id} title={x.creator.email} msgCount={x.msg_count} status = {x.status} time={x.updated_at} id={x.id}  />
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
