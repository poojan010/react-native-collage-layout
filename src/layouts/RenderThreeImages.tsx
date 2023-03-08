import React from 'react'
import { ImageStyle, View, ViewStyle } from 'react-native';

import { HSpacing, Image, VSpacing } from '../components';
import { normalizeHeight, normalizeHorHeight, SS_HEIGHT } from '../utils';

import styles from '../styles';

import { WINDOW } from '../utils';

const { width: WIDTH } = WINDOW


interface Props {
    images: any[],
    onTapImage: any,
    spacing: number,
    layoutMaxHeight?: number,
    layoutMinHeight?: number,
}


interface ThreeImageCaseProps {
    images: any[],
    onTapImage: any,
    spacing: number,
    remainCount?: number,
    layoutMaxHeight?: number,
    layoutMinHeight?: number,
    isMoreThanThreeImages?: boolean,
}

const RenderThreeImages: React.FC<Props> = (props) => {
    const { images, onTapImage, spacing, layoutMinHeight, layoutMaxHeight } = props

    const aspectRatio0 = images[0].aspectRatio
    const aspectRatio1 = images[1].aspectRatio
    const aspectRatio2 = images[2].aspectRatio

    const orientationCases = `${aspectRatio0 > 1 ? "H" : "V"}${aspectRatio1 > 1 ? "H" : "V"}${aspectRatio2 > 1 ? "H" : "V"}`;

    const isMoreThanThreeImages = Array.isArray(images) && images.length > 3
    const remainCount = Array.isArray(images) ? Math.min(images.length - 3, 99) : undefined

    const imageCasesProps = {
        images,
        onTapImage,
        spacing,
        remainCount,
        layoutMinHeight,
        layoutMaxHeight,
        isMoreThanThreeImages,
    }

    switch (orientationCases) {
        case "VVV":
            return <RenderThreeImagesCase0 {...imageCasesProps} />
        case "VVH":
            return <RenderThreeImagesCase1 {...imageCasesProps} />
        case "VHH":
            return <RenderThreeImagesCase2 {...imageCasesProps} />
        case "VHV":
            return <RenderThreeImagesCase3 {...imageCasesProps} />
        case "HVH":
            return <RenderThreeImagesCase4 {...imageCasesProps} />
        case "HVV":
            return <RenderThreeImagesCase5 {...imageCasesProps} />
        case "HHV":
            return <RenderThreeImagesCase6 {...imageCasesProps} />
        case "HHH":
            return <RenderThreeImagesCase7 {...imageCasesProps} />
        default:
            return null;
    }

}



