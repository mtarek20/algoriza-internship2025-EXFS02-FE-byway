export default function PaymentInput({
  register = () => {},
  type,
  placeholder,
  name,
  label,
  error,
}) {
  return (
    <>
      <div className="w-full ">
        <h3 className="text-sm  text-g-900 mb-1.5">{label}</h3>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          {...register(name)}
          className="w-full border border-grayBorder rounded-lg p-4 outline-none bg-white"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </>
  );
}
