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
        <img
          className="logo-title"
          src="https://hell-blau.com/cdn/shop/files/hell-blau_logo.png?v=1756697126"
        ></img>
      </div>
    </header>
  );
}

export default NavBar;
