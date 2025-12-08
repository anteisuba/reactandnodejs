import { useEffect, useRef, useState } from "react";
import NavDropdown from "./NavDropdown";

const menuItems = [
  { href: "#top", label: "TOP 🥾" },
  { href: "#news", label: "NEWS 💣" },
  { href: "#live", label: "LIVE 🌕" },
  { href: "#release", label: "RELEASE 💿" },
];

export default function FloatingMenu() {
  const ref = useRef(null);

  const [pos, setPos] = useState({
    x: 16,
    y: 76,
  });

  const draggingRef = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  /** ✅ 只允许 header 触发拖拽 */
  const startDrag = (e) => {
    draggingRef.current = true;
    offset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
    e.preventDefault();
  };

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!draggingRef.current) return;

      setPos({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      });
    };

    const onMouseUp = () => {
      draggingRef.current = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="floating-menu"
      style={{ left: pos.x, top: pos.y }}
    >
      <NavDropdown
        menuItems={menuItems}
        onHeaderMouseDown={startDrag} // ⭐ 把拖拽权限交给子组件
      />
    </div>
  );
}
