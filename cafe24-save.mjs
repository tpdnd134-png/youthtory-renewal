#!/usr/bin/env node
/**
 * cafe24-save.mjs — 카페24 스마트디자인 에디터에 스킨 파일 저장
 *
 * 사용법: node cafe24-save.mjs <skin-path> [<skin-path2> ...]
 * 예시:   node cafe24-save.mjs /index.html /css/module/product/basketAdd2.css
 *
 * 첫 실행 시 로그인 필요 (이후 세션 유지)
 */
import { chromium } from 'playwright';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const SKIN_DIR = '/Users/han-aleum/projects/youthtory-renewal/existing-skin/유스토리 리뉴얼 1차 완성본';
const EDITOR_URL = 'https://youthtory.cafe24.com/disp/admin/editor/main?skin_no=14&skin_code=skin9&shop_no=1';
const USER_DATA_DIR = '/Users/han-aleum/.cafe24-playwright-session';

async function main() {
    const skinPaths = process.argv.slice(2);
    if (skinPaths.length === 0) {
        console.log('사용법: node cafe24-save.mjs <skin-path> [<skin-path2> ...]');
        console.log('예시:   node cafe24-save.mjs /index.html');
        process.exit(1);
    }

    // 각 파일의 로컬 내용 읽기
    const files = [];
    for (const sp of skinPaths) {
        const localPath = resolve(SKIN_DIR + sp);
        if (!existsSync(localPath)) {
            console.error(`파일 없음: ${localPath}`);
            process.exit(1);
        }
        files.push({ skinPath: sp, content: readFileSync(localPath, 'utf-8') });
    }

    console.log('브라우저 시작...');
    const browser = await chromium.launchPersistentContext(USER_DATA_DIR, {
        headless: false,
        args: ['--disable-blink-features=AutomationControlled'],
        viewport: { width: 1280, height: 800 }
    });

    const page = browser.pages()[0] || await browser.newPage();

    // 에디터 페이지 이동
    console.log('에디터 접속 중...');
    page.on('dialog', async dialog => { await dialog.accept(); });
    await page.goto(EDITOR_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });

    // 로그인 체크 — 에디터가 아니면 로그인 필요
    const url = page.url();
    if (url.includes('eclogin') || url.includes('comLogin') || !url.includes('editor')) {
        console.log('\n⚠️  로그인이 필요합니다. 브라우저에서 로그인해주세요.');
        console.log('   로그인 후 자동으로 에디터로 이동합니다.\n');

        // 대시보드나 관리자 페이지에 도달할 때까지 대기 (최대 3분)
        await page.waitForURL('**/admin/**', { timeout: 180000 });
        console.log('로그인 확인! 에디터로 이동 중...');

        // 에디터로 다시 이동
        await page.goto(EDITOR_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    }

    // SDE 로드 대기
    await page.waitForFunction('typeof SDE !== "undefined" && SDE.File && SDE.File.Store', { timeout: 15000 });
    console.log('에디터 준비 완료\n');

    // 파일 저장
    for (const { skinPath, content } of files) {
        console.log(`저장 중: ${skinPath}`);
        const result = await page.evaluate(({ path, content }) => {
            return new Promise((resolve) => {
                var f = SDE.File.Store.get(path);
                if (!f) {
                    // 새 파일 생성
                    f = { file: path, content: content, isEditing: false, skin_no: SDE.SKIN_NO };
                }
                f.content = content;
                f.isEditing = false;
                $.ajax({
                    url: '/exec/admin/editor/fileSave?skin_no=' + SDE.SKIN_NO,
                    data: f,
                    type: 'POST',
                    async: false,
                    success: function(r) { resolve('OK: ' + JSON.stringify(r)); },
                    error: function(e) { resolve('ERROR: ' + e.statusText); }
                });
            });
        }, { path: skinPath, content });

        console.log(`  → ${result}`);
    }

    console.log('\n완료! 브라우저를 닫습니다.');
    await browser.close();
}

main().catch(e => { console.error(e); process.exit(1); });
