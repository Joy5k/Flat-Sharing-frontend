'use client'

import { Box, Button, IconButton, Typography } from "@mui/material"
import Image from "next/image"
import { useSelector } from "react-redux"
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ShoppingCart as ShoppingCartIcon
} from '@mui/icons-material';
import { useAppDispatch } from "@/redux/hooks";
import { removeProduct } from "@/redux/api/wishlist";
import { toast } from "sonner";
import InfoIcon from '@mui/icons-material/Info';
import Link from "next/link";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function Wishlist() {
  const dispatch = useAppDispatch()
  const {products} = useSelector((state: any) => state.product)
  const  handleRemove = (id: string) => {
    dispatch(removeProduct(id))
    toast.error("Removed from wishlist!")
  }
  return (
   <Box>
   <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
  <Typography variant="h3" sx={{ 
    mb: 4, 
    fontWeight: 'bold',
    color: 'primary.main',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2
  }}>
    My Wishlist
  </Typography>

  {products.length === 0 ? (
    <Box sx={{ 
      textAlign: 'center', 
      p: 4,
      border: '2px dashed',
      borderColor: 'divider',
      borderRadius: 2
    }}>
      <FavoriteBorderIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 2 }} />
      <Typography variant="h6" color="text.secondary">
        Your wishlist is empty
      </Typography>
    </Box>
  ) : (
    <Box sx={{ 
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 2,
      overflow: 'hidden'
    }}>
      {/* Table Header */}
      <Box sx={{ 
        display: { xs: 'none', md: 'flex' },
        bgcolor: 'background.paper',
        p: 2,
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}>
        <Typography variant="subtitle1" sx={{ flex: 2, fontWeight: 'bold' }}>Flat</Typography>
        <Typography variant="subtitle1" sx={{ flex: 1.5, fontWeight: 'bold' }}>Details</Typography>
        <Typography variant="subtitle1" sx={{ flex: 1, fontWeight: 'bold' }}>Price</Typography>
        <Typography variant="subtitle1" sx={{ flex: 1, fontWeight: 'bold' }}>Actions</Typography>
      </Box>
    
      {/* Product Items */}
      {products.map((product: any) => (
        <Box key={product.id} sx={{ 
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { md: 'center' },
          p: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
          transition: 'background-color 0.3s',
          '&:hover': { bgcolor: 'action.hover' },
          '&:last-child': { borderBottom: 'none' }
        }}>
          {/* Product Image & Info */}
          <Box sx={{ 
            flex: 2,
            display: 'flex',
            alignItems: 'center',
            mb: { xs: 2, md: 0 }
          }}>
            <Image 
              src={product.image} 
              alt={product.name} 
              width={80}
              height={80}
              style={{ 
                borderRadius: 1,
                marginRight: 16
              }} 
            />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>{product.name}</Typography>
              <Typography variant="body2" color="text.secondary">{product.category}</Typography>
            </Box>
          </Box>
    
          {/* Details Link */}
          <Box sx={{ 
            flex: 1.5,
            mb: { xs: 2, md: 0 },
            pl: { md: 2 },
            display: 'flex',
            alignItems: 'center'
          }}>
            <Button
              component={Link}
              href={`/flatDetails/${product?.id}`}
              variant="text"
              color="primary"
              startIcon={<InfoIcon />}
              sx={{
                textAlign: 'left',
                justifyContent: { xs: 'center', md: 'flex-start' },
                width: '100%'
              }}
            >
              View Details
            </Button>
          </Box>
    
          {/* Price */}
          <Box sx={{ 
            flex: 1,
            mb: { xs: 2, md: 0 },
            pl: { md: 2 },
            textAlign: { xs: 'center', md: 'left' }
          }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              ${product.price}
            </Typography>
            {product.originalPrice && (
              <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                ${product.originalPrice}
              </Typography>
            )}
          </Box>
    
          {/* Actions */}
          <Box sx={{ 
            flex: 1,
            display: 'flex',
            gap: 2,
            pl: { md: 2 },
            justifyContent: { xs: 'center', md: 'flex-start' }
          }}>
           <Button 
  variant="contained" 
  color="primary"
  size="small"
  startIcon={
    <Box sx={{ fontSize: { xs: 14, sm: 16 } }}>
      <ShoppingCartIcon fontSize="inherit" />
    </Box>
  }
  sx={{ 
    flex: 1, 
    maxWidth: { xs: '100%', md: 180 },
    fontSize: { xs: '0.75rem', sm: '0.875rem' },
    py: { xs: 0.5, sm: 1 },
    px: { xs: 1, sm: 2 },
    height: { xs: 32, sm: 38 },
    '& .MuiButton-startIcon': {
      mr: { xs: 0.5, sm: 1 }
    }
  }}
>
  share
</Button>
            <IconButton 
              color="error"
              aria-label="Remove"
              onClick={() => handleRemove(product.id)}
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              <DeleteForeverIcon />
            </IconButton>
          </Box>
        </Box>
      ))}
    </Box>
  )}
</Box>
   </Box>
  )
}

export default Wishlist