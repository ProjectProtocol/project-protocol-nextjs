import Resource, { ResourceTag } from "@/types/Resource";
import { useTranslations } from "next-intl";
import { Card } from "react-bootstrap";
import SocialMediaLink from "./SocialMediaLink";
import TagBadge from "@/components/TagBadge";
import ResourceVoteControls from "./ResourceVoteControls";
import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
export default function ResourceCard({ resource }: { resource: Resource }) {
  const t = useTranslations();

  const {
    url,
    name,
    description,
    tagList,
    street,
    city,
    state,
    zip,
    phone,
    email,
    isOnline,
    facebook,
    instagram,
    twitter,
    linkedin,
  } = resource;
  const locationLabel = isOnline
    ? "Online"
    : city && state
    ? `${city}, ${state}`
    : null;

  const addressLabel =
    street && city && state && zip
      ? [street, city, state, zip].join(", ")
      : undefined;

  return (
    <Card body>
      <div className="vertical-rhythm-sm">
        <div className="d-flex flex-row align-items-top">
          <div
            className="bg-white d-flex justify-content-center align-items-center rounded rounded-circle border me-2"
            style={{ width: "30px", height: "30px", padding: "6px" }}
          >
            <img
              src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${url}`}
              width={18}
              height={18}
              alt={""}
            />
          </div>
          <div className="flex flex-column">
            <a
              href={url}
              target="_blank"
              className="fs-3 fw-semibold d-block link-cobalt"
            >
              {name}
            </a>
            <div className="text-dark small text-break">{url}</div>
            {locationLabel && (
              <div className="d-flex flex-row">
                <i className="bi bi-geo-alt-fill me-1 text-dark small" />
                <span className="small">{locationLabel}</span>
              </div>
            )}
          </div>
        </div>
        <p>{description}</p>
        <div className="d-flex flex-column gap-1">
          {addressLabel && (
            <a
              href={`https://maps.google.com/?q=${addressLabel}`}
              target="_blank"
            >
              {addressLabel}
            </a>
          )}
          {phone && <a href={`tel:+1${phone}`}>{phone}</a>}
          {email && <a href={`mailto:${email}`}>{email}</a>}
          {instagram && (
            <SocialMediaLink platform="instagram" value={instagram} />
          )}
          {facebook && <SocialMediaLink platform="facebook" value={facebook} />}
          {twitter && <SocialMediaLink platform="twitter" value={twitter} />}
          {linkedin && <SocialMediaLink platform="linkedin" value={linkedin} />}
        </div>
        <div className="d-flex flex-row flex-wrap gap-2">
          {tagList.map((tag: ResourceTag, i: number) => (
            <TagBadge
              label={t(`resources.tags.${tag}`)}
              key={`resource-detail-tag-${i}`}
            />
          ))}
        </div>
        <div className="d-flex flex-row flex-wrap gap-2 align-items-center text-dark">
          <ResourceVoteControls resource={resource} />
          <Link
            href={`/resources/${resource.id}`}
            className="text-decoration-none"
          >
            <div className={"d-flex flex-row gap-1 text-dark"}>
              <span>{resource.commentsCount}</span>
              <i className="bi me-1 align-middle bi-chat-left" />
            </div>
          </Link>
        </div>
      </div>
    </Card>
  );
}
