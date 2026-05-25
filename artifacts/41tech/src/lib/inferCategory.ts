export function inferCategory(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("dashboard") || t.includes("bi") || t.includes("dados")) return "BI & Dados";
  if (t.includes("automação") || t.includes("integração") || t.includes("n8n")) return "Automação";
  return "Sistema Web";
}
