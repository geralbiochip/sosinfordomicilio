
(function() {
  var CAMINHO_IMAGEM = 'assets/animacao-casa/casa-inteira.png'; // Altera para 'img/casa-inteira.png' se estiver numa subpasta

  var canvas = document.getElementById('infordomicilioCanvas');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  var SIZE = 1000;
  canvas.width = SIZE;
  canvas.height = SIZE;

  var imagemAtual = null;
  var primeiroEstilhaco = null;
  var primeiraParticula = null;
  var rato = { x: SIZE / 2, y: SIZE / 2, ativo: false };

  canvas.addEventListener('mousemove', function(e) {
    var rect = canvas.getBoundingClientRect();
    rato.x = ((e.clientX - rect.left) / rect.width) * SIZE;
    rato.y = ((e.clientY - rect.top) / rect.height) * SIZE;
    rato.ativo = true;
  });

  canvas.addEventListener('mouseleave', function() {
    rato.ativo = false;
  });

  function hash(x, y) {
    var s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
    return s - Math.floor(s);
  }

  function construirMalha() {
    var COLS = 18, ROWS = 18, cw = SIZE / COLS, ch = SIZE / ROWS;
    var pontos = {};
    for (var r = 0; r <= ROWS; r++) {
      for (var c = 0; c <= COLS; c++) {
        var borda = (r === 0 || r === ROWS || c === 0 || c === COLS);
        pontos['p_' + r + '_' + c] = {
          x: c * cw + (borda ? 0 : (hash(c, r) - 0.5) * cw * 0.65),
          y: r * ch + (borda ? 0 : (hash(r + 50, c + 50) - 0.5) * ch * 0.65)
        };
      }
    }

    var centroX = SIZE * 0.5, centroY = SIZE * 0.5, idx = 0;
    primeiroEstilhaco = null;

    for (var r = 0; r < ROWS; r++) {
      for (var c = 0; c < COLS; c++) {
        var p00 = pontos['p_' + r + '_' + c];
        var p10 = pontos['p_' + r + '_' + (c + 1)];
        var p01 = pontos['p_' + (r + 1) + '_' + c];
        var p11 = pontos['p_' + (r + 1) + '_' + (c + 1)];
        var triA = ((r + c) % 2 === 0) ? { p1: p00, p2: p10, p3: p11 } : { p1: p00, p2: p10, p3: p01 };
        var triB = ((r + c) % 2 === 0) ? { p1: p00, p2: p11, p3: p01 } : { p1: p10, p2: p11, p3: p01 };

        var par = { a: triA, b: triB };
        for (var k in par) {
          var tri = par[k];
          var cx = (tri.p1.x + tri.p2.x + tri.p3.x) / 3;
          var cy = (tri.p1.y + tri.p2.y + tri.p3.y) / 3;
          var dx = cx - centroX, dy = cy - centroY;
          var dist = Math.sqrt(dx * dx + dy * dy) || 1;
          var distNorm = Math.min(1, dist / (SIZE * 0.52));
          if (distNorm > 0.92) continue;

          var impulso = (28 + Math.pow(distNorm, 1.2) * 145) * (0.65 + hash(cx, cy) * 0.75);
          var ang = Math.atan2(dy, dx) + (hash(cy, cx) - 0.5) * 0.65;

          primeiroEstilhaco = {
            id: idx++, p1: tri.p1, p2: tri.p2, p3: tri.p3, cx: cx, cy: cy,
            vx: Math.cos(ang) * impulso, vy: Math.sin(ang) * impulso - (14 * hash(cx, r)),
            rot: (hash(c, cy) - 0.5) * 2.5, flipX: (hash(r, cx) - 0.5) * 0.9,
            delay: distNorm * 0.42, next: primeiroEstilhaco
          };
        }
      }
    }

    primeiraParticula = null;
    for (var i = 0; i < 90; i++) {
      var a = hash(i, 1) * Math.PI * 2, raio = 60 + hash(i, 2) * 320;
      primeiraParticula = {
        baseX: centroX + Math.cos(a) * raio, baseY: centroY + Math.sin(a) * raio,
        raioOrbita: 12 + hash(i, 3) * 35, vel: 0.0015 + hash(i, 4) * 0.0025,
        fase: hash(i, 5) * Math.PI * 2, tam: 2 + hash(i, 6) * 4.5,
        dourada: (i % 5 === 0), next: primeiraParticula
      };
    }
  }

  function easeInOutExpo(t) {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    return t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2;
  }

  var inicio = null, CICLO_MS = 16660;
  var frame = null, visible = false, paused = false, clock = 0, lastTick = null;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var button = document.getElementById('casa-pause');
  function stop() { lastTick = null; if (frame !== null) cancelAnimationFrame(frame); frame = null; }
  function start() { if (imagemAtual && visible && !paused && !document.hidden && !reduced.matches && frame === null) frame = requestAnimationFrame(desenhar); }
  function still() { ctx.clearRect(0,0,SIZE,SIZE); if (imagemAtual) ctx.drawImage(imagemAtual,0,0,SIZE,SIZE); }
  button.addEventListener('click', function() {
    paused = !paused; button.textContent = paused ? 'Retomar animação' : 'Pausar animação';
    button.setAttribute('aria-pressed', String(paused));
    document.querySelector('.casa-stage').classList.toggle('casa-paused', paused);
    if (paused) stop(); else start();
  });
  new IntersectionObserver(function(entries) { visible = entries[0].isIntersecting; if (visible) start(); else stop(); }, {threshold: 0.08}).observe(canvas);
  document.addEventListener('visibilitychange', function() { if (document.hidden) stop(); else start(); });
  reduced.addEventListener('change', function() { if (reduced.matches) {stop(); still();} else start(); });

  function desenhar(timestamp) {
    frame = null;
    if (!visible || paused || document.hidden || reduced.matches) return;
    if (!imagemAtual) return;
    if (lastTick !== null) clock += Math.min(timestamp - lastTick, 80);
    lastTick = timestamp;
    timestamp = clock + 1;
    if (!inicio) inicio = timestamp;
    var elapsed = (timestamp - inicio) % CICLO_MS;
    var tGlobal = 0, faseMontagem = false, progressoOnda = 0;
    if (elapsed < 2310) tGlobal = 0;
    else if (elapsed < 5040) tGlobal = (elapsed - 2310) / 2730;
    else if (elapsed < 12040) tGlobal = 1;
    else if (elapsed < 14980) {
      tGlobal = 1 - (elapsed - 12040) / 2940;
      faseMontagem = true;
    } else {
      tGlobal = 0;
      progressoOnda = (elapsed - 14980) / 1680;
    }

    ctx.clearRect(0, 0, SIZE, SIZE);

    // Sombra suave de levitação
    var levitacao = Math.sin(timestamp * 0.0018) * 9;
    var escalaSombra = 1 - (levitacao / 80) - (tGlobal * 0.15);
    var gradSombra = ctx.createRadialGradient(SIZE * 0.5, SIZE * 0.89, 10, SIZE * 0.5, SIZE * 0.89, SIZE * 0.30 * Math.max(0.4, escalaSombra));
    gradSombra.addColorStop(0, 'rgba(15, 23, 42, ' + (0.14 * (1 - tGlobal * 0.5)) + ')');
    gradSombra.addColorStop(1, 'rgba(15, 23, 42, 0)');
    ctx.fillStyle = gradSombra;
    ctx.fillRect(0, SIZE * 0.78, SIZE, SIZE * 0.22);

    // Aura energética
    var energia = Math.sin(tGlobal * Math.PI);
    if (energia > 0.01) {
      var grad = ctx.createRadialGradient(SIZE * 0.48, SIZE * 0.52, 10, SIZE * 0.48, SIZE * 0.52, SIZE * 0.40);
      grad.addColorStop(0, 'rgba(14, 165, 233, ' + (energia * 0.22) + ')');
      grad.addColorStop(0.55, 'rgba(56, 189, 248, ' + (energia * 0.08) + ')');
      grad.addColorStop(1, 'rgba(14, 165, 233, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, SIZE, SIZE);
    }

    // Onda magnética ao concluir a montagem
    if (progressoOnda > 0 && progressoOnda < 0.75) {
      var opOnda = (1 - progressoOnda / 0.75) * 0.35;
      var raioOnda = 120 + (progressoOnda / 0.75) * 340;
      ctx.save();
      ctx.beginPath();
      ctx.arc(SIZE * 0.5, SIZE * 0.52, raioOnda, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(14, 165, 233, ' + opOnda + ')';
      ctx.lineWidth = 3 * (1 - progressoOnda);
      ctx.stroke();
      ctx.restore();
    }

    ctx.save();
    ctx.translate(0, levitacao * (1 - tGlobal * 0.6));

    if (tGlobal <= 0.0001) {
      ctx.drawImage(imagemAtual, 0, 0, SIZE, SIZE);
    } else {
      var p = primeiroEstilhaco;
      while (p !== null) {
        var localLinear = Math.max(0, Math.min(1, (tGlobal - p.delay * 0.7) / (1 - p.delay * 0.7)));
        var e = easeInOutExpo(localLinear);

        if (e <= 0.0001) {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(p.p1.x, p.p1.y);
          ctx.lineTo(p.p2.x, p.p2.y);
          ctx.lineTo(p.p3.x, p.p3.y);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(imagemAtual, 0, 0, SIZE, SIZE);
          ctx.restore();
        } else {
          var flutuarY = Math.sin(timestamp * 0.003 + p.id) * 5 * e;
          ctx.save();
          ctx.globalAlpha = 1 - e * 0.1;
          ctx.translate(p.cx + p.vx * e, p.cy + p.vy * e + flutuarY);
          ctx.rotate(p.rot * e);
          var escalaX = 1 - Math.abs(Math.sin(p.flipX * e)) * 0.45;
          var escalaGeral = 1 - e * 0.22;
          ctx.scale(escalaX * escalaGeral, escalaGeral);
          ctx.translate(-p.cx, -p.cy);

          ctx.beginPath();
          ctx.moveTo(p.p1.x, p.p1.y);
          ctx.lineTo(p.p2.x, p.p2.y);
          ctx.lineTo(p.p3.x, p.p3.y);
          ctx.closePath();
          ctx.clip();

          ctx.drawImage(imagemAtual, 0, 0, SIZE, SIZE);

          if (e > 0.04) {
            ctx.strokeStyle = 'rgba(56, 189, 248, ' + Math.min(0.65, e * 0.8) + ')';
            ctx.lineWidth = 1.8;
            ctx.stroke();
          }
          ctx.restore();
        }
        p = p.next;
      }
    }

    // Feixe de scanner holográfico na reconstrução
    if (faseMontagem && tGlobal > 0.05 && tGlobal < 0.92) {
      var scanY = SIZE * (0.14 + tGlobal * 0.72);
      var gradScan = ctx.createLinearGradient(0, scanY - 35, 0, scanY + 35);
      gradScan.addColorStop(0, 'rgba(56, 189, 248, 0)');
      gradScan.addColorStop(0.5, 'rgba(14, 165, 233, 0.35)');
      gradScan.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.fillStyle = gradScan;
      ctx.fillRect(SIZE * 0.12, scanY - 35, SIZE * 0.76, 70);

      ctx.beginPath();
      ctx.moveTo(SIZE * 0.14, scanY);
      ctx.lineTo(SIZE * 0.86, scanY);
      ctx.strokeStyle = 'rgba(125, 211, 252, 0.85)';
      ctx.lineWidth = 2.5;
      ctx.stroke();
    }

    ctx.restore();

    // Partículas de energia orbitais
    if (energia > 0.05) {
      var pt = primeiraParticula;
      while (pt !== null) {
        var ang = timestamp * pt.vel + pt.fase;
        var px = SIZE * 0.5 + (pt.baseX - SIZE * 0.5) * (0.4 + energia * 0.75) + Math.cos(ang) * pt.raioOrbita;
        var py = SIZE * 0.5 + (pt.baseY - SIZE * 0.5) * (0.4 + energia * 0.75) + Math.sin(ang) * pt.raioOrbita;

        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, pt.tam * energia, 0, Math.PI * 2);
        ctx.fillStyle = pt.dourada ? 'rgba(245, 158, 11, ' + (energia * 0.75) + ')' : 'rgba(14, 165, 233, ' + (energia * 0.85) + ')';
        ctx.fill();
        ctx.restore();
        pt = pt.next;
      }
    }

    // Luz interativa ao passar o rato
    if (rato.ativo) {
      var gradRato = ctx.createRadialGradient(rato.x, rato.y, 5, rato.x, rato.y, 160);
      gradRato.addColorStop(0, 'rgba(56, 189, 248, 0.14)');
      gradRato.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.fillStyle = gradRato;
      ctx.fillRect(0, 0, SIZE, SIZE);
    }


    // Anéis orbitais com segmentos luminosos.
    ctx.save();
    ctx.translate(500, 520);
    ctx.scale(1, 0.38);
    for (var ring = 0; ring < 3; ring++) {
      var radius = 340 + ring * 50;
      var angle = timestamp * (0.00018 + ring * 0.00006) * (ring % 2 ? -1 : 1);
      ctx.beginPath(); ctx.ellipse(0, 0, radius, radius, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(14,165,233,0.13)'; ctx.lineWidth = 2; ctx.stroke();
      for (var seg = 0; seg < 3; seg++) {
        var head = angle + seg * Math.PI * 2 / 3;
        ctx.beginPath(); ctx.arc(0, 0, radius, head, head + 0.48);
        ctx.strokeStyle = 'rgba(2,132,199,' + (0.32 + energia * 0.22) + ')';
        ctx.lineWidth = 4; ctx.stroke();
        ctx.beginPath(); ctx.arc(Math.cos(head) * radius, Math.sin(head) * radius, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8'; ctx.fill();
      }
    }
    ctx.restore();
    // Réseau de nœuds et impulsions lumineuses autour de la maison.
    var nodes = [];
    for (var ni = 0; ni < 14; ni++) {
      var na = ni * Math.PI * 2 / 14 + Math.sin(timestamp * 0.00025 + ni) * 0.06;
      var nr = 410 + Math.sin(timestamp * 0.001 + ni) * 16;
      nodes.push({x:500 + Math.cos(na) * nr, y:510 + Math.sin(na) * nr * 0.92});
    }
    for (var ni = 0; ni < nodes.length; ni++) {
      var n = nodes[ni], next = nodes[(ni + 1) % nodes.length];
      ctx.beginPath(); ctx.moveTo(n.x,n.y); ctx.lineTo(next.x,next.y);
      ctx.strokeStyle = 'rgba(14,165,233,0.16)'; ctx.lineWidth = 1.2; ctx.stroke();
      var travel = (timestamp * 0.00035 + ni * 0.17) % 1;
      var tx = n.x + (next.x-n.x)*travel, ty = n.y + (next.y-n.y)*travel;
      ctx.beginPath(); ctx.arc(tx,ty,2.7,0,Math.PI*2); ctx.fillStyle = 'rgba(2,132,199,0.7)';ctx.fill();
      ctx.beginPath(); ctx.arc(n.x,n.y,3 + Math.sin(timestamp*0.002+ni)*1.2,0,Math.PI*2);
      ctx.fillStyle = 'rgba(14,165,233,0.6)'; ctx.fill();
    }
    // Pulsos suaves de diagnóstico.
    for (var pulse = 0; pulse < 2; pulse++) {
      var progress = (timestamp * 0.00015 + pulse * 0.5) % 1;
      ctx.beginPath(); ctx.ellipse(500,540,150+progress*300,90+progress*210,0,0,Math.PI*2);
      ctx.strokeStyle = 'rgba(14,165,233,' + ((1-progress)*0.18) + ')'; ctx.lineWidth = 2; ctx.stroke();
    }

    start();
  }

  var img = new Image();
  img.onload = function() {
    imagemAtual = img;
    construirMalha();
    still();
    start();
  };
  img.onerror = function() { canvas.hidden = true; document.getElementById('casa-fallback').hidden = false; button.hidden = true; };
  img.src = CAMINHO_IMAGEM;
})();
