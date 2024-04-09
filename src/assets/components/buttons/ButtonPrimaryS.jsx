function ButtonPrimaryS({ text, tag }) {
  return (
    <>
      <button className="bg-first_indigo text-white rounded-[20px] hover:bg-second_indigo flex items-center justify-center px-8">
        {tag}
        <p className="font-bold text-[13px]  text-center py-2">
          {text ? text : "Button Primary S"}
        </p>
      </button>
    </>
  );
}

export default ButtonPrimaryS;
