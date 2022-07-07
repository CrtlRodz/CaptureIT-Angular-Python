import {WebcamImage} from 'ngx-webcam'

export interface IPicture {
    image: WebcamImage;
    timestamp ?: number;
}