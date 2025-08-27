// 토스트 알림 표시 함수
function showToast(message, type = 'info') {
    // 기존 토스트 제거
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    // 애니메이션 시작
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    // 3초 후 제거
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// 미리보기
function previewResume() {
    try {
        console.log('🔍 미리보기 시작...');

        // 폼 데이터 수집
        const formData = collectFormData();
        console.log('📋 수집된 폼 데이터:', formData);

        // HTML 생성
        const resumeHTML = generateResumeHTML(formData);
        console.log('📄 생성된 HTML 길이:', resumeHTML.length);

        // 미리보기 요소들 확인
        const resumeContent = document.getElementById('resumeContent');
        const resumePreview = document.getElementById('resumePreview');

        if (!resumeContent) {
            console.error('❌ resumeContent 요소를 찾을 수 없습니다.');
            showToast('미리보기 요소를 찾을 수 없습니다.', 'error');
            return;
        }

        if (!resumePreview) {
            console.error('❌ resumePreview 요소를 찾을 수 없습니다.');
            showToast('미리보기 모달을 찾을 수 없습니다.', 'error');
            return;
        }

        // 내용 설정 및 모달 표시
        resumeContent.innerHTML = resumeHTML;
        resumePreview.classList.remove('hidden');

        console.log('✅ 미리보기 완료!');
        showToast('미리보기가 생성되었습니다!', 'success');

    } catch (error) {
        console.error('❌ 미리보기 중 오류 발생:', error);
        console.error('오류 스택:', error.stack);
        showToast('미리보기 생성 중 오류가 발생했습니다: ' + error.message, 'error');
    }
}

// 미리보기 닫기
function closePreview() {
    document.getElementById('resumePreview').classList.add('hidden');
}

// ESC 키로 미리보기 닫기
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closePreview();
    }
});

// 미리보기 외부 클릭 시 닫기
document.getElementById('resumePreview').addEventListener('click', function(event) {
    if (event.target === this) {
        closePreview();
    }
});

// 폼 초기화 기능
function resetForm() {
    // 사용자 확인
    const confirmReset = confirm('모든 입력 내용을 초기화하시겠습니까?\n이 작업은 되돌릴 수 없습니다.');
    if (!confirmReset) return;

    try {
        // 폼 요소들 초기화
        const form = document.getElementById('resumeForm');
        const inputs = form.querySelectorAll('input, select, textarea');

        inputs.forEach(input => {
            if (input.type === 'file') {
                input.value = '';
            } else if (input.type === 'checkbox' || input.type === 'radio') {
                input.checked = false;
            } else {
                input.value = '';
            }
        });

        // 사진 미리보기 초기화
        photoData = null;
        const photoPreview = document.getElementById('photoPreview');
        photoPreview.innerHTML = `
            <div class="photo-placeholder">
                <span>📷</span>
                <p>사진을 선택하세요</p>
            </div>
        `;

        // 동적 항목들 초기화 (첫 번째 항목만 남기고 나머지 삭제)
        resetDynamicItems('portfolioContainer', 'portfolio-item');
        resetDynamicItems('educationContainer', 'education-item');
        resetDynamicItems('experienceContainer', 'experience-item');
        resetDynamicItems('trainingContainer', 'training-item');
        resetDynamicItems('projectContainer', 'project-item');
        resetDynamicItems('introductionContainer', 'introduction-item');

        // 임시저장 데이터 삭제
        localStorage.removeItem('resumeDraft');

        // 필드 검증 스타일 초기화
        const requiredFields = document.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            field.style.borderColor = '#ccc';
            field.style.boxShadow = 'none';
        });

        showToast('폼이 초기화되었습니다!', 'success');

    } catch (error) {
        console.error('폼 초기화 중 오류:', error);
        showToast('폼 초기화 중 오류가 발생했습니다.', 'error');
    }
}

// 동적 항목 초기화 함수
function resetDynamicItems(containerId, itemClass) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const items = container.querySelectorAll(`.${itemClass}`);

    // 첫 번째 항목은 유지하고 내용만 초기화
    if (items[0]) {
        const inputs = items[0].querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            if (input.type === 'file') {
                input.value = '';
            } else if (input.type === 'checkbox' || input.type === 'radio') {
                input.checked = false;
            } else {
                input.value = '';
            }
        });
    }

    // 나머지 항목들 삭제
    for (let i = 1; i < items.length; i++) {
        items[i].remove();
    }
}
