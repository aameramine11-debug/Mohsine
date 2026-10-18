import { useEffect, useMemo, useState } from 'react';
import { ArrowDownRight, ArrowRight, Check, ChevronDown, Minus, Plus, Search, ShoppingBag, X, Menu, Instagram, MapPin, ShieldCheck, Truck } from 'lucide-react';

const products = [
  // 5 hoodies
  { id: 1, name: 'Hoodie Essential Noir', category: 'Sweats & hoodies', type: 'clothing', price: 329, badge: 'BEST-SELLER', color: 'Noir', sizes: ['S','M','L','XL'], image: 'https://eu.arntreal.com/cdn/shop/files/DSC08302_4a753d63-6049-4fdd-9aaa-8a60509a6a57.jpg?v=1753795503&width=3336', description: 'Hoodie homme minimaliste, coupe confortable.' },
  { id: 2, name: 'Hoodie Oversize Graphite', category: 'Sweats & hoodies', type: 'clothing', price: 349, color: 'Graphite', sizes: ['S','M','L','XL'], image: 'https://www.prohibited.shop/cdn/shop/files/OversizedHoodieGreyMelange_01.jpg?v=1772102496&width=3000', description: 'Coupe oversize pour une silhouette streetwear.' },
  { id: 3, name: 'Hoodie Urban Beige', category: 'Sweats & hoodies', type: 'clothing', price: 339, color: 'Beige', sizes: ['S','M','L','XL'], image: 'https://cdn11.bigcommerce.com/s-nb5it5hcrj/images/stencil/1200w/products/68771/413037/mcb8c1_001_cottonblendmenshoodie20250313060647_1__18635.1759141808.jpg?compression=lossy', description: 'Hoodie beige facile à associer au quotidien.' },
  { id: 4, name: 'Hoodie Zip Sport', category: 'Sweats & hoodies', type: 'clothing', price: 379, color: 'Gris clair', sizes: ['S','M','L','XL'], image: 'https://www.evokeuniforms.com.au/cdn/shop/files/5109_SUPPLY_ZIP_HOOD_MAIN__24947.1723178989_800x.jpg?v=1725242921', description: 'Hoodie zippé gris avec une coupe confortable et un style sportif.' },
  { id: 5, name: 'Hoodie Zip Blanc', category: 'Sweats & hoodies', type: 'clothing', price: 359, color: 'Blanc', sizes: ['S','M','L','XL'], image: 'https://cdn11.bigcommerce.com/s-12aon899vh/images/stencil/original/products/429/2632/2105_hooded_Zipper_white_male__30664.1771361779.jpg?c=1', description: 'Hoodie zippé blanc, une pièce simple et facile à superposer.' },

  // 5 baggy / relaxed trousers
  { id: 6, name: 'Baggy Denim Blue', category: 'Baggy', type: 'clothing', price: 299, badge: 'STREET', color: 'Bleu denim', sizes: ['S','M','L','XL'], image: 'https://newgarments.store/cdn/shop/files/Sc308775c133d425bbc043f9d468880849.webp?v=1764011842&width=1080', description: 'Jean baggy homme, coupe ample et actuelle.' },
  { id: 7, name: 'Baggy Cargo Olive', category: 'Baggy', type: 'clothing', price: 319, color: 'Olive', sizes: ['S','M','L','XL'], image: 'https://i.ebayimg.com/images/g/JH4AAOSwO9ZndxA4/s-l1200.jpg', description: 'Pantalon cargo ample avec esprit utilitaire.' },
  { id: 8, name: 'Baggy Cargo Noir', category: 'Baggy', type: 'clothing', price: 319, color: 'Noir', sizes: ['S','M','L','XL'], image: 'https://i5.walmartimages.com/asr/7eab428b-1dd3-4487-bb9c-1a01bd684932.e98b1573f2e60ee479774b32f7ef3107.jpeg?odnBg=FFFFFF&odnHeight=768&odnWidth=768', description: 'Pantalon ample noir pour les looks street.' },
  { id: 9, name: 'Baggy Denim Bleu Clair', category: 'Baggy', type: 'clothing', price: 279, color: 'Bleu clair', sizes: ['S','M','L','XL'], image: 'https://statics-mp.boyner.com.tr/mnresize/900/1254/Boynerimages/5003294333_452_20250819180858515.jpg?v=1768379051', description: 'Jean baggy bleu clair, coupe ample et style streetwear.' },
  { id: 10, name: 'Jean Straight Bleu Brut', category: 'Baggy', type: 'clothing', price: 309, color: 'Bleu brut', sizes: ['S','M','L','XL'], image: 'https://levi.pt/content/img/levis_jeam_masculino_555-relaxed-straight-jeans-000lo-0035_check-the-score_5.jpg', description: 'Jean droit décontracté avec une coupe moderne, facile à combiner.' },

  // 5 classic / smart casual pieces
  { id: 11, name: 'Chemise Oxford Blanche', category: 'Classique', type: 'clothing', price: 259, badge: 'CLASSIQUE', color: 'Blanc', sizes: ['S','M','L','XL'], image: 'https://www.jepsons.co.uk/cdn/shop/files/White10005500_1.jpg?v=1738064761', description: 'Chemise homme classique pour un style soigné.' },
  { id: 12, name: 'Pantalon Chino Beige', category: 'Classique', type: 'clothing', price: 299, color: 'Beige', sizes: ['M','L','XL'], image: 'https://www.barbour.com/dw/image/v2/BLCL_PRD/on/demandware.static/-/Sites-master-catalog/default/dw063e545f/images/MTR0728ST17/MTR0728ST17_01front.jpg?q=70&strip=false&sw=1500', description: 'Chino beige coupe soignée, idéal pour un look élégant ou smart casual.' },
  { id: 13, name: 'Blazer Smart Casual', category: 'Classique', type: 'clothing', price: 599, color: 'Bleu marine', sizes: ['M','L','XL'], image: 'https://sa.lawrencepur.com/cdn/shop/files/01_d7722733-75f5-4c2d-acc1-be49a8bb574c.jpg?v=1747836213', description: 'Veste structurée pour les occasions et sorties.' },
  { id: 14, name: 'Pull Col Rond Beige', category: 'Classique', type: 'clothing', price: 149, color: 'Beige', sizes: ['S','M','L','XL'], image: 'https://linjebutikk.com/cdn/shop/files/ChatGPTImageJan22_2026_03_13_45PM.png?v=1769066596', description: 'Pull col rond beige, sobre et facile à associer à un jean ou un chino.' },
  { id: 15, name: 'Polo Maille Navy', category: 'Classique', type: 'clothing', price: 189, color: 'Bleu marine', sizes: ['S','M','L','XL'], image: 'https://academybrand.com/cdn/shop/files/RILEYKNITPOLO-NAVY-B_7f514b7f-0cac-4a80-9a76-ba92998fd571.jpg?v=1764733089&width=800', description: 'Polo en maille texturée, élégant avec un pantalon beige ou un jean.' },

  // Sport and outfit essentials
  { id: 16, name: 'Ensemble Training Noir', category: 'Sport', type: 'clothing', price: 349, badge: 'SPORT', color: 'Noir', sizes: ['S','M','L','XL'], image: 'https://media.rundna.com.au/3e6e04dc-0d3f-481b-b714-144fa62ad64c__L.jpg', description: 'Ensemble sportif pour entraînement et quotidien.' },
  { id: 17, name: 'T-shirt Performance Noir', category: 'Sport', type: 'clothing', price: 129, color: 'Noir', sizes: ['S','M','L','XL'], image: 'https://athletic-aesthetics.de/cdn/shop/files/core-performance-t-shirt-blackblack-3063983.jpg?v=1756200693', description: 'T-shirt technique noir pour les entraînements et les journées actives.' },
  { id: 18, name: 'Jogger Sport Gris', category: 'Sport', type: 'clothing', price: 219, color: 'Gris', sizes: ['S','M','L','XL'], image: 'https://vraigarcon.com/cdn/shop/files/jogger-olympia-grey-664652.jpg?v=1746561756&width=2048', description: 'Jogger confortable pour sport et sorties.' },
  { id: 19, name: 'Look Chemise Bleue & Chino Beige', category: 'Ensembles', type: 'clothing', price: 399, color: 'Bleu ciel / beige', sizes: ['S','M','L','XL'], image: 'https://oechsle.vteximg.com.br/arquivos/ids/23999053-800-800/2945631.jpg?v=639052913645230000', description: 'Association chemise bleu ciel et chino beige pour une tenue smart casual.' },
  { id: 20, name: 'Veste Bomber Noire', category: 'Vestes', type: 'clothing', price: 429, color: 'Noir', sizes: ['M','L','XL'], image: 'https://static.housebrand.com/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/3/4/346AA-99X-001-1-786870_2.jpg', description: 'Veste homme au style urbain et affirmé.' },

  // Men's fragrance decants. Prices are demo values to confirm with the shop.
  { id: 21, name: 'Afnan 9PM Rebel — Décant', category: 'Parfums', type: 'perfume', price: 45, volumePrices: {'5 ml':45,'10 ml':80,'20 ml':145}, volumes: ['5 ml','10 ml','20 ml'], badge: 'TENDANCE', color: 'Fruité / ambré', image: 'https://www.monarca.com.py/cdn/shop/files/6.png?v=1768474666&width=1445', description: 'Décant inspiré de la référence 9PM Rebel. Vérifier disponibilité et authenticité avant publication.' },
  { id: 22, name: 'Bleu de Chanel — Décant', category: 'Parfums', type: 'perfume', price: 55, volumePrices: {'5 ml':55,'10 ml':99,'20 ml':185}, volumes: ['5 ml','10 ml','20 ml'], badge: 'ICONIQUE', color: 'Boisé / aromatique', image: 'https://perfumes.ec/cdn/shop/files/ChanelBleuDeChanel100ml.png?v=1700319988', description: 'Profil boisé aromatique. Référence à confirmer avec le fournisseur.' },
  { id: 23, name: 'Dior Sauvage — Décant', category: 'Parfums', type: 'perfume', price: 49, volumePrices: {'5 ml':49,'10 ml':89,'20 ml':165}, volumes: ['5 ml','10 ml','20 ml'], color: 'Frais / épicé', image: 'https://www.sephora.com.mx/on/demandware.static/-/Sites-masterCatalog_Sephora/es_MX/dwdefc1b76/images/hi-res/eau-de-toilette-dior-dior-sauvage-eau-de-toilette-100ml3348901250146A.jpg', description: 'Décant de référence masculine populaire, authenticité à vérifier.' },
  { id: 24, name: 'YSL Y EDP — Décant', category: 'Parfums', type: 'perfume', price: 49, volumePrices: {'5 ml':49,'10 ml':89,'20 ml':165}, volumes: ['5 ml','10 ml','20 ml'], color: 'Frais / boisé', image: 'https://beautyhouse.com/cdn/shop/files/01bdmtewnr.jpg?v=1760981447&width=1492', description: 'Profil frais et boisé. Prix de démonstration à confirmer.' },
  { id: 25, name: 'Versace Eros — Décant', category: 'Parfums', type: 'perfume', price: 45, volumePrices: {'5 ml':45,'10 ml':80,'20 ml':149}, volumes: ['5 ml','10 ml','20 ml'], color: 'Menthe / vanille', image: 'https://beautyhouse.com/cdn/shop/files/01_4184d4c1-077a-47e9-9e9c-16ad205cd65a.png?v=1776705660&width=1600', description: 'Accords frais et doux, référence à confirmer.' },
  { id: 26, name: 'Jean Paul Gaultier Le Male — Décant', category: 'Parfums', type: 'perfume', price: 49, volumePrices: {'5 ml':49,'10 ml':89,'20 ml':165}, volumes: ['5 ml','10 ml','20 ml'], color: 'Lavande / vanille', image: 'https://beautyhouse.com/cdn/shop/files/018owr58wr_1600x.png?v=1750805441', description: 'Profil aromatique gourmand. Prix indicatifs de démonstration.' },
  { id: 27, name: 'Armani Stronger With You — Décant', category: 'Parfums', type: 'perfume', price: 55, volumePrices: {'5 ml':55,'10 ml':99,'20 ml':185}, volumes: ['5 ml','10 ml','20 ml'], color: 'Ambré / gourmand', image: 'https://www.parfumswinkel.nl/cdn/shop/files/c16a175e465cc24c0f0221f9daabf171a521998ce0e93ee516cda90dca3a1f1d.jpg?v=1779357976&width=800', description: 'Accords chauds et gourmands. Référence à valider.' },
  { id: 28, name: 'Lattafa Asad — Décant', category: 'Parfums', type: 'perfume', price: 35, volumePrices: {'5 ml':35,'10 ml':65,'20 ml':119}, volumes: ['5 ml','10 ml','20 ml'], color: 'Épicé / ambré', image: 'https://www.opulensi.com/cdn/shop/files/AsadMain.jpg?v=1683748573&width=1445', description: 'Profil épicé et ambré, prix indicatifs.' },
  { id: 29, name: 'Azzaro The Most Wanted — Décant', category: 'Parfums', type: 'perfume', price: 55, volumePrices: {'5 ml':55,'10 ml':99,'20 ml':185}, volumes: ['5 ml','10 ml','20 ml'], color: 'Épicé / boisé', image: 'https://i1.perfumesclub.com/grande/169965.jpg', description: 'Parfum masculin à profil épicé. Disponibilité à confirmer.' },
  { id: 30, name: 'Paco Rabanne Invictus — Décant', category: 'Parfums', type: 'perfume', price: 45, volumePrices: {'5 ml':45,'10 ml':80,'20 ml':149}, volumes: ['5 ml','10 ml','20 ml'], color: 'Frais / marin', image: 'https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000000491327901/FJmYq29ezWf-000000000491327901_1.jpg', description: 'Profil frais et énergique, prix indicatifs.' },
  { id: 31, name: 'Montblanc Explorer — Décant', category: 'Parfums', type: 'perfume', price: 39, volumePrices: {'5 ml':39,'10 ml':69,'20 ml':129}, volumes: ['5 ml','10 ml','20 ml'], color: 'Boisé / agrumes', image: 'https://media.kohlsimg.com/is/image/kohls/6193395?hei=1000&op_sharpen=1&wid=1000', description: 'Accords boisés et agrumes. Référence à confirmer.' },
  { id: 32, name: 'Hugo Boss Bottled — Décant', category: 'Parfums', type: 'perfume', price: 39, volumePrices: {'5 ml':39,'10 ml':69,'20 ml':129}, volumes: ['5 ml','10 ml','20 ml'], color: 'Pomme / boisé', image: 'https://www.faces.sa/dw/image/v2/BJSM_PRD/on/demandware.static/-/Sites-faces-master-catalog/default/dw4afbc026/product/3614229828535_1/3614229828535_1.jpg?sh=800&sw=800', description: 'Profil fruité et boisé, prix de démonstration.' },
  { id: 33, name: 'Givenchy Gentleman — Décant', category: 'Parfums', type: 'perfume', price: 49, volumePrices: {'5 ml':49,'10 ml':89,'20 ml':165}, volumes: ['5 ml','10 ml','20 ml'], color: 'Iris / boisé', image: 'https://beautyhouse.com/cdn/shop/files/01_e0884ff3-6f56-4dfe-a858-ba7cb612fc61.jpg?v=1728929665&width=1600', description: 'Profil élégant et boisé, disponibilité à confirmer.' },
];

const WHATSAPP_NUMBER = '212606210645'; // Numéro du vendeur au format international sans +
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
    const chosenPrice = product.type === 'perfume' ? (product.volumePrices?.[variant] ?? product.price) : product.price;
    setCart(old => {
      const found = old.find(i => i.key === key);
      return found ? old.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i) : [...old, { key, id: product.id, name: product.name, price: chosenPrice, image: product.image, variant, qty: 1, type: product.type }];
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
    const lines = cart.map((item, index) => `${index + 1}. ${item.name} (${item.variant}) x${item.qty} — ${money(item.price * item.qty)}`);
    const message = [
      'Bonjour MOHSIN, je souhaite confirmer cette commande :',
      '',
      ...lines,
      '',
      `Sous-total : ${money(subtotal)}`,
      `Livraison : ${shipping === 0 ? 'Offerte' : money(shipping)}`,
      `TOTAL : ${money(total)}`,
      '',
      'INFORMATIONS CLIENT',
      `Nom : ${form.name}`,
      `Téléphone : ${form.phone}`,
      `Adresse à Dakhla : ${form.address}`,
      `Note : ${form.notes || 'Aucune'}`,
      '',
      'Paiement à la livraison.'
    ].join('\n');
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setOrderSuccess({ id: `MH-${Date.now().toString().slice(-7)}`, customer: form, total, whatsapp: true });
    setCart([]);
    setCheckoutOpen(false);
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
        <div className="hero-image-wrap"><img className="hero-image" src="https://hordabrand.com/cdn/shop/files/Felpa-REVERSE-380g-Boxy-Fit-_-Felpa-Pesante-Oversize-Streetwear-Horda-Brand-Streetwear-170267639.jpg?v=1757593689&width=3840" alt="Modèle homme portant un hoodie streetwear oversize"/><div className="hero-image-overlay"/><div className="hero-sticker"><span>MOHSIN</span><b>Wear your<br/>presence.</b><ArrowDownRight size={22}/></div><div className="hero-vertical">DAKHLA · MOROCCO</div></div>
      </section>

      <section className="ticker" aria-label="Nos engagements"><div className="ticker-track"><span>STYLE SANS EFFORT <i>✳</i> PARFUMS À TON RYTHME <i>✳</i> PENSÉ POUR TOI <i>✳</i> STYLE SANS EFFORT <i>✳</i> PARFUMS À TON RYTHME <i>✳</i> PENSÉ POUR TOI <i>✳</i></span><span aria-hidden="true">STYLE SANS EFFORT <i>✳</i> PARFUMS À TON RYTHME <i>✳</i> PENSÉ POUR TOI <i>✳</i> STYLE SANS EFFORT <i>✳</i> PARFUMS À TON RYTHME <i>✳</i> PENSÉ POUR TOI <i>✳</i></span></div></section>

      <section className="category-section"><div className="section-heading"><div><p className="eyebrow">CHOISIS TON UNIVERS</p><h2>Deux moods.<br/><em>Une seule attitude.</em></h2></div><p className="section-intro">Les bonnes pièces. Les bonnes notes. Tout ce qu'il faut pour laisser une impression.</p></div><div className="category-cards">
        <button className="category-card category-fashion" onClick={() => goToShop('Vêtements')}><img src="https://www.hotelshops.gr/media/catalog/product/cache/37d072a322eb2b33b6e380d1091e9c86/G/s/Gstar_Mosa_Overshirt_1_1770028110_1.jpg" alt="Modèle homme portant une surchemise streetwear"/><span className="category-shade"/><span className="category-label"><small>01 — LE VESTIAIRE</small><strong>Vêtements<br/>homme</strong><span className="round-arrow"><ArrowDownRight/></span></span></button>
        <button className="category-card category-scent" onClick={() => goToShop('Parfums')}><img src="https://www.sephora.com.mx/on/demandware.static/-/Sites-masterCatalog_Sephora/es_MX/dwdefc1b76/images/hi-res/eau-de-toilette-dior-dior-sauvage-eau-de-toilette-100ml3348901250146A.jpg" alt="Flacon de parfum masculin Dior Sauvage"/><span className="category-shade"/><span className="category-label"><small>02 — LA SIGNATURE</small><strong>Parfums<br/>de décantation</strong><span className="round-arrow"><ArrowDownRight/></span></span></button>
      </div></section>

      <section className="shop-section" id="shop"><div className="section-heading shop-heading"><div><p className="eyebrow">LA SÉLECTION MOHSIN</p><h2>Les pièces <em>du moment.</em></h2></div><p className="section-intro">Une sélection 100 % homme : streetwear, pièces classiques, essentiels sportifs et parfums masculins.</p></div>
        <div className="shop-toolbar"><div className="category-pills">{['Tout voir','Vêtements','Parfums','Sweats & hoodies','Baggy','Classique','Ensembles','Sport','Vestes'].map(c => <button key={c} className={activeCategory === c ? 'pill active' : 'pill'} onClick={() => setActiveCategory(c)}>{c}</button>)}</div><label className="sort-select">Trier par <select value={sort} onChange={e => setSort(e.target.value)}><option value="featured">Sélection</option><option value="price-asc">Prix croissant</option><option value="price-desc">Prix décroissant</option></select><ChevronDown size={14}/></label></div>
        <div className="product-grid">{filtered.map((p, i) => <article className="product-card" key={p.id}><button className="product-image-button" onClick={() => setSelected(p)} aria-label={`Voir ${p.name}`}><img src={p.image} alt={p.name} loading="lazy"/><span className="image-index">{String(i+1).padStart(2,'0')}</span>{p.badge && <span className="product-badge">{p.badge}</span>}<span className="quick-view">Voir le produit <ArrowUpRightIcon/></span></button><div className="product-meta"><div><p className="product-category">{p.category}</p><h3>{p.name}</h3><p className="product-color">{p.color}</p></div><div className="product-price">{money(p.price)}{p.oldPrice && <del>{money(p.oldPrice)}</del>}</div></div><button className="add-button" onClick={() => beginAdd(p)}>{p.type === 'perfume' ? 'Choisir le volume' : 'Choisir la taille'} <Plus size={16}/></button></article>)}</div>
        {filtered.length === 0 && <div className="empty-search"><Search/><h3>Aucun produit trouvé</h3><p>Essaie un autre mot ou change de catégorie.</p><button className="button button-dark" onClick={() => {setSearch('');setActiveCategory('Tout voir')}}>Voir tous les produits</button></div>}
        <p className="demo-note">Catalogue de démonstration : les photos, noms, prix et références de parfums sont des exemples à valider avec la boutique avant publication.</p>
      </section>

      <section className="manifesto" id="about"><div className="manifesto-image"><img src="https://cdn.laredoute.com/cdn-cgi/image/width%3D650%2Cheight%3D650%2Cfit%3Dpad%2Cdpr%3D1/products/b/6/f/b6f3450e7d3a6ef1b7a865a6aad6f14e.jpg" alt="Modèle homme portant une surchemise olive" loading="lazy"/><span>EST. DAKHLA</span></div><div className="manifesto-copy"><p className="eyebrow">L'ESPRIT MOHSIN</p><h2>Pas besoin d'en faire trop.<br/><em>Juste d'être toi.</em></h2><p>Des vêtements faciles à associer. Des parfums à découvrir à ton rythme. MOHSIN réunit les détails qui font la différence, avec une expérience simple et directe.</p><div className="manifesto-values"><div><span>01</span><b>Ton style, tes règles</b></div><div><span>02</span><b>Découvre ta signature olfactive</b></div><div><span>03</span><b>Commande simplement à Dakhla</b></div></div><button className="button button-dark" onClick={() => goToShop('Tout voir')}>Trouver mes essentiels <ArrowRight size={17}/></button></div></section>

      <section className="service-strip"><div><Truck/><span><b>Livraison locale</b><small>Dakhla uniquement</small></span></div><div><ShieldCheck/><span><b>Paiement à la livraison</b><small>Tu paies à la réception</small></span></div><div><ShoppingBag/><span><b>Commande simple</b><small>Ton panier, tes choix</small></span></div><div><MapPin/><span><b>Une boutique locale</b><small>Basée à Dakhla</small></span></div></section>
    </main>

    <footer className="footer"><div className="footer-top"><div><a className="wordmark footer-logo" href="#top">MOHSIN<span>®</span></a><p>Wear your presence.</p></div><div className="footer-links"><div><b>Explorer</b><button onClick={() => goToShop('Vêtements')}>Vêtements</button><button onClick={() => goToShop('Parfums')}>Parfums</button><button onClick={() => goToShop('Tout voir')}>Tous les produits</button></div><div><b>Informations</b><a href="#about">Notre univers</a><a href="#shop">Livraison à Dakhla</a><a href="mailto:contact@mohsin.example">Nous contacter</a></div></div><a className="instagram-link" href="https://www.instagram.com/" target="_blank" rel="noreferrer"><Instagram/> Suivre l'univers <ArrowRight size={16}/></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} MOHSIN. Tous droits réservés.</span><span>Fait pour Dakhla, Maroc.</span><a href="#top">Retour en haut ↑</a></div></footer>

    {notice && <div className="toast"><Check size={17}/>{notice}</div>}

    {cartOpen && <div className="overlay" onMouseDown={e => {if(e.target === e.currentTarget) setCartOpen(false)}}><aside className="drawer"><div className="drawer-head"><div><p className="eyebrow">TA SÉLECTION</p><h2>Ton panier <span>({count})</span></h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Fermer"><X/></button></div>{cart.length === 0 ? <div className="cart-empty"><ShoppingBag size={36}/><h3>Ton panier est vide.</h3><p>Les bonnes pièces t'attendent.</p><button className="button button-dark" onClick={() => {setCartOpen(false);goToShop('Tout voir')}}>Explorer la boutique <ArrowRight size={16}/></button></div> : <><div className="cart-items">{cart.map(item => <div className="cart-item" key={item.key}><img src={item.image} alt={item.name}/><div className="cart-item-info"><h3>{item.name}</h3><p>{item.variant}</p><b>{money(item.price)}</b><div className="qty-control"><button onClick={() => changeQty(item.key,-1)} aria-label="Diminuer"><Minus size={13}/></button><span>{item.qty}</span><button onClick={() => changeQty(item.key,1)} aria-label="Augmenter"><Plus size={13}/></button></div></div><button className="remove-item" onClick={() => setCart(old => old.filter(i => i.key !== item.key))} aria-label="Supprimer"><X size={16}/></button></div>)}</div><div className="cart-summary"><div><span>Sous-total</span><b>{money(subtotal)}</b></div><div><span>Livraison à Dakhla</span><b>{shipping === 0 ? 'Offerte' : money(shipping)}</b></div>{subtotal > 0 && subtotal < 600 && <p className="shipping-hint">Ajoute {money(600-subtotal)} pour profiter de la livraison offerte.</p>}<div className="total-line"><span>Total estimé</span><b>{money(total)}</b></div><button className="button button-dark full-button" onClick={() => {setCartOpen(false);setCheckoutOpen(true)}}>Passer la commande <ArrowRight size={17}/></button><small>Paiement à la livraison · Dakhla uniquement</small></div></>}</aside></div>}

    {checkoutOpen && <div className="overlay modal-overlay" onMouseDown={e => {if(e.target === e.currentTarget) setCheckoutOpen(false)}}><div className="checkout-modal"><div className="drawer-head"><div><p className="eyebrow">DERNIÈRE ÉTAPE</p><h2>Finaliser la commande</h2></div><button className="icon-button" onClick={() => setCheckoutOpen(false)} aria-label="Fermer"><X/></button></div><div className="checkout-total"><span>Total à payer à la livraison</span><strong>{money(total)}</strong></div><form onSubmit={confirmOrder} className="checkout-form"><label>Nom complet<input required minLength="2" value={form.name} onChange={e => setForm({...form,name:e.target.value})} placeholder="Ton nom et prénom"/></label><label>Numéro de téléphone<input required type="tel" pattern="[0-9+() .-]{8,20}" value={form.phone} onChange={e => setForm({...form,phone:e.target.value})} placeholder="06 00 00 00 00"/></label><label>Adresse à Dakhla<textarea required minLength="5" value={form.address} onChange={e => setForm({...form,address:e.target.value})} placeholder="Quartier, rue, repère..." rows="2"/></label><label>Note pour la livraison <span className="optional">(facultatif)</span><textarea value={form.notes} onChange={e => setForm({...form,notes:e.target.value})} placeholder="Une précision pour le livreur" rows="2"/></label><div className="payment-method"><span className="payment-icon"><Check/></span><span><b>Paiement à la livraison</b><small>Tu règles ta commande à la réception.</small></span><span className="cod-pill">COD</span></div><p className="form-disclaimer">En cliquant, WhatsApp s’ouvre avec le récapitulatif de ta commande prêt à envoyer au vendeur. Paiement à la livraison à Dakhla.</p><button className="button button-dark full-button" type="submit">Commander sur WhatsApp <ArrowRight size={17}/></button></form></div></div>}

    {selected && <div className="overlay modal-overlay" onMouseDown={e => {if(e.target === e.currentTarget) setSelected(null)}}><div className="product-modal"><button className="icon-button modal-close" onClick={() => setSelected(null)} aria-label="Fermer"><X/></button><div className="product-modal-image"><img src={selected.image} alt={selected.name}/></div><div className="product-modal-content"><p className="eyebrow">{selected.category}</p><h2>{selected.name}</h2><div className="modal-price">{money(selected.type === 'perfume' ? (selected.volumePrices?.[selection[selected.id]?.volume || selected.volumes[0]] ?? selected.price) : selected.price)} {selected.oldPrice && <del>{money(selected.oldPrice)}</del>}<small className="price-context">{selected.type === 'perfume' ? `Prix pour ${(selection[selected.id]?.volume || selected.volumes[0])}` : 'Prix de l’article'}</small></div><p className="modal-description">{selected.description}</p><p className="option-label">{selected.type === 'perfume' ? 'Choisis le volume' : 'Choisis ta taille'}</p><div className="option-list">{(selected.type === 'perfume' ? selected.volumes : selected.sizes).map(opt => <button key={opt} className={(selection[selected.id]?.[selected.type === 'perfume' ? 'volume' : 'size'] || (selected.type === 'perfume' ? selected.volumes[0] : selected.sizes[0])) === opt ? 'option active-option' : 'option'} onClick={() => setSelection(old => ({...old,[selected.id]:{...old[selected.id],[selected.type === 'perfume' ? 'volume' : 'size']:opt}}))}>{opt}{selected.type === 'perfume' && <small className="option-price">{money(selected.volumePrices?.[opt] ?? selected.price)}</small>}</button>)}</div>{selected.type === 'perfume' && <p className="decant-note">Prix et références de démonstration : confirme les tarifs et l’authenticité auprès du fournisseur avant publication.</p>}<button className="button button-dark full-button" onClick={() => addToCart(selected, selection[selected.id] || (selected.type === 'perfume' ? {volume:selected.volumes[0]} : {size:selected.sizes[0]}))}>Ajouter au panier · {money(selected.type === 'perfume' ? (selected.volumePrices?.[selection[selected.id]?.volume || selected.volumes[0]] ?? selected.price) : selected.price)} <Plus size={17}/></button></div></div></div>}

    {orderSuccess && <div className="overlay modal-overlay"><div className="success-modal"><div className="success-check"><Check size={28}/></div><p className="eyebrow">COMMANDE ENREGISTRÉE</p><h2>Merci, {orderSuccess.customer.name.split(' ')[0]}.</h2><p>Ton récapitulatif est prêt dans WhatsApp. Envoie le message pour transmettre ta commande à la boutique et confirmer la livraison à Dakhla.</p><div className="order-reference"><span>Référence</span><b>{orderSuccess.id}</b></div><div className="order-reference"><span>Total à payer à la livraison</span><b>{money(orderSuccess.total)}</b></div><button className="button button-dark full-button" onClick={() => setOrderSuccess(null)}>Continuer les achats <ArrowRight size={17}/></button><small>Si WhatsApp ne s’ouvre pas, vérifie le numéro configuré dans le code.</small></div></div>}
  </div>;
}
function ArrowUpRightIcon(){ return <ArrowRight size={16}/> }
