import SendIcon from "@/components/svg/SendIcon";
import classNames from "classnames";

export default function CommentSendIcon({ disabled }: { disabled: boolean }) {
  return (
    <div
      className={classNames("d-inline", {
        "text-medium-gray": disabled,
        "text-cobalt": !disabled,
      })}
    >
      <SendIcon />
    </div>
  );
}
