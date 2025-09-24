// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Outstanding = () => {
//   const [vendors, setVendors] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [expandedVendor, setExpandedVendor] = useState(null);

//   // --- Parent table states ---
//   const [searchTerm, setSearchTerm] = useState("");
//   const [vendorPage, setVendorPage] = useState(1);
//   const [vendorRows, setVendorRows] = useState(10);

//   // --- Child table states ---
//   const [childPage, setChildPage] = useState(1);
//   const [childRows, setChildRows] = useState(10);
//   const [dateRange, setDateRange] = useState({ from: "", to: "" });

//   // --- Installment popup states ---
//   const [showInstallmentPopup, setShowInstallmentPopup] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [installmentDetails, setInstallmentDetails] = useState([]);

//   // --- Advanced Filter states ---
//   const [filters, setFilters] = useState({
//     orderId: "",
//     customerName: "",
//     vendorName: "",
//     dateFrom: "",
//     dateTo: "",
//     status: "all", // all, due, clear
//   });
//   const [showFilters, setShowFilters] = useState(false);

//   useEffect(() => {
//     fetchVendors();
//   }, []);

//   const fetchVendors = async () => {
//     try {
//       setLoading(true);
//       const url = `${import.meta.env.VITE_API_URL}/order/dueAmount/true`;
//       const response = await axios.get(url);
//       console.log(response);

//       setVendors(response?.data?.vendors || []);
//       toast.success(`Loaded ${response?.data?.vendors?.length} vendors`);
//     } catch (error) {
//       console.error("Error fetching vendors:", error);
//       toast.error(error.response?.data?.message || "Failed to load vendors");
//       setVendors([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleVendor = (vendorId) => {
//     setExpandedVendor(expandedVendor === vendorId ? null : vendorId);
//     setChildPage(1); // reset child pagination when toggling
//   };

//   // Function to handle installment popup
//   const handleInstallmentClick = async (order) => {
//     try {
//       setSelectedOrder(order);
//       setLoading(true);

