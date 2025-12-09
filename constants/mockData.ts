import { Task } from "@/types/task";

export const mockTasks: Task[] = [
  {
    id: "t-23017-cut",
    title: "Pull cut drawings for UCLA 23017 R21",
    description: "Gather latest cut sheets with annotated revisions for panel R21.",
    status: "ready",
    priority: "high",
    due: "Today, 4:00 PM",
    context: [
      "Workspace: Fabrication",
      "Needs DXF + PDF",
      "Include revision deltas"
    ],
    resources: [
      {
        id: "r-cut-pdf",
        name: "Cut Sheet - R21.pdf",
        type: "cut-drawing",
        path: "/mnt/floorplans/UCLA/23017/R21/cut-sheet.pdf",
        actionHint: "Open in default PDF app"
      },
      {
        id: "r-cut-dxf",
        name: "Cut Sheet - R21.dxf",
        type: "cut-drawing",
        path: "/mnt/floorplans/UCLA/23017/R21/cut-sheet.dxf",
        actionHint: "Load in CAD"
      },
      {
        id: "r-assembly",
        name: "Assembly - R21.pdf",
        type: "assembly",
        path: "/mnt/floorplans/UCLA/23017/R21/assembly.pdf",
        actionHint: "Open to verify fastening"
      },
      {
        id: "r-packing",
        name: "Packing List - Zone R",
        type: "packing-list",
        path: "/mnt/floorplans/UCLA/23017/packing-list-zone-r.xlsx",
        actionHint: "Cross-check outbound parts"
      }
    ]
  },
  {
    id: "t-qa-punch",
    title: "QA punch for panels S14-S18",
    description: "Confirm edge distances + hardware kits pre-pack.",
    status: "in-progress",
    priority: "medium",
    context: [
      "Reference last NCR",
      "Capture photos for discrepancies"
    ],
    resources: [
      {
        id: "r-panel-s14",
        name: "Panel S14 drawing.pdf",
        type: "panel",
        path: "/mnt/floorplans/UCLA/23017/S14/drawing.pdf",
        actionHint: "Annotate in PDF"
      },
      {
        id: "r-panel-s18",
        name: "Panel S18 drawing.pdf",
        type: "panel",
        path: "/mnt/floorplans/UCLA/23017/S18/drawing.pdf",
        actionHint: "Annotate in PDF"
      }
    ]
  }
];

export const quickPrompts = [
  "Get cut drawings for UCLA 23017 R21",
  "Find packing list for UCLA 23017",
  "Show assemblies needing sign-off",
  "Locate panel DXFs by zone"
];
