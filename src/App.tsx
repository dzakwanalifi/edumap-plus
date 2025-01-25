import React, { useState, useRef, useEffect } from 'react';
import { Map, Marker } from 'pigeon-maps';
import { Sidebar } from './components/Sidebar';
import { MapControls } from './components/MapControls';
import { ChatWindow } from './components/ChatWindow';
import { School, Star, BookOpen, Monitor, Bath, Wifi } from 'lucide-react';
import { sampleSchools, SchoolData } from './data/sampleSchools';
import * as Tooltip from '@radix-ui/react-tooltip';

// Custom map style yang mirip dengan BHUMI
const getBhumiTile = (x: number, y: number, z: number, dpr?: number) => {
  return `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
};

// Tooltip content component
const SchoolTooltip = ({ school }: { school: SchoolData }) => (
  <div className="rounded-lg bg-white shadow-lg border border-gray-200 p-3 w-72">
    {/* Informasi Utama */}
    <div className="space-y-2">
      <div>
        <h4 className="font-semibold text-gray-900">{school.name}</h4>
        <div className="flex items-center gap-1.5 text-sm text-gray-600 mt-1">
          <School className="h-3.5 w-3.5" />
          <span>Jenjang: {school.jenjang}</span>
        </div>
      </div>
      
      <div className="grid gap-1.5 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Status:</span>
          <span className="font-medium">{school.status}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Kondisi Bangunan:</span>
          <span className={`font-medium ${
            school.kondisi === 'Baik' ? 'text-green-600' :
            school.kondisi === 'Rusak Ringan' ? 'text-yellow-600' :
            'text-red-600'
          }`}>{school.kondisi}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-2"></div>

      {/* Informasi Tambahan */}
      <div className="grid gap-1.5 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Akreditasi:</span>
          <span className="font-medium text-blue-600">{school.akreditasi}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Skor Kelayakan:</span>
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
            <span className="font-medium">{school.skorKelayakan}/100</span>
          </div>
        </div>
      </div>

      {/* Rekomendasi jika ada */}
      {school.rekomendasi && (
        <div className="text-sm mt-1">
          <span className="text-gray-600">Rekomendasi: </span>
          <span className="text-gray-900">{school.rekomendasi}</span>
        </div>
      )}

      {/* Mini Fasilitas Icons */}
      <div className="flex gap-2 mt-1">
        <BookOpen className={`h-4 w-4 ${school.fasilitas.perpustakaan ? 'text-green-500' : 'text-gray-300'}`} />
        <Monitor className={`h-4 w-4 ${school.fasilitas.labKomputer ? 'text-green-500' : 'text-gray-300'}`} />
        <Bath className={`h-4 w-4 ${school.fasilitas.toiletLayak ? 'text-green-500' : 'text-gray-300'}`} />
        <Wifi className={`h-4 w-4 ${school.fasilitas.aksesInternet ? 'text-green-500' : 'text-gray-300'}`} />
      </div>
    </div>
  </div>
);

function App() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [coordinates, setCoordinates] = useState<[number, number]>([-6.5971, 106.8060]); // Center of Bogor
  const [zoom, setZoom] = useState(14);
  const [scale, setScale] = useState(50000);
  const [showLegend, setShowLegend] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<SchoolData | null>(null);

  const [mapSize, setMapSize] = useState({
    width: window.innerWidth - 320,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setMapSize({
        width: window.innerWidth - 320,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleBoundsChange = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
    setCoordinates(center);
    setZoom(zoom);
    setScale(Math.round(zoom * 5000));
  };

  const handleFilterChange = (filterType: string, value: any) => {
    console.log(`Filter ${filterType} changed to:`, value);
    // Implementasi filter akan ditambahkan nanti
  };

  const SchoolPopup = ({ school }: { school: SchoolData }) => (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      <div className="p-4 space-y-3">
        {/* Header */}
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-900">{school.name}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <School className="h-4 w-4" />
            <span>Jenjang: {school.jenjang}</span>
          </div>
        </div>

        {/* Main Info */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Kondisi Bangunan:</span>
            <span className={`font-medium ${
              school.kondisi === 'Baik' ? 'text-green-600' :
              school.kondisi === 'Rusak Ringan' ? 'text-yellow-600' :
              'text-red-600'
            }`}>{school.kondisi}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Akreditasi:</span>
            <span className="font-medium text-blue-600">{school.akreditasi}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Skor Kelayakan:</span>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="font-medium">{school.skorKelayakan}/100</span>
            </div>
          </div>
        </div>

        {/* Fasilitas */}
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-700">Fasilitas:</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 text-sm">
              <BookOpen className={`h-4 w-4 ${school.fasilitas.perpustakaan ? 'text-green-500' : 'text-gray-300'}`} />
              <span className={school.fasilitas.perpustakaan ? 'text-gray-700' : 'text-gray-400'}>Perpustakaan</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Monitor className={`h-4 w-4 ${school.fasilitas.labKomputer ? 'text-green-500' : 'text-gray-300'}`} />
              <span className={school.fasilitas.labKomputer ? 'text-gray-700' : 'text-gray-400'}>Lab Komputer</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Bath className={`h-4 w-4 ${school.fasilitas.toiletLayak ? 'text-green-500' : 'text-gray-300'}`} />
              <span className={school.fasilitas.toiletLayak ? 'text-gray-700' : 'text-gray-400'}>Toilet Layak</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Wifi className={`h-4 w-4 ${school.fasilitas.aksesInternet ? 'text-green-500' : 'text-gray-300'}`} />
              <span className={school.fasilitas.aksesInternet ? 'text-gray-700' : 'text-gray-400'}>Akses Internet</span>
            </div>
          </div>
        </div>

        {/* Rekomendasi */}
        <div className="text-sm">
          <span className="font-medium text-gray-700">Rekomendasi: </span>
          <span className="text-gray-600">{school.rekomendasi}</span>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setSelectedSchool(null)}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen">
      <Tooltip.Provider delayDuration={200}>
        <Sidebar
          coordinates={coordinates}
          scale={scale}
          onFilterChange={handleFilterChange}
        />

        <div 
          className="flex-1 relative w-full" 
          ref={mapRef} 
          style={{ 
            height: '100vh',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Map
            provider={getBhumiTile}
            dprs={[1, 2]}
            center={coordinates}
            zoom={zoom}
            onBoundsChanged={handleBoundsChange}
            metaWheelZoom={true}
            metaWheelZoomWarning="Gunakan ctrl + scroll untuk zoom"
            animate={true}
            width={mapSize.width}
            height={mapSize.height}
          >
            {/* School Markers with permanent mini popups */}
            {sampleSchools.map(school => (
              <Marker 
                key={school.id}
                width={50}
                anchor={school.coordinates}
              >
                <div className="relative">
                  <div className={`p-2 rounded-full ${
                    selectedSchool?.id === school.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-blue-500'
                  } shadow-lg border-2 border-blue-500 hover:scale-110 transition-transform duration-200`}>
                    <School className="h-5 w-5" />
                  </div>
                  {/* Mini Popup */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 p-2 text-xs">
                    <div className="font-medium text-gray-900 truncate">{school.name}</div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-gray-600">{school.jenjang} {school.status}</span>
                      <span className={`font-medium ${
                        school.kondisi === 'Baik' ? 'text-green-600' :
                        school.kondisi === 'Rusak Ringan' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>{school.kondisi}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-gray-600">{school.skorKelayakan}/100</span>
                    </div>
                  </div>
                </div>
              </Marker>
            ))}

            {/* School Popup */}
            {selectedSchool && <SchoolPopup school={selectedSchool} />}
          </Map>

          <MapControls
            onZoomIn={() => setZoom(z => Math.min(z + 1, 18))}
            onZoomOut={() => setZoom(z => Math.max(z - 1, 1))}
            onZoomToExtent={() => {
              setCoordinates([-6.5971, 106.8060]); // Center of Bogor
              setZoom(12);
            }}
            onBaseMapChange={() => {}}
            onShowLegend={() => setShowLegend(!showLegend)}
          />

          <ChatWindow />
        </div>
      </Tooltip.Provider>
    </div>
  );
}

export default App;