import React from 'react';
import { ImageStyle } from 'react-native';

import { Image } from '../components';
import { normalizeHeight } from '../utils';

import { WINDOW } from '../utils';
const { width: WIDTH } = WINDOW


interface Props {
    images: any[],
    onTapImage: any,
    layoutMaxHeight?: number,
    layoutMinHeight?: number,
}

const RenderOneImage: React.FC<Props> = (props) => {

    const { images, onTapImage, layoutMaxHeight, layoutMinHeight } = props

    const imageHeight = normalizeHeight(WIDTH / images[0].aspectRatio, layoutMaxHeight, layoutMinHeight)

    const imageStyle: ImageStyle = {
        width: "100%",
        height: imageHeight,
    }

    return (
        <Image
            image={images[0]}
            style={imageStyle}
            onPress={onTapImage.bind(this, 0)}
        />
    )

}


export default RenderOneImage