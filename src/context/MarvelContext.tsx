// veriyi yönetmek ve pagination, search, filter işlemlerini yapmak için Context API'yi kuruyoruz.
import React, { createContext, useState, ReactNode } from "react";
import axios from "axios";

// MarvelContext oluşturuluyor
const MarvelContext = createContext<any>(null);

interface MarvelProviderProps {
  children: ReactNode; // children tipini belirtmek için
}

// API endpoint'leri ve key
const BASE_URL = 'https://gateway.marvel.com/v1/public';
const API_KEY = process.env.REACT_APP_MARVEL_PUBLIC_KEY; // Env değişkeninden API key alınıyor

const MarvelProvider: React.FC<MarvelProviderProps> = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  // Karakter verilerini çekme fonksiyonu
  const fetchCharacters = async (query = "") => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/characters`, {
        params: { apikey: API_KEY, nameStartsWith: query } // API key env üzerinden alınıyor
      });
      setCharacters(response.data.data.results);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Dizi verilerini çekme fonksiyonu
  const fetchSeries = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/series`, {
        params: { apikey: API_KEY }
      });
      setSeries(response.data.data.results);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Context sağlayıcı ile veriler ve fonksiyonlar dışa aktarılıyor
  return (
    <MarvelContext.Provider value={{ characters, series, fetchCharacters, fetchSeries, loading, error }}>
      {children}
    </MarvelContext.Provider>
  );
};

export { MarvelContext, MarvelProvider };

