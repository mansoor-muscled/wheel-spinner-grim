const Input = ({ objValue, onChange, index, deleteField }) => {
  const { label, type, value, placeholder } = objValue;
  return (
    <div className="mb-6">
      {" "}
      <label
        className="block text-gray-700 text-sm font-bold mb-2 text-left"
        htmlFor={label.toLowerCase()}
      >
        {label}
      </label>
      <div className="flex justify-between">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type={type || "text"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e, index)}
          id={label.toLowerCase()}
        />
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold ml-5 py-1 px-1 rounded focus:outline-none focus:shadow-outline"
          onClick={(e) => deleteField(e, index)}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Input;
