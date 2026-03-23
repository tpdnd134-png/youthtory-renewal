#!/bin/bash
# YOUTHTORY 스킨 로컬 미리보기 서버
# 사용법: cd /Users/han-aleum/youthtory-renewal && bash preview.sh

echo "🔧 미리보기 파일 생성 중..."

# 메인 페이지 미리보기 생성 (layout + index 합치기)
cat skin/layout/basic/layout.html | sed '
/<!-- Contents Area -->/r skin/layout/main/index.html
' > skin/preview-main.html

# 상품 리스트 미리보기 생성
cat skin/layout/basic/layout.html | sed '
/<!-- Contents Area -->/r skin/product/list.html
' > skin/preview-list.html

# 상품 상세 미리보기 생성
cat skin/layout/basic/layout.html | sed '
/<!-- Contents Area -->/r skin/product/detail.html
' > skin/preview-detail.html

echo "✅ 미리보기 파일 생성 완료"
echo "   - skin/preview-main.html (메인 페이지)"
echo "   - skin/preview-list.html (상품 리스트)"
echo "   - skin/preview-detail.html (상품 상세)"
echo ""
echo "🌐 로컬 서버 시작 (http://localhost:8080)"
echo "   브라우저에서 아래 URL을 열어주세요:"
echo "   메인: http://localhost:8080/skin/preview-main.html"
echo "   리스트: http://localhost:8080/skin/preview-list.html"
echo "   상세: http://localhost:8080/skin/preview-detail.html"
echo ""
echo "   종료: Ctrl+C"
echo ""

cd /Users/han-aleum/youthtory-renewal
python3 -m http.server 8080
