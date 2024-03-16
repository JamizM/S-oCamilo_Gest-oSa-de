import {View, Text, StyleSheet, TouchableOpacity} from "react-native";

export default function ModalLogin() {
    return(
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.frase}>Modal Login</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(24,24,24)',
    },
    content:{
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: "85%",
        paddingTop: 24,
        paddingBottom: 24,
        borderRadius: 8,
    },
    frase:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    }
});