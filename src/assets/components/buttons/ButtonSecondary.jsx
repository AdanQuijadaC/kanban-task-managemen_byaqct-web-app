function ButtonSecondary({ text, tag }) {
  return (
    <>
      <button
        type="button"
        className="bg-[#625fc71a] text-first_indigo rounded-[20px] hover:bg-[#625fc740] flex items-center justify-center"
      >
        {tag}
        <p
          className="font-bold text-[13px]  text-center py-2 
        "
        >
          {text ? text : "Button Secondary"}
        </p>
      </button>
    </>
  );
}

export default ButtonSecondary;
