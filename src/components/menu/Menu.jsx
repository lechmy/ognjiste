import { useState } from "react";
import { Button } from "@mui/material";
import Submenu from "./submenu/Submenu";
import menu from "../../data/menu.js";
import "./menu.css";

export default function Menu() {
  const [currentCategory, setCurrentCategory] = useState(null);
  const categories = menu;

  const handleClick = (c) => {
    if(currentCategory?.id === c?.id) {
      setCurrentCategory(null);
    } else {
      setCurrentCategory(c);
    }
  }

  return (
    <div className="menu-container">
      <div className="menu">
        {categories.map(c => (
          <Button
            style={{borderRadius: 0, fontSize: '12px', marginRight: '1px', marginBottom: '1px'}}
            variant={c?.id === currentCategory?.id ? 'contained' : 'outlined'}
            color={c?.id === currentCategory?.id ? 'neutral' : 'inherit'}
            key={c.id} 
            onClick={() => handleClick(c)}>
              {c.kategorija.toUpperCase()}
          </Button>
        ))}
      </div>
      <Submenu category={currentCategory} />
    </div>
  )
}
