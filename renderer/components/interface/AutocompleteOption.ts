export default interface AutocompleteOption {
  id: number;
  name: string;
  writer: string;
  type: string;
  searchType: "name" | "writer" | "type";
}
