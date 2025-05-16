import React, {useState} from "react";
import Switch from "react-switch";
import AddSparesModal from "./AddSparesModal";
import DeletesparesModal from "./DeletesparesModal";
import { FiEdit2 } from "react-icons/fi";
import menu from "./assets/menu.svg";
import overview from "./assets/overview.svg";
import spares from "./assets/spares.svg";
import orders from "./assets/orders.svg";
import suppliers from "./assets/suppliers.svg";
import tyres from "./assets/tyres.svg";
import retreading from "./assets/retreading.svg";
import vehicle from "./assets/vehicle.svg";
import circular from "./assets/circular.svg";
import support from "./assets/support.svg";
import contactUs from "./assets/contactUs.svg";
import notifications from "./assets/notifications.svg";
import totalSpared from "./assets/totalSpared.svg";
import activeSpares from "./assets/activeSpares.svg";
import deactiveSpares from "./assets/deactiveSpares.svg";
import filterBy from "./assets/filterBy.svg";
import workshop from "./assets/workshop.svg";
import track from "./assets/track.svg";
import profile from "./assets/profile.png";
import search from "./assets/search.svg";

const menuItems = [
  { icon: overview, label: "Overview" },
  { icon: spares, label: "Spares" },
  { icon: orders, label: "Orders" },
  { icon: suppliers, label: "Suppliers" },
  { icon: tyres, label: "Tyres" },
  { icon: retreading, label: "Retreading" },
  { icon: vehicle, label: "Vehicle" },
];

const footerMenuItems = [
  { icon: circular, label: "Circular" },
  { icon: support, label: "Support" },
  { icon: contactUs, label: "Contact Us" },
];

