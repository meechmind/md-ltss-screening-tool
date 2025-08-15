// Unit Test: Utility function to convert a display string to a tel: link
import { describe, it, expect } from 'vitest';
import { toTelHref } from '../phone.js';

describe('toTelHref', () => {
  it('handles plain numbers', () => {
    expect(toTelHref('Call 410-555-1234')).toBe('tel:+14105551234');
  });
  it('handles MAP-LINK format using last number', () => {
    expect(toTelHref('1-844-MAP-LINK (1-844-627-5465)')).toBe('tel:+18446275465');
  });
  it('handles already formatted +1', () => {
    expect(toTelHref('+1 (202) 555-0199')).toBe('tel:+12025550199');
  });
});