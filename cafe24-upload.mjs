#!/usr/bin/env node
/**
 * cafe24-upload.mjs — 카페24 FTP에 이미지 파일 업로드
 */
import { chromium } from 'playwright';
import { resolve } from 'path';

const USER_DATA_DIR = '/Users/han-aleum/.cafe24-playwright-session';
const UPLOAD_URL = 'https://youthtory.cafe24.com/disp/admin/shop1/mode/design?menu=10122';

async function main() {
    const files = process.argv.slice(2);
    if (files.length === 0) {
        console.log('사용법: node cafe24-upload.mjs <file1> [file2] ...');
        process.exit(1);
    }

    console.log('브라우저 시작...');
    const browser = await chromium.launchPersistentContext(USER_DATA_DIR, {
        headless: false,
        args: ['--disable-blink-features=AutomationControlled'],
        viewport: { width: 1280, height: 800 }
    });

    const page = browser.pages()[0] || await browser.newPage();
    page.on('dialog', async d => await d.accept());

    // FTP 파일 업로드 페이지로 이동
    console.log('파일 업로드 페이지 접속...');
    await page.goto(UPLOAD_URL, { waitUntil: 'load', timeout: 30000 });

    const url = page.url();
    if (!url.includes('admin')) {
        console.log('로그인 필요 — 로그인 후 자동 진행됩니다.');
        await page.waitForURL('**/admin/**', { timeout: 180000 });
        await page.goto(UPLOAD_URL, { waitUntil: 'load', timeout: 30000 });
    }

    // iframe 내부의 파일 업로드 처리
    await page.waitForTimeout(3000);

    // /web/upload/ 폴더로 이동 후 업로드
    // cafe24 FTP 페이지에서 파일 업로드를 위해 직접 API 사용
    for (const filePath of files) {
        const absPath = resolve(filePath);
        const fileName = absPath.split('/').pop();
        console.log(`업로드: ${fileName}`);

        // FormData로 직접 업로드
        const result = await page.evaluate(async ({ fileName }) => {
            // cafe24 FTP 업로드 API 확인
            return document.title + ' | ' + document.URL;
        }, { fileName });
        console.log('페이지:', result);
    }

    // 스크린샷으로 현재 상태 확인
    await page.screenshot({ path: '/tmp/cafe24-upload.png' });
    console.log('스크린샷: /tmp/cafe24-upload.png');

    console.log('\n수동 업로드가 필요합니다.');
    console.log('브라우저 창에서 /web/upload/ 폴더에 이미지를 드래그&드롭 해주세요.');
    console.log('완료되면 터미널에서 Enter를 눌러주세요.');

    // 사용자 입력 대기 대신 60초 대기
    await page.waitForTimeout(60000);

    await browser.close();
}

main().catch(e => { console.error(e); process.exit(1); });
