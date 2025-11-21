const Input = ({ label, ...props }) => {
  return (
    <div className="mb-3">
      <label className="block mb-1 font-semibold text-sm">{label}</label>
      <input
        {...props}
        className="border rounded px-3 py-2 w-full outline-none focus:ring"
      />
    </div>
  );
};

export default Input;
