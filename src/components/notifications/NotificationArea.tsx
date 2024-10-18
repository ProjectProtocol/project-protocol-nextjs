import { Toaster } from "react-hot-toast";
import FlashMessages from "./FlashMessages";
import { getFlashMessages } from "@/lib/flash-messages";

// Options: https://react-hot-toast.com/docs/toaster
export default function NotificationArea() {
  const messages = getFlashMessages();

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
      <FlashMessages messages={messages} />
    </>
  );
}
