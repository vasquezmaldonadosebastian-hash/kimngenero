export interface NotebookItem {
  id: string;
  title: string;
  summary: string;
  longSummary: string;
  status: "Publicado";
  featured: boolean;
  tags: string[];
  imageUrl: string;
  imageAlt: string;
  notebookUrl: string;
}

export const notebooks: NotebookItem[] = [
  {
    id: "notebook-01",
    title: "Recursos sobre Brechas y Estudios de Género en Chile",
    summary:
      "NotebookLM sobre brechas y estudios de género en Chile, disponible para consulta y navegación desde el catálogo.",
    longSummary:
      "NotebookLM sobre brechas y estudios de género en Chile, disponible para consulta y navegación desde el catálogo KimnIA. Por ahora se mantiene como parte del módulo mínimo para validar navegación, detalle y salida externa.",
    status: "Publicado",
    featured: true,
    tags: ["chile", "brechas de género", "estudios de género", "NotebookLM"],
    imageUrl:
      "/assets/kimnia-chile.png",
    imageAlt: "Recursos sobre Brechas y Estudios de Género en Chile",
    notebookUrl:
      "https://notebooklm.google.com/notebook/1085ecc7-e2da-4388-b798-2725936d717f",
  },
  {
    id: "notebook-02",
    title: "Recursos sobre Brechas y Estudios de Género en America Latina",
    summary:
      "NotebookLM sobre brechas y estudios de género en América Latina, disponible para consulta y navegación desde el catálogo.",
    longSummary:
      "NotebookLM sobre brechas y estudios de género en América Latina, disponible para consulta y navegación desde el catálogo KimnIA. Por ahora se mantiene como parte del módulo mínimo para validar navegación, detalle y salida externa.",
    status: "Publicado",
    featured: false,
    tags: ["america latina", "brechas de género", "estudios de género", "NotebookLM"],
    imageUrl:
      "/assets/kimnia-latam.png",
    imageAlt: "Recursos sobre Brechas y Estudios de Género en America Latina",
    notebookUrl:
      "https://notebooklm.google.com/notebook/4f1c131a-77cd-43e5-8fc7-8741f3eb2680",
  },
];

function normalizeText(value: string) {
  return value
    .toLocaleLowerCase("es")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function filterNotebooks(items: NotebookItem[], query = "") {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    return items;
  }

  return items.filter((item) => {
    const searchableValues = [
      item.title,
      item.summary,
      item.longSummary,
      item.tags.join(" "),
    ].join(" ");

    return normalizeText(searchableValues).includes(normalizedQuery);
  });
}

export function getNotebookStats(items: NotebookItem[]) {
  const total = items.length;
  const featured = items.filter((item) => item.featured).length;

  return { total, featured };
}
