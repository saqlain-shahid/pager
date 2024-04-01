import React,{useRef, Fragment} from 'react'
import AppLayout from '../components/layout/AppLayout';
import {Stack} from '@mui/material'
import { grayColor } from '../components/constants/color';

const Chat = () => {
  const containerRef = useRef(null)

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

      </Stack>
   </Fragment>
  )
}

export default AppLayout()(Chat);