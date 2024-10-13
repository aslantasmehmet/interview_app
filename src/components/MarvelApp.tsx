import React, { useContext, useState, useEffect } from "react";
import { MarvelContext } from "../context/MarvelContext";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { CircularProgress, TextField, Button, Stack } from "@mui/material";

const MarvelApp: React.FC = () => {
  const { characters, fetchCharacters, loading } = useContext(MarvelContext);
  const [query, setQuery] = useState("");
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0, // Sayfa index'i 0'dan başlar
    pageSize: 10, // Sayfa başına kaç karakter gösterileceğini belirler
  });

  // Sayfa ve arama terimi değiştikçe karakter verilerini çek
  useEffect(() => {
    fetchCharacters(query, paginationModel.page + 1, paginationModel.pageSize); // API sayfaları 1 tabanlı
  }, [query, paginationModel]);

  const handleSearch = () => {
    setPaginationModel({ ...paginationModel, page: 0 }); // Arama yapıldığında sayfayı sıfırla
    fetchCharacters(query, 1, paginationModel.pageSize); // İlk sayfa sonuçları
  };

  return (
    <div style={{ padding: "20px" }}>
      <Stack spacing={2} direction="row" alignItems="center" justifyContent="space-between">
        <TextField
          label="Karakter Ara"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Ara
        </Button>
      </Stack>

      {loading ? (
        <CircularProgress />
      ) : (
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={characters} 
            columns={[{ field: "name", headerName: "Karakter İsmi", width: 150 }]} 
            getRowId={(row) => row.id} // Her karakter için id kullanılıyor
            paginationModel={paginationModel} // paginationModel kullanılıyor
            onPaginationModelChange={(newModel) => setPaginationModel(newModel)} // Sayfa veya sayfa boyutu değiştiğinde tetiklenir
            paginationMode="server" // Server-side pagination
            // rowCount={20} // Toplam karakter sayısı
          />
        </div>
      )}
    </div>
  );
};

export default MarvelApp;
