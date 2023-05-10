import { useCallback, useRef, useState } from 'react';
import ReactFlow, { Controls, Background, useNodesState, ReactFlowProvider, useEdgesState, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';
import Sidebar from '../Components/Sidebar/Sidebar';
import UploadFile from '../Components/UploadFile/UploadFile';

const initialNodes = [];

const nodeTypes = {
  upload: UploadFile
}

let id = 0;
const getId = () => `dndnode_${id++}`;

function EditorPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const reactFlowWrapper = useRef(null);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <div className=" flex flex-col md:flex-row flex-1 h-screen">
      <ReactFlowProvider>
      <Sidebar />
        <div className="reactflow-wrapper h-screen md:h-[unset] flex-grow" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
}

export default EditorPage;
