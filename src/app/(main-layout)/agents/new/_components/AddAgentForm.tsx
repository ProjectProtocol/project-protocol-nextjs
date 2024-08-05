"use client";

import SearchResult from "@/components/search/SearchResult";
import Office from "@/types/Office";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import SelectOfficeModal from "./SelectOfficeModal";
import Input from "@/components/Input";

interface IAddAnAgentForm {
  firstName?: string;
  lastName: string;
  office: Office;
}

export default function AddAgentForm() {
  const [showModal, setShowModal] = useState(false);
  const tAgent = useTranslations("agent");
  const tShared = useTranslations("shared");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm<IAddAnAgentForm>({
    mode: "onSubmit",
    defaultValues: { firstName: "", lastName: "", office: undefined },
  });

  const office = watch("office");

  const handleClose = () => {
    setShowModal(false);
  };

  const onSubmit: SubmitHandler<IAddAnAgentForm> = async ({
    office,
    ...params
  }: IAddAnAgentForm) => {
    console.log(office, params);
    //  const newAgent = await ApiAgent.create({
    //    ...params,
    //    officeId: office.id,
    //  });

    //  if (newAgent) {
    //    toast.success(t("successToast"));
    //    navigate(`/agents/${newAgent.agent.id}`, { replace: true });
    //  } else {
    //    toast.error(t("genericError"));
    //  }
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
          {!!errors?.office && (
            <small className="text-danger">{errors?.office?.message}</small>
          )}
        </div>
        <div className="p-3 mb-3">
          {office ? (
            <div>
              <SearchResult result={office} />
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
          <Button
            size="lg"
            variant="primary"
            disabled={!errors}
            type="submit"
            className="w-100 w-md-auto mx-auto"
          >
            {tAgent("form.createListing")}
          </Button>
        </div>
      </form>
      <Controller
        name="office"
        control={control}
        rules={{ required: tAgent("form.selectOfficeRequired") }}
        render={({ field }) => (
          <SelectOfficeModal
            show={showModal}
            close={handleClose}
            selectOffice={field.onChange}
          />
        )}
      />
    </>
  );
}
