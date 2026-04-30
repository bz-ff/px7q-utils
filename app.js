(function() {
  'use strict';

  const LS_TASKS = 'gtpm_tasks';
  const LS_SCORECARD = 'gtpm_scorecard';
  const LS_START = 'gtpm_start_date';
  const LS_GH_TOKEN = 'gtpm_gh_token';
  const LS_GH_REPO = 'gtpm_gh_repo';
  const SYNC_FILE = 'state.json';

  // --- GITHUB SYNC ---
  let syncDebounceTimer = null;

  function getGHConfig() {
    const token = localStorage.getItem(LS_GH_TOKEN);
    const repo = localStorage.getItem(LS_GH_REPO);
    if (!token || !repo) return null;
    return { token, repo };
  }

  function getSyncPayload() {
    return {
      tasks: state.tasks,
      scorecard: state.scorecard,
      startDate: state.startDate,
      lastSync: new Date().toISOString()
    };
  }

  async function ghReadState() {
    const cfg = getGHConfig();
    if (!cfg) return null;
    try {
      const res = await fetch(
        'https://api.github.com/repos/' + cfg.repo + '/contents/' + SYNC_FILE,
        { headers: { 'Authorization': 'token ' + cfg.token, 'Accept': 'application/vnd.github.v3+json' } }
      );
      if (!res.ok) return null;
      const data = await res.json();
      return { content: JSON.parse(atob(data.content)), sha: data.sha };
    } catch(e) { return null; }
  }

  async function ghWriteState() {
    const cfg = getGHConfig();
    if (!cfg) return;
    try {
      // Get current SHA
      let sha = null;
      const existing = await fetch(
        'https://api.github.com/repos/' + cfg.repo + '/contents/' + SYNC_FILE,
        { headers: { 'Authorization': 'token ' + cfg.token, 'Accept': 'application/vnd.github.v3+json' } }
      );
      if (existing.ok) {
        const d = await existing.json();
        sha = d.sha;
      }
      const body = {
        message: 'sync state',
        content: btoa(JSON.stringify(getSyncPayload(), null, 2))
      };
      if (sha) body.sha = sha;
      await fetch(
        'https://api.github.com/repos/' + cfg.repo + '/contents/' + SYNC_FILE,
        {
          method: 'PUT',
          headers: { 'Authorization': 'token ' + cfg.token, 'Accept': 'application/vnd.github.v3+json', 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        }
      );
    } catch(e) { /* silent fail */ }
  }

  function debouncedSync() {
    clearTimeout(syncDebounceTimer);
    syncDebounceTimer = setTimeout(ghWriteState, 2000);
  }

  async function pullAndMerge() {
    const remote = await ghReadState();
    if (!remote || !remote.content) return;
    const r = remote.content;
    // Merge: remote wins for any key that exists remotely
    if (r.startDate && !state.startDate) {
      state.startDate = r.startDate;
      localStorage.setItem(LS_START, r.startDate);
    }
    if (r.tasks) {
      Object.assign(state.tasks, r.tasks);
      // Local true wins over remote false (union merge for completed tasks)
      for (const k in r.tasks) {
        if (r.tasks[k]) state.tasks[k] = true;
      }
      localStorage.setItem(LS_TASKS, JSON.stringify(state.tasks));
    }
    if (r.scorecard) {
      // Higher value wins
      for (const k in r.scorecard) {
        const local = state.scorecard[k] || 0;
        const remote = r.scorecard[k] || 0;
        state.scorecard[k] = Math.max(local, remote);
      }
      for (const k in state.scorecard) {
        if (!(k in r.scorecard)) continue;
      }
      localStorage.setItem(LS_SCORECARD, JSON.stringify(state.scorecard));
    }
    render();
  }

  const CATEGORY_COLORS = {
    'study': '#818cf8',
    'system-design': '#f472b6',
    'behavioral': '#34d399',
    'networking': '#fbbf24',
    'career': '#60a5fa',
    'coding': '#a78bfa',
    'mock-interview': '#fb923c'
  };

  const CATEGORY_LABELS = {
    'study': 'Study',
    'system-design': 'System Design',
    'behavioral': 'Behavioral',
    'networking': 'Networking',
    'career': 'Career',
    'coding': 'Coding',
    'mock-interview': 'Mock Interview'
  };

  let state = {
    currentView: 'today',
    currentDay: 1,
    tasks: {},
    scorecard: {},
    startDate: null
  };

  function loadState() {
    try {
      state.tasks = JSON.parse(localStorage.getItem(LS_TASKS)) || {};
      state.scorecard = JSON.parse(localStorage.getItem(LS_SCORECARD)) || {};
      state.startDate = localStorage.getItem(LS_START);
    } catch(e) {
      state.tasks = {};
      state.scorecard = {};
      state.startDate = null;
    }
  }

  function saveTasks() { localStorage.setItem(LS_TASKS, JSON.stringify(state.tasks)); debouncedSync(); }
  function saveScorecard() { localStorage.setItem(LS_SCORECARD, JSON.stringify(state.scorecard)); debouncedSync(); }

  function getTodayDayNumber() {
    if (!state.startDate) return 1;
    const start = new Date(state.startDate + 'T00:00:00');
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diff = Math.floor((today - start) / 86400000) + 1;
    if (diff < 1) return 1;
    if (diff > 90) return 90;
    return diff;
  }

  function getPhase(dayNum) {
    for (const p of PLAN_DATA.phases) {
      if (dayNum >= p.days[0] && dayNum <= p.days[1]) return p;
    }
    return PLAN_DATA.phases[2];
  }

  function formatMinutes(m) {
    if (m >= 60) {
      const h = Math.floor(m / 60);
      const r = m % 60;
      return r > 0 ? h + 'h ' + r + 'm' : h + 'h';
    }
    return m + 'm';
  }

  function formatDate(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  function isTaskDone(taskId) { return !!state.tasks[taskId]; }

  function toggleTask(taskId) {
    state.tasks[taskId] = !state.tasks[taskId];
    saveTasks();
    render();
  }

  function isDayComplete(dayData) {
    return dayData.tasks.every(t => isTaskDone(t.id));
  }

  function calcStreak() {
    let todayNum = getTodayDayNumber();
    let streak = 0;
    for (let d = todayNum; d >= 1; d--) {
      const dayData = DAYS.find(dd => dd.day === d);
      if (!dayData) break;
      if (isDayComplete(dayData)) streak++;
      else break;
    }
    return streak;
  }

  function calcBestStreak() {
    let best = 0, cur = 0;
    for (let d = 1; d <= 90; d++) {
      const dayData = DAYS.find(dd => dd.day === d);
      if (!dayData) { cur = 0; continue; }
      if (isDayComplete(dayData)) { cur++; best = Math.max(best, cur); }
      else cur = 0;
    }
    return best;
  }

  // --- RENDER ---

  const app = document.getElementById('app');

  function renderSyncBanner() {
    const cfg = getGHConfig();
    if (cfg) return '';
    return `<div class="sync-banner" id="syncBanner">
      <span>&#x1F504; Sync across devices via GitHub</span>
      <button class="btn-setup-sync" id="setupSyncBtn">Set Up</button>
    </div>`;
  }

  function renderSyncSetup() {
    const cfg = getGHConfig();
    app.innerHTML = `
      <h1 style="font-size:24px;font-weight:700;margin-bottom:8px">Sync Settings</h1>
      <p style="font-size:14px;color:var(--text-secondary);margin-bottom:20px">
        Sync your progress across devices using a GitHub file.<br>
        Create a <strong>fine-grained Personal Access Token</strong> at
        github.com &rarr; Settings &rarr; Developer settings &rarr; Personal access tokens &rarr; Fine-grained tokens.<br>
        Scope it to your repo with <strong>Contents: Read and Write</strong> permission.
      </p>
      <div class="score-card">
        <div class="score-label">Repository (owner/repo)</div>
        <input type="text" id="syncRepo" class="sync-input" placeholder="bz-ff/px7q-utils" value="${cfg ? cfg.repo : ''}">
      </div>
      <div class="score-card">
        <div class="score-label">Personal Access Token</div>
        <input type="password" id="syncToken" class="sync-input" placeholder="github_pat_..." value="${cfg ? cfg.token : ''}">
      </div>
      <div style="display:flex;gap:10px;margin-top:16px">
        <button class="btn-start" id="saveSyncBtn">Save & Sync</button>
        <button class="btn-start" id="cancelSyncBtn" style="background:var(--border)">Back</button>
      </div>
      ${cfg ? '<button class="btn-start" id="removeSyncBtn" style="background:#ef4444;margin-top:12px;width:100%">Remove Sync</button>' : ''}
      <div id="syncStatus" style="margin-top:16px;font-size:14px;color:var(--text-secondary)"></div>`;

    document.getElementById('saveSyncBtn').onclick = async () => {
      const repo = document.getElementById('syncRepo').value.trim();
      const token = document.getElementById('syncToken').value.trim();
      if (!repo || !token) return;
      localStorage.setItem(LS_GH_REPO, repo);
      localStorage.setItem(LS_GH_TOKEN, token);
      document.getElementById('syncStatus').textContent = 'Testing connection...';
      const remote = await ghReadState();
      if (remote === null) {
        // No state file yet — push current state
        document.getElementById('syncStatus').textContent = 'Connected! Pushing current state...';
        await ghWriteState();
      } else {
        document.getElementById('syncStatus').textContent = 'Connected! Pulling remote state...';
        await pullAndMerge();
      }
      document.getElementById('syncStatus').innerHTML = '<span style="color:#22c55e">Sync active!</span> Returning...';
      setTimeout(() => switchView('today'), 1000);
    };
    document.getElementById('cancelSyncBtn').onclick = () => switchView('today');
    const removeBtn = document.getElementById('removeSyncBtn');
    if (removeBtn) {
      removeBtn.onclick = () => {
        localStorage.removeItem(LS_GH_TOKEN);
        localStorage.removeItem(LS_GH_REPO);
        switchView('today');
      };
    }
  }

  function render() {
    if (state.currentView === 'sync') {
      renderSyncSetup();
      return;
    }
    if (!state.startDate) {
      renderOnboarding();
      return;
    }
    switch(state.currentView) {
      case 'today': renderToday(); break;
      case 'calendar': renderCalendar(); break;
      case 'progress': renderProgress(); break;
      case 'scorecard': renderScorecard(); break;
    }
    // Bind sync buttons
    const setupBtn = document.getElementById('setupSyncBtn');
    if (setupBtn) setupBtn.onclick = () => switchView('sync');
    const syncBtn = document.getElementById('syncIndicBtn');
    if (syncBtn) syncBtn.onclick = () => switchView('sync');
  }

  function renderOnboarding() {
    app.innerHTML = `
      <div class="onboarding">
        <h2>Google TPM 90-Day Plan</h2>
        <p>Your guided checklist for Google TPM interview preparation. 90 days, ~225 hours, one goal.</p>
        <button class="btn-start" id="startBtn">Start Today</button>
      </div>`;
    document.getElementById('startBtn').onclick = () => {
      const today = new Date();
      const iso = today.getFullYear() + '-' +
        String(today.getMonth()+1).padStart(2,'0') + '-' +
        String(today.getDate()).padStart(2,'0');
      localStorage.setItem(LS_START, iso);
      state.startDate = iso;
      state.currentDay = 1;
      render();
    };
  }

  function renderToday() {
    const dayNum = state.currentDay;
    const dayData = DAYS.find(d => d.day === dayNum);
    if (!dayData) { app.innerHTML = '<p>Day not found.</p>'; return; }

    const phase = getPhase(dayNum);
    const todayNum = getTodayDayNumber();
    const isPlanDone = todayNum >= 90 && isDayComplete(DAYS.find(d => d.day === 90));

    const totalMin = dayData.tasks.reduce((s, t) => s + t.minutes, 0);
    const doneCount = dayData.tasks.filter(t => isTaskDone(t.id)).length;
    const allDone = doneCount === dayData.tasks.length;
    const pct = dayData.tasks.length > 0 ? Math.round(doneCount / dayData.tasks.length * 100) : 0;

    // Group tasks by category
    const groups = {};
    dayData.tasks.forEach(t => {
      if (!groups[t.category]) groups[t.category] = [];
      groups[t.category].push(t);
    });

    const catOrder = ['study','system-design','behavioral','networking','career','coding','mock-interview'];
    const sortedCats = Object.keys(groups).sort((a,b) => catOrder.indexOf(a) - catOrder.indexOf(b));

    let tasksHtml = '';
    const multiCat = sortedCats.length > 1;
    for (const cat of sortedCats) {
      if (multiCat) {
        tasksHtml += `<div class="category-group"><div class="category-label" style="color:${CATEGORY_COLORS[cat]}">${CATEGORY_LABELS[cat]}</div>`;
      }
      for (const t of groups[cat]) {
        const done = isTaskDone(t.id);
        tasksHtml += `
          <div class="task-card ${done ? 'done' : ''}" data-id="${t.id}">
            <div class="task-check">${done ? '&#10003;' : ''}</div>
            <div class="task-content">
              <div class="task-text">${esc(t.text)}</div>
            </div>
            <div class="task-time">${formatMinutes(t.minutes)}</div>
          </div>`;
      }
      if (multiCat) tasksHtml += '</div>';
    }

    let milestoneHtml = '';
    if (dayData.isMilestone) {
      milestoneHtml = `<div class="milestone-banner">&#x1F3AF; MILESTONE: ${esc(dayData.milestoneText)}</div>`;
    }

    const weekdayType = ['Saturday','Sunday'].includes(dayData.weekday) ? 'Weekend' : 'Weekday';

    const syncBanner = renderSyncBanner();
    const syncIndicator = getGHConfig() ? '<div class="sync-active" id="syncIndicBtn">&#x2601; Synced</div>' : '';

    app.innerHTML = `
      ${syncBanner}
      ${milestoneHtml}
      <div class="day-header">
        <div style="display:flex;justify-content:space-between;align-items:center">${syncIndicator}</div>
        <div class="day-nav">
          <button class="nav-arrow" id="prevDay">&#9664;</button>
          <h1>Day ${dayNum} of 90</h1>
          <button class="nav-arrow" id="nextDay">&#9654;</button>
        </div>
        <div class="phase-label">PHASE ${phase.id}: ${phase.name.toUpperCase()}</div>
        <div class="day-meta">${formatDate(dayData.date)}</div>
        <div class="day-context">${weekdayType} &middot; ${formatMinutes(totalMin)} estimated</div>
      </div>
      ${tasksHtml}
      <div class="day-footer">
        <div class="progress-text">${doneCount} of ${dayData.tasks.length} tasks complete</div>
        <div class="progress-bar"><div class="progress-fill ${allDone ? 'complete' : ''}" style="width:${pct}%"></div></div>
        <div class="day-total-time">Total: ${formatMinutes(totalMin)}</div>
        ${allDone ? '<div class="day-complete-msg">Day complete! &#x1F3AF;</div>' : ''}
      </div>`;

    document.getElementById('prevDay').onclick = () => { if (dayNum > 1) { state.currentDay = dayNum - 1; render(); } };
    document.getElementById('nextDay').onclick = () => { if (dayNum < 90) { state.currentDay = dayNum + 1; render(); } };

    app.querySelectorAll('.task-card').forEach(el => {
      el.onclick = () => toggleTask(el.dataset.id);
    });
  }

  function renderCalendar() {
    const todayNum = getTodayDayNumber();
    const headers = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

    function getMondayOffset(dt) {
      const dow = dt.getDay(); // 0=Sun
      return dow === 0 ? 6 : dow - 1;
    }

    function addHeaders(h) {
      let out = '';
      h.forEach(x => { out += `<div class="cal-header">${x}</div>`; });
      return out;
    }

    function padRow(col) {
      let out = '';
      for (let e = 0; e < col; e++) out += '<div class="cal-cell empty"></div>';
      return out;
    }

    function finishRow(col) {
      let out = '';
      if (col > 0 && col < 7) {
        for (let e = col; e < 7; e++) out += '<div class="cal-cell empty"></div>';
      }
      return out;
    }

    let html = '<h1 style="font-size:24px;font-weight:700;margin-bottom:16px">Calendar</h1>';
    html += '<div class="calendar-grid">';
    let lastPhase = 0;
    let lastMonth = '';
    let gridCol = 0; // 0-6, tracks current position in the 7-col grid

    for (let d = 1; d <= 90; d++) {
      const dayData = DAYS.find(dd => dd.day === d);
      if (!dayData) continue;

      const dt = new Date(dayData.date + 'T00:00:00');
      const col = getMondayOffset(dt);
      const phase = getPhase(d);
      const monthName = dt.toLocaleDateString('en-US', { month: 'long' });

      // Phase divider — finish current row, insert divider + headers, reset
      if (phase.id !== lastPhase) {
        html += finishRow(gridCol);
        lastPhase = phase.id;
        lastMonth = '';
        html += `<div class="phase-divider">Phase ${phase.id}: ${phase.name}</div>`;
        html += addHeaders(headers);
        gridCol = 0;
      }

      // Month label — finish current row, insert label, reset
      if (monthName !== lastMonth) {
        if (lastMonth !== '') html += finishRow(gridCol);
        lastMonth = monthName;
        html += `<div class="month-label">${monthName}</div>`;
        gridCol = 0;
      }

      // Pad empty cells to align to correct weekday column
      if (gridCol === 0) {
        html += padRow(col);
        gridCol = col;
      } else if (col < gridCol) {
        // Wrap to next row — fill remainder then pad new row
        html += finishRow(gridCol);
        html += padRow(col);
        gridCol = col;
      } else {
        // Fill gap within same row
        for (let e = gridCol; e < col; e++) html += '<div class="cal-cell empty"></div>';
        gridCol = col;
      }

      const isToday = d === todayNum;
      const allDone = isDayComplete(dayData);
      const someDone = dayData.tasks.some(t => isTaskDone(t.id));
      const isPast = d < todayNum;

      let status = '';
      if (allDone) status = '<span style="color:#22c55e">&#x2705;</span>';
      else if (someDone) status = '<span style="color:#f59e0b">&#x1F7E1;</span>';
      else if (isPast) status = '<span style="color:#6b7280">&#x26AA;</span>';

      const dateShort = (dt.getMonth()+1) + '/' + dt.getDate();
      html += `<div class="cal-cell ${isToday ? 'today' : ''}" data-day="${d}">
        <div class="cal-day-num">${d}</div>
        <div class="cal-date">${dateShort}</div>
        <div class="cal-status">${status}</div>
      </div>`;
      gridCol++;
      if (gridCol >= 7) gridCol = 0;
    }

    html += finishRow(gridCol);
    html += '</div>';
    app.innerHTML = html;

    app.querySelectorAll('.cal-cell[data-day]').forEach(el => {
      el.onclick = () => {
        state.currentDay = parseInt(el.dataset.day);
        switchView('today');
      };
    });
  }

  function renderProgress() {
    const todayNum = getTodayDayNumber();
    const totalTasks = DAYS.reduce((s, d) => s + d.tasks.length, 0);
    const completedTasks = DAYS.reduce((s, d) => s + d.tasks.filter(t => isTaskDone(t.id)).length, 0);
    const taskPct = totalTasks > 0 ? Math.round(completedTasks / totalTasks * 100) : 0;

    const daysComplete = DAYS.filter(d => isDayComplete(d)).length;
    const dayPct = Math.round(daysComplete / 90 * 100);

    const streak = calcStreak();
    const bestStreak = calcBestStreak();

    const totalMinutes = DAYS.reduce((s, d) => s + d.tasks.reduce((ss, t) => ss + t.minutes, 0), 0);
    const completedMinutes = DAYS.reduce((s, d) => s + d.tasks.filter(t => isTaskDone(t.id)).reduce((ss, t) => ss + t.minutes, 0), 0);
    const totalHours = Math.round(totalMinutes / 60);
    const completedHours = Math.round(completedMinutes / 60);

    // Phase breakdown
    let phasesHtml = '';
    for (const p of PLAN_DATA.phases) {
      const pDays = DAYS.filter(d => d.day >= p.days[0] && d.day <= p.days[1]);
      const pComplete = pDays.filter(d => isDayComplete(d)).length;
      const pTotal = p.days[1] - p.days[0] + 1;
      const pPct = Math.round(pComplete / pTotal * 100);
      phasesHtml += `
        <div class="stat-card">
          <h3>Phase ${p.id}</h3>
          <div class="stat-big">${pComplete}/${pTotal}</div>
          <div class="stat-sub">${p.name}</div>
          <div class="progress-bar" style="margin-top:8px"><div class="progress-fill ${pPct===100?'complete':''}" style="width:${pPct}%"></div></div>
        </div>`;
    }

    // Milestones
    let milestonesHtml = '';
    for (const m of PLAN_DATA.milestones) {
      const mDone = m.day <= todayNum && isDayComplete(DAYS.find(d => d.day === m.day));
      milestonesHtml += `
        <div class="milestone-item">
          <span class="milestone-check">${mDone ? '&#x2705;' : '&#x2B1C;'}</span>
          <span>Day ${m.day}: ${esc(m.text)}</span>
        </div>`;
    }

    // Weekly summary
    let weeklyHtml = '';
    const weeks = [];
    for (let w = 0; w < 13; w++) {
      let wDone = 0, wTotal = 0;
      for (let d = w * 7 + 1; d <= Math.min((w + 1) * 7, 90); d++) {
        const dd = DAYS.find(x => x.day === d);
        if (dd) {
          wTotal += dd.tasks.length;
          wDone += dd.tasks.filter(t => isTaskDone(t.id)).length;
        }
      }
      weeks.push({ done: wDone, total: wTotal });
    }
    const maxWeekTotal = Math.max(...weeks.map(w => w.total), 1);
    for (let i = 0; i < weeks.length; i++) {
      const h = weeks[i].total > 0 ? Math.round(weeks[i].done / maxWeekTotal * 60) : 0;
      weeklyHtml += `<div class="weekly-col">
        <div class="weekly-fill" style="height:${Math.max(h, 2)}px;${weeks[i].done === weeks[i].total && weeks[i].total > 0 ? 'background:#22c55e' : ''}"></div>
        <div class="weekly-label">W${i+1}</div>
      </div>`;
    }

    app.innerHTML = `
      <h1 style="font-size:24px;font-weight:700;margin-bottom:16px">Progress</h1>
      <div class="stat-card">
        <h3>Overall Progress</h3>
        <div class="stat-big">${daysComplete} of 90 days</div>
        <div class="stat-sub">${dayPct}% &middot; ${completedTasks}/${totalTasks} tasks</div>
        <div class="progress-bar" style="margin-top:10px"><div class="progress-fill ${dayPct===100?'complete':''}" style="width:${dayPct}%"></div></div>
      </div>
      <div class="streak-row">
        <div class="stat-card">
          <h3>Current Streak</h3>
          <div class="stat-big">&#x1F525; ${streak}</div>
          <div class="stat-sub">days</div>
        </div>
        <div class="stat-card">
          <h3>Best Streak</h3>
          <div class="stat-big">${bestStreak}</div>
          <div class="stat-sub">days</div>
        </div>
      </div>
      <div class="phase-cards">${phasesHtml}</div>
      <div class="stat-card">
        <h3>Time Investment</h3>
        <div class="stat-big">${completedHours} of ${totalHours} hrs</div>
        <div class="progress-bar" style="margin-top:10px"><div class="progress-fill" style="width:${Math.round(completedHours/totalHours*100)}%"></div></div>
      </div>
      <div class="stat-card">
        <h3>Milestones</h3>
        <div class="milestone-list">${milestonesHtml}</div>
      </div>
      <div class="stat-card">
        <h3>Weekly Summary</h3>
        <div class="weekly-bar">${weeklyHtml}</div>
      </div>`;
  }

  function renderScorecard() {
    let html = '<h1 style="font-size:24px;font-weight:700;margin-bottom:16px">Scorecard</h1>';
    for (const s of SCORECARD) {
      const val = state.scorecard[s.id] || 0;
      const met = val >= s.target;
      const pct = Math.min(Math.round(val / s.target * 100), 100);
      html += `
        <div class="score-card ${met ? 'met' : ''}">
          <div class="score-label">${esc(s.label)}</div>
          <div class="score-row">
            <button class="score-btn" data-id="${s.id}" data-action="dec">-</button>
            <div class="score-value" style="${met ? 'color:#22c55e' : ''}">${val} / ${s.target}</div>
            <div class="score-bar">
              <div class="progress-bar"><div class="progress-fill ${met ? 'complete' : ''}" style="width:${pct}%"></div></div>
            </div>
            <button class="score-btn" data-id="${s.id}" data-action="inc">+</button>
          </div>
        </div>`;
    }
    // Milestones section
    html += '<h2 style="font-size:18px;font-weight:700;margin:24px 0 12px">Milestones</h2>';
    const todayNum = getTodayDayNumber();
    for (const m of PLAN_DATA.milestones) {
      const dayData = DAYS.find(dd => dd.day === m.day);
      const goalDate = dayData ? formatDate(dayData.date) : 'Day ' + m.day;
      const mDone = m.day <= todayNum && isDayComplete(dayData);
      const isPast = m.day < todayNum && !mDone;
      let borderColor = 'var(--border)';
      if (mDone) borderColor = 'rgba(34,197,94,.4)';
      else if (isPast) borderColor = 'rgba(245,158,11,.4)';
      html += `
        <div class="score-card" style="border-color:${borderColor}">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px">
            <div>
              <div class="score-label" style="margin-bottom:4px">${mDone ? '&#x2705;' : '&#x2B1C;'} ${esc(m.text)}</div>
              <div style="font-size:13px;color:var(--text-muted)">Day ${m.day} &middot; ${goalDate}</div>
            </div>
          </div>
        </div>`;
    }

    app.innerHTML = html;

    app.querySelectorAll('.score-btn').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        const cur = state.scorecard[id] || 0;
        if (btn.dataset.action === 'inc') {
          state.scorecard[id] = cur + 1;
        } else {
          state.scorecard[id] = Math.max(0, cur - 1);
        }
        saveScorecard();
        render();
      };
    });
  }

  function esc(s) {
    const el = document.createElement('span');
    el.textContent = s;
    return el.innerHTML;
  }

  function switchView(view) {
    state.currentView = view;
    document.querySelectorAll('.nav-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.view === view);
    });
    render();
  }

  // --- INIT ---
  loadState();
  state.currentDay = getTodayDayNumber();

  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.onclick = () => switchView(tab.dataset.view);
  });

  render();

  // Pull from GitHub on load if configured
  if (getGHConfig()) {
    pullAndMerge();
  }

  // PWA
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
})();
