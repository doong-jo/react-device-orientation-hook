import { CSSProperties } from "react";
import { RotateDirection } from "./useDeviceOrientation";

export class DeviceOrientationOptionProcess {
  private orientation: DeviceRotationRate;
  private transformStyle: CSSProperties;

  constructor() { }

  setData(orientation: DeviceRotationRate) {
    this.orientation = orientation;
    this.transformStyle = { transform: '' };

    return this;
  }

  adjustByCorrection(enable: boolean, initialData: DeviceRotationRate) {
    if(!enable) {
      return this;
    }

    this.orientation = {
      alpha: this.orientation.alpha - initialData.alpha,
      beta: this.orientation.beta - initialData.beta,
      gamma: this.orientation.gamma - initialData.gamma,
    };

    this.transformStyle = {
      transform: `rotateX(${this.orientation.beta}deg) rotateY(${this.orientation.gamma}deg) rotateZ(${this.orientation.alpha}deg)`
    }

    return this;
  }

  adjustDirection(transformDirections: [RotateDirection, RotateDirection, RotateDirection]) {
    const [directionX, directionY, directionZ] = transformDirections;
    function getDirectionValue(degree: number, direction: RotateDirection): number {
      if (direction === RotateDirection.NONE) {
        return degree;
      }
  
      return degree * -1;
    }
  
  
    this.transformStyle = {
      transform: `rotateX(${getDirectionValue(this.orientation.beta, directionX)}deg) rotateY(${getDirectionValue(this.orientation.gamma, directionY)}deg) rotateZ(${getDirectionValue(this.orientation.alpha, directionZ)}deg)`
    };

    return this;
  }

  commit() {
    return {
      orientation: this.orientation,
      transformStyle: this.transformStyle
    }
  }
}

export const processDeviceOrientationOption = new DeviceOrientationOptionProcess();