// VVV
const RenderThreeImagesCase0: React.FC<ThreeImageCaseProps> = (props) => {

    const { images, isMoreThanThreeImages, remainCount, onTapImage, spacing, layoutMinHeight, layoutMaxHeight } = props


    const actualHeight1 = WIDTH / images[0].aspectRatio;
    const actualHeight2 = WIDTH / images[1].aspectRatio;
    const actualHeight3 = WIDTH / images[2].aspectRatio;

    const isAllImages_ssHeight = actualHeight1 >= SS_HEIGHT && actualHeight2 >= SS_HEIGHT && actualHeight3 >= SS_HEIGHT

    if (isAllImages_ssHeight) {

        let finalHeight = Math.min(actualHeight1 / 3, Math.min(actualHeight2 / 3, actualHeight3 / 3));
        finalHeight = normalizeHeight(finalHeight, layoutMaxHeight, layoutMinHeight)

        const imageStyle: ImageStyle = {
            flex: 1,
            width: "100%",
            height: finalHeight,
        }

        const viewStyle: ViewStyle = {
            ...styles.flexRow,
            height: finalHeight
        }

        return (
            <View style={viewStyle}>

                <Image
                    image={images[0]}
                    style={imageStyle}
                    onPress={onTapImage.bind(this, 0)}
                />

                <VSpacing spacing={spacing} />

                <Image
                    image={images[1]}
                    style={imageStyle}
                    onPress={onTapImage.bind(this, 1)}
                />

                <VSpacing spacing={spacing} />

                <Image
                    image={images[2]}
                    style={imageStyle}
                    remainCount={remainCount}
                    markAsBlur={isMoreThanThreeImages}
                    onPress={onTapImage.bind(this, 2)}
                />

            </View>
        )
    }

    let div = actualHeight1 >= SS_HEIGHT ? 2 : 1.5

    let finalHeight = Math.min(actualHeight1 / div, Math.min(actualHeight2 / 2, actualHeight3 / 2) * 2)
    finalHeight = normalizeHeight(finalHeight)

    let newH1 = finalHeight;
    let newH2 = finalHeight / 2;

    const imageStyle1: ImageStyle = {
        width: "100%",
        height: newH1 + spacing,
    }
    const imageStyle2: ImageStyle = {
        width: "100%",
        height: newH2,
    }

    const viewStyle: ViewStyle = {
        ...styles.flexRow,
        height: newH1 + spacing,
    }

    return (
        <View style={viewStyle}>
            <View style={styles.flexOne}>
                <Image
                    image={images[0]}
                    style={imageStyle1}
                    onPress={onTapImage.bind(this, 0)}
                />
            </View>
            <VSpacing spacing={spacing} />
            <View style={styles.flexOne}>
                <Image
                    image={images[1]}
                    style={imageStyle2}
                    onPress={onTapImage.bind(this, 1)}
                />
                <HSpacing spacing={spacing} />
                <Image
                    image={images[2]}
                    style={imageStyle2}
                    remainCount={remainCount}
                    markAsBlur={isMoreThanThreeImages}
                    onPress={onTapImage.bind(this, 2)}
                />
            </View>
        </View>
    )
}



//VVH
const RenderThreeImagesCase1: React.FC<ThreeImageCaseProps> = (props) => {

    const { images, isMoreThanThreeImages, remainCount, onTapImage, spacing, layoutMinHeight, layoutMaxHeight } = props

    const actualHeight1 = WIDTH / images[0].aspectRatio;
    const actualHeight2 = WIDTH / images[1].aspectRatio;
    const actualHeight3 = WIDTH / images[2].aspectRatio;

    let totalHeight = Math.min(actualHeight1 / 2, actualHeight2 / 2) + actualHeight3
    const finalHeight = normalizeHeight(totalHeight, layoutMaxHeight, layoutMinHeight)

    let newH1 = (Math.min(actualHeight1 / 2, actualHeight2 / 2) * finalHeight) / totalHeight;
    let newH2 = (actualHeight3 * finalHeight) / totalHeight;


    const imageStyle1: ImageStyle = {
        flex: 1,
        width: "100%",
        height: newH1,
    }
    const imageStyle2: ImageStyle = {
        width: "100%",
        height: newH2,
    }

    const viewStyle1: ViewStyle = {
        ...styles.flexRow,
        height: newH1
    }
    const viewStyle2: ViewStyle = {
        height: newH2
    }

    return (
        <View>
            <View style={viewStyle1}>
                <Image
                    image={images[0]}
                    style={imageStyle1}
                    onPress={onTapImage.bind(this, 0)}
                />
                <VSpacing spacing={spacing} />
                <Image
                    image={images[1]}
                    style={imageStyle1}
                    onPress={onTapImage.bind(this, 1)}
                />
            </View>
            <HSpacing spacing={spacing} />
            <View style={viewStyle2}>
                <Image
                    image={images[2]}
                    style={imageStyle2}
                    remainCount={remainCount}
                    markAsBlur={isMoreThanThreeImages}
                    onPress={onTapImage.bind(this, 2)}
                />
            </View>
        </View>
    )
}



