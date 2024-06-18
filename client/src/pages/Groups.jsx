import React, { useState, memo, useEffect, Suspense, lazy } from 'react'
import {Stack,Button,Backdrop, TextField, Typography, Grid, IconButton, Tooltip, Box, Drawer} from '@mui/material'
import {matBlack, orange} from '../constants/color'
import { Add as AddIcon, Delete as DeleteIcon, Done as DoneIcon, Edit as EditIcon, KeyboardBackspace  as KeyboardBackspaceIcon, Menu as MenuIcon} from '@mui/icons-material'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {Link} from '../components/styles/StyledCompo'
import AvatarCard from '../components/shared/AvatarCard'
import { sampleChats } from '../constants/sampleData'
const ConfirmDeleteDialog = lazy(()=> import('../components/dialog/ConfirmDeleteDialog'))
const AddMemberDialog = lazy(()=> import('../components/dialog/AddMemberDialog'))

const Groups = () => {
  const navigate = useNavigate()
  const chatId = useSearchParams()[0].get('group')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [groupName, setGroupName] = useState(false)
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(false)
  
  const isAddMember = true
  const openConfirmDeleteHandler = () => {
    setConfirmDelete(true)
  }
  const closeConfirmDeleteHandler = () => {
    setConfirmDelete(false)
  }
  const openAddMemberHandler = () => {}

  const deleteHandler = () => {
    closeConfirmDeleteHandler()
  }
  const handleMobileClose = () => setIsMobileMenuOpen(false)
  const navigateBack =() => navigate('/')
  const handleMobile = () => {
      setIsMobileMenuOpen((prev)=> !prev)
  }
  const updateGroupName = () => {
    setIsEdit(false)
  }

  useEffect(()=> {
    setGroupName(`GroupName ${chatId}`)
    setGroupNameUpdatedValue(`GroupName ${chatId}`)
    //Unmounted (cleanUp funcc)
    return () => {
      setGroupName('')
      setGroupNameUpdatedValue('')
      setIsEdit(false)
    }
  },[chatId])

  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "1rem",
            top: "1rem",
          },
        }}
      >
        <IconButton onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
      </Box>

      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: matBlack,
            color: "white",
            ":hover": {
              bgcolor: "rgba(0,0,0,0.7)",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );
const GroupName = () => <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={'3rem'}>
  {isEdit? <>
    <TextField onClick={groupNameUpdatedValue}
    onChange={(e)=> setGroupNameUpdatedValue(e.target.value)}/>
    <IconButton onClick={updateGroupName}><DoneIcon/></IconButton>
  </> : 
  <>
    <Typography variant='h4'>
      {groupName}
    </Typography>
    <IconButton onClick={()=> setIsEdit(true)}><EditIcon/></IconButton>
  </>}
</Stack>

const ButtonGroup = <Stack direction={{
  sm: 'row',
  xs: 'column-reverse',
}} 
spacing={'1rem'}
p={{
  xs: '0',
  sm: '1rem',
  md: '1rem 4rem'
}}>
  <Button size={'large'} color='error' startIcon={<DeleteIcon/>} onClick={openConfirmDeleteHandler}>Delete Group</Button>
  <Button size={'large'} variant='contained' startIcon={<AddIcon/>} onClick={openAddMemberHandler}>Add member</Button>
  
</Stack>


  return (
    <Grid container height={'100vh'}>
      <Grid item sx={{
        display: {
          xs: 'none',
          sm: 'block'
        }
      }} sm={4}
      bgcolor={orange}
      >
        <GroupsList myGroups={sampleChats} chatId={chatId}/>
      </Grid>
      <Grid item xs={12} sm={8} sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        padding: '1rem 3rem'
      }}>
        {IconBtns}

        {groupName && <>{GroupName}
          <Typography margin={'2rem'}
          alignSelf={'flex-start'}
          variant='body1'>
            Members
          </Typography>

          <Stack maxWidth={'45rem'} 
          width={'100%'}
          boxSizing={'border-box'}
          padding={{
            sm: '1rem',
            xs: '0',
            md: '1rem 4rem'
          }}
          spacing={'2rem'}
          bgcolor={'bisque'}
          height={'50vh'}
          overflow={'auto'}>

            {/* membeeeers */}
          </Stack>
          {ButtonGroup}
        </>}
      </Grid>
      {isAddMember && <Suspense fallback={<Backdrop open/>}>
        <AddMemberDialog/>
        </Suspense>}
          {confirmDelete && <Suspense fallback={<Backdrop open/>}>
            <ConfirmDeleteDialog open={confirmDelete} handleClose={closeConfirmDeleteHandler}/>
            </Suspense>}
      <Drawer sx={{
        display: {
          xs: 'block',
          sm: 'none'
        }
      }}
      open={isMobileMenuOpen} onClose={handleMobileClose}>
         <GroupsList w={'50vw'} myGroups={sampleChats} chatId={chatId}/>
      </Drawer>
    </Grid>
  )
}

const GroupsList = ({w='100%', myGroups=[], chatId}) => {
  <Stack width={w}>
    {myGroups.length>0 ? (
      myGroups.map((group)=>{<GroupListItem group={group} key={group._id} chatId={chatId}/>})
    ):(
      <Typography textAlign={'center'} padding={'1rem'}>no Grp</Typography>
    )}
  </Stack>

}

const GroupListItem = memo(({group, chatId})=> {
  const {name,avatar,_id} = group
  return (
  <Link to={`?group=${_id}`} 
    onClick={e=>{
      if(chatId===_id) e.preventDefault()}}>
        
    <Stack direction={'row'} spacing={'1rem'} alignItems={'center'}>
      <AvatarCard avatar={avatar}/>
      <Typography>{name}</Typography>
    </Stack>
  </Link>)
})

export default Groups