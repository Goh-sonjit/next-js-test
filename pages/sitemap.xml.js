import instance from "@/allApi/axios";

function generateSiteMap() {
    const	date = new Date().toISOString()
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
     <loc>https://gohoardings.com/</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.9</priority>
     </url>
    
     <url>
     <loc>https://gohoardings.com/sitemapDigital.xml</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.9</priority>
     </url>
  
     <url>
     <loc>https://gohoardings.com/sitemapAirport.xml</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.9</priority>
     </url>
 
     <url>
     <loc >https://gohoardings.com/sitemapMall.xml</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.9</priority>
     </url>
     <url>
     <loc>https://gohoardings.com/sitemapTraditionl.xml</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.9</priority>
     </url>
     <url>
     <loc>https://gohoardings.com/sitemaptransit.xml</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.9</priority>
     </url>
     <url>
     <loc>https://gohoardings.com/sitemapCities.xml</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.9</priority>
     </url>
     <url>
     <loc>https://gohoardings.com/about-us</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.8</priority>
     </url>
     <url>
     <loc>https://gohoardings.com/team</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.8</priority>
     </url>
     <url>
     <loc>https://gohoardings.com/media-and-news</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.8</priority>
     </url>
     <url>
     <loc>"https://gohoardings.com/contact-us</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.8</priority>
     </url>
     <url>
     <loc>"https://gohoardings.com/testimonial</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.8</priority>
     </url>
     <url>
     <loc>https://www.gohoardings.com/blog/</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.8</priority>
     </url>
     <url>
     <loc>https://www.gohoardings.com/faqs</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.8</priority>
     </url>
   
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site



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