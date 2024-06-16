import Menu from "@/components/Menu";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Menu />
      {children}
    </main>
  );
}
