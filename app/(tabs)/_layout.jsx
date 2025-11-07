import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
const tabLayout = () => {
    return (
        <Tabs screenOptions={{headerShown:false}}>
            <Tabs.Screen name='home' options={{
                tabBarIcon: ({ size, color }) => <Ionicons name="home-outline" size={size} color={color} />,
                tabBarLabel: "Home"
            }} />
            <Tabs.Screen name='explore' options={{
                tabBarIcon: ({ size, color }) => <Ionicons name="search-outline" size={size} color={color} />,
                tabBarLabel: "Explore"
            }} />
            <Tabs.Screen name='progress' options={{
                tabBarIcon: ({ size, color }) => <Ionicons name="analytics" size={size} color={color} />,
                tabBarLabel: "Progress"
            }} />
            <Tabs.Screen name='profile' options={{
                tabBarIcon: ({ size, color }) => <Ionicons name="person-circle-outline" size={size} color={color} />,
                tabBarLabel: "Profile"
            }} />
        </Tabs>
    )
}

export default tabLayout;