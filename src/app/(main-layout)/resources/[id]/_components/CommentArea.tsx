"use client";

import { Card, FormControl } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useTranslations } from "next-intl";
import { createComment } from "@/lib/actions/resource";
import Resource from "@/types/Resource";
import { useRef } from "react";
import CommentSendIcon from "./CommentSendIcon";

export default function CommentArea({ resource }: { resource: Resource }) {
  const t = useTranslations();
  const [commentText, setCommentText] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);
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
    const response = await createComment(resource.id, { body: commentText });
    if (response.ok) {
      setCommentText("");
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
  );
}
