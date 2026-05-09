import Image from "next/image";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  return (
    <main className="min-h-screen">
      <div className="grid min-h-screen grid-cols-1 bg-gray-50 lg:grid-cols-2">
        <div className="flex items-center justify-center px-8 py-12 lg:px-16">
          <div className="w-full max-w-130">{children}</div>
        </div>

        <div className="hidden bg-gray-200 lg:flex lg:items-center lg:justify-center">
          <Image src="/boxful-side.webp" alt="Woman receiving shippings monthly" width={700} height={700} loading="eager" />
        </div>
      </div>
    </main>
  );
}
