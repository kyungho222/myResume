// 전역 변수
let educationCount = 1;
let experienceCount = 1;
let photoData = null;
let currentTheme = 'blue'; // 현재 테마

// 페이지 로드 시 초기화 (최적화)
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - 초기화 시작');

    // 기본 초기화
    initializeForm();
    checkForSavedDraft();
    loadSavedTheme();

    // Rich Editor 초기화 (한 번만)
    initializeRichEditors();

    // 기존 포트폴리오 항목들 업데이트
    updateExistingPortfolioItems();

    // 첫 번째 포트폴리오 항목의 토글 상태 초기화
    initializePortfolioToggleStates();

    console.log('초기화 완료');
});

// 폼 초기화
function initializeForm() {
    // 필수 필드 검증
    const requiredFields = document.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', validateField);
    });

    // 자동 저장 이벤트 리스너 추가
    setupAutoSave();
}

// 필드 검증
function validateField(event) {
    const field = event.target;
    const value = field.value.trim();

    if (field.hasAttribute('required') && !value) {
        field.style.borderColor = '#e74c3c';
        field.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
    } else {
        field.style.borderColor = '#3498db';
        field.style.boxShadow = '0 0 0 3px rgba(52, 152, 219, 0.1)';
    }
}

// 사진 미리보기
function previewPhoto(input) {
    const file = input.files[0];
    const preview = document.getElementById('photoPreview');

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            photoData = e.target.result;
            preview.innerHTML = `<img src="${photoData}" alt="프로필 사진">`;
        };
        reader.readAsDataURL(file);
    } else {
        photoData = null;
        preview.innerHTML = `
            <div class="photo-placeholder">
                <span>📷</span>
                <p>사진을 선택하세요</p>
            </div>
        `;
    }
}

// 아이템 삭제
function removeItem(button) {
    const item = button.parentElement;
    item.remove();
}

// 특정 섹션으로 스크롤하는 함수
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 날짜 포맷팅
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' });
}

// 월 포맷팅
function formatMonth(monthString) {
    if (!monthString) return '';
    const [year, month] = monthString.split('-');
    return `${year}년 ${month}월`;
}

// 연도 범위 포맷팅 (월 포함)
function formatYearRange(startDate, endDate, status = '') {
    if (!startDate && !endDate) return '';

    const startYear = startDate ? startDate.split('-')[0] : '';
    const startMonth = startDate ? startDate.split('-')[1] : '';
    const endYear = endDate ? endDate.split('-')[0] : '';
    const endMonth = endDate ? endDate.split('-')[1] : '';

    if (status === '재직중') {
        return `${startYear}.${startMonth}-현재`;
    }

    if (startYear && endYear) {
        return `${startYear}.${startMonth}-${endYear}.${endMonth}`;
    } else if (startYear) {
        return `${startYear}.${startMonth}`;
    } else if (endYear) {
        return `${endYear}.${endMonth}`;
    }

    return '';
}

// 연도 포맷팅
function formatYear(dateString) {
    if (!dateString) return '';
    const year = dateString.split('-')[0];
    return year;
}

// 기존 포트폴리오 항목들 업데이트
function updateExistingPortfolioItems() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        // 작업 유형 선택이 없는 경우에만 추가
        if (!item.querySelector('select[name="portfolioType"]')) {
            const titleGroup = item.querySelector('.form-row');
            if (titleGroup) {
                // 작업 유형 선택 추가
                const typeGroup = document.createElement('div');
                typeGroup.className = 'form-group';
                typeGroup.innerHTML = `
                    <label>작업 유형</label>
                    <select name="portfolioType" onchange="togglePortfolioTeamFields(this)">
                        <option value="개인">개인</option>
                        <option value="단체">단체</option>
                    </select>
                `;
                titleGroup.appendChild(typeGroup);

                // 팀 필드 추가
                const teamFields = document.createElement('div');
                teamFields.className = 'form-row portfolio-team-fields';
                teamFields.style.display = 'none';
                teamFields.innerHTML = `
                    <div class="form-group">
                        <label>작업 기간</label>
                        <input type="text" name="portfolioPeriod" placeholder="예: 2023.03 ~ 2023.06">
                    </div>
                    <div class="form-group">
                        <label>참여 인원</label>
                        <input type="number" name="portfolioMembers" placeholder="예: 4" min="2">
                    </div>
                `;

                // 링크 필드 앞에 삽입
                const linkRow = item.querySelector('.form-row:nth-child(2)');
                if (linkRow) {
                    linkRow.parentNode.insertBefore(teamFields, linkRow);
                } else {
                    item.appendChild(teamFields);
                }
            }
        }
    });
}

// 포트폴리오 토글 상태 초기화
function initializePortfolioToggleStates() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        const typeSelect = item.querySelector('select[name="portfolioType"]');
        if (typeSelect && typeSelect.value === '단체') {
            togglePortfolioTeamFields(typeSelect);
        }
    });
}

// 포트폴리오 팀 필드 토글 함수
function togglePortfolioTeamFields(selectElement) {
    const portfolioItem = selectElement.closest('.portfolio-item');
    const teamFields = portfolioItem.querySelector('.portfolio-team-fields');

    if (selectElement.value === '단체') {
        teamFields.style.display = 'flex';
    } else {
        teamFields.style.display = 'none';
    }
}