//       // Fetch installment details for the order
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_URL}/order/installments/${order._id}`
//       );

//       setInstallmentDetails(response.data.installments || []);
//       setShowInstallmentPopup(true);
//     } catch (error) {
//       console.error("Error fetching installments:", error);
//       toast.error("Failed to load installment details");
//       // Show mock data for demonstration
//       setInstallmentDetails([
//         {
//           installmentNumber: 1,
//           amount: order.totalPriceAfterDiscount
//             ? order.totalPriceAfterDiscount / 2
//             : 0,
//           paidDate: new Date().toISOString(),
//           status: "Paid",
//         },
//         {
//           installmentNumber: 2,
//           amount: order.dueAmount || 0,
//           paidDate: null,
//           status: "Pending",
//         },
//       ]);
//       setShowInstallmentPopup(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to close installment popup
//   const closeInstallmentPopup = () => {
//     setShowInstallmentPopup(false);
//     setSelectedOrder(null);
//     setInstallmentDetails([]);
//   };

//   // Function to handle filter changes
//   const handleFilterChange = (filterName, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [filterName]: value,
//     }));
//     setVendorPage(1); // Reset to first page when filters change
//     setChildPage(1);
//   };

//   // Function to clear all filters
//   const clearAllFilters = () => {
//     setFilters({
//       orderId: "",
//       customerName: "",
//       vendorName: "",
//       dateFrom: "",
//       dateTo: "",
//       status: "all",
//     });
//     setSearchTerm("");
//     setDateRange({ from: "", to: "" });
//     setVendorPage(1);
//     setChildPage(1);
//   };

//   // Function to check if any filters are active
//   const hasActiveFilters = () => {
//     return (
//       filters.orderId ||
//       filters.customerName ||
//       filters.vendorName ||
//       filters.dateFrom ||
//       filters.dateTo ||
//       filters.status !== "all" ||
//       searchTerm ||
//       dateRange.from ||
//       dateRange.to
//     );
//   };

//   // --- Advanced filtering logic ---
//   const filterOrders = (orders) => {
//     return orders.filter((order) => {
//       // Order ID filter
//       if (
//         filters.orderId &&
//         !order.formattedId
//           ?.toLowerCase()
//           .includes(filters.orderId.toLowerCase())
//       ) {
//         return false;
//       }

//       // Customer name filter
//       if (filters.customerName) {
//         const customerName =
//           order.orderItems?.[0]?.discountName?.firmName || "";
//         if (
//           !customerName
//             .toLowerCase()
//             .includes(filters.customerName.toLowerCase())
//         ) {
//           return false;
//         }
//       }

//       // Date range filter
//       if (filters.dateFrom || filters.dateTo) {
//         const orderDate = new Date(order.createdAt);
//         const fromDate = filters.dateFrom ? new Date(filters.dateFrom) : null;
//         const toDate = filters.dateTo ? new Date(filters.dateTo) : null;

//         if (fromDate && orderDate < fromDate) return false;
//         if (toDate && orderDate > toDate) return false;
//       }

//       // Status filter
//       if (filters.status !== "all") {
//         const due = order.dueAmount || 0;
//         const isDue = due > 0;
//         if (filters.status === "due" && !isDue) return false;
//         if (filters.status === "clear" && isDue) return false;
//       }

//       return true;
//     });
//   };

//   // --- Parent filter + pagination ---
//   const filteredVendors = vendors.filter((v) => {
//     // Vendor name filter
//     const vendorMatches =
//       v.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       v.vendorName.toLowerCase().includes(filters.vendorName.toLowerCase());

//     if (!vendorMatches) return false;

//     // If vendor name filter is active, also check if vendor has matching orders
//     if (
//       filters.orderId ||
//       filters.customerName ||
//       filters.dateFrom ||
//       filters.dateTo ||
//       filters.status !== "all"
//     ) {
//       const filteredOrders = filterOrders(v.orders || []);
//       return filteredOrders.length > 0;
//     }

//     return true;
//   });

//   const paginatedVendors = filteredVendors.slice(
//     (vendorPage - 1) * vendorRows,
//     vendorPage * vendorRows
//   );

//   const totalVendorPages = Math.ceil(filteredVendors.length / vendorRows);

//   // ✅ Grand totals calculation here
//   const totals = vendors.reduce(
//     (acc, v) => {
//       const totalOrderCount = Array.isArray(v?.totalOrders)
//         ? v.totalOrders.reduce((s, n) => s + n, 0)
//         : v?.totalOrders || 0;

//       const totalAmount = v?.totalAmount || 0;
//       const totalPaid =
//         v?.totalPaid ||
//         (v?.totalAmount && v?.totalDue ? v.totalAmount - v.totalDue : 0);
//       const totalDue = v?.totalDue || 0;

//       return {
//         orders: acc.orders + totalOrderCount,
//         amount: acc.amount + totalAmount,
//         paid: acc.paid + totalPaid,
//         due: acc.due + totalDue,
//       };
//     },
//     { orders: 0, amount: 0, paid: 0, due: 0 }
//   );

//   // --- Child filter + pagination ---
//   const filterOrdersByDate = (orders) => {
//     let filteredOrders = orders;

//     // Apply date range filter (legacy)
//     if (dateRange.from || dateRange.to) {
//       filteredOrders = filteredOrders.filter((o) => {
//         const orderDate = new Date(o.latestPaymentDate || o.createdAt);
//         const fromDate = dateRange.from ? new Date(dateRange.from) : null;
//         const toDate = dateRange.to ? new Date(dateRange.to) : null;

//         if (fromDate && orderDate < fromDate) return false;
//         if (toDate && orderDate > toDate) return false;
//         return true;
//       });
//     }

//     // Apply advanced filters
//     return filterOrders(filteredOrders);
//   };

//   const paginateOrders = (orders) => {
//     return orders.slice((childPage - 1) * childRows, childPage * childRows);
//   };

//   return (
//     <div className="max-w-6xl mx-auto py-8">
//       <h2 className="text-2xl font-bold mb-6">Outstanding Vendors</h2>

//       {/* Advanced Filters */}
//       <div className="mb-6">
//         <div className="flex items-center justify-between mb-4">
//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className={`px-4 py-2 rounded text-sm font-medium ${
//               showFilters
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//             }`}
//           >
//             {showFilters ? "Hide Filters" : "Show Filters"}
//           </button>

//           {hasActiveFilters() && (
//             <button
//               onClick={clearAllFilters}
//               className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
//             >
//               Clear All Filters
//             </button>
//           )}
//         </div>

//         {showFilters && (
//           <div className="bg-gray-50 p-4 rounded-lg border">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
//               {/* Order ID Filter */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Order ID
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Search by Order ID..."
//                   value={filters.orderId}
//                   onChange={(e) =>
//                     handleFilterChange("orderId", e.target.value)
//                   }
//                   className="w-full border px-3 py-2 rounded text-sm"
//                 />
//               </div>

//               {/* Customer Name Filter */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Customer Name
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Search by Customer..."
//                   value={filters.customerName}
//                   onChange={(e) =>
//                     handleFilterChange("customerName", e.target.value)
//                   }
//                   className="w-full border px-3 py-2 rounded text-sm"
//                 />
//               </div>

//               {/* Vendor Name Filter */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Vendor Name
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Search by Vendor..."
//                   value={filters.vendorName}
//                   onChange={(e) =>
//                     handleFilterChange("vendorName", e.target.value)
//                   }
//                   className="w-full border px-3 py-2 rounded text-sm"
//                 />
//               </div>

//               {/* Date From Filter */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Date From
//                 </label>
//                 <input
//                   type="date"
//                   value={filters.dateFrom}
//                   onChange={(e) =>
//                     handleFilterChange("dateFrom", e.target.value)
//                   }
//                   className="w-full border px-3 py-2 rounded text-sm"
//                 />
//               </div>

//               {/* Date To Filter */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Date To
//                 </label>
//                 <input
//                   type="date"
//                   value={filters.dateTo}
//                   onChange={(e) => handleFilterChange("dateTo", e.target.value)}
//                   className="w-full border px-3 py-2 rounded text-sm"
//                 />
//               </div>

//               {/* Status Filter */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Status
//                 </label>
//                 <select
//                   value={filters.status}
//                   onChange={(e) => handleFilterChange("status", e.target.value)}
//                   className="w-full border px-3 py-2 rounded text-sm"
//                 >
//                   <option value="all">All Status</option>
//                   <option value="due">Due</option>
//                   <option value="clear">Clear</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Active Filters Summary */}
//       {hasActiveFilters() && (
//         <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
//           <div className="flex items-center flex-wrap gap-2">
//             <span className="text-sm font-medium text-blue-800">
//               Active Filters:
//             </span>
//             {filters.orderId && (
//               <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
//                 Order ID: {filters.orderId}
//               </span>
//             )}
//             {filters.customerName && (
//               <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
//                 Customer: {filters.customerName}
//               </span>
//             )}
//             {filters.vendorName && (
//               <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
//                 Vendor: {filters.vendorName}
//               </span>
//             )}
//             {filters.dateFrom && (
//               <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
//                 From: {filters.dateFrom}
//               </span>
//             )}
//             {filters.dateTo && (
//               <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
//                 To: {filters.dateTo}
//               </span>
//             )}
//             {filters.status !== "all" && (
//               <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
//                 Status: {filters.status}
//               </span>
//             )}
//             {searchTerm && (
//               <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
//                 Search: {searchTerm}
//               </span>
//             )}
//             {(dateRange.from || dateRange.to) && (
//               <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
//                 Date Range: {dateRange.from || "Start"} to{" "}
//                 {dateRange.to || "End"}
//               </span>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Search + Rows per page */}
//       <div className="flex items-center justify-between mb-4">
//         <input
//           type="text"
//           placeholder="Search by vendor name..."
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setVendorPage(1);
//           }}
//           className="border px-3 py-1 rounded w-64"
//         />
//         <select
//           value={vendorRows}
//           onChange={(e) => {
//             setVendorRows(Number(e.target.value));
//             setVendorPage(1);
//           }}
//           className="border px-2 py-1 rounded"
//         >
//           {[10, 25, 50, 100].map((num) => (
//             <option key={num} value={num}>
//               {num} rows
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="overflow-x-auto border rounded">
//         <table className="min-w-full divide-y divide-gray-200 text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2 text-left">Vendor</th>
//               <th className="px-4 py-2 text-left">Total Orders</th>
//               <th className="px-4 py-2 text-left">Total Amount</th>
//               <th className="px-4 py-2 text-left">Paid</th>
//               <th className="px-4 py-2 text-left">Due</th>
//               <th className="px-4 py-2 text-center">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="6" className="text-center py-4">
//                   Loading...
//                 </td>
//               </tr>
//             ) : paginatedVendors.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="text-center py-4">
//                   No vendors found.
//                 </td>
//               </tr>
//             ) : (
//               paginatedVendors.map((v) => {
//                 const totalPaid =
//                   v.totalAmount && v.totalDue
//                     ? v.totalAmount - v.totalDue
//                     : v.orders?.reduce((sum, o) => sum + (o.amount ?? 0), 0);

//                 {
//                   /* const totalOrderCount = Array.isArray(v?.totalOrders)
//                   ? v.totalOrders.reduce((sum, n) => sum + n, 0)
//                   : v?.totalOrders || 0;

//                 console.log(totalOrderCount); */
//                 }

//                 {
//                   /* const grandTotalOrders = vendors.reduce((sum, v) => {
//                   const totalOrderCount = Array.isArray(v?.totalOrders)
//                     ? v.totalOrders.reduce((s, n) => s + n, 0)
//                     : v?.totalOrders || 0;

//                   return sum + totalOrderCount;
//                 }, 0);

//                 console.log("Grand Total Orders:", grandTotalOrders); */
//                 }

//                 return (
//                   <React.Fragment key={v.vendorId}>
//                     {/* Vendor row */}
//                     <tr className="bg-gray-50 hover:bg-gray-100">
//                       <td className="px-4 py-2 font-medium">{v.vendorName}</td>
//                       <td className="px-4 py-2">{v.totalOrders}</td>
//                       <td className="px-4 py-2 text-blue-600 font-medium">
//                         ₹{(v.totalAmount ?? 0).toFixed(2)}
//                       </td>
//                       <td className="px-4 py-2 text-gray-800">
//                         ₹{(totalPaid ?? 0).toFixed(2)}
//                       </td>
//                       <td className="px-4 py-2 text-red-600 font-bold">
//                         ₹{(v.totalDue ?? 0).toFixed(2)}
//                       </td>
//                       <td className="px-4 py-2 text-center">
//                         <button
//                           onClick={() => toggleVendor(v.vendorId)}
//                           className="bg-blue-600 text-white px-3 py-1 rounded"
//                         >
//                           {expandedVendor === v.vendorId
//                             ? "Hide Orders"
//                             : "View Orders"}
//                         </button>
//                       </td>
//                     </tr>

//                     {/* Orders table */}
//                     {expandedVendor === v.vendorId && v.orders && (
//                       <tr>
//                         <td colSpan="6" className="p-0">
//                           <div className="p-4">
//                             {/* Date filter + rows selector */}
//                             <div className="flex items-center justify-between mb-2">
//                               <div className="flex gap-2">
//                                 <input
//                                   type="date"
//                                   value={dateRange.from}
//                                   onChange={(e) =>
//                                     setDateRange((prev) => ({
//                                       ...prev,
//                                       from: e.target.value,
//                                     }))
//                                   }
//                                   className="border px-2 py-1 rounded"
//                                 />
//                                 <span>to</span>
//                                 <input
//                                   type="date"
//                                   value={dateRange.to}
//                                   onChange={(e) =>
//                                     setDateRange((prev) => ({
//                                       ...prev,
//                                       to: e.target.value,
//                                     }))
//                                   }
//                                   className="border px-2 py-1 rounded"
//                                 />
//                               </div>
//                               <select
//                                 value={childRows}
//                                 onChange={(e) => {
//                                   setChildRows(Number(e.target.value));
//                                   setChildPage(1);
//                                 }}
//                                 className="border px-2 py-1 rounded"
//                               >
//                                 {[10, 25, 50, 100].map((num) => (
//                                   <option key={num} value={num}>
//                                     {num} rows
//                                   </option>
//                                 ))}
//                               </select>
//                             </div>

//                             <div className="overflow-x-auto border rounded">
//                               <table className="min-w-full divide-y divide-gray-200 text-sm">
//                                 <thead className="bg-gray-200">
//                                   <tr>
//                                     <th className="px-4 py-2 text-left">
//                                       Order ID
//                                     </th>
//                                     <th className="px-4 py-2 text-left">
//                                       Customer
//                                     </th>
//                                     <th className="px-4 py-2 text-left">
//                                       Bill Amount
//                                     </th>
//                                     <th className="px-4 py-2 text-left">
//                                       Paid
//                                     </th>
//                                     <th className="px-4 py-2 text-left">Due</th>
//                                     <th className="px-4 py-2 text-left">
//                                       Status
//                                     </th>
//                                     <th className="px-4 py-2 text-left">
//                                       Last Payment
//                                     </th>
//                                     <th className="px-4 py-2 text-left">
//                                       Date
//                                     </th>
//                                     <th className="px-4 py-2 text-center">
//                                       Installment
//                                     </th>
//                                   </tr>
//                                 </thead>
//                                 <tbody>
//                                   {paginateOrders(
//                                     filterOrdersByDate(v.orders)
//                                   ).map((o) => {
//                                     const total =
//                                       o.totalPriceAfterDiscount ??
//                                       o.totalPrice ??
//                                       0;
//                                     const paid = total - o.dueAmount ?? 0;
//                                     const due = o.dueAmount;
//                                     const status = due > 0 ? "Due" : "Clear";

//                                     return (
//                                       <tr
//                                         key={o._id}
//                                         className="hover:bg-gray-50"
//                                       >
//                                         <td className="px-4 py-2 font-mono">
//                                           {o.formattedId}
//                                         </td>
//                                         <td className="px-4 py-2">
//                                           {o.orderItems?.[0]?.discountName
//                                             ?.firmName || "N/A"}
//                                         </td>
//                                         <td className="px-4 py-2 text-blue-600">
//                                           ₹{total.toFixed(2)}
//                                         </td>
//                                         <td className="px-4 py-2 text-gray-800">
//                                           ₹{paid.toFixed(2)}
//                                         </td>
//                                         <td className="px-4 py-2 text-red-600 font-bold">
//                                           ₹{due.toFixed(2)}
//                                         </td>
//                                         <td className="px-4 py-2">
//                                           <span
//                                             className={`px-2 py-1 rounded-full text-xs font-medium ${
//                                               status === "Due"
//                                                 ? "bg-red-100 text-red-800"
//                                                 : "bg-green-100 text-green-800"
//                                             }`}
//                                           >
//                                             {status}
//                                           </span>
//                                         </td>
//                                         <td className="px-4 py-2 text-gray-500">
//                                           {o.latestPaymentDate
//                                             ? new Date(
//                                                 o.latestPaymentDate
//                                               ).toLocaleDateString()
//                                             : "No Payment"}
//                                         </td>
//                                         <td className="px-4 py-2 text-gray-500">
//                                           {o.createdAt
//                                             ? new Date(
//                                                 o.createdAt
//                                               ).toLocaleDateString()
//                                             : "N/A"}
//                                         </td>
//                                         <td className="px-4 py-2 text-center">
//                                           <button
//                                             onClick={() =>
//                                               handleInstallmentClick(o)
//                                             }
//                                             className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
//                                           >
//                                             View
//                                           </button>
//                                         </td>
//                                       </tr>
//                                     );
//                                   })}
//                                 </tbody>
//                               </table>
//                             </div>

//                             {/* Child Pagination */}
//                             <div className="flex justify-center mt-2 gap-2">
//                               <button
//                                 disabled={childPage === 1}
//                                 onClick={() => setChildPage(childPage - 1)}
//                                 className="px-3 py-1 border rounded disabled:opacity-50"
//                               >
//                                 Prev
//                               </button>
//                               <span className="px-2">
//                                 Page {childPage} of{" "}
//                                 {Math.ceil(
//                                   filterOrdersByDate(v.orders).length /
//                                     childRows
//                                 )}
//                               </span>
//                               <button
//                                 disabled={
//                                   childPage ===
//                                   Math.ceil(
//                                     filterOrdersByDate(v.orders).length /
//                                       childRows
//                                   )
//                                 }
//                                 onClick={() => setChildPage(childPage + 1)}
//                                 className="px-3 py-1 border rounded disabled:opacity-50"
//                               >
//                                 Next
//                               </button>
//                             </div>
//                           </div>
//                         </td>
//                       </tr>
//                     )}
//                   </React.Fragment>
//                 );
//               })
//             )}
//           </tbody>
//         </table>
//       </div>

//       <div class="w-full mt-6 overflow-x-auto whitespace-nowrap border p-4 md:grid md:grid-cols-6 border-t pt-4 bg-gray-50  rounded">
//         <div class="inline-block mr-4 font-bold">Grand Totals</div>
//         <div class="inline-block mr-4 font-bold px-8">{totals.orders}</div>
//         <div class="inline-block mr-4 font-bold text-blue-500 px-8">
//           ₹{totals.amount.toFixed(2)}
//         </div>
//         <div class="inline-block mr-4 font-bold px-10">
//           ₹{totals.paid.toFixed(2)}
//         </div>
//         <div class="inline-block mr-4 font-bold text-red-600 px-2">
//           ₹{totals.due.toFixed(2)}
//         </div>
//       </div>

//       {/* Parent Pagination */}
//       <div className="flex justify-center mt-4 gap-2">
//         <button
//           disabled={vendorPage === 1}
//           onClick={() => setVendorPage(vendorPage - 1)}
//           className="px-3 py-1 border rounded disabled:opacity-50"
//         >
//           Prev
//         </button>
//         <span className="px-2">
//           Page {vendorPage} of {totalVendorPages}
//         </span>
//         <button
//           disabled={vendorPage === totalVendorPages}
//           onClick={() => setVendorPage(vendorPage + 1)}
//           className="px-3 py-1 border rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>

//       {/* Installment Popup Modal */}
//       {showInstallmentPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-bold">
//                 Installment Details - {selectedOrder?.formattedId}
//               </h3>
//               <button
//                 onClick={closeInstallmentPopup}
//                 className="text-gray-500 hover:text-gray-700 text-2xl"
//               >
//                 ×
//               </button>
//             </div>

//             <div className="mb-4 p-4 bg-gray-50 rounded">
//               <div className="grid grid-cols-2 gap-4 text-sm">
//                 <div>
//                   <span className="font-medium">Customer:</span>{" "}
//                   {selectedOrder?.orderItems?.[0]?.discountName?.firmName ||
//                     "N/A"}
//                 </div>
//                 <div>
//                   <span className="font-medium">Total Amount:</span> ₹
//                   {(
//                     selectedOrder?.totalPriceAfterDiscount ??
//                     selectedOrder?.totalPrice ??
//                     0
//                   ).toFixed(2)}
//                 </div>
//                 <div>
//                   <span className="font-medium">Due Amount:</span> ₹
//                   {(selectedOrder?.dueAmount ?? 0).toFixed(2)}
//                 </div>
//                 <div>
//                   <span className="font-medium">Paid Amount:</span> ₹
//                   {(
//                     (selectedOrder?.totalPriceAfterDiscount ??
//                       selectedOrder?.totalPrice ??
//                       0) - (selectedOrder?.dueAmount ?? 0)
//                   ).toFixed(2)}
//                 </div>
//               </div>
//             </div>

//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200 text-sm">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th className="px-4 py-2 text-left">Installment #</th>
//                     <th className="px-4 py-2 text-left">Amount</th>
//                     <th className="px-4 py-2 text-left">Status</th>
//                     <th className="px-4 py-2 text-left">Paid Date</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {installmentDetails.map((installment, index) => (
//                     <tr key={index} className="hover:bg-gray-50">
//                       <td className="px-4 py-2 font-medium">
//                         {installment.installmentNumber}
//                       </td>
//                       <td className="px-4 py-2 text-blue-600">
//                         ₹{installment.amount.toFixed(2)}
//                       </td>
//                       <td className="px-4 py-2">
//                         <span
//                           className={`px-2 py-1 rounded-full text-xs font-medium ${
//                             installment.status === "Paid"
//                               ? "bg-green-100 text-green-800"
//                               : "bg-yellow-100 text-yellow-800"
//                           }`}
//                         >
//                           {installment.status}
//                         </span>
//                       </td>
//                       <td className="px-4 py-2 text-gray-500">
//                         {installment.paidDate
//                           ? new Date(installment.paidDate).toLocaleDateString()
//                           : "Not Paid"}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             <div className="mt-4 flex justify-end">
//               <button
//                 onClick={closeInstallmentPopup}
//                 className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Outstanding;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Outstanding = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedVendor, setExpandedVendor] = useState(null);

  // --- Parent table states ---
  const [searchTerm, setSearchTerm] = useState("");
  const [vendorPage, setVendorPage] = useState(1);
  const [vendorRows, setVendorRows] = useState(10);

  // --- Child table states ---
  const [childPage, setChildPage] = useState(1);
  const [childRows, setChildRows] = useState(10);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  // --- Installment popup states ---
  const [showInstallmentPopup, setShowInstallmentPopup] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [installmentDetails, setInstallmentDetails] = useState([]);

  // --- Advanced Filter states ---
  const [filters, setFilters] = useState({
    orderId: "",
    customerName: "",
    vendorName: "",
    dateFrom: "",
    dateTo: "",
    status: "all", // all, due, clear
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const url = `${import.meta.env.VITE_API_URL}/order/dueAmount/true`;
      const response = await axios.get(url);
      console.log(response);

      setVendors(response?.data?.vendors || []);
      toast.success(`Loaded ${response?.data?.vendors?.length} vendors`);
    } catch (error) {
      console.error("Error fetching vendors:", error);
      toast.error(error.response?.data?.message || "Failed to load vendors");
      setVendors([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleVendor = (vendorId) => {
    setExpandedVendor(expandedVendor === vendorId ? null : vendorId);
    setChildPage(1); // reset child pagination when toggling
  };

  // Function to handle installment popup
  const handleInstallmentClick = async (order) => {
    try {
      setSelectedOrder(order);
      setLoading(true);

      // Fetch installment details for the order
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/order/installments/${order._id}`
      );

      setInstallmentDetails(response.data.installments || []);
      setShowInstallmentPopup(true);
    } catch (error) {
      console.error("Error fetching installments:", error);
      toast.error("Failed to load installment details");
      // Show mock data for demonstration
      // setInstallmentDetails([
      //   {
      //     installmentNumber: 1,
      //     amount: order.totalPriceAfterDiscount
      //       ? order.totalPriceAfterDiscount / 2
      //       : 0,
      //     paidDate: new Date().toISOString(),
      //     status: "Paid",
      //   },
      //   {
      //     installmentNumber: 2,
      //     amount: order.dueAmount || 0,
      //     paidDate: null,
      //     status: "Pending",
      //   },
      // ]);
setInstallmentDetails([
  {
    installmentNumber: 1,
    amount: order.totalPriceAfterDiscount || 0,
    paidDate: new Date().toISOString(),
    status: "Paid",
  },
]);
      setShowInstallmentPopup(true);
    } finally {
      setLoading(false);
    }
  };

  // Function to close installment popup
  const closeInstallmentPopup = () => {
    setShowInstallmentPopup(false);
    setSelectedOrder(null);
    setInstallmentDetails([]);
  };

  // Function to handle filter changes
  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
    setVendorPage(1); // Reset to first page when filters change
    setChildPage(1);
  };

  // Function to clear all filters
  const clearAllFilters = () => {
    setFilters({
      orderId: "",
      customerName: "",
      vendorName: "",
      dateFrom: "",
      dateTo: "",
      status: "all",
    });
    setSearchTerm("");
    setDateRange({ from: "", to: "" });
    setVendorPage(1);
    setChildPage(1);
  };

  // Function to check if any filters are active
  const hasActiveFilters = () => {
    return (
      filters.orderId ||
      filters.customerName ||
      filters.vendorName ||
      filters.dateFrom ||
      filters.dateTo ||
      filters.status !== "all" ||
      searchTerm ||
      dateRange.from ||
      dateRange.to
    );
  };

  // --- Advanced filtering logic ---
  const filterOrders = (orders) => {
    return orders.filter((order) => {
      // Order ID filter
      if (
        filters.orderId &&
        !order.formattedId
          ?.toLowerCase()
          .includes(filters.orderId.toLowerCase())
      ) {
        return false;
      }

      // Customer name filter
      if (filters.customerName) {
        const customerName =
          order.orderItems?.[0]?.discountName?.firmName || "";
        if (
          !customerName
            .toLowerCase()
            .includes(filters.customerName.toLowerCase())
        ) {
          return false;
        }
      }

      // Date range filter
      if (filters.dateFrom || filters.dateTo) {
        const orderDate = new Date(order.createdAt);
        const fromDate = filters.dateFrom ? new Date(filters.dateFrom) : null;
        const toDate = filters.dateTo ? new Date(filters.dateTo) : null;

        if (fromDate && orderDate < fromDate) return false;
        if (toDate && orderDate > toDate) return false;
      }

      // Status filter
      if (filters.status !== "all") {
        const due = order.dueAmount || 0;
        const isDue = due > 0;
        if (filters.status === "due" && !isDue) return false;
        if (filters.status === "clear" && isDue) return false;
      }

      return true;
    });
  };

  // --- Parent filter + pagination ---
  const filteredVendors = vendors.filter((v) => {
    // Vendor name filter
    const vendorMatches =
      v.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.vendorName.toLowerCase().includes(filters.vendorName.toLowerCase());

    if (!vendorMatches) return false;

    // If vendor name filter is active, also check if vendor has matching orders
    if (
      filters.orderId ||
      filters.customerName ||
      filters.dateFrom ||
      filters.dateTo ||
      filters.status !== "all"
    ) {
      const filteredOrders = filterOrders(v.orders || []);
      return filteredOrders.length > 0;
    }

    return true;
  });

  const paginatedVendors = filteredVendors.slice(
    (vendorPage - 1) * vendorRows,
    vendorPage * vendorRows
  );

  const totalVendorPages = Math.ceil(filteredVendors.length / vendorRows);

  // ✅ Grand totals calculation here
  const totals = vendors.reduce(
    (acc, v) => {
      const totalOrderCount = Array.isArray(v?.totalOrders)
        ? v.totalOrders.reduce((s, n) => s + n, 0)
        : v?.totalOrders || 0;

      const totalAmount = v?.totalAmount || 0;
      const totalPaid =
        v?.totalPaid ||
        (v?.totalAmount && v?.totalDue ? v.totalAmount - v.totalDue : 0);
      const totalDue = v?.totalDue || 0;

      return {
        orders: acc.orders + totalOrderCount,
        amount: acc.amount + totalAmount,
        paid: acc.paid + totalPaid,
        due: acc.due + totalDue,
      };
    },
    { orders: 0, amount: 0, paid: 0, due: 0 }
  );

  // --- Child filter + pagination ---
  const filterOrdersByDate = (orders) => {
    let filteredOrders = orders;

    // Apply date range filter (legacy)
    if (dateRange.from || dateRange.to) {
      filteredOrders = filteredOrders.filter((o) => {
        const orderDate = new Date(o.latestPaymentDate || o.createdAt);
        const fromDate = dateRange.from ? new Date(dateRange.from) : null;
        const toDate = dateRange.to ? new Date(dateRange.to) : null;

        if (fromDate && orderDate < fromDate) return false;
        if (toDate && orderDate > toDate) return false;
        return true;
      });
    }

    // Apply advanced filters
    return filterOrders(filteredOrders);
  };

  const paginateOrders = (orders) => {
    return orders.slice((childPage - 1) * childRows, childPage * childRows);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 ml-[10%]">
      <h2 className="text-2xl font-bold mb-6">Outstanding Vendors</h2>

      {/* Advanced Filters */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 rounded text-sm font-medium ${
              showFilters
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>

          {hasActiveFilters() && (
            <button
              onClick={clearAllFilters}
              className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
            >
              Clear All Filters
            </button>
          )}
        </div>

        {showFilters && (
          <div className="bg-gray-50 p-4 rounded-lg border">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {/* Order ID Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order ID
                </label>
                <input
                  type="text"
                  placeholder="Search by Order ID..."
                  value={filters.orderId}
                  onChange={(e) =>
                    handleFilterChange("orderId", e.target.value)
                  }
                  className="w-full border px-3 py-2 rounded text-sm"
                />
              </div>

              {/* Customer Name Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Name
                </label>
                <input
                  type="text"
                  placeholder="Search by Customer..."
                  value={filters.customerName}
                  onChange={(e) =>
                    handleFilterChange("customerName", e.target.value)
                  }
                  className="w-full border px-3 py-2 rounded text-sm"
                />
              </div>

              {/* Vendor Name Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vendor Name
                </label>
                <input
                  type="text"
                  placeholder="Search by Vendor..."
                  value={filters.vendorName}
                  onChange={(e) =>
                    handleFilterChange("vendorName", e.target.value)
                  }
                  className="w-full border px-3 py-2 rounded text-sm"
                />
              </div>

              {/* Date From Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date From
                </label>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) =>
                    handleFilterChange("dateFrom", e.target.value)
                  }
                  className="w-full border px-3 py-2 rounded text-sm"
                />
              </div>

              {/* Date To Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date To
                </label>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => handleFilterChange("dateTo", e.target.value)}
                  className="w-full border px-3 py-2 rounded text-sm"
                />
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                  className="w-full border px-3 py-2 rounded text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="due">Due</option>
                  <option value="clear">Clear</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters() && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-sm font-medium text-blue-800">
              Active Filters:
            </span>
            {filters.orderId && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                Order ID: {filters.orderId}
              </span>
            )}
            {filters.customerName && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                Customer: {filters.customerName}
              </span>
            )}
            {filters.vendorName && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                Vendor: {filters.vendorName}
              </span>
            )}
            {filters.dateFrom && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                From: {filters.dateFrom}
              </span>
            )}
            {filters.dateTo && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                To: {filters.dateTo}
              </span>
            )}
            {filters.status !== "all" && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                Status: {filters.status}
              </span>
            )}
            {searchTerm && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                Search: {searchTerm}
              </span>
            )}
            {(dateRange.from || dateRange.to) && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                Date Range: {dateRange.from || "Start"} to{" "}
                {dateRange.to || "End"}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Search + Rows per page */}
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search by vendor name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setVendorPage(1);
          }}
          className="border px-3 py-1 rounded w-64"
        />
        <select
          value={vendorRows}
          onChange={(e) => {
            setVendorRows(Number(e.target.value));
            setVendorPage(1);
          }}
          className="border px-2 py-1 rounded"
        >
          {[10, 25, 50, 100].map((num) => (
            <option key={num} value={num}>
              {num} rows
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto border rounded">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Vendor</th>
              <th className="px-4 py-2 text-left">Total Orders</th>
              <th className="px-4 py-2 text-left">Total Amount</th>
              <th className="px-4 py-2 text-left">Paid</th>
              <th className="px-4 py-2 text-left">Due</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : paginatedVendors.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No vendors found.
                </td>
              </tr>
            ) : (
              paginatedVendors.map((v) => {
                const totalPaid =
                  v.totalAmount && v.totalDue
                    ? v.totalAmount - v.totalDue
                    : v.orders?.reduce((sum, o) => sum + (o.amount ?? 0), 0);

                return (
                  <React.Fragment key={v.vendorId}>
                    {/* Vendor row */}
                    <tr className="bg-gray-50 hover:bg-gray-100">
                      <td className="px-4 py-2 font-medium">{v.vendorName}</td>
                      <td className="px-4 py-2">{v.totalOrders}</td>
                      <td className="px-4 py-2 text-blue-600 font-medium">
                        ₹{(v.totalAmount ?? 0).toFixed(2)}
                      </td>
                      <td className="px-4 py-2 text-gray-800">
                        ₹{(totalPaid ?? 0).toFixed(2)}
                      </td>
                      <td className="px-4 py-2 text-red-600 font-bold">
                        ₹{(v.totalDue ?? 0).toFixed(2)}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => toggleVendor(v.vendorId)}
                          className="bg-blue-600 text-white px-3 py-1 rounded"
                        >
                          {expandedVendor === v.vendorId
                            ? "Hide Orders"
                            : "View Orders"}
                        </button>
                      </td>
                    </tr>

                    {/* Orders table */}
                    {expandedVendor === v.vendorId && v.orders && (
                      <tr>
                        <td colSpan="6" className="p-0">
                          <div className="p-4">
                            {/* Date filter + rows selector */}
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex gap-2">
                                <input
                                  type="date"
                                  value={dateRange.from}
                                  onChange={(e) =>
                                    setDateRange((prev) => ({
                                      ...prev,
                                      from: e.target.value,
                                    }))
                                  }
                                  className="border px-2 py-1 rounded"
                                />
                                <span>to</span>
                                <input
                                  type="date"
                                  value={dateRange.to}
                                  onChange={(e) =>
                                    setDateRange((prev) => ({
                                      ...prev,
                                      to: e.target.value,
                                    }))
                                  }
                                  className="border px-2 py-1 rounded"
                                />
                              </div>
                              <select
                                value={childRows}
                                onChange={(e) => {
                                  setChildRows(Number(e.target.value));
                                  setChildPage(1);
                                }}
                                className="border px-2 py-1 rounded"
                              >
                                {[10, 25, 50, 100].map((num) => (
                                  <option key={num} value={num}>
                                    {num} rows
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="overflow-x-auto border rounded">
                              <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead className="bg-gray-200">
                                  <tr>
                                    <th className="px-4 py-2 text-left">
                                      Order ID
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                      Customer
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                      Bill Amount
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                      Paid
                                    </th>
                                    <th className="px-4 py-2 text-left">Due</th>
                                    <th className="px-4 py-2 text-left">
                                      Status
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                      Last Payment
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                      Date
                                    </th>
                                    <th className="px-4 py-2 text-center">
                                      Installment
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {paginateOrders(
                                    filterOrdersByDate(v.orders)
                                  ).map((o) => {
                                    const total =
                                      o.totalPriceAfterDiscount ??
                                      o.totalPrice ??
                                      0;
                                    const paid = total - o.dueAmount ?? 0;
                                    const due = o.dueAmount;
                                    const status = due > 0 ? "Due" : "Clear";

                                    return (
                                      <tr
                                        key={o._id}
                                        className="hover:bg-gray-50"
                                      >
                                        <td className="px-4 py-2 font-mono">
                                          {o.formattedId}
                                        </td>
                                        <td className="px-4 py-2">
                                          {o.orderItems?.[0]?.discountName
                                            ?.firmName || "N/A"}
                                        </td>
                                        <td className="px-4 py-2 text-blue-600">
                                          ₹{total.toFixed(2)}
                                        </td>
                                        <td className="px-4 py-2 text-gray-800">
                                          ₹{paid.toFixed(2)}
                                        </td>
                                        <td className="px-4 py-2 text-red-600 font-bold">
                                          ₹{due.toFixed(2)}
                                        </td>
                                        <td className="px-4 py-2">
                                          <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                                              status === "Due"
                                                ? "bg-red-100 text-red-800"
                                                : "bg-green-100 text-green-800"
                                            }`}
                                          >
                                            {status}
                                          </span>
                                        </td>
                                        <td className="px-4 py-2 text-gray-500">
                                          {o.latestPaymentDate
                                            ? new Date(
                                                o.latestPaymentDate
                                              ).toLocaleDateString()
                                            : "No Payment"}
                                        </td>
                                        <td className="px-4 py-2 text-gray-500">
                                          {o.createdAt
                                            ? new Date(
                                                o.createdAt
                                              ).toLocaleDateString()
                                            : "N/A"}
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                          <button
                                            onClick={() =>
                                              handleInstallmentClick(o)
                                            }
                                            className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
                                          >
                                            View
                                          </button>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>

                            {/* Child Pagination */}
                            <div className="flex justify-center mt-2 gap-2">
                              <button
                                disabled={childPage === 1}
                                onClick={() => setChildPage(childPage - 1)}
                                className="px-3 py-1 border rounded disabled:opacity-50"
                              >
                                Prev
                              </button>
                              <span className="px-2">
                                Page {childPage} of{" "}
                                {Math.ceil(
                                  filterOrdersByDate(v.orders).length /
                                    childRows
                                )}
                              </span>
                              <button
                                disabled={
                                  childPage ===
                                  Math.ceil(
                                    filterOrdersByDate(v.orders).length /
                                      childRows
                                  )
                                }
                                onClick={() => setChildPage(childPage + 1)}
                                className="px-3 py-1 border rounded disabled:opacity-50"
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="w-full mt-6 overflow-x-auto whitespace-nowrap border p-4 md:grid md:grid-cols-6 border-t pt-4 bg-gray-50 rounded">
        <div className="inline-block mr-4 font-bold">Grand Totals</div>
        <div className="inline-block mr-4 font-bold px-8">{totals.orders}</div>
        <div className="inline-block mr-4 font-bold text-blue-500 px-8">
          ₹{totals.amount.toFixed(2)}
        </div>
        <div className="inline-block mr-4 font-bold px-10">
          ₹{totals.paid.toFixed(2)}
        </div>
        <div className="inline-block mr-4 font-bold text-red-600 px-2">
          ₹{totals.due.toFixed(2)}
        </div>
      </div>

      {/* Parent Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        <button
          disabled={vendorPage === 1}
          onClick={() => setVendorPage(vendorPage - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-2">
          Page {vendorPage} of {totalVendorPages}
        </span>
        <button
          disabled={vendorPage === totalVendorPages}
          onClick={() => setVendorPage(vendorPage + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Installment Popup Modal */}
      {showInstallmentPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                Installment Details - {selectedOrder?.formattedId}
              </h3>
              <button
                onClick={closeInstallmentPopup}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="mb-4 p-4 bg-gray-50 rounded">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Customer:</span>{" "}
                  {selectedOrder?.orderItems?.[0]?.discountName?.firmName ||
                    "N/A"}
                </div>
                <div>
                  <span className="font-medium">Total Amount:</span> ₹
                  {(
                    selectedOrder?.totalPriceAfterDiscount ??
                    selectedOrder?.totalPrice ??
                    0
                  ).toFixed(2)}
                </div>
                <div>
                  <span className="font-medium">Due Amount:</span> ₹
                  {(selectedOrder?.dueAmount ?? 0).toFixed(2)}
                </div>
                <div>
                  <span className="font-medium">Paid Amount:</span> ₹
                  {(
                    (selectedOrder?.totalPriceAfterDiscount ??
                      selectedOrder?.totalPrice ??
                      0) - (selectedOrder?.dueAmount ?? 0)
                  ).toFixed(2)}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Installment #</th>
                    <th className="px-4 py-2 text-left">Amount</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Paid Date</th>
                  </tr>
                </thead>
                <tbody>
                  {installmentDetails.map((installment, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2 font-medium">
                        {installment.installmentNumber}
                      </td>
                      <td className="px-4 py-2 text-blue-600">
                        {installment.status === "Pending"
                          ? ""
                          : `₹${installment.amount.toFixed(2)}`}
                      </td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            installment.status === "Paid"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {installment.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-gray-500">
                        {installment.status === "Pending"
                          ? ""
                          : installment.paidDate
                          ? new Date(installment.paidDate).toLocaleDateString()
                          : "Not Paid"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={closeInstallmentPopup}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Outstanding;
