import { auth, db } from '@/config/firebaseConfig'
import { userDetailContext } from '@/context/userDetailContext'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
const Login = () => {
    const { width, height } = useWindowDimensions();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const { userDetail, setUserDetail } = useContext(userDetailContext);
    const [loading, setLoading] = useState(false);
    const signInAccount = () => {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                console.log(user);
                await getUserDetail(user.uid);
                setLoading(false);
                router.replace("/(tabs)/home");
            })
            .catch((error) => {
                console.log(error.message);
                setLoading(false);
                ToastAndroid.show("Incorrect email or password", ToastAndroid.BOTTOM)
            });
    }
    const getUserDetail = async (uid) => {
        const result = await getDoc(doc(db, 'users', uid));
        console.log(result.data());
        setUserDetail(result.data());
    }
    return (
        <SafeAreaView style={styles.container}>
            <Image source={require("../assets/images/logo.png")} style={{ width: width * 0.4, height: height * 0.17, borderRadius: 20 }} />
            <Text style={[styles.text, { fontSize: width * 0.08 }]}>WELCOME BACK</Text>
            <View style={{ width: width * 0.9 }}>
                <TextInput style={[styles.input, { fontSize: width * 0.04, height: height * 0.06 }]} placeholder='Email' onChangeText={(value) => setEmail(value)} />
                <TextInput style={[styles.input, { fontSize: width * 0.04, height: height * 0.06 }]} placeholder='Password' onChangeText={(value) => setPassword(value)} />
                <TouchableOpacity disabled={loading} activeOpacity={0.8} style={styles.button}>
                    {!loading ?
                        <Text style={{ textAlign: "center", color: "white", fontSize: width * 0.04 }} onPress={signInAccount}>Login</Text> : <ActivityIndicator size={'large'} color={"white"}/>}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1, padding: 20, justifyContent: "flex-start", alignItems: "center", gap: 20, margin: 10,
    },
    text: {
        fontWeight: "bold",
    },
    input: {
        borderColor: "gray",
        borderWidth: 1,
        padding: 10,
        margin: 12,
        borderRadius: 10,
    },
    button: {
        backgroundColor: "#196cbf",
        padding: 16,
        margin: 10,
        borderRadius: 10,
    }
})

export default Login