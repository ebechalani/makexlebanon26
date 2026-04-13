export type CompetitionCategory = {
  id: string;
  name: string;
  ageGroup: string;
  fullName: string;
  tableCount: number;
};

export const competitionCategories: CompetitionCategory[] = [
  { id: "CAT1", name: "Sportswonderland", ageGroup: "4-5 years old", fullName: "Sportswonderland (4-5 years old)", tableCount: 5 },
  { id: "CAT2", name: "Sportswonderland", ageGroup: "6-7 years old", fullName: "Sportswonderland (6-7 years old)", tableCount: 5 },
  { id: "CAT3", name: "Capelli Soccer", ageGroup: "Open", fullName: "Capelli Soccer", tableCount: 3 },
  { id: "CAT4", name: "Capelli Inspire", ageGroup: "8-9 years old", fullName: "Capelli Inspire (8-9 years old)", tableCount: 5 },
  { id: "CAT5", name: "Capelli Inspire", ageGroup: "10-12 years old", fullName: "Capelli Inspire (10-12 years old)", tableCount: 5 },
  { id: "CAT6", name: "Capelli Starter", ageGroup: "13-15 years old", fullName: "Capelli Starter (13-15 years old)", tableCount: 5 },
  { id: "CAT7", name: "MakeX Inspire", ageGroup: "8-12 years old", fullName: "MakeX Inspire (8-12 years old)", tableCount: 5 },
  { id: "CAT8", name: "MakeX Starter", ageGroup: "11-13 years old", fullName: "MakeX Starter (11-13 years old)", tableCount: 1 },
];

export type CompetitionTable = {
  id: string;
  label: string;
  shortLabel: string;
  categoryId: string;
  category: string;
};

export function buildTables(categories: CompetitionCategory[]): CompetitionTable[] {
  return categories.flatMap((category) =>
    Array.from({ length: category.tableCount }, (_, index) => ({
      id: `${category.id}-T${index + 1}`,
      label: `${category.fullName} • Table ${index + 1}`,
      shortLabel: `Table ${index + 1}`,
      categoryId: category.id,
      category: category.fullName,
    }))
  );
}

export function getTablesForCategory(categoryId: string, categories: CompetitionCategory[] = competitionCategories) {
  return buildTables(categories).filter((table) => table.categoryId === categoryId);
}
