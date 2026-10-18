import { useEffect, useMemo, useState } from 'react';
import { ArrowDownRight, ArrowRight, Check, ChevronDown, Minus, Plus, Search, ShoppingBag, X, Menu, Instagram, MapPin, ShieldCheck, Truck } from 'lucide-react';

const products = [
  { id: 1, name: 'Oversized Essential Tee', category: 'T-shirts', type: 'clothing', price: 149, oldPrice: 179, badge: 'BEST-SELLER', color: 'Noir', sizes: ['S','M','L','XL'], image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85', description: 'T-shirt oversize, coupe relax et coton doux.' },
  { id: 2, name: 'Urban Cargo Pants', category: 'Pantalons', type: 'clothing', price: 279, color: 'Olive', sizes: ['S','M','L','XL'], image: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=900&q=85', description: 'Pantalon cargo à la coupe moderne, facile à porter.' },
  { id: 3, name: 'Everyday Hoodie', category: 'Sweats & hoodies', type: 'clothing', price: 329, color: 'Gris', sizes: ['M','L','XL'], image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85', description: 'Hoodie confortable pour un look streetwear.' },
  { id: 4, name: 'Classic Knit Set', category: 'Ensembles', type: 'clothing', price: 399, badge: 'NOUVEAU', color: 'Beige', sizes: ['S','M','L','XL'], image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=85', description: 'Ensemble coordonné, silhouette propre et minimaliste.' },
  { id: 5, name: 'City Overshirt', category: 'Chemises & vestes', type: 'clothing', price: 299, color: 'Crème', sizes: ['M','L','XL'], image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=85', description: 'Surchemise polyvalente pour un style urbain chic.' },
  { id: 6, name: 'Daily Cap', category: 'Accessoires', type: 'clothing', price: 99, color: 'Noir', sizes: ['Taille unique'], image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=85', description: 'Casquette simple avec une finition street.' },
  { id: 7, name: 'Oud Mood — Décant', category: 'Parfums', type: 'perfume', price: 65, volumes: ['5 ml','10 ml','20 ml'], badge: 'INTENSE', color: 'Boisé / ambré', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=85', description: 'Profil boisé et ambré. Décant à choisir selon le volume.' },
  { id: 8, name: 'Fresh Blue — Décant', category: 'Parfums', type: 'perfume', price: 55, volumes: ['5 ml','10 ml','20 ml'], color: 'Frais / aromatique', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=85', description: 'Accord frais et aromatique, idéal au quotidien.' },
  { id: 9, name: 'Amber Night — Décant', category: 'Parfums', type: 'perfume', price: 75, volumes: ['5 ml','10 ml','20 ml'], badge: 'SIGNATURE', color: 'Ambré / épicé', image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=85', description: 'Un profil chaleureux et épicé pour les soirées.' },
  { id: 10, name: 'Clean Musk — Décant', category: 'Parfums', type: 'perfume', price: 59, volumes: ['5 ml','10 ml','20 ml'], color: 'Musc / propre', image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=900&q=85', description: 'Une senteur musquée et propre, discrète et élégante.' },
  { id: 11, name: 'Relaxed Fit Trousers', category: 'Pantalons', type: 'clothing', price: 249, color: 'Charbon', sizes: ['S','M','L','XL'], image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=85', description: 'Pantalon relaxed fit pour composer une tenue simple.' },
  { id: 12, name: 'Premium Zip Jacket', category: 'Chemises & vestes', type: 'clothing', price: 449, color: 'Noir', sizes: ['M','L','XL'], image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85', description: 'Veste premium à fermeture zippée et lignes épurées.' },
];

const money = (n) => `${n.toLocaleString('fr-MA')} DH`;
const readStorage = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };

export default function App() {
  const [cart, setCart] = useState(() => readStorage('mohsin-cart', []));
  const [activeCategory, setActiveCategory] = useState('Tout voir');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('featured');
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notice, setNotice] = useState('');
  const [selected, setSelected] = useState(null);
  const [selection, setSelection] = useState({});
  const [form, setForm] = useState({ name: '', phone: '', address: '', notes: '' });
  const [orderSuccess, setOrderSuccess] = useState(null);

  useEffect(() => { localStorage.setItem('mohsin-cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { if (!notice) return; const t = setTimeout(() => setNotice(''), 2600); return () => clearTimeout(t); }, [notice]);

  const filtered = useMemo(() => {
    let list = products.filter(p => activeCategory === 'Tout voir' || (activeCategory === 'Vêtements' ? p.type === 'clothing' : activeCategory === 'Parfums' ? p.type === 'perfume' : p.category === activeCategory));
    if (search.trim()) list = list.filter(p => `${p.name} ${p.category} ${p.color}`.toLowerCase().includes(search.toLowerCase()));
    if (sort === 'price-asc') list.sort((a,b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a,b) => b.price - a.price);
    return list;
  }, [activeCategory, search, sort]);
  const count = cart.reduce((s, item) => s + item.qty, 0);
  const subtotal = cart.reduce((s, item) => s + item.price * item.qty, 0);
  const shipping = subtotal === 0 || subtotal >= 600 ? 0 : 30;
  const total = subtotal + shipping;

  function addToCart(product, opts = {}) {
    const variant = product.type === 'perfume' ? (opts.volume || product.volumes?.[0]) : (opts.size || product.sizes?.[0]);
    const key = `${product.id}-${variant}`;
    setCart(old => {
      const found = old.find(i => i.key === key);
      return found ? old.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i) : [...old, { key, id: product.id, name: product.name, price: product.price, image: product.image, variant, qty: 1, type: product.type }];
    });
    setSelected(null); setNotice('Produit ajouté au panier');
  }
  function changeQty(key, delta) { setCart(old => old.map(i => i.key === key ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0)); }
  function beginAdd(product) {
    const opts = selection[product.id] || {};
    if (product.type === 'clothing' && product.sizes?.length > 1 && !opts.size) { setSelected(product); return; }
    if (product.type === 'perfume' && !opts.volume) { setSelected(product); return; }
    addToCart(product, opts);
  }
  function confirmOrder(e) {
    e.preventDefault();
    if (!cart.length) return;
    const order = { id: `MH-${Date.now().toString().slice(-7)}`, date: new Date().toISOString(), customer: form, items: cart, subtotal, shipping, total, payment: 'Paiement à la livraison', city: 'Dakhla', status: 'En attente' };
    const orders = readStorage('mohsin-orders', []);
    localStorage.setItem('mohsin-orders', JSON.stringify([order, ...orders]));
    setOrderSuccess(order); setCart([]); setCheckoutOpen(false); setCartOpen(false); setForm({ name: '', phone: '', address: '', notes: '' });
  }
  const goToShop = (category = 'Tout voir') => { setActiveCategory(category); setMobileMenu(false); document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }); };

  return <div className="app-shell">
    <div className="announcement"><span>LA NOUVELLE ÉNERGIE DU STYLE</span><span className="announcement-dot">✳</span><span>Livraison à Dakhla · Paiement à la livraison</span></div>
    <header className="header">
      <button className="icon-button mobile-only" aria-label="Ouvrir le menu" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X/> : <Menu/>}</button>
      <a className="wordmark" href="#top" aria-label="MOHSIN accueil">MOHSIN<span>®</span></a>
      <nav className={`nav ${mobileMenu ? 'nav-open' : ''}`}>
        <button onClick={() => goToShop('Tout voir')}>Tout voir</button><button onClick={() => goToShop('Vêtements')}>Vêtements</button><button onClick={() => goToShop('Parfums')}>Parfums</button><a href="#about" onClick={() => setMobileMenu(false)}>Notre univers</a>
      </nav>
      <div className="header-actions"><label className="search-box"><Search size={17}/><input value={search} onChange={e => { setSearch(e.target.value); document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }); }} placeholder="Rechercher" aria-label="Rechercher un produit"/></label><button className="bag-button" onClick={() => setCartOpen(true)} aria-label="Ouvrir le panier"><ShoppingBag size={20}/><span>Panier</span><b>{count}</b></button></div>
    </header>

    <main id="top">
      <section className="hero">
        <div className="hero-copy"><p className="eyebrow"><span className="eyebrow-line"/> COLLECTION SÉLECTIONNÉE · DAKHLA</p><h1>Ton style.<br/><em>Ta signature.</em></h1><p className="hero-description">Des essentiels streetwear aux parfums qui marquent les esprits. Compose ton univers, pièce par pièce.</p><div className="hero-buttons"><button className="button button-light" onClick={() => goToShop('Vêtements')}>Explorer la collection <ArrowRight size={17}/></button><button className="text-link light-link" onClick={() => goToShop('Parfums')}>Découvrir les parfums <ArrowDownRight size={17}/></button></div><div className="hero-bottom-note"><span>01 / STYLE</span><span>02 / SCENT</span><span>03 / PRESENCE</span></div></div>
        <div className="hero-image-wrap"><img className="hero-image" src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1500&q=90" alt="Style streetwear homme dans une ambiance urbaine"/><div className="hero-image-overlay"/><div className="hero-sticker"><span>MOHSIN</span><b>Wear your<br/>presence.</b><ArrowDownRight size={22}/></div><div className="hero-vertical">DAKHLA · MOROCCO</div></div>
      </section>

      <section className="ticker" aria-label="Nos engagements"><div>STYLE SANS EFFORT <span>✳</span> PARFUMS À TON RYTHME <span>✳</span> PENSÉ POUR TOI <span>✳</span> STYLE SANS EFFORT <span>✳</span> PARFUMS À TON RYTHME <span>✳</span></div></section>

      <section className="category-section"><div className="section-heading"><div><p className="eyebrow">CHOISIS TON UNIVERS</p><h2>Deux moods.<br/><em>Une seule attitude.</em></h2></div><p className="section-intro">Les bonnes pièces. Les bonnes notes. Tout ce qu'il faut pour laisser une impression.</p></div><div className="category-cards">
        <button className="category-card category-fashion" onClick={() => goToShop('Vêtements')}><img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85" alt="Look streetwear homme"/><span className="category-shade"/><span className="category-label"><small>01 — LE VESTIAIRE</small><strong>Vêtements<br/>homme</strong><span className="round-arrow"><ArrowDownRight/></span></span></button>
        <button className="category-card category-scent" onClick={() => goToShop('Parfums')}><img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=85" alt="Collection de parfums"/><span className="category-shade"/><span className="category-label"><small>02 — LA SIGNATURE</small><strong>Parfums<br/>de décantation</strong><span className="round-arrow"><ArrowDownRight/></span></span></button>
      </div></section>

      <section className="shop-section" id="shop"><div className="section-heading shop-heading"><div><p className="eyebrow">LA SÉLECTION MOHSIN</p><h2>Les pièces <em>du moment.</em></h2></div><p className="section-intro">Une sélection mixte, pensée pour les journées en mouvement et les soirées qui comptent.</p></div>
        <div className="shop-toolbar"><div className="category-pills">{['Tout voir','Vêtements','Parfums','T-shirts','Pantalons','Sweats & hoodies','Ensembles'].map(c => <button key={c} className={activeCategory === c ? 'pill active' : 'pill'} onClick={() => setActiveCategory(c)}>{c}</button>)}</div><label className="sort-select">Trier par <select value={sort} onChange={e => setSort(e.target.value)}><option value="featured">Sélection</option><option value="price-asc">Prix croissant</option><option value="price-desc">Prix décroissant</option></select><ChevronDown size={14}/></label></div>
        <div className="product-grid">{filtered.map((p, i) => <article className="product-card" key={p.id}><button className="product-image-button" onClick={() => setSelected(p)} aria-label={`Voir ${p.name}`}><img src={p.image} alt={p.name} loading="lazy"/><span className="image-index">{String(i+1).padStart(2,'0')}</span>{p.badge && <span className="product-badge">{p.badge}</span>}<span className="quick-view">Voir le produit <ArrowUpRightIcon/></span></button><div className="product-meta"><div><p className="product-category">{p.category}</p><h3>{p.name}</h3><p className="product-color">{p.color}</p></div><div className="product-price">{money(p.price)}{p.oldPrice && <del>{money(p.oldPrice)}</del>}</div></div><button className="add-button" onClick={() => beginAdd(p)}>{p.type === 'perfume' ? 'Choisir le volume' : 'Choisir la taille'} <Plus size={16}/></button></article>)}</div>
        {filtered.length === 0 && <div className="empty-search"><Search/><h3>Aucun produit trouvé</h3><p>Essaie un autre mot ou change de catégorie.</p><button className="button button-dark" onClick={() => {setSearch('');setActiveCategory('Tout voir')}}>Voir tous les produits</button></div>}
        <p className="demo-note">Catalogue de démonstration : les photos, noms, prix et références de parfums sont des exemples à valider avec la boutique avant publication.</p>
      </section>

      <section className="manifesto" id="about"><div className="manifesto-image"><img src="https://images.unsplash.com/photo-1506629905607-d9f5b6a2b4b3?auto=format&fit=crop&w=1100&q=85" alt="Détail de mode masculine" loading="lazy"/><span>EST. DAKHLA</span></div><div className="manifesto-copy"><p className="eyebrow">L'ESPRIT MOHSIN</p><h2>Pas besoin d'en faire trop.<br/><em>Juste d'être toi.</em></h2><p>Des vêtements faciles à associer. Des parfums à découvrir à ton rythme. MOHSIN réunit les détails qui font la différence, avec une expérience simple et directe.</p><div className="manifesto-values"><div><span>01</span><b>Ton style, tes règles</b></div><div><span>02</span><b>Découvre ta signature olfactive</b></div><div><span>03</span><b>Commande simplement à Dakhla</b></div></div><button className="button button-dark" onClick={() => goToShop('Tout voir')}>Trouver mes essentiels <ArrowRight size={17}/></button></div></section>

      <section className="service-strip"><div><Truck/><span><b>Livraison locale</b><small>Dakhla uniquement</small></span></div><div><ShieldCheck/><span><b>Paiement à la livraison</b><small>Tu paies à la réception</small></span></div><div><ShoppingBag/><span><b>Commande simple</b><small>Ton panier, tes choix</small></span></div><div><MapPin/><span><b>Une boutique locale</b><small>Basée à Dakhla</small></span></div></section>
    </main>

    <footer className="footer"><div className="footer-top"><div><a className="wordmark footer-logo" href="#top">MOHSIN<span>®</span></a><p>Wear your presence.</p></div><div className="footer-links"><div><b>Explorer</b><button onClick={() => goToShop('Vêtements')}>Vêtements</button><button onClick={() => goToShop('Parfums')}>Parfums</button><button onClick={() => goToShop('Tout voir')}>Tous les produits</button></div><div><b>Informations</b><a href="#about">Notre univers</a><a href="#shop">Livraison à Dakhla</a><a href="mailto:contact@mohsin.example">Nous contacter</a></div></div><a className="instagram-link" href="https://www.instagram.com/" target="_blank" rel="noreferrer"><Instagram/> Suivre l'univers <ArrowRight size={16}/></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} MOHSIN. Tous droits réservés.</span><span>Fait pour Dakhla, Maroc.</span><a href="#top">Retour en haut ↑</a></div></footer>

    {notice && <div className="toast"><Check size={17}/>{notice}</div>}

    {cartOpen && <div className="overlay" onMouseDown={e => {if(e.target === e.currentTarget) setCartOpen(false)}}><aside className="drawer"><div className="drawer-head"><div><p className="eyebrow">TA SÉLECTION</p><h2>Ton panier <span>({count})</span></h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Fermer"><X/></button></div>{cart.length === 0 ? <div className="cart-empty"><ShoppingBag size={36}/><h3>Ton panier est vide.</h3><p>Les bonnes pièces t'attendent.</p><button className="button button-dark" onClick={() => {setCartOpen(false);goToShop('Tout voir')}}>Explorer la boutique <ArrowRight size={16}/></button></div> : <><div className="cart-items">{cart.map(item => <div className="cart-item" key={item.key}><img src={item.image} alt={item.name}/><div className="cart-item-info"><h3>{item.name}</h3><p>{item.variant}</p><b>{money(item.price)}</b><div className="qty-control"><button onClick={() => changeQty(item.key,-1)} aria-label="Diminuer"><Minus size={13}/></button><span>{item.qty}</span><button onClick={() => changeQty(item.key,1)} aria-label="Augmenter"><Plus size={13}/></button></div></div><button className="remove-item" onClick={() => setCart(old => old.filter(i => i.key !== item.key))} aria-label="Supprimer"><X size={16}/></button></div>)}</div><div className="cart-summary"><div><span>Sous-total</span><b>{money(subtotal)}</b></div><div><span>Livraison à Dakhla</span><b>{shipping === 0 ? 'Offerte' : money(shipping)}</b></div>{subtotal > 0 && subtotal < 600 && <p className="shipping-hint">Ajoute {money(600-subtotal)} pour profiter de la livraison offerte.</p>}<div className="total-line"><span>Total estimé</span><b>{money(total)}</b></div><button className="button button-dark full-button" onClick={() => {setCartOpen(false);setCheckoutOpen(true)}}>Passer la commande <ArrowRight size={17}/></button><small>Paiement à la livraison · Dakhla uniquement</small></div></>}</aside></div>}

    {checkoutOpen && <div className="overlay modal-overlay" onMouseDown={e => {if(e.target === e.currentTarget) setCheckoutOpen(false)}}><div className="checkout-modal"><div className="drawer-head"><div><p className="eyebrow">DERNIÈRE ÉTAPE</p><h2>Finaliser la commande</h2></div><button className="icon-button" onClick={() => setCheckoutOpen(false)} aria-label="Fermer"><X/></button></div><div className="checkout-total"><span>Total à payer à la livraison</span><strong>{money(total)}</strong></div><form onSubmit={confirmOrder} className="checkout-form"><label>Nom complet<input required minLength="2" value={form.name} onChange={e => setForm({...form,name:e.target.value})} placeholder="Ton nom et prénom"/></label><label>Numéro de téléphone<input required type="tel" pattern="[0-9+() .-]{8,20}" value={form.phone} onChange={e => setForm({...form,phone:e.target.value})} placeholder="06 00 00 00 00"/></label><label>Adresse à Dakhla<textarea required minLength="5" value={form.address} onChange={e => setForm({...form,address:e.target.value})} placeholder="Quartier, rue, repère..." rows="2"/></label><label>Note pour la livraison <span className="optional">(facultatif)</span><textarea value={form.notes} onChange={e => setForm({...form,notes:e.target.value})} placeholder="Une précision pour le livreur" rows="2"/></label><div className="payment-method"><span className="payment-icon"><Check/></span><span><b>Paiement à la livraison</b><small>Tu règles ta commande à la réception.</small></span><span className="cod-pill">COD</span></div><p className="form-disclaimer">En confirmant, tu envoies une commande de démonstration enregistrée sur cet appareil. Aucun paiement n'est prélevé.</p><button className="button button-dark full-button" type="submit">Confirmer la commande <ArrowRight size={17}/></button></form></div></div>}

    {selected && <div className="overlay modal-overlay" onMouseDown={e => {if(e.target === e.currentTarget) setSelected(null)}}><div className="product-modal"><button className="icon-button modal-close" onClick={() => setSelected(null)} aria-label="Fermer"><X/></button><div className="product-modal-image"><img src={selected.image} alt={selected.name}/></div><div className="product-modal-content"><p className="eyebrow">{selected.category}</p><h2>{selected.name}</h2><div className="modal-price">{money(selected.price)} {selected.oldPrice && <del>{money(selected.oldPrice)}</del>}</div><p className="modal-description">{selected.description}</p><p className="option-label">{selected.type === 'perfume' ? 'Choisis le volume' : 'Choisis ta taille'}</p><div className="option-list">{(selected.type === 'perfume' ? selected.volumes : selected.sizes).map(opt => <button key={opt} className={(selection[selected.id]?.[selected.type === 'perfume' ? 'volume' : 'size'] || (selected.type === 'perfume' ? selected.volumes[0] : selected.sizes[0])) === opt ? 'option active-option' : 'option'} onClick={() => setSelection(old => ({...old,[selected.id]:{...old[selected.id],[selected.type === 'perfume' ? 'volume' : 'size']:opt}}))}>{opt}</button>)}</div>{selected.type === 'perfume' && <p className="decant-note">Les noms et références des parfums doivent être confirmés par la boutique. Ne présenter comme originaux que les décants authentiques et traçables.</p>}<button className="button button-dark full-button" onClick={() => addToCart(selected, selection[selected.id] || (selected.type === 'perfume' ? {volume:selected.volumes[0]} : {size:selected.sizes[0]}))}>Ajouter au panier · {money(selected.price)} <Plus size={17}/></button></div></div></div>}

    {orderSuccess && <div className="overlay modal-overlay"><div className="success-modal"><div className="success-check"><Check size={28}/></div><p className="eyebrow">COMMANDE ENREGISTRÉE</p><h2>Merci, {orderSuccess.customer.name.split(' ')[0]}.</h2><p>Ta commande de démonstration est enregistrée sur cet appareil. La boutique devra te contacter pour confirmer la disponibilité et la livraison à Dakhla.</p><div className="order-reference"><span>Référence</span><b>{orderSuccess.id}</b></div><div className="order-reference"><span>Total à payer à la livraison</span><b>{money(orderSuccess.total)}</b></div><button className="button button-dark full-button" onClick={() => setOrderSuccess(null)}>Continuer les achats <ArrowRight size={17}/></button><small>Version prototype : aucune notification n'est envoyée au vendeur.</small></div></div>}
  </div>;
}
function ArrowUpRightIcon(){ return <ArrowRight size={16}/> }
