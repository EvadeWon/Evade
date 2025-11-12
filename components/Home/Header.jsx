import Feather from '@expo/vector-icons/Feather';
import { Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const Header = () => {
    const { width, height } = useWindowDimensions();
    return (
        <SafeAreaView style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: width * 0.08 }}>
            <View>
                <Text style={{ fontSize: width * 0.06, fontWeight: "bold" }}>Hello,</Text>
                <Text style={{ fontWeight: "semibold", fontSize: width * 0.04 }}>Lets get started!</Text>
            </View>
            <Feather name="settings" size={24} color="black" />
        </SafeAreaView>
    )
}

export default Header