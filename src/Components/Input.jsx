export default function Input({
  type,
  placeholder,
  name,
  register = () => {},
  label,
  onChange,
  value,
  disabled,
  error,
}) {
  return (
    <>
      <div className="w-full">
        <label className="text-lg font-semibold text-g-900 mb-1.5">
          {label}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          {...register(name)}
          onChange={onChange}
          name={name}
          disabled={disabled}
          value={value}
          className="w-full bg-white border border-grayBorder rounded-lg px-3 py-3.5 outline-none"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </>
  );
}
