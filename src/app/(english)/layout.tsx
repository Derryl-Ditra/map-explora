import RootDocument from '@/components/RootDocument';
export {metadata,viewport} from '@/components/RootDocument';
export default function Layout({children}:{children:React.ReactNode}){return <RootDocument language="en">{children}</RootDocument>;}