//VHH
const RenderThreeImagesCase2: React.FC<ThreeImageCaseProps> = (props) => {

    const { images, isMoreThanThreeImages, remainCount, onTapImage, spacing, layoutMinHeight, layoutMaxHeight } = props

    const actualHeight1 = WIDTH / images[0].aspectRatio;
    const actualHeight2 = normalizeHorHeight(WIDTH / images[1].aspectRatio, layoutMinHeight);
    const actualHeight3 = normalizeHorHeight(WIDTH / images[2].aspectRatio, layoutMinHeight);

    const totalHeight = Math.min(actualHeight1 / 2, Math.min(actualHeight2, actualHeight3) * 2)
    const finalHeight = normalizeHeight(totalHeight, layoutMaxHeight, layoutMinHeight)

    let newH1 = finalHeight;
    let newH2 = finalHeight / 2;

    const imageStyle1: ImageStyle = {
        width: "100%",
        height: newH1 + spacing,
    }
    const imageStyle2: ImageStyle = {
        width: "100%",
        height: newH2,
    }

    const viewStyle1: ViewStyle = {
        ...styles.flexRow,
        height: newH1 + spacing
    }


    return (
        <View style={viewStyle1}>
            <View style={styles.flexOne}>
                <Image
                    image={images[0]}
                    style={imageStyle1}
                    onPress={onTapImage.bind(this, 0)}
                />
            </View>
            <VSpacing spacing={spacing} />
            <View style={styles.flexOne}>
                <Image
                    image={images[1]}
                    style={imageStyle2}
                    onPress={onTapImage.bind(this, 1)}
                />
                <HSpacing spacing={spacing} />
                <Image
                    image={images[2]}
                    style={imageStyle2}
                    remainCount={remainCount}
                    onPress={onTapImage.bind(this, 2)}
                    markAsBlur={isMoreThanThreeImages}
                />
            </View>
        </View>
    )
}



//VHV
const RenderThreeImagesCase3: React.FC<ThreeImageCaseProps> = (props) => {
    const { images, isMoreThanThreeImages, remainCount, onTapImage, spacing, layoutMinHeight, layoutMaxHeight } = props

    const actualHeight1 = WIDTH / images[0].aspectRatio;
    const actualHeight2 = normalizeHorHeight(WIDTH / images[1].aspectRatio, layoutMinHeight);
    const actualHeight3 = WIDTH / images[2].aspectRatio;

    let totalHeight = Math.min(actualHeight1 / 2, actualHeight3 / 2) + actualHeight2
    const finalHeight = normalizeHeight(totalHeight, layoutMaxHeight, layoutMinHeight)

    let newH1 = (Math.min(actualHeight1 / 2, actualHeight3 / 2) * finalHeight) / totalHeight;
    let newH2 = (actualHeight2 * finalHeight) / totalHeight;

    const imageStyle1: ImageStyle = {
        flex: 1,
        width: "100%",
        height: newH1,
    }
    const imageStyle2: ImageStyle = {
        width: "100%",
        height: newH2,
    }

    const viewStyle1: ViewStyle = {
        ...styles.flexRow,
        height: newH1
    }
    const viewStyle2: ViewStyle = {
        height: newH2
    }

    return (
        <View>
            <View style={viewStyle1}>
                <Image
                    image={images[0]}
                    style={imageStyle1}
                    onPress={onTapImage.bind(this, 0)}
                />
                <VSpacing spacing={spacing} />
                <Image
                    image={images[2]}
                    style={imageStyle1}
                    remainCount={remainCount}
                    markAsBlur={isMoreThanThreeImages}
                    onPress={onTapImage.bind(this, 2)}
                />
            </View>
            <HSpacing spacing={spacing} />
            <View style={viewStyle2}>
                <Image
                    image={images[1]}
                    style={imageStyle2}
                    onPress={onTapImage.bind(this, 1)}
                />
            </View>
        </View>
    )
}



// HVH
const RenderThreeImagesCase4: React.FC<ThreeImageCaseProps> = (props) => {

    const { images, isMoreThanThreeImages, remainCount, onTapImage, spacing, layoutMinHeight, layoutMaxHeight } = props

    const actualHeight1 = normalizeHorHeight(WIDTH / images[0].aspectRatio, layoutMinHeight);
    const actualHeight2 = WIDTH / images[1].aspectRatio;
    const actualHeight3 = normalizeHorHeight(WIDTH / images[2].aspectRatio, layoutMinHeight);

    let div = actualHeight2 >= SS_HEIGHT ? 1.3 : 1.5

    const newActHeight23 = Math.min(actualHeight2 / 1, actualHeight3 / div)

    const totalHeight = actualHeight1 + newActHeight23
    const finalHeight = normalizeHeight(totalHeight, layoutMaxHeight, layoutMinHeight)

    let newH1 = (actualHeight1 * finalHeight) / totalHeight
    let newH2 = (newActHeight23 * finalHeight) / totalHeight;

    const imageStyle1: ImageStyle = {
        width: "100%",
        height: newH1,
    }
    const imageStyle2: ImageStyle = {
        flex: 1,
        width: "100%",
        height: newH2,
    }

    const viewStyle1: ViewStyle = {
        height: newH1
    }
    const viewStyle2: ViewStyle = {
        ...styles.flexRow,
        height: newH2 + spacing
    }

    return (
        <View >
            <View style={viewStyle1}>
                <Image
                    image={images[0]}
                    style={imageStyle1}
                    onPress={onTapImage.bind(this, 0)}
                />
            </View>

            <HSpacing spacing={spacing} />

            <View style={viewStyle2}>
                <Image
                    image={images[1]}
                    style={imageStyle2}
                    onPress={onTapImage.bind(this, 1)}
                />
                <VSpacing spacing={spacing} />
                <Image
                    image={images[2]}
                    style={imageStyle2}
                    remainCount={remainCount}
                    markAsBlur={isMoreThanThreeImages}
                    onPress={onTapImage.bind(this, 2)}
                />
            </View>
        </View>
    )
}



// HVV
const RenderThreeImagesCase5: React.FC<ThreeImageCaseProps> = (props) => {

    const { images, isMoreThanThreeImages, remainCount, onTapImage, spacing, layoutMinHeight, layoutMaxHeight } = props

    const actualHeight1 = normalizeHorHeight(WIDTH / images[0].aspectRatio, layoutMinHeight);
    const actualHeight2 = WIDTH / images[1].aspectRatio;
    const actualHeight3 = WIDTH / images[2].aspectRatio;

    const newActHeight23 = Math.min(actualHeight2 / 2, actualHeight3 / 2)

    const totalHeight = actualHeight1 + newActHeight23
    const finalHeight = normalizeHeight(totalHeight, layoutMaxHeight, layoutMinHeight)

    const newH1 = (actualHeight1 * finalHeight) / totalHeight;
    const newH2 = (newActHeight23 * finalHeight) / totalHeight;

    const imageStyle1: ImageStyle = {
        width: "100%",
        height: newH1,
    }
    const imageStyle2: ImageStyle = {
        flex: 1,
        width: "100%",
        height: newH2,
    }

    const viewStyle1: ViewStyle = {
        height: newH1
    }
    const viewStyle2: ViewStyle = {
        ...styles.flexRow,
        height: newH2
    }

    return (
        <View>
            <View style={viewStyle1}>
                <Image
                    image={images[0]}
                    style={imageStyle1}
                    onPress={onTapImage.bind(this, 0)}
                />
            </View>
            <HSpacing spacing={spacing} />
            <View style={viewStyle2}>
                <Image
                    image={images[1]}
                    style={imageStyle2}
                    onPress={onTapImage.bind(this, 1)}
                />
                <VSpacing spacing={spacing} />
                <Image
                    image={images[2]}
                    style={imageStyle2}
                    remainCount={remainCount}
                    markAsBlur={isMoreThanThreeImages}
                    onPress={onTapImage.bind(this, 2)}
                />
            </View>
        </View>
    )
}



// HHV
const RenderThreeImagesCase6: React.FC<ThreeImageCaseProps> = (props) => {

    const { images, isMoreThanThreeImages, remainCount, onTapImage, spacing, layoutMinHeight, layoutMaxHeight } = props

    const actualHeight1 = normalizeHorHeight(WIDTH / images[0].aspectRatio, layoutMinHeight);
    const actualHeight2 = normalizeHorHeight(WIDTH / images[1].aspectRatio, layoutMinHeight);
    const actualHeight3 = WIDTH / images[2].aspectRatio;

    const div = actualHeight3 >= SS_HEIGHT ? 1 : 1.3

    const totalHeight = Math.min(actualHeight3 / 2, Math.min(actualHeight1 / div, actualHeight2 / div) * 2)
    const finalHeight = normalizeHeight(totalHeight, layoutMaxHeight, layoutMinHeight)

    let newH1 = finalHeight / 2;
    let newH2 = finalHeight;

    const imageStyle1: ImageStyle = {
        width: "100%",
        height: newH1,
    }
    const imageStyle2: ImageStyle = {
        flex: 1,
        width: "100%",
        height: newH2 + spacing,
    }

    const viewStyle1: ViewStyle = {
        ...styles.flexOne,
        height: finalHeight + spacing
    }


    return (
        <View style={styles.flexRow}>
            <View style={viewStyle1}>
                <Image
                    image={images[0]}
                    style={imageStyle1}
                    onPress={onTapImage.bind(this, 0)}
                />
                <HSpacing spacing={spacing} />
                <Image
                    image={images[1]}
                    style={imageStyle1}
                    onPress={onTapImage.bind(this, 1)}
                />
            </View>
            <VSpacing spacing={spacing} />
            <Image
                image={images[2]}
                style={imageStyle2}
                remainCount={remainCount}
                markAsBlur={isMoreThanThreeImages}
                onPress={onTapImage.bind(this, 2)}
            />
        </View>
    )
}



// HHH
const RenderThreeImagesCase7: React.FC<ThreeImageCaseProps> = (props) => {

    const { images, isMoreThanThreeImages, remainCount, onTapImage, spacing, layoutMinHeight, layoutMaxHeight } = props

    const actualHeight1 = normalizeHorHeight(WIDTH / images[0].aspectRatio, layoutMinHeight);
    const actualHeight2 = normalizeHorHeight(WIDTH / images[1].aspectRatio, layoutMinHeight);
    const actualHeight3 = normalizeHorHeight(WIDTH / images[2].aspectRatio, layoutMinHeight);

    const newActHeight23 = Math.min(actualHeight2 / 1.5, actualHeight3 / 1.5)

    const totalHeight = actualHeight1 + newActHeight23
    const finalHeight = normalizeHeight(totalHeight, layoutMaxHeight, layoutMinHeight)

    let newH1 = (actualHeight1 * finalHeight) / totalHeight;
    let newH2 = (newActHeight23 * finalHeight) / totalHeight;

    const imageStyle1: ImageStyle = {
        width: "100%",
        height: newH1,
    }
    const imageStyle2: ImageStyle = {
        flex: 1,
        width: "100%",
        height: newH2,
    }

    const viewStyle1: ViewStyle = {
        height: newH1
    }
    const viewStyle2: ViewStyle = {
        ...styles.flexRow,
        height: newH2
    }

    return (
        <View>
            <View style={viewStyle1}>
                <Image
                    image={images[0]}
                    style={imageStyle1}
                    onPress={onTapImage.bind(this, 0)}
                />
            </View>
            <HSpacing spacing={spacing} />
            <View style={viewStyle2}>
                <Image
                    image={images[1]}
                    style={imageStyle2}
                    onPress={onTapImage.bind(this, 1)}
                />
                <VSpacing spacing={spacing} />
                <Image
                    image={images[2]}
                    style={imageStyle2}
                    remainCount={remainCount}
                    markAsBlur={isMoreThanThreeImages}
                    onPress={onTapImage.bind(this, 2)}
                />
            </View>
        </View>
    )
}




export default RenderThreeImages