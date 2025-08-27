// 전역 변수
let educationCount = 1;
let experienceCount = 1;
let photoData = null;
let currentTheme = 'blue'; // 현재 테마

// 테마 변경 함수
function changeTheme(theme) {
    currentTheme = theme;

    // body에 data-theme 속성 설정
    document.body.setAttribute('data-theme', theme);

    // 테마 버튼 활성화 상태 변경
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-theme') === theme) {
            btn.classList.add('active');
        }
    });

    // 테마 설정을 localStorage에 저장
    localStorage.setItem('selectedTheme', theme);

    showToast(`${getThemeName(theme)} 테마로 변경되었습니다!`, 'info');
}

// 랜덤 테마 생성 함수
function changeRandomTheme() {
    console.log('🎲 랜덤 테마 함수 실행됨');

    // 랜덤 색상 생성 함수 - 더 다양한 색상 조합
    function generateRandomColor() {
        const hue = Math.floor(Math.random() * 360);
        const saturation = Math.floor(Math.random() * 40) + 50; // 50-90%
        const lightness = Math.floor(Math.random() * 25) + 65; // 65-90% (파스텔톤)
        const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        console.log('생성된 색상:', color);
        return color;
    }

    // 보완색 관계의 색상 생성 함수
    function generateComplementaryColors() {
        const baseHue = Math.floor(Math.random() * 360);
        const saturation = Math.floor(Math.random() * 30) + 60; // 60-90%
        const lightness1 = Math.floor(Math.random() * 20) + 70; // 70-90%
        const lightness2 = Math.floor(Math.random() * 20) + 70; // 70-90%

        return [
            `hsl(${baseHue}, ${saturation}%, ${lightness1}%)`,
            `hsl(${(baseHue + 180) % 360}, ${saturation}%, ${lightness2}%)`
        ];
    }

    // 삼각형 색상 관계 생성 함수
    function generateTriadicColors() {
        const baseHue = Math.floor(Math.random() * 360);
        const saturation = Math.floor(Math.random() * 30) + 60; // 60-90%
        const lightness1 = Math.floor(Math.random() * 20) + 70; // 70-90%
        const lightness2 = Math.floor(Math.random() * 20) + 70; // 70-90%
        const lightness3 = Math.floor(Math.random() * 20) + 70; // 70-90%

        return [
            `hsl(${baseHue}, ${saturation}%, ${lightness1}%)`,
            `hsl(${(baseHue + 120) % 360}, ${saturation}%, ${lightness2}%)`,
            `hsl(${(baseHue + 240) % 360}, ${saturation}%, ${lightness3}%)`
        ];
    }

    // 색상 조합 타입 선택 (0: 완전 랜덤, 1: 보완색, 2: 삼각형)
    const colorSchemeType = Math.floor(Math.random() * 3);
    console.log('색상 조합 타입:', colorSchemeType);
    let colors = [];

    if (colorSchemeType === 0) {
        // 완전 랜덤 3색상
        for (let i = 0; i < 3; i++) {
            colors.push(generateRandomColor());
        }
    } else if (colorSchemeType === 1) {
        // 보완색 관계 2색상 + 추가 랜덤 1색상
        colors = generateComplementaryColors();
        colors.push(generateRandomColor());
    } else {
        // 삼각형 색상 관계 3색상
        colors = generateTriadicColors();
    }

    console.log('최종 색상 배열:', colors);

    // CSS 변수 동적 설정 - 각각 다른 색상 사용
    const root = document.documentElement;
    root.style.setProperty('--primary-color', colors[0]);
    root.style.setProperty('--secondary-color', colors[1]);
    root.style.setProperty('--accent-color', colors[2]);

    // 텍스트 색상은 어두운 색으로 설정
    const darkColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 25%)`;
    root.style.setProperty('--text-color', darkColor);

    // 보더 색상은 accent 색상 사용
    root.style.setProperty('--border-color', colors[2]);

    // 스킬 관련 색상들 - 각각 다른 색상 사용
    root.style.setProperty('--skill-bg', colors[0]);
    root.style.setProperty('--skill-border', colors[1]);
    root.style.setProperty('--skill-hover', colors[2]);
    root.style.setProperty('--left-text-color', '#ffffff');

    console.log('CSS 변수 설정 완료');
    console.log('--primary-color:', getComputedStyle(root).getPropertyValue('--primary-color'));
    console.log('--secondary-color:', getComputedStyle(root).getPropertyValue('--secondary-color'));
    console.log('--accent-color:', getComputedStyle(root).getPropertyValue('--accent-color'));

    // 테마 버튼 활성화 상태 변경
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-theme') === 'random') {
            btn.classList.add('active');
        }
    });

    // 랜덤 테마 설정을 localStorage에 저장
    localStorage.setItem('selectedTheme', 'random');

    showToast('🎨 랜덤 멀티컬러 테마가 생성되었습니다!', 'info');
    console.log('🎲 랜덤 테마 함수 완료');
}

// 테마 이름 반환 함수
function getThemeName(theme) {
    const themeNames = {
        'blue': '파스텔 블루',
        'green': '파스텔 그린',
        'purple': '파스텔 퍼플',
        'orange': '파스텔 오렌지',
        'red': '파스텔 레드',
        'gray': '파스텔 그레이',
        'random': '랜덤 멀티컬러',
        // 'black': '블랙'
    };
    return themeNames[theme] || theme;
}

// 저장된 테마 불러오기
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        if (savedTheme === 'random') {
            // 랜덤 테마는 다시 생성하지 않고 기본 테마로 설정
            changeTheme('blue');
        } else {
            changeTheme(savedTheme);
        }
    }
}

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

// selection 저장/복원 유틸
function saveEditorSelection(editor) {
	console.log('saveEditorSelection called for:', editor);
	const selection = window.getSelection();
	if (!selection || selection.rangeCount === 0) {
		console.log('No selection to save');
		return;
	}
	const range = selection.getRangeAt(0);
	// 에디터 내부 선택만 저장
	if (editor.contains(range.startContainer) && editor.contains(range.endContainer)) {
		editor._savedRange = range.cloneRange();
		console.log('Selection saved:', editor._savedRange);
	} else {
		console.log('Selection not within editor, not saved');
	}
}

function restoreEditorSelection(editor) {
	console.log('restoreEditorSelection called for:', editor);
	const selection = window.getSelection();
	if (!selection) {
		console.log('No selection object available');
		return false;
	}
	if (editor._savedRange) {
		selection.removeAllRanges();
		selection.addRange(editor._savedRange);
		console.log('Selection restored successfully');
		return true;
	}
	console.log('No saved range to restore');
	return false;
}

// Rich Editor 초기화 (최적화)
function initializeRichEditors() {
	console.log('initializeRichEditors called');

	// 기존 이벤트 리스너 정리
	cleanupRichEditors();

	// 새로 이벤트 리스너 등록
	const editors = document.querySelectorAll('.rich-editor');
	console.log('Found editors:', editors.length);

	editors.forEach((editor, index) => {
		console.log(`Initializing editor ${index}:`, editor);

		// 툴바 생성
		createToolbarForEditor(editor, index);

		// 이벤트 리스너 등록
		setupEditorEventListeners(editor, index);

		// 초기 플레이스홀더 설정
		setupPlaceholder(editor);
	});

	// 전역 키보드 이벤트 리스너 (한 번만 등록)
	setupGlobalKeyboardEvents();
}

// Rich Editor 정리 함수
function cleanupRichEditors() {
	const editors = document.querySelectorAll('.rich-editor');
	editors.forEach(editor => {
		// 기존 이벤트 리스너 제거를 위해 클론
		const newEditor = editor.cloneNode(true);
		editor.parentNode.replaceChild(newEditor, editor);
	});
}

// 에디터별 툴바 생성
function createToolbarForEditor(editor, index) {
	const container = editor.parentElement;
	if (!container.querySelector('.rich-editor-toolbar')) {
		console.log('Creating toolbar for editor', index);
		const toolbar = createToolbar();
		container.insertBefore(toolbar, editor);
	}
}

// 에디터 이벤트 리스너 설정
function setupEditorEventListeners(editor, index) {
	const toolbar = editor.parentElement.querySelector('.rich-editor-toolbar');

	// 편집 중 커서/선택 저장
	editor.addEventListener('mouseup', () => {
		saveEditorSelection(editor);
	});

	// 툴바 버튼 이벤트 리스너
	toolbar.addEventListener('click', function(e) {
		const btn = e.target.closest('.toolbar-btn');
		if (!btn) return;

		e.preventDefault();
		e.stopPropagation();

		editor.focus();
		const command = btn.dataset.command;
		console.log('Executing command:', command);
		executeCommand(editor, command);
	});

	// 키보드 단축키 지원
	editor.addEventListener('keydown', function(e) {
		if (e.ctrlKey || e.metaKey) {
			switch(e.key.toLowerCase()) {
				case 'b':
					e.preventDefault();
					e.stopPropagation();
					console.log('Ctrl+B pressed on editor', index);
					executeCommand(editor, 'bold');
					return false;
				case 'i':
					e.preventDefault();
					e.stopPropagation();
					console.log('Ctrl+I pressed on editor', index);
					executeCommand(editor, 'italic');
					return false;
			}
		}
	});

	// 포커스 시 플레이스홀더 처리
	editor.addEventListener('focus', function() {
		if (editor.textContent === editor.dataset.placeholder) {
			editor.textContent = '';
			editor.classList.remove('placeholder');
		}
		updateEditorFocusState(editor, true);
	});

	editor.addEventListener('blur', function() {
		if (editor.textContent.trim() === '') {
			editor.textContent = editor.dataset.placeholder;
			editor.classList.add('placeholder');
		}
		updateEditorFocusState(editor, false);
	});

	// 자동 저장 이벤트
	editor.addEventListener('input', function() {
		if (window.autoSaveTimeout) {
			clearTimeout(window.autoSaveTimeout);
		}
		window.autoSaveTimeout = setTimeout(() => {
			autoSave();
		}, 3000);
	});

	editor.addEventListener('keyup', function() {
		if (window.autoSaveTimeout) {
			clearTimeout(window.autoSaveTimeout);
		}
		window.autoSaveTimeout = setTimeout(() => {
			autoSave();
		}, 3000);
	});
}

// 플레이스홀더 설정
function setupPlaceholder(editor) {
	if (editor.textContent.trim() === '') {
		editor.textContent = editor.dataset.placeholder;
		editor.classList.add('placeholder');
	}
}

// 전역 키보드 이벤트 설정
function setupGlobalKeyboardEvents() {
	// 기존 전역 이벤트 리스너 제거
	document.removeEventListener('keydown', globalKeyboardHandler);

	// 새 전역 이벤트 리스너 등록
	document.addEventListener('keydown', globalKeyboardHandler);
}

// 전역 키보드 이벤트 핸들러
function globalKeyboardHandler(e) {
	if (e.ctrlKey || e.metaKey) {
		const activeEditor = document.activeElement;
		if (activeEditor && activeEditor.classList.contains('rich-editor')) {
			switch(e.key.toLowerCase()) {
				case 'b':
					e.preventDefault();
					e.stopPropagation();
					console.log('Global Ctrl+B pressed');
					executeCommand(activeEditor, 'bold');
					return false;
				case 'i':
					e.preventDefault();
					e.stopPropagation();
					console.log('Global Ctrl+I pressed');
					executeCommand(activeEditor, 'italic');
					return false;
			}
		}
	}
}

// Bold 명령어 실행 함수
function executeBoldCommand(editor, selection) {
	console.log('Executing bold command');

	// execCommand 사용
	const boldResult = document.execCommand('bold', false, null);
	console.log('execCommand bold result:', boldResult);

	// 선택된 텍스트가 없으면 플레이스홀더 삽입
	if (!selection.toString()) {
		console.log('No text selected, inserting bold placeholder');
		const strong = document.createElement('strong');
		strong.textContent = '굵은 텍스트';

		const range = selection.getRangeAt(0);
		range.insertNode(strong);

		// strong 태그 내부로 캐럿 이동
		const newRange = document.createRange();
		newRange.setStart(strong, 0);
		newRange.collapse(true);
		selection.removeAllRanges();
		selection.addRange(newRange);
	}
}

// Italic 명령어 실행 함수
function executeItalicCommand(editor, selection) {
	console.log('Executing italic command');

	// execCommand 사용
	const italicResult = document.execCommand('italic', false, null);
	console.log('execCommand italic result:', italicResult);

	// 선택된 텍스트가 없으면 플레이스홀더 삽입
	if (!selection.toString()) {
		console.log('No text selected, inserting italic placeholder');
		const em = document.createElement('em');
		em.textContent = '기울임 텍스트';

		const range = selection.getRangeAt(0);
		range.insertNode(em);

		// em 태그 내부로 캐럿 이동
		const newRange = document.createRange();
		newRange.setStart(em, 0);
		newRange.collapse(true);
		selection.removeAllRanges();
		selection.addRange(newRange);
	}
}

// 툴바 생성 함수
function createToolbar() {
    const toolbar = document.createElement('div');
    toolbar.className = 'rich-editor-toolbar';
    toolbar.innerHTML = `
        <button type="button" class="toolbar-btn" data-command="bold" title="굵게 (Ctrl+B)">
            <strong>B</strong>
        </button>
        <button type="button" class="toolbar-btn" data-command="italic" title="기울임 (Ctrl+I)">
            <em>I</em>
        </button>
        <button type="button" class="toolbar-btn" data-command="insertUnorderedList" title="목록">
            • 목록
        </button>
        <button type="button" class="toolbar-btn" data-command="insertOrderedList" title="번호 목록">
            1. 목록
        </button>
        <button type="button" class="toolbar-btn" data-command="insertNumberedList" title="번호 지정 목록">
            #. 번호 지정
        </button>
        <button type="button" class="toolbar-btn" data-command="convertToNumberedList" title="텍스트를 번호 목록으로 변환">
            📝 번호 변환
        </button>
    `;
    return toolbar;
}

// 명령어 실행 함수 (최적화)
function executeCommand(editor, command) {
    console.log('executeCommand called with:', command, 'for editor:', editor);

    // 에디터에 포커스
    editor.focus();

    // 선택된 텍스트 범위 가져오기
    const selection = window.getSelection();

    // 선택된 범위가 없으면 에디터 끝에 커서 위치
    if (selection.rangeCount === 0) {
        const range = document.createRange();
        range.selectNodeContents(editor);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
    }

    try {
        console.log('Executing command:', command);
        switch(command) {
            case 'bold':
                executeBoldCommand(editor, selection);
                break;
            case 'italic':
                executeItalicCommand(editor, selection);
                break;
            case 'insertUnorderedList':
                console.log('Executing unordered list command');

                // 선택된 텍스트 확인
                const ulSelectedText = selection.toString().trim();
                console.log('Selected text for unordered list:', ulSelectedText);

                // execCommand 사용
                const ulResult = document.execCommand('insertUnorderedList', false, null);
                console.log('execCommand unordered list result:', ulResult);

                // 선택된 텍스트가 없으면 플레이스홀더 삽입
                if (!ulSelectedText) {
                    console.log('No text selected, inserting unordered list placeholder');
                    const ul = document.createElement('ul');
                    const li = document.createElement('li');
                    li.textContent = '목록 항목';
                    ul.appendChild(li);

                    const range = selection.getRangeAt(0);
                    range.insertNode(ul);

                    // li 내부로 캐럿 이동
                    const newRange = document.createRange();
                    newRange.setStart(li, 0);
                    newRange.collapse(true);
                    selection.removeAllRanges();
                    selection.addRange(newRange);
                }
                break;
            case 'insertOrderedList':
                console.log('Executing ordered list command');

                // 선택된 텍스트 확인
                const olSelectedText = selection.toString().trim();
                console.log('Selected text for ordered list:', olSelectedText);

                // execCommand 사용
                const olResult = document.execCommand('insertOrderedList', false, null);
                console.log('execCommand ordered list result:', olResult);

                // 선택된 텍스트가 없으면 플레이스홀더 삽입
                if (!olSelectedText) {
                    console.log('No text selected, inserting ordered list placeholder');
                    const ol = document.createElement('ol');
                    const li = document.createElement('li');
                    li.textContent = '번호 목록';
                    ol.appendChild(li);

                    const range = selection.getRangeAt(0);
                    range.insertNode(ol);

                    // li 내부로 캐럿 이동
                    const newRange = document.createRange();
                    newRange.setStart(li, 0);
                    newRange.collapse(true);
                    selection.removeAllRanges();
                    selection.addRange(newRange);
                }
                break;
            case 'insertNumberedList':
                console.log('Executing numbered list command');

                // 선택된 텍스트 확인
                const nlSelectedText = selection.toString().trim();
                console.log('Selected text for numbered list:', nlSelectedText);

                // 시작 번호 입력 받기
                const nlStartNumber = prompt('시작 번호를 입력하세요 (기본값: 1):', '1');
                const nlStartNum = parseInt(nlStartNumber) || 1;

                // 수동으로 번호 목록 생성
                const nl = document.createElement('ol');
                nl.setAttribute('start', nlStartNum);
                const nli = document.createElement('li');

                if (nlSelectedText) {
                    nli.textContent = nlSelectedText;
                    const nlRange = selection.getRangeAt(0);
                    nlRange.deleteContents();
                    nlRange.insertNode(nl);
                } else {
                    nli.textContent = '번호 지정 목록';
                    const nlRange = selection.getRangeAt(0);
                    nlRange.insertNode(nl);
                }

                nl.appendChild(nli);

                // li 내부로 캐럿 이동
                const nlNewRange = document.createRange();
                nlNewRange.setStart(nli, 0);
                nlNewRange.collapse(true);
                selection.removeAllRanges();
                selection.addRange(nlNewRange);

                console.log('Numbered list created with start number:', nlStartNum);
                break;
            case 'convertToNumberedList':
                console.log('Executing convert to numbered list command');

                // 선택된 텍스트 가져오기
                const convertSelectedText = selection.toString().trim();
                if (!convertSelectedText) {
                    alert('변환할 텍스트를 선택해주세요.');
                    return;
                }

                // 시작 번호 입력 받기
                const convertStartNumber = prompt('시작 번호를 입력하세요 (기본값: 1):', '1');
                const convertStartNum = parseInt(convertStartNumber) || 1;

                // 텍스트를 줄바꿈으로 분리
                const lines = convertSelectedText.split('\n').filter(line => line.trim());

                if (lines.length === 0) {
                    alert('변환할 텍스트가 없습니다.');
                    return;
                }

                // 번호 목록 생성
                const convertOl = document.createElement('ol');
                convertOl.setAttribute('start', convertStartNum);

                lines.forEach((line, index) => {
                    const convertLi = document.createElement('li');
                    convertLi.textContent = line.trim();
                    convertOl.appendChild(convertLi);
                });

                // 기존 선택된 텍스트 삭제하고 목록 삽입
                const convertRange = selection.getRangeAt(0);
                convertRange.deleteContents();
                convertRange.insertNode(convertOl);

                // 목록 끝으로 캐럿 이동
                const convertNewRange = document.createRange();
                convertNewRange.setStartAfter(convertOl);
                convertNewRange.collapse(true);
                selection.removeAllRanges();
                selection.addRange(convertNewRange);

                console.log('Text converted to numbered list with start number:', convertStartNum);
                break;
        }
    } catch (error) {
        console.error('명령어 실행 오류:', error);
        // 폴백 방법
        try {
            console.log('Trying fallback method for:', command);
            switch(command) {
                case 'bold':
                    document.execCommand('bold', false, null);
                    break;
                case 'italic':
                    document.execCommand('italic', false, null);
                    break;
                case 'insertUnorderedList':
                    document.execCommand('insertUnorderedList', false, null);
                    break;
                case 'insertOrderedList':
                    document.execCommand('insertOrderedList', false, null);
                    break;
            }
        } catch (fallbackError) {
            console.error('폴백 명령도 실패:', fallbackError);
        }
    }

    // 버튼 상태 업데이트
    updateToolbarState(editor);
}

// 툴바 상태 업데이트
function updateToolbarState(editor) {
    const toolbar = editor.parentElement.querySelector('.rich-editor-toolbar');
    if (!toolbar) return;

    toolbar.querySelectorAll('.toolbar-btn').forEach(btn => {
        const command = btn.dataset.command;
        if (command === 'bold' || command === 'italic') {
            if (document.queryCommandState(command)) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        }
    });
}

// Rich Editor 내용 가져오기
function getRichEditorContent(editor) {
    try {
        if (!editor) {
            console.warn('⚠️ editor가 null 또는 undefined입니다.');
            return '';
        }

        if (editor.classList && editor.classList.contains('placeholder')) {
            return '';
        }

        return editor.innerHTML || '';
    } catch (error) {
        console.error('❌ getRichEditorContent 오류:', error);
        return '';
    }
}

// Rich Editor 내용 설정하기
function setRichEditorContent(editor, content) {
    if (content && content.trim() !== '') {
        editor.innerHTML = content;
        editor.classList.remove('placeholder');
    } else {
        editor.textContent = editor.dataset.placeholder;
        editor.classList.add('placeholder');
    }
}

// 포커스 상태 관리 함수
function updateEditorFocusState(editor, isFocused) {
	const container = editor.parentElement;
	if (isFocused) {
		container.classList.add('focused');
	} else {
		container.classList.remove('focused');
	}
}

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
        console.log('�� 저장된 데이터 크기:', JSON.stringify(draftData).length, 'bytes');
    } catch (error) {
        console.error('❌ 자동 저장 중 오류:', error);
        console.error('오류 스택:', error.stack);
    }
}

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

// 폼 데이터 수집
function collectFormData() {
    try {
        console.log('📋 폼 데이터 수집 시작...');

        const formData = {
            basic: {
                name: document.getElementById('name')?.value || '',
                email: document.getElementById('email')?.value || '',
                phone: document.getElementById('phone')?.value || '',
                address: document.getElementById('address')?.value || '',
                birth: document.getElementById('birth')?.value || '',
                gender: document.getElementById('gender')?.value || '',
                jobTitle: document.getElementById('jobTitle')?.value || '',
                driverLicense: document.getElementById('driverLicense')?.value || '',
                hobby: document.getElementById('hobby')?.value || '',
                experienceType: document.getElementById('experienceType')?.value || '',
                github: document.getElementById('github')?.value || '',
                resumeSummary: getRichEditorContent(document.querySelector('#resumeSummary')) || '',
                keyProjects: getRichEditorContent(document.querySelector('[name="keyProjects"]')) || ''
            },
            education: [],
            experience: [],
            portfolio: [],
            training: [],
            skills: collectSkillsData(),
            introductions: [],
            additionalInfo: getRichEditorContent(document.querySelector('#additionalInfo')) || ''
        };

    // 자기소개 수집
    const introductionItems = document.querySelectorAll('.introduction-item');
    introductionItems.forEach(item => {
        const inputs = item.querySelectorAll('input');
        const richEditors = item.querySelectorAll('.rich-editor');
        const introduction = {};

        // 일반 입력 필드 수집
        inputs.forEach(input => {
            introduction[input.name] = input.value;
        });

        // Rich Text Editor 내용 수집
        richEditors.forEach(editor => {
            const name = editor.getAttribute('name');
            if (name) {
                introduction[name] = getRichEditorContent(editor);
            }
        });

        if (introduction.introTitle || introduction.introContent) {
            formData.introductions.push(introduction);
        }
    });

    // 포트폴리오 수집
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        const inputs = item.querySelectorAll('input, select');
        const richEditors = item.querySelectorAll('.rich-editor');
        const portfolio = {};

        // 일반 입력 필드 수집
        inputs.forEach(input => {
            portfolio[input.name] = input.value;
        });

        // Rich Text Editor 내용 수집
        richEditors.forEach(editor => {
            const name = editor.getAttribute('name');
            if (name) {
                portfolio[name] = getRichEditorContent(editor);
            }
        });

        if (portfolio.portfolioTitle) {
            formData.portfolio.push(portfolio);
        }
    });

    // 교육연수 수집
    const trainingItems = document.querySelectorAll('.training-item');
    trainingItems.forEach(item => {
        const inputs = item.querySelectorAll('input');
        const training = {};
        inputs.forEach(input => {
            training[input.name] = input.value;
        });

        // Rich Text Editor에서 trainingContent 수집
        const trainingContentEditor = item.querySelector('.rich-editor');
        if (trainingContentEditor) {
            training.trainingContent = getRichEditorContent(trainingContentEditor);
        }

        if (training.trainingPeriod) {
            formData.training.push(training);
        }
    });



    // 학력사항 수집
    const educationItems = document.querySelectorAll('.education-item');
    educationItems.forEach(item => {
        const inputs = item.querySelectorAll('input, select');
        const education = {};
        inputs.forEach(input => {
            education[input.name] = input.value;
        });
        if (education.school) {
            formData.education.push(education);
        }
    });

    // 경력사항 수집
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach(item => {
        const inputs = item.querySelectorAll('input, select');
        const experience = {};
        inputs.forEach(input => {
            experience[input.name] = input.value;
        });

        // Rich Text Editor에서 jobDescription과 performance 수집
        const richEditors = item.querySelectorAll('.rich-editor');
        if (richEditors.length >= 1) {
            experience.jobDescription = getRichEditorContent(richEditors[0]); // 주요업무
        }
        if (richEditors.length >= 2) {
            experience.performance = getRichEditorContent(richEditors[1]); // 성과영역
        }

        if (experience.company) {
            formData.experience.push(experience);
        }
    });

    console.log('✅ 폼 데이터 수집 완료');
    return formData;

    } catch (error) {
        console.error('❌ 폼 데이터 수집 중 오류:', error);
        console.error('오류 스택:', error.stack);

        // 기본 데이터 반환
        return {
            basic: {
                name: '',
                email: '',
                phone: '',
                address: '',
                birth: '',
                gender: '',
                jobTitle: '',
                driverLicense: '',
                hobby: '',
                experienceType: '',
                github: '',
                resumeSummary: '',
                keyProjects: ''
            },
            education: [],
            experience: [],
            portfolio: [],
            training: [],
            skills: { frontend: '', backend: '', database: '', ai: '', other: '', all: '' },
            introductions: [],
            additionalInfo: ''
        };
    }
}

// 기술스택 데이터 수집 함수
function collectSkillsData() {
    try {
        console.log('🔧 기술스택 데이터 수집 시작...');

        const frontendSkills = getRichEditorContent(document.querySelector('#frontendSkills')) || '';
        const backendSkills = getRichEditorContent(document.querySelector('#backendSkills')) || '';
        const databaseSkills = getRichEditorContent(document.querySelector('#databaseSkills')) || '';
        const aiSkills = getRichEditorContent(document.querySelector('#aiSkills')) || '';
        const otherSkills = getRichEditorContent(document.querySelector('#otherSkills')) || '';

        // 카테고리별로 분리된 데이터 반환
        const skillsData = {
            frontend: frontendSkills,
            backend: backendSkills,
            database: databaseSkills,
            ai: aiSkills,
            other: otherSkills,
            // 호환성을 위한 전체 문자열도 포함
            all: [frontendSkills, backendSkills, databaseSkills, aiSkills, otherSkills]
                .filter(skills => skills && skills.trim() !== '')
                .join(', ')
        };

        console.log('✅ 기술스택 데이터 수집 완료:', skillsData);
        return skillsData;

    } catch (error) {
        console.error('❌ 기술스택 데이터 수집 중 오류:', error);
        return {
            frontend: '',
            backend: '',
            database: '',
            ai: '',
            other: '',
            all: ''
        };
    }
}

// 기술스택 데이터 복원 함수
function restoreSkillsData(skillsData) {
    console.log('🔧 기술스택 복원 중...');

    // 새로운 데이터 구조인 경우
    if (typeof skillsData === 'object' && skillsData !== null) {
        console.log('📝 새로운 데이터 구조로 복원:', skillsData);

        try {
            setRichEditorContent(document.querySelector('#frontendSkills'), skillsData.frontend || '');
            console.log('✅ Frontend Skills 복원 완료');
        } catch (error) {
            console.log('❌ Frontend Skills 복원 실패:', error);
        }

        try {
            setRichEditorContent(document.querySelector('#backendSkills'), skillsData.backend || '');
            console.log('✅ Backend Skills 복원 완료');
        } catch (error) {
            console.log('❌ Backend Skills 복원 실패:', error);
        }

        try {
            setRichEditorContent(document.querySelector('#databaseSkills'), skillsData.database || '');
            console.log('✅ Database Skills 복원 완료');
        } catch (error) {
            console.log('❌ Database Skills 복원 실패:', error);
        }

        try {
            setRichEditorContent(document.querySelector('#aiSkills'), skillsData.ai || '');
            console.log('✅ AI Skills 복원 완료');
        } catch (error) {
            console.log('❌ AI Skills 복원 실패:', error);
        }

        try {
            setRichEditorContent(document.querySelector('#otherSkills'), skillsData.other || '');
            console.log('✅ Other Skills 복원 완료');
        } catch (error) {
            console.log('❌ Other Skills 복원 실패:', error);
        }
    } else {
        // 기존 문자열 형태인 경우 (호환성)
        console.log('📝 기존 문자열 형태로 복원:', skillsData);
        const skillsList = skillsData.split(',').map(skill => skill.trim()).filter(skill => skill);

        // 각 카테고리별로 기술 분류
        const frontendSkills = [];
        const backendSkills = [];
        const databaseSkills = [];
        const aiSkills = [];
        const otherSkills = [];

        skillsList.forEach(skill => {
            const skillLower = skill.toLowerCase();
            const skillParts = skillLower.replace(/[()]/g, ' ').split(/\s+/).filter(part => part.length > 0);

            let categorized = false;

            for (const part of skillParts) {
                if (['html', 'css', 'javascript', 'react', 'vue', 'angular', 'jquery', 'bootstrap', 'sass', 'less', 'typescript', 'flutter', 'next.js', 'nuxt.js', 'gatsby', 'webpack', 'vite', 'tailwind', 'styled-components', 'material-ui', 'antd', 'chakra-ui'].includes(part)) {
                    frontendSkills.push(skill);
                    categorized = true;
                    break;
                } else if (['node.js', 'nodejs', 'python', 'java', 'php', 'c#', 'c++', 'go', 'ruby', 'django', 'express', 'spring', 'springboot', 'fastapi', 'flask', 'laravel', 'asp.net', 'dotnet', 'kotlin', 'scala', 'rust', 'elixir', 'nestjs', 'koa', 'hapi', 'adonis', 'strapi', 'graphql', 'rest', 'api', 'microservices', 'serverless', 'lambda', 'azure functions', 'google cloud functions'].includes(part)) {
                    backendSkills.push(skill);
                    categorized = true;
                    break;
                } else if (['mysql', 'postgresql', 'mongodb', 'redis', 'sqlite', 'oracle', 'sql server', 'firebase', 'firestore', 'dynamodb', 'cassandra', 'neo4j', 'elasticsearch', 'influxdb', 'couchdb', 'mariadb', 'cockroachdb', 'timescaledb', 'supabase', 'planetscale'].includes(part)) {
                    databaseSkills.push(skill);
                    categorized = true;
                    break;
                } else if (['openai', 'gpt', 'gemini', 'tensorflow', 'pytorch', 'scikit-learn', 'sklearn', 'keras', 'pandas', 'numpy', 'matplotlib', 'seaborn', 'plotly', 'jupyter', 'colab', 'huggingface', 'transformers', 'bert', 'gpt-3', 'gpt-4', 'claude', 'langchain', 'llama', 'stable diffusion', 'midjourney', 'dalle', 'chatgpt', 'bard', 'copilot', 'github copilot', 'mlflow', 'kubeflow', 'airflow', 'spark', 'hadoop', 'kafka', 'flink'].includes(part)) {
                    aiSkills.push(skill);
                    categorized = true;
                    break;
                }
            }

            if (!categorized) {
                otherSkills.push(skill);
            }
        });

        try {
            setRichEditorContent(document.querySelector('#frontendSkills'), frontendSkills.join(', '));
            setRichEditorContent(document.querySelector('#backendSkills'), backendSkills.join(', '));
            setRichEditorContent(document.querySelector('#databaseSkills'), databaseSkills.join(', '));
            setRichEditorContent(document.querySelector('#aiSkills'), aiSkills.join(', '));
            setRichEditorContent(document.querySelector('#otherSkills'), otherSkills.join(', '));
            console.log('✅ 기존 형태 기술스택 복원 완료');
        } catch (error) {
            console.log('❌ 기존 형태 기술스택 복원 실패:', error);
        }
    }
}

// 폼 데이터 복원 함수
function restoreFormData(formData) {
    console.log('🔄 폼 데이터 복원 시작...');
    console.log('📝 복원할 데이터:', formData);

    // 기본 정보 복원
    if (formData.basic) {
        console.log('📋 기본 정보 복원 중...');
        Object.keys(formData.basic).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.value = formData.basic[key] || '';
                console.log(`✅ ${key} 복원 완료:`, formData.basic[key]);
            } else {
                console.log(`⚠️ ${key} 요소를 찾을 수 없음`);
            }
        });

        // resumeSummary는 Rich Text Editor로 복원
        if (formData.basic.resumeSummary) {
            console.log('📝 resumeSummary Rich Text Editor 복원 중...');
            const resumeSummaryElement = document.querySelector('#resumeSummary');
            if (resumeSummaryElement) {
                setRichEditorContent(resumeSummaryElement, formData.basic.resumeSummary);
                console.log('✅ resumeSummary 복원 완료');
            } else {
                console.log('❌ resumeSummary Rich Text Editor를 찾을 수 없음');
            }
        }



        // keyProjects는 Rich Text Editor로 복원
        if (formData.basic.keyProjects) {
            console.log('📝 keyProjects Rich Text Editor 복원 중...');
            const keyProjectsElement = document.querySelector('[name="keyProjects"]');
            if (keyProjectsElement) {
                setRichEditorContent(keyProjectsElement, formData.basic.keyProjects);
                console.log('✅ keyProjects 복원 완료');
            } else {
                console.log('❌ keyProjects Rich Text Editor를 찾을 수 없음');
            }
        }
    }

    // 기술스택 복원
    if (formData.skills) {
        restoreSkillsData(formData.skills);
    }

    // 자기소개 복원
    restoreDynamicItems('introductionContainer', 'introduction-item', formData.introductions || []);

    // 기타사항 복원
            if (formData.additionalInfo) {
            const additionalElement = document.querySelector('#additionalInfo');
            if (additionalElement) {
                setRichEditorContent(additionalElement, formData.additionalInfo);
            }
        }

    // 동적 항목들 복원
    restoreDynamicItems('portfolioContainer', 'portfolio-item', formData.portfolio || []);
    restoreDynamicItems('educationContainer', 'education-item', formData.education || []);
    restoreDynamicItems('experienceContainer', 'experience-item', formData.experience || []);
    restoreDynamicItems('trainingContainer', 'training-item', formData.training || []);

}

// 동적 항목 복원 함수
function restoreDynamicItems(containerId, itemClass, items) {
    const container = document.getElementById(containerId);
    if (!container || !items.length) return;

    // 기존 항목들 제거 (첫 번째 항목 제외)
    const existingItems = container.querySelectorAll(`.${itemClass}`);
    for (let i = 1; i < existingItems.length; i++) {
        existingItems[i].remove();
    }

    // 첫 번째 항목 데이터 복원
    if (existingItems[0] && items[0]) {
        restoreItemData(existingItems[0], items[0]);
    }

    // 추가 항목들 생성 및 복원
    for (let i = 1; i < items.length; i++) {
        const item = items[i];

        // 해당하는 추가 함수 호출
        switch (containerId) {
            case 'portfolioContainer':
                addPortfolio();
                break;
            case 'educationContainer':
                addEducation();
                break;
            case 'experienceContainer':
                addExperience();
                break;
            case 'trainingContainer':
                addTraining();
                break;

            case 'introductionContainer':
                addIntroduction();
                break;
        }

        // 새로 생성된 항목에 데이터 복원
        const newItems = container.querySelectorAll(`.${itemClass}`);
        const newItem = newItems[newItems.length - 1];
        if (newItem) {
            restoreItemData(newItem, item);
        }
    }
}

// 개별 항목 데이터 복원 함수
function restoreItemData(itemElement, itemData) {
    console.log('🔄 개별 항목 데이터 복원 시작...');
    console.log('📝 복원할 항목 데이터:', itemData);

    const inputs = itemElement.querySelectorAll('input, select');

    // 일반 입력 필드 복원
    inputs.forEach(input => {
        if (itemData[input.name] !== undefined) {
            input.value = itemData[input.name] || '';
            console.log(`✅ ${input.name} 복원 완료:`, itemData[input.name]);

            // 포트폴리오 타입이 복원되면 토글 함수 호출
            if (input.name === 'portfolioType' && input.value === '단체') {
                togglePortfolioTeamFields(input);
            }
        }
    });

    // Rich Text Editor 복원
    const richEditors = itemElement.querySelectorAll('.rich-editor');
    console.log(`🔍 발견된 Rich Text Editor 개수: ${richEditors.length}`);

    richEditors.forEach((editor, index) => {
        console.log(`📝 Rich Text Editor ${index + 1} 복원 중...`);

        // 경력사항의 경우: 첫 번째는 jobDescription, 두 번째는 performance
        if (itemData.jobDescription !== undefined && index === 0) {
            setRichEditorContent(editor, itemData.jobDescription || '');
            console.log('✅ jobDescription 복원 완료');
        }
        else if (itemData.performance !== undefined && index === 1) {
            setRichEditorContent(editor, itemData.performance || '');
            console.log('✅ performance 복원 완료');
        }
        // portfolioDescription 처리
        else if (itemData.portfolioDescription !== undefined) {
            setRichEditorContent(editor, itemData.portfolioDescription || '');
            console.log('✅ portfolioDescription 복원 완료');
        }
        // trainingContent도 처리
        else if (itemData.trainingContent !== undefined) {
            setRichEditorContent(editor, itemData.trainingContent || '');
            console.log('✅ trainingContent 복원 완료');
        }
        // introContent도 처리
        else if (itemData.introContent !== undefined) {
            setRichEditorContent(editor, itemData.introContent || '');
            console.log('✅ introContent 복원 완료');
        }
        else {
            console.log('⚠️ 해당하는 데이터 필드를 찾을 수 없음');
        }
    });
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

// PDF 다운로드
async function downloadPDF() {
    try {
        console.log('📄 PDF 다운로드 시작');

        const formData = collectFormData();
        console.log('📋 폼 데이터 수집 완료:', formData);

        // 필수 필드 검증
        if (!formData.basic.name || !formData.basic.email || !formData.basic.phone) {
            alert('필수 항목(이름, 이메일, 연락처)을 모두 입력해주세요.');
            return;
        }

        // 로딩 표시
        showToast('PDF 생성 중입니다...', 'info');

        // 먼저 미리보기 생성
        const resumeHTML = generateResumeHTML(formData);
        const resumeContent = document.getElementById('resumeContent');
        resumeContent.innerHTML = resumeHTML;

        // 미리보기 모달 표시 (숨겨진 상태로)
        const modal = document.getElementById('resumePreview');
        modal.classList.remove('hidden');
        modal.style.display = 'block';
        modal.style.position = 'absolute';
        modal.style.left = '-9999px';
        modal.style.top = '0';

        try {
            // HTML 페이지 브레이크를 활용한 PDF 생성
            console.log('🖼️ html2canvas로 이미지 변환 시작');
            const canvas = await html2canvas(resumeContent, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                scrollX: 0,
                scrollY: 0,
                windowWidth: 794, // A4 너비 (210mm * 3.779528)
                windowHeight: 1123 // A4 높이 (297mm * 3.779528)
            });

            console.log('🖼️ 이미지 변환 완료, PDF 생성 시작');

            // jsPDF를 사용하여 PDF 생성
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');

            // 캔버스를 이미지로 변환
            const imgData = canvas.toDataURL('image/jpeg', 0.95);

            // PDF에 이미지 추가 (여백 포함)
            const marginX = 10; // 좌우 여백 (mm)
            const marginY = 10; // 상하 여백 (mm)
            const imgWidth = 210; // A4 전체 너비
            const pageHeight = 297; // A4 전체 높이
            const usableWidth = imgWidth - marginX * 2;
            const usableHeight = pageHeight - marginY * 2;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            console.log('📏 이미지 크기 정보:', {
                canvasWidth: canvas.width,
                canvasHeight: canvas.height,
                imgWidth: imgWidth,
                imgHeight: imgHeight,
                pageHeight: pageHeight
            });

            // 여백 설정
            const marginTop = 10;   // 위 여백 (mm) - 5에서 10으로 늘림
            const marginBottom = 10; // 아래 여백 (mm)
            const pageUsableHeight = pageHeight - marginTop - marginBottom;

            // 페이지별로 이미지 분할하여 추가 (페이지 브레이크 자동 적용)
            const totalPages = Math.ceil(imgHeight / pageUsableHeight);
            console.log('📄 총 페이지 수:', totalPages);

            for (let page = 0; page < totalPages; page++) {
                if (page > 0) pdf.addPage();

                // 페이지 간 오버랩을 위한 버퍼 (자연스러운 연결)
                const overlapBuffer = 20; // 20px 오버랩

                // 잘라낼 영역(px 단위) - 오버랩 적용
                let sourceY = page * pageUsableHeight * (canvas.height / imgHeight);
                let sourceHeight = Math.min(canvas.height - sourceY, pageUsableHeight * (canvas.height / imgHeight));

                // 첫 페이지가 아닌 경우 위쪽 오버랩 추가
                if (page > 0) {
                    sourceY -= overlapBuffer;
                    sourceHeight += overlapBuffer;
                }

                // 마지막 페이지가 아닌 경우 아래쪽 오버랩 추가
                if (page < totalPages - 1) {
                    sourceHeight += overlapBuffer;
                }

                // 임시 캔버스에 잘라내기
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = canvas.width;
                tempCanvas.height = sourceHeight;
                const tempCtx = tempCanvas.getContext('2d');
                tempCtx.drawImage(
                    canvas,
                    0, sourceY, canvas.width, sourceHeight,
                    0, 0, canvas.width, sourceHeight
                );

                // mm 변환
                const scale = imgWidth / canvas.width;
                const sliceHeight = sourceHeight * scale;

                // 첫 페이지만 상단 여백 0, 나머지는 기존 여백 적용
                const currentMarginTop = page === 0 ? 0 : marginTop;

                // PDF에 추가
                pdf.addImage(
                    tempCanvas.toDataURL('image/jpeg', 0.95),
                    'JPEG',
                    0,               // 좌측 여백
                    currentMarginTop, // 첫 페이지는 0, 나머지는 marginTop
                    imgWidth,        // 가로는 꽉 채우기
                    sliceHeight      // 실제 잘린 만큼만 넣기
                );
            }

            // PDF 다운로드
            pdf.save(`${formData.basic.name}_이력서.pdf`);

            console.log('✅ PDF 다운로드 완료');
            showToast('PDF 다운로드가 완료되었습니다!', 'success');

        } catch (error) {
            console.error('PDF 생성 중 오류:', error);

            // html2canvas 실패 시 html2pdf 시도
            console.log('🔄 html2pdf로 재시도');
            try {
                await generatePDFWithHtml2Pdf(formData);
            } catch (html2pdfError) {
                console.error('html2pdf도 실패:', html2pdfError);
                showToast('PDF 생성에 실패했습니다. 다시 시도해주세요.', 'error');
            }
        } finally {
            // 미리보기 모달 원래 상태로 복원
            modal.style.display = 'none';
            modal.style.position = '';
            modal.style.left = '';
            modal.style.top = '';
            modal.classList.remove('hidden');
        }

    } catch (error) {
        console.error('PDF 생성 중 오류:', error);
        showToast('PDF 생성 중 오류가 발생했습니다. 다시 시도해주세요.', 'error');
    }
}

// 가장 기본적인 PDF 생성 방법
async function generateBasicPDF(formData) {
    // html2pdf 라이브러리가 로드되었는지 확인
    if (typeof html2pdf === 'undefined') {
        throw new Error('html2pdf 라이브러리가 로드되지 않았습니다.');
    }

    const resumeHTML = generateResumeHTML(formData);

    // 임시 div 생성
    const tempDiv = document.createElement('div');
    tempDiv.className = 'resume-content';
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '0';
    tempDiv.style.width = '210mm';
    tempDiv.style.height = 'auto';
    tempDiv.style.backgroundColor = 'white';
    tempDiv.style.padding = '0';
    tempDiv.style.margin = '0';
    tempDiv.innerHTML = resumeHTML;
    document.body.appendChild(tempDiv);

    try {
        // 가장 기본적인 옵션으로 PDF 생성
        await html2pdf()
            .from(tempDiv)
            .set({
                margin: 10,
                filename: `${formData.basic.name}_이력서.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            })
            .save();

        showToast('PDF 다운로드가 완료되었습니다!', 'success');

    } finally {
        // 임시 div 제거
        if (tempDiv.parentNode) {
            document.body.removeChild(tempDiv);
        }
    }
}

