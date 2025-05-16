import React, { useEffect, useState } from "react";
import Select from "react-select";
import { IoClose } from "react-icons/io5";

const categoryOptions = [
  { value: "Engine", label: "Engine", name: "category" },
  { value: "Brakes", label: "Brakes", name: "category" },
];

const subCategoryOptions = [
  { value: "Oil", label: "Oil Seal", name: "subCategory" },
  { value: "Filter", label: "Air Filter", name: "subCategory" },
];

const inputFields = [
  { label: "Item Name", name: "itemName" },
  { label: "Make", name: "make" },
  { label: "Model", name: "model" },
  { label: "Part No", name: "partNo" },
  { label: "Location", name: "location" },
  { label: "Unit Price", name: "unitPrice" },
  { label: "Total", name: "total" },
];
const AddSparesModal = ({
  isOpen,
  onClose,
  addSubmitData,
  editData,
  editSubmitData,
}) => {
  const [form, setForm] = useState({
    id: 0,
    category: null,
    subCategory: null,
    itemName: "",
    make: "",
    model: "",
    partNo: "",
    location: "",
    unitPrice: "",
    total: "",
    status: true,
  });

  useEffect(() => {
    if (editData) {
      setForm({
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
        status: editData?.status,
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleDropdownChange = (e) => {
    const { name } = e;
    setForm({
      ...form,
      [name]: e,
    });
  };

  const handleClose = () => {
    onClose();
    resetState();
  };

  const resetState = () => {
    setForm({
      id: 0,
      category: null,
      subCategory: null,
      itemName: "",
      make: "",
      model: "",
      partNo: "",
      location: "",
      unitPrice: "",
      total: "",
      status: true,
    });
  };

  const addSubmit = () => {
    const fomrData = form;
    fomrData.id = Math.floor(Math.random() * 10);
    addSubmitData(fomrData);
    handleClose();
  };

  const editSubmit = () => {
    editSubmitData(form);
  };

  if (!isOpen) return null;

  return (
    <div
      className="relative z-10  "
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed  bg-gray-100 inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                  <svg
                    className="size-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <div className="flex justify-between items-center mb-6">
                    <h2
                      className="text-xl font-semibold "
                      style={{ color: "#000077" }}
                    >
                      {" "}
                      {form?.id ? "Edit Spares" : "Add Spares"}
                    </h2>
                    <button onClick={handleClose}>
                      <IoClose size={24} />
                    </button>
                  </div>
                  <div className="mt-2">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <Select
                        options={categoryOptions}
                        placeholder="Please Select"
                        value={form.category}
                        name="category"
                        onChange={handleDropdownChange}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sub Category
                      </label>
                      <Select
                        options={subCategoryOptions}
                        placeholder="Please Select"
                        value={form.subCategory}
                        name="subCategory"
                        onChange={handleDropdownChange}
                      />
                    </div>

                    {inputFields.map(({ label, name }) => (
                      <div key={label} className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {label}
                        </label>
                        <input
                          onChange={handleChange}
                          value={form[name]}
                          type="text"
                          name={name}
                          placeholder={label}
                          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    ))}

                    <div className="flex justify-between mt-6">
                      <button
                        onClick={handleClose}
                        className="w-1/2 mr-2 bg-gray-100 text-gray-800 py-2 rounded hover:bg-gray-200"
                      >
                        Cancel
                      </button>
                      {form?.id ? (
                        <button
                          onClick={editSubmit}
                          className="w-1/2 ml-2 bg-blue-900 text-white py-2 rounded hover:bg-blue-800"
                        >
                          Add
                        </button>
                      ) : (
                        <button
                          onClick={addSubmit}
                          className="w-1/2 ml-2 bg-blue-900 text-white py-2 rounded hover:bg-blue-800"
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSparesModal;
