export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      
      {/* Left Side (Branding) */}
      <div className="hidden md:flex flex-col justify-center items-center bg-primary text-white p-10">
        <h1 className="text-3xl font-bold mb-4">Expense Tracker</h1>
        <p className="text-center max-w-sm opacity-90">
          Take control of your finances. Track, analyze, and grow your savings effortlessly.
        </p>
      </div>

      {/* Right Side (Form) */}
      <div className="flex items-center justify-center bg-bg p-6">
        {children}
      </div>

    </div>
  );
}