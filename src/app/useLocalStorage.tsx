import { useState, useEffect } from 'react';

// Custom hook for using localStorage with a default value
function useLocalStorage(key:any, defaultValue:any) {
  const isLocalStorageAvailable = typeof window !== 'undefined' && window.localStorage;

  // Obtener el valor inicial de localStorage o usar el valor por defecto
  const storedValue = isLocalStorageAvailable ? localStorage.getItem(key) : null;
  const initial = storedValue !== null ? JSON.parse(storedValue) : defaultValue;

  // Crear estado y función para actualizar el estado
  const [value, setValue] = useState(initial);

  // Efecto para actualizar localStorage cuando el estado cambia
  useEffect(() => {
    if (isLocalStorageAvailable) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value, isLocalStorageAvailable]);

  return [value, setValue];
}

export default useLocalStorage;
