import React from "react";
import type { Indicator } from "@shared/types/indicators";
import DashboardCard from "./detail/DashboardCard";
import FormulaBlock from "./detail/FormulaBlock";
import Hero from "./detail/Hero";
import TechnicalSheet from "./detail/TechnicalSheet";

interface IndicadorDetailProps {
  indicador: Indicator;
}

export default function IndicadorDetail({ indicador }: IndicadorDetailProps) {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Hero indicador={indicador} />
      <div
        className="h-8 w-full bg-[#F8F9FA] sm:h-12"
        style={{ clipPath: "ellipse(55% 100% at 50% 0%)", marginTop: "-1px" }}
      />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <DashboardCard indicador={indicador} />
        <FormulaBlock indicador={indicador} />
        <TechnicalSheet indicador={indicador} />
      </div>
    </div>
  );
}
