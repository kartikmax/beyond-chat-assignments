import React,{useEffect} from "react";
import { Stack, Avatar, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";

function extractTime(dateTimeString) {
  const date = new Date(dateTimeString);
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  // const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

export const MessageList = ({title,msgCount,status,time,id}) => {
    console.log('first')


    const [data,setData]=useState()

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(
            `https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${id}`
          );
          setData(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, []);

    console.log(data)
   

  return (
    <div style={{border:'1px solid'}} onClick={()=>{console.log('click',title,data)}} >
      <Stack direction="row">
        <Avatar>M</Avatar>
        <Stack spacing={2}>
          <Typography>{title} </Typography>
          <Typography> {status} </Typography>
        </Stack>
        <Stack spacing={2} >
          <Typography style={{color:'red'}}>{extractTime(time)} </Typography>

          <Typography>{msgCount} </Typography>
        </Stack>
      </Stack>
    </div>
  );
};
