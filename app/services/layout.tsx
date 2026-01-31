import type { Metadata } from 'next'
import '../globals.css'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata: Metadata = {
  title: 'Skyhost Digital - Services',
  description: 'Professional web development and digital services.',
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
      
      {/* Tawk.io Chat Widget */}
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