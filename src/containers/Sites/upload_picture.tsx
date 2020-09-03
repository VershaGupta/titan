import React, { Component } from "react";
import ReactCrop from "react-image-crop";

import "react-image-crop/dist/ReactCrop.css";

interface PicUploadNoCropProps {
  getImage: (args) => void;
}
interface PicUploadNoCropState {
  photoUrl: string;
  src: any;
  crop: any;
  croppedImageUrl: any;
  profile_pic: string;
  croppedImage: any;
}
class PicUploadNoCrop extends Component<
  PicUploadNoCropProps,
  PicUploadNoCropState
> {
  constructor(props: PicUploadNoCropProps) {
    super(props);
    this.state = {
      croppedImage: "",
      photoUrl: "",
      profile_pic: "",
      src: null,
      crop: {
        unit: "%",
        width: 30,
        aspect: 16 / 9,
      },
      croppedImageUrl: null,
    };
  }
  imageRef = "";
  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropChange = crop => {
    this.setState({ crop });
  };

  onCropComplete = crop => {
    if (this.imageRef && crop.width && crop.height) {
      this.getCroppedImg(this.imageRef, crop);
    }
  };
  dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    let croppedImage = new File([u8arr], filename, { type: mime });

    this.setState({ croppedImage: croppedImage });
  }
  handleFile = e => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ src: fileReader.result });
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  getCroppedImg(image, crop) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = Math.ceil(crop.width * scaleX);
    canvas.height = Math.ceil(crop.height * scaleY);
    const ctx = canvas.getContext("2d");
    if (ctx)
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY
      );

    const reader = new FileReader();
    canvas.toBlob(
      blob => {
        if (blob) {
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            //  console.log(reader.result);
            this.props.getImage({ image: reader.result });
            this.setState({ croppedImageUrl: reader.result });

            this.dataURLtoFile(reader.result, "cropped.jpg");
          };
        }
      },
      "image/jpeg",
      0.95
    );
  }
  render() {
    const { crop, profile_pic, src, croppedImage } = this.state;
    const preview = this.state.photoUrl ? (
      <img src={this.state.photoUrl} alt="preview" />
    ) : null;

    return (
      <React.Fragment>
        <label htmlFor="profile_pic"></label>
        <input
          type="file"
          id="profile_pic"
          value={profile_pic}
          onChange={this.handleFile}
        />
        {src && (
          <ReactCrop
            src={src}
            crop={crop}
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
        )}
        {/* {croppedImage &&  <img src={URL.createObjectURL(croppedImage)} /> } */}
      </React.Fragment>
    );
  }
}

export default PicUploadNoCrop;
