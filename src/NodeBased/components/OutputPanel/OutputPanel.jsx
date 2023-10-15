import { jsontohtml } from "jsontohtml-render";
import React from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

function OutputPanel() {
  
  return (
    <div
      className={`relative top-[70px] z-50 overflow-y-auto w-full transition-[width] border-r shadow bg-white px-3`}
      style={{ height: "calc(100vh - 70px)" }}
    >
      <PanelGroup direction="vertical">
        <Panel
          collapsible={true}
          defaultSize={60}
          collapsedSize={4}
          minSize={20}
        >
          <div className="py-2">
            <h3 className="text-lg font-medium tracking-wide">Output</h3>
          </div>
        </Panel>
        <PanelResizeHandle className="h-1"></PanelResizeHandle>
        <Panel collapsible={true} defaultSize={25} collapsedSize={4}>
          <div className="border-t py-2">
            <h3 className="text-lg font-medium tracking-wide">Data</h3>
            <div className="h-full w-full" dangerouslySetInnerHTML={{__html: jsontohtml()}}></div>
          </div>
        </Panel>
        <PanelResizeHandle className="h-1" />
        <Panel collapsible={true} defaultSize={15} collapsedSize={4}>
          <div className="border-t py-2">
            <h3 className="text-lg font-medium tracking-wide">Return Node</h3>
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}

export default OutputPanel;
