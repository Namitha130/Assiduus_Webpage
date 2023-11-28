import BarChart from "./BarChart";
import LineChart from "./LineChart";
import Graph from "./Graph";
import Modal from "react-modal";
import { useState } from "react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Dashboard = ({ dataArray }) => {
  // ! for pop-up modal
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "Black";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleOnSubmit = () => {
    alert("File Uploaded successfully");
  };

  return (
    <div className="graph-content">
      <div id="div1">
        <LineChart />
      </div>

      <div id="div2">
        <span className="div2-nav">
          <span className="title">
            <p> Invoices owed to you</p>
          </span>
          <span className="invoice">
            <button onClick={openModal}> New Sales Invoice</button>
          </span>
        </span>
        <hr />

        <div className="graph-bar">
          <Graph dataArray={dataArray} />
        </div>
      </div>

      <div id="div3">
        <span className="div3-nav">
          <span>
            <p
              style={{
                fontSize: "17px",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              Total cash flow
            </p>
          </span>

          <span className="in-out-option">
            <span className="option-box">
              <span style={{ backgroundColor: "#22ba75" }}></span>
              <h6>In</h6>
            </span>
            <span className="option-box">
              <span style={{ backgroundColor: "#1bca1b" }}></span>
              <h6>Out</h6>
            </span>
          </span>
        </span>
        <hr />
        <div className="barChart-2">
          <BarChart style={{ height: "250px" }} dataArray={dataArray} />
        </div>
      </div>

      <div id="div4">
        <span>Account watchlist</span>

        <hr />

        <table style={{ width: "100%" }}>
          <tr>
            <th>Account</th>
            <th>The Month</th>
            <th>YTD</th>
          </tr>

          <tr>
            <td>Sales </td>
            <td>1,194.58</td>
            <td>11,418.29 </td>
          </tr>

          <tr>
            <td>Advertising </td>
            <td>6,879.02</td>
            <td>9,271.36 </td>
          </tr>
          <tr>
            <td>Inventory </td>
            <td>4,692.26</td>
            <td>9,768.09</td>
          </tr>
          <tr>
            <td>Entertainment </td>
            <td>0.00</td>
            <td>0.00 </td>
          </tr>
          <tr>
            <td>Product</td>
            <td>4,652.10</td>
            <td>2,529.90 </td>
          </tr>
        </table>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div id="modal-body">
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>File Upload</h2>
          <form onSubmit={handleOnSubmit}>
            <input type="file" />
            <button>Upload</button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
