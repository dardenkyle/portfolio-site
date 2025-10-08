import { RouterProvider } from "react-router-dom";
import { router } from "@/routes";
import Starfield from "@/ui/Starfield";
import Planet from "@/ui/Planet";

export default function App() {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Put the canvas above the body background but below content */}

      {/* Planet in background */}
      <div className="absolute z-[2]">
        <Planet />
      </div>

      <Starfield
        density={0.5}
        speed={0.001}
        background={undefined} // keep transparent
        color="#B26A6A"
        maxRadius={0.5}
        zIndex={0} // canvas layer
        debug={false} // set true once if you need to prove it draws
      />
      <Starfield
        density={1}
        speed={0.01}
        background={undefined} // keep transparent
        color="#ffffff"
        maxRadius={1}
        zIndex={0} // canvas layer
        debug={false} // set true once if you need to prove it draws
      />
      <Starfield
        density={0.05}
        speed={0.01}
        background={undefined} // keep transparent
        color="#b7d8ff"
        maxRadius={1}
        zIndex={2} // canvas layer
        debug={false} // set true once if you need to prove it draws
      />
      <Starfield
        density={0.009}
        speed={1}
        background={undefined} // keep transparent
        color="#ffffff"
        maxRadius={0.5}
        zIndex={2} // canvas layer
        debug={false} // set true once if you need to prove it draws
      />
      {/* Content layer above */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}