// 간단한 PDF 생성 방법 (직접 html2pdf 사용)
async function generateSimplePDF(formData) {
    // html2pdf 라이브러리가 로드되었는지 확인
    if (typeof html2pdf === 'undefined') {
        throw new Error('html2pdf 라이브러리가 로드되지 않았습니다.');
    }

    const resumeHTML = generateResumeHTML(formData);

    // 임시 div 생성
    const tempDiv = document.createElement('div');
    tempDiv.className = 'resume-content';
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '0';
    tempDiv.style.width = '210mm';
    tempDiv.style.height = 'auto';
    tempDiv.style.backgroundColor = 'white';
    tempDiv.style.padding = '0';
    tempDiv.style.margin = '0';
    tempDiv.innerHTML = resumeHTML;
    document.body.appendChild(tempDiv);

    try {
        // html2pdf 옵션 설정
        const opt = {
            margin: [10, 10, 10, 10],
            filename: `${formData.basic.name}_이력서.pdf`,
            image: {
                type: 'jpeg',
                quality: 0.98
            },
            html2canvas: {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                letterRendering: true
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait'
            }
        };

        // PDF 생성 및 다운로드
        await html2pdf().set(opt).from(tempDiv).save();
        showToast('PDF 다운로드가 완료되었습니다!', 'success');

    } finally {
        // 임시 div 제거
        if (tempDiv.parentNode) {
            document.body.removeChild(tempDiv);
        }
    }
}

