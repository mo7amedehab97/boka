import Head from 'next/head'
import Navbar from '../component/Navbar/Navbar'
import Banner from '../component/Banner/Banner'
import Slider from '../component/Slider/Slider'
import Offer from '../component/Offer/Offer'
import PopularBusines from '../component/PopularBusiness/PopularBusines'
import FeaturedBusinesses from '../component/FeaturedBusiness/FeaturedBusinesses'
import HairSalon from '../component/HairSalon/HairSalon'
import BokaTransitions from '../component/BokaTransitions/BokaTransitions'
import PopularCategory from '../component/PopularCategory/PopularCategory'
import CustomerReviews from '../component/CustomersReviews/CustomerReviews'
import Footer from '../component/Footer/Footer'
import Parteners from '../component/Parteners/Parteners'
import { caseStudies, popularCategories } from '../component/Requsets'
import MoreBusniess from '../component/MoreBusniess/MoreBusniess'

export default function Home({ CaseStudies, PopularCategories }) {
  return (
    <div>
      {' '}
      <Head>
        <title>Boka</title>
        <meta
          name="salon and beauty booking"
          content="Generated by create next app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Banner />
      <Slider />
      <Offer />
      <PopularBusines />
      <FeaturedBusinesses />
      <HairSalon />
      <BokaTransitions CaseStudies={CaseStudies} />
      <PopularCategory PopularCategories={PopularCategories} />
      <CustomerReviews />
      <Parteners />
      <MoreBusniess />
      <Footer />
    </div>
  )
}

export async function getServerSideProps(context) {
  const CaseStudies = await caseStudies()
  const PopularCategories = await popularCategories()

  return {
    props: {
      CaseStudies,
      PopularCategories,
    },
  }
}
