import Banner from "./Banner/Banner";
import Download from "./Download/Download";
import Foote from "./Footer/Foote";
import Navbar from "./Navbar/Navbar";
import UserTypesSection from "./UserType/UserType";

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Banner></Banner>
            <UserTypesSection></UserTypesSection>
            <Download></Download>
            <Foote></Foote>
        </div>
    );
};

export default Home;