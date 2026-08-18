import type { ReactNode } from "react";
export function CautionBox({title="Keep educator judgment in the loop",children}:{title?:string;children:ReactNode}){return <aside className="caution-box"><p className="content-label">Caution</p><h2>{title}</h2><div>{children}</div></aside>}
