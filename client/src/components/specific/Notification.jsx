import React, {memo} from "react";
import {
  Dialog,
  Stack,
  DialogTitle,
 Typography, 
 ListItem,
 Avatar,
 Button
 
} from "@mui/material";
import { sampleNotifications } from "../../constants/sampleData";
const Notification = () => {

  const friendRequestHandler = ({_id, accept}) => {

  }
  return (
    <Dialog open>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notif</DialogTitle>
        {sampleNotifications.length > 0 ? (
          sampleNotifications.map((i)=> <NotificationItem sender={i.sender} _id={i._id} handler={friendRequestHandler} key={i._id}/>)
        ) : (
          <Typography textAlign={'center'}>0 Notification</Typography>
        )}
      </Stack>
    </Dialog>
  );
}

const NotificationItem = memo(({sender, _id, handler}) => {
  const {name, avatar} = sender
  return (
  <ListItem>
  <Stack
    direction={"row"}
    alignItems={"center"}
    spacing={"1rem"}
    width={"100%"}
   
  >
    <Avatar src={(avatar)} />

    <Typography
      variant="body1"
      sx={{
        flexGlow: 1,
        display: "-webkit-box",
        WebkitLineClamp: 1,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        textOverflow: "ellipsis",
        width: "100%",
      }}
    >
      {`${name} sent you friend request`}
    </Typography>
      <Stack direction={{
        xs: 'column',
        sm: 'row'
      }}>
        <Button onClick={()=> handler({_id, accept:true})}>Accept</Button>
        <Button color="error" onClick={()=> handler({_id, accept:false})}>Reject</Button>
      </Stack>
  
  </Stack>
</ListItem>
)})


export default Notification;
