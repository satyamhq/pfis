import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserCoords {
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
  pincode?: string;
  isManual: boolean;
}

export type LocationPermissionStatus = 'prompt' | 'granted' | 'denied' | 'unavailable';

interface LocationContextType {
  coords: UserCoords;
  permissionStatus: LocationPermissionStatus;
  isLoading: boolean;
  errorMessage: string | null;
  requestCurrentLocation: () => Promise<void>;
  setManualLocation: (loc: Partial<UserCoords>) => void;
}

// Default fallback coordinate (Phagwara / Punjab Regional Medical Hub)
const DEFAULT_COORDS: UserCoords = {
  latitude: 31.2229,
  longitude: 75.7725,
  address: 'GT Road, Phagwara, Punjab',
  city: 'Phagwara',
  pincode: '144401',
  isManual: true,
};

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [coords, setCoords] = useState<UserCoords>(() => {
    const saved = localStorage.getItem('pfis_user_coords');
    return saved ? JSON.parse(saved) : DEFAULT_COORDS;
  });
  const [permissionStatus, setPermissionStatus] = useState<LocationPermissionStatus>('prompt');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Automatically attempt real browser GPS detection on initial load
    if (navigator.geolocation) {
      requestCurrentLocation();
    }
  }, []);

  const requestCurrentLocation = async (): Promise<void> => {
    setIsLoading(true);
    setErrorMessage(null);

    if (!navigator.geolocation) {
      setPermissionStatus('unavailable');
      setErrorMessage('Browser Geolocation is not supported by your browser. Using manual demo coordinates.');
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newCoords: UserCoords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          address: 'GPS Live Location',
          city: 'Local Area',
          isManual: false,
        };
        setCoords(newCoords);
        setPermissionStatus('granted');
        setIsLoading(false);
        localStorage.setItem('pfis_user_coords', JSON.stringify(newCoords));
      },
      (error) => {
        setIsLoading(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setPermissionStatus('denied');
            setErrorMessage('Location permission was denied. You can manually enter your village or pincode below.');
            break;
          case error.POSITION_UNAVAILABLE:
            setPermissionStatus('unavailable');
            setErrorMessage('Location information is currently unavailable. Using regional default coordinates.');
            break;
          case error.TIMEOUT:
            setPermissionStatus('unavailable');
            setErrorMessage('Location request timed out. Please try again or use manual search.');
            break;
          default:
            setPermissionStatus('unavailable');
            setErrorMessage('An unexpected location error occurred.');
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  const setManualLocation = (loc: Partial<UserCoords>) => {
    setCoords((prev) => {
      const updated = {
        ...prev,
        ...loc,
        isManual: true,
      };
      localStorage.setItem('pfis_user_coords', JSON.stringify(updated));
      return updated;
    });
    setErrorMessage(null);
  };

  return (
    <LocationContext.Provider
      value={{
        coords,
        permissionStatus,
        isLoading,
        errorMessage,
        requestCurrentLocation,
        setManualLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