// html2pdf를 사용한 PDF 생성 (백업 방법)
async function generatePDFWithHtml2Pdf(formData) {
    const resumeHTML = generateResumeHTML(formData);

    // 임시 div 생성
    const tempDiv = document.createElement('div');
    tempDiv.className = 'resume-content';
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '0';
    tempDiv.style.width = '210mm'; // A4 너비
    tempDiv.style.height = 'auto';
    tempDiv.style.backgroundColor = 'white';
    tempDiv.style.padding = '0';
    tempDiv.style.margin = '0';
    tempDiv.innerHTML = resumeHTML;
    document.body.appendChild(tempDiv);

    try {
        // html2pdf 옵션 설정
        const opt = {
            margin: [0, 0, 0, 0], // 여백 완전 제거
            filename: `${formData.basic.name}_이력서.pdf`,
            image: {
                type: 'jpeg',
                quality: 0.95
            },
            html2canvas: {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                letterRendering: true,
                width: 794, // A4 너비 (210mm * 3.779528)
                height: 1123 // A4 높이 (297mm * 3.779528)
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait',
                compress: true
            }
        };

        // 디버깅: 옵션 로그 출력
        console.log('=== PDF 디버깅 정보 ===');
        console.log('PDF 생성 옵션:', opt);
        console.log('임시 div 스타일:', {
            width: tempDiv.style.width,
            padding: tempDiv.style.padding,
            margin: tempDiv.style.margin,
            boxSizing: tempDiv.style.boxSizing
        });
        console.log('임시 div 크기:', {
            offsetWidth: tempDiv.offsetWidth,
            offsetHeight: tempDiv.offsetHeight,
            scrollWidth: tempDiv.scrollWidth,
            scrollHeight: tempDiv.scrollHeight
        });
        console.log('========================');

        // PDF 생성 및 다운로드
        await html2pdf().set(opt).from(tempDiv).save();
        showToast('PDF 다운로드가 완료되었습니다!', 'success');

    } finally {
        // 임시 div 제거
        if (tempDiv.parentNode) {
            document.body.removeChild(tempDiv);
        }
    }
}

