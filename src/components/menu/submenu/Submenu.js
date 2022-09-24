import { useDispatch } from "react-redux";
import { Button } from '@mui/material';
import { addToCurrentBill } from "../../bill/billSlice";

export default function Submenu({ category }) {
  const dispatch = useDispatch();

  const addToBill = (artikal) => {
      dispatch(addToCurrentBill(artikal));
  }

  return (
    <div className="submenu">
        {category ? (
          <div className="article">
            {category.artikli.map(a => (
              <Button 
                key={a.id}
                style={{borderRadius: 0, fontSize: '15px', padding: '10px', textTransform: 'unset', marginRight: '2px', marginBottom: '2px'}}
                variant="contained"
                color='secondary'
                onClick={() => addToBill(a)}>
                  {a.artikal}
              </Button>
            ))}
          </div>
        ) : null}
    </div>
  )
}
