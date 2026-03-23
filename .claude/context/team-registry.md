# YOUTHTORY 리뉴얼 에이전트 팀

## 업데이트: 2026-03-16 (파일 안정화 Phase 0 시작)

## 현재 활성 에이전트

| 에이전트 | 역할 | 상태 | Phase | 파일 |
|---------|------|------|-------|------|
| cafe24-css-editor | CSS 안정화 (!important 분석/정리) | Phase 0 | 0, 1 | agents/cafe24-css-editor.md |
| skin-structure-analyst | HTML 안정화 (모듈 태그 검증) | Phase 0 | 0, 1, 2 | agents/skin-structure-analyst.md |
| skin-designer | JS 안정화 (작동/비작동 분류) | Phase 0 | 2 | agents/skin-designer.md |
| qa-validator | 검증 전담 (게이트키퍼) | Phase 0 | 전체 | agents/qa-validator.md |
| team-builder | 필요 에이전트 자율 생성 | 대기 | 전체 | agents/team-builder.md |
| learnings-keeper | 학습 축적·개선 | 대기 | 전체 | agents/learnings-keeper.md |

## 보조 에이전트 (필요시 활용)

| 에이전트 | 역할 | Phase | 파일 |
|---------|------|-------|------|
| gap-analyzer | 현재 vs 레퍼런스 차이 분석 | 전체 | agents/gap-analyzer.md |
| editorial-stylist | 에디토리얼 패션 무드 구현 | 1 | agents/editorial-stylist.md |
| category-planner | 카테고리·스타일 체계 설계 | 전체 | agents/category-planner.md |
| ux-researcher | 레퍼런스 분석·UX 제안 | 전체 | agents/ux-researcher.md |

## 프로젝트 현황
- **작업 대상**: `/Users/han-aleum/projects/youthtory-renewal/existing-skin/skin1/` (유일한 수정 대상)
- **원본 백업**: `/Users/han-aleum/projects/youthtory-renewal/existing-skin/skin1-backup-original/` (비교 전용, 수정 금지)
- **레퍼런스**: pickysociety.com
- **현재 Phase**: Phase 0 (파일 안정화)

## 진화 이력
- v1: skin-designer, category-planner, ux-researcher, team-builder, learnings-keeper (초기 5인)
- v2: + gap-analyzer, editorial-stylist (레퍼런스 퀄리티 재구현 작업)
- v3: + cafe24-css-editor, skin-structure-analyst (skin1 직접 수정 전환)
- v4: + qa-validator (검증 전담, 게이트키퍼) ← 현재

## 작업 진행 상황

### 완료
- [x] CSS 1차 수정 (ga09product, top, left, right, bottom, fullpage, layout.html)

### Phase 0: 파일 안정화 (진행 중)
- [ ] HTML 안정화 — backup vs skin1 diff, 모듈 태그 검증 (skin-structure-analyst)
- [ ] CSS 안정화 — !important 분석/정리 (cafe24-css-editor)
- [ ] JS 안정화 — 작동/비작동 분류 (skin-designer)
- [ ] Phase 0 QA 검증 (qa-validator)

### Phase 0.5: 모바일 DOM 검증
- [ ] 모바일 DOM 순서 검증 (qa-validator)

### Phase 1: 디자인 정밀 적용
- [ ] design-research.md 수치 기준 적용

### Phase 2: UX 기능 구현
- [ ] 사용자 레퍼런스 스크린샷 대기 중

## 수정된 파일 목록

### CSS
| 파일 | 주요 변경 |
|------|----------|
| css/ga09product.css | 폰트 Noto Sans KR, 그리드 gap 10px, 상품카드 스타일 |
| css/top.css | 헤더 높이 74px, 미니멀 스타일 |
| css/left.css | 네비게이션 letter-spacing hover 효과 |
| css/right.css | 햄버거 메뉴 라인 1px, 반투명 다크 오버레이 |
| css/bottom.css | 푸터 여백 및 색상 조정 |
| css/fullpage.css | 인트로 타이포 라이트 웨이트, cubic-bezier 애니메이션 |

### HTML
| 파일 | 주요 변경 |
|------|----------|
| layout.html | Noto Sans KR 폰트 추가, 글로벌 스타일 인라인 |

## 호출 방법
```
"{에이전트명}야, {요청}"
예: "cafe24-css-editor야, ga09product.css 수정해줘"
```
