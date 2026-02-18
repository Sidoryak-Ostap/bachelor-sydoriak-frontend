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

export type FieldResponse = {
  _id: string;
  userId: string;
  createdAt: string;
} & CreateFieldPayload;
