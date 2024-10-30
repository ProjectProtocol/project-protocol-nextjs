"use client";

import { Card, FormControl } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useTranslations } from "next-intl";
import { createComment } from "@/lib/actions/resource";
import Resource from "@/types/Resource";
import { useRef } from "react";
import CommentSendIcon from "./CommentSendIcon";
import toast from "react-hot-toast";
import { useAuth } from "@/components/AuthProvider";
import ConfirmationModal from "../../../../../../components/ConfirmationModal";

export default function CommentArea({ resource }: { resource: Resource }) {
  const t = useTranslations();
  const { user } = useAuth();
  const [commentText, setCommentText] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    resizeTextArea();
    setCommentText(e.target.value);
  };

  const onSubmit = async () => {
    if (!user?.isConfirmed) {
      setShowConfirmationModal(true);
      setCommentText("");
    } else {
      const response = await createComment(resource.id, { body: commentText });
      if (response.ok) {
        toast.success(t("resources.commentCreatedSuccess"));
        setCommentText("");
      } else {
        toast.error(t("shared.genericError"));
      }
    }
  };

  useEffect(() => {
    resizeTextArea();
    window.addEventListener("resize", resizeTextArea);
    return () => window.removeEventListener("resize", resizeTextArea);
  }, []);

  useEffect(() => {
    setSubmitDisabled(commentText.length === 0);
    if (commentText === "") {
      resizeTextArea();
    }
  }, [commentText]);

  return (
    <>
      <Card body className="mb-3">
        <div className="position-relative">
          <FormControl
            as="textarea"
            value={commentText}
            ref={textAreaRef}
            onChange={handleChange}
            placeholder={t("resources.comments.add")}
            rows={1}
          ></FormControl>
          <Button
            variant="link"
            className="p-0 text-dark position-absolute d-flex align-items-center"
            style={{
              right: "1rem",
              bottom: "0",
              height: "38px",
            }}
            disabled={submitDisabled}
            onClick={onSubmit}
          >
            <CommentSendIcon disabled={submitDisabled} />
          </Button>
        </div>
      </Card>
      <ConfirmationModal
        show={showConfirmationModal}
        onHide={() => setShowConfirmationModal(false)}
        user={user}
        title={t("resources.comments.confirmAccountToAddComment")}
      />
    </>
  );
}
