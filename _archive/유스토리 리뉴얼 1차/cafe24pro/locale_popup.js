(function(){
  "use strict";

  (function(w,d){
    try{
      w.__extScript = w.__extScript || {};
      w.__extScript["cafe24pro_locale_popup"] = { loaded:true, executed:false, ts:Date.now() };
      var m = d.createElement("meta");
      m.name = "external-script-cafe24pro_locale_popup";
      m.content = "LOADED";
      (d.head||d.documentElement).appendChild(m);
    }catch(_){}}
  )(window,document);

  if (window.__cafe24pro_locale_responsive_loaded__) { doneBeacon("EXECUTED"); return; }
  window.__cafe24pro_locale_responsive_loaded__=true;

  if (!window.cafe24_locale) window.cafe24_locale = {};
  var C = Object.assign({ topOffset:120, cooldownDays:30 }, window.cafe24_locale||{});

  var MOUNT_ID = "cafe24pro_locale_mount";

  var I18N = {
    en:{title:"Language Settings",body:function(){return "Would you like to go to the English store?";},primary:"English Store",secondary:"Stay"},
    ja:{title:"言語設定",body:function(){return "日本語ストアに移動しますか？";},primary:"日本語ストア",secondary:"このまま"},
    "zh-cn":{title:"语言设置",body:function(){return "要前往中文商店吗？";},primary:"中文商店",secondary:"继续浏览"},
    "zh-tw":{title:"語言設定",body:function(){return "要前往繁體中文商店嗎？";},primary:"中文商店",secondary:"繼續瀏覽"},
    ko:{title:"언어 설정",body:function(){return "한국어 스토어로 이동하시겠어요?";},primary:"한국어 스토어",secondary:"이대로 보기"}
  };

  function getLangCandidates(){
    var out = [];
    if (Array.isArray(navigator.languages)) out = out.concat(navigator.languages);
    if (navigator.language) out.push(navigator.language);
    try { var fmt = Intl.DateTimeFormat().resolvedOptions().locale; if (fmt) out.push(fmt); } catch (_){}
    try { var htmlLang = document.documentElement && document.documentElement.lang; if (htmlLang) out.push(htmlLang); } catch (_){}
    return Array.from(new Set(out.filter(Boolean).map(function(s){ return String(s).toLowerCase(); })));
  }

  function resolveLocaleTag(){
    var cands = getLangCandidates();
    for (var i=0;i<cands.length;i++){
      var cand = cands[i], lang=null, script=null, region=null;
      try {
        var canon = Intl.getCanonicalLocales(cand)[0] || cand;
        var loc = typeof Intl.Locale==="function" ? new Intl.Locale(canon) : null;
        lang   = (loc && loc.language) ? loc.language.toLowerCase() : canon.split(/[-_]/)[0];
        script = (loc && loc.script)   ? loc.script : null;
        region = (loc && loc.region)   ? loc.region.toUpperCase() : null;
      } catch(_){ lang = cand.split(/[-_]/)[0]; }
      if (lang==="ja") return "ja";
      if (lang==="ko") return "ko";
      if (lang==="zh"){
        if ((script && /hant/i.test(script)) || (region && /^(TW|HK|MO)$/.test(region))) return "zh-tw";
        return "zh-cn";
      }
      if (lang==="en") return "en";
    }
    return "en";
  }

  function fontStackFor(key){
    if (key==="ja")   return "'Noto Sans JP','Segoe UI',Roboto,Arial,sans-serif";
    if (key==="zh-cn")return "'Noto Sans SC','Microsoft YaHei','PingFang SC','Segoe UI',Roboto,Arial,sans-serif";
    if (key==="zh-tw")return "'Noto Sans TC','Microsoft JhengHei','PingFang TC','Segoe UI',Roboto,Arial,sans-serif";
    if (key==="ko")   return "'Noto Sans KR','Apple SD Gothic Neo','Malgun Gothic','맑은 고딕',Arial,sans-serif";
    return "'Noto Sans','Segoe UI',Roboto,Arial,sans-serif";
  }

  function norm(v){return (v||"").toLowerCase().replace(/[_-]+/g,"-").trim();}

  function labelToLocale(s){
    var l=norm(s); if(!l) return null;
    if(l === "ko" || l === "kr") return "ko";
    if(l === "en" || l === "eng") return "en";
    if(l === "ja" || l === "jp" || l === "jpn") return "ja";
    if(l === "cn" || l === "zh") return "zh-cn";
    if(l === "tw") return "zh-tw";
    if(/(繁體|繁体|臺灣|台灣|香港|澳門)/.test(l)) return "zh-tw";
    if(/(简体|簡體)/.test(l)) return "zh-cn";
    if(/english|eng/.test(l)) return "en";
    if(/日本|にほん|にっぽん|japanese|jpn|nihon|nippon/.test(l)) return "ja";
    if(/한국|korean|kor/.test(l)) return "ko";
    if(/中文|china|chinese|zh/.test(l)) return "zh-cn";
    return null;
  }

  function absUrl(u){
    var v=String(u||"").trim();
    if(!v) return "";
    if(/^javascript:|^data:|^#$/i.test(v)) return "";
    if(!/^https?:\/\//i.test(v)) v="https://"+v.replace(/^\/+/,"");
    return v;
  }

  function collectFromLanguageSelect(rootDoc){
    var sel = rootDoc.querySelector('.xans-layout-multishopshippinglanguagelist');
    if(!sel) return [];
    var out=[];
    Array.from(sel.options||[]).forEach(function(opt){
      var label=(opt.textContent||"").replace(/\s*(Store|스토어|ストア|站点|網站)\s*$/i,"").trim();
      var href=absUrl(opt.value||"");
      if(!href) return;
      var code=(function(t){
        var l=norm(t);
        if(/english|eng\b/.test(l)) return "en";
        if(/(日本|japanese|jpn|nihon|nippon)/.test(l)) return "ja";
        if(/(한국|korean|kor)/.test(l)) return "ko";
        if(/(繁體|繁体|臺灣|台灣|香港|澳門)/.test(l)) return "zh-tw";
        if(/(简体|簡體|中文|china|chinese|zh|汉|華)/.test(l)) return "zh-cn";
        return null;
      })(label);
      out.push({label:label, href:href, codes: code ? [code] : []});
    });
    return out;
  }

  function collectEntries(rootDoc){
    var map=new Map();
    function pushFrom(ul){
      ul.querySelectorAll("li a[href]").forEach(function(a){
        var href=absUrl(a.getAttribute("href")||"#");
        if(!href) return;
        var label=(a.getAttribute("data-locale-label")||a.textContent||"").trim();
        var clean=label.replace(/\s*(Store|스토어|ストア|站点|網站)\s*$/i,"")||label;
        var codeHints=[
          a.getAttribute("data-locale-code"),
          a.getAttribute("data-locale-alt1"),
          a.getAttribute("data-locale-alt2"),
          a.getAttribute("data-locale-alt3"),
          a.getAttribute("data-locale-legacy")
        ].filter(Boolean).map(norm);
        var key=clean+"|"+codeHints.join(",");
        if(!map.has(key)) map.set(key,{label:clean,href:href,codes:codeHints});
      });
    }
    var sheet=rootDoc.querySelector("#multishop-source #sheet-source-list");
    if(sheet) pushFrom(sheet);
    rootDoc.querySelectorAll("ul").forEach(function(ul){
      if(ul.closest("#"+MOUNT_ID)) return;
      var hasLocale=ul.querySelectorAll("a[data-locale-code],a[data-locale-alt1],a[data-locale-alt2],a[data-locale-alt3],a[data-locale-legacy]").length>0;
      var likely=!!ul.closest('[id*="multishop"],[class*="multishop"],[id*="multi-shop"],[class*="multi-shop"]');
      if(hasLocale||likely) pushFrom(ul);
    });
    collectFromLanguageSelect(rootDoc).forEach(function(e){
      if(!e||!e.href) return;
      var key=(e.label||"")+"|"+(e.codes||[]).join(",");
      if(!map.has(key)) map.set(key,e);
    });
    return Array.from(map.values());
  }

  function codeMatches(codes,key){
    if(!codes||!codes.length) return false;
    var target=norm(key);
    return codes.some(function(code){
      var cc=norm(code);
      return cc===target||cc.startsWith(target+"-")||cc.startsWith(target+"_");
    });
  }
  function codeMatchesPrimary(codes,primary){
    if(!codes||!codes.length) return false;
    var p=norm(primary);
    return codes.some(function(code){
      var cc=norm(code);
      return cc===p||cc.startsWith(p+"-")||cc.startsWith(p+"_");
    });
  }
  function labelMatches(label,primary){
    var l=norm(label);
    if(!l) return false;
    if (primary==="ko"&&/(한국|korean|kor)/.test(l)) return true;
    if (primary==="ja"&&/(日本|japanese|jpn|nihon|nippon)/.test(l)) return true;
    if (primary==="en"&&/(english|eng)/.test(l)) return true;
    if (primary==="zh"&&/(中文|china|chinese|zh|简体|繁體|汉|華)/.test(l)) return true;
    return false;
  }

  function canShowAgain(){
    try{
      var key="cafe24pro_locale_banner_v1_"+resolveLocaleTag();
      var t=parseInt(localStorage.getItem(key)||"0",10);
      return !t || Date.now()>t;
    }catch(_){return true;}
  }

  function setCooldown(days){
    try{
      var key="cafe24pro_locale_banner_v1_"+resolveLocaleTag();
      localStorage.setItem(key,String(Date.now()+days*864e5));
    }catch(_){}
  }

  function ensureMount(){
    var m=document.getElementById(MOUNT_ID);
    if(m) return m;
    m=document.createElement("div");
    m.id=MOUNT_ID;
    var w=document.getElementById("wrap");
    (w||document.body).appendChild(m);
    return m;
  }

  function doneBeacon(state){
    try{
      window.__extScript = window.__extScript || {};
      var obj = window.__extScript["cafe24pro_locale_popup"] || {};
      obj.executed = true; obj.tsDone = Date.now();
      window.__extScript["cafe24pro_locale_popup"] = obj;
      window.__script_markers = window.__script_markers || {};
      var mark = window.__script_markers["cafe24pro_locale_popup"] || {};
      mark.executed = true; mark.last = Date.now();
      window.__script_markers["cafe24pro_locale_popup"] = mark;
      var m = document.querySelector('meta[name="external-script-cafe24pro_locale_popup"]');
      if (!m){ m = document.createElement("meta"); m.name = "external-script-cafe24pro_locale_popup"; (document.head||document.documentElement).appendChild(m); }
      m.content = state || "EXECUTED";
    }catch(_){}
  }

  function init(){
    window.__script_markers = window.__script_markers || {};
    window.__script_markers["cafe24pro_locale_popup"] = { loaded:true, executed:false, last:Date.now() };

    var ua=(navigator.userAgent||"").toLowerCase();
    var i18nKey=resolveLocaleTag();
    var FONT=fontStackFor(i18nKey);
    var primary=i18nKey.split("-")[0];

    window.__popup_status = { loaded:true, eligible:false, shown:false, lang:i18nKey, primary:primary, reason:"" };

    if(/bot|crawler|spider|preview|analyzer|fetch/i.test(ua)){ window.__popup_status.reason="bot"; return doneBeacon("EXECUTED"); }
    if(primary==="ko"){ window.__popup_status.reason="primary=ko"; return doneBeacon("EXECUTED"); }

    var mount=ensureMount();
    var shadow=mount.shadowRoot||mount.attachShadow({mode:"open"});

    var style=document.createElement("style");
    style.textContent=[
      ":host{all:initial;color-scheme:light}",
      ".cafe24pro-locale-banner, .cafe24pro-locale-banner *{font-family:"+FONT+";letter-spacing:0;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-kerning:normal;font-variant-ligatures:normal;box-sizing:border-box}",
      ".cafe24pro-locale-banner{position:fixed;inset:0;background-color:transparent;backdrop-filter:none;display:flex;align-items:center;justify-content:center;z-index:10000;opacity:0;visibility:hidden;transition:opacity .2s ease,visibility .2s ease}",
      ".cafe24pro-locale-banner.is-show{opacity:1;visibility:visible}",
      ".cafe24pro-locale-card{position:relative;background:#fff;border-radius:8px;box-shadow:0 4px 6px -1px rgba(0,0,0,.1);max-width:90vw;min-width:260px;width:fit-content;padding:32px;text-align:center;border:1px solid #e5e7eb;animation:c24lFadeIn .2s ease-out;box-sizing:border-box}",
      ".cafe24pro-locale-close{position:absolute;top:16px;right:16px;background:0;border:0;font-size:18px;color:#9ca3af;cursor:pointer;width:24px;height:24px;display:flex;align-items:center;justify-content:center}",
      ".cafe24pro-locale-close:hover{color:#6b7280}",
      ".cafe24pro-locale-icon{font-size:24px;margin:0 0 16px}",
      ".cafe24pro-locale-title{font-size:18px;font-weight:600;font-synthesis:weight;color:#111827;line-height:1.25;display:block;margin:0 0 8px}",
      ".cafe24pro-locale-text{font-size:14px;color:#6b7280;line-height:1.5;margin:0 0 24px}",
      ".cafe24pro-locale-actions{display:flex;gap:12px;margin:0;padding:0}",
      ".cafe24pro-locale-btn{flex:1;padding:10px 16px;border-radius:6px;font-size:14px;font-weight:500;font-synthesis:weight;cursor:pointer;transition:.15s;border:0;white-space:nowrap;text-decoration:none;-webkit-appearance:none;appearance:none;line-height:1.2}",
      ".cafe24pro-locale-btn.cafe24pro-locale-primary{background:#111827;color:#fff}",
      ".cafe24pro-locale-btn.cafe24pro-locale-primary:hover{background:#1f2937}",
      ".cafe24pro-locale-btn.cafe24pro-locale-secondary{background:#f9fafb;color:#6b7280;border:1px solid #e5e7eb}",
      ".cafe24pro-locale-btn.cafe24pro-locale-secondary:hover{background:#f3f4f6;color:#374151}",
      "@keyframes c24lFadeIn{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}"
    ].join("");

    var wrap=document.createElement("aside");
    wrap.setAttribute("aria-hidden","true");
    wrap.className="cafe24pro-locale-banner";
    wrap.innerHTML=[
      '<div class="cafe24pro-locale-card">',
        '<button type="button" class="cafe24pro-locale-close" aria-label="Close">&times;</button>',
        '<div class="cafe24pro-locale-icon" aria-hidden="true">🌐</div>',
        '<h3 class="cafe24pro-locale-title">Switch stores?</h3>',
        '<p class="cafe24pro-locale-text">Shop in your preferred language.</p>',
        '<div class="cafe24pro-locale-actions">',
          '<a class="cafe24pro-locale-btn cafe24pro-locale-primary" rel="nofollow">Switch</a>',
          '<button class="cafe24pro-locale-btn cafe24pro-locale-secondary" type="button">Stay</button>',
        '</div>',
      '</div>'
    ].join("");

    shadow.innerHTML="";
    shadow.appendChild(style);
    shadow.appendChild(wrap);

    var title=shadow.querySelector(".cafe24pro-locale-title");
    var textEl=shadow.querySelector(".cafe24pro-locale-text");
    var cta=shadow.querySelector(".cafe24pro-locale-btn.cafe24pro-locale-primary");
    var dis=shadow.querySelector(".cafe24pro-locale-btn.cafe24pro-locale-secondary");
    var close=shadow.querySelector(".cafe24pro-locale-close");
    if(!title||!textEl||!cta||!dis){ window.__popup_status.reason="dom-missing"; return doneBeacon("EXECUTED"); }

    var entries=collectEntries(document);
    var k=i18nKey, p=primary;
    var match =
      entries.find(function(e){ return labelToLocale(e.label)===k; }) ||
      entries.find(function(e){ return codeMatches(e.codes, k); }) ||
      (p==="zh" ? entries.find(function(e){ return labelToLocale(e.label)==="zh-cn"; }) : null) ||
      entries.find(function(e){ return codeMatchesPrimary(e.codes, p); }) ||
      entries.find(function(e){ return labelToLocale(e.label)===p; });

    if(!match||!match.href){ window.__popup_status.reason="no-match"; return doneBeacon("EXECUTED"); }
    if(!canShowAgain()){ window.__popup_status.reason="cooldown"; return doneBeacon("EXECUTED"); }

    window.__popup_status.eligible=true;

    var dict=I18N[i18nKey]||I18N.en;
    title.textContent=dict.title;
    textEl.textContent=typeof dict.body==="function"?dict.body(match.label):dict.body;
    cta.textContent=typeof dict.primary==="function"?dict.primary(match.label):dict.primary;
    if (/^(javascript:|data:)/i.test(match.href)) { window.__popup_status.reason="bad-href"; return doneBeacon("EXECUTED"); }
    cta.href=match.href;
    dis.textContent=dict.secondary;

    setTimeout(function(){
      var wrapNow=shadow.querySelector(".cafe24pro-locale-banner");
      if(!wrapNow){ window.__popup_status.reason="dom-removed"; return doneBeacon("EXECUTED"); }
      wrapNow.classList.add("is-show");
      wrapNow.setAttribute("aria-hidden","false");
      window.__popup_status.shown=true;
      window.__popup_status.reason="shown";
      doneBeacon("EXECUTED");
    },200);

    function hideAndCooldown(){
      setCooldown(C.cooldownDays);
      var wrapNow=shadow.querySelector(".cafe24pro-locale-banner");
      if(wrapNow){
        wrapNow.classList.remove("is-show");
        wrapNow.setAttribute("aria-hidden","true");
      }
    }
    dis.addEventListener("click",hideAndCooldown);
    if(close) close.addEventListener("click",hideAndCooldown);
  }

  if (document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", function(){ try{ init(); } finally{ doneBeacon("EXECUTED"); } }, {once:true});
  } else {
    try{ init(); } finally{ doneBeacon("EXECUTED"); }
  }
})();
