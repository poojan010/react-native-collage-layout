import React from 'react'
import { ImageStyle, View, ViewStyle } from 'react-native';

import { normalizeHeight } from '../utils';
import { HSpacing, Image, VSpacing } from '../components';

import { WINDOW } from '../utils';


const { width: WIDTH } = WINDOW


interface Props {
    images: any[],
    onTapImage: any,
    spacing?: number,
    layoutMaxHeight?: number,
    layoutMinHeight?: number,
}

const RenderTwoImages: React.FC<Props> = (props) => {

    const { images, onTapImage, layoutMaxHeight, layoutMinHeight, spacing } = props

    const aspectRatio0 = images[0].aspectRatio
    const aspectRatio1 = images[1].aspectRatio

    const isCase_HH = aspectRatio0 > 1 && aspectRatio1 > 1
    const isCase_VV = aspectRatio0 < 1 && aspectRatio1 < 1

    const div = isCase_VV ? 1.8 : 1;

    const actHeight1 = (WIDTH / div) / aspectRatio0;
    const actHeight2 = (WIDTH / div) / aspectRatio1;

    let h1 = normalizeHeight(Math.min(actHeight1, actHeight2), layoutMaxHeight, layoutMinHeight)
    let h2 = normalizeHeight(Math.min(actHeight1, actHeight2), layoutMaxHeight, layoutMinHeight)
    let totalHeight = Math.min(h1, h2);

    if (isCase_HH) {
        totalHeight = normalizeHeight(actHeight1 + actHeight2, layoutMaxHeight, layoutMinHeight);
        h1 = (actHeight1 * totalHeight) / (actHeight1 + actHeight2);
        h2 = (actHeight2 * totalHeight) / (actHeight1 + actHeight2);
    }

    const viewStyle: ViewStyle = {
        flexDirection: (isCase_HH) ? "column" : "row",
        height: totalHeight
    }

    const imageStyle1: ImageStyle = {
        height: h1,
        width: "100%",
        flex: (isCase_HH) ? undefined : 1,
    }

    const imageStyle2: ImageStyle = {
        height: h2,
        width: "100%",
        flex: (isCase_HH) ? undefined : 1,
    }


    return (
        <View style={viewStyle}>
            <Image
                image={images[0]}
                style={imageStyle1}
                onPress={onTapImage.bind(this, 0)}
            />

            {isCase_HH
                ? <HSpacing spacing={spacing} />
                : <VSpacing spacing={spacing} />
            }

            <Image
                image={images[1]}
                style={imageStyle2}
                onPress={onTapImage.bind(this, 1)}
            />
        </View>
    )
}

export default RenderTwoImages