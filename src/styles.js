import { StyleSheet } from "react-native";

import Colors from "./colors";


const spacing = (3)

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: "row"
    },
    vSpacing: {
        width: spacing
    },
    hSpacing: {
        height: spacing
    },
    flexOne: {
        flex: 1
    },
    blurBgImage: {
        flex: 1,
        top: (0),
        bottom: (0),
        left: (0),
        right: (0),
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    remainCount: {
        color: Colors.white,
        fontWeight: "500",
        fontSize: 18,
    },
    textStyle: {
        color: Colors.grey,
        fontSize: 14,
    },
    subTextStyle: {
        color: Colors.white,
        fontSize: 18,
    },
    loader: {
        height: 200,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    }
})

export default styles