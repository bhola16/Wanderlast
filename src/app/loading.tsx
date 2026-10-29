
import { Compass } from "lucide-react";

const Loading = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-6xl">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#3ab0cb]/10">
            <Compass
              size={32}
              className="animate-spin text-[#238ba2]"
            />
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Preparing Your Journey
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Please wait while we load your travel experience...
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="animate-pulse overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
            >
              <div className="h-56 bg-gray-200" />

              <div className="p-5">
                <div className="mb-4 h-4 w-1/3 rounded bg-gray-200" />
                <div className="mb-4 h-6 w-3/4 rounded bg-gray-200" />
                <div className="mb-6 h-4 w-1/2 rounded bg-gray-200" />

                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <div className="h-7 w-24 rounded bg-gray-200" />
                  <div className="h-10 w-28 rounded-lg bg-gray-200" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm font-medium text-[#238ba2]">
          Finding your next adventure...
        </p>
      </div>
    </main>
  );
};

export default Loading;
