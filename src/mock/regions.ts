import { TRegionListResponse } from '../types/api';

// Mock regions data
export const mockRegionList: TRegionListResponse[] = [
  {
    id: "astana",
    name: "Astana",
    region_type: "city",
    description: "Capital city of Kazakhstan"
  },
  {
    id: "almaty",
    name: "Almaty",
    region_type: "city",
    description: "Largest city in Kazakhstan"
  },
  {
    id: "shymkent",
    name: "Shymkent",
    region_type: "city",
    description: "Third largest city in Kazakhstan"
  },
  {
    id: "aqtobe",
    name: "Aqtöbe",
    region_type: "region",
    description: "Aqtöbe Region"
  },
  {
    id: "almaty_region",
    name: "Almaty Region",
    region_type: "region",
    description: "Almaty Region"
  }
];
