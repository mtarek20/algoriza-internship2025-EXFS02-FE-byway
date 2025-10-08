export default function CustomCheckInput({
  id,
  label,
  onChange,
  value,
  checked,
}) {
  return (
    <div>
      <div className="flex items-center mb-3 ">
        <input
          id={id}
          type="checkbox"
          onChange={onChange}
          value={value}
          checked={checked}
          name="checkbox"
          className="w-5.5 h-5.5 text-primary-500  border-graylight rounded-full  cursor-pointer "
        />
        <label
          htmlFor={id}
          className="ms-3 text-[16px]  text-g-900 inline-block "
        >
          {label}
        </label>
      </div>
    </div>
  );
}
