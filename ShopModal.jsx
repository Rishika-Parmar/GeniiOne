import React from 'react';
import { REWARDS_STORE_ITEMS } from './constants';

export default function ShopModal({ isOpen, onClose, coins, setCoins, showToast }) {
  if (!isOpen) return null;

  const handleRedeemItem = (item) => {
    if (coins < item.price) {
      showToast("Insufficient Coins", `You need ${item.price - coins} more Credit Coins to redeem this item.`);
      return;
    }
    setCoins(prev => prev - item.price);
    showToast("🎉 REDEEMED SUCCESSFULLY!", `You unlocked: "${item.name}". Access credentials will sync to your mail.`);
  };

  return (
    <div id="shop-overlay" className="overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
      <div className="glass-modal shop-modal" style={{ position: 'relative' }}>
        <div className="modal-header">
          <h2>Credit Coin Rewards Store</h2>
          <button id="close-shop-btn" className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <p className="shop-desc">Exchange your earned Credit Coins for premium academic resources, AI credits, and exclusive mentor access. (Current Balance: 🪙 {coins})</p>
        
        <div className="shop-grid">
          {REWARDS_STORE_ITEMS.map(item => (
            <div className="shop-card" key={item.id}>
              <div className="shop-icon">{item.icon}</div>
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
              <div className="shop-footer">
                <span className="price-tag">🪙 {item.price} Coins</span>
                <button className="btn btn-action buy-item-btn" onClick={() => handleRedeemItem(item)}>Redeem</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
