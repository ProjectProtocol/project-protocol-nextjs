import PageHeader from "@/components/PageHeader";

interface IContentPage {
  title: string | JSX.Element;
  children: React.ReactNode;
}

/** Multi-purpose page layout with a page title and icon */
export default function ContentPage({ title, children }: IContentPage) {
  return (
    <div className="pb-4 vertical-rhythm">
      <PageHeader title="" showBack />
      <h1 className="display-5 fw-bold">{title}</h1>
      {children}
    </div>
  );
}
