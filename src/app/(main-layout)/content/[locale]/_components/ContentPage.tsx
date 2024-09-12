import PageHeader from "@/components/PageHeader";
import ContentCoverImage from "./ContentCoverImage";

interface IContentPage {
  title: string | JSX.Element;
  children: React.ReactNode;
  coverImageSrc?: string;
}

/** Multi-purpose page layout with a page title and icon */
export default function ContentPage({
  title,
  children,
  coverImageSrc,
}: IContentPage) {
  const TitleEl = <span className="d-md-none">{title}</span>;
  return (
    <div className="pb-4 vertical-rhythm">
      <PageHeader title={TitleEl} showBack />
      {coverImageSrc ? (
        <ContentCoverImage
          coverImageSrc={coverImageSrc}
          title={title as string}
        />
      ) : (
        <h1 className="display-5 fw-bold">{title}</h1>
      )}
      {children}
    </div>
  );
}
