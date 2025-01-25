import React from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as Tooltip from '@radix-ui/react-tooltip';
import { ZoomIn, ZoomOut, Maximize2, Layers, Info } from 'lucide-react';

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomToExtent: () => void;
  onBaseMapChange: (style: string) => void;
  onShowLegend: () => void;
}

export function MapControls({
  onZoomIn,
  onZoomOut,
  onZoomToExtent,
  onBaseMapChange,
  onShowLegend,
}: MapControlsProps) {
  return (
    <div className="absolute top-4 right-4 flex flex-col gap-4">
      {/* Zoom Controls */}
      <div className="bg-white rounded-lg shadow-md">
        <ToggleGroup.Root
          type="single"
          className="flex flex-col divide-y divide-gray-200"
        >
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <ToggleGroup.Item
                  value="zoom-in"
                  onClick={onZoomIn}
                  className="p-2 hover:bg-gray-50 rounded-t-lg transition-colors"
                >
                  <ZoomIn className="h-5 w-5 text-gray-600" />
                </ToggleGroup.Item>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  className="bg-gray-900 text-white text-xs px-2 py-1 rounded"
                  sideOffset={5}
                >
                  Perbesar
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>

            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <ToggleGroup.Item
                  value="zoom-out"
                  onClick={onZoomOut}
                  className="p-2 hover:bg-gray-50 transition-colors"
                >
                  <ZoomOut className="h-5 w-5 text-gray-600" />
                </ToggleGroup.Item>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  className="bg-gray-900 text-white text-xs px-2 py-1 rounded"
                  sideOffset={5}
                >
                  Perkecil
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>

            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <ToggleGroup.Item
                  value="zoom-extent"
                  onClick={onZoomToExtent}
                  className="p-2 hover:bg-gray-50 rounded-b-lg transition-colors"
                >
                  <Maximize2 className="h-5 w-5 text-gray-600" />
                </ToggleGroup.Item>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  className="bg-gray-900 text-white text-xs px-2 py-1 rounded"
                  sideOffset={5}
                >
                  Tampilkan Seluruh Indonesia
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        </ToggleGroup.Root>
      </div>

      {/* Map Style Controls */}
      <div className="bg-white rounded-lg shadow-md">
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                onClick={() => onBaseMapChange('default')}
                className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Layers className="h-5 w-5 text-gray-600" />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="bg-gray-900 text-white text-xs px-2 py-1 rounded"
                sideOffset={5}
              >
                Ganti Peta Dasar
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>

      {/* Legend Toggle */}
      <div className="bg-white rounded-lg shadow-md">
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                onClick={onShowLegend}
                className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Info className="h-5 w-5 text-gray-600" />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="bg-gray-900 text-white text-xs px-2 py-1 rounded"
                sideOffset={5}
              >
                Tampilkan Legenda
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>
    </div>
  );
}