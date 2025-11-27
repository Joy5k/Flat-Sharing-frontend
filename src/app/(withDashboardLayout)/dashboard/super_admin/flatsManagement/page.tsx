"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  Tooltip,
  Alert,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Input,

} from "@mui/material";
import ReplayIcon from '@mui/icons-material/Replay';import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Restore as RestoreIcon,
  Visibility as ViewIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useGetAllFlatBySuperAdminQuery, useUpdateFlatByAdminMutation, useDeleteFlatByAdminMutation, useRetriveDeletedFlatBySuperAdminMutation, useActiveateDeactivatedFlatBySuperAdminMutation } from "@/redux/api/flatApi";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import FlatUpdateModal from "../../profile/components/FlatUpdateModal";

// Animation variants
const tableRowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: -100 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

interface Flat {
  id: string;
  location: string;
  rentAmount: number;
  bedrooms: number;
  description: string;
  photos: Array<{ imageUrl: string }>;
  amenities: string[];
  isDeleted: boolean;
  isActive:boolean;
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export default function FlatManagementPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "deleted">("all");
  const [selectedFlat, setSelectedFlat] = useState<Flat | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false);

  const { data: flatsData, isLoading, error, refetch } = useGetAllFlatBySuperAdminQuery({});
  const [updateFlat, { isLoading: updating }] = useUpdateFlatByAdminMutation();
  const [deleteFlat] = useDeleteFlatByAdminMutation();
  const [restoreFlat] = useRetriveDeletedFlatBySuperAdminMutation();
  const [reActiveFlat]=useActiveateDeactivatedFlatBySuperAdminMutation();

  const flats: Flat[] = flatsData || [];

  // Filter and search functionality
  const filteredFlats = flats.filter((flat) => {
    const matchesSearch = flat.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         flat.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" ? true :
                         statusFilter === "active" ? !flat.isDeleted : flat.isDeleted;
    
    return matchesSearch && matchesStatus;
  });

  const paginatedFlats = filteredFlats.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (flat: Flat) => {
    setSelectedFlat(flat);
    setIsEditModalOpen(true);
  };


  const handleDelete = (flat: Flat) => {
    setSelectedFlat(flat);
    setIsDeleteDialogOpen(true);
  };


  const confirmDelete = async () => {
    if (!selectedFlat) return;
    
    try {
      const res = await deleteFlat(selectedFlat.id).unwrap();
      if (res?.count) {
        toast.success("Flat deleted successfully");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to delete flat");
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedFlat(null);
    }
  };

  const confirmRestore = async (id:string) => {
    if (!id) return;
    
    try {
      const res = await restoreFlat(id).unwrap();
      if (res?.count) {
        toast.success("Flat restored successfully");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to restore flat");
    } finally {
      setIsRestoreDialogOpen(false);
      setSelectedFlat(null);
    }
  };
const handleFlatActivationBySuperAdmin=async(id:string)=>{
  try {
    const res= await reActiveFlat(id).unwrap();
    if(res.success){
      toast.message(res.message)
    }
  } catch (error:any) {
    console.log(error.message||"something went wrong ")
  } 
}
  const handleUpdateFlat = async (flatData: any) => {
    if (!selectedFlat) return;
    
    try {
      const res = await updateFlat({ id: selectedFlat.id, ...flatData }).unwrap();
      if (res?.id) {
        toast.success("Flat updated successfully");
        setIsEditModalOpen(false);
        setSelectedFlat(null);
        refetch();
      }
      console.log(res)
    } catch (error) {
   console.log(error,"This Error is getting when flat update trying to update")
  };
}

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Error loading flats data. Please try again.
        </Alert>
        <Button variant="contained" onClick={refetch}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <Typography
          variant="h3"
          component="h1"
          className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-600"
          gutterBottom
        >
          Flat Management
        </Typography>
        <Typography variant="h6" color="text.secondary" className="mb-4">
          Super Admin Panel - Manage all flats including deleted records
        </Typography>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-6"
      >
        <Paper className="p-4 rounded-2xl shadow-lg border border-blue-100">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <TextField
              placeholder="Search flats by location or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 min-w-[300px]"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon className="text-blue-500" />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
            
            <FormControl className="min-w-[150px]">
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                label="Status"
                startAdornment={
                  <InputAdornment position="start">
                    <FilterIcon className="text-blue-500" />
                  </InputAdornment>
                }
              >
                <MenuItem value="all">All Flats</MenuItem>
                <MenuItem value="active">Active Only</MenuItem>
                <MenuItem value="deactivated">Deactivate Only</MenuItem>

                <MenuItem value="deleted">Deleted Only</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              onClick={refetch}
              disabled={isLoading}
              className="min-w-[120px]"
            >
              {isLoading ? "Refreshing..." : "Refresh Data"}
            </Button>
          </div>
        </Paper>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Paper className="p-4 text-center bg-white rounded-2xl shadow-lg border border-green-200">
            <Typography variant="h4" className="font-bold text-green-600">
              {flats.filter(f => !f.isDeleted).length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Active Flats
            </Typography>
          </Paper>
          <Paper className="p-4 text-center bg-white rounded-2xl shadow-lg border border-red-200">
            <Typography variant="h4" className="font-bold text-red-600">
              {flats.filter(f => f.isDeleted).length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Deleted Flats
            </Typography>
          </Paper>
          <Paper className="p-4 text-center bg-white rounded-2xl shadow-lg border border-blue-200">
            <Typography variant="h4" className="font-bold text-blue-600">
              {flats.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Flats
            </Typography>
          </Paper>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Paper className="rounded-2xl shadow-xl overflow-hidden border border-blue-100">
          <TableContainer>
            <Table>
              <TableHead className="bg-gradient-to-r from-[#c5e9f2] to-[#e3f8fd]">
                <TableRow>
                  <TableCell className="text-white font-bold">Select</TableCell>
                   <TableCell className="text-white font-bold">Location</TableCell>

                  <TableCell className="text-white font-bold">Rent</TableCell>
                  <TableCell className="text-white font-bold">Bedrooms</TableCell>
                  <TableCell className="text-white font-bold">Status</TableCell>
                  <TableCell className="text-white font-bold">Created</TableCell>
                  <TableCell className="text-white font-bold text-center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        <Typography className="ml-3 text-blue-600">
                          Loading flats...
                        </Typography>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : paginatedFlats.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <Typography variant="h6" color="text.secondary">
                        No flats found matching your criteria
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  <AnimatePresence>
                    {paginatedFlats.map((flat, index) => (
                      <motion.tr
                        key={flat.id}
                        variants={tableRowVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`hover:bg-blue-50 transition-colors ${
                          flat.isDeleted ? 'bg-red-50' : ''
                        }`}
                      >
                        <TableCell className="">
                          <Input type="checkbox" disableUnderline className="w-5 h-auto" />
                        </TableCell>
                        <TableCell>
                          <div>
                            <Typography variant="subtitle1" className="font-semibold">
                              {flat.location}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" className="truncate max-w-[200px]">
                              {flat.description}
                            </Typography>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Typography className="font-bold text-green-600">
                            ${flat.rentAmount}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={`${flat.bedrooms} BD`}
                            color="primary"
                            variant="outlined"
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={flat.isDeleted ? "Deleted" : "Active"}
                            color={flat.isDeleted ? "error" : "success"}
                            variant="filled"
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {new Date(flat.createdAt).toLocaleDateString()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <div  className="flex justify-center space-x-1">
                            {
                              flat.isActive ? <Tooltip title="View Details">
                              <Link href={`/flatDetails/${flat.id}`} >
                              
                              <IconButton
                                className="text-blue-500 hover:bg-blue-100"
                                size="small"
                              >
                                <ViewIcon />

                              </IconButton>
                              
                              </Link>
                            </Tooltip> :<Tooltip title="Active flat">
                              
                              
                              <IconButton
                              onClick={()=>handleFlatActivationBySuperAdmin(flat.id)}
                                className="text-blue-500 hover:bg-blue-100"
                                size="small"
                              >
                                <ReplayIcon />

                              </IconButton>
                              
                
                            </Tooltip>
                            }
                            
                            <Tooltip title="Edit Flat">
                              <IconButton
                                onClick={() => handleEdit(flat)}
                                disabled={flat.isDeleted}
                                className="text-green-500 hover:bg-green-100"
                                size="small"
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>

                            {flat.isDeleted ? (
                              <Tooltip title="Restore Flat">
                                <IconButton
                                  onClick={() => confirmRestore(flat.id)}
                                  className="text-orange-500 hover:bg-orange-100"
                                  size="small"
                                >
                                  <RestoreIcon />
                                </IconButton>
                              </Tooltip>
                            ) : (
                              <Tooltip title="Delete Flat">
                                <IconButton
                                  onClick={() => handleDelete(flat)}
                                  className="text-red-500 hover:bg-red-100"
                                  size="small"
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            )}
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={filteredFlats.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            className="border-t border-blue-100"
          />
        </Paper>
      </motion.div>

      {/* View Modal */}
      <Dialog
        open={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          Flat Details
        </DialogTitle>
        <DialogContent className="p-6">
          {selectedFlat && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Typography variant="subtitle2" color="text.secondary">
                    Location
                  </Typography>
                  <Typography variant="body1" className="font-semibold">
                    {selectedFlat.location}
                  </Typography>
                </div>
                <div>
                  <Typography variant="subtitle2" color="text.secondary">
                    Rent Amount
                  </Typography>
                  <Typography variant="body1" className="font-semibold text-green-600">
                    ${selectedFlat.rentAmount}
                  </Typography>
                </div>
                <div>
                  <Typography variant="subtitle2" color="text.secondary">
                    Bedrooms
                  </Typography>
                  <Typography variant="body1" className="font-semibold">
                    {selectedFlat.bedrooms}
                  </Typography>
                </div>
                <div>
                  <Typography variant="subtitle2" color="text.secondary">
                    Status
                  </Typography>
                  <Chip
                    label={selectedFlat.isDeleted ? "Deleted" : "Active"}
                    color={selectedFlat.isDeleted ? "error" : "success"}
                    size="small"
                  />
                </div>
              </div>
              <div>
                <Typography variant="subtitle2" color="text.secondary">
                  Description
                </Typography>
                <Typography variant="body1" className="mt-1">
                  {selectedFlat.description}
                </Typography>
              </div>
              {selectedFlat.photos && selectedFlat.photos.length > 0 && (
                <div>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Photos
                  </Typography>
                  <div className="flex space-x-2 overflow-x-auto">
                    {selectedFlat.photos.map((photo, index) => (
                      <Image
                        key={index}
                        src={photo.imageUrl}
                        alt={`Flat ${index + 1}`}
                        className="w-24 h-24 object-cover rounded-lg border"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsViewModalOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <DialogTitle className="bg-red-50 text-red-700">
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the flat at{" "}
            <strong>{selectedFlat?.location}</strong>? This action can be undone by restoring the flat.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={confirmDelete}
            variant="contained"
            color="error"
            // disabled={deleting}
          >
            {/* {deleting ? "Deleting..." : "Delete"} */}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Restore Confirmation Dialog */}
      <Dialog
        open={isRestoreDialogOpen}
        onClose={() => setIsRestoreDialogOpen(false)}
      >
        <DialogTitle className="bg-green-50 text-green-700">
          Confirm Restore
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to restore the flat at{" "}
            <strong>{selectedFlat?.location}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsRestoreDialogOpen(false)}>Cancel</Button>
          <Button
            // onClick={confirmRestore}
            variant="contained"
            color="success"
            disabled={updating}
          >
            {updating ? "Restoring..." : "Restore"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* You'll need to create or import the FlatUpdateModal component */}
      <FlatUpdateModal
        open={isEditModalOpen}
        setOpen={setIsEditModalOpen}
        flat={selectedFlat}
        updateFlat={handleUpdateFlat}
      />
    </motion.div>
  );
}