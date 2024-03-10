import React from 'react'
import Title from '../shared/Title'
import Header from './Header'
import {Grid} from '@mui/material'
import ChatList from '../specific/ChatList'

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    return (
    <>
        <Title/>
        <Header/>
        <Grid container height={'calc(100vh - 4rem)'}>
            <Grid item sm={4} md={3} height={'100%'} sx={{
                display: {xs:'none',sm:'block'}
            }}><ChatList chats={[1,2,3,,5,6]}/></Grid>
            <Grid item xs={12} sm={8} md={5} lg={6} height={'100%'}>
                <WrappedComponent {...props}/>
            </Grid>
            <Grid item md={4} lg={3} height={'100%'} sx={{
                 display: {xs:'none',sm:'block'},
                 padding:'2rem',
                 bgcolor:'rgba(0, 0, 0, 0.85)'
             }}>3</Grid>
        </Grid>            
       
       
    </>
  )}
}

export default AppLayout