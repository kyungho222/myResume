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