// 대안적인 PDF 생성 방법 (html2canvas + jsPDF)
async function generatePDFWithAlternative(formData) {
    const resumeHTML = generateResumeHTML(formData);

    // 임시 div 생성
    const tempDiv = document.createElement('div');
    tempDiv.className = 'resume-content';
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '0';
    tempDiv.style.width = '794px'; // A4 너비 (210mm * 3.779528)
    tempDiv.style.height = 'auto';
    tempDiv.style.backgroundColor = 'white';
    tempDiv.style.padding = '20px';
    tempDiv.style.margin = '0';
    tempDiv.style.fontSize = '12px';
    tempDiv.style.lineHeight = '1.4';
    tempDiv.innerHTML = resumeHTML;
    document.body.appendChild(tempDiv);

    try {
        // html2canvas로 캡처
        const canvas = await html2canvas(tempDiv, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            width: 794,
            height: tempDiv.scrollHeight
        });

        // jsPDF로 PDF 생성
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');

        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        // 디버깅: PDF 정보 로그
        console.log('=== 대안 PDF 디버깅 정보 ===');
        console.log('Canvas 크기:', { width: canvas.width, height: canvas.height });
        console.log('PDF 크기:', { width: pdfWidth, height: pdfHeight });
        console.log('이미지 크기:', { width: imgWidth, height: imgHeight });
        console.log('좌표:', { x: 0, y: 0 });
        console.log('================================');

        // 첫 페이지 추가 (여백 제거)
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        // 추가 페이지가 필요한 경우
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
        }

        // PDF 다운로드
        pdf.save(`${formData.basic.name}_이력서.pdf`);
        showToast('PDF 다운로드가 완료되었습니다!', 'success');

    } finally {
        // 임시 div 제거
        if (tempDiv.parentNode) {
            document.body.removeChild(tempDiv);
        }
    }
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
                <label>연수기관</label>
                <input type="text" name="trainingInstitution" placeholder="예: 이젠컴퓨터학원">
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

