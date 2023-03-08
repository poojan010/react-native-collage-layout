import { Dimensions, Image } from "react-native";


export const WINDOW = Dimensions.get('window');


export const defaultSpacing = 1.5
export const defaultMinHeight = WINDOW.height * 0.23
export const defaultMaxHeight = WINDOW.height * 0.7



export const SS_HEIGHT = WINDOW.height * 0.88


export const normalizeHeight = (heightVal: number, maxHeight = defaultMaxHeight, minHeight = defaultMinHeight) => {
    return Math.max(Math.min(maxHeight, heightVal), minHeight)
}

export const normalizeHorHeight = (heightVal: number, minHeight = defaultMinHeight) => {
    return Math.max(heightVal, minHeight);
}


export const getImageSizes = (images: any[]) => {
    return images.map((img) => {
        return new Promise((resolve, reject) => {
            Image.getSize(
                img.uri,
                (width: number, height: number) => {
                    resolve(width / height)
                },
                () => reject(1))
        })
    })
}