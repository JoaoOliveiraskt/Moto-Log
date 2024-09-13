import {z} from 'zod';

const createStoreSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(100, "Nome deve ter no máximo 100 caracteres"),
  description: z.string().optional(),
  storeImage: z.instanceof(FileList)
  .transform(list => list.item(0))
  .refine(file => file!.size < 5 * 1024 * 1024, 'O arquivo deve ter no máximo 5MB')
});

export default createStoreSchema;