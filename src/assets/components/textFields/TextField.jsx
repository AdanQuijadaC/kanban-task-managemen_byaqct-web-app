function TextField({ label, fieldname, text, example, value, onChange, href }) {
  return (
    <>
      <div className="flex flex-col gap-1">
        <label className="text-[12px] text-[#828FA3] font-bold" htmlFor={label}>
          {label}
        </label>
        <input
          ref={href}
          className="outline-none font-medium border-[#828fa340] rounded border text-[13px] w-full p-2  placeholder:text-[13px] placeholder:font-medium"
          name={fieldname}
          placeholder={example}
          type="text"
          id={label}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
}

export default TextField;
