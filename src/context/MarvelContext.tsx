// veriyi yönetmek ve pagination, search, filter işlemlerini yapmak için Context API'yi kuruyoruz.
import React, { createContext, useState, ReactNode } from "react";
import axios from "axios";
import CryptoJS from "crypto-js"; // CryptoJS kütüphanesini ekleyin

// MarvelContext oluşturuluyor
const MarvelContext = createContext<any>(null);

interface MarvelProviderProps {
  children: ReactNode; // children tipini belirtmek için
}

// API endpoint'leri ve key
const BASE_URL = 'https://gateway.marvel.com/v1/public';
const API_KEY = process.env.REACT_APP_MARVEL_PUBLIC_KEY; // Env değişkeninden API key alınıyor
const PRIVATE_KEY = process.env.REACT_APP_MARVEL_PRIVATE_KEY; // Env değişkeninden özel anahtarı al

const MarvelProvider: React.FC<MarvelProviderProps> = ({ children }) => {
  const [characters, setCharacters] = useState<any[]>([]);
  const [series, setSeries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Karakter verilerini çekme fonksiyonu
  // Karakter verilerini çekme fonksiyonu (pagination eklendi)
const fetchCharacters = async (query = "", page = 1, pageSize = 10) => {
    setLoading(true);
    const timestamp = Date.now().toString();
    const hash = CryptoJS.MD5(timestamp + PRIVATE_KEY + API_KEY).toString(); // Hash'ı oluştur
  
    const offset = (page - 1) * pageSize; // Hangi sayfadan başlayacağımızı belirlemek için offset hesaplaması
  
    try {
      const response = await axios.get(`${BASE_URL}/characters`, {
        params: { 
          apikey: API_KEY, 
          hash: hash,
          ts: timestamp,
          nameStartsWith: query.length > 0 ? query : undefined, // Arama terimi varsa
          limit: pageSize, // Sayfa başına kaç karakter getirilmesi gerektiğini ayarlıyoruz
          offset: offset // Offset değeri
        }
      });
      setCharacters(response.data.data.results); // API'den gelen karakterler
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
    const hash = CryptoJS.MD5(timestamp + PRIVATE_KEY + API_KEY).toString(); // Hash'ı oluşturuluyor

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
      console.error(err); // Hata durumunu konsola yazdır
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
