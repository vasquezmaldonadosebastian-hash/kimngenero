export type Page2ResourceCard = {
  dimension: string;
  title: string;
  color: string;
  iconSrc?: string;
  iconScale?: number;
};

export const page2Resources: Page2ResourceCard[] = [
  {
    dimension: "1.- Institucionalización",
    title: "Institucionalización",
    color: "#0176DE",
    iconSrc: "/assets/kimn-genero/icons/dimension-01.svg",
    iconScale: 0.96,
  },
  {
    dimension: "2.- Violencia de Género",
    title: "Violencia de Género",
    color: "#14934E",
    iconSrc: "/assets/kimn-genero/icons/dimension-02.svg",
    iconScale: 0.96,
  },
  {
    dimension: "3.- Corresponsabilidad en los cuidados",
    title: "Corresponsabilidad en los cuidados",
    color: "#D8002D",
    iconSrc: "/assets/kimn-genero/icons/dimension-03.svg",
    iconScale: 0.9,
  },
  {
    dimension: "4.- Trayectorias laborales",
    title: "Trayectorias laborales",
    color: "#8E8E8E",
    iconSrc: "/assets/kimn-genero/icons/dimension-04.svg",
    iconScale: 0.92,
  },
  {
    dimension: "5.- Trayectorias educativas",
    title: "Trayectorias educativas",
    color: "#8657E0",
    iconSrc: "/assets/kimn-genero/icons/dimension-05.svg",
    iconScale: 0.92,
  },
  {
    dimension: "6.- Modelo educativo con perspectiva de género",
    title: "Modelo educativo con perspectiva de género",
    color: "#F96200",
    iconSrc: "/assets/kimn-genero/icons/dimension-06.svg",
    iconScale: 0.9,
  },
  {
    dimension: "7.- Participación equilibrada en la divulgación científica",
    title: "Participación equilibrada en la divulgación científica",
    color: "#FEC300",
    iconSrc: "/assets/kimn-genero/icons/dimension-07.svg",
    iconScale: 0.88,
  },
  {
    dimension: "8.- Visibilización del aporte de las mujeres en las áreas de conocimiento",
    title: "Visibilización del aporte de las mujeres en las áreas de conocimiento",
    color: "#232323",
    iconSrc: "/assets/kimn-genero/icons/dimension-08.svg",
    iconScale: 0.94,
  },
];

export function getPage2ResourceByDimension(dimension: string) {
  return page2Resources.find((item) => item.dimension === dimension);
}
