import { usePageTracking } from "@/hooks/usePageTracking";
import { Outlet } from "react-router-dom";

/**
 * App wrapper that provides page tracking within router context
 */
export default function AppWithTracking() {
  usePageTracking();
  return <Outlet />;
}