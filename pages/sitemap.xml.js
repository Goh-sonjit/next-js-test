import instance from "@/allApi/axios";

function generateSiteMap(data) {
    const	date = new Date().toISOString()
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
     <loc>http://localhost:3000</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.9</priority>
     </url>
    
     <url>
     <loc>http://localhost:3000/sitemapDigital.xml</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.9</priority>
     </url>
  
     <url>
     <loc>http://localhost:3000/sitemapAirport.xml</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.9</priority>
     </url>
 
     <url>
     <loc >http://localhost:3000/sitemapMall.xml</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.9</priority>
     </url>
     <url>
     <loc>http://localhost:3000/sitemapTraditional.xml</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.9</priority>
     </url>
     <url>
     <loc>http://localhost:3000/sitemaptransit.xml</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.9</priority>
     </url>
     <url>
     <loc>http://localhost:3000/about-us</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.8</priority>
     </url>
     <url>
     <loc>http://localhost:3000/team</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.8</priority>
     </url>
     <url>
     <loc>http://localhost:3000/media-and-news</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.8</priority>
     </url>
     <url>
     <loc>"http://localhost:3000/contact-us</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.8</priority>
     </url>
     <url>
     <loc>"http://localhost:3000/testimonial</loc>
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
     ${data
       .map(({ name}) => {
         return `
       <url>
           <loc>${`${"http://localhost:3000/"}/traditional-ooh-media/${name}`}</loc>
             <lastmod>${date}</lastmod>
             <changefreq>daily</changefreq>
<priority>0.8</priority>
       </url>
       <url>
           <loc>${`${"http://localhost:3000/"}/mall-media/${name}`}</loc>
             <lastmod>${date}</lastmod>
             <changefreq>daily</changefreq>
<priority>0.8</priority>
       </url>
       <url>
           <loc>${`${"http://localhost:3000/"}/airport-media/${name}`}</loc>
             <lastmod>${date}</lastmod>
             <changefreq>daily</changefreq>
<priority>0.8</priority>
       </url>
       <url>
           <loc>${`${"http://localhost:3000/"}/office-media/${name}`}</loc>
             <lastmod>${date}</lastmod>
             <changefreq>daily</changefreq>
<priority>0.8</priority>
       </url>
       <url>
           <loc>${`${"http://localhost:3000/"}/digital-media/${name}`}</loc>
             <lastmod>${date}</lastmod>
             <changefreq>daily</changefreq>
<priority>0.8</priority>
       </url>
       <url>
           <loc>${`${"http://localhost:3000/"}/transit-media/${name}`}</loc>
             <lastmod>${date}</lastmod>
             <changefreq>daily</changefreq>
<priority>0.8</priority>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const {data} = await instance.get("sitemapdata")


  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(data);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;