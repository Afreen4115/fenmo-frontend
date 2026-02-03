import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slide,
  Zoom,
  Autocomplete,
} from "@mui/material";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddExpenseDialog = ({ open, onClose, onAdd, categories = [] }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  

  const handleSubmit = () => {
    if (description && amount && date && category) {
      onAdd({ description, amount: parseFloat(amount), date, category });
      setDescription("");
      setAmount("");
      setDate("");
      setCategory("");
      onClose();
      
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        className: "rounded-2xl shadow-2xl",
        sx: {
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          borderRadius: 4,

        },
      }}
    >
      <DialogTitle
        className="bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold text-xl py-6 px-8"
        sx={{
          background: "linear-gradient(135deg, #10b981 0%, #2563eb 100%)",
          color: "white",
          fontWeight: 700,
          fontSize: "1.5rem",
          py: 3,
          px: 4,
        }}
      >
        Add New Expense
      </DialogTitle>
      <DialogContent className="p-16 space-y-9 mt-4">
        <Zoom in={open} timeout={500}>
          <TextField
            autoFocus
            margin="dense"
            label="Description"
            fullWidth
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-white rounded-lg"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "white",
                "&:hover fieldset": {
                  borderColor: "#3b82f6",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#2563eb",
                  borderWidth: 2,
                },
              },
            }}
          />
        </Zoom>

        <Zoom in={open} timeout={700}>
          <TextField
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            variant="outlined"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-white rounded-lg"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "white",
                "&:hover fieldset": {
                  borderColor: "#3b82f6",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#2563eb",
                  borderWidth: 2,
                },
              },
            }}
          />
        </Zoom>

        <Zoom in={open} timeout={800}>
          <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-white rounded-lg"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "white",
                "&:hover fieldset": {
                  borderColor: "#3b82f6",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#2563eb",
                  borderWidth: 2,
                },
              },
            }}
          />
        </Zoom>

        <Zoom in={open} timeout={600}>
          <Autocomplete
            freeSolo
            options={categories.map((cat) => cat.name)}
            value={category}
            onChange={(event, newValue) => {
              setCategory(newValue || "");
            }}
            onInputChange={(event, newInputValue) => {
              setCategory(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Category"
                fullWidth
                margin="dense"
                className="bg-white rounded-lg"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "white",
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#3b82f6",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#2563eb",
                      borderWidth: 2,
                    },
                  },
                }}
              />
            )}
          />
        </Zoom>
      </DialogContent>
      <DialogActions className="p-6 bg-gray-50 border-t border-gray-200"
      sx={{p:2}}>
        <Button
          onClick={onClose}
          type="outlined"
          className="text-gray-600 hover:bg-gray-100 font-semibold px-6 py-2 rounded-lg transition-all duration-200"
          sx={{
            color: "#6b7280",
            "&:hover": {
              backgroundColor: "#f3f4f6",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold px-8 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          sx={{
            background: "linear-gradient(135deg, #10b981 0%, #2563eb 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #059669 0%, #1d4ed8 100%)",
              transform: "scale(1.05)",
            },
          }}
        >
          Add Expense
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddExpenseDialog;
