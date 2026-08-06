import Sidebar from '../../components/layout/sidebar/Sidebar'
import Navbar from '../../components/layout/navbar/Navbar'
import MainContainer from '../../components/layout/main-container/MainContainer'
import AppRoutes from './AppRoutes'
import { SidebarProvider } from '../../services/context/sidebar-context/SidebarContext'

const Layout = () => {
  return (
    <SidebarProvider>
      <div className="flex h-dvh w-full overflow-hidden bg-app-bg text-app-text">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Navbar />
          <MainContainer>
            <AppRoutes />
          </MainContainer>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Layout
