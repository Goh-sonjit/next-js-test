import instance from "@/allApi/axios";

function generateSiteMap() {
    const	date = new Date().toISOString()
  return `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex  xmlns="https://gohoardings.com/">

  <sitemapindex  xml="https://gohoardings.com/sitemapAirport.xml"/>
  
 
  <sitemapindex  xml="https://gohoardings.com/sitemapMall.xml"/>
 
 <sitemapindex  xml="https://gohoardings.com/sitemapTraditional.xml"/>
    
 <sitemapindex  xml="https://gohoardings.com/sitemaptransit.xml"/>
   
 <sitemapindex  xml="https://gohoardings.com/sitemapCities.xml"/>
 <sitemapindex  xml="https://gohoardings.com/sitemapDigital.xml"/>
        
     <sitemap>
     <loc>https://gohoardings.com/about-us</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.8</priority>
     </sitemap>
     <sitemap>
     <loc>https://gohoardings.com/team</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.8</priority>
     </sitemap>
     <sitemap>
     <loc>https://gohoardings.com/media-and-news</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.8</priority>
     </sitemap>
     <sitemap>
     <loc>"https://gohoardings.com/contact-us</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.8</priority>
     </sitemap>
     <sitemap>
     <loc>"https://gohoardings.com/testimonial</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.8</priority>
     </sitemap>
     <sitemap>
     <loc>https://www.gohoardings.com/blog/</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.8</priority>
     </sitemap>
     <sitemap>
     <loc>https://www.gohoardings.com/faqs</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.8</priority>
     </sitemap>
   
   </sitemapindex >
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the sitemaps for our site



  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap();

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;