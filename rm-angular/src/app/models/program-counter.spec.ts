import { ProgramCounter } from './program-counter';

describe('ProgramCounter', () => {
  it('should start at 0', () => {
    const pc = new ProgramCounter();
    expect(pc.current).toBe(0);
  });

  it('should increment correctly', () => {
    const pc = new ProgramCounter();
    pc.increment();
    expect(pc.current).toBe(1);
    pc.increment();
    expect(pc.current).toBe(2);
  });

  it('should reset to 0', () => {
    const pc = new ProgramCounter();
    pc.increment();
    pc.increment();
    pc.reset();
    expect(pc.current).toBe(0);
  });

  it('should notify subscribers on step', () => {
    const pc = new ProgramCounter();
    let notifiedValue = -1;
    pc.onStep((currentCount) => {
      notifiedValue = currentCount;
    });
    pc.increment(); // current should be 1
    expect(notifiedValue).toBe(1);
  });
});
