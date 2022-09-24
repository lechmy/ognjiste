import { useSelector } from "react-redux";
import "./OrderInfo.css";

export default function OrderInfo({ reference }) {
  const currentBill = useSelector(state => state.bill.currentBill);

  return (
    <div ref={reference} className="order-info-body">
      <h1>Porudzbina</h1>
      <div className="order-info-row row-header">
        <div className="order-info-column-name">Artikal</div>
        <div className="order-info-column-quantity">Kol<span className="print-disable">icina</span></div>
      </div>
      {currentBill.map(article => (
        <div key={article.id} className="order-info-row">
          <div className="order-info-column-name">{article?.artikal}</div>
          <div className="order-info-column-quantity">{article?.quantity}</div>
        </div>
      ))}
    </div>
  )
}