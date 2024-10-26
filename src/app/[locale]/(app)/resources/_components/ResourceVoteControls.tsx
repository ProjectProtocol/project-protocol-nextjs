"use client";

import Resource from "@/types/Resource";
import { useEffect, useState } from "react";
import { like, dislike } from "@/lib/actions/resource";
import { useAuth } from "@/components/AuthProvider";
import toast from "react-hot-toast";
import { Button } from "react-bootstrap";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";

export default function ResourceVoteControls({
  resource,
}: {
  resource: Resource;
}) {
  const t = useTranslations();
  const { user } = useAuth();
  const [currResource, setResource] = useState(resource);
  const router = useRouter();

  const displayToast = () => {
    toast(
      (toastObject) => (
        <div>
          {t("resources.signInRequired")}
          <div className="d-flex py-2 flex-row justify-content-between align-items-center">
            <a
              role="button"
              className="link-light"
              onClick={() => toast.dismiss(toastObject.id)}
            >
              {t("shared.dismiss")}
            </a>
            <Button
              size="sm"
              variant="light"
              onClick={() => {
                toast.dismiss(toastObject.id);
                router.push("/auth/login");
              }}
            >
              {t("login.login")}
            </Button>
          </div>
        </div>
      ),
      { id: "unauthorized-toast" }
    );
  };

  useEffect(() => {
    setResource(resource);
  }, [resource]);

  return (
    <div className="d-flex flex-row flex-wrap gap-2 align-items-center text-dark">
      <div className={"d-flex flex-row gap-1"}>
        <span data-testid="likes-count">{currResource.votesUp}</span>
        <i
          data-testid="like-button"
          className={`bi me-1 align-middle bi-hand-thumbs-up${
            currResource.isCurrentUserLiked ? "-fill" : ""
          }`}
          role="button"
          onClick={async () => {
            if (!user) {
              displayToast();
            } else {
              const newResource = await like(resource.id);
              setResource(newResource);
            }
          }}
        />
      </div>
      <div className={"d-flex flex-row gap-1"}>
        <span data-testid="dislikes-count">{currResource.votesDown}</span>
        <i
          data-testid="dislike-button"
          className={`bi me-1 align-middle bi-hand-thumbs-down${
            currResource.isCurrentUserDisliked ? "-fill" : ""
          }`}
          role="button"
          onClick={async () => {
            if (!user) {
              displayToast();
            } else {
              const newResource = await dislike(resource.id);
              setResource(newResource);
            }
          }}
        />
      </div>
    </div>
  );
}
