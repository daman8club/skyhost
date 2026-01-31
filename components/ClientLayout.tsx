'use client'

import { usePathname } from 'next/navigation'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith('/admin') || pathname?.startsWith('/register-email') || pathname?.startsWith('/test-email-tracking')
  
  if (isAdminPage) {
    return <>{children}</>
  }
  
  return (
    <>
      <Navbar />
      <main className="pt-20">{children}</main>
      <Footer />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/6960b03d1636e8197eee77b5/1jegr0so1';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `
        }}
      />
    </>
  )
}