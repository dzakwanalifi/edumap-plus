import { School, Star, BookOpen, Monitor, Bath, Wifi } from 'lucide-react';

export interface SchoolData {
  id: number;
  name: string;
  coordinates: [number, number];
  jenjang: "SD" | "SMP" | "SMA" | "SMK";
  status: "Negeri" | "Swasta";
  kondisi: "Baik" | "Rusak Ringan" | "Rusak Berat";
  akreditasi: "A" | "B" | "C" | "Belum";
  skorKelayakan: number;
  rekomendasi: string;
  fasilitas: {
    perpustakaan: boolean;
    labKomputer: boolean;
    toiletLayak: boolean;
    aksesInternet: boolean;
  };
}

export const sampleSchools: SchoolData[] = [
  {
    id: 1,
    name: "SD Negeri 01 Bogor",
    coordinates: [-6.5971, 106.8060], // Bogor
    jenjang: "SD",
    status: "Negeri",
    kondisi: "Baik",
    akreditasi: "A",
    skorKelayakan: 85,
    rekomendasi: "Tidak Ada Rekomendasi Mendesak",
    fasilitas: {
      perpustakaan: true,
      labKomputer: true,
      toiletLayak: true,
      aksesInternet: true
    }
  },
  {
    id: 2,
    name: "SMP Negeri 1 Bogor",
    coordinates: [-6.6012, 106.7962], // Bogor
    jenjang: "SMP",
    status: "Negeri",
    kondisi: "Rusak Ringan",
    akreditasi: "A",
    skorKelayakan: 75,
    rekomendasi: "Perbaikan Ringan pada Atap dan Dinding",
    fasilitas: {
      perpustakaan: true,
      labKomputer: true,
      toiletLayak: true,
      aksesInternet: false
    }
  },
  {
    id: 3,
    name: "SMA Swasta Bina Bangsa",
    coordinates: [-6.5890, 106.7930], // Bogor
    jenjang: "SMA",
    status: "Swasta",
    kondisi: "Baik",
    akreditasi: "B",
    skorKelayakan: 70,
    rekomendasi: "Peningkatan Fasilitas Laboratorium",
    fasilitas: {
      perpustakaan: true,
      labKomputer: false,
      toiletLayak: true,
      aksesInternet: true
    }
  },
  {
    id: 4,
    name: "SMK Negeri 2 Bogor",
    coordinates: [-6.6100, 106.8020], // Bogor
    jenjang: "SMK",
    status: "Negeri",
    kondisi: "Rusak Berat",
    akreditasi: "A",
    skorKelayakan: 45,
    rekomendasi: "Renovasi Menyeluruh Gedung Utama",
    fasilitas: {
      perpustakaan: true,
      labKomputer: true,
      toiletLayak: false,
      aksesInternet: true
    }
  },
  {
    id: 5,
    name: "SD Islam Al-Hidayah",
    coordinates: [-6.5850, 106.8100], // Bogor
    jenjang: "SD",
    status: "Swasta",
    kondisi: "Baik",
    akreditasi: "B",
    skorKelayakan: 80,
    rekomendasi: "Penambahan Fasilitas Lab Komputer",
    fasilitas: {
      perpustakaan: true,
      labKomputer: false,
      toiletLayak: true,
      aksesInternet: true
    }
  }
]; 