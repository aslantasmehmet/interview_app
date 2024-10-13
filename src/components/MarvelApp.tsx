import React, { useContext, useState, useEffect } from "react";
import { MarvelContext } from "../context/MarvelContext";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { CircularProgress, TextField, Button, Stack, Typography } from "@mui/material";
// @ts-ignore
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const MarvelApp: React.FC = () => {
  const { characters, series, fetchCharacters, fetchSeries, totalCharacters, loading } = useContext(MarvelContext); // totalCharacters ekleniyor
  const [query, setQuery] = useState("");
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  useEffect(() => {
    fetchCharacters(query, paginationModel.page + 1, paginationModel.pageSize);
    fetchSeries();
  }, [query, paginationModel]);

  const handleSearch = () => {
    setPaginationModel({ ...paginationModel, page: 0 });
    fetchCharacters(query, 1, paginationModel.pageSize);
  };

  // Grafik için veriler
  const chartData = [
    { name: "Characters", count: characters.length },
    { name: "Series", count: series.length },
  ];

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

      {/* Veri İstatistikleri */}
      <Typography variant="h6" style={{ marginTop: "20px" }}>
        {totalCharacters} Karakter Bulundu | {series.length} Dizi Bulundu
      </Typography>

      {/* Grafiksel Gösterim */}
      <ResponsiveContainer width="100%" height={300} style={{ marginTop: "20px" }}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      {loading ? (
        <CircularProgress />
      ) : (
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={characters}
            columns={[{ field: "name", headerName: "Karakter İsmi", width: 150 }]}
            getRowId={(row) => row.id}
            paginationModel={paginationModel}
            onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
            paginationMode="server"
            rowCount={totalCharacters} // Toplam karakter sayısını DataGrid'e bildir
            pageSizeOptions={[10, 20, 50]} // Sayfa başına gösterilecek seçenekler
          />
        </div>
      )}
    </div>
  );
};

export default MarvelApp;
