import React, { useState } from 'react';
import * as Select from '@radix-ui/react-select';
import * as Slider from '@radix-ui/react-slider';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Accordion from '@radix-ui/react-accordion';
import * as Tooltip from '@radix-ui/react-tooltip';
import { Search, ChevronDown, Check, Filter, MapPin, School, Building2, Ruler, Star, Construction, Layers, Map, ChevronRight, RotateCcw, X } from 'lucide-react';
import logo from '../assets/logo.png';

interface SidebarProps {
  coordinates: [number, number];
  scale: number;
  onFilterChange: (filterType: string, value: any) => void;
}

const AccordionTrigger = React.forwardRef<HTMLButtonElement, { children: React.ReactNode; className?: string }>(
  ({ children, className = '', ...props }, forwardedRef) => (
    <Accordion.Header className="flex">
      <Accordion.Trigger
        className={`
          group flex flex-1 items-center justify-between 
          py-3 px-4 
          text-sm font-medium
          hover:bg-blue-50/50
          transition-all duration-200
          ${className}
        `}
        {...props}
        ref={forwardedRef}
      >
        {children}
        <ChevronRight className="h-4 w-4 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-90" />
      </Accordion.Trigger>
    </Accordion.Header>
  )
);

const AccordionContent = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className = '', ...props }, forwardedRef) => (
    <Accordion.Content
      className={`data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden ${className}`}
      {...props}
      ref={forwardedRef}
    >
      <div className="py-1.5 space-y-1.5">{children}</div>
    </Accordion.Content>
  )
);

const TooltipWrapper = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Tooltip.Provider>
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        {children}
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          className="bg-gray-800 text-white px-2 py-1 rounded text-xs"
          sideOffset={5}
        >
          {title}
          <Tooltip.Arrow className="fill-gray-800" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  </Tooltip.Provider>
);

// Custom styles for consistent component appearance
const commonButtonStyles = `
  w-full flex items-center justify-between px-3 py-2.5 
  text-sm bg-white hover:bg-gray-50 
  border border-gray-200 rounded-lg 
  transition-all duration-200
  focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400
`;

const commonCheckboxStyles = `
  w-4 h-4 
  border-2 border-gray-300 rounded 
  bg-white hover:border-blue-400 
  transition-colors duration-200
  focus:outline-none focus:ring-2 focus:ring-blue-100
`;

const commonLabelStyles = "text-sm text-gray-600 font-medium";
const commonHeaderStyles = "text-sm font-semibold text-gray-800";

