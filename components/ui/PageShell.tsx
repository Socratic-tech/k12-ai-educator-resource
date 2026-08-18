import type { ReactNode } from "react"; import { SiteHeader } from "./SiteHeader"; import { SiteFooter } from "./SiteFooter";
export function PageShell({children}: {children:ReactNode}){return <><SiteHeader/><main id="main">{children}</main><SiteFooter/></>}
export function PageIntro({eyebrow,title,description}: {eyebrow:string;title:string;description:string}){return <section className="page-intro section-shell"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></section>}
