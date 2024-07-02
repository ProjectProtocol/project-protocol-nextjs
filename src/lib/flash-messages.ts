import { randomUUID } from "crypto";
import { cookies } from "next/headers";

export type FlashMessage = {
  id?: string;
  message: string;
  type: "success" | "error";
  dismissable?: boolean;
};

/**
 * Convenience methods for getting and setting flash messages
 * on the server side.
 */
export function getFlashMessages() {
  const store = new FlashStore();
  return store.getMessages();
}

export function flash(message: FlashMessage) {
  const flashStore = new FlashStore();
  message.id = randomUUID();
  flashStore.addMessage(message);
}

export function flashError(txt: string) {
  flash({ message: txt, type: "error" });
}

export function flashSuccess(txt: string) {
  flash({ message: txt, type: "success" });
}

/**
 * FlashStore simplifies getting and setting flash messages in
 * the browser cookies.
 */
class FlashStore {
  private store = cookies();

  getMessages() {
    const raw = this.store.get("flashMessages")?.value || "[]";
    return JSON.parse(raw);
  }

  addMessage(message: FlashMessage) {
    const messages = this.getMessages();
    messages.push(message);
    this.store.set("flashMessages", JSON.stringify(messages), { maxAge: 0 });
  }

  clearMessages() {
    this.store.set("flashMessages", "[]");
  }
}
