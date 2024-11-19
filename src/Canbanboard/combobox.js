import React, { useState } from "react";

const ComboBox = ({ groupby, setGroupby }) => {
  const handleChange = (event) => {
    setGroupby(event.target.value);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <select
        id="combo-box"
        value={groupby}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="" disabled>
          {groupby}
        </option>
        <option value="priority">Priority</option>
        <option value="user">User</option>
        <option value="status">State</option>
      </select>
    </div>
  );
};

export default ComboBox;
