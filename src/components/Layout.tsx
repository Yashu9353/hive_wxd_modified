import { Header, HeaderName, HeaderGlobalBar, HeaderGlobalAction, Theme, Grid, Column } from '@carbon/react';
import { UserAvatar, Notification } from '@carbon/icons-react';
import { ReactNode, useState, useEffect } from 'react';
import AppSidebar from './AppSidebar';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const theme = 'g10';

  useEffect(() => {
    const handleResize = () => {
      const sidebar = document.querySelector('aside');
      if (sidebar) {
        setSidebarWidth(sidebar.offsetWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    const observer = new MutationObserver(handleResize);
    const sidebar = document.querySelector('aside');
    if (sidebar) {
      observer.observe(sidebar, { attributes: true, attributeFilter: ['style'] });
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <Theme theme={theme as any}>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header aria-label="Hive to Watsonx.data Migration">
          <HeaderName href="/" prefix="IBM">
            GDC Data Modernization Asset
          </HeaderName>
          <HeaderGlobalBar>
            <HeaderGlobalAction aria-label="Notifications">
              <Notification size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction aria-label="User Avatar">
              <UserAvatar size={20} />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
        </Header>
        
        <div style={{ display: 'flex', flex: 1, marginTop: '48px' }}>
          <AppSidebar />
          <main style={{ 
            flex: 1,
            marginLeft: `${sidebarWidth}px`,
            transition: 'margin-left 0.2s ease',
            minHeight: 'calc(100vh - 48px)'
          }}>
            {children}
          </main>
        </div>

        {/* Global Footer (dark band like ibm.com) */}
        <footer style={{ padding: '2rem', borderTop: '1px solid #e0e0e0', backgroundColor: '#161616', color: '#f4f4f4' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Grid>
              <Column lg={8} md={4} sm={4}>
                <h4 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>IBM watsonx.data Migration Suite</h4>
                <p style={{ color: '#c6c6c6' }}>Carbon Design compliant UI.</p>
              </Column>
              <Column lg={8} md={4} sm={4}>
                <p style={{ color: '#c6c6c6' }}>© 2025 IBM Corporation. All rights reserved.</p>
              </Column>
            </Grid>
          </div>
        </footer>
      </div>
    </Theme>
  );
};

export default Layout;
