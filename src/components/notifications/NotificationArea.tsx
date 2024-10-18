import { Toaster } from "react-hot-toast";

// Options: https://react-hot-toast.com/docs/toaster
export default function NotificationArea() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          className: "text-white",
          style: {
            backgroundColor: "rgba(0,0,0,0.95)",
          },
        }}
      />
    </>
  );
}
