import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExpenses,
  addExpense,
  setCategoryFilter,
  fetchCategories,
} from "./features/expenseSlice";
import { useTheme } from "./contexts/ThemeContext";
import {
  Container,
  Typography,
  Button,
  Box,
  CssBaseline,
  IconButton,
  Paper,
  Fade,
  CircularProgress,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import ExpenseTable from "./components/ExpenseTable";
import AddExpenseDialog from "./components/AddExpenseDialog";

function App() {
  const dispatch = useDispatch();
  const {
    list: expenses,
    categories,
    status,
    categoryFilter,
  } = useSelector((state) => state.expenses);
  const { darkMode, toggleTheme } = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchExpenses());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddExpense = async (expense) => {
    try {
      await dispatch(addExpense(expense)).unwrap();
      dispatch(fetchExpenses());
      dispatch(fetchCategories());
    } catch (err) {
      console.error("Add expense failed", err);
    }
  };



  const handleCategoryFilterChange = (category) => {
    dispatch(setCategoryFilter(category));
  };

  const handleFetchExpenses = (category) => {
    dispatch(fetchExpenses(category));
  };

  return (
    <>
      <CssBaseline />
      <Box
        className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50"
        sx={{
          minHeight: "100vh",
          background: darkMode
            ? "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)"
            : "linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #faf5ff 100%)",
          transition: "background 0.3s ease-in-out",
        }}
      >
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Fade in={true} timeout={800}>
            <Paper
              elevation={0}
              className="rounded-3xl overflow-hidden shadow-xl"
              sx={{
                borderRadius: 6,
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <Box
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden"
                sx={{
                  background:
                    "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #ec4899 100%)",
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                    opacity: 0.1,
                  },
                }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ p: 4, position: "relative", zIndex: 1 }}
                >
                  <Box>
                    <Typography
                      variant="h3"
                      component="h1"
                      className="text-white font-black mb-2"
                      sx={{
                        fontWeight: 900,
                        fontSize: { xs: "2rem", md: "2.5rem" },
                        background:
                          "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      Expense Tracker
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      className="text-blue-100 font-medium"
                      sx={{ opacity: 0.9 }}
                    >
                      Manage your expenses with style and ease
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={2}>
                    <IconButton
                      onClick={toggleTheme}
                      className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-all duration-300 transform hover:scale-110"
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        backdropFilter: "blur(10px)",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.3)",
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      {darkMode ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                    <Button
                      variant="contained"
                      onClick={() => setDialogOpen(true)}
                      className="bg-white text-purple-600 hover:bg-blue-50 font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      sx={{
                        backgroundColor: "white",
                        color: "#7c3aed",
                        fontWeight: 700,
                        px: 4,
                        py: 1.5,
                        borderRadius: 3,
                        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                        "&:hover": {
                          backgroundColor: "#f0f9ff",
                          transform: "scale(1.05)",
                          boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
                        },
                      }}
                    >
                      Add Expense
                    </Button>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ p: 4 }}>
                {status === "loading" && (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ py: 8 }}
                  >
                    <CircularProgress
                      size={60}
                      className="text-purple-600"
                      sx={{ color: "#7c3aed" }}
                    />
                    <Typography variant="h6" sx={{ ml: 2, color: "#7c3aed" }}>
                      Loading expenses...
                    </Typography>
                  </Box>
                )}
                {status === "failed" && (
                  <Fade in={true} timeout={500}>
                    <Paper
                      sx={{
                        p: 4,
                        textAlign: "center",
                        backgroundColor: "#fef2f2",
                        border: "1px solid #fecaca",
                        borderRadius: 3,
                      }}
                    >
                      <Typography color="error" variant="h6" gutterBottom>
                        ❌ Error loading expenses
                      </Typography>
                      <Typography color="text.secondary">
                        Please check your connection and try again.
                      </Typography>
                    </Paper>
                  </Fade>
                )}
                {status === "succeeded" && (
                  <ExpenseTable
                    expenses={expenses}
                    categories={categories}
                    categoryFilter={categoryFilter}
                    onCategoryFilterChange={handleCategoryFilterChange}
                    onFetchExpenses={handleFetchExpenses}
                  />
                )}
              </Box>
            </Paper>
          </Fade>

          <AddExpenseDialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            onAdd={handleAddExpense}
            categories={categories}
          />
        </Container>
      </Box>
    </>
  );
}

export default App;
