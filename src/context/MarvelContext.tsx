// veriyi yönetmek ve pagination, search, filter işlemlerini yapmak için Context API'yi kuruyoruz.
import React, { createContext, useState, ReactNode } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";

// MarvelContext oluşturuluyor
const MarvelContext = createContext<any>(null);

interface MarvelProviderProps {
  children: ReactNode;
}

// API endpoint'leri ve key
const BASE_URL = 'https://gateway.marvel.com/v1/public';
const API_KEY = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
const PRIVATE_KEY = process.env.REACT_APP_MARVEL_PRIVATE_KEY;

const MarvelProvider: React.FC<MarvelProviderProps> = ({ children }) => {
  const [characters, setCharacters] = useState<any[]>([]);
  const [series, setSeries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCharacters, setTotalCharacters] = useState(0); // Toplam karakter sayısı için state ekliyoruz

  // Karakter verilerini çekme fonksiyonu (pagination ile)
  const fetchCharacters = async (query = "", page = 1, pageSize = 10) => {
    setLoading(true);
    const timestamp = Date.now().toString();
    const hash = CryptoJS.MD5(timestamp + PRIVATE_KEY + API_KEY).toString();

    const offset = (page - 1) * pageSize;

    try {
      const response = await axios.get(`${BASE_URL}/characters`, {
        params: {
          apikey: API_KEY,
          hash: hash,
          ts: timestamp,
          nameStartsWith: query.length > 0 ? query : undefined,
          limit: pageSize,
          offset: offset
        }
      });
      setCharacters(response.data.data.results);
      setTotalCharacters(response.data.data.total); // Toplam karakter sayısını güncelle
    } catch (err) {
      setError((err as Error).message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Dizi verilerini çekme fonksiyonu
  const fetchSeries = async () => {
    setLoading(true);
    const timestamp = Date.now().toString();
    const hash = CryptoJS.MD5(timestamp + PRIVATE_KEY + API_KEY).toString();

    try {
      const response = await axios.get(`${BASE_URL}/series`, {
        params: {
          apikey: API_KEY,
          hash: hash,
          ts: timestamp
        }
      });
      setSeries(response.data.data.results);
    } catch (err) {
      setError((err as Error).message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Context sağlayıcı ile veriler ve fonksiyonlar dışa aktarılıyor
  return (
    <MarvelContext.Provider value={{ characters, series, fetchCharacters, fetchSeries, totalCharacters, loading, error }}>
      {children}
    </MarvelContext.Provider>
  );
};

export { MarvelContext, MarvelProvider };
