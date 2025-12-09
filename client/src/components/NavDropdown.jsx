import { useState } from "react";
import { ChevronDown, X } from "lucide-react";

export default function NavDropdown({ menuItems, onHeaderMouseDown }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`nav-dropdown ${open ? "open" : ""}`}>
      {/* header */}
      <div className="dropdown-header" onMouseDown={onHeaderMouseDown}>
        <span className="title">Menu</span>

        <button
          className="dropdown-trigger"
          onClick={(e) => {
            e.stopPropagation(); // ⭐ 阻止拖拽
            setOpen(!open);
          }}
        >
          {open ? (
            <X width={20} height={10} />
          ) : (
            <ChevronDown width={20} height={10} />
          )}
        </button>
      </div>

      {/* body（通过 CSS 控动画） */}
      <div className="dropdown-body">
        {menuItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="dropdown-item"
            onClick={() => setOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
