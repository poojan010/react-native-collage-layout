import React from 'react';
import { Text, TouchableOpacity, View, Image as ImageComponent, ViewStyle, ActivityIndicator } from 'react-native';

// import * as Progress from 'react-native-progress';
// import { createImageProgress } from 'react-native-image-progress';
import { defaultSpacing } from './utils';


import styles from './styles';



export const VSpacing = ({ spacing = defaultSpacing }) => {
    const viewStyle: ViewStyle = { ...styles.vSpacing, width: spacing }
    return <View style={viewStyle} />
}

export const HSpacing = ({ spacing = defaultSpacing }) => {
    const viewStyle: ViewStyle = { ...styles.hSpacing, height: spacing }
    return <View style={viewStyle} />
}


/** Properties for Image Loading Functionality */
// const indicatorPropsStyle = {
//     size: 40,
//     borderWidth: 0,
//     color: Colors.tabIconActive,
//     unfilledColor: 'rgba(200, 200, 200, 0.2)',
// }


interface ImageCompProps {
    style: any,
    image: any,
    onPress?: any,
    markAsBlur?: boolean,
    remainCount?: number,
}
export const Image: React.FC<ImageCompProps> = (props) => {

    const { style, image, onPress, markAsBlur, remainCount } = props

    const imageSourse = { uri: image?.uri, priority: 'high' }

    const onImagePress = typeof onPress === 'undefined' ? () => { } : onPress

    const remainingCount = "+" + remainCount

    return (
        <TouchableOpacity style={styles.flexOne} activeOpacity={1} onPress={onImagePress}>
            <ImageComponent
                style={style}
                source={imageSourse}
            // indicator={Progress.Circle}
            // indicatorProps={indicatorPropsStyle}
            />
            {markAsBlur && typeof remainCount === "number"
                ? (
                    <View style={styles.blurBgImage}>
                        <Text style={styles.remainCount}>
                            {remainingCount}
                        </Text>
                    </View>
                )
                : null
            }
        </TouchableOpacity>
    )
}


export const Loader = () => {
    return (
        <View style={styles.loader}>
            <ActivityIndicator
                size={"large"}
            />
        </View>
    )
}