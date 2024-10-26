"use client";

import SearchResult from "@/components/search/SearchResult";
import Office from "@/types/Office";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SelectOfficeModal from "./SelectOfficeModal";
import Input from "@/components/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAgent } from "@/lib/actions/agent";
import toast from "react-hot-toast";
import AsyncButton from "@/components/AsyncButton";
import { useRouter } from "@/i18n/routing";

export default function AddAgentForm() {
  const [showModal, setShowModal] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState<Office>();
  const [loading, setLoading] = useState(false);
  const tAgent = useTranslations("agent");
  const tShared = useTranslations("shared");
  const router = useRouter();

  const AddAgentSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().min(1, { message: tAgent("form.lastNameRequired") }),
    officeId: z
      .string({ message: tAgent("form.selectOfficeRequired") })
      .min(1, { message: tAgent("form.selectOfficeRequired") }),
  });

  type AddAgentSchema = z.infer<typeof AddAgentSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<AddAgentSchema>({
    mode: "onSubmit",
    resolver: zodResolver(AddAgentSchema),
  });

  const handleClose = () => {
    setShowModal(false);
  };

  const onSubmit = async (params: AddAgentSchema) => {
    setLoading(true);
    const { agent } = await createAgent(params);
    if (agent) {
      toast.success(tAgent("successToast"));
      router.replace(`/rate-my-po/agents/${agent.id}`);
    } else {
      setLoading(false);
      toast.error(tShared("genericError"));
    }
  };

  return (
    <>
      <h3 className="mb-3">{tAgent("form.title")}</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="vertical-rhythm">
        <Input
          label={`${tAgent("form.firstName")} ${tShared("optional")}`}
          className="mb-3 w-100"
          type="text"
          {...register("firstName")}
        />
        <Input
          type="text"
          label={tAgent("form.lastName")}
          className="mb-3 w-100"
          isInvalid={!!errors?.lastName}
          error={errors?.lastName?.message}
          {...register("lastName", {
            required: tAgent("form.lastNameRequired"),
          })}
        />
        <div className="mb-3">
          <h3 className="mb-0"> {tAgent("form.office")}</h3>
          {!!errors?.officeId && (
            <small className="text-danger">{errors?.officeId?.message}</small>
          )}
        </div>
        <div className="p-3 mb-3">
          {selectedOffice ? (
            <div>
              <SearchResult result={selectedOffice} />
              <div className="text-center">
                <a
                  className="link-dark"
                  role="button"
                  onClick={() => setShowModal(true)}
                >
                  {tAgent("form.edit")}
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <a
                className="link-dark"
                role="button"
                onClick={() => setShowModal(true)}
              >
                {tAgent("form.selectOffice")}
              </a>
            </div>
          )}
        </div>
        <div className="mt-5">
          <AsyncButton
            size="lg"
            variant="primary"
            disabled={!errors}
            type="submit"
            className="w-100"
            loading={loading}
          >
            {tAgent("form.createListing")}
          </AsyncButton>
        </div>
      </form>
      <Controller
        name="officeId"
        control={control}
        render={({ field }) => (
          <SelectOfficeModal
            show={showModal}
            close={handleClose}
            selectOffice={(office: Office) => {
              setSelectedOffice(office);
              field.onChange(String(office.id));
            }}
          />
        )}
      />
    </>
  );
}
