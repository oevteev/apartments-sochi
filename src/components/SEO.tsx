import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
}

const DOMAIN = 'https://arendaapartmentssochi.ru';

const SEO = ({ 
  title, 
  description, 
  image = `${DOMAIN}/og-image.jpg`,
  url,
  type = 'website'
}: SEOProps) => {
  const siteName = 'Апартаменты посуточно в Сочи';
  const fullTitle = title === siteName ? title : `${title} | ${siteName}`;
  const canonicalUrl = url || (typeof window !== 'undefined' && window.location ? window.location.href : DOMAIN);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="ru_RU" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Russian" />
    </Helmet>
  );
};

export default SEO;
