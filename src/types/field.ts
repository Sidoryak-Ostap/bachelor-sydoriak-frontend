import type { FieldReportResponse } from '@/services/field-report';

export type CreateFieldPayload = {
  name: string;
  address: string;
  owner: string;
  area: number;
  cropType: string;
  soilType: string;
  seedingDate?: Date | null;
  boundary: {
    type: 'Polygon';
    coordinates: number[][][];
  };
};

export type Field = {
  id: string;
  userId: string;
  createdAt: string;
  previewUrl: string;
  interpretation: FieldReportResponse | null;
} & CreateFieldPayload;
