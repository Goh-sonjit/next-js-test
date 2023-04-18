import instance from "@/allApi/axios";

function generateSiteMap(data) {
    const	date = new Date().toISOString()
  return `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex  xmlns="https://gohoardings.com/">
     <!--We manually set the two URLs we know already-->
     
     ${data
       .map(({ meta_title, category_name}) => {
         return `
       <sitemap>
           <loc>http://localhost:3000/seedetails/${category_name}/${meta_title}</loc>
             <lastmod>${date}</lastmod>
             <changefreq>daily</changefreq>
<priority>0.8</priority>
       </sitemap>

     `;
       })
       .join('')}
   </sitemapindex>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const {data} = await instance.post(`transit-media`)


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