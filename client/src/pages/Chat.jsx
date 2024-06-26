import React,{useRef, Fragment} from 'react'
import AppLayout from '../components/layout/AppLayout';
import {Stack, IconButton} from '@mui/material'
import { grayColor, orange } from '../constants/color';
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { InputBox } from '../components/styles/StyledCompo';
import FileMenu from '../components/dialog/FileMenu';
import { SampleMsg } from '../constants/sampleData';
import MessageComponent from '../components/shared/MessageComponent';

const Chat = () => {
  const containerRef = useRef(null)
  const user = {
    _id: 'sdfdf',
    name: 'saqqqq'
  }
  return (
    <Fragment>
      <Stack 
        ref={containerRef}
        boxSizing={"border-box"}
        padding={'1rem'}
        spacing={'1rem'}
        bgcolor={grayColor}
        height={'90%'}
        sx={{
          overflowX: 'hidden',
          overflowY: 'auto',
        }}
      >
{
  SampleMsg.map((i)=> {
    <MessageComponent key={i._id} message={i} user={user}/>
  })
}
      </Stack>

      <form action="" 
      style={{height: '10%'}}>

        <Stack direction={'row'} height={'100%'} padding={'1rem'} alignItems={'center'}
        position={'relative'}>
          <IconButton sx={{
            position: 'absolute',
            left: '1.5rem',
            rotate:'30deg'
          }}>
            <AttachFileIcon/>
          </IconButton>

          <InputBox placeholder='Type Message here...'/>

          <IconButton type='submit' sx={{
            rotate: '-30deg',
            backgroundColor: orange,
            color: 'white',
            marginLeft: '1rem',
            padding: '0.5rem',
            '&:hover':{
              backgroundColor: 'error.dark'
            }
          }}>
            <SendIcon/>
          </IconButton>

        </Stack>
      </form>

      <FileMenu/>
   </Fragment>
  )
}

export default AppLayout()(Chat);