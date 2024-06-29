import Menu from "@/components/Menu/Menu";
import MobileTabs from "@/components/Menu/MobileTabs";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Menu />
      <div className="p-3">{children}</div>
      <MobileTabs />
    </main>
  );
}