export function Sidebar({ coordinates, scale, onFilterChange }: SidebarProps) {
  const [activeFilters, setActiveFilters] = useState<Record<string, boolean>>({});
  const [searchValue, setSearchValue] = useState('');

  const handleReset = () => {
    setActiveFilters({});
    setSearchValue('');
    // Implement reset logic for all filters
  };
  return (
    <div className="w-80 bg-white border-r border-gray-100 flex flex-col h-full text-sm">
      {/* Header with Logo */}
      <div className="px-4 py-5 border-b border-gray-100 bg-gradient-to-b from-white to-gray-50/80">
        <div className="flex justify-center items-center">
        <img 
          src={logo} 
          alt="EduView Logo" 
            className="h-12 w-auto transform hover:scale-105 transition-transform duration-200" 
        />
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3 border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
        <input
          type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Cari sekolah atau lokasi..."
            className="w-full pl-9 pr-3 py-2.5 text-sm 
              bg-gray-50 hover:bg-white
              border-2 border-gray-200 hover:border-blue-400
              rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 
              transition-all duration-200 
              placeholder-gray-400"
          />
          {searchValue && (
            <button
              onClick={() => setSearchValue('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Accordion Filter Groups */}
      <div className="flex-1 overflow-y-auto">
        <Accordion.Root 
          type="multiple" 
          className="divide-y divide-gray-100"
          defaultValue={['layers']} // Open the first section by default
        >
          {/* Layer Controls */}
          <Accordion.Item value="layers" className="group">
            <AccordionTrigger>
              <span className="flex items-center gap-3">
                <div className="p-1 rounded-lg bg-blue-100/50 text-blue-600">
                  <Layers className="h-4 w-4" />
                </div>
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">Layer</span>
            </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-3 bg-gray-50/50">
              {/* Layer content with updated styles */}
            <div className="space-y-4">
                <div className="space-y-2">
                  <p className={commonHeaderStyles}>Layer Utama</p>
                  {[
                    { id: 'sekolah', label: 'Sekolah Eksisting' },
                    { id: 'rekomendasi_baru', label: 'Rekomendasi Sekolah Baru' },
                    { id: 'rekomendasi_renovasi', label: 'Rekomendasi Renovasi' },
                    { id: 'proyek', label: 'Pemantauan Proyek' },
                  ].map((layer) => (
                    <label key={layer.id} className="flex items-center gap-2.5 group/item cursor-pointer py-0.5">
                      <Checkbox.Root
                        className={commonCheckboxStyles}
                        onCheckedChange={(checked) => onFilterChange('layer', { [layer.id]: checked })}
                      >
                        <Checkbox.Indicator>
                          <Check className="h-3 w-3 text-blue-500" />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                      <span className="text-sm text-gray-600 group-hover/item:text-gray-900 transition-colors duration-200">{layer.label}</span>
                    </label>
                  ))}
                </div>

                {/* Layer Pendukung */}
                <div className="space-y-2">
                  <p className={commonHeaderStyles}>Layer Pendukung</p>
                  <div className="space-y-2">
                    {/* Batas Administrasi */}
                    <div>
                      <label className="flex items-center gap-2.5 py-0.5">
                        <Checkbox.Root
                          className={commonCheckboxStyles}
                          onCheckedChange={(checked) => onFilterChange('layer', { batas_admin: checked })}
                        >
                          <Checkbox.Indicator>
                            <Check className="h-3 w-3 text-blue-500" />
                          </Checkbox.Indicator>
                        </Checkbox.Root>
                        <span className={commonLabelStyles}>Batas Administrasi</span>
                      </label>
                      <div className="ml-6 space-y-1 mt-1">
                        {[
                          { id: 'provinsi', label: 'Provinsi' },
                          { id: 'kabupaten', label: 'Kabupaten/Kota' },
                          { id: 'kecamatan', label: 'Kecamatan' },
                        ].map((layer) => (
                          <label key={layer.id} className="flex items-center gap-2.5 py-0.5">
                            <Checkbox.Root
                              className={commonCheckboxStyles}
                              onCheckedChange={(checked) => onFilterChange('layer', { [layer.id]: checked })}
                            >
                              <Checkbox.Indicator>
                                <Check className="h-3 w-3 text-blue-500" />
                              </Checkbox.Indicator>
                            </Checkbox.Root>
                            <span className={commonLabelStyles}>{layer.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Jaringan Jalan */}
                    <div>
                      <label className="flex items-center gap-2.5 py-0.5">
                        <Checkbox.Root
                          className={commonCheckboxStyles}
                          onCheckedChange={(checked) => onFilterChange('layer', { jalan: checked })}
                        >
                          <Checkbox.Indicator>
                            <Check className="h-3 w-3 text-blue-500" />
                          </Checkbox.Indicator>
                        </Checkbox.Root>
                        <span className={commonLabelStyles}>Jaringan Jalan</span>
                      </label>
                      <div className="ml-6 space-y-1 mt-1">
                        {[
                          { id: 'jalan_utama', label: 'Jalan Utama' },
                          { id: 'jalan_lokal', label: 'Jalan Lokal' },
                        ].map((layer) => (
                          <label key={layer.id} className="flex items-center gap-2.5 py-0.5">
                            <Checkbox.Root
                              className={commonCheckboxStyles}
                              onCheckedChange={(checked) => onFilterChange('layer', { [layer.id]: checked })}
                            >
                              <Checkbox.Indicator>
                                <Check className="h-3 w-3 text-blue-500" />
                              </Checkbox.Indicator>
                            </Checkbox.Root>
                            <span className={commonLabelStyles}>{layer.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </Accordion.Item>

          {/* Karakteristik Sekolah */}
          <Accordion.Item value="school" className="group">
            <AccordionTrigger>
              <span className="flex items-center gap-3">
                <div className="p-1 rounded-lg bg-green-100/50 text-green-600">
                  <School className="h-4 w-4" />
                </div>
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">Karakteristik</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-3 bg-gray-50/50">
              <div className="space-y-2">
                <Select.Root onValueChange={(value) => onFilterChange('jenjang', value)}>
                  <Select.Trigger className={commonButtonStyles}>
                    <Select.Value placeholder="Jenjang Sekolah" />
                    <Select.Icon><ChevronDown className="h-3 w-3 text-gray-400" /></Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="bg-white border border-gray-200 rounded-md shadow-sm animate-in fade-in-0 zoom-in-95">
                      <Select.Viewport className="p-1">
                        {['Semua Jenjang', 'SD', 'SMP', 'SMA', 'SMK'].map((level) => (
                          <Select.Item 
                            key={level} 
                            value={level.toLowerCase()} 
                            className="flex items-center px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-50 rounded cursor-pointer outline-none data-[highlighted]:bg-gray-50"
                          >
                            <Select.ItemText>{level}</Select.ItemText>
                            <Select.ItemIndicator className="ml-auto">
                              <Check className="h-3 w-3 text-blue-500" />
                            </Select.ItemIndicator>
                          </Select.Item>
                        ))}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>

                <Select.Root onValueChange={(value) => onFilterChange('status', value)}>
                  <Select.Trigger className={commonButtonStyles}>
                    <Select.Value placeholder="Status Sekolah" />
                    <Select.Icon><ChevronDown className="h-3 w-3 text-gray-400" /></Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="bg-white border border-gray-200 rounded-md shadow-sm animate-in fade-in-0 zoom-in-95">
                      <Select.Viewport className="p-1">
                        {['Semua Status', 'Negeri', 'Swasta'].map((status) => (
                          <Select.Item 
                            key={status} 
                            value={status.toLowerCase()} 
                            className="flex items-center px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-50 rounded cursor-pointer outline-none data-[highlighted]:bg-gray-50"
                          >
                            <Select.ItemText>{status}</Select.ItemText>
                            <Select.ItemIndicator className="ml-auto">
                              <Check className="h-3 w-3 text-blue-500" />
                          </Select.ItemIndicator>
                        </Select.Item>
                        ))}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>

                <Select.Root onValueChange={(value) => onFilterChange('kondisi', value)}>
                  <Select.Trigger className={commonButtonStyles}>
                    <Select.Value placeholder="Kondisi Bangunan" />
                    <Select.Icon><ChevronDown className="h-3 w-3 text-gray-400" /></Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="bg-white border border-gray-200 rounded-md shadow-sm animate-in fade-in-0 zoom-in-95">
                      <Select.Viewport className="p-1">
                        {['Semua Kondisi', 'Baik', 'Rusak Ringan', 'Rusak Berat'].map((kondisi) => (
                          <Select.Item 
                            key={kondisi} 
                            value={kondisi.toLowerCase()} 
                            className="flex items-center px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-50 rounded cursor-pointer outline-none data-[highlighted]:bg-gray-50"
                          >
                            <Select.ItemText>{kondisi}</Select.ItemText>
                            <Select.ItemIndicator className="ml-auto">
                              <Check className="h-3 w-3 text-blue-500" />
                          </Select.ItemIndicator>
                        </Select.Item>
                        ))}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>

                <div className="space-y-1">
                  <p className={commonHeaderStyles}>Fasilitas Penting</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {['Perpustakaan', 'Lab Komputer', 'Toilet Layak', 'Akses Internet'].map((fasilitas) => (
                      <label key={fasilitas} className="flex items-center gap-1">
                        <Checkbox.Root
                          className={commonCheckboxStyles}
                          onCheckedChange={(checked) => onFilterChange('fasilitas', { [fasilitas]: checked })}
                        >
                          <Checkbox.Indicator>
                            <Check className="h-2.5 w-2.5 text-blue-500" />
                          </Checkbox.Indicator>
                        </Checkbox.Root>
                        <span className={commonLabelStyles}>{fasilitas}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </Accordion.Item>

          {/* Aksesibilitas */}
          <Accordion.Item value="access" className="group">
            <AccordionTrigger>
              <span className="flex items-center gap-3">
                <div className="p-1 rounded-lg bg-orange-100/50 text-orange-600">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">Aksesibilitas</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-3 bg-gray-50/50">
              <div className="space-y-2">
                <Select.Root onValueChange={(value) => onFilterChange('jarak', value)}>
                  <Select.Trigger className={commonButtonStyles}>
                    <Select.Value placeholder="Jarak ke Jalan Utama" />
                    <Select.Icon><ChevronDown className="h-3 w-3 text-gray-400" /></Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="bg-white border border-gray-200 rounded-md shadow-sm animate-in fade-in-0 zoom-in-95">
                      <Select.Viewport className="p-1">
                        {['Semua Jarak', 'Dekat', 'Sedang', 'Jauh'].map((jarak) => (
                          <Select.Item 
                            key={jarak} 
                            value={jarak.toLowerCase()} 
                            className="flex items-center px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-50 rounded cursor-pointer outline-none data-[highlighted]:bg-gray-50"
                          >
                            <Select.ItemText>{jarak}</Select.ItemText>
                            <Select.ItemIndicator className="ml-auto">
                              <Check className="h-3 w-3 text-blue-500" />
                          </Select.ItemIndicator>
                        </Select.Item>
                        ))}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>

                <Select.Root onValueChange={(value) => onFilterChange('kondisiJalan', value)}>
                  <Select.Trigger className={commonButtonStyles}>
                    <Select.Value placeholder="Kondisi Jalan Akses" />
                    <Select.Icon><ChevronDown className="h-3 w-3 text-gray-400" /></Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="bg-white border border-gray-200 rounded-md shadow-sm animate-in fade-in-0 zoom-in-95">
                      <Select.Viewport className="p-1">
                        {['Semua Kondisi', 'Baik', 'Sedang', 'Buruk'].map((kondisi) => (
                          <Select.Item 
                            key={kondisi} 
                            value={kondisi.toLowerCase()} 
                            className="flex items-center px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-50 rounded cursor-pointer outline-none data-[highlighted]:bg-gray-50"
                          >
                            <Select.ItemText>{kondisi}</Select.ItemText>
                            <Select.ItemIndicator className="ml-auto">
                              <Check className="h-3 w-3 text-blue-500" />
                          </Select.ItemIndicator>
                        </Select.Item>
                        ))}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </div>
            </AccordionContent>
          </Accordion.Item>

          {/* Kelayakan & Rekomendasi */}
          <Accordion.Item value="score" className="group">
            <AccordionTrigger>
              <span className="flex items-center gap-3">
                <div className="p-1 rounded-lg bg-purple-100/50 text-purple-600">
                  <Star className="h-4 w-4" />
                </div>
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">Kelayakan</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-3 bg-gray-50/50">
              <div className="space-y-2">
                <div>
                  <p className={commonHeaderStyles}>Skor Kelayakan</p>
                <Slider.Root
                    className="relative flex items-center w-full h-4"
                  defaultValue={[0, 100]}
                  min={0}
                  max={100}
                  step={1}
                    onValueChange={(value) => onFilterChange('skorKelayakan', value)}
                >
                  <Slider.Track className="bg-gray-200 relative grow h-1 rounded-full">
                    <Slider.Range className="absolute bg-blue-500 h-full rounded-full" />
                  </Slider.Track>
                    <Slider.Thumb className="block w-3 h-3 bg-white border border-gray-300 shadow-sm rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <Slider.Thumb className="block w-3 h-3 bg-white border border-gray-300 shadow-sm rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </Slider.Root>
              </div>

                <Select.Root onValueChange={(value) => onFilterChange('jenisRekomendasi', value)}>
                  <Select.Trigger className={commonButtonStyles}>
                    <Select.Value placeholder="Jenis Rekomendasi" />
                    <Select.Icon><ChevronDown className="h-3 w-3 text-gray-400" /></Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="bg-white border border-gray-200 rounded-md shadow-sm animate-in fade-in-0 zoom-in-95">
                      <Select.Viewport className="p-1">
                        {['Semua Rekomendasi', 'Pembangunan Baru', 'Renovasi'].map((rekomendasi) => (
                          <Select.Item 
                            key={rekomendasi} 
                            value={rekomendasi.toLowerCase()} 
                            className="flex items-center px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-50 rounded cursor-pointer outline-none data-[highlighted]:bg-gray-50"
                          >
                            <Select.ItemText>{rekomendasi}</Select.ItemText>
                            <Select.ItemIndicator className="ml-auto">
                              <Check className="h-3 w-3 text-blue-500" />
                          </Select.ItemIndicator>
                        </Select.Item>
                        ))}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>

                <Select.Root onValueChange={(value) => onFilterChange('prioritas', value)}>
                  <Select.Trigger className={commonButtonStyles}>
                    <Select.Value placeholder="Prioritas" />
                    <Select.Icon><ChevronDown className="h-3 w-3 text-gray-400" /></Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="bg-white border border-gray-200 rounded-md shadow-sm animate-in fade-in-0 zoom-in-95">
                      <Select.Viewport className="p-1">
                        {['Semua Prioritas', 'Mendesak', 'Penting', 'Normal'].map((prioritas) => (
                          <Select.Item 
                            key={prioritas} 
                            value={prioritas.toLowerCase()} 
                            className="flex items-center px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-50 rounded cursor-pointer outline-none data-[highlighted]:bg-gray-50"
                          >
                            <Select.ItemText>{prioritas}</Select.ItemText>
                            <Select.ItemIndicator className="ml-auto">
                              <Check className="h-3 w-3 text-blue-500" />
                          </Select.ItemIndicator>
                        </Select.Item>
                        ))}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </div>
            </AccordionContent>
        </Accordion.Item>

          {/* Status Proyek */}
          <Accordion.Item value="project" className="group">
            <AccordionTrigger>
              <span className="flex items-center gap-3">
                <div className="p-1 rounded-lg bg-yellow-100/50 text-yellow-600">
                  <Construction className="h-4 w-4" />
                </div>
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">Status Proyek</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-3 bg-gray-50/50">
              <Select.Root onValueChange={(value) => onFilterChange('statusProyek', value)}>
                <Select.Trigger className={commonButtonStyles}>
                  <Select.Value placeholder="Status Proyek" />
                  <Select.Icon><ChevronDown className="h-3 w-3 text-gray-400" /></Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="bg-white border border-gray-200 rounded-md shadow-sm animate-in fade-in-0 zoom-in-95">
                    <Select.Viewport className="p-1">
                      {['Semua Status', 'Perencanaan', 'Konstruksi', 'Selesai'].map((status) => (
                        <Select.Item 
                          key={status} 
                          value={status.toLowerCase()} 
                          className="flex items-center px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-50 rounded cursor-pointer outline-none data-[highlighted]:bg-gray-50"
                        >
                          <Select.ItemText>{status}</Select.ItemText>
                          <Select.ItemIndicator className="ml-auto">
                            <Check className="h-3 w-3 text-blue-500" />
                          </Select.ItemIndicator>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </AccordionContent>
          </Accordion.Item>
        </Accordion.Root>
            </div>

      {/* Reset and Info Footer */}
      <div className="px-4 py-3 border-t border-gray-100 bg-white sticky bottom-0 z-10">
            <button
          onClick={handleReset}
          className="w-full flex items-center justify-center gap-2 
            py-2.5 mb-3
            text-sm font-medium text-gray-600 
            hover:text-blue-600 hover:bg-blue-50 
            rounded-lg 
            transition-all duration-200
            border-2 border-gray-200 hover:border-blue-200"
        >
          <RotateCcw className="h-4 w-4" />
          Reset Filter
            </button>
        <div className="text-xs text-gray-500 space-y-0.5 px-1">
          <div className="flex items-center gap-2">
            <MapPin className="h-3 w-3" />
          <p>Koordinat: {coordinates[0].toFixed(4)}, {coordinates[1].toFixed(4)}</p>
          </div>
          <div className="flex items-center gap-2">
            <Ruler className="h-3 w-3" />
          <p>Skala: 1:{scale.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}