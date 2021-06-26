import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { processDeviceOrientationOption } from './utils';

export interface DeviceOrientationHookOptions {
  enableInitialOrientation?: boolean;
  rotateXDirection?: RotateDirection;
  rotateYDirection?: RotateDirection;
  rotateZDirection?: RotateDirection;
}

export enum RotateDirection {
  NONE = 'NONE',
  REVERSE = 'REVERSE',
};

const defaultDeviceOrientation = {
  gamma: 0,
  beta: 0,
  alpha: 0,
}

const defaultDeviceOrientationHookOptions: DeviceOrientationHookOptions = {
  enableInitialOrientation: true,
  rotateXDirection: RotateDirection.NONE,
  rotateYDirection: RotateDirection.REVERSE,
  rotateZDirection: RotateDirection.REVERSE,
}

/**
 * 
 * @param options DeviceOrientationHookOptions
 * 
 * enableInitialOrientation (default: true): Adjust the orientation based on when the component is first mounted.
 * 
 * rotateXDirection (default: NONE): X Correct the direction of the coordinates.
 * 
 * rotateYDirection (default: REVERSE): Y Correct the direction of the coordinates.
 * 
 * rotateZDirection (default: REVERSE): Z Correct the direction of the coordinates.
 * 
 * @returns
 * 
 * orientation: Pivot Orientation 
 * 
 * originOrientation: The actual orientation of the device
 * 
 * transformStyle: Rotation Conversion Style
 * 
 * resetPivotOrientation: Pivot Orientation Initialization trigger
 */
export default function useDeviceOrientation(options?: DeviceOrientationHookOptions) {
  const [originOrientation, setOriginOrientation] = useState<DeviceRotationRate>(defaultDeviceOrientation);
  const [orientation, setOrientation] = useState<DeviceRotationRate>(defaultDeviceOrientation);
  const [transformStyle, setTransformStyle] = useState<CSSProperties>();
  const initialOrientation = useRef<DeviceRotationRate | null>(null);

  const mergedOptions = { ...defaultDeviceOrientationHookOptions, ...options };  

  const dispatch = useCallback(({ orientation, transformStyle }: { orientation: DeviceRotationRate, transformStyle: CSSProperties }) => {
    setOrientation(orientation);
    setTransformStyle(transformStyle);
  }, []);

  const deviceOrientationListener = useCallback((data: DeviceMotionEventRotationRate) => {
    setOriginOrientation(data);

    if (initialOrientation.current === null) {
      initialOrientation.current = data;
    }
    
    dispatch(
      processDeviceOrientationOption
        .setData(data)
        .adjustByCorrection(mergedOptions.enableInitialOrientation, initialOrientation.current)
        .adjustDirection([mergedOptions.rotateXDirection, mergedOptions.rotateYDirection, mergedOptions.rotateZDirection])
        .commit()
    );
  }, []);

  const resetPivotOrientation = useCallback(() => {
    initialOrientation.current = null;
  }, []);

  useEffect(() => {
    if (window.DeviceMotionEvent) {
      window.addEventListener('deviceorientation', deviceOrientationListener);

      return () => {
        window.removeEventListener('deviceorientation', deviceOrientationListener);
      }
    }
  }, []); 

  return {
    orientation,
    originOrientation,
    transformStyle,
    resetPivotOrientation
  };
}