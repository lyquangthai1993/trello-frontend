import { Comment, Group, Share } from '@mui/icons-material'
import { Card as MuiCard, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import Button from '@mui/material/Button'

function Card({
  temporaryHideMedia
}) {
  if (temporaryHideMedia) {
    return (
      <MuiCard sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.4)',
        overflow: 'unset'
      }}>
        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
          <Typography>Lizard</Typography>
        </CardContent>
        <CardActions sx={{ p: '0 4px 8px 4px' }}>
          <Button size="small" startIcon={<Group/>}>20</Button>
          <Button size="small" startIcon={<Comment/>}>15</Button>
          <Button size="small" startIcon={<Share/>}>10</Button>
        </CardActions>
      </MuiCard>
    )
  }

  return (
    <MuiCard sx={{
      cursor: 'pointer',
      boxShadow: '0 1px 1px rgba(0, 0, 0, 0.4)',
      overflow: 'unset'
    }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography>Lizard</Typography>
      </CardContent>
      <CardActions sx={{ p: '0 4px 8px 4px' }}>
        <Button size="small" startIcon={<Group/>}>20</Button>
        <Button size="small" startIcon={<Comment/>}>15</Button>
        <Button size="small" startIcon={<Share/>}>10</Button>
      </CardActions>
    </MuiCard>
  )
}

export default Card

