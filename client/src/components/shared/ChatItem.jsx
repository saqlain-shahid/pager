import React from 'react'
import {Link} from 'react-router-dom'
import {Box, Stack, Typography} from '@mui/material'
const ChatItem = ({
    avatar=[],
    name,
    _id,
    groupChat=false,
    sameSender,
    newMessageAlert,
    isOnline,
    index=0,
    handleDeleteChatOpen
}) => {
  return (
    <Link to={`/chat/${_id}`} onContextMenu={(e)=> handleDeleteChatOpen(e, _id, groupChat)}>
        <div style={{
            display:'flex',
            gap:'1rem',
            alignItems:'center',
            padding:'1rem',
            color: sameSender? 'black':'unset',
            borderBottom:'1px solid #f0f0f0',
            justifyContent:'space-between',
            position:'relative'
        }}>
            {/* avatar */}
            <Stack>
                <Typography>{name}</Typography>
                {newMessageAlert && (
                    <Typography>{newMessageAlert.count}New Message</Typography>
                )}
            </Stack>

            {
                isOnline && <Box/>
            }
        </div>
    </Link>
  )
}

export default memo(ChatItem)