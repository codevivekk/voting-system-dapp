"use client";

import { useContract } from "@/app/provider/Provider";
import { useState } from "react";

export default function NameDayForm() {
  const [formData, setFormData] = useState({ name: "", day: "" });
  const [errors, setErrors] = useState({});
    const { address, contract } = useContract();
  

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await contract.registerCandidate(formData.name, formData.day)
      await tx.wait();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 border rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Day</label>
        <input
          type="text"
          name="day"
          value={formData.day}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
          placeholder="Enter a day "
        />
        {errors.day && <p className="text-red-500 text-sm">{errors.day}</p>}
      </div>

      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Submit
      </button>
    </form>
  );
}