// 내보내기 기능
function exportData() {
    try {
        const formData = collectFormData();
        const exportData = {
            formData: formData,
            photoData: photoData,
            timestamp: new Date().toISOString(),
            version: '1.0',
            name: formData.basic.name || '무제'
        };

        // JSON 파일로 다운로드
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `${exportData.name}_이력서_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        showToast('데이터가 성공적으로 내보내졌습니다!', 'success');
    } catch (error) {
        console.error('내보내기 중 오류:', error);
        showToast('내보내기 중 오류가 발생했습니다.', 'error');
    }
}

// 가져오기 기능
function importData() {
    try {
        // 파일 입력 요소 생성
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.json';
        fileInput.style.display = 'none';

        fileInput.onchange = function(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const importData = JSON.parse(e.target.result);

                    // 버전 호환성 확인
                    if (!importData.formData) {
                        showToast('지원하지 않는 파일 형식입니다.', 'error');
                        return;
                    }

                    // 사용자 확인
                    const confirmImport = confirm(`"${importData.name || '가져온 데이터'}"를 불러오시겠습니까?\n현재 입력된 내용이 덮어써집니다.`);
                    if (!confirmImport) return;

                    // 폼 데이터 복원
                    restoreFormData(importData.formData);

                    // 사진 데이터 복원
                    if (importData.photoData) {
                        photoData = importData.photoData;
                        const photoPreview = document.getElementById('photoPreview');
                        photoPreview.innerHTML = `<img src="${photoData}" alt="프로필 사진">`;
                    }

                    // localStorage에도 저장
                    const draftData = {
                        formData: importData.formData,
                        photoData: importData.photoData,
                        timestamp: new Date().toISOString(),
                        name: importData.name || '가져온 데이터'
                    };
                    localStorage.setItem('resumeDraft', JSON.stringify(draftData));

                    showToast('데이터를 성공적으로 가져왔습니다!', 'success');

                } catch (error) {
                    console.error('파일 파싱 중 오류:', error);
                    showToast('파일 형식이 올바르지 않습니다.', 'error');
                }
            };

            reader.readAsText(file);
        };

        document.body.appendChild(fileInput);
        fileInput.click();
        document.body.removeChild(fileInput);

    } catch (error) {
        console.error('가져오기 중 오류:', error);
        showToast('가져오기 중 오류가 발생했습니다.', 'error');
    }
}

// 이력서 하이라이트 추출 및 표시
function extractResumeHighlights() {
    try {
        const savedDraft = localStorage.getItem('resumeDraft');
        if (!savedDraft) {
            showToast('저장된 이력서 데이터가 없습니다.', 'info');
            return;
        }

        const draftData = JSON.parse(savedDraft);
        const formData = draftData.formData;

        const highlights = [];

        // 1. 기본 정보 하이라이트
        if (formData.basic.name) {
            highlights.push(`👤 ${formData.basic.name} - ${formData.basic.jobTitle || 'AI 개발자'}`);
        }

        if (formData.basic.github) {
            highlights.push(`📂 GitHub: ${formData.basic.github}`);
        }

        // 2. 학력 하이라이트
        if (formData.education && formData.education.length > 0) {
            const latestEducation = formData.education[0];
            if (latestEducation.school) {
                const educationText = `${latestEducation.school} (${latestEducation.major || ''}) ${latestEducation.graduationType || ''}`;
                highlights.push(`🎓 ${educationText}`);
            }
        }

        // 3. 경력 하이라이트
        if (formData.experience && formData.experience.length > 0) {
            const latestExperience = formData.experience[0];
            if (latestExperience.company) {
                const experienceText = `${latestExperience.company} - ${latestExperience.position || ''} (${latestExperience.startDate || ''} ~ ${latestExperience.endDate || '현재'})`;
                highlights.push(`💼 ${experienceText}`);
            }
        }

        // 4. 기술스택 하이라이트
        if (formData.skills && formData.skills.trim() !== '') {
            const skillsList = formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill);
            const skillCategories = {
                'Frontend': [],
                'Backend': [],
                'Database': [],
                'AI Model': [],
                'Tools & Others': []
            };

            skillsList.forEach(skill => {
                const skillLower = skill.toLowerCase();

                // 복합 기술 분해 (예: JAVA(SpringBoot) -> java, springboot)
                const skillParts = skillLower.replace(/[()]/g, ' ').split(/\s+/).filter(part => part.length > 0);

                let categorized = false;

                // 각 부분에 대해 분류 확인
                for (const part of skillParts) {
                    // Frontend 분류
                    if (['html', 'css', 'javascript', 'react', 'vue', 'angular', 'jquery', 'bootstrap', 'sass', 'less', 'typescript', 'flutter', 'next.js', 'nuxt.js', 'gatsby', 'webpack', 'vite', 'tailwind', 'styled-components', 'material-ui', 'antd', 'chakra-ui'].includes(part)) {
                        skillCategories['Frontend'].push(skill);
                        categorized = true;
                        break;
                    }
                    // Backend 분류
                    else if (['node.js', 'nodejs', 'python', 'java', 'php', 'c#', 'c++', 'go', 'ruby', 'django', 'express', 'spring', 'springboot', 'fastapi', 'flask', 'laravel', 'asp.net', 'dotnet', 'kotlin', 'scala', 'rust', 'elixir', 'nestjs', 'koa', 'hapi', 'adonis', 'strapi', 'graphql', 'rest', 'api', 'microservices', 'serverless', 'lambda', 'azure functions', 'google cloud functions'].includes(part)) {
                        skillCategories['Backend'].push(skill);
                        categorized = true;
                        break;
                    }
                    // Database 분류
                    else if (['mysql', 'postgresql', 'mongodb', 'redis', 'sqlite', 'oracle', 'sql server', 'firebase', 'firestore', 'dynamodb', 'cassandra', 'neo4j', 'elasticsearch', 'influxdb', 'couchdb', 'mariadb', 'cockroachdb', 'timescaledb', 'supabase', 'planetscale'].includes(part)) {
                        skillCategories['Database'].push(skill);
                        categorized = true;
                        break;
                    }
                    // AI/ML 분류
                    else if (['openai', 'gpt', 'gemini', 'tensorflow', 'pytorch', 'scikit-learn', 'sklearn', 'keras', 'pandas', 'numpy', 'matplotlib', 'seaborn', 'plotly', 'jupyter', 'colab', 'huggingface', 'transformers', 'bert', 'gpt-3', 'gpt-4', 'claude', 'langchain', 'llama', 'stable diffusion', 'midjourney', 'dalle', 'chatgpt', 'bard', 'copilot', 'github copilot', 'mlflow', 'kubeflow', 'airflow', 'spark', 'hadoop', 'kafka', 'flink'].includes(part)) {
                        skillCategories['AI Model'].push(skill);
                        categorized = true;
                        break;
                    }
                }

                // 분류되지 않은 경우 기타로 분류
                if (!categorized) {
                    skillCategories['Tools & Others'].push(skill);
                }
            });

            const topSkills = [];
            Object.entries(skillCategories).forEach(([category, skills]) => {
                if (skills.length > 0) {
                    topSkills.push(`${category}: ${skills.slice(0, 3).join(', ')}${skills.length > 3 ? '...' : ''}`);
                }
            });

            if (topSkills.length > 0) {
                highlights.push(`🛠️ 기술스택: ${topSkills.join(' | ')}`);
            }
        }



        // 6. 이력서 요약 하이라이트
        if (formData.basic.resumeSummary) {
            const summaryLines = formData.basic.resumeSummary.split('\n').filter(line => line.trim());
            if (summaryLines.length > 0) {
                highlights.push(`📝 요약: ${summaryLines[0].substring(0, 50)}${summaryLines[0].length > 50 ? '...' : ''}`);
            }
        }

        // 하이라이트 표시
        if (highlights.length > 0) {
            const highlightText = highlights.slice(0, 6).join('\n\n');
            alert(`📋 이력서 하이라이트 (${highlights.length}개)\n\n${highlightText}`);
        } else {
            showToast('추출할 하이라이트가 없습니다.', 'info');
        }

    } catch (error) {
        console.error('하이라이트 추출 중 오류:', error);
        showToast('하이라이트 추출 중 오류가 발생했습니다.', 'error');
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

// 이력서 HTML 생성
function generateResumeHTML(data) {
    // skills가 객체인지 문자열인지 확인하여 처리
    let skillsList = [];
    if (data.skills) {
        if (typeof data.skills === 'string') {
            // 기존 문자열 형태 (호환성)
            skillsList = data.skills.split(',').map(skill => skill.trim()).filter(skill => skill);
        } else if (typeof data.skills === 'object' && data.skills.all) {
            // 새로운 객체 형태
            skillsList = data.skills.all.split(',').map(skill => skill.trim()).filter(skill => skill);
        }
    }

    // 첫 번째 페이지 (좌측: 연락처/하이라이트/기술스택, 우측: 요약 대시보드)
    const firstPage = `
        <div class="resume-page first-page">
            <div class="resume-header">
                <div class="resume-info-left">
                    <div class="resume-photo">
                        ${photoData ? `<img src="${photoData}" alt="프로필 사진">` : `
                            <div class="resume-photo-placeholder">
                                (사진)
                            </div>
                        `}
                    </div>
                    <div class="resume-info-right">
                        <h1>${data.basic.name || '홍길동'}</h1>
                        <div class="job-title">${data.basic.jobTitle || 'AI 개발자'}</div>
                        ${data.basic.github ? `<div class="github-link">📂 <a href="${data.basic.github}" target="_blank">${data.basic.github}</a></div>` : ''}
                    </div>
                </div>
            </div>

            <div class="resume-body">
                <div class="resume-left-column">
                    <div class="resume-section">
                        <h2>Contact</h2>
                        <div class="contact-info">
                            <div class="contact-details">
                                ${data.basic.phone ? `<span>📱 ${data.basic.phone}</span>` : '<span>📱 010-0000-0000</span>'}
                                ${data.basic.email ? `<span>📧 ${data.basic.email}</span>` : '<span>📧 gildong@incruit.com</span>'}
                                ${data.basic.address ? `<span>🏠 ${data.basic.address}</span>` : '<span>🏠 서울시 종로구 북촌로</span>'}
                            </div>
                        </div>
                    </div>

                    ${data.basic.resumeSummary ? `
                    <div class="resume-section">
                        <h2>Highlights</h2>
                        <div class="resume-summary">
                            ${data.basic.resumeSummary}
                        </div>
                    </div>
                    ` : ''}

                    ${data.skills && (data.skills.frontend || data.skills.backend || data.skills.database || data.skills.ai || data.skills.other) ? `
                    <div class="resume-section">
                        <h2>Technical Skills</h2>
                        <div class="skills-categories">
                            ${data.skills.frontend ? `
                            <div class="skill-category">
                                <h3>Frontend</h3>
                                <div class="skill-tags">
                                    ${data.skills.frontend.split(',').map(skill => skill.trim()).filter(skill => skill).map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                                </div>
                            </div>
                            ` : ''}
                            ${data.skills.backend ? `
                            <div class="skill-category">
                                <h3>Backend</h3>
                                <div class="skill-tags">
                                    ${data.skills.backend.split(',').map(skill => skill.trim()).filter(skill => skill).map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                                </div>
                            </div>
                            ` : ''}
                            ${data.skills.database ? `
                            <div class="skill-category">
                                <h3>Database</h3>
                                <div class="skill-tags">
                                    ${data.skills.database.split(',').map(skill => skill.trim()).filter(skill => skill).map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                                </div>
                            </div>
                            ` : ''}
                            ${data.skills.ai ? `
                            <div class="skill-category">
                                <h3>AI/ML</h3>
                                <div class="skill-tags">
                                    ${data.skills.ai.split(',').map(skill => skill.trim()).filter(skill => skill).map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                                </div>
                            </div>
                            ` : ''}
                            ${data.skills.other ? `
                            <div class="skill-category">
                                <h3>Tools & Others</h3>
                                <div class="skill-tags">
                                    ${data.skills.other.split(',').map(skill => skill.trim()).filter(skill => skill).map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                                </div>
                            </div>
                            ` : ''}
                        </div>
                    </div>
                    ` : ''}
                </div>

                <div class="resume-right-column">


                    ${data.basic.keyProjects ? `
                    <div class="resume-section">
                        <h2>Key Projects</h2>
                        <div class="key-projects-content">
                            ${data.basic.keyProjects}
                        </div>
                    </div>
                    ` : ''}

                    ${data.experience && data.experience.length > 0 ? `
                    <div class="resume-section">
                        <h2>Experience</h2>
                        ${data.experience.map(exp => `
                            <div class="experience-item-resume">
                                <div class="item-header">
                                    <div class="year">${formatYearRange(exp.startDate, exp.endDate, exp.employmentStatus)}</div>
                                    <div class="content">
                                        <h4>${exp.company}</h4>
                                        <div class="period">${exp.position || ''}${exp.industry ? ` | ${exp.industry}` : ''}</div>
                                        ${exp.jobDescription ? `<div class="job-description">${exp.jobDescription}</div>` : ''}
                                        ${exp.performance ? `<div class="performance-description">${exp.performance}</div>` : ''}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    ` : ''}

                    ${data.education.length > 0 ? `
                    <div class="resume-section">
                        <h2>Education</h2>
                        ${data.education.map(edu => `
                            <div class="education-summary-item">
                                <div class="edu-header">
                                    <h4>${edu.school}</h4>
                                    <span class="edu-period">${formatYearRange(edu.startDate, edu.endDate)}</span>
                                </div>
                                <div class="edu-major">${edu.major ? `(${edu.major})` : ''} ${edu.graduationType || ''}</div>
                            </div>
                        `).join('')}
                    </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;

    // 두 번째 페이지 (포트폴리오, 자기소개서, 프로젝트 상세)
    const secondPage = `
        <div class="resume-page second-page">
            <div class="resume-body">
                ${data.portfolio && data.portfolio.length > 0 ? `
                <div class="resume-section">
                    <h2>Projects</h2>

                    ${(() => {
                        // 개인 프로젝트와 단체 프로젝트 분리
                        const personalProjects = data.portfolio.filter(p => p.portfolioType === '개인');
                        const teamProjects = data.portfolio.filter(p => p.portfolioType === '단체');

                        let html = '';

                        // 단체 프로젝트 먼저 표시 (더 중요하므로)
                        if (teamProjects.length > 0) {
                            html += `
                                <div class="project-category">
                                    <h3>Team Projects</h3>
                                    ${teamProjects.map(portfolio => `
                                        <div class="portfolio-item-resume team-project">
                                            <div class="item-header">
                                                <div class="content">
                                                    <h4>${portfolio.portfolioTitle}</h4>
                                                    ${portfolio.portfolioPeriod ? `<div class="portfolio-period">📅 ${portfolio.portfolioPeriod}</div>` : ''}
                                                    ${portfolio.portfolioMembers ? `<div class="portfolio-members">👥 ${portfolio.portfolioMembers}명 참여</div>` : ''}
                                                    ${portfolio.portfolioUrl ? `<div class="portfolio-url"><a href="${portfolio.portfolioUrl}" target="_blank">${portfolio.portfolioUrl}</a></div>` : ''}
                                                    ${portfolio.portfolioDescription ? `<div class="portfolio-description">${portfolio.portfolioDescription}</div>` : ''}
                                                </div>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            `;
                        }

                        // 개인 프로젝트 표시
                        if (personalProjects.length > 0) {
                            html += `
                                <div class="project-category">
                                    <h3>Private Projects</h3>
                                    ${personalProjects.map(portfolio => `
                                        <div class="portfolio-item-resume personal-project">
                                            <div class="item-header">
                                                <div class="content">
                                                    <h4>${portfolio.portfolioTitle}</h4>
                                                    ${portfolio.portfolioUrl ? `<div class="portfolio-url"><a href="${portfolio.portfolioUrl}" target="_blank">${portfolio.portfolioUrl}</a></div>` : ''}
                                                    ${portfolio.portfolioDescription ? `<div class="portfolio-description">${portfolio.portfolioDescription}</div>` : ''}
                                                </div>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            `;
                        }

                        return html;
                    })()}
                </div>
                ` : ''}

                ${data.introductions && data.introductions.length > 0 ? `
                <div class="resume-section">
                    <h2>Self Introduction</h2>
                    ${data.introductions.map(intro => `
                        <div class="introduction-item-resume">
                            <h4>${intro.introTitle || '자기소개'}</h4>
                            <div>${intro.introContent || '내용 입력'}</div>
                        </div>
                    `).join('')}
                </div>
                ` : ''}

                <!-- 경력사항 상세는 우측 영역으로 이동
                ${data.experience && data.experience.length > 0 ? `
                <div class="resume-section">
                    <h2>경력사항 상세</h2>
                    ${data.experience.map(exp => `
                        <div class="experience-item-resume">
                            <div class="item-header">
                                <div class="year">${formatYearRange(exp.startDate, exp.endDate, exp.employmentStatus)}</div>
                                <div class="content">
                                    <h4>${exp.company}</h4>
                                    <div class="period">${exp.position || ''}${exp.industry ? ` | ${exp.industry}` : ''}</div>
                                    ${exp.jobDescription ? `<div class="job-description">${exp.jobDescription}</div>` : ''}
                                    ${exp.performance ? `<div class="performance-description">${exp.performance}</div>` : ''}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                ` : ''}
                -->



                ${data.training && data.training.length > 0 ? `
                <div class="resume-section">
                    <h2>Training</h2>
                    ${data.training.map(training => `
                        <div class="training-item-resume">
                            <div class="item-header">
                                <div class="year">${training.trainingPeriod || ''}</div>
                                <div class="content">
                                    <h4>${training.trainingInstitution}</h4>
                                    ${training.trainingContent ? `<div class="training-description">${training.trainingContent}</div>` : ''}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                ` : ''}

                ${data.awards && data.awards.length > 0 ? `
                <div class="resume-section">
                    <h2>Awards</h2>
                    ${data.awards.map(award => `
                        <div class="award-item-resume">
                            <div class="item-header">
                                <div class="year">${award.awardDate || ''}</div>
                                <div class="content">
                                    <h4>${award.awardTitle}</h4>
                                    <div class="period">${award.awardInstitution || ''}</div>
                                    ${award.awardDescription ? `<div class="award-description">${award.awardDescription}</div>` : ''}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                ` : ''}


            </div>
        </div>
    `;

    return firstPage + '<div class="page-break"></div>' + secondPage;
}

// 대시보드 요약 계산 함수들
function calculateTotalExperience(experience) {
    if (!experience || experience.length === 0) return '0년';

    let totalMonths = 0;
    const now = new Date();

    experience.forEach(exp => {
        const startDate = new Date(exp.startDate);
        const endDate = exp.endDate && exp.endDate !== '현재' ? new Date(exp.endDate) : now;

        const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 +
                      (endDate.getMonth() - startDate.getMonth());
        totalMonths += Math.max(0, months);
    });

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    if (years > 0 && months > 0) {
        return `${years}년 ${months}개월`;
    } else if (years > 0) {
        return `${years}년`;
    } else {
        return `${months}개월`;
    }
}

function getUniquePositions(experience) {
    if (!experience || experience.length === 0) return '없음';

    const positions = experience
        .map(exp => exp.position)
        .filter(pos => pos && pos.trim() !== '');

    if (positions.length === 0) return '없음';

    const uniquePositions = [...new Set(positions)];
    return uniquePositions.length <= 2 ? uniquePositions.join(', ') : `${uniquePositions.length}개`;
}

function getUniqueIndustries(experience) {
    if (!experience || experience.length === 0) return '없음';

    const industries = experience
        .map(exp => exp.industry)
        .filter(ind => ind && ind.trim() !== '');

    if (industries.length === 0) return '없음';

    const uniqueIndustries = [...new Set(industries)];
    return uniqueIndustries.length <= 2 ? uniqueIndustries.join(', ') : `${uniqueIndustries.length}개`;
}



function getTopSkills(skillsList, count = 3) {
    if (!skillsList || skillsList.length === 0) return '없음';

    // 기술 이름에서 괄호 제거하고 기본 이름만 추출
    const skillNames = skillsList.map(skill => {
        const cleanSkill = skill.replace(/\([^)]*\)/g, '').trim();
        return cleanSkill || skill;
    });

    // 중복 제거하고 상위 N개 선택
    const uniqueSkills = [...new Set(skillNames)];
    const topSkills = uniqueSkills.slice(0, count);

    return topSkills.join(', ');
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
