import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Fade,
  Grow,
} from "@mui/material";

const ExpenseTable = ({
  expenses,
  categories = [],
  categoryFilter,
  onCategoryFilterChange,
  onFetchExpenses,
}) => {
  const getCategoryColor = (categoryName) => {
    const colorMap = {
      Food: "bg-orange-100 text-orange-800 border border-orange-200",
      Transport: "bg-blue-100 text-blue-800 border border-blue-200",
      Entertainment: "bg-purple-100 text-purple-800 border border-purple-200",
      Other: "bg-gray-100 text-gray-800 border border-gray-200",
    };
    return colorMap[categoryName] || "bg-indigo-100 text-indigo-800 border border-indigo-200";
  };
  const total = expenses.reduce(
    (sum, expense) => sum + parseFloat(expense.amount),
    0,
  );

  const handleFilterApply = () => {
    onFetchExpenses(categoryFilter);
  };

  const handleClearFilter = () => {
    onCategoryFilterChange(null);
    onFetchExpenses(null);
  };

  return (
    <Grow in={true} timeout={600}>
      <TableContainer
        component={Paper}
        elevation={3}
        className="shadow-lg rounded-xl overflow-hidden bg-gradient-to-br from-white to-gray-50"
        sx={{
          mt: 4,
          borderRadius: 3,
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1), 0 4px 10px rgba(0,0,0,0.05)",
          overflowX: "auto", // Allow horizontal scroll if needed
          "&::-webkit-scrollbar": {
            height: "4px",
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(156, 163, 175, 0.5)",
            borderRadius: "2px",
            "&:hover": {
              background: "rgba(156, 163, 175, 0.7)",
            },
          },
          "&::-webkit-scrollbar-corner": {
            background: "transparent",
          },
        }}
      >
        <Box className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <Typography
            variant="h6"
            component="div"
            className="text-white font-bold text-xl"
            sx={{ fontWeight: 700 }}
          >
            Expense List
          </Typography>
        </Box>
        <Box sx={{ p: 3 }} className="bg-gray-50 border-b border-gray-200">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            className="flex-wrap gap-2"
          >
            <FormControl
              sx={{ minWidth: 120 }}
              size="small"
              className="bg-white rounded-lg shadow-sm"
            >
              <InputLabel className="text-gray-700 font-medium">
                Category
              </InputLabel>
              <Select
                value={categoryFilter || ""}
                label="Category"
                onChange={(e) => onCategoryFilterChange(e.target.value || null)}
                className="rounded-lg"
              >
                <MenuItem value="">
                  <em>All Categories</em>
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box display="flex" gap={2} alignItems="center">
              <Button
                variant="contained"
                onClick={handleFilterApply}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                sx={{
                  background:
                    "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
                    transform: "scale(1.05)",
                  },
                }}
              >
                Apply Filter
              </Button>
              <Button
                variant="outlined"
                onClick={handleClearFilter}
                className="border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold px-6 py-2 rounded-lg transition-all duration-200"
                sx={{
                  borderColor: "#d1d5db",
                  "&:hover": {
                    borderColor: "#9ca3af",
                    backgroundColor: "#f9fafb",
                  },
                }}
              >
                Clear Filter
              </Button>
            </Box>
          </Box>
        </Box>
        <Table className="min-w-full" sx={{ minWidth: 650 }}>
          <TableHead className="bg-gradient-to-r from-slate-100 via-gray-50 to-slate-100 border-b-2 border-gray-200">
            <TableRow>
              <TableCell className="font-bold text-slate-800 py-5 px-6 text-sm uppercase tracking-wider">
                Description
              </TableCell>
              <TableCell className="font-bold text-slate-800 py-5 px-6 text-sm uppercase tracking-wider">
                Category
              </TableCell>
              <TableCell className="font-bold text-slate-800 py-5 px-6 text-sm uppercase tracking-wider">
                Date
              </TableCell>
              <TableCell
                align="right"
                className="font-bold text-slate-800 py-5 px-6 text-sm uppercase tracking-wider"
              >
                Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 12 }}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      color: "text.secondary",
                      opacity: 0.8,
                    }}
                  >
                    <Box
                      sx={{
                        fontSize: "4rem",
                        mb: 3,
                        opacity: 0.6,
                        animation: "float 3s ease-in-out infinite",
                        "@keyframes float": {
                          "0%, 100%": { transform: "translateY(0px)" },
                          "50%": { transform: "translateY(-10px)" },
                        },
                      }}
                    ></Box>
                    <Typography
                      variant="h5"
                      sx={{
                        mb: 2,
                        fontWeight: 600,
                        color: "text.primary",
                        textAlign: "center",
                      }}
                    >
                      No Expenses Found
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        textAlign: "center",
                        maxWidth: 400,
                        lineHeight: 1.6,
                        color: "text.secondary",
                      }}
                    >
                      You haven't added any expenses yet. Click the "Add
                      Expense" button above to get started tracking your
                      spending and managing your budget effectively.
                    </Typography>
                    <Box
                      sx={{
                        mt: 3,
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                        border: "1px dashed",
                        borderColor: "primary.light",
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{ color: "primary.main", fontWeight: 500 }}
                      >
                        Tip: Start by adding your daily expenses to see insights
                        and trends
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {expenses.map((expense, index) => (
                  <Fade in={true} timeout={300 + index * 100} key={expense.id}>
                    <TableRow
                      className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 border-b border-gray-100 group"
                      sx={{
                        "&:hover": {
                          background:
                            "linear-gradient(135deg, rgba(239, 246, 255, 0.8) 0%, rgba(238, 242, 255, 0.8) 100%)",
                          transform: "scale(1.005) translateY(-1px)",
                          boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        },
                        "&:nth-of-type(even)": {
                          backgroundColor: "rgba(249, 250, 251, 0.5)",
                        },
                      }}
                    >
                      <TableCell className="py-5 px-6">
                        <Box>
                          <Typography
                            variant="body1"
                            className="text-gray-900 font-semibold leading-tight mb-1 group-hover:text-blue-900 transition-colors duration-200"
                            sx={{ fontWeight: 600 }}
                          >
                            {expense.description}
                          </Typography>
                          <Typography
                            variant="caption"
                            className="text-gray-500 text-xs uppercase tracking-wide"
                          >
                            Expense #{expense.id?.slice(-4) || index + 1}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell className="py-5 px-6">
                        <Box
                          className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${getCategoryColor(expense.category)}`}
                          sx={{
                            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                            transition: "all 0.2s ease-in-out",
                            "&:hover": {
                              transform: "scale(1.05)",
                            },
                          }}
                        >
                          {expense.category}
                        </Box>
                      </TableCell>
                      <TableCell className="py-5 px-6">
                        <Box>
                          <Typography
                            variant="body2"
                            className="text-gray-900 font-semibold mb-0.5"
                            sx={{ fontWeight: 600, fontSize: "0.95rem" }}
                          >
                            {new Date(expense.date).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </Typography>
                          <Typography
                            variant="caption"
                            className="text-blue-600 font-medium text-xs uppercase tracking-wide"
                            sx={{ fontWeight: 500 }}
                          >
                            {new Date(expense.date).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "short",
                              },
                            )}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right" className="py-5 px-6">
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="flex-end"
                        >
                          <Typography
                            variant="h6"
                            className="text-emerald-600 font-bold text-xl font-mono tracking-tight"
                            sx={{
                              color: "#059669",
                              fontWeight: 700,
                              textShadow: "0 1px 2px rgba(5, 150, 105, 0.1)",
                            }}
                          >
                            ₹{parseFloat(expense.amount).toFixed(2)}
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  </Fade>
                ))}
                <Grow in={true} timeout={800}>
                  <TableRow
                    className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 shadow-lg"
                    sx={{
                      background:
                        "linear-gradient(135deg, #10b981 0%, #14b8a6 50%, #06b6d4 100%)",
                      boxShadow:
                        "0 8px 25px rgba(16, 185, 129, 0.3), 0 4px 10px rgba(16, 185, 129, 0.2)",
                      border: "2px solid rgba(255, 255, 255, 0.2)",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #059669 0%, #0f766e 50%, #0891b2 100%)",
                        transform: "translateY(-2px)",
                        boxShadow:
                          "0 12px 35px rgba(16, 185, 129, 0.4), 0 6px 15px rgba(16, 185, 129, 0.3)",
                        transition: "all 0.3s ease-in-out",
                      },
                    }}
                  >
                    <TableCell
                      colSpan={3}
                      sx={{
                        fontWeight: 700,
                        fontSize: "1.25rem",
                        color: "white",
                        textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                      }}
                      className="py-6 px-6"
                    >
                      <Box display="flex" alignItems="center" gap={2}>
                        <span>Total Expenses</span>
                      </Box>
                    </TableCell>
                    <TableCell
                      align="right"
                      colSpan={1}
                      sx={{
                        fontWeight: 800,
                        fontSize: "1.5rem",
                        color: "white",
                        textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                      }}
                      className="py-6 px-6"
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="flex-end"
                        gap={1}
                      >
                        <span className="text-yellow-200 text-lg">₹</span>
                        <span className="font-mono tracking-wide">
                          {total.toFixed(2)}
                        </span>
                      </Box>
                    </TableCell>
                  </TableRow>
                </Grow>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Grow>
  );
};

export default ExpenseTable;
