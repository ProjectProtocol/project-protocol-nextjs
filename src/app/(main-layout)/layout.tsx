import Menu from "@/components/Menu";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Menu />
      {children}
    </main>
  );
}
