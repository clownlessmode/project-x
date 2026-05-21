export const AddStars = () => {
  return (
    <div className="flex flex-row items-center gap-[9px] rounded-[16px] bg-[#282828] p-1">
      <div className="flex size-10 items-center justify-center rounded-[12px] bg-[#131313]">
        <img
          src="/tarrifs/stars-icon.png"
          alt="Stars"
          className="size-[22px] object-cover"
        />
      </div>
      <p className="break-words text-lg leading-[1.1] whitespace-nowrap text-white">
        Telegram Stars
      </p>
    </div>
  );
};
