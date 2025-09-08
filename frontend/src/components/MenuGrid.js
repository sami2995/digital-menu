import MenuCard from "./MenuCard";

function MenuGrid({ filteredMenu }) {
  return (
    <div className="row">
      {filteredMenu.length === 0 ? (
        <p className="text-center">No menu items found.</p>
      ) : (
        filteredMenu.map((item, index) => (
          <MenuCard key={index} item={item} />
        ))
      )}
    </div>
  );
}

export default MenuGrid;
