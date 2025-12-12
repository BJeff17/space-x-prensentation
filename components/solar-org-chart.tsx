"use client";

import { useEffect, useState, useRef } from "react";
import { Rocket } from "lucide-react";

const HIERARCHY = {
  board: {
    title: "Board of Directors",
    members: "4 Directors",
  },
  ceo: {
    name: "Elon Musk",
    title: "CEO, CTO & Director",
    reports: 301,
  },
  departments: [
    {
      head: {
        name: "Bret Johnsen",
        title: "CFO & Strategic Acquisitions",
        reports: 28,
      },
      reports: [
        {
          name: "Finance",
          title: "Finance Department",
          department: "Finance",
        },
        {
          name: "IT",
          title: "IT Department",
          department: "Technology",
        },
      ],
    },
    {
      head: {
        name: "Gwynne Shotwell",
        title: "President, COO & Director",
        reports: 70,
      },
      reports: [
        {
          name: "Starlink Production",
          title: "Starlink Production Engineering",
          department: "Starlink",
        },
        {
          name: "Build & Flight",
          title: "Build & Flight Reliability",
          department: "Operations",
        },
        {
          name: "Launch Operations",
          title: "Launch Operations",
          department: "Launch",
          reports: [
            {
              name: "Texas Test & Launch",
              title: "Texas Test & Launch",
              department: "Launch",
            },
          ],
        },
        {
          name: "Vehicle Engineering",
          title: "Vehicle Engineering",
          department: "Engineering",
          reports: [
            {
              name: "Starship Engineering",
              title: "Starship Engineering",
              department: "Engineering",
            },
          ],
        },
      ],
    },
  ],
};

interface CardProps {
  delay: number;
  isLoaded: boolean;
}

