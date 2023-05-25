import instance from "@/allApi/axios";

function generateSiteMap() {
  return `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>https://www.gohoardings.com/</loc></sitemap>
  <sitemap><loc>https://www.gohoardings.com/sitemapAirport.xml </loc></sitemap>
  <sitemap><loc>https://www.gohoardings.com/sitemapMall.xml </loc></sitemap> 
 <sitemap><loc>https://www.gohoardings.com/sitemapTraditionl.xml </loc></sitemap>   
 <sitemap><loc>https://www.gohoardings.com/sitemaptransit.xml </loc></sitemap> 
 <sitemap><loc> https://www.gohoardings.com/sitemapCities.xml</loc></sitemap>
 <sitemap><loc> https://www.gohoardings.com/sitemapDigital.xml</loc></sitemap>
 <sitemap><loc>https://www.gohoardings.com/static_sitemap.xml</loc></sitemap>
     </sitemapindex>
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