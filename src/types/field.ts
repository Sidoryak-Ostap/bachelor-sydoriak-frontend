export type CreateFieldPayload = {
  name: string;
  address: string;
  owner: string;
  area: number;
  cropType: string;
  soilType: string;
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
} & CreateFieldPayload;