function BoardCard({ delay, isLoaded }: CardProps) {
  return (
    <div
      className={`relative rounded-lg border-2 border-foreground bg-card shadow-md transition-all duration-500 hover:scale-105 px-6 py-3 ${
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex flex-col items-center text-center gap-1">
        <div className="flex items-center gap-2">
          <Rocket size={16} className="text-foreground" />
          <p className="font-black text-foreground text-sm tracking-tight">
            {HIERARCHY.board.title}
          </p>
        </div>
        <p className="text-muted-foreground text-[10px]">
          {HIERARCHY.board.members}
        </p>
      </div>
    </div>
  );
}

function CEOCard({ delay, isLoaded }: CardProps) {
  return (
    <div
      className={`relative rounded-lg border-2 border-accent bg-accent/5 shadow-lg transition-all duration-500 hover:scale-105 p-4 ${
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex flex-col items-center text-center gap-2">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-accent bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center">
          <Rocket size={32} className="text-foreground" />
        </div>
        <div>
          <p className="font-black text-foreground text-sm">
            {HIERARCHY.ceo.name}
          </p>
          <p className="text-accent text-xs font-semibold">
            {HIERARCHY.ceo.title}
          </p>
          {HIERARCHY.ceo.reports && (
            <p className="text-muted-foreground text-[10px] mt-1">
              {HIERARCHY.ceo.reports} reports
            </p>
          )}
        </div>
      </div>
      <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-accent rounded-full animate-pulse" />
    </div>
  );
}

function DepartmentCard({
  department,
  delay,
  isLoaded,
}: {
  department: (typeof HIERARCHY.departments)[0];
  delay: number;
  isLoaded: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center transition-all duration-500 ${
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Vertical connector from horizontal line */}
      <div className="w-0.5 h-6 bg-border" />

      {/* Department Head Card */}
      <div className="relative rounded-lg border-2 border-primary bg-primary/10 shadow-lg p-4 min-w-40 hover:scale-105 transition-transform">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
            <Rocket size={20} className="text-foreground" />
          </div>
          <div>
            <p className="font-black text-foreground text-xs">
              {department.head.name}
            </p>
            <p className="text-primary text-[10px] font-semibold">
              {department.head.title}
            </p>
            {department.head.reports && (
              <p className="text-muted-foreground text-[9px] mt-0.5">
                {department.head.reports} reports
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Connector to direct reports */}
      {department.reports && department.reports.length > 0 && (
        <>
          <div className="w-0.5 h-6 bg-border" />

          {/* Horizontal line spanning direct reports */}
          {department.reports.length > 1 && (
            <div className="h-0.5 bg-border w-full max-w-[300px]" />
          )}

          {/* Direct Reports */}
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {department.reports.map((report, i) => (
              <div key={report.name} className="flex flex-col items-center">
                {/* Vertical connector from horizontal line for multiple reports */}
                {department.reports.length > 1 && (
                  <div className="w-0.5 h-4 bg-border" />
                )}

                {/* Direct Report Card */}
                <div className="rounded-lg border-2 border-emerald-500 bg-emerald-500/5 shadow-md p-3 min-w-[140px] hover:scale-105 transition-transform">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-500 bg-gradient-to-br from-emerald-500 to-emerald-500/50 flex items-center justify-center">
                      <Rocket size={16} className="text-foreground" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-xs">
                        {report.name}
                      </p>
                      <p className="text-muted-foreground text-[9px] font-medium">
                        {report.title}
                      </p>
                      <p className="text-emerald-500 text-[8px] font-semibold">
                        {report.department}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sub-reports if any */}
                {report.reports && report.reports.length > 0 && (
                  <>
                    <div className="w-0.5 h-4 bg-border" />
                    <div className="flex flex-col items-center gap-2">
                      {report.reports.map((subReport, j) => (
                        <div
                          key={subReport.name}
                          className="rounded border-2 border-blue-400 bg-blue-400/5 shadow-sm p-2 min-w-[120px] hover:scale-105 transition-transform"
                        >
                          <div className="flex flex-col items-center text-center gap-1">
                            <div className="w-6 h-6 rounded-full overflow-hidden border border-blue-400 bg-gradient-to-br from-blue-400 to-blue-400/50 flex items-center justify-center">
                              <Rocket size={10} className="text-foreground" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground text-[10px]">
                                {subReport.name}
                              </p>
                              <p className="text-muted-foreground text-[8px]">
                                {subReport.title}
                              </p>
                              <p className="text-blue-400 text-[7px]">
                                {subReport.department}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function SolarOrgChart() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = (e: Event) => {
      setIsScrolled(container.scrollTop > 50);
      // Empêcher la propagation du scroll vers le parent (slides)
      e.stopPropagation();
    };

    container.addEventListener("scroll", handleScroll, { passive: false });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Empêcher le swipe quand on est dans l'organigramme
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

      // Permettre le scroll dans la div si on n'est pas aux extrémités
      if ((isScrollingDown && !isAtBottom) || (isScrollingUp && !isAtTop)) {
        e.stopPropagation();
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div
      ref={scrollRef}
      className="h-full w-full flex flex-col overflow-y-auto pt-12"
      onTouchStart={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center px-2 mt-8">
        {/* Header */}
        <div
          className={`flex items-center justify-center gap-2 py-4 mb-8 mt-4 w-full transition-all duration-300 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          } ${
            isScrolled
              ? "opacity-0 -translate-y-8 scale-75 h-0 mb-0 mt-0 py-0 overflow-hidden pointer-events-none"
              : "opacity-100 translate-y-0 scale-100"
          }`}
        >
          <Rocket size={20} className="text-foreground" />
          <div className="text-center">
            <h2 className="text-lg md:text-2xl font-black tracking-tight text-foreground">
              SPACEX ORGANIZATION
            </h2>
            <p className="text-muted-foreground text-[10px] md:text-xs">
              Structure Hiérarchique & Départements
            </p>
          </div>
        </div>

        {/* Org Chart */}
        <div className="flex flex-col items-center w-full gap-4 pb-8">
          {/* Board of Directors */}
          <BoardCard delay={100} isLoaded={isLoaded} />

          {/* Connector */}
          <div
            className={`w-0.5 h-6 bg-border transition-all duration-300 ${
              isLoaded ? "scale-y-100" : "scale-y-0"
            }`}
            style={{ transitionDelay: "200ms", transformOrigin: "top" }}
          />

          {/* CEO */}
          <CEOCard delay={300} isLoaded={isLoaded} />

          {/* Connector from CEO to departments */}
          <div
            className={`w-0.5 h-6 bg-border transition-all duration-300 ${
              isLoaded ? "scale-y-100" : "scale-y-0"
            }`}
            style={{ transitionDelay: "400ms", transformOrigin: "top" }}
          />

          {/* Horizontal line spanning all departments */}
          <div
            className={`h-0.5 bg-border transition-all duration-500 ${
              isLoaded ? "w-[95%] max-w-6xl" : "w-0"
            }`}
            style={{ transitionDelay: "450ms" }}
          />

          {/* Department Hierarchies */}
          <div className="flex flex-wrap justify-center gap-8 lg:gap-12 w-full max-w-7xl">
            {HIERARCHY.departments.map((department, i) => (
              <DepartmentCard
                key={department.head.name}
                department={department}
                delay={500 + i * 150}
                isLoaded={isLoaded}
              />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div
          className={`mt-8 pt-4 border-t border-border/50 flex flex-wrap justify-center gap-6 transition-all duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "1200ms" }}
        >
          {[
            { label: "CEO & Direction", color: "bg-accent" },
            { label: "Niveau Exécutif", color: "bg-primary" },
            { label: "Départements", color: "bg-emerald-500" },
            { label: "Sous-départements", color: "bg-blue-400" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${item.color}`} />
              <span className="text-xs text-muted-foreground">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className={`mt-4 pb-4 text-center transition-all duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "1200ms" }}
        >
          <p className="text-[10px] text-muted-foreground">
            SpaceX • Structure Organisationnelle • Hawthorne, California •
            Décembre 2025
          </p>
        </div>
      </div>
    </div>
  );
}
