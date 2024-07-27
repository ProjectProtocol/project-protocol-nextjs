interface ISocialMediaLink {
  platform: string;
  value: string;
}

export default function SocialMediaLink({ platform, value }: ISocialMediaLink) {
  return (
    <div className="d-flex flex-row gap-1">
      <i className={`bi bi-${platform}`}></i>
      <a
        href={`https://www.${platform}.com/${value}`}
        className="text-decoration-none"
        target="_blank"
      >
        {value}
      </a>
    </div>
  );
}
