export class CreateCardDto {
  title: string;
  order: number;
  listId: string;
  description?: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
}
