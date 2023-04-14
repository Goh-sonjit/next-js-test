import React, { useState, useEffect } from "react";
import Head from "next/head";
import Ourservices from "@/components/ourServices";
import City from "@/components/cityList";
import Enquire from "@/components/enquire/enquire";
import Searchmedia from "@/components/searchMedia";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import NavbarH from "@/components/navbar/navbar";

const Trendingcity = dynamic(() => import("@/components/trendingcity"), {
  ssr: false,
});

const Floatingnavbar = dynamic(
  () => import("@/components/navbar/flotingnavbar"),
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <>
      <Head>
        <title>
          India&#39s Largest Outdoor Advertising Agency | Gohoarding Solution
        </title>
        <meta charSet="utf-8" />
        <link
          rel="icon"
          href="https://www.gohoardings.com/assets/images/favicon.png"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="India's Largest Outdoor Advertising Agency. We are helping business to grow offline with hoardings, billboards ads, bus shelters, metro pillars, airport, and office brandings | Gohoardings"
        />
        <meta
          name="google-site-verification"
          content="fLT70DRZGdH5FUdrS8w1k2Zg_VTzNJGDF9ie9v4FAzM"
        />
        <meta
          name="keywords"
          content="India&#39s Largest Outdoor Advertising Agency,  Hoarding agency, Outdoor Advertising Company, Bus Advertising, Airport Advertising, OOH Media Agency, Train Advertising, Cab and Autorikshaw Advertising, Digital LED Display Ads, DOOH Advertising, Ad Agency India, Hoarding Advertising Agency Nearby, Multiplex Advertising, Gohoardings is india’s largest Outdoor Advertising Agency"
        />
      </Head>
      <main>
        <NavbarH />
      
        <Floatingnavbar />
        <section>
          <Searchmedia />
        </section>
        <section>
          <Ourservices />
        </section>
        <section>
          <City />
        </section>
        <section>
          <Enquire />
        </section>
        <section>
          <Trendingcity />
        </section>
      </main>
    </>
  );
}
