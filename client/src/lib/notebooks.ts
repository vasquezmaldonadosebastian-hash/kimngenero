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
    title: "Notebook 01",
    summary:
      "NotebookLM insertado desde el enlace proporcionado por el usuario. Título por definir cuando se comparta el contenido editorial final.",
    longSummary:
      "NotebookLM insertado desde el enlace proporcionado por el usuario. Título por definir cuando se comparta el contenido editorial final. Por ahora se mantiene como parte del catálogo mínimo del módulo para validar navegación, detalle y salida externa.",
    status: "Publicado",
    featured: true,
    tags: ["pendiente de título", "catálogo mínimo", "NotebookLM"],
    imageUrl:
      "https://www.genia.udec.cl/media/original_images/placeholder-facultades-by-genIA.webp",
    imageAlt: "Notebook 01",
    notebookUrl:
      "https://notebooklm.google.com/notebook/1085ecc7-e2da-4388-b798-2725936d717f",
  },
  {
    id: "notebook-02",
    title: "Notebook 02",
    summary:
      "NotebookLM insertado desde el enlace proporcionado por el usuario. Título por definir cuando se comparta el contenido editorial final.",
    longSummary:
      "NotebookLM insertado desde el enlace proporcionado por el usuario. Título por definir cuando se comparta el contenido editorial final. Por ahora se mantiene como parte del catálogo mínimo del módulo para validar navegación, detalle y salida externa.",
    status: "Publicado",
    featured: false,
    tags: ["pendiente de título", "catálogo mínimo", "NotebookLM"],
    imageUrl:
      "https://www.genia.udec.cl/media/original_images/placeholder-mediacion-by-genIA.webp",
    imageAlt: "Notebook 02",
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
