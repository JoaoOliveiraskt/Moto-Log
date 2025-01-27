export function createSlug(value: string): string {
  return value
    .toLowerCase() // Transforma em letras minúsculas
    .normalize("NFD") // Normaliza para remover acentos
    .replace(/[\u0300-\u036f]/g, "") // Remove marcas diacríticas (acentos)
    .replace(/[^a-z0-9\s-]/g, "") // Remove caracteres especiais
    .replace(/\s+/g, "-") // Substitui espaços por hífens
    .replace(/-+/g, "-") // Remove hífens duplicados
    .replace(/^-|-$/g, ""); // Remove hífens no início ou no final
}
