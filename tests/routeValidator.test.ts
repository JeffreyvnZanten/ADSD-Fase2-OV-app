// routeValidator.test.ts
import { validateRouteRequest } from '../backend/services/routeValidator';
import { ValidationError } from '../backend/services/routeValidator';
import { RouteRequest } from '../backend/types';

describe('validateRouteRequest', () => {
  test('should throw ValidationError when stations are identical', () => {
    const request: RouteRequest = {
      departureStation: 'Amsterdam',
      arrivalStation: 'Amsterdam'
    };

    expect(() => validateRouteRequest(request)).toThrow(ValidationError);
    expect(() => validateRouteRequest(request)).toThrow(
      'Het vertrek- en aankomststation kunnen niet hetzelfde zijn'
    );
  });

  test('should throw ValidationError when departure station is missing', () => {
    const request: RouteRequest = {
      departureStation: '',
      arrivalStation: 'Rotterdam'
    };

    expect(() => validateRouteRequest(request)).toThrow(ValidationError);
    expect(() => validateRouteRequest(request)).toThrow(
      'Selecteer eerst een vertrek- en aankomststation'
    );
  });

  test('should throw ValidationError when arrival station is missing', () => {
    const request: RouteRequest = {
      departureStation: 'Amsterdam',
      arrivalStation: ''
    };

    expect(() => validateRouteRequest(request)).toThrow(ValidationError);
    expect(() => validateRouteRequest(request)).toThrow(
      'Selecteer eerst een vertrek- en aankomststation'
    );
  });

  test('should not throw error for valid stations', () => {
    const request: RouteRequest = {
      departureStation: 'Amsterdam',
      arrivalStation: 'Rotterdam'
    };

    expect(() => validateRouteRequest(request)).not.toThrow();
  });
});