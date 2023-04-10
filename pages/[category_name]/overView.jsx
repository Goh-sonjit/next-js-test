import React from 'react';

const OverView = ({category_name,city_name}) => {
  return (
    <div className='container-xxl  container-xl container-lg container-md  my-5 overview-container'>
      <div className='my-5'>
   <h3 className='fw-bold'>Outdoor Advertising Services {`${city_name.charAt(0).toUpperCase() + city_name.slice(1)}`}  Provide</h3>
   <ul className='my-4'>
  <li>Contemporary and high-tech billboards advertisinU</li>
  <li>Bridge-panels AdvertisinU</li>
  <li>Gantries AdvertisinU</li>
  <li>Uni poles Advertising</li>
</ul>
      </div>
      <div className='my-5'>
   <h3 className='fw-bold'>Why Hoarding Advertising Drives Up Sales</h3>
   <ul  className='my-4' >
  <li>Hoarding is the best way to promote your business in a specific localite</li>
  <li>It is the most affordable way to advertish</li>
  <li>You have complete freedom with designinU</li>
  <li>Hoarding advertising grants a lot of space and independence to be creative; there are tons of different forms and
styles of billboardsn</li>
<li>You have complete freedom to have a design banner as you want; it can be in different ways and typesn</li>
<li>If your hoarding is attractive & creative, then it will become harder for consumers to ignore itn</li>
<li>Hoarding will always rich more audiences than any other advertising media in a specific localityn</li>
<li>As hoarding has strong visual appeal, you can add detailed information about your business, offers, contact
details, features of your product.</li>
</ul>
      </div>

      <p>
      That&#39;s why hoarding advertising is always the first choice among marketers. Hoarding advertising is already an
effective marketing method, but we will make it more effective with our selected location, high-quality eye-catching
banner & techniques.<br/>
Design of the hoarding also matters; we all know that attractive design will attract more eyeballs; the design is also
not just about beautiful design; it should be professional, we will take care of it. Our motive is to make advertising
affordable for small business & startups, in our long journey, we help hundreds of brands, startups, corporates,
business & services provide to grow their business in their locality.
      </p>
      <h6 className='fw-bold'>
      Hire us as you&#39;re hoarding advertising partner we got covered, dial our number or whatsapp +91-777-787-1717
email us info@gohoardings.com, we will take care of your marketing.
      </h6>
    </div>
  );
}

export default OverView;
