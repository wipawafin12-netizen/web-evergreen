import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

interface TreeNode {
  label: { en: string; th: string };
  path: string | null;
  children?: TreeNode[];
}

const siteTree: TreeNode = {
  label: { en: "Home", th: "หน้าหลัก" },
  path: "/",
  children: [
    {
      label: { en: "About Us", th: "เกี่ยวกับเรา" },
      path: "/our-company",
    },
    {
      label: { en: "Products", th: "สินค้า" },
      path: null,
      children: [
        {
          label: { en: "Door", th: "ประตู" },
          path: "/door",
          children: [
            { label: { en: "WPC Door", th: "ประตู WPC" }, path: "/door#wpc" },
            { label: { en: "uPVC Door", th: "ประตู uPVC" }, path: "/door#upvc" },
            { label: { en: "Melamine Door", th: "ประตู Melamine" }, path: "/door#melamine" },
          ],
        },
        { label: { en: "Doorframe", th: "วงกบ" }, path: "/doorframe" },
        { label: { en: "Flooring", th: "พื้นไม้" }, path: "/flooring" },
        { label: { en: "Service Shaft", th: "ช่องชาร์ป" }, path: "/service-shaft" },
        { label: { en: "Staircase", th: "บันได" }, path: "/staircase" },
        { label: { en: "Wall Panel", th: "ผนังตกแต่ง" }, path: "/wall-panel" },
      ],
    },
    {
      label: { en: "Services", th: "บริการ" },
      path: "/services",
    },
    {
      label: { en: "Business", th: "ธุรกิจ" },
      path: null,
      children: [
        { label: { en: "Quote", th: "ขอใบเสนอราคา" }, path: "/quote" },
        { label: { en: "B2B", th: "B2B" }, path: "/b2b" },
        { label: { en: "Affiliate", th: "Affiliate" }, path: "/affiliate" },
      ],
    },
    {
      label: { en: "Contact", th: "ติดต่อเรา" },
      path: "/contact",
    },
    {
      label: { en: "Login", th: "เข้าสู่ระบบ" },
      path: "/login",
    },
  ],
};

/* CSS custom properties for line colors (light & dark mode) */
const treeCSS = `
  :root { --tree-line: #b8a99a; --tree-line-sub: #d1c7bd; }
  .dark { --tree-line: #57534e; --tree-line-sub: #44403c; }
`;

const line = "var(--tree-line)";
const lineSub = "var(--tree-line-sub)";

/* ── Node Card ── */
const NodeCard: React.FC<{
  node: TreeNode;
  level: number;
  language: string;
}> = ({ node, level, language }) => {
  const text = language === "EN" ? node.label.en : node.label.th;

  const cls: Record<number, string> = {
    0: "bg-brand-500 text-white px-6 py-3 rounded-lg shadow-lg text-base font-semibold",
    1: "bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-100 px-4 py-2 rounded-lg shadow text-sm font-semibold border border-stone-200 dark:border-stone-700 hover:border-brand-400 dark:hover:border-brand-500 hover:shadow-md transition-all",
    2: "bg-white dark:bg-stone-800/80 text-stone-700 dark:text-stone-200 px-3 py-1.5 rounded-md shadow-sm text-xs font-medium border border-stone-200 dark:border-stone-700 hover:border-brand-300 transition-all",
    3: "bg-stone-50 dark:bg-stone-700/60 text-stone-600 dark:text-stone-300 px-2.5 py-1 rounded text-xs border border-stone-200/60 dark:border-stone-600 hover:border-brand-300 transition-all",
  };

  const className = `${cls[level] || cls[3]} inline-block whitespace-nowrap`;

  if (node.path) {
    return (
      <Link to={node.path} className={className}>
        {text}
      </Link>
    );
  }
  return <span className={`${className} cursor-default`}>{text}</span>;
};