export default function App() {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [isAddUser, setIsAddUser] = useState(false);
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [isDelete, setIsDelete] = useState(false);

  const addSubmitData = (formData) => {
    setData([...data, formData]);
    setIsAddUser(false);
  };

  const handleSwitch = (e, rowId) => {
    const updatedata = data?.map((item) => {
      if (rowId === item?.id) {
        return {
          ...item,
          status: e,
        };
      } else {
        return {
          ...item,
        };
      }
    });
    setData([...updatedata]);
  };

  const editSubmitData = (editData) => {
    const updatedata = data?.map((item) => {
      if (editData?.id === item?.id) {
        return {
          ...item,
          id: editData?.id,
          category: editData?.category,
          subCategory: editData?.subCategory,
          itemName: editData?.itemName,
          make: editData?.make,
          model: editData?.model,
          partNo: editData?.partNo,
          location: editData?.location,
          unitPrice: editData?.unitPrice,
          total: editData?.total,
        };
      } else {
        return {
          ...item,
        };
      }
    });
    setData([...updatedata]);
    setIsAddUser(false);
  };

  const handleEdit = (data) => {
    setEditData(data);
    setIsAddUser(true);
  };

  const deleteIdFun = () => {
    const filteredData = data?.filter((item) => item?.id !== deleteId);
    setDeleteId(null);
    setData([...filteredData]);
    setIsDelete(false);
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#f4f4f4" }}>
      <AddSparesModal
        isOpen={isAddUser}
        onClose={() => {
          setIsAddUser(false);
          setEditData(null);
        }}
        addSubmitData={addSubmitData}
        editData={editData}
        editSubmitData={editSubmitData}
      />

      <DeletesparesModal
        isOpen={isDelete}
        onClose={() => {
          setIsDelete(false);
          setDeleteId(null);
        }}
        deleteIdFun={deleteIdFun}
      />

      <aside
        className={` shadow-md transition-all duration-300  w-64 p-4`}
        style={{ backgroundColor: "#f4f4f4" }}
      >
        <div className="flex items-center justify-between mb-6">
          <img
            srcSet={menu}
            src={menu}
            alt={"Logo"}
            loading="lazy"
            onClick={() => setSidebarExpanded(!sidebarExpanded)}
          />
        </div>
        <div className="space-y-4">
          {menuItems.map(({ icon, label }) => (
            <button
              key={label}
              className="flex items-center space-x-3 w-full py-2 px-3 rounded hover:bg-gray-100 text-gray-800"
            >
              <img src={icon} alt={"Logo"} loading="lazy" />
              {sidebarExpanded && <span>{label}</span>}
            </button>
          ))}
        </div>

        <div className="space-y-4 mt-10">
          {footerMenuItems.map(({ icon, label }) => (
            <button
              key={label}
              className="flex items-center space-x-3 w-full py-2 px-3 rounded hover:bg-gray-100 text-gray-800"
            >
              <img src={icon} alt={"Logo"} loading="lazy" />
              {sidebarExpanded && <span>{label}</span>}
            </button>
          ))}
        </div>
      </aside>

      <div className="flex-1 p-4">
        <div className="flex justify-between items-center mb-4">
          <div
            className="flex justify-between items-center gap-2  px-10 py-1 border rounded bg-black text-white"
            style={{ borderRadius: 20 }}
          >
            <img src={workshop} alt="User" className="w-18 h-18" />
            Workshop
          </div>

          <div className="relative w-full max-w-sm">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
              <img src={search} alt="User" className="w-18 h-18 ml-5" />
            </span>
            <input
              style={{ borderRadius: 20 }}
              type="text"
              placeholder="Search by Item name"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-2 items-center">
            <div
              className="px-5 py-1 border rounded text-white flex justify-between items-center gap-1"
              style={{
                borderRadius: 20,
                color: "#0080FF",
                backgroundColor: "#007aff17",
              }}
            >
              <img src={track} alt="User" className="w-18 h-18" />
              Track way bill
            </div>
            <img
              src={notifications}
              alt="User"
              className="w-8 h-8 rounded-full"
            />

            <div
              className="px-5 py-1 border rounded bg-white text-white flex justify-between items-center gap-2"
              style={{ borderRadius: 20, color: "gray" }}
            >
              <img src={profile} alt="User" className="w-5 h-5" />
              Syed Shanhab
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <button className="md:hidden"></button>
          <h1 className="text-2xl font-semibold">Spares</h1>
          <div className="flex gap-2 items-center">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              style={{ color: "#0080FF", backgroundColor: "#007aff17" }}
              onClick={() => setIsAddUser(true)}
            >
              + Add User
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              style={{ color: "#ffffff", backgroundColor: "#000077" }}
            >
              + Add Role
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            {
              label: "Total Spares",
              value: 432,
              color: "bg-blue-50",
              percent: "+40%",
              imgSrc: totalSpared,
              perColor: "green",
            },
            {
              label: "Active Spares",
              value: 244,
              color: "bg-green-50",
              percent: "+40%",
              imgSrc: activeSpares,
              perColor: "yellow",
            },
            {
              label: "Deactivate Spares",
              value: 43567,
              color: "bg-red-50",
              percent: "-12%",
              imgSrc: deactiveSpares,
              perColor: "red",
            },
          ].map(({ label, value, color, percent, imgSrc, perColor }) => (
            <div
              key={label}
              className={`flex  bg-white p-4  justify-between rounded shadow-sm ${color}`}
              style={{ borderRadius: 15 }}
            >
              <div className="flex">
                <img src={imgSrc} alt="User" className="w-18 h-18 mr-3" />
                <div>
                  <div className="text-gray-600 text-sm">{label}</div>
                  <div className="text-2xl font-bold">{value}</div>
                </div>
              </div>

              <div className=" self-end">
                <div className={`text-${perColor}-500 text-xs font-bold `}>
                  {percent}
                </div>
                <div style={{ color: "gray" }}> vs last month</div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="bg-white shadow rounded overflow-x-auto"
          style={{ borderRadius: 15 }}
        >
          <div className="flex justify-between items-center mb-4 bg-white">
            <div className="flex space-x-2">
              {["All", "Active", "Deactivate"].map((tab) => (
                <button
                  key={tab}
                  className="m-3 px-3 py-1 border rounded hover:bg-gray-100"
                  style={{ backgroundColor: "#f4f4f4" }}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex space-x-2 mr-5">
              <input
                type="text"
                placeholder="Search by Item name"
                className="px-3 py-1 border rounded"
              />
              <button
                className="flex justify-between items-center gap-2 px-4 py-2  text-white rounded hover:bg-blue-700 w-25"
                style={{ color: "#0080FF", backgroundColor: "#007aff17" }}
              >
                <img src={filterBy} alt="User" className="w-18 h-18 mr-3" />

                <span>Filter By</span>
              </button>
            </div>
          </div>

          <div
            className="bg-white shadow rounded overflow-x-auto"
            style={{ borderRadius: 15 }}
          >
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  {[
                    "Location",
                    "Item Name",
                    "Category",
                    "Make",
                    "Model",
                    "Part No",
                    "Stock",
                    "Status",
                    "Action",
                  ].map((col) => (
                    <th
                      key={col}
                      className="px-4 py-2 font-medium text-gray-600"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-4 py-2">{row.location}</td>
                    <td className="px-4 py-2">{row.itemName}</td>
                    <td className="px-4 py-2">{row.category?.value}</td>
                    <td className="px-4 py-2">{row.make}</td>
                    <td className="px-4 py-2">{row.model}</td>
                    <td className="px-4 py-2">{row.partNo}</td>
                    <td className="px-4 py-2">{row.total}</td>
                    <td className="px-4 py-2">
                      <Switch
                        checked={row.status}
                        onChange={(e) => handleSwitch(e, row?.id)}
                        checkedIcon={false}
                        uncheckedIcon={false}
                      />
                    </td>
                    <td className="px-4 py-2 flex items-center gap-2">
                      <button
                        className="text-sm px-2 py-1 border rounded flex items-center gap-1"
                        style={{ backgroundColor: "#8B8D98", color: "white" }}
                        onClick={() => handleEdit(row)}
                      >
                        <FiEdit2 /> Edit
                      </button>
                      <button
                        className="text-sm px-2 py-1 border rounded flex items-center gap-1"
                        style={{ backgroundColor: "#8B8D98", color: "white" }}
                        onClick={() => {
                          setDeleteId(row?.id);
                          setIsDelete(true);
                        }}
                      >
                        <FiEdit2 /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 text-sm">
          <div className="flex items-center gap-2">
            <label htmlFor="perPage">Result per page</label>
            <select id="perPage" className="border rounded px-2 py-1">
              {[100].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-1">
            <button className="px-2 py-1 border rounded">Back</button>
            {[1].map((n) => (
              <button
                key={n}
                className="px-2 py-1 border rounded bg-white hover:bg-gray-100"
              >
                {n}
              </button>
            ))}
            <span>...</span>
            <button className="px-2 py-1 border rounded">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
