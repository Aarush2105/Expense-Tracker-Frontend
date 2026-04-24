export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-card p-8 rounded-xl shadow-soft w-full max-w-md border border-gray-100">
      {children}
    </div>
  );
}