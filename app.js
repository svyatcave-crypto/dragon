(function () {
  'use strict';

  var STORAGE_KEY = 'dragonPlayful_v5';
  var ADMIN_EMAIL = 'sriatcave@gmail.com';
  // Demo backup code for all users (in real app each user would set one)
  var GLOBAL_BACKUP_CODE = 'BACKUP-2026';

  var VALID_CODES = {
    'DRAGON-EMB-001': { type: 'dragon', typeId: 'ember', name: 'Ember Wyrm', emoji: '🔥' },
    'DRAGON-EMB-002': { type: 'dragon', typeId: 'ember', name: 'Ember Wyrm', emoji: '🔥' },
    'DRAGON-EMB-003': { type: 'dragon', typeId: 'ember', name: 'Ember Wyrm', emoji: '🔥' },
    'DRAGON-FRO-001': { type: 'dragon', typeId: 'frost', name: 'Frostling', emoji: '❄️' },
    'DRAGON-FRO-002': { type: 'dragon', typeId: 'frost', name: 'Frostling', emoji: '❄️' },
    'DRAGON-FRO-003': { type: 'dragon', typeId: 'frost', name: 'Frostling', emoji: '❄️' },
    'DRAGON-MOS-001': { type: 'dragon', typeId: 'moss', name: 'Moss Drake', emoji: '🌿' },
    'DRAGON-MOS-002': { type: 'dragon', typeId: 'moss', name: 'Moss Drake', emoji: '🌿' },
    'DRAGON-MOS-003': { type: 'dragon', typeId: 'moss', name: 'Moss Drake', emoji: '🌿' },
    'DRAGON-SHA-001': { type: 'dragon', typeId: 'shadow', name: 'Shadow Serpent', emoji: '🌑' },
    'DRAGON-SHA-002': { type: 'dragon', typeId: 'shadow', name: 'Shadow Serpent', emoji: '🌑' },
    'DRAGON-SHA-003': { type: 'dragon', typeId: 'shadow', name: 'Shadow Serpent', emoji: '🌑' },
    'DRAGON-SPK-001': { type: 'dragon', typeId: 'spark', name: 'Spark Hatchling', emoji: '⚡' },
    'DRAGON-SPK-002': { type: 'dragon', typeId: 'spark', name: 'Spark Hatchling', emoji: '⚡' },
    'DRAGON-COR-001': { type: 'dragon', typeId: 'coral', name: 'Coral Drake', emoji: '🪸' },
    'DRAGON-COR-002': { type: 'dragon', typeId: 'coral', name: 'Coral Drake', emoji: '🪸' },
    'DRAGON-STM-001': { type: 'dragon', typeId: 'storm', name: 'Storm Wyvern', emoji: '🌩️' },
    'DRAGON-STM-002': { type: 'dragon', typeId: 'storm', name: 'Storm Wyvern', emoji: '🌩️' },
    'DRAGON-LUN-001': { type: 'dragon', typeId: 'luna', name: 'Luna Dragon', emoji: '🌙' },
    'DRAGON-LUN-002': { type: 'dragon', typeId: 'luna', name: 'Luna Dragon', emoji: '🌙' },
    'FOOD-APL-001': { type: 'food', typeId: 'apple', name: 'Apple', emoji: '🍎' },
    'FOOD-APL-002': { type: 'food', typeId: 'apple', name: 'Apple', emoji: '🍎' },
    'FOOD-BRY-001': { type: 'food', typeId: 'berry', name: 'Berry Basket', emoji: '🫐' },
    'FOOD-BRY-002': { type: 'food', typeId: 'berry', name: 'Berry Basket', emoji: '🫐' },
    'FOOD-STK-001': { type: 'food', typeId: 'steak', name: 'Dragon Steak', emoji: '🥩' },
    'FOOD-CKE-001': { type: 'food', typeId: 'cookie', name: 'Cookie', emoji: '🍪' },
    'FOOD-FSH-001': { type: 'food', typeId: 'fish', name: 'Fish', emoji: '🐟' },
    'FOOD-HNY-001': { type: 'food', typeId: 'honey', name: 'Honey Pot', emoji: '🍯' },
    'FOOD-MSH-001': { type: 'food', typeId: 'mushroom', name: 'Mushroom', emoji: '🍄' },
    'FOOD-CAK-001': { type: 'food', typeId: 'cake', name: 'Birthday Cake', emoji: '🎂' }
  };

  var DRAGONS = [
    { id: 'ember', name: 'Ember Wyrm', emoji: '🔥' },
    { id: 'frost', name: 'Frostling', emoji: '❄️' },
    { id: 'moss', name: 'Moss Drake', emoji: '🌿' },
    { id: 'shadow', name: 'Shadow Serpent', emoji: '🌑' },
    { id: 'spark', name: 'Spark Hatchling', emoji: '⚡' },
    { id: 'coral', name: 'Coral Drake', emoji: '🪸' },
    { id: 'storm', name: 'Storm Wyvern', emoji: '🌩️' },
    { id: 'luna', name: 'Luna Dragon', emoji: '🌙' }
  ];

  var FOODS = [
    { id: 'apple', name: 'Apple', emoji: '🍎' },
    { id: 'berry', name: 'Berry Basket', emoji: '🫐' },
    { id: 'steak', name: 'Dragon Steak', emoji: '🥩' },
    { id: 'cookie', name: 'Cookie', emoji: '🍪' },
    { id: 'fish', name: 'Fish', emoji: '🐟' },
    { id: 'honey', name: 'Honey Pot', emoji: '🍯' },
    { id: 'mushroom', name: 'Mushroom', emoji: '🍄' },
    { id: 'cake', name: 'Birthday Cake', emoji: '🎂' }
  ];

  function loadDB() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return { users: {}, currentUser: null, usedCodes: {}, releaseRequests: [], orders: [] };
  }

  function saveDB() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  }

  var db = loadDB();
  if (!db.usedCodes) db.usedCodes = {};
  if (!db.releaseRequests) db.releaseRequests = [];
  if (!db.orders) db.orders = [];

  if (!db.users.admin) {
    db.users.admin = {
      username: 'admin',
      password: '5544',
      tokens: 200,
      items: [],
      isAdmin: true,
      group: 'regular-dreamer',
      groupLabel: 'Regular Dreamer',
      backupCode: GLOBAL_BACKUP_CODE,
      createdAt: Date.now()
    };
    saveDB();
  }

  var currentUser = null;
  var addMode = 'dragon';
  var selectedOptionId = null;
  var selectedPlayId = null;
  var pendingJailId = null;
  var pendingReleaseId = null;
  var collectionFilter = 'all';
  var photoDataUrl = null;

  function $(id) { return document.getElementById(id); }
  function qs(sel) { return document.querySelector(sel); }
  function qsa(sel) { return Array.from(document.querySelectorAll(sel)); }

  function showToast(msg) {
    var t = $('toast');
    t.textContent = msg;
    t.style.display = 'block';
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(function () { t.style.display = 'none'; }, 3200);
  }

  function persistUser() {
    if (!currentUser) return;
    db.users[currentUser.username] = currentUser;
    saveDB();
  }

  function updateTokens() {
    if (!currentUser) return;
    $('token-count').textContent = currentUser.tokens;
    var badge = $('group-badge');
    if (badge) {
      badge.textContent = currentUser.groupLabel || '';
      badge.title = currentUser.groupLabel || '';
    }
  }

  function showScreen(name) {
    $('auth-screen').classList.toggle('active', name === 'auth');
    $('app-screen').classList.toggle('active', name === 'app');
  }

  function resolveGroup(selectId, otherId) {
    var val = $(selectId).value;
    if (!val) return { ok: false, error: 'Please select your group' };
    if (val === 'other') {
      var other = $(otherId).value.trim();
      if (!other) return { ok: false, error: 'Please enter your group name' };
      return { ok: true, group: 'other', groupLabel: other };
    }
    return { ok: true, group: 'regular-dreamer', groupLabel: 'Regular Dreamer' };
  }

  function doLogin(username, password, groupInfo) {
    var key = username.toLowerCase().trim();
    var user = db.users[key];
    if (!user || user.password !== password) return { ok: false, error: 'Invalid username or password' };
    user.group = groupInfo.group;
    user.groupLabel = groupInfo.groupLabel;
    if (!user.backupCode) user.backupCode = GLOBAL_BACKUP_CODE;
    db.currentUser = user.username;
    saveDB();
    currentUser = user;
    if (!Array.isArray(currentUser.items)) currentUser.items = [];
    currentUser.items.forEach(function (i) { if (typeof i.jailed !== 'boolean') i.jailed = false; });
    return { ok: true };
  }

  function doRegister(username, password, groupInfo) {
    var key = username.toLowerCase().trim();
    if (key.length < 2) return { ok: false, error: 'Username must be at least 2 characters' };
    if (db.users[key]) return { ok: false, error: 'Username already taken' };
    if (password.length < 3) return { ok: false, error: 'Password must be at least 3 characters' };
    var user = {
      username: key,
      password: password,
      tokens: 10,
      items: [],
      isAdmin: false,
      group: groupInfo.group,
      groupLabel: groupInfo.groupLabel,
      backupCode: GLOBAL_BACKUP_CODE,
      createdAt: Date.now()
    };
    db.users[key] = user;
    db.currentUser = key;
    saveDB();
    currentUser = user;
    return { ok: true };
  }

  function doLogout() {
    db.currentUser = null;
    saveDB();
    currentUser = null;
    selectedOptionId = null;
    selectedPlayId = null;
    photoDataUrl = null;
    showScreen('auth');
    try {
      $('login-form').reset();
      $('register-form').reset();
      $('login-other-group-wrap').style.display = 'none';
      $('reg-other-group-wrap').style.display = 'none';
    } catch (e) {}
  }

  function switchView(name) {
    qsa('.view').forEach(function (v) { v.classList.remove('active'); });
    qsa('.nav-btn').forEach(function (b) { b.classList.remove('active'); });
    var view = $('view-' + name);
    var btn = qs('.nav-btn[data-view="' + name + '"]');
    if (view) view.classList.add('active');
    if (btn) btn.classList.add('active');
    if (name === 'add') renderPickers();
    if (name === 'collection') renderCollection();
    if (name === 'play') renderPlay();
    if (name === 'jail') renderJail();
    if (name === 'trade') renderTrade();
    if (name === 'shop') renderShop();
  }

  // ---------- ADD (photo + code for both) ----------
  function renderPickers() {
    var box = $('type-options');
    box.innerHTML = '';
    var list = addMode === 'dragon' ? DRAGONS : FOODS;
    list.forEach(function (d) {
      var card = document.createElement('div');
      card.className = 'option-card' + (selectedOptionId === d.id ? ' selected' : '');
      card.innerHTML = '<span class="emoji">' + d.emoji + '</span><span class="label">' + d.name + '</span>';
      card.addEventListener('click', function () {
        selectedOptionId = d.id;
        renderPickers();
        updatePreview();
      });
      box.appendChild(card);
    });
    updatePreview();
  }

  function updatePreview() {
    var preview = $('selected-preview');
    var btn = $('btn-add-item');
    var err = $('add-error');
    if (err) err.textContent = '';
    var parts = [];
    if (selectedOptionId) {
      var list = addMode === 'dragon' ? DRAGONS : FOODS;
      var t = list.find(function (x) { return x.id === selectedOptionId; });
      if (t) parts.push(t.emoji + ' ' + t.name);
    }
    if (photoDataUrl) parts.push('📷 photo');
    var code = ($('item-code').value || '').trim().toUpperCase();
    if (code) parts.push('code: ' + code);
    if (parts.length === 0) {
      preview.textContent = 'Select type + photo + code';
      btn.disabled = true;
    } else {
      preview.textContent = parts.join(' · ');
      btn.disabled = !(selectedOptionId && photoDataUrl && code);
    }
  }

  function addItem() {
    var err = $('add-error');
    err.textContent = '';
    if (!selectedOptionId) { err.textContent = 'Select a type'; return; }
    if (!photoDataUrl) { err.textContent = 'Add a photo'; return; }
    var code = ($('item-code').value || '').trim().toUpperCase();
    if (!code) { err.textContent = 'Enter the unique proof code'; return; }

    var codeInfo = VALID_CODES[code];
    if (!codeInfo) {
      err.textContent = 'Invalid proof code.';
      return;
    }
    if (db.usedCodes[code]) {
      err.textContent = 'This code was already used.';
      return;
    }
    if (codeInfo.type !== addMode) {
      err.textContent = 'This code is for ' + codeInfo.type + ', not ' + addMode + '.';
      return;
    }
    if (codeInfo.typeId !== selectedOptionId) {
      err.textContent = 'Code is for ' + codeInfo.name + ', not the type you selected.';
      return;
    }

    var list = addMode === 'dragon' ? DRAGONS : FOODS;
    var t = list.find(function (x) { return x.id === selectedOptionId; });
    var item = {
      id: 'item_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      type: addMode,
      typeId: t.id,
      name: t.name,
      emoji: t.emoji,
      photo: photoDataUrl,
      proofCode: code,
      jailed: false,
      createdAt: Date.now()
    };
    currentUser.items.push(item);
    db.usedCodes[code] = { username: currentUser.username, usedAt: Date.now() };
    currentUser.tokens += addMode === 'dragon' ? 5 : 2;
    persistUser();
    saveDB();
    updateTokens();
    showToast(t.emoji + ' ' + t.name + ' verified & added!');

    selectedOptionId = null;
    photoDataUrl = null;
    $('item-code').value = '';
    $('photo-preview-wrap').style.display = 'none';
    $('photo-preview').src = '';
    $('item-photo-input').value = '';
    updatePreview();
    renderPickers();
  }

  function handlePhotoFile(file) {
    if (!file || !file.type.match(/^image\//)) {
      showToast('Please choose an image');
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      showToast('Photo too large (max ~4MB)');
      return;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
      var img = new Image();
      img.onload = function () {
        var max = 800, w = img.width, h = img.height;
        if (w > max || h > max) {
          if (w > h) { h = Math.round(h * max / w); w = max; }
          else { w = Math.round(w * max / h); h = max; }
        }
        var canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        photoDataUrl = canvas.toDataURL('image/jpeg', 0.72);
        $('photo-preview').src = photoDataUrl;
        $('photo-preview-wrap').style.display = 'block';
        updatePreview();
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  // ---------- COLLECTION ----------
  function renderCollection() {
    if (!currentUser) return;
    var items = currentUser.items.filter(function (i) {
      if (i.jailed) return false;
      if (collectionFilter === 'all') return true;
      return i.type === collectionFilter;
    });
    var grid = $('collection-grid');
    var empty = $('empty-collection');
    grid.innerHTML = '';
    if (items.length === 0) { empty.style.display = 'block'; return; }
    empty.style.display = 'none';
    items.slice().reverse().forEach(function (item) {
      var card = document.createElement('div');
      card.className = 'collection-item';
      var media = item.photo
        ? '<img class="item-photo" src="' + item.photo + '" alt="">'
        : '<div class="item-emoji">' + item.emoji + '</div>';
      var codeLine = item.proofCode ? '<div class="item-code">' + item.proofCode + '</div>' : '';
      card.innerHTML = media + '<div class="item-info"><div class="item-type">' + item.type +
        '</div><div class="item-name">' + item.name + '</div>' + codeLine +
        '<div class="item-date">' + new Date(item.createdAt).toLocaleDateString() + '</div></div>';
      grid.appendChild(card);
    });
  }

  // ---------- PLAY ----------
  function renderPlay() {
    if (!currentUser) return;
    var dragons = currentUser.items.filter(function (i) { return i.type === 'dragon' && !i.jailed; });
    var box = $('playable-dragons');
    box.innerHTML = '';
    if (dragons.length === 0) {
      $('selected-dragon-display').innerHTML = '<p class="placeholder-text">No free dragons.</p>';
      $('play-actions').style.display = 'none';
      selectedPlayId = null;
      return;
    }
    dragons.forEach(function (d) {
      var card = document.createElement('div');
      card.className = 'play-dragon-card' + (selectedPlayId === d.id ? ' selected' : '');
      card.innerHTML = d.photo
        ? '<img src="' + d.photo + '" alt=""><div class="name">' + d.name + '</div>'
        : '<span class="emoji">' + d.emoji + '</span><div class="name">' + d.name + '</div>';
      card.addEventListener('click', function () {
        selectedPlayId = d.id;
        showSelectedDragon(d);
        renderPlay();
      });
      box.appendChild(card);
    });
    if (selectedPlayId) {
      var d = dragons.find(function (x) { return x.id === selectedPlayId; });
      if (d) showSelectedDragon(d);
      else {
        selectedPlayId = null;
        $('selected-dragon-display').innerHTML = '<p class="placeholder-text">Pick a dragon below</p>';
        $('play-actions').style.display = 'none';
      }
    }
  }

  function showSelectedDragon(d) {
    var media = d.photo
      ? '<img class="stage-photo" src="' + d.photo + '" alt="">'
      : '<div class="big-emoji">' + d.emoji + '</div>';
    var code = d.proofCode ? '<div style="font-size:0.8rem;color:#f1c40f;margin-top:4px;">' + d.proofCode + '</div>' : '';
    $('selected-dragon-display').innerHTML = media + '<div class="dragon-name">' + d.name + '</div>' + code;
    $('play-actions').style.display = 'flex';
    $('play-log').textContent = '';
  }

  function playAction(action) {
    if (!selectedPlayId) return;
    var d = currentUser.items.find(function (i) { return i.id === selectedPlayId; });
    if (!d || d.jailed) return;
    var msgs = {
      feed: [d.name + ' munches happily! 🍎', d.name + ' loves the snack!'],
      dance: [d.name + ' spins! 💃', d.name + ' shows off!'],
      pet: [d.name + ' enjoys the pets! 🤚', d.name + ' leans in.']
    };
    var list = msgs[action] || ['Nice!'];
    $('play-log').textContent = list[Math.floor(Math.random() * list.length)];
    if (Math.random() < 0.15) {
      currentUser.tokens += 1;
      persistUser();
      updateTokens();
      showToast('+1 token!');
    }
  }

  // ---------- JAIL (password confirm) ----------
  function openJailModal() {
    if (!selectedPlayId) return;
    var d = currentUser.items.find(function (i) { return i.id === selectedPlayId; });
    if (!d || d.jailed) return;
    pendingJailId = d.id;
    $('jail-dragon-name').textContent = (d.emoji || '🐉') + ' ' + d.name;
    $('jail-password').value = '';
    $('owner-email').value = '';
    $('jail-modal-error').textContent = '';
    $('jail-modal').style.display = 'flex';
  }

  function closeJailModal() {
    $('jail-modal').style.display = 'none';
    pendingJailId = null;
  }

  function confirmJail() {
    var pw = $('jail-password').value;
    var err = $('jail-modal-error');
    if (pw !== currentUser.password) {
      err.textContent = 'Wrong password. Enter your account password.';
      return;
    }
    if (!pendingJailId) return;
    var d = currentUser.items.find(function (i) { return i.id === pendingJailId; });
    if (!d) return;
    d.jailed = true;
    d.jailedAt = Date.now();
    d.notifiedEmail = ($('owner-email').value || '').trim() || null;
    persistUser();
    showToast(d.name + ' sent to jail!');
    $('play-log').textContent = '🔒 ' + d.name + ' is in jail.';
    selectedPlayId = null;
    $('play-actions').style.display = 'none';
    $('selected-dragon-display').innerHTML = '<p class="placeholder-text">Pick a dragon below</p>';
    closeJailModal();
    renderPlay();
  }

  // ---------- RELEASE (backup + email + admin approve) ----------
  function openReleaseModal(itemId) {
    var d = currentUser.items.find(function (i) { return i.id === itemId; });
    if (!d || !d.jailed) return;
    // check existing pending
    var existing = db.releaseRequests.find(function (r) {
      return r.itemId === itemId && r.status === 'pending';
    });
    if (existing) {
      showToast('Release already pending admin approval.');
      return;
    }
    pendingReleaseId = itemId;
    $('release-dragon-name').textContent = (d.emoji || '🐉') + ' ' + d.name;
    $('backup-code').value = '';
    $('release-modal-error').textContent = '';
    $('release-modal').style.display = 'flex';
  }

  function closeReleaseModal() {
    $('release-modal').style.display = 'none';
    pendingReleaseId = null;
  }

  function submitReleaseRequest() {
    var err = $('release-modal-error');
    var backup = ($('backup-code').value || '').trim().toUpperCase();
    var userBackup = (currentUser.backupCode || GLOBAL_BACKUP_CODE).toUpperCase();
    if (backup !== userBackup) {
      err.textContent = 'Wrong backup code. (Demo backup: BACKUP-2026)';
      return;
    }
    if (!pendingReleaseId) return;
    var d = currentUser.items.find(function (i) { return i.id === pendingReleaseId; });
    if (!d) return;

    var req = {
      id: 'rel_' + Date.now(),
      itemId: d.id,
      itemName: d.name,
      itemEmoji: d.emoji,
      username: currentUser.username,
      status: 'pending',
      createdAt: Date.now()
    };
    db.releaseRequests.push(req);
    saveDB();

    // Open mailto to admin
    var subject = encodeURIComponent('Dragon Playful – Release request: ' + d.name);
    var body = encodeURIComponent(
      'User: ' + currentUser.username + '\n' +
      'Group: ' + (currentUser.groupLabel || '') + '\n' +
      'Dragon: ' + d.name + ' (' + (d.proofCode || 'no code') + ')\n' +
      'Request ID: ' + req.id + '\n\n' +
      'Please log in as admin and Approve or Disapprove this release.'
    );
    window.open('mailto:' + ADMIN_EMAIL + '?subject=' + subject + '&body=' + body, '_blank');

    showToast('Email opened to ' + ADMIN_EMAIL + '. Waiting for admin approval.');
    closeReleaseModal();
    renderJail();
  }

  function renderJail() {
    if (!currentUser) return;
    var jailed = currentUser.items.filter(function (i) { return i.type === 'dragon' && i.jailed; });
    var grid = $('jail-grid');
    var empty = $('empty-jail');
    grid.innerHTML = '';
    if (jailed.length === 0) { empty.style.display = 'block'; return; }
    empty.style.display = 'none';
    jailed.slice().reverse().forEach(function (item) {
      var pending = db.releaseRequests.find(function (r) {
        return r.itemId === item.id && r.status === 'pending';
      });
      var card = document.createElement('div');
      card.className = 'collection-item jailed';
      var media = item.photo
        ? '<img class="item-photo" src="' + item.photo + '" alt="">'
        : '<div class="item-emoji">' + item.emoji + '</div>';
      var status = pending
        ? '<div class="jail-badge" style="background:#f1c40f;color:#000;">⏳ Pending approval</div>'
        : '<div class="jail-badge">🔒 In Jail</div>';
      var btn = pending
        ? ''
        : '<button type="button" class="btn btn-release" data-id="' + item.id + '">Request Release</button>';
      card.innerHTML = media + '<div class="item-info"><div class="item-type">dragon</div>' +
        '<div class="item-name">' + item.name + '</div>' + status + btn + '</div>';
      var b = card.querySelector('.btn-release');
      if (b) b.addEventListener('click', function () { openReleaseModal(item.id); });
      grid.appendChild(card);
    });
  }

  function adminApproveRelease(reqId, approve) {
    var req = db.releaseRequests.find(function (r) { return r.id === reqId; });
    if (!req || req.status !== 'pending') return;
    req.status = approve ? 'approved' : 'denied';
    req.resolvedAt = Date.now();
    req.resolvedBy = 'admin';

    if (approve) {
      var user = db.users[req.username];
      if (user) {
        var item = user.items.find(function (i) { return i.id === req.itemId; });
        if (item) {
          item.jailed = false;
          delete item.jailedAt;
        }
      }
    }
    saveDB();
    // refresh if viewing
    if (currentUser && currentUser.isAdmin) openProfile();
    if (currentUser && currentUser.username === req.username) {
      currentUser = db.users[req.username];
      renderJail();
    }
    showToast(approve ? 'Release approved – dragon freed!' : 'Release denied.');
  }

  // ---------- TRADE ----------
  function renderTrade() {
    if (!currentUser) return;
    var foods = currentUser.items.filter(function (i) { return i.type === 'food' && !i.jailed; });
    var sel = $('food-select');
    sel.innerHTML = '<option value="">Select food...</option>';
    foods.forEach(function (f) {
      var opt = document.createElement('option');
      opt.value = f.id;
      opt.textContent = f.emoji + ' ' + f.name;
      sel.appendChild(opt);
    });
    $('btn-convert-food').disabled = foods.length === 0;
  }

  function convertFood() {
    var id = $('food-select').value;
    if (!id) return;
    var idx = currentUser.items.findIndex(function (i) { return i.id === id; });
    if (idx === -1) return;
    var item = currentUser.items[idx];
    currentUser.items.splice(idx, 1);
    currentUser.tokens += 5;
    persistUser();
    updateTokens();
    renderTrade();
    var li = document.createElement('li');
    li.textContent = 'Converted ' + item.emoji + ' ' + item.name + ' → +5 tokens';
    $('trade-log').insertBefore(li, $('trade-log').firstChild);
    showToast('+5 tokens!');
  }

  function buyToken(cost, label, emoji) {
    if (currentUser.tokens < cost) { showToast('Not enough tokens!'); return; }
    currentUser.tokens -= cost;
    currentUser.items.push({
      id: 'token_' + Date.now(),
      type: 'dragon',
      typeId: 'token',
      name: label,
      emoji: emoji,
      jailed: false,
      createdAt: Date.now(),
      isToken: true
    });
    persistUser();
    updateTokens();
    var li = document.createElement('li');
    li.textContent = 'Bought ' + label + ' for ' + cost + ' tokens';
    $('trade-log').insertBefore(li, $('trade-log').firstChild);
    showToast('Got ' + label + '!');
  }

  // ---------- SHOP / ADMIN ORDERS ----------
  function renderShop() {
    var isAdmin = currentUser && currentUser.isAdmin;
    $('user-shop').style.display = isAdmin ? 'none' : 'block';
    $('admin-orders').style.display = isAdmin ? 'block' : 'none';
    if (isAdmin) {
      $('shop-title').textContent = 'Active Orders';
      $('shop-subtitle').textContent = 'All user orders across the system';
      renderAdminOrders();
    } else {
      $('shop-title').textContent = 'Order New Dragons';
      $('shop-subtitle').textContent = 'Spend tokens (demo)';
    }
  }

  function renderAdminOrders() {
    var list = $('orders-list');
    var empty = $('empty-orders');
    list.innerHTML = '';
    var active = db.orders.filter(function (o) { return o.status === 'active'; });
    if (active.length === 0) { empty.style.display = 'block'; return; }
    empty.style.display = 'none';
    active.slice().reverse().forEach(function (o) {
      var card = document.createElement('div');
      card.className = 'trade-card';
      card.style.marginBottom = '12px';
      card.innerHTML =
        '<h3>' + (o.emoji || '🐉') + ' ' + o.name + '</h3>' +
        '<p>User: <strong>' + o.username + '</strong> · ' + o.price + ' 🪙</p>' +
        '<p style="font-size:0.85rem;color:#a7a9be;">Ordered: ' + new Date(o.createdAt).toLocaleString() +
        (o.proofCode ? ' · Code: ' + o.proofCode : '') + '</p>' +
        '<button type="button" class="btn btn-secondary btn-complete-order" data-id="' + o.id + '" style="width:auto;margin-top:8px;">Mark Complete</button>';
      card.querySelector('.btn-complete-order').addEventListener('click', function () {
        o.status = 'complete';
        o.completedAt = Date.now();
        saveDB();
        renderAdminOrders();
        showToast('Order marked complete');
      });
      list.appendChild(card);
    });
  }

  function orderDragon(id, name, price, emoji) {
    if (currentUser.tokens < price) { showToast('Not enough tokens!'); return; }
    var typeId = id === 'forest' ? 'moss' : id;
    var prefixMap = { ember: 'DRAGON-EMB', frost: 'DRAGON-FRO', moss: 'DRAGON-MOS', shadow: 'DRAGON-SHA' };
    var prefix = prefixMap[typeId];
    var assignedCode = null;
    if (prefix) {
      Object.keys(VALID_CODES).forEach(function (c) {
        if (!assignedCode && c.indexOf(prefix) === 0 && !db.usedCodes[c] && VALID_CODES[c].typeId === typeId) {
          assignedCode = c;
        }
      });
    }

    currentUser.tokens -= price;
    var order = {
      id: 'ord_' + Date.now(),
      username: currentUser.username,
      name: name,
      emoji: emoji,
      typeId: typeId,
      price: price,
      proofCode: assignedCode,
      status: 'active',
      createdAt: Date.now()
    };
    db.orders.push(order);

    var item = {
      id: 'ordered_' + Date.now(),
      type: 'dragon',
      typeId: typeId,
      name: name + ' (Ordered)',
      emoji: emoji,
      jailed: false,
      createdAt: Date.now(),
      ordered: true,
      orderId: order.id
    };
    if (assignedCode) {
      item.proofCode = assignedCode;
      db.usedCodes[assignedCode] = { username: currentUser.username, usedAt: Date.now(), fromOrder: true };
    }
    currentUser.items.push(item);
    persistUser();
    saveDB();
    updateTokens();
    var msg = 'Ordered ' + name + '!';
    if (assignedCode) msg += ' Code: ' + assignedCode;
    $('order-status').textContent = msg + ' (Demo)';
    showToast(msg);
  }

  // ---------- PROFILE ----------
  function openProfile() {
    if (!currentUser) return;
    $('profile-username').textContent = currentUser.username;
    $('profile-group').textContent = currentUser.groupLabel || '—';
    $('profile-tokens').textContent = currentUser.tokens;
    $('profile-items').textContent = currentUser.items.filter(function (i) { return !i.jailed; }).length;
    $('profile-jailed').textContent = currentUser.items.filter(function (i) { return i.jailed; }).length;
    $('admin-panel').style.display = currentUser.isAdmin ? 'block' : 'none';

    if (currentUser.isAdmin) {
      var list = $('admin-codes');
      list.innerHTML = '';
      Object.keys(VALID_CODES).forEach(function (c) {
        var li = document.createElement('li');
        var used = db.usedCodes[c] ? ' (used by ' + db.usedCodes[c].username + ')' : ' ✓';
        li.textContent = c + ' → ' + VALID_CODES[c].name + used;
        list.appendChild(li);
      });

      var relBox = $('admin-releases');
      relBox.innerHTML = '';
      var pending = db.releaseRequests.filter(function (r) { return r.status === 'pending'; });
      if (pending.length === 0) {
        relBox.innerHTML = '<p style="font-size:0.85rem;color:#a7a9be;">No pending releases.</p>';
      } else {
        pending.forEach(function (r) {
          var div = document.createElement('div');
          div.style.cssText = 'background:#24243e;padding:10px;border-radius:8px;margin-bottom:8px;';
          div.innerHTML =
            '<div style="font-weight:700;">' + (r.itemEmoji || '🐉') + ' ' + r.itemName + '</div>' +
            '<div style="font-size:0.85rem;color:#a7a9be;">User: ' + r.username + '</div>' +
            '<div style="display:flex;gap:8px;margin-top:8px;">' +
            '<button type="button" class="btn btn-primary btn-approve" data-id="' + r.id + '" style="width:auto;font-size:0.85rem;padding:8px 12px;background:#2ecc71;">Approve</button>' +
            '<button type="button" class="btn btn-danger btn-deny" data-id="' + r.id + '" style="width:auto;font-size:0.85rem;padding:8px 12px;">Deny</button>' +
            '</div>';
          div.querySelector('.btn-approve').addEventListener('click', function () {
            adminApproveRelease(r.id, true);
          });
          div.querySelector('.btn-deny').addEventListener('click', function () {
            adminApproveRelease(r.id, false);
          });
          relBox.appendChild(div);
        });
      }
    }
    $('profile-modal').style.display = 'flex';
  }

  // ---------- INIT ----------
  function init() {
    $('tab-login').addEventListener('click', function () {
      $('tab-login').classList.add('active');
      $('tab-register').classList.remove('active');
      $('login-form').style.display = 'block';
      $('register-form').style.display = 'none';
      $('login-error').textContent = '';
    });
    $('tab-register').addEventListener('click', function () {
      $('tab-register').classList.add('active');
      $('tab-login').classList.remove('active');
      $('login-form').style.display = 'none';
      $('register-form').style.display = 'block';
      $('register-error').textContent = '';
    });

    $('login-group').addEventListener('change', function () {
      $('login-other-group-wrap').style.display = this.value === 'other' ? 'block' : 'none';
    });
    $('reg-group').addEventListener('change', function () {
      $('reg-other-group-wrap').style.display = this.value === 'other' ? 'block' : 'none';
    });

    $('login-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var g = resolveGroup('login-group', 'login-other-group');
      if (!g.ok) { $('login-error').textContent = g.error; return; }
      var res = doLogin($('login-username').value, $('login-password').value, g);
      if (res.ok) {
        showScreen('app');
        updateTokens();
        switchView('add');
        showToast('Welcome, ' + currentUser.username + '!');
      } else $('login-error').textContent = res.error;
    });

    $('register-form').addEventListener('submit', function (e) {
      e.preventDefault();
      if ($('reg-password').value !== $('reg-password2').value) {
        $('register-error').textContent = 'Passwords do not match';
        return;
      }
      var g = resolveGroup('reg-group', 'reg-other-group');
      if (!g.ok) { $('register-error').textContent = g.error; return; }
      var res = doRegister($('reg-username').value, $('reg-password').value, g);
      if (res.ok) {
        showScreen('app');
        updateTokens();
        switchView('add');
        showToast('Account created! Backup code: BACKUP-2026');
      } else $('register-error').textContent = res.error;
    });

    qsa('.nav-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { switchView(btn.getAttribute('data-view')); });
    });

    qsa('.type-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        qsa('.type-btn').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        addMode = btn.getAttribute('data-type');
        selectedOptionId = null;
        renderPickers();
      });
    });

    $('btn-add-item').addEventListener('click', addItem);
    $('btn-pick-photo').addEventListener('click', function () { $('item-photo-input').click(); });
    $('item-photo-input').addEventListener('change', function () {
      if (this.files && this.files[0]) handlePhotoFile(this.files[0]);
    });
    $('btn-clear-photo').addEventListener('click', function () {
      photoDataUrl = null;
      $('photo-preview-wrap').style.display = 'none';
      $('photo-preview').src = '';
      $('item-photo-input').value = '';
      updatePreview();
    });
    $('item-code').addEventListener('input', updatePreview);

    qsa('.filter-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        qsa('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        collectionFilter = btn.getAttribute('data-filter');
        renderCollection();
      });
    });

    $('btn-feed').addEventListener('click', function () { playAction('feed'); });
    $('btn-dance').addEventListener('click', function () { playAction('dance'); });
    $('btn-pet').addEventListener('click', function () { playAction('pet'); });
    $('btn-jail').addEventListener('click', openJailModal);

    $('btn-send-jail-notify').addEventListener('click', confirmJail);
    $('btn-cancel-jail').addEventListener('click', closeJailModal);
    $('close-jail-modal').addEventListener('click', closeJailModal);
    $('jail-modal').addEventListener('click', function (e) {
      if (e.target === $('jail-modal')) closeJailModal();
    });

    $('btn-send-release-email').addEventListener('click', submitReleaseRequest);
    $('btn-cancel-release').addEventListener('click', closeReleaseModal);
    $('close-release-modal').addEventListener('click', closeReleaseModal);
    $('release-modal').addEventListener('click', function (e) {
      if (e.target === $('release-modal')) closeReleaseModal();
    });

    $('food-select').addEventListener('change', function () {
      $('btn-convert-food').disabled = !$('food-select').value;
    });
    $('btn-convert-food').addEventListener('click', convertFood);
    $('btn-buy-token').addEventListener('click', function () { buyToken(20, 'Common Dragon Token', '🪙'); });
    $('btn-buy-rare').addEventListener('click', function () { buyToken(50, 'Rare Dragon Token', '💎'); });

    qsa('.btn-order').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var card = btn.closest('.shop-item');
        orderDragon(
          card.getAttribute('data-id'),
          card.querySelector('h3').textContent,
          parseInt(card.getAttribute('data-price'), 10),
          card.getAttribute('data-emoji')
        );
      });
    });

    $('btn-profile').addEventListener('click', openProfile);
    $('btn-logout').addEventListener('click', doLogout);
    $('btn-logout-profile').addEventListener('click', function () {
      $('profile-modal').style.display = 'none';
      doLogout();
    });
    $('close-profile').addEventListener('click', function () { $('profile-modal').style.display = 'none'; });
    $('profile-modal').addEventListener('click', function (e) {
      if (e.target === $('profile-modal')) $('profile-modal').style.display = 'none';
    });
    $('btn-reset-all').addEventListener('click', function () {
      if (confirm('Wipe all local data?')) {
        localStorage.removeItem(STORAGE_KEY);
        location.reload();
      }
    });
    $('btn-give-tokens').addEventListener('click', function () {
      currentUser.tokens += 100;
      persistUser();
      updateTokens();
      openProfile();
      showToast('+100 tokens');
    });
    $('btn-admin-add-tokens').addEventListener('click', function () {
      var uname = ($('admin-target-user').value || '').toLowerCase().trim();
      var amt = parseInt($('admin-add-tokens').value, 10) || 0;
      if (!uname || !db.users[uname]) { showToast('User not found'); return; }
      if (amt <= 0) { showToast('Enter a positive amount'); return; }
      db.users[uname].tokens += amt;
      saveDB();
      if (currentUser.username === uname) {
        currentUser.tokens = db.users[uname].tokens;
        updateTokens();
      }
      showToast('Added ' + amt + ' tokens to ' + uname);
    });

    if (db.currentUser && db.users[db.currentUser]) {
      currentUser = db.users[db.currentUser];
      if (!Array.isArray(currentUser.items)) currentUser.items = [];
      currentUser.items.forEach(function (i) { if (typeof i.jailed !== 'boolean') i.jailed = false; });
      if (!currentUser.backupCode) currentUser.backupCode = GLOBAL_BACKUP_CODE;
      showScreen('app');
      updateTokens();
      switchView('add');
    } else {
      showScreen('auth');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
