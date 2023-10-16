import { jsontohtml } from "jsontohtml-render";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { NODES } from "../../../util/util";
import Output from "../Output/Output";



function OutputPanel() {
  const data = useSelector((state) => state.sideBar.data);
  const nodeType = useSelector((state) => state.sideBar.nodeType);
  const [showData, setShowData] = useState(false);
  const [showConnect, setShowConnect] = useState(true);

  console.log(data)

  return (
    <div
      className={`relative top-[70px] z-50 overflow-y-auto w-full transition-[width] border-r shadow-xl bg-white px-3 pb-3`}
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
            <Output />
          </div>
        </Panel>
        <PanelResizeHandle className="h-1"></PanelResizeHandle>
        <Panel
          collapsible={true}
          defaultSize={15}
          collapsedSize={5}
          onCollapse={(e) => {
            if (e) setShowConnect(false);
            else setShowConnect(true);
          }}
        >
          <div
            className={`border-t-2 h-full py-2 mb-2 ${showConnect && "overflow-y-auto"}`}
          >
            <h3 className="text-lg font-medium tracking-wide">
              Can Connect With
            </h3>
            {showConnect && nodeType ? (
              <div
                className="h-full w-full mt-1"
                dangerouslySetInnerHTML={{
                  __html: jsontohtml(NODES[nodeType], {
                    colors: {
                      background: "whitesmoke",
                      keys: "red",
                      values: {
                        string: "green",
                        number: "#FFA500",
                        comma_colon_quotes: "#9c9c9c",
                      },
                    },
                    bracket_pair_lines: { color: "#bcbcbc" },
                  }),
                }}
              ></div>
            ) : (
              <>
                {showConnect && (
                  <p>Select a node to see which node can be connected</p>
                )}
              </>
            )}
          </div>
        </Panel>
        <PanelResizeHandle className="h-1" />
        <Panel
          onCollapse={(e) => {
            if (e) setShowData(false);
            else setShowData(true);
          }}
          collapsible={true}
          defaultSize={5}
          collapsedSize={5}
          minSize={10}
        >
          <div
            className={`border-t-2 h-full py-2 ${showData && "overflow-auto"}`}
          >
            <h3 className="text-lg font-medium tracking-wide">Data</h3>
            {showData && data ? (
              <div
                className="h-full w-full mt-1"
                dangerouslySetInnerHTML={{
                  __html: jsontohtml(data, {
                    colors: {
                      background: "whitesmoke",
                      keys: "red",
                      values: {
                        string: "green",
                        number: "#FFA500",
                        comma_colon_quotes: "#9c9c9c",
                      },
                    },
                    bracket_pair_lines: { color: "#bcbcbc" },
                  }),
                }}
              ></div>
            ) : (
              <>{showData && <p>Select a node to see the data</p>}</>
            )}
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}

export default OutputPanel;
