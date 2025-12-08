import { useState } from "react";

// 固定ナビゲーションバー（ドロップダウン付き）
function NavBar() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { label: "ホーム", href: "#top" },
    { label: "新規投稿", href: "#new" },
    { label: "投稿一覧", href: "#posts" },
  ];

  return (
    <header className="navbar">
      <div className="nav-brand">
        <span className="logo-mark">✦</span>
        <div className="logo-text">
          <span className="logo-title">My Blog</span>
          <span className="logo-sub">日々のメモとアイデア</span>
        </div>
      </div>

      <nav className="nav-links">
        <a href="#new">投稿する</a>
        <a href="#posts">読む</a>
      </nav>

      <div className="nav-dropdown">
        <button className="dropdown-trigger" onClick={() => setOpen(!open)}>
          メニュー ▾
        </button>
        {open && (
          <div className="dropdown-menu">
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
        )}
      </div>
    </header>
  );
}

export default NavBar;
