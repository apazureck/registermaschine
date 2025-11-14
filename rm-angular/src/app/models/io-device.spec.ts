import { IoDevice } from './io-device';

describe('IoDevice', () => {
  it('should notify on value change', () => {
    const ioDevice = new IoDevice();
    let notifiedValue: number | undefined = undefined;
    ioDevice.onChange((newValue: number) => {
      notifiedValue = newValue;
    });
    ioDevice.value = 55;
    expect(notifiedValue!).toBe(55);
  });

  it('should handle multiple callbacks', () => {
    const ioDevice = new IoDevice();
    let notifiedValue1: number | undefined = undefined;
    let notifiedValue2: number | undefined = undefined;

    ioDevice.onChange((newValue: number) => {
      notifiedValue1 = newValue;
    });
    ioDevice.onChange((newValue: number) => {
      notifiedValue2 = newValue;
    });

    ioDevice.value = 77;

    expect(notifiedValue1!).toBe(77);
    expect(notifiedValue2!).toBe(77);
  });

  it('should not fail if a callback throws an error', () => {
    const ioDevice = new IoDevice();
    let notifiedValue: number | undefined = undefined;
    ioDevice.onChange((newValue: number) => {
      throw new Error('Test error');
    });
    ioDevice.onChange((newValue: number) => {
      notifiedValue = newValue;
    });
    ioDevice.value = 88;
    expect(notifiedValue!).toBe(88);
  });
});
