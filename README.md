💳 Expense Tracker UI
A fast, responsive web interface for tracking personal finances, built with React, Vite, and Javascript.

🎨 Key Features
Real-time Totals: Automatically calculates and displays the total amount of currently filtered expenses.

Smart Filtering: Instant UI updates when filtering by category or sorting by date.

Network Resilience: Implements retry logic with unique request identifiers to handle unreliable connections.

Responsive Design: Clean table/list view for reviewing history.

🛠 Tech Stack
Framework: React 18+ (Vite)

Language: JavaScript

Styling: Tailwind CSS,Material UI

State Management:Redux toolkit

🏗 Component Structure
ExpenseForm: Handles adding new entries and generates unique request_ids for retries.

ExpenseList: Displays a table or list of existing entries.

Filters: UI controls for category selection and sorting.

SummaryCard: Displays the "Total: ₹X" for the visible expenses.

⚙️ Setup
Run npm install.

Run npm run dev to launch the Vite preview.
