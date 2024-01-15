interface AttrProps {
  text: string;
  info: string;
}

const Attr = ({ text, info }: AttrProps) => {
  return (
    <div>
      <p className="text-[#EEE5E9] text-lg">
        {text} <span className="font-bold text-xl">{info}</span>
      </p>
    </div>
  );
};

export default Attr;
