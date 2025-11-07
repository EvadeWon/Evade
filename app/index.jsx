import { auth, db } from '@/config/firebaseConfig';
import { userDetailContext } from '@/context/userDetailContext';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const index = () => {
  const { userDetail, setUserDetail } = useContext(userDetailContext);
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const result = await getDoc(doc(db, "users", user.uid));
      setUserDetail(result.data())
      router.replace("/(tabs)/home")
    }
  });
  const { width, height } = useWindowDimensions();
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../assets/images/landing_page.png")} style={{ width: width * 0.7, height: height * 0.3 }}></Image>
      <View style={[styles.footer, { width: width, height: height * 0.4, padding: width * 0.12 }]}>
        <View>
          <Text style={[styles.title, { fontSize: width * 0.09, textAlign: "center" }]}>Welcome to Evade</Text>
          <Text style={[styles.para, { fontSize: width * 0.04, textAlign: "center" }]}>Create. Learn. Grow. Effortlessly with Evade.Smart Courses, Made by AI, Just for You.</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          style={{
            backgroundColor: '#bbc4be',
            padding: 15,
            borderRadius: 10,
            alignItems: 'center',
          }}
          onPress={() => router.navigate("/SignUp")}
        >
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: width * 0.04 }}>GET STARTED</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.navigate("/Login")}
          activeOpacity={0.8}
          style={{
            borderColor: "gray",
            borderWidth: 1,
            padding: 15,
            borderRadius: 10,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: width * 0.04 }}>Already have an account?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10
  },
  footer: {
    justifyContent: "space-evenly",
    gap: 20,
    backgroundColor: "#1e6091",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  title: {
    fontWeight: "bold",
    color: "white",
  },
  para: {
    fontWeight: "semibold",
    color: "white",
  },
})