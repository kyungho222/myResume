// 자동 저장 설정
function setupAutoSave() {
    const form = document.getElementById('resumeForm');

    // 폼 내의 모든 입력 요소에 이벤트 리스너 추가
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            // 전역 자동 저장 타이머가 있다면 사용
            if (window.autoSaveTimeout) {
                clearTimeout(window.autoSaveTimeout);
            }

            // 3초 후 자동 저장 실행
            window.autoSaveTimeout = setTimeout(() => {
                autoSave();
            }, 3000);
        });
    });

    // Rich Text Editor에 이벤트 리스너 추가
    const richEditors = form.querySelectorAll('.rich-editor');
    richEditors.forEach(editor => {
        editor.addEventListener('input', () => {
            // 전역 자동 저장 타이머가 있다면 사용
            if (window.autoSaveTimeout) {
                clearTimeout(window.autoSaveTimeout);
            }

            // 3초 후 자동 저장 실행
            window.autoSaveTimeout = setTimeout(() => {
                autoSave();
            }, 3000);
        });

        // 키보드 이벤트도 감지
        editor.addEventListener('keyup', () => {
            // 전역 자동 저장 타이머가 있다면 사용
            if (window.autoSaveTimeout) {
                clearTimeout(window.autoSaveTimeout);
            }

            // 3초 후 자동 저장 실행
            window.autoSaveTimeout = setTimeout(() => {
                autoSave();
            }, 3000);
        });
    });

    // 파일 입력에 대한 이벤트 리스너
    const photoInput = document.getElementById('photo');
    if (photoInput) {
        photoInput.addEventListener('change', () => {
            if (window.autoSaveTimeout) {
                clearTimeout(window.autoSaveTimeout);
            }
            window.autoSaveTimeout = setTimeout(() => {
                autoSave();
            }, 1000);
        });
    }
}

// 자동 저장 함수
function autoSave() {
    try {
        console.log('🔄 자동 저장 시작...');
        const formData = collectFormData();
        console.log('📝 수집된 폼 데이터:', formData);

        const draftData = {
            formData: formData,
            photoData: photoData,
            timestamp: new Date().toISOString(),
            name: formData.basic.name || '무제',
            autoSaved: true
        };

        localStorage.setItem('resumeDraft', JSON.stringify(draftData));
        console.log('✅ 자동 저장 완료:', new Date().toLocaleTimeString());
        console.log('📊 저장된 데이터 크기:', JSON.stringify(draftData).length, 'bytes');
    } catch (error) {
        console.error('❌ 자동 저장 중 오류:', error);
        console.error('오류 스택:', error.stack);
    }
}

// 임시저장 기능
function saveDraft() {
    try {
        const formData = collectFormData();
        const draftData = {
            formData: formData,
            photoData: photoData,
            timestamp: new Date().toISOString(),
            name: formData.basic.name || '무제'
        };

        localStorage.setItem('resumeDraft', JSON.stringify(draftData));
        showToast('임시저장이 완료되었습니다!', 'success');
    } catch (error) {
        console.error('임시저장 중 오류:', error);
        showToast('임시저장 중 오류가 발생했습니다.', 'error');
    }
}

// 임시저장 불러오기 기능
function loadDraft() {
    try {
        console.log('🔄 임시저장 불러오기 시작...');
        const savedDraft = localStorage.getItem('resumeDraft');
        if (!savedDraft) {
            console.log('❌ 저장된 임시저장이 없습니다.');
            showToast('저장된 임시저장이 없습니다.', 'info');
            return;
        }

        console.log('📄 저장된 데이터 크기:', savedDraft.length, 'bytes');
        const draftData = JSON.parse(savedDraft);
        console.log('📝 파싱된 임시저장 데이터:', draftData);

        const formData = draftData.formData;

        // 사용자 확인
        const confirmLoad = confirm(`"${draftData.name}" 임시저장을 불러오시겠습니까?\n현재 입력된 내용이 덮어써집니다.`);
        if (!confirmLoad) return;

        console.log('🔄 폼 데이터 복원 시작...');
        // 폼 데이터 복원
        restoreFormData(formData);

        // 사진 데이터 복원
        if (draftData.photoData) {
            photoData = draftData.photoData;
            const photoPreview = document.getElementById('photoPreview');
            photoPreview.innerHTML = `<img src="${photoData}" alt="프로필 사진">`;
        }

        console.log('✅ 임시저장 불러오기 완료!');
        showToast('임시저장을 불러왔습니다!', 'success');
    } catch (error) {
        console.error('❌ 임시저장 불러오기 중 오류:', error);
        console.error('오류 스택:', error.stack);
        showToast('임시저장 불러오기 중 오류가 발생했습니다.', 'error');
    }
}

