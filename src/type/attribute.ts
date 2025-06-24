export interface IAttribute {
  id: number;
  name: string;
}

export interface IAttributeValue {
  id: number;
  value: string;
  attribte: IAttribute;
}