/* ── Vertical sub-list (level 2+) with border-left + ticks ── */
const SubList: React.FC<{
  items: TreeNode[];
  language: string;
  level: number;
}> = ({ items, language, level }) => {
  const c = level <= 2 ? line : lineSub;
  const indent = level <= 2 ? 16 : 14;

  return (
    <div
      style={{
        marginTop: 6,
        marginLeft: indent,
        borderLeft: `2px solid ${c}`,
        paddingLeft: indent,
      }}
    >
      {items.map((item, i) => (
        <div key={i} style={{ paddingTop: 4, paddingBottom: 4 }}>
          {/* Flex row: tick + node card */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: indent,
                marginLeft: -indent,
                borderTop: `2px solid ${c}`,
                flexShrink: 0,
              }}
            />
            <NodeCard node={item} level={level} language={language} />
          </div>
          {/* Recursive children */}
          {item.children && item.children.length > 0 && (
            <SubList
              items={item.children}
              language={language}
              level={level + 1}
            />
          )}
        </div>
      ))}
    </div>
  );
};

/* ── Desktop: root → horizontal level-1 → vertical sub-lists ── */
const DesktopTree: React.FC<{ language: string }> = ({ language }) => {
  const root = siteTree;
  const children = root.children || [];

  return (
    <div className="hidden md:block">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Root node */}
        <NodeCard node={root} level={0} language={language} />

        {/* Vertical stem from root */}
        <div style={{ width: 2, height: 28, background: line }} />

        {/* Level-1 row */}
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          {children.map((child, i) => {
            const isFirst = i === 0;
            const isLast = i === children.length - 1;
            const isOnly = children.length === 1;

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "0 12px",
                }}
              >
                {/* T-connector: horizontal bar segment + vertical drop */}
                <div style={{ display: "flex", width: "100%", height: 28 }}>
                  {/* Left half: right border = vertical center line */}
                  <div
                    style={{
                      width: "50%",
                      height: "100%",
                      borderRight: `2px solid ${line}`,
                      borderTop:
                        !isFirst && !isOnly ? `2px solid ${line}` : "none",
                    }}
                  />
                  {/* Right half */}
                  <div
                    style={{
                      width: "50%",
                      height: "100%",
                      borderTop:
                        !isLast && !isOnly ? `2px solid ${line}` : "none",
                    }}
                  />
                </div>

                {/* Node card */}
                <NodeCard node={child} level={1} language={language} />

                {/* Children sub-list */}
                {child.children && child.children.length > 0 && (
                  <div style={{ width: "100%", marginTop: 2 }}>
                    <SubList
                      items={child.children}
                      language={language}
                      level={2}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* ── Mobile: fully vertical tree ── */
const MobileTree: React.FC<{ language: string }> = ({ language }) => {
  const root = siteTree;
  const children = root.children || [];

  return (
    <div className="md:hidden">
      <NodeCard node={root} level={0} language={language} />

      <div
        style={{
          marginLeft: 20,
          borderLeft: `2px solid ${line}`,
          paddingLeft: 20,
          marginTop: 4,
        }}
      >
        {children.map((child, i) => (
          <div key={i} style={{ paddingTop: 6, paddingBottom: 6 }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: 20,
                  marginLeft: -20,
                  borderTop: `2px solid ${line}`,
                  flexShrink: 0,
                }}
              />
              <NodeCard node={child} level={1} language={language} />
            </div>
            {child.children && child.children.length > 0 && (
              <SubList
                items={child.children}
                language={language}
                level={2}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Page ── */
export const Sitemap: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="bg-[#FDFBF7] dark:bg-stone-950 min-h-screen">
      <style>{treeCSS}</style>
      <div className="container mx-auto px-6 md:px-12 py-16 max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-light text-stone-900 dark:text-stone-100 mb-4">
          {t("Sitemap", "แผนผังเว็บไซต์")}
        </h1>
        <div className="w-20 h-1 bg-brand-500 mb-12" />

        <div className="overflow-x-auto pb-8">
          <DesktopTree language={language} />
          <MobileTree language={language} />
        </div>
      </div>
    </div>
  );
};
