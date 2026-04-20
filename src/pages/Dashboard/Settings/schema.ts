import * as yup from 'yup';

export const settingsSchema = yup.object({
  language: yup.string().required('Please select a language'),
  timezone: yup.string().required('Please select a timezone'),
  autoAreaCalculation: yup.boolean().default(false),
  emailUpdates: yup.boolean().default(false),
  weeklySummary: yup.boolean().default(false),
  marketingNews: yup.boolean().default(false),
});

export type SettingsFormValues = yup.InferType<typeof settingsSchema>;
