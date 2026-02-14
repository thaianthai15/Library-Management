import Button from "../../components/user/Button";
import Categories from "../../components/user/Categories";
import FeatureBar from "../../components/user/FeatureBar";
import PromoBanner from "../../components/user/PromoBanner";
import RatingSection from "../../components/user/RatingSection";
import FeaturedAuthors from "../../components/user/FeaturedAuthors";
import Footer from "../../components/user/Footer";
import Header from "../../components/user/Header";
import Hero from "../../components/user/Hero";
import { FaArrowRight } from "react-icons/fa";


export default function Home() {
    return (
        <>
            <Header />
            <Hero />
            <FeatureBar />
            <Categories /> 
            <PromoBanner />
            <RatingSection />
            <FeaturedAuthors />
            <Footer />
        </>
    )
}