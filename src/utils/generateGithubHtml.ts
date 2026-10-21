import { MENU_PAGES_CONFIG, MENU_ITEMS } from '../data/menuData';

export function generateStandaloneGithubHtml(): string {
  const pagesJson = JSON.stringify(MENU_PAGES_CONFIG);
  const itemsJson = JSON.stringify(MENU_ITEMS);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
  <title>Baroc Hotel - Digital Restaurant Menu</title>
  <meta name="description" content="Official Baroc Hotel virtual menu. Authentic Ethiopian delicacies, Tibs, Kitfo, Fasting dishes, Burgers, Pizza and Beverages.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Noto+Sans+Ethiopic:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      background-color: #f5f5f4;
      color: #1c1917;
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      overflow-x: hidden;
      width: 100%;
      max-width: 100vw;
      line-height: 1.4;
      -webkit-font-smoothing: antialiased;
    }
    header {
      background: #ffffff;
      border-bottom: 2px solid #f59e0b;
      position: sticky;
      top: 0;
      z-index: 50;
      box-shadow: 0 2px 10px rgba(0,0,0,0.06);
    }
    .header-top {
      max-width: 800px;
      margin: 0 auto;
      padding: 10px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
    }
    .brand-logo {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: #b45309;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Cinzel', serif;
      font-weight: 900;
      font-size: 20px;
      flex-shrink: 0;
      box-shadow: 0 1px 4px rgba(180,83,9,0.3);
    }
    .brand-title {
      font-family: 'Cinzel', serif;
      font-size: 18px;
      font-weight: 900;
      color: #1c1917;
      letter-spacing: 0.5px;
      line-height: 1.1;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .brand-am-tag {
      font-size: 11px;
      background: #fef3c7;
      color: #92400e;
      border: 1px solid #fde68a;
      padding: 1px 6px;
      border-radius: 4px;
      font-family: 'Noto Sans Ethiopic', sans-serif;
      font-weight: 700;
    }
    .brand-sub {
      font-size: 11px;
      color: #78716c;
      font-weight: 500;
      margin-top: 1px;
    }
    .controls {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }
    .pill-btn {
      background: #f5f5f4;
      border: 1px solid #e7e5e4;
      color: #44403c;
      padding: 6px 9px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
    }
    .order-badge-btn {
      background: #d97706;
      color: #ffffff;
      border: none;
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 1px 4px rgba(217,119,6,0.3);
    }
    .search-row {
      max-width: 800px;
      margin: 0 auto;
      padding: 4px 14px 10px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    @media (min-width: 600px) {
      .search-row {
        flex-direction: row;
        align-items: center;
      }
    }
    .search-input {
      flex: 1;
      background: #f5f5f4;
      border: 1px solid #e7e5e4;
      border-radius: 8px;
      padding: 7px 12px;
      font-size: 13px;
      color: #1c1917;
      outline: none;
    }
    .search-input:focus {
      border-color: #d97706;
      background: #ffffff;
    }
    /* Toggle between Page by Page and One Page Scroll */
    .view-toggle-wrap {
      display: flex;
      background: #f5f5f4;
      padding: 2px;
      border-radius: 8px;
      border: 1px solid #e7e5e4;
      flex-shrink: 0;
    }
    .view-btn {
      padding: 6px 12px;
      border: none;
      background: transparent;
      font-size: 12px;
      font-weight: 600;
      color: #57534e;
      border-radius: 6px;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s;
    }
    .view-btn.active {
      background: #ffffff;
      color: #78350f;
      font-weight: 800;
      box-shadow: 0 1px 3px rgba(0,0,0,0.08);
    }
    .nav-bar {
      background: #ffffff;
      border-bottom: 1px solid #e7e5e4;
      position: sticky;
      top: 104px;
      z-index: 40;
      overflow-x: auto;
      white-space: nowrap;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
      padding: 8px 12px;
    }
    .nav-inner {
      max-width: 800px;
      margin: 0 auto;
      display: flex;
      gap: 6px;
    }
    .page-tab {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #f5f5f4;
      border: 1px solid #e7e5e4;
      padding: 6px 11px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      color: #44403c;
      cursor: pointer;
      flex-shrink: 0;
    }
    .page-tab.active {
      background: #b45309;
      color: #ffffff;
      border-color: #b45309;
      box-shadow: 0 2px 6px rgba(180,83,9,0.25);
    }
    .page-num {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #e7e5e4;
      color: #78350f;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 700;
    }
    .page-tab.active .page-num {
      background: #ffffff;
      color: #b45309;
    }
    .main-wrap {
      max-width: 800px;
      margin: 12px auto;
      padding: 0 12px 60px;
      width: 100%;
    }
    .page-card {
      background: #ffffff;
      border: 1px solid #e7e5e4;
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0,0,0,0.03);
      margin-bottom: 24px;
      width: 100%;
      scroll-margin-top: 130px;
    }
    /* Strictly one picture per page */
    .hero-photo-wrap {
      position: relative;
      width: 100%;
      height: 220px;
      background: #f5f5f4;
      overflow: hidden;
    }
    @media (min-width: 640px) {
      .hero-photo-wrap { height: 280px; }
    }
    .hero-photo {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      display: block;
    }
    .hero-gradient {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%);
    }
    .hero-badge {
      position: absolute;
      top: 10px;
      left: 10px;
      background: #ffffff;
      color: #92400e;
      font-size: 11px;
      font-weight: 800;
      padding: 3px 8px;
      border-radius: 6px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.15);
    }
    .hero-text {
      position: absolute;
      bottom: 12px;
      left: 14px;
      right: 14px;
      color: #ffffff;
    }
    .featured-label {
      font-size: 11px;
      background: rgba(180,83,9,0.95);
      display: inline-block;
      padding: 2px 8px;
      border-radius: 4px;
      margin-bottom: 4px;
      font-weight: 600;
    }
    .hero-title {
      font-family: 'Cinzel', serif;
      font-size: 20px;
      font-weight: 800;
      text-shadow: 0 1px 3px rgba(0,0,0,0.7);
      line-height: 1.2;
    }
    .hero-sub {
      font-size: 11px;
      opacity: 0.9;
      margin-top: 2px;
    }
    .content-body {
      padding: 14px;
    }
    .cat-header {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 10px 0 6px;
      border-bottom: 2px solid #f59e0b;
      margin-bottom: 8px;
    }
    .cat-dot {
      width: 7px;
      height: 7px;
      background: #b45309;
      transform: rotate(45deg);
    }
    .cat-title-text {
      font-size: 15px;
      font-weight: 700;
      color: #78350f;
    }
    .cat-count {
      margin-left: auto;
      font-size: 11px;
      color: #a8a29e;
      font-weight: 500;
    }
    .item-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 9px 4px;
      border-bottom: 1px dotted #e7e5e4;
      width: 100%;
    }
    .item-row:last-child {
      border-bottom: none;
    }
    .item-info {
      flex: 1;
      min-width: 0;
    }
    .item-name-am {
      font-family: 'Noto Sans Ethiopic', sans-serif;
      font-weight: 700;
      font-size: 14px;
      color: #1c1917;
    }
    .item-name-en {
      font-size: 12px;
      color: #57534e;
      font-weight: 500;
      margin-left: 4px;
    }
    .item-desc {
      font-size: 11px;
      color: #78716c;
      margin-top: 1px;
      white-space: normal;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    .item-price {
      font-weight: 800;
      font-size: 14px;
      color: #b45309;
      white-space: nowrap;
      text-align: right;
    }
    .badge-tag {
      font-size: 9px;
      font-weight: 700;
      padding: 1px 5px;
      border-radius: 4px;
      margin-left: 4px;
    }
    .tag-special {
      background: #fef3c7;
      color: #92400e;
      border: 1px solid #fde68a;
    }
    .tag-fasting {
      background: #ecfdf5;
      color: #065f46;
      border: 1px solid #a7f3d0;
    }
    .add-btn {
      background: #fef3c7;
      color: #92400e;
      border: 1px solid #fde68a;
      width: 28px;
      height: 28px;
      border-radius: 6px;
      font-weight: 800;
      font-size: 16px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-left: 8px;
      flex-shrink: 0;
    }
    .add-btn:active {
      transform: scale(0.92);
      background: #d97706;
      color: #ffffff;
    }
    /* Order Drawer Modal */
    .drawer-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      z-index: 100;
      display: none;
      justify-content: flex-end;
    }
    .drawer-overlay.open {
      display: flex;
    }
    .drawer {
      background: #ffffff;
      width: 100%;
      max-width: 380px;
      height: 100%;
      box-shadow: -4px 0 20px rgba(0,0,0,0.15);
      display: flex;
      flex-direction: column;
    }
    .drawer-header {
      padding: 14px;
      border-bottom: 1px solid #e7e5e4;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .drawer-body {
      flex: 1;
      overflow-y: auto;
      padding: 14px;
    }
    .drawer-footer {
      padding: 14px;
      border-top: 1px solid #e7e5e4;
      background: #fafaf9;
    }
    .order-total-row {
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      font-weight: 800;
      margin-bottom: 12px;
      color: #78350f;
    }
    .btn-action {
      width: 100%;
      padding: 10px;
      border-radius: 8px;
      background: #b45309;
      color: #ffffff;
      font-weight: 700;
      border: none;
      cursor: pointer;
      font-size: 13px;
    }
    footer {
      text-align: center;
      padding: 24px 14px;
      font-size: 11px;
      color: #78716c;
      border-top: 1px solid #e7e5e4;
      background: #ffffff;
    }
  </style>
</head>
<body>
  <header>
    <div class="header-top">
      <div class="brand">
        <div class="brand-logo">B</div>
        <div>
          <div class="brand-title">
            <span>BAROC HOTEL</span>
            <span class="brand-am-tag">ባሮክ ሆቴል</span>
          </div>
          <div class="brand-sub">Restaurant & Hotel Menu • ዲጂታል ሜኑ</div>
        </div>
      </div>
      <div class="controls">
        <select id="langSelect" class="pill-btn" onchange="changeLang(this.value)">
          <option value="both">Both (አማ/EN)</option>
          <option value="am">አማርኛ</option>
          <option value="en">English</option>
        </select>
        <button class="order-badge-btn" onclick="openOrderDrawer()">
          <span>Order</span>
          <span id="orderCountBadge" style="background:#ffffff;color:#b45309;padding:1px 5px;border-radius:10px;font-size:11px;">0</span>
        </button>
      </div>
    </div>
    <div class="search-row">
      <input type="text" id="searchInput" class="search-input" placeholder="Search dishes (e.g. Kitfo, ክትፎ, Tibs, Burger, Juice)..." oninput="handleSearch(this.value)">
      <div class="view-toggle-wrap">
        <button id="btnViewPages" class="view-btn active" onclick="setViewMode('pages')">Page by Page</button>
        <button id="btnViewAll" class="view-btn" onclick="setViewMode('all')">One Page Scroll</button>
      </div>
    </div>
  </header>

  <nav class="nav-bar" id="navBar">
    <div class="nav-inner" id="navInner"></div>
  </nav>

  <main class="main-wrap" id="mainContainer"></main>

  <!-- Order Drawer -->
  <div class="drawer-overlay" id="orderDrawerOverlay" onclick="closeOrderDrawer(event)">
    <div class="drawer" onclick="event.stopPropagation()">
      <div class="drawer-header">
        <div>
          <strong style="font-size:15px;color:#78350f;">Table Order Summary</strong>
          <div style="font-size:11px;color:#78716c;">የጠረጴዛ ትዕዛዝ</div>
        </div>
        <button onclick="closeOrderDrawer()" style="background:none;border:none;font-size:20px;cursor:pointer;">&times;</button>
      </div>
      <div class="drawer-body" id="drawerBody"></div>
      <div class="drawer-footer">
        <div class="order-total-row">
          <span>Total / ድምር:</span>
          <span id="drawerTotalText">0 ETB</span>
        </div>
        <button class="btn-action" onclick="showWaiterAlert()">Show to Waiter / ለአስተናጋጅ አሳይ</button>
      </div>
    </div>
  </div>

  <footer>
    <div style="font-family:'Cinzel', serif; font-weight:800; color:#78350f; font-size:14px; margin-bottom:4px;">BAROC HOTEL & RESTAURANT</div>
    <div>ባሮክ ሆቴል • Authentic Ethiopian Cuisine • Fasting Delicacies</div>
  </footer>

  <script>
    const pages = ${pagesJson};
    const items = ${itemsJson};
    const itemsMap = {};
    items.forEach(it => { itemsMap[it.id] = it; });

    let activePageIndex = 0;
    let currentLang = 'both';
    let searchQuery = '';
    let currentViewMode = 'pages'; // 'pages' or 'all'
    const order = {}; // id -> count

    function renderNav() {
      const container = document.getElementById('navInner');
      container.innerHTML = pages.map((p, idx) => \`
        <button class="page-tab \${currentViewMode === 'pages' && idx === activePageIndex ? 'active' : ''}" onclick="onTabClick(\${idx})">
          <span class="page-num">\${p.pageNumber}</span>
          <span>\${p.titleEn.split('&')[0].trim()}</span>
        </button>
      \`).join('');
    }

    function setViewMode(mode) {
      currentViewMode = mode;
      document.getElementById('btnViewPages').classList.toggle('active', mode === 'pages');
      document.getElementById('btnViewAll').classList.toggle('active', mode === 'all');
      renderNav();
      renderContent();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function onTabClick(idx) {
      if (currentViewMode === 'pages') {
        activePageIndex = idx;
        renderNav();
        renderContent();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById('card-page-' + pages[idx].pageNumber);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }

    function renderContent() {
      const main = document.getElementById('mainContainer');

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const filtered = items.filter(it => 
          it.nameEn.toLowerCase().includes(q) ||
          it.nameAm.toLowerCase().includes(q) ||
          (it.descriptionEn || '').toLowerCase().includes(q)
        );

        if (filtered.length === 0) {
          main.innerHTML = \`<div style="text-align:center;padding:40px;color:#78716c;background:#fff;border-radius:12px;border:1px solid #e7e5e4;">No dishes found matching "\${searchQuery}"</div>\`;
          return;
        }

        let itemsHtml = '';
        filtered.forEach(it => {
          itemsHtml += renderItemRow(it);
        });

        main.innerHTML = \`
          <div class="page-card">
            <div class="content-body">
              <div class="cat-header">
                <div class="cat-dot"></div>
                <div class="cat-title-text">Search Results (\${filtered.length})</div>
              </div>
              \${itemsHtml}
            </div>
          </div>
        \`;
        return;
      }

      if (currentViewMode === 'all') {
        // One page scroll: render all 9 pages sequentially, each maintaining its one picture
        let allHtml = '';
        pages.forEach(p => {
          allHtml += renderPageCard(p);
        });
        main.innerHTML = allHtml;
      } else {
        // Single page
        const p = pages[activePageIndex];
        main.innerHTML = renderPageCard(p);
      }
    }

    function renderPageCard(p) {
      let categoriesHtml = '';
      p.categoriesInPage.forEach(cat => {
        let rowsHtml = '';
        cat.itemIds.forEach(id => {
          const it = itemsMap[id];
          if (it) rowsHtml += renderItemRow(it);
        });

        categoriesHtml += \`
          <div style="margin-bottom:16px;">
            <div class="cat-header">
              <div class="cat-dot"></div>
              <div class="cat-title-text">\${currentLang === 'am' ? cat.titleAm : cat.titleEn}</div>
              <div class="cat-count">\${cat.itemIds.length} items</div>
            </div>
            \${rowsHtml}
          </div>
        \`;
      });

      return \`
        <div class="page-card" id="card-page-\${p.pageNumber}">
          <!-- Exactly one picture per page of an item on that page -->
          <div class="hero-photo-wrap">
            <img class="hero-photo" src="\${p.featuredImageUrl}" alt="\${p.featuredDishNameEn}">
            <div class="hero-gradient"></div>
            <div class="hero-badge">PAGE \${p.pageNumber} OF 9</div>
            <div class="hero-text">
              <div class="featured-label">Featured: \${p.featuredDishNameEn} (\${p.featuredDishNameAm})</div>
              <div class="hero-title">\${currentLang === 'am' ? p.titleAm : p.titleEn}</div>
              <div class="hero-sub">\${currentLang === 'am' ? p.subtitleAm : p.subtitleEn}</div>
            </div>
          </div>
          <div class="content-body">
            \${categoriesHtml}
          </div>
        </div>
      \`;
    }

    function renderItemRow(it) {
      let nameHtml = '';
      if (currentLang === 'am') {
        nameHtml = \`<span class="item-name-am">\${it.nameAm}</span>\`;
      } else if (currentLang === 'en') {
        nameHtml = \`<span class="item-name-am">\${it.nameEn}</span>\`;
      } else {
        nameHtml = \`<span class="item-name-am">\${it.nameAm}</span><span class="item-name-en">/ \${it.nameEn}</span>\`;
      }

      let tags = '';
      if (it.isSpecial) tags += '<span class="badge-tag tag-special">ልዩ</span>';
      if (it.isFasting) tags += '<span class="badge-tag tag-fasting">የጾም</span>';
      if (it.unit) tags += \`<span style="font-size:10px;color:#a8a29e;margin-left:4px;">(\${it.unit})</span>\`;

      return \`
        <div class="item-row">
          <div class="item-info">
            <div>\${nameHtml} \${tags}</div>
            <div class="item-desc">\${it.descriptionEn || it.descriptionAm || ''}</div>
          </div>
          <div style="display:flex;align-items:center;">
            <div class="item-price">\${it.price.toLocaleString()} ETB</div>
            <button class="add-btn" onclick="addToOrder('\${it.id}')">+</button>
          </div>
        </div>
      \`;
    }

    function changeLang(val) {
      currentLang = val;
      renderContent();
    }

    function handleSearch(val) {
      searchQuery = val;
      renderContent();
    }

    function addToOrder(id) {
      order[id] = (order[id] || 0) + 1;
      updateOrderUI();
    }

    function updateOrderUI() {
      let totalCount = 0;
      let totalETB = 0;
      Object.keys(order).forEach(id => {
        const qty = order[id];
        const it = itemsMap[id];
        if (it && qty > 0) {
          totalCount += qty;
          totalETB += it.price * qty;
        }
      });
      document.getElementById('orderCountBadge').textContent = totalCount;
      document.getElementById('drawerTotalText').textContent = totalETB.toLocaleString() + ' ETB';
      renderDrawerBody();
    }

    function renderDrawerBody() {
      const body = document.getElementById('drawerBody');
      const entries = Object.keys(order).filter(id => order[id] > 0);

      if (entries.length === 0) {
        body.innerHTML = '<div style="text-align:center;padding:30px;color:#78716c;">Your order tray is empty. Tap + on dishes to add.</div>';
        return;
      }

      let html = '';
      entries.forEach(id => {
        const it = itemsMap[id];
        const qty = order[id];
        html += \`
          <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #f5f5f4;">
            <div>
              <div style="font-weight:700;font-size:13px;">\${it.nameAm}</div>
              <div style="font-size:11px;color:#78716c;">\${it.nameEn} • \${it.price.toLocaleString()} ETB</div>
            </div>
            <div style="display:flex;align-items:center;gap:6px;">
              <button onclick="decreaseOrder('\${it.id}')" style="width:24px;height:24px;border:1px solid #d6d3d1;background:#fff;border-radius:4px;cursor:pointer;">-</button>
              <strong style="width:16px;text-align:center;font-size:12px;">\${qty}</strong>
              <button onclick="addToOrder('\${it.id}')" style="width:24px;height:24px;border:1px solid #d6d3d1;background:#fff;border-radius:4px;cursor:pointer;">+</button>
            </div>
          </div>
        \`;
      });
      body.innerHTML = html;
    }

    function decreaseOrder(id) {
      if (order[id] > 1) order[id]--;
      else delete order[id];
      updateOrderUI();
    }

    function openOrderDrawer() {
      document.getElementById('orderDrawerOverlay').classList.add('open');
      renderDrawerBody();
    }

    function closeOrderDrawer(e) {
      document.getElementById('orderDrawerOverlay').classList.remove('open');
    }

    function showWaiterAlert() {
      let msg = 'HOTEL WAITER ORDER:\\n';
      Object.keys(order).forEach(id => {
        const it = itemsMap[id];
        msg += \`• \${it.nameAm} (\${it.nameEn}) x\${order[id]}\\n\`;
      });
      alert(msg);
    }

    renderNav();
    renderContent();
  </script>
</body>
</html>`;
}
