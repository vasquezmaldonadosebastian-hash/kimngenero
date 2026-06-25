import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const outputDir = path.join(repoRoot, "outputs");
const outputPath = path.join(outputDir, "Carta_Gantt_Tecnica_Plataforma_Indicadores.xlsx");
const previewDir = path.join(outputDir, "previews_carta_gantt");

const projectStart = new Date("2026-05-04T00:00:00");
const msPerDay = 24 * 60 * 60 * 1000;

const tasks = [
  {
    id: "T01",
    phase: "Definicion y Datos",
    activity: "Kickoff tecnico y alcance funcional",
    description: "Alinear objetivos, alcance, roles y entregables del proyecto.",
    predecessor: "-",
    duration: 3,
  },
  {
    id: "T02",
    phase: "Definicion y Datos",
    activity: "Identificacion de fuentes de origen",
    description: "Mapear bases de datos, archivos maestros y responsables de cada fuente.",
    predecessor: "T01",
    duration: 5,
  },
  {
    id: "T03",
    phase: "Definicion y Datos",
    activity: "Definicion de logica de calculo",
    description: "Definir reglas de negocio, formulas y criterios de validacion de indicadores.",
    predecessor: "T01",
    duration: 8,
  },
  {
    id: "T04",
    phase: "Definicion y Datos",
    activity: "Modelo de datos base para plataforma",
    description: "Diseñar la estructura minima de datos para soportar el sitio y sus vistas.",
    predecessor: "T02, T03",
    duration: 5,
  },
  {
    id: "T05",
    phase: "Definicion y Datos",
    activity: "Estructuracion de ETL preliminar",
    description: "Preparar limpieza, transformacion y carga inicial de datos para desarrollo.",
    predecessor: "T02, T03",
    duration: 8,
  },
  {
    id: "T06",
    phase: "Definicion y Datos",
    activity: "Datasets mock / staging para desarrollo",
    description: "Generar datos de prueba para avanzar sin depender de la carga final.",
    predecessor: "T04",
    duration: 4,
  },
  {
    id: "T07",
    phase: "Desarrollo del Sitio",
    activity: "Configuracion de entorno y arquitectura",
    description: "Preparar entorno tecnico, repositorios, despliegue base y componentes del sistema.",
    predecessor: "T01",
    duration: 6,
  },
  {
    id: "T08",
    phase: "Desarrollo del Sitio",
    activity: "Diseno tecnico frontend",
    description: "Definir estructura visual, navegacion y componentes principales de la interfaz.",
    predecessor: "T07",
    duration: 5,
  },
  {
    id: "T09",
    phase: "Desarrollo del Sitio",
    activity: "Diseno tecnico backend y APIs",
    description: "Definir servicios, endpoints y contrato de datos para consumo del sitio.",
    predecessor: "T07, T04",
    duration: 5,
  },
  {
    id: "T10",
    phase: "Desarrollo del Sitio",
    activity: "Desarrollo frontend base",
    description: "Construir vistas base, layout, navegacion y componentes reutilizables.",
    predecessor: "T08, T06",
    duration: 12,
  },
  {
    id: "T11",
    phase: "Desarrollo del Sitio",
    activity: "Desarrollo backend y servicios de datos",
    description: "Implementar logica de negocio, acceso a datos y servicios para indicadores.",
    predecessor: "T09, T06",
    duration: 12,
  },
  {
    id: "T12",
    phase: "Desarrollo del Sitio",
    activity: "Implementacion de visualizaciones",
    description: "Integrar graficos, tablas y modulos de consulta para mostrar indicadores.",
    predecessor: "T10, T11, T03",
    duration: 10,
  },
  {
    id: "T13",
    phase: "Desarrollo del Sitio",
    activity: "Integracion ETL preliminar y validacion",
    description: "Conectar el sitio al flujo preliminar de datos y validar resultados tecnicos.",
    predecessor: "T05, T11, T12",
    duration: 8,
  },
  {
    id: "T14",
    phase: "Desarrollo del Sitio",
    activity: "QA tecnico, ajustes y estabilizacion",
    description: "Corregir errores, afinar rendimiento y dejar la plataforma estable.",
    predecessor: "T13",
    duration: 7,
  },
  {
    id: "T15",
    phase: "Documentacion y Entrega",
    activity: "Protocolos de actualizacion de indicadores",
    description: "Documentar el paso a paso para cargar nuevos periodos de informacion.",
    predecessor: "T13",
    duration: 5,
  },
  {
    id: "T16",
    phase: "Documentacion y Entrega",
    activity: "Documentacion tecnica de dashboards",
    description: "Registrar la estructura tecnica de tableros, filtros y visualizaciones.",
    predecessor: "T12, T13",
    duration: 5,
  },
  {
    id: "T17",
    phase: "Documentacion y Entrega",
    activity: "Manual de mantenimiento de consultas",
    description: "Describir queries, procesos y puntos de control que alimentan indicadores.",
    predecessor: "T13",
    duration: 4,
  },
  {
    id: "T18",
    phase: "Documentacion y Entrega",
    activity: "Capacitacion y entrega tecnica",
    description: "Transferir conocimiento de uso, operacion y soporte al equipo final.",
    predecessor: "T14, T15, T16, T17",
    duration: 3,
  },
];

