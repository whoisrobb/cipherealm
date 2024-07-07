import SiteHeader from '@/components/shells/site-header';
import StoreNavigation from './_components/store-navigation';
import Footer from '@/components/elements/footer';

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className='space-y-4'>
      <SiteHeader className='h-16'>
        <StoreNavigation />
      </SiteHeader>
      <div className="space-y-24">
        {children}
        <Footer />
      </div>
    </div>
  )
}

export default layout
