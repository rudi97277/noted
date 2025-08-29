import CryptoJS from "crypto-js";
import { useCallback, useEffect, useState } from "react";

interface EncryptionConfig {
  secretKey?: string;
}

const DEFAULT_CONFIG: Required<EncryptionConfig> = {
  secretKey: "your-default-secret-key",
};

function useEncryptedLocalStorage<T>(
  key: string,
  initialValue: T,
  config: EncryptionConfig = {}
): [T, (value: T | ((prevValue: T) => T)) => void, () => void] {
  const { secretKey } = { ...DEFAULT_CONFIG, ...config };

  const encrypt = useCallback(
    (data: string): string => {
      return CryptoJS.AES.encrypt(data, secretKey).toString();
    },
    [secretKey]
  );

  const decrypt = useCallback(
    (encryptedData: string): string => {
      try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
        return bytes.toString(CryptoJS.enc.Utf8);
      } catch (error) {
        console.error("Decryption failed:", error);
        return "";
      }
    },
    [secretKey]
  );

  const getStoredValue = useCallback((): T => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const decryptedItem = decrypt(item);
        if (decryptedItem) {
          return JSON.parse(decryptedItem);
        }
      }
      return initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, decrypt, initialValue]);

  const [storedValue, setStoredValue] = useState<T>(getStoredValue);

  const setValue = useCallback(
    (value: T | ((prevValue: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        setStoredValue(valueToStore);

        const stringifiedValue = JSON.stringify(valueToStore);
        const encryptedValue = encrypt(stringifiedValue);
        window.localStorage.setItem(key, encryptedValue);

        window.dispatchEvent(new Event("encrypted-localstorage-change"));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, encrypt, storedValue]
  );

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
      window.dispatchEvent(new Event("encrypted-localstorage-change"));
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent | Event) => {
      if (e instanceof StorageEvent && e.key !== key) {
        return;
      }
      setStoredValue(getStoredValue());
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener(
      "encrypted-localstorage-change",
      handleStorageChange
    );

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "encrypted-localstorage-change",
        handleStorageChange
      );
    };
  }, [key, getStoredValue]);

  return [storedValue, setValue, removeValue];
}

export default useEncryptedLocalStorage;
