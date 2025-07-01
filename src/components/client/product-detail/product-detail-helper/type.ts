import type { IAttributeValue } from "@/type/attribute";

export type AttributeGroups = {
  [attributeName: string]: Map<number, IAttributeValue>;
};
