import Navbar from "@/app/components/navbar";
import Sidebar from "@/app/components/sidebar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<div className="h-screen flex flex-col">
 {/* Navbar */}
          <header>
            <Navbar/>
          </header>

          <div className="flex flex-1 w-full h-full">
            {/* Sidebar */}
            <aside className="w-fit border-r-0 bg-blue-200 shadow-2xl shadow-blue-950 h-full">
              <Sidebar/>
              </aside>

            {/* Contenu principal */}
            <main className="flex-1 p-4">
              <div className="flex flex-col flex-1 items-stretch justify-center bg-transparent font-sans dark:bg-black">
              {children}
              </div>
              </main>
          </div>
</div>
  )
}