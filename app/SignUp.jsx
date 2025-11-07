import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { auth, db } from '../config/firebaseConfig'
import { userDetailContext } from '@/context/userDetailContext'

const SignUp = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { width, height } = useWindowDimensions();
    const {userDetail,setUserDetail}=useContext(userDetailContext);
    const createAccount = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (res) => {
                const user = res.user;
                console.log(user);
                //save user to db
                await saveUser(user);

            }).catch((error) => {
                console.log(error.message);

            })

    }
    const saveUser = async (user) => {
        const userData= {
            name: fullName,
            email: email,
            member: false,
            uid: user?.uid,
        }
        await setDoc(doc(db, "users", user.uid),userData);
        setUserDetail(userData);
        //navigate to new screen
    }
    return (
        <SafeAreaView style={styles.container}>
            <Image source={require("../assets/images/logo.png")} style={{ width: width * 0.4, height: height * 0.17, borderRadius: 20 }} />
            <Text style={[styles.text, { fontSize: width * 0.08 }]}>Create New Account</Text>
            <View style={{ width: width * 0.9 }}>
                <TextInput onChangeText={(text) => setFullName(text)} style={[styles.input, { fontSize: width * 0.04, height: height * 0.06 }]} placeholder='Full Name' />
                <TextInput onChangeText={(text) => setEmail(text)} style={[styles.input, { fontSize: width * 0.04, height: height * 0.06 }]} placeholder='Email' />
                <TextInput onChangeText={(text) => setPassword(text)} style={[styles.input, { fontSize: width * 0.04, height: height * 0.06 }]} placeholder='Password' secureTextEntry={true} />
                <TouchableOpacity onPress={createAccount} activeOpacity={0.8} style={styles.button}>
                    <Text style={{ textAlign: "center", color: "white", fontSize: width * 0.04 }}>Create Account</Text>
                </TouchableOpacity></View>
            <View style={{ flexDirection: "row", gap: "6", alignItems: "center" }}>
                <Text style={{ fontSize: width * 0.04 }}>Already have an Account?</Text>
                <Link style={{ fontSize: width * 0.04, color: "blue" }} href="/Login">Login</Link>
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

export default SignUp