const dependencyMap = new Map();
for (const task of tasks) {
  dependencyMap.set(task.id, task);
}

function calculateDates() {
  for (const task of tasks) {
    const predecessors = task.predecessor === "-"
      ? []
      : task.predecessor.split(",").map((item) => item.trim());

    let start = projectStart;
    if (predecessors.length > 0) {
      let maxEnd = projectStart;
      for (const predecessorId of predecessors) {
        const predecessor = dependencyMap.get(predecessorId);
        if (predecessor?.endDate && predecessor.endDate > maxEnd) {
          maxEnd = predecessor.endDate;
        }
      }
      start = new Date(maxEnd.getTime());
    }

    const end = new Date(start.getTime() + task.duration * msPerDay);
    task.startDate = start;
    task.endDate = end;
  }
}

calculateDates();

const totalsByPhase = [...new Set(tasks.map((task) => task.phase))].map((phase) => {
  const rows = tasks.filter((task) => task.phase === phase);
  return {
    phase,
    tasks: rows.length,
    duration: rows.reduce((sum, row) => sum + row.duration, 0),
  };
});

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function buildMermaidCode() {
  const lines = [
    "gantt",
    "    title Carta Gantt Tecnica - Plataforma Web de Indicadores",
    "    dateFormat  YYYY-MM-DD",
    "    axisFormat  %d-%m",
    "",
  ];

  const phaseOrder = [
    "Definicion y Datos",
    "Desarrollo del Sitio",
    "Documentacion y Entrega",
  ];

  for (const phase of phaseOrder) {
    lines.push(`    section ${phase}`);
    for (const task of tasks.filter((row) => row.phase === phase)) {
      lines.push(
        `    ${task.id} ${task.activity.padEnd(45)} :${task.id.toLowerCase()}, ${formatDate(task.startDate)}, ${task.duration}d`,
      );
    }
    lines.push("");
  }

  return lines.join("\n").trimEnd();
}

const mermaidCode = buildMermaidCode();

const workbook = Workbook.create();
const summarySheet = workbook.worksheets.add("Resumen");
const ganttSheet = workbook.worksheets.add("Carta Gantt");
const mermaidSheet = workbook.worksheets.add("Mermaid");

summarySheet.showGridLines = false;
ganttSheet.showGridLines = false;
mermaidSheet.showGridLines = false;

summarySheet.getRange("A1:F1").merge();
summarySheet.getRange("A1").values = [["Carta Gantt Tecnica - Plataforma Web de Indicadores"]];
summarySheet.getRange("A2:F2").merge();
summarySheet.getRange("A2").values = [["Plan de trabajo con foco en desarrollo web, preparacion de datos y documentacion tecnica."]];

summarySheet.getRange("A4:C7").values = [
  ["Indicador", "Valor", "Comentario"],
  ["Fecha de inicio", projectStart, "Inicio referencial del plan"],
  ["Total de actividades", tasks.length, "Incluye preparacion, desarrollo y cierre"],
  ["Duracion total", tasks.reduce((sum, row) => sum + row.duration, 0), "Suma de dias planificados"],
];

summarySheet.getRange("A9:C12").values = [
  ["Mejora incorporada", "Justificacion", "Impacto"],
  ["Uso de datos mock / staging", "Permite desacoplar el desarrollo del sitio respecto a la carga final", "Reduce bloqueos y acelera avance tecnico"],
  ["Documentacion operativa al cierre", "Deja estandarizado el proceso de actualizacion y soporte", "Facilita continuidad y mantenimiento"],
  ["Validacion tecnica antes de entrega", "Asegura consistencia entre ETL, backend y visualizaciones", "Reduce retrabajo en salida a produccion"],
];

summarySheet.getRange("E4:G7").values = [
  ["Fase", "N de tareas", "Duracion total (dias)"],
  ...totalsByPhase.map((row) => [row.phase, row.tasks, row.duration]),
];

const summaryChart = summarySheet.charts.add("bar", summarySheet.getRange("E4:G7"));
summaryChart.title = "Duracion por fase";
summaryChart.hasLegend = false;
summaryChart.setPosition("E9", "L24");
summaryChart.xAxis = { axisType: "textAxis" };
summaryChart.yAxis = { numberFormatCode: "0" };

const ganttHeaders = [[
  "ID",
  "Fase",
  "Actividad",
  "Descripcion",
  "Predecesor",
  "Duracion (dias)",
  "Inicio",
  "Fin",
]];

ganttSheet.getRange(`A1:H${tasks.length + 1}`).values = [
  ...ganttHeaders,
  ...tasks.map((task) => [
    task.id,
    task.phase,
    task.activity,
    task.description,
    task.predecessor,
    task.duration,
    task.startDate,
    task.endDate,
  ]),
];

const ganttTable = ganttSheet.tables.add(`A1:H${tasks.length + 1}`, true, "GanttTasks");
ganttTable.style = "TableStyleMedium2";

mermaidSheet.getRange("A1:B2").values = [
  ["Campo", "Contenido"],
  ["Titulo", "Codigo Mermaid.js para la Carta Gantt"],
];
mermaidSheet.getRange("A4").values = [["Pega este bloque en un visor Mermaid compatible:"]];
mermaidSheet.getRange("A6").values = [[mermaidCode]];

const titleFormat = {
  fill: "#0F4C5C",
  font: { bold: true, color: "#FFFFFF", size: 16 },
  horizontalAlignment: "center",
  verticalAlignment: "center",
};

const subtitleFormat = {
  fill: "#D9EAF0",
  font: { italic: true, color: "#16303A" },
  horizontalAlignment: "center",
  verticalAlignment: "center",
};

const headerFormat = {
  fill: "#1D6F8A",
  font: { bold: true, color: "#FFFFFF" },
  horizontalAlignment: "center",
  verticalAlignment: "center",
  wrapText: true,
};

summarySheet.getRange("A1:F1").format = titleFormat;
summarySheet.getRange("A2:F2").format = subtitleFormat;
summarySheet.getRange("A4:C4").format = headerFormat;
summarySheet.getRange("A9:C9").format = headerFormat;
summarySheet.getRange("E4:G4").format = headerFormat;

ganttSheet.getRange("A1:H1").format = headerFormat;
ganttSheet.getRange("D2:D30").format.wrapText = true;
ganttSheet.getRange("G2:H30").format.numberFormat = "yyyy-mm-dd";

mermaidSheet.getRange("A1:B1").format = headerFormat;
mermaidSheet.getRange("A6").format.wrapText = true;

summarySheet.getRange("A1:F12").format.verticalAlignment = "center";
ganttSheet.getRange("A1:H30").format.verticalAlignment = "center";

summarySheet.getRange("A1:F12").format.font = { name: "Aptos" };
ganttSheet.getRange("A1:H30").format.font = { name: "Aptos" };
mermaidSheet.getRange("A1:B6").format.font = { name: "Consolas" };

summarySheet.freezePanes.freezeRows(3);
ganttSheet.freezePanes.freezeRows(1);
mermaidSheet.freezePanes.freezeRows(1);

summarySheet.getRange("A:A").format.columnWidthPx = 150;
summarySheet.getRange("B:B").format.columnWidthPx = 110;
summarySheet.getRange("C:C").format.columnWidthPx = 320;
summarySheet.getRange("E:E").format.columnWidthPx = 170;
summarySheet.getRange("F:G").format.columnWidthPx = 120;

ganttSheet.getRange("A:A").format.columnWidthPx = 70;
ganttSheet.getRange("B:B").format.columnWidthPx = 170;
ganttSheet.getRange("C:C").format.columnWidthPx = 240;
ganttSheet.getRange("D:D").format.columnWidthPx = 380;
ganttSheet.getRange("E:E").format.columnWidthPx = 130;
ganttSheet.getRange("F:F").format.columnWidthPx = 110;
ganttSheet.getRange("G:H").format.columnWidthPx = 110;

mermaidSheet.getRange("A:A").format.columnWidthPx = 180;
mermaidSheet.getRange("B:B").format.columnWidthPx = 520;
mermaidSheet.getRange("A6:B6").merge();
mermaidSheet.getRange("A6").format.rowHeightPx = 420;
mermaidSheet.getRange("A6").format.verticalAlignment = "top";

ganttSheet.getRange(`A2:H${tasks.length + 1}`).conditionalFormats.addCustom(
  '=OR($B2="Definicion y Datos",$B2="Desarrollo del Sitio",$B2="Documentacion y Entrega")',
  { fill: "#F8FBFD" },
);

await fs.mkdir(outputDir, { recursive: true });
await fs.mkdir(previewDir, { recursive: true });

const inspection = await workbook.inspect({
  kind: "table",
  range: `Carta Gantt!A1:H${tasks.length + 1}`,
  include: "values,formulas",
  tableMaxRows: 20,
  tableMaxCols: 8,
});

console.log(inspection.ndjson);

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "final formula error scan",
});

console.log(errors.ndjson);

for (const sheetName of ["Resumen", "Carta Gantt", "Mermaid"]) {
  const image = await workbook.render({
    sheetName,
    autoCrop: "all",
    scale: 1,
    format: "png",
  });
  const bytes = new Uint8Array(await image.arrayBuffer());
  const safeName = sheetName.toLowerCase().replaceAll(" ", "_");
  await fs.writeFile(path.join(previewDir, `${safeName}.png`), bytes);
}

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);

console.log(`Workbook exported to ${outputPath}`);