// 저장된 임시저장 확인
function checkForSavedDraft() {
    const savedDraft = localStorage.getItem('resumeDraft');
    if (savedDraft) {
        try {
            const draftData = JSON.parse(savedDraft);
            const savedTime = new Date(draftData.timestamp);
            const now = new Date();
            const timeDiff = now - savedTime;
            const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));

            if (hoursDiff < 24) {
                showToast(`"${draftData.name}" 임시저장이 있습니다. (${hoursDiff}시간 전)`, 'info');
            }
        } catch (error) {
            console.error('임시저장 확인 중 오류:', error);
        }
    }
}

// 포트폴리오 추가 (최적화)
function addPortfolio() {
    const container = document.getElementById('portfolioContainer');
    const portfolioItem = document.createElement('div');
    portfolioItem.className = 'portfolio-item';
    portfolioItem.innerHTML = `
        <div class="form-row">
            <div class="form-group">
                <label>프로젝트 제목</label>
                <input type="text" name="portfolioTitle" placeholder="예: 개인 프로젝트, 프로젝트명">
            </div>
            <div class="form-group">
                <label>작업 유형</label>
                <select name="portfolioType" onchange="togglePortfolioTeamFields(this)">
                    <option value="개인">개인</option>
                    <option value="단체">단체</option>
                </select>
            </div>
        </div>
        <div class="form-row portfolio-team-fields" style="display: none;">
            <div class="form-group">
                <label>작업 기간</label>
                <input type="text" name="portfolioPeriod" placeholder="예: 2023.03 ~ 2023.06">
            </div>
            <div class="form-group">
                <label>참여 인원</label>
                <input type="number" name="portfolioMembers" placeholder="예: 4" min="2">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>링크</label>
                <input type="url" name="portfolioUrl" placeholder="https://example.com">
            </div>
        </div>
        <div class="form-group">
            <label>설명</label>
            <div class="rich-editor-container">
                <div class="rich-editor" name="portfolioDescription" contenteditable="true" data-placeholder="프로젝트에 대한 간단한 설명을 입력하세요"></div>
            </div>
        </div>
        <button type="button" class="remove-btn" onclick="removeItem(this)">삭제</button>
    `;
    container.appendChild(portfolioItem);

    // 새로 추가된 Rich Text Editor 초기화
    const newEditor = portfolioItem.querySelector('.rich-editor');
    if (newEditor) {
        // 툴바 생성 및 이벤트 리스너 설정
        createToolbarForEditor(newEditor, 'portfolio');
        setupEditorEventListeners(newEditor, 'portfolio');
        setupPlaceholder(newEditor);
    }
}

// 교육연수 추가 (최적화)
function addTraining() {
    const container = document.getElementById('trainingContainer');
    const trainingItem = document.createElement('div');
    trainingItem.className = 'training-item';
    trainingItem.innerHTML = `
        <div class="form-row">
            <div class="form-group">
                <label>연수기간</label>
                <input type="text" name="trainingPeriod" placeholder="예: 2022.06. ~ 2022.11.">
            </div>
            <div class="form-group">
                <label>연수기관 타이틀</label>
                <input type="text" name="trainingInstitutionTitle" placeholder="예: 이젠컴퓨터학원">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>연수기관명</label>
                <input type="text" name="trainingInstitution" placeholder="예: 이젠컴퓨터학원 웹개발 과정">
            </div>
        </div>
        <div class="form-group">
            <label>연수과정 및 내용</label>
            <div class="rich-editor-container">
                <div class="rich-editor" contenteditable="true" data-placeholder="연수 과정명과 주요 내용을 입력하세요"></div>
            </div>
        </div>
        <button type="button" class="remove-btn" onclick="removeItem(this)">삭제</button>
    `;
    container.appendChild(trainingItem);

    // 새로 생성된 Rich Text Editor 초기화
    const newEditor = trainingItem.querySelector('.rich-editor');
    if (newEditor) {
        // 툴바 생성 및 이벤트 리스너 설정
        createToolbarForEditor(newEditor, 'training');
        setupEditorEventListeners(newEditor, 'training');
        setupPlaceholder(newEditor);
    }
}

