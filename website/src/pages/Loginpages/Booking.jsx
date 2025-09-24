

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input, message } from "antd";
import axios from "axios";
import { Container, Card, Button, Table } from "react-bootstrap";
import { SearchOutlined } from "@ant-design/icons";


const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [downloading, setDownloading] = useState({});
    const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Fetch userId from localStorage
  const userDataStr = localStorage.getItem("user");
  const userId = userDataStr ? JSON.parse(userDataStr).user?._id : null;

  // Fetch payment history
  // useEffect(() => {
  //   const fetchPayments = async () => {
  //     if (!userId) {
  //       message.error("Please log in to view your payment history.");
  //       navigate("/login");
  //       return;
  //     }

  //     try {
  //       setIsLoading(true);
  //       const response = await axios.get(
  //         `http://localhost:8080/paymentuser/payments/${userId}`
  //       );
  //       setPayments(response.data.data);
  //     } catch (error) {
  //       console.error("Error fetching payments:", error);
  //       message.error("Failed to load payment history.");
  //       setPayments([]);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchPayments();
  // }, [userId, navigate]);

  useEffect(() => {
  const fetchPayments = async () => {
    if (!userId) {
      message.error("Please log in to view your payment history.");
      navigate("/login");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:8080/paymentuser/payments/${userId}`
      );
      console.log("API Response:", response.data); 

      setPayments(response.data.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
      message.error("Failed to load payment history.");
      setPayments([]);
    } finally {
      setIsLoading(false);
    }
  };

  fetchPayments();
}, [userId, navigate]);
// Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const filteredPayments = payments.filter((payment) => {
  const phone = payment.userId?.mobile1 || ""; // Use userId.mobile1 for phone
  const orderId = payment.orderId || "";
  const productname = payment.productname || "";
  const date = payment.receivingDate ? formatDate(payment.receivingDate) : "";
  const amount = payment.amount ? payment.amount.toString() : "";
  const status = payment.status ? payment.status.toLowerCase() : "";

  const searchLower = search.toLowerCase();
  return (
    phone.toLowerCase().includes(searchLower) ||
    orderId.toLowerCase().includes(searchLower) ||
    productname.toLowerCase().includes(searchLower) ||
    date.toLowerCase().includes(searchLower) ||
    amount.includes(searchLower) ||
    status.includes(searchLower)
  );
});
//  const filteredPayments = payments.filter((payment) => {
//     const phone =

//       payment?.orderItems?.[0]?.discountName?.userId?.mobile1 ||
//       payment?.order?.orderItems?.[0]?.discountName?.userId?.mobile1 ||
//       payment?.mobile1 ||
//       payment?.userPhone ||
//       "";
//     const orderId = payment.orderId || "";
//     const productname = payment.productname || "";
//     const date = payment.receivingDate
//       ? formatDate(payment.receivingDate)
//       : "";

//       const amount = payment.amount ? payment.amount.toString() : "";
//   const status = payment.status ? payment.status.toLowerCase() : "";

//     const searchLower = search.toLowerCase();
//     return (
//       phone.toString().toLowerCase().includes(searchLower) ||
//       orderId.toLowerCase().includes(searchLower) ||
//       productname.toLowerCase().includes(searchLower) ||
//       date.toLowerCase().includes(searchLower)||
//       amount.includes(searchLower) ||
//     status.includes(searchLower)
//     );
//   });

  

  // Download invoice
  const handleDownloadInvoice = async (orderId) => {
    try {
      setDownloading((prev) => ({ ...prev, [orderId]: true }));
      message.loading({
        content: "Preparing invoice...",
        key: orderId,
        duration: 0,
      });

      const response = await axios.get(
        `http://localhost:8080/paymentuser/downloadinvoice/${orderId}`,
        {
          responseType: "blob",
        }
      );

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice_${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();

      // Cleanup
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        link.parentNode.removeChild(link);
      }, 100);

      message.success({ content: "Invoice downloaded!", key: orderId });
    } catch (error) {
      console.error("Download error:", error);

      if (error.response?.status === 404) {
        message.error({
          content: "Invoice not found for this order",
          key: orderId,
        });
      } else {
        message.error({
          content: error.message || "Failed to download invoice",
          key: orderId,
        });
      }
    } finally {
      setDownloading((prev) => ({ ...prev, [orderId]: false }));
    }
  };

  return (
    <Container className="py-16 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="account-details-heading">Your Payment History</h3>
        </div>

         {/* <Input
          placeholder="Search by Phone, Order ID, Product, Date"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 300, marginRight: 16 }}
          allowClear
        /> */}

        <Input
  placeholder="Search by Phone, Order ID, Product, Date"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  allowClear
  prefix={<SearchOutlined style={{ color: "#999" }} />}
  style={{
    width: 350,
    marginRight: 16,
    borderRadius: "8px",
    padding: "6px 12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  }}
/>
        <h3 className="text-3xl font-bold text-gray-800 tracking-tight"></h3>
        <Button
          variant="success"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
          onClick={() => navigate("/cart")}
        >
          New Order
        </Button>
      </div>
      <Card className="shadow-xl rounded-xl bg-white border-0">
        <Card.Body>
          <div className="table-responsive">
            <Table id="tabling" className="table align-middle border">
              <thead className="bg-gray-100 border">
                <tr className="border">
                  <th className="px-6 py-3 text-left text-sm fw-bold text-gray-700">
                    Product Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm fw-bold text-gray-700">
                    Order ID
                  </th>
                
                     <th className="px-6 py-3 text-left text-sm fw-bold text-gray-700">
      Mobile No
    </th>

                  <th className="px-6 py-3 text-left text-sm fw-bold text-gray-700">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm fw-bold text-gray-700">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-sm fw-bold text-gray-700">
                    Payment Mode
                  </th>
                  <th className="px-6 py-3 text-left text-sm fw-bold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm fw-bold text-gray-700">
                    Remark
                  </th>
                  <th className="px-6 py-3 text-left text-sm fw-bold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              {/* <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) :filteredPayments.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-gray-500">
                      No payments found.
                    </td>
                  </tr>
                ) : (
                  payments.map((payment) => (
                    <tr key={payment.orderId}>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {payment.productname}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {payment.orderId}
                      </td>
  <td className="px-6 py-4 text-sm text-gray-800">
  {payment?.orderItems?.[0]?.discountName?.mobile1 ||
   payment?.order?.orderItems?.[0]?.discountName?.mobile1 ||
   payment?.mobile1 ||
   payment?.userPhone ||
   "N/A"}
</td>


                      <td className="px-6 py-4 text-sm text-gray-800">
                        {formatDate(payment.receivingDate)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        ₹{payment.amount}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {payment.paymentMode}
                      </td>
                      <td
                        className={`px-6 py-4 text-sm ${
                          payment?.status == "Completed"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {payment?.status}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {payment.remark || "-"}
                      </td>
                      <td className="px-6 py-4">
                        <Button
                          style={{ backgroundColor: "green" }}
                          variant="outline-primary"
                          size="sm"
                          className="border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg"
                          onClick={() => handleDownloadInvoice(payment.orderId)}
                          disabled={downloading[payment.orderId]}
                        >
                          {downloading[payment.orderId]
                            ? "Downloading..."
                            : "Download Invoice"}
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody> */}
              <tbody>
  {isLoading ? (
    <tr>
      <td colSpan="8" className="text-center py-4 text-gray-500">
        Loading...
      </td>
    </tr>
  ) : filteredPayments.length === 0 ? (
    <tr>
      <td colSpan="8" className="text-center py-4 text-gray-500">
        No payments found.
      </td>
    </tr>
  ) : (
    filteredPayments.map((payment) => (
      <tr key={payment.orderId}>
        <td className="px-6 py-4 text-sm text-gray-800">
          {payment.productname}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800">
          {payment.orderId}
        </td>
        
<td className="px-6 py-4 text-sm text-gray-800">
  {payment.userId?.mobile1 || "N/A"}
</td>
        <td className="px-6 py-4 text-sm text-gray-800">
          {formatDate(payment.receivingDate)}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800">
          ₹{payment.amount}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800">
          {payment.paymentMode}
        </td>
        <td
          className={`px-6 py-4 text-sm ${
            payment?.status == "Completed"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {payment?.status}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800">
          {payment.remark || "-"}
        </td>
        <td className="px-6 py-4">
          <Button
            style={{ backgroundColor: "green" }}
            variant="outline-primary"
            size="sm"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg"
            onClick={() => handleDownloadInvoice(payment.orderId)}
            disabled={downloading[payment.orderId]}
          >
            {downloading[payment.orderId]
              ? "Downloading..."
              : "Download Invoice"}
          </Button>
        </td>
      </tr>
    ))
  )}
</tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PaymentHistory;
