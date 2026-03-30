#!/usr/bin/env node
/**
 * cafe24-new-badge.mjs
 * 카페24 API로 7일 이내 등록 상품 조회 → new-products.json 생성
 *
 * 사용법: node cafe24-new-badge.mjs
 * GitHub Actions에서 자동 실행됨
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// 설정
const MALL_ID = 'youthtory';
const API_BASE = `https://${MALL_ID}.cafe24api.com/api/v2`;
const TOKEN_CACHE = resolve(__dirname, '../cafe24-automation/.cafe24_token_cache.json');
const OUTPUT_FILE = resolve(__dirname, 'new-products.json');
const NEW_DAYS = 7;

// GitHub Actions 환경에서는 환경변수 사용
const ENV_CLIENT_ID = process.env.CAFE24_CLIENT_ID;
const ENV_CLIENT_SECRET = process.env.CAFE24_CLIENT_SECRET;
const ENV_REFRESH_TOKEN = process.env.CAFE24_REFRESH_TOKEN;

/**
 * 토큰 캐시 읽기
 */
function readTokenCache() {
    // 환경변수 우선 (GitHub Actions)
    if (ENV_CLIENT_ID && ENV_CLIENT_SECRET && ENV_REFRESH_TOKEN) {
        return {
            client_id: ENV_CLIENT_ID,
            client_secret: ENV_CLIENT_SECRET,
            refresh_token: ENV_REFRESH_TOKEN,
            access_token: process.env.CAFE24_ACCESS_TOKEN || ''
        };
    }
    // 로컬: 캐시 파일
    if (existsSync(TOKEN_CACHE)) {
        const cached = JSON.parse(readFileSync(TOKEN_CACHE, 'utf-8'));
        // client_secret은 .env에서
        const envPath = resolve(__dirname, '../cafe24-automation/.env');
        if (existsSync(envPath)) {
            const envContent = readFileSync(envPath, 'utf-8');
            const secretMatch = envContent.match(/CAFE24_CLIENT_SECRET=(.+)/);
            if (secretMatch) cached.client_secret = secretMatch[1].trim();
        }
        return cached;
    }
    throw new Error('토큰 캐시를 찾을 수 없습니다.');
}

/**
 * 토큰 갱신
 */
async function refreshToken(tokenData) {
    const credentials = Buffer.from(
        `${tokenData.client_id}:${tokenData.client_secret}`
    ).toString('base64');

    const resp = await fetch(`${API_BASE}/oauth/token`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=refresh_token&refresh_token=${tokenData.refresh_token}`
    });

    if (!resp.ok) {
        const err = await resp.text();
        throw new Error(`토큰 갱신 실패: ${resp.status} ${err}`);
    }

    const newToken = await resp.json();

    // 로컬 캐시 업데이트
    if (existsSync(TOKEN_CACHE)) {
        writeFileSync(TOKEN_CACHE, JSON.stringify(newToken, null, 2));
        console.log('토큰 캐시 업데이트 완료');
    }

    return newToken;
}

/**
 * 카페24 API 호출 — 7일 이내 등록 상품 조회
 */
async function fetchNewProducts(accessToken) {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - NEW_DAYS * 24 * 60 * 60 * 1000);

    const startDate = sevenDaysAgo.toISOString().split('T')[0];
    const endDate = now.toISOString().split('T')[0];

    const allProducts = [];
    let offset = 0;
    const limit = 100;

    while (true) {
        const url = `${API_BASE}/admin/products?` + new URLSearchParams({
            created_start_date: startDate,
            created_end_date: endDate,
            limit: String(limit),
            offset: String(offset),
            fields: 'product_no,product_name,created_date'
        });

        console.log(`조회 중: ${startDate} ~ ${endDate} (offset: ${offset})`);

        const resp = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'X-Cafe24-Api-Version': '2026-03-01'
            }
        });

        if (!resp.ok) {
            const err = await resp.text();
            throw new Error(`API 호출 실패: ${resp.status} ${err}`);
        }

        const data = await resp.json();
        const products = data.products || [];

        allProducts.push(...products);
        console.log(`  → ${products.length}개 조회 (총 ${allProducts.length}개)`);

        if (products.length < limit) break;
        offset += limit;
    }

    return allProducts;
}

/**
 * 메인
 */
async function main() {
    console.log('=== NEW 뱃지 업데이트 시작 ===');
    console.log(`기준: 최근 ${NEW_DAYS}일 이내 등록 상품\n`);

    // 1. 토큰 읽기
    let tokenData = readTokenCache();
    console.log(`client_id: ${tokenData.client_id}`);

    // 2. 토큰 갱신
    try {
        console.log('토큰 갱신 중...');
        const newToken = await refreshToken(tokenData);
        tokenData.access_token = newToken.access_token;
        if (newToken.refresh_token) {
            tokenData.refresh_token = newToken.refresh_token;
        }
        console.log('토큰 갱신 성공\n');
    } catch (e) {
        console.log(`토큰 갱신 실패, 기존 토큰 시도: ${e.message}\n`);
    }

    // 3. 상품 조회
    const products = await fetchNewProducts(tokenData.access_token);

    // 4. JSON 생성
    const result = {
        new_products: products.map(p => p.product_no),
        details: products.map(p => ({
            no: p.product_no,
            name: p.product_name,
            created: p.created_date
        })),
        updated: new Date().toISOString(),
        days: NEW_DAYS,
        count: products.length
    };

    writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2));
    console.log(`\n결과: ${OUTPUT_FILE}`);
    console.log(`NEW 상품: ${result.count}개`);
    result.details.forEach(p => {
        console.log(`  - [${p.no}] ${p.name} (${p.created})`);
    });

    console.log('\n=== 완료 ===');
}

main().catch(e => {
    console.error('오류:', e.message);
    process.exit(1);
});
