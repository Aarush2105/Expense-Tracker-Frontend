type Props = {
  children: React.ReactNode;
  type?: "button" | "submit";
};

export default function Button({ children, type = "button" }: Props) {
  return (
    <button
      type={type}
      className="w-full bg-primary text-white py-2 rounded-xl font-medium hover:opacity-90 transition"
    >
      {children}
    </button>
  );
}