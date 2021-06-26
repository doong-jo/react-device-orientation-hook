import { RotateDirection } from './useDeviceOrientation';
import { processDeviceOrientationOption } from './utils';

describe('Test DeviceOrientationOptionProcess', () => {
  it('UNIT :: setData', () => {
    // given
    const orientation = { beta: 1, gamma: 2, alpha: 3 };

    // when
    const result = processDeviceOrientationOption.setData(orientation).commit();

    // then
    expect(result).toEqual({ orientation, transformStyle: { transform: '' }});
  });

  it('UNIT :: adjustByCorrection', () => {
    // given
    const initialOrientation = { beta: 1, gamma: 2, alpha: 3 };
    const orientation = { beta: 2, gamma: 4,  alpha: 6 };
    

    // when
    const result = processDeviceOrientationOption
                    .setData(orientation)
                    .adjustByCorrection(true, initialOrientation)
                    .commit();

    // then
    expect(result).toEqual(
      { 
        orientation: { beta: 1, gamma: 2, alpha: 3 },
        transformStyle: { 
          transform: `rotateX(1deg) rotateY(2deg) rotateZ(3deg)`
        }
      }
    );
  });

  it('UNIT :: adjustDirection', () => {
    // given
    const orientation = { beta: 1, gamma: 2, alpha: 3 };

    // when
    const r1 = processDeviceOrientationOption
                    .setData(orientation)
                    .adjustDirection([RotateDirection.REVERSE, RotateDirection.REVERSE, RotateDirection.REVERSE])
                    .commit();
    const r2 = processDeviceOrientationOption
                    .setData(orientation)
                    .adjustDirection([RotateDirection.NONE, RotateDirection.NONE, RotateDirection.NONE])
                    .commit();
    const r3 = processDeviceOrientationOption
                    .setData(orientation)
                    .adjustDirection([RotateDirection.NONE, RotateDirection.REVERSE, RotateDirection.NONE])
                    .commit();

    // then
    expect(r1).toEqual(
      { 
        orientation: { beta: 1, gamma: 2, alpha: 3 },
        transformStyle: { 
          transform: `rotateX(-1deg) rotateY(-2deg) rotateZ(-3deg)`
        }
      }
    );
    expect(r2).toEqual(
      { 
        orientation: { beta: 1, gamma: 2, alpha: 3 },
        transformStyle: { 
          transform: `rotateX(1deg) rotateY(2deg) rotateZ(3deg)`
        }
      }
    );

    expect(r3).toEqual(
      { 
        orientation: { beta: 1, gamma: 2, alpha: 3 },
        transformStyle: { 
          transform: `rotateX(1deg) rotateY(-2deg) rotateZ(3deg)`
        }
      }
    );
  });
});