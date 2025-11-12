import { Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import HomeSvg from '../../assets/images/HomeImg.svg';
import Header from '../../components/Home/Header';

const Home = () => {
    const { width, height } = useWindowDimensions();
    return (
        <>
            <Header />
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 20 }}>
                <HomeSvg width={200} height={200} />
                <Text style={{ fontWeight: "bold", fontSize: width * 0.04 }}>You dont have any courses</Text>
                <TouchableOpacity activeOpacity={0.8} style={{ backgroundColor: "blue", paddingVertical: 15, paddingHorizontal: 50, borderRadius: 10 }}>
                    <Text style={{ color: "white", }}>+  Create New One</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={{ borderColor: "blue", borderWidth: 1, borderRadius: 6, paddingVertical: 15, paddingHorizontal: 30 }}>
                    <Text style={{ color: "blue" }}>Explore Existing courses</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default Home;