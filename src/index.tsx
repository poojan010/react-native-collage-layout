import React, { useEffect, useState } from 'react'

import RenderOneImage from './layouts/RenderOneImage';
import RenderTwoImages from './layouts/RenderTwoImages';
import RenderThreeImages from './layouts/RenderThreeImages';

import { Loader } from './components'

import { defaultMinHeight, defaultMaxHeight, defaultSpacing, getImageSizes } from './utils';

type ImageObj = {
    uri: string,
    aspectRatio: number
}

interface Props {
    images: ImageObj[],
    spacing?: number,
    layoutMaxHeight?: number,
    layoutMinHeight?: number,
    onTapImage?: (index: number) => void,
}

const CollageLayout: React.FC<Props> = ({
    images = [],
    spacing = defaultSpacing,
    layoutMinHeight = defaultMinHeight,
    layoutMaxHeight = defaultMaxHeight,
    onTapImage = (index: number) => { },
}) => {

    const isImagesFormatCorrect = images.findIndex((item) => !("aspectRatio" in item)) === -1

    const [isLoading, setIsLoading] = useState(!isImagesFormatCorrect)

    const [photos, setPhotos] = useState(images)

    const setAspectRatios = (aspectRatios: any[]) => {
        setPhotos((prevPhotos) => {
            return prevPhotos.map((item, index) => {
                return { ...item, aspectRatio: aspectRatios[index] }
            })
        })
    }


    const onPressImage = (index: number) => {
        if (typeof onTapImage !== "undefined") {
            onTapImage(index)
        }
    }


    useEffect(() => {
        if (isImagesFormatCorrect === false) {
            const imagePromises = getImageSizes(images)

            Promise
                .all(imagePromises)
                .then(aspectRatios => setAspectRatios(aspectRatios))
                .catch((error) => {
                    if (__DEV__) console.log("Get Image Size Error", error)
                })
                .finally(() => setIsLoading(false))
        }
    }, [])


    if (isImagesFormatCorrect === false && isLoading) {
        return <Loader />
    }

    const renderImages = () => {
        switch (images.length) {
            case 0:
                return null

            case 1:
                return (
                    <RenderOneImage
                        images={photos}
                        onTapImage={onPressImage}
                        layoutMinHeight={layoutMinHeight}
                        layoutMaxHeight={layoutMaxHeight}
                    />
                )

            case 2:
                return (
                    <RenderTwoImages
                        images={photos}
                        spacing={spacing}
                        onTapImage={onPressImage}
                        layoutMinHeight={layoutMinHeight}
                        layoutMaxHeight={layoutMaxHeight}
                    />
                )

            case 3:
                return (
                    <RenderThreeImages
                        images={photos}
                        spacing={spacing}
                        onTapImage={onPressImage}
                        layoutMinHeight={layoutMinHeight}
                        layoutMaxHeight={layoutMaxHeight}
                    />
                )

            default:
                return (
                    <RenderThreeImages
                        images={photos}
                        spacing={spacing}
                        onTapImage={onPressImage}
                        layoutMinHeight={layoutMinHeight}
                        layoutMaxHeight={layoutMaxHeight}
                    />
                )
        }
    }

    return (
        <>
            {renderImages()}
        </>
    )

}


export default CollageLayout