// 자기소개 항목 추가 (최적화)
function addIntroduction(data = null) {
    const container = document.getElementById('introductionContainer');
    const introItem = document.createElement('div');
    introItem.className = 'introduction-item';
    introItem.innerHTML = `
        <div class="form-row">
            <div class="form-group">
                <label>소개 제목</label>
                <input type="text" name="introTitle" placeholder="예: 성격 소개, 업무역량, 지원동기 등" value="${data ? data.introTitle || '' : ''}">
            </div>
        </div>
        <div class="form-group">
            <label>소개 내용</label>
            <div class="rich-editor-container">
                <div class="rich-editor" name="introContent" contenteditable="true" data-placeholder="해당 항목에 대한 상세한 내용을 작성하세요"></div>
            </div>
        </div>
        <button type="button" class="remove-btn" onclick="removeItem(this)">삭제</button>
    `;
    container.appendChild(introItem);

    // 새로 생성된 Rich Text Editor 초기화
    const newEditor = introItem.querySelector('.rich-editor');
    if (newEditor) {
        // 툴바 생성 및 이벤트 리스너 설정
        createToolbarForEditor(newEditor, 'introduction');
        setupEditorEventListeners(newEditor, 'introduction');
        setupPlaceholder(newEditor);
    }
}

// 학력 추가
function addEducation() {
    educationCount++;
    const container = document.getElementById('educationContainer');
    const newItem = document.createElement('div');
    newItem.className = 'education-item';
    newItem.innerHTML = `
        <div class="form-row">
            <div class="form-group">
                <label>학교명 *</label>
                <input type="text" name="school" required>
            </div>
            <div class="form-group">
                <label>전공</label>
                <input type="text" name="major">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>입학년월</label>
                <input type="month" name="startDate">
            </div>
            <div class="form-group">
                <label>졸업년월</label>
                <input type="month" name="endDate">
            </div>
            <div class="form-group">
                <label>졸업구분</label>
                <select name="graduationType">
                    <option value="졸업">졸업</option>
                    <option value="재학중">재학중</option>
                    <option value="휴학중">휴학중</option>
                    <option value="중퇴">중퇴</option>
                </select>
            </div>
        </div>
        <button type="button" class="remove-btn" onclick="removeItem(this)">삭제</button>
    `;
    container.appendChild(newItem);
}

// 경력 추가 (최적화)
function addExperience() {
    experienceCount++;
    const container = document.getElementById('experienceContainer');
    const newItem = document.createElement('div');
    newItem.className = 'experience-item';
    newItem.innerHTML = `
        <div class="form-row">
            <div class="form-group">
                <label>회사명 *</label>
                <input type="text" name="company" required>
            </div>
            <div class="form-group">
                <label>직책</label>
                <input type="text" name="position" placeholder="예: 팀장, 개발자, 디자이너">
            </div>
            <div class="form-group">
                <label>업종정보</label>
                <input type="text" name="industry" placeholder="예: IT/소프트웨어, 제조업, 금융업 등">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>입사년월</label>
                <input type="month" name="startDate">
            </div>
            <div class="form-group">
                <label>퇴사년월</label>
                <input type="month" name="endDate">
            </div>
            <div class="form-group">
                <label>재직상태</label>
                <select name="employmentStatus">
                    <option value="재직중">재직중</option>
                    <option value="퇴사">퇴사</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label>주요업무</label>
            <div class="rich-editor-container">
                <div class="rich-editor" contenteditable="true" data-placeholder="담당했던 주요 업무를 입력하세요"></div>
            </div>
        </div>
        <div class="form-group">
            <label>성과영역</label>
            <div class="rich-editor-container">
                <div class="rich-editor" contenteditable="true" data-placeholder="업무 성과 및 결과를 입력하세요"></div>
            </div>
        </div>
        <button type="button" class="remove-btn" onclick="removeItem(this)">삭제</button>
    `;
    container.appendChild(newItem);

    // 새로 생성된 Rich Text Editor 초기화
    const newEditors = newItem.querySelectorAll('.rich-editor');
    newEditors.forEach((editor, index) => {
        // 툴바 생성 및 이벤트 리스너 설정
        createToolbarForEditor(editor, `experience-${index}`);
        setupEditorEventListeners(editor, `experience-${index}`);
        setupPlaceholder(editor);
    });
}
