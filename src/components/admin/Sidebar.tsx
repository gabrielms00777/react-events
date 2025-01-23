import { Link } from "react-router";

export const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Eventos", path: "/eventos" },
    { name: "Funcionários", path: "/funcionarios" },
    { name: "Visitantes", path: "/visitantes" },
    { name: "Configurações", path: "/configuracoes" },
  ];

  return (
    <div className="h-screen w-64 bg-primary text-white flex flex-col">
      <h2 className="text-2xl font-bold p-4">Admin Panel</h2>
      <nav className="flex-grow">
        {menuItems.map((item) => (
          <Link
            to={item.path}
            key={item.name}
            className='block px-4 py-2 hover:bg-secondary'
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

