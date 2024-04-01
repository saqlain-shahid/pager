import React, { memo } from 'react'
import {Link} from '../styles/StyledCompo'
import {Box, Stack, Typography} from '@mui/material'
import AvatarCard from './AvatarCard'
const ChatItem = ({
    avatar=[],
    name,
    _id,
    groupChat=false,
    sameSender,
    newMessageAlert,
    isOnline,
    index=0,
    handleDeleteChat
}) => {
  return (
    <Link 
    sx={{
        padding:'0',
    }}
    to={`/chat/${_id}`} onContextMenu={(e)=> handleDeleteChat(e, _id, groupChat)}>
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
            <AvatarCard avatar={avatar}/>
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