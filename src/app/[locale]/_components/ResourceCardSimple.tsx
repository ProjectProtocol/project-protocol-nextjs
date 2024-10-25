/* eslint-disable @next/next/no-img-element */
import ListItem from "@/components/ListItem";
import Resource from "@/types/Resource";

export default async function ResourceCardSimple({
  resource,
}: {
  resource: Resource;
}) {
  const { url, city, state, name, id, isOnline } = resource;
  const faviconURL = `https://s2.googleusercontent.com/s2/favicons?domain_url=${url}`;
  const src = await fetch(faviconURL)
    .then((res) => {
      if (!res.ok) {
        return "/images/icon.svg";
      }
      return faviconURL;
    })
    .catch((e) => {
      return "/images/icon.svg";
    });

  const locationLabel = isOnline
    ? "Online"
    : city && state
    ? `${city}, ${state}`
    : null;

  return (
    <ListItem body className="shadow-none" href={"/resources/" + id}>
      <div className="vertical-rhythm-sm">
        <div className="d-flex flex-row align-items-top">
          <div
            className="bg-white d-flex justify-content-center align-items-center rounded rounded-circle border me-2 position-relative"
            style={{ width: "30px", height: "30px", padding: "6px" }}
          >
            <img
              src={src}
              width="0"
              height="0"
              style={{ width: "18px", height: "18px" }}
              alt={`Favicon for ${name}`}
            />
          </div>
          <div className="flex flex-column">
            <span className="fs-3 fw-semibold d-block">{name}</span>
            {locationLabel && (
              <div className="d-flex flex-row text-dark">
                <i className="bi bi-geo-alt-fill me-1 small" />
                <span className="small">{locationLabel}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </ListItem>
  );
}
