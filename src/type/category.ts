export interface ICategory {
  id: string;
  name: string;
  parentId?: number | null;
  children?: ICategory[];
  isDeleted?: boolean;
}
