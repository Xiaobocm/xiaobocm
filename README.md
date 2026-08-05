<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Xiaobocm · 二次元个人主页</title>
    <!-- Font Awesome 图标库 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background: linear-gradient(145deg, #f7f0fc 0%, #e9def0 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', system-ui, -apple-system, sans-serif;
            padding: 2rem 1rem;
        }

        /* 主卡片 —— 二次元风格，柔和圆润 */
        .profile-card {
            max-width: 1000px;
            width: 100%;
            background: rgba(255, 255, 255, 0.75);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-radius: 48px;
            padding: 2.5rem 2.8rem;
            box-shadow: 0 20px 50px rgba(140, 90, 170, 0.25),
                        0 0 0 1px rgba(255, 215, 255, 0.5) inset;
            transition: all 0.2s ease;
            border: 1px solid rgba(255, 230, 255, 0.6);
            position: relative;
            overflow: hidden;
        }

        /* 装饰小元素 —— 二次元飘浮感 */
        .profile-card::before {
            content: "✦ ✦ ✦";
            position: absolute;
            top: -10px;
            right: 30px;
            font-size: 1.8rem;
            color: rgba(200, 150, 220, 0.2);
            letter-spacing: 12px;
            pointer-events: none;
        }

        .profile-card::after {
            content: "🌸";
            position: absolute;
            bottom: 20px;
            left: 20px;
            font-size: 4rem;
            opacity: 0.08;
            pointer-events: none;
            transform: rotate(-10deg);
        }

        /* ===== 语言切换栏 ===== */
        .lang-toggle {
            display: flex;
            justify-content: flex-end;
            gap: 0.8rem;
            margin-bottom: 2rem;
            position: relative;
            z-index: 2;
        }

        .lang-btn {
            background: transparent;
            border: none;
            font-size: 1rem;
            font-weight: 600;
            padding: 0.4rem 1rem;
            border-radius: 40px;
            cursor: pointer;
            color: #7a5a8a;
            background: rgba(240, 225, 255, 0.4);
            backdrop-filter: blur(4px);
            transition: 0.2s;
            box-shadow: 0 2px 6px rgba(0,0,0,0.02);
            border: 1px solid transparent;
            letter-spacing: 0.5px;
        }

        .lang-btn.active {
            background: #b28bc7;
            color: white;
            box-shadow: 0 6px 14px rgba(160, 110, 190, 0.3);
            border-color: #c9a8dd;
        }

        .lang-btn:hover {
            transform: scale(0.96);
            background: #d7bce6;
            color: #3f2a4a;
        }

        .lang-btn.active:hover {
            background: #a078ba;
            color: white;
        }

        /* ===== 头像 & 头部 ===== */
        .profile-header {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 2rem;
            margin-bottom: 2.2rem;
        }

        .avatar-wrapper {
            position: relative;
            flex-shrink: 0;
        }

        .avatar {
            width: 120px;
            height: 120px;
            background: radial-gradient(circle at 30% 30%, #f3d9ff, #c8a0da);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 3.8rem;
            font-weight: 400;
            color: #4f315f;
            box-shadow: 0 12px 28px rgba(130, 80, 160, 0.25);
            border: 4px solid rgba(255, 240, 255, 0.7);
            transition: 0.2s;
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="40" r="28" fill="%23f2d9ff" opacity="0.4"/><circle cx="50" cy="40" r="20" fill="%23dec4f0" opacity="0.3"/></svg>');
            background-size: cover;
            background-blend-mode: soft-light;
        }

        .avatar i {
            filter: drop-shadow(0 4px 6px rgba(0,0,0,0.05));
            background: rgba(255,255,255,0.3);
            padding: 12px;
            border-radius: 60px;
            backdrop-filter: blur(2px);
        }

        .title-group {
            flex: 1;
        }

        .title-group h1 {
            font-size: 2.8rem;
            font-weight: 700;
            color: #2a1a30;
            letter-spacing: -0.5px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.4rem 1rem;
        }

        .title-group h1 small {
            font-size: 1.2rem;
            font-weight: 400;
            color: #7b5e8a;
            background: rgba(215, 185, 230, 0.3);
            padding: 0.1rem 1rem;
            border-radius: 40px;
            backdrop-filter: blur(2px);
        }

        .subhead {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 1rem 1.8rem;
            margin-top: 0.5rem;
        }

        .subhead .location {
            font-size: 1.1rem;
            color: #4b3657;
            background: rgba(225, 205, 240, 0.5);
            padding: 0.25rem 1.2rem;
            border-radius: 40px;
            backdrop-filter: blur(4px);
            border: 1px solid rgba(255, 215, 255, 0.5);
        }

        .subhead .quote {
            font-style: italic;
            color: #5d4570;
            opacity: 0.8;
            font-size: 1rem;
            letter-spacing: 0.3px;
        }

        /* ===== 状态卡片 ===== */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1.2rem;
            margin: 2.2rem 0 2.5rem 0;
        }

        .stat-item {
            background: rgba(250, 240, 255, 0.5);
            backdrop-filter: blur(4px);
            border-radius: 60px;
            padding: 0.8rem 1.2rem;
            text-align: center;
            border: 1px solid rgba(255, 220, 255, 0.5);
            box-shadow: 0 4px 12px rgba(140, 90, 170, 0.06);
            transition: 0.15s;
        }

        .stat-item:hover {
            transform: translateY(-3px);
            background: rgba(245, 230, 255, 0.7);
            border-color: #dbb8ec;
        }

        .stat-number {
            font-size: 2.2rem;
            font-weight: 700;
            color: #3a2647;
            letter-spacing: 1px;
        }

        .stat-label {
            font-size: 0.9rem;
            color: #654d73;
            font-weight: 500;
            margin-top: 0.1rem;
        }

        /* ===== 热力图区域 ===== */
        .heatmap-section {
            background: rgba(250, 240, 255, 0.3);
            backdrop-filter: blur(4px);
            border-radius: 40px;
            padding: 1.8rem 1.8rem 1.8rem 1.8rem;
            margin: 2rem 0 2.2rem 0;
            border: 1px solid rgba(255, 215, 255, 0.5);
            box-shadow: 0 6px 18px rgba(120, 70, 150, 0.06);
        }

        .heatmap-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.2rem;
            flex-wrap: wrap;
            gap: 0.5rem;
        }

        .heatmap-title h3 {
            font-size: 1.2rem;
            font-weight: 600;
            color: #3a2647;
            display: flex;
            align-items: center;
            gap: 0.6rem;
        }

        .heatmap-title h3 i {
            color: #a06eb8;
            font-size: 1.3rem;
        }

        .heatmap-grid {
            display: grid;
            grid-template-columns: repeat(52, 1fr);
            gap: 5px;
            background: rgba(235, 215, 245, 0.15);
            border-radius: 30px;
            padding: 0.8rem 0.8rem;
            max-width: 100%;
            overflow-x: auto;
        }

        .heat-cell {
            aspect-ratio: 1 / 1;
            background: #e3d0ed;
            border-radius: 8px;
            transition: 0.1s ease;
            min-width: 12px;
            min-height: 12px;
            box-shadow: 0 0 0 1px rgba(200, 170, 220, 0.2);
        }

        /* 热力颜色梯度 (二次元梦幻) */
        .heat-cell.lv0 { background: #e9daf2; }
        .heat-cell.lv1 { background: #d6b8e8; }
        .heat-cell.lv2 { background: #c095db; }
        .heat-cell.lv3 { background: #a872c9; }
        .heat-cell.lv4 { background: #8d4fb3; }
        .heat-cell.lv5 { background: #6f3297; }
        .heat-cell.lv6 { background: #551b7a; }

        .heat-cell:hover {
            transform: scale(1.6);
            border-radius: 12px;
            box-shadow: 0 0 16px #b284d4;
            z-index: 10;
            position: relative;
        }

        .heatmap-legend {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 0.3rem 0.8rem;
            flex-wrap: wrap;
            margin-top: 1rem;
            font-size: 0.75rem;
            color: #4f365d;
        }

        .legend-colors {
            display: flex;
            gap: 3px;
        }

        .legend-colors span {
            width: 18px;
            height: 18px;
            border-radius: 6px;
            display: inline-block;
        }

        /* ===== 二次元装饰文字 ===== */
        .footer-note {
            margin-top: 2rem;
            display: flex;
            justify-content: center;
            gap: 0.8rem 2rem;
            flex-wrap: wrap;
            color: #6b4f7a;
            font-size: 0.9rem;
            border-top: 1px dashed #d4b8e6;
            padding-top: 1.8rem;
            opacity: 0.8;
        }

        .footer-note i {
            margin-right: 6px;
            color: #b586cc;
        }

        .footer-note span {
            background: rgba(235, 215, 245, 0.3);
            padding: 0.2rem 1.2rem;
            border-radius: 40px;
        }

        /* ===== 语言内容切换 ===== */
        .lang-content {
            display: block;
        }

        .lang-content.hidden {
            display: none;
        }

        /* 响应式 */
        @media (max-width: 700px) {
            .profile-card {
                padding: 1.8rem 1.5rem;
                border-radius: 32px;
            }
            .title-group h1 {
                font-size: 2.2rem;
            }
            .avatar {
                width: 90px;
                height: 90px;
                font-size: 2.8rem;
            }
            .stats-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 0.8rem;
            }
            .heatmap-grid {
                gap: 4px;
                padding: 0.4rem;
            }
            .heat-cell {
                min-width: 10px;
                min-height: 10px;
            }
        }

        @media (max-width: 480px) {
            .profile-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 1rem;
            }
            .lang-toggle {
                justify-content: center;
            }
            .heat-cell {
                min-width: 8px;
                min-height: 8px;
                border-radius: 5px;
            }
        }
    </style>
</head>
<body>

<div class="profile-card">

    <!-- ===== 语言切换按钮 ===== -->
    <div class="lang-toggle">
        <button class="lang-btn active" data-lang="zh" id="langZh">🇨🇳 中文</button>
        <button class="lang-btn" data-lang="en" id="langEn">🇬🇧 English</button>
    </div>

    <!-- ===== 中文内容 ===== -->
    <div id="contentZh" class="lang-content">
        <!-- 头部 -->
        <div class="profile-header">
            <div class="avatar-wrapper">
                <div class="avatar"><i class="fas fa-cat"></i></div>
            </div>
            <div class="title-group">
                <h1>
                    Xiaobocm
                    <small>✦ 小波</small>
                </h1>
                <div class="subhead">
                    <span class="location"><i class="fas fa-map-pin" style="margin-right: 6px;"></i>中国 · 宁波</span>
                    <span class="quote"><i class="fas fa-quote-left" style="opacity: 0.5;"></i> 代码与动漫，皆我所爱</span>
                </div>
            </div>
        </div>

        <!-- 统计卡片 -->
        <div class="stats-grid">
            <div class="stat-item">
                <div class="stat-number">18</div>
                <div class="stat-label"><i class="fas fa-code-branch"></i> 公开仓库</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">6</div>
                <div class="stat-label"><i class="fas fa-star"></i> 星标总数</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">12</div>
                <div class="stat-label"><i class="fas fa-user-friends"></i> 关注者</div>
            </div>
        </div>

        <!-- 热力图 -->
        <div class="heatmap-section">
            <div class="heatmap-title">
                <h3><i class="fas fa-fire"></i> 贡献热力图 · 2026</h3>
                <span style="font-size:0.85rem; background:#e5d2f0; padding:0.2rem 1rem; border-radius:30px;">🌸 春日活力</span>
            </div>
            <div class="heatmap-grid" id="heatmapContainer">
                <!-- 由 JS 生成 52 列，每列 7 行 (共 364 个格子) -->
            </div>
            <div class="heatmap-legend">
                <span>少</span>
                <div class="legend-colors">
                    <span class="heat-cell lv0"></span>
                    <span class="heat-cell lv1"></span>
                    <span class="heat-cell lv2"></span>
                    <span class="heat-cell lv3"></span>
                    <span class="heat-cell lv4"></span>
                    <span class="heat-cell lv5"></span>
                    <span class="heat-cell lv6"></span>
                </div>
                <span>多</span>
                <span style="margin-left: 0.8rem;"><i class="far fa-calendar-alt"></i> 每周活跃</span>
            </div>
        </div>

        <!-- 底部小语 -->
        <div class="footer-note">
            <span><i class="fas fa-palette"></i> 二次元浓度 99%</span>
            <span><i class="fas fa-graduation-cap"></i> 学生 · 宁波</span>
            <span><i class="fas fa-heart" style="color:#c77daf;"></i> 永远热爱</span>
        </div>
    </div>

    <!-- ===== 英文内容 ===== -->
    <div id="contentEn" class="lang-content hidden">
        <div class="profile-header">
            <div class="avatar-wrapper">
                <div class="avatar"><i class="fas fa-cat"></i></div>
            </div>
            <div class="title-group">
                <h1>
                    Xiaobocm
                    <small>✦ XiaoBo</small>
                </h1>
                <div class="subhead">
                    <span class="location"><i class="fas fa-map-pin" style="margin-right: 6px;"></i>Ningbo · China</span>
                    <span class="quote"><i class="fas fa-quote-left" style="opacity: 0.5;"></i> Code & Anime, my fuel</span>
                </div>
            </div>
        </div>

        <div class="stats-grid">
            <div class="stat-item">
                <div class="stat-number">18</div>
                <div class="stat-label"><i class="fas fa-code-branch"></i> Public Repos</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">6</div>
                <div class="stat-label"><i class="fas fa-star"></i> Stars</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">12</div>
                <div class="stat-label"><i class="fas fa-user-friends"></i> Followers</div>
            </div>
        </div>

        <div class="heatmap-section">
            <div class="heatmap-title">
                <h3><i class="fas fa-fire"></i> Contribution Heatmap · 2026</h3>
                <span style="font-size:0.85rem; background:#e5d2f0; padding:0.2rem 1rem; border-radius:30px;">🌸 spring vibes</span>
            </div>
            <div class="heatmap-grid" id="heatmapContainerEn">
                <!-- 同样由 JS 生成 -->
            </div>
            <div class="heatmap-legend">
                <span>Less</span>
                <div class="legend-colors">
                    <span class="heat-cell lv0"></span>
                    <span class="heat-cell lv1"></span>
                    <span class="heat-cell lv2"></span>
                    <span class="heat-cell lv3"></span>
                    <span class="heat-cell lv4"></span>
                    <span class="heat-cell lv5"></span>
                    <span class="heat-cell lv6"></span>
                </div>
                <span>More</span>
                <span style="margin-left: 0.8rem;"><i class="far fa-calendar-alt"></i> weekly activity</span>
            </div>
        </div>

        <div class="footer-note">
            <span><i class="fas fa-palette"></i> 99% anime energy</span>
            <span><i class="fas fa-graduation-cap"></i> Student · Ningbo</span>
            <span><i class="fas fa-heart" style="color:#c77daf;"></i> forever passionate</span>
        </div>
    </div>

</div>

<script>
    (function() {
        // ---- 语言切换 ----
        const zhBtn = document.getElementById('langZh');
        const enBtn = document.getElementById('langEn');
        const zhContent = document.getElementById('contentZh');
        const enContent = document.getElementById('contentEn');

        function setLanguage(lang) {
            if (lang === 'zh') {
                zhContent.classList.remove('hidden');
                enContent.classList.add('hidden');
                zhBtn.classList.add('active');
                enBtn.classList.remove('active');
            } else {
                zhContent.classList.add('hidden');
                enContent.classList.remove('hidden');
                enBtn.classList.add('active');
                zhBtn.classList.remove('active');
            }
        }

        zhBtn.addEventListener('click', () => setLanguage('zh'));
        enBtn.addEventListener('click', () => setLanguage('en'));

        // ---- 生成热力图 (52周 x 7天) ----
        function renderHeatmap(containerId) {
            const container = document.getElementById(containerId);
            if (!container) return;
            container.innerHTML = '';
            const totalCells = 52 * 7; // 364
            // 随机生成 0~6 等级 (让热力看起来自然)
            for (let i = 0; i < totalCells; i++) {
                const cell = document.createElement('div');
                cell.className = 'heat-cell';
                // 随机等级，但让分布更贴近真实 (中间多，两端少)
                let level = 0;
                const rand = Math.random();
                if (rand < 0.25) level = 0;
                else if (rand < 0.45) level = 1;
                else if (rand < 0.65) level = 2;
                else if (rand < 0.80) level = 3;
                else if (rand < 0.92) level = 4;
                else if (rand < 0.98) level = 5;
                else level = 6;
                // 额外加一点“周末”活跃倾向 (星期六日 index 5,6 提高等级)
                const dayOfWeek = i % 7;
                if (dayOfWeek === 5 || dayOfWeek === 6) {
                    level = Math.min(6, level + 1);
                }
                cell.classList.add('lv' + level);
                // 加一点小提示 (hover)
                cell.title = `贡献等级 ${level}`;
                container.appendChild(cell);
            }
        }

        // 渲染两个热力图 (分别对应中英文)
        renderHeatmap('heatmapContainer');
        renderHeatmap('heatmapContainerEn');

        // 默认中文激活 (已经 active)
        // 如果用户浏览器语言为英文，可选择性切换，但保留手动切换。
        // 这里不做自动切换，由用户点击。
    })();
</script>

<!-- 说明：此 README 风格二次元，支持中英文切换，展示热力图及仓库数量等。 欢迎使用 ✦ -->
</body>
</html>
