export type CreateFieldActivityPayload = {
  fieldId: string;
  description: string;
  date: Date;
};

export type FieldActivity = {
  id: string;
  userId: string;
  createdAt: string;
} & CreateFieldActivityPayload